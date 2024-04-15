type SecThrCtgyList = {
  secondctgyId: number,
  secctgyName: string,
  firstctgyId: number,
  thirdctgyId: number,
  thirdctgyName: string,
  secctgyId: number
}[]
export type EleOfArr<T> = T extends Array<infer E> ? E : never

type SecThrCtgy = EleOfArr<SecThrCtgyList>
type MyPick = Pick<SecThrCtgy, "secondctgyId" | "secctgyName">
type MyPick2 = Pick<SecThrCtgy, "secondctgyId" | "thirdctgyId" | "thirdctgyName">
type MyPicks = MyPick[]
type TP = [MyPick, MyPick2]
type TNumber = TP[number]
type UnionToFn<U> = U extends any ? (args: U) => void : never
type TestUnionToFn = UnionToFn<TP[number]>

type UnionToIntersection<U> = (U extends any ? (args: U) => void : never) extends (args: infer I) => void ? I : never
type TestUnionToIntersection<U> = UnionToIntersection<TP[number]>

type K = keyof EleOfArr<SecThrCtgyList>
type Keys = K[]
let keys: Keys = ["secondctgyId", "secctgyName"]
type ItemType<T extends object[]> = {
  [K in keyof EleOfArr<T>]: EleOfArr<T>[K]
}
type ResltType = ItemType<SecThrCtgyList>
function getSubItemFrmArr<T extends ItemType<T>[], K extends keyof EleOfArr<T>>(t: T, ...keys: K[]): Pick<EleOfArr<T>, K>[] {
  return t.map(item => {
    return keys.reduce((pre, cur, index) => {
      return { ...pre, [keys[index]]: item[keys[index]] }
    }, {})
  }) as Pick<EleOfArr<T>, K>[]
}

function getOneItemValuesFrmArr<T extends ItemType<T>[], K extends keyof EleOfArr<T>, E = EleOfArr<T>>(arr: T, k: K) {
  return arr.map(({ [k]: v }: E) => {
    return v
  })
}
function getNoReptValsItem(arr: any[]) {
  const data: any[] = []
  return arr.filter((item) => !data.includes(item) && data.push(item))
}
function getNoReptItem<T extends ItemType<T>[], K extends keyof EleOfArr<T> = keyof EleOfArr<T>>(arr: T, k: K): ItemType<T>[] {
  const data: ItemType<T>[] = []
  // 1 获取对象中某个元素的值组成的数组
  let oneItemValues: any[] = getOneItemValuesFrmArr(arr, k)
  // 2 对oneItemValues数组去重
  let noReptOneItemvalues = getNoReptValsItem(oneItemValues)
  // 3 对象去重
  arr.filter((item) => {
    // 如果数组中元素是否包含在这个第二步中元素的值数组中
    if (noReptOneItemvalues.includes(item[k])) {
      // 先删除这个元素
      noReptOneItemvalues.splice(noReptOneItemvalues.indexOf(item[k]), 1)
      // 然后添加到数组中
      return data.push(item)
    }
    return false
  })
  return data
}
export function combine<T extends Record<string, any>[]>(...unionObj: T): UnionToIntersection<T[number]>
export function combine<T extends Record<string, any>[]>(...unionObj: T) {
  return unionObj.reduce((pre, cur) => {
    return { ...pre, ...cur }
  }, {})
}
function combineRelativeCtgy<T extends ItemType<T>[]>(arr: T,
  realtiveKey: string, realtiveValues: any) {
  return arr.map(item => {
    return combine(item, { [realtiveKey]: realtiveValues })
  })
}
export default function convert<T extends ItemType<T>[], K extends keyof EleOfArr<T>>(souceData: T, secondType: K[], thirdType: K[], PK: K, FK: K, thirdName: string) {
  let secCtgys = getSubItemFrmArr(souceData, ...secondType)
  // 去重后的二级分类和二级分类名称数组
  let noReptSecCtgyList = getNoReptItem(secCtgys, PK)
  // 从secThrdCtgys提取三级分类数组
  let thrdCtgyList = getSubItemFrmArr(souceData, ...thirdType)
  
  // 定义最终返回前端的二三级分类数组类型
  const relativeSecThrCtgyLst = combineRelativeCtgy(noReptSecCtgyList, thirdName, [])
  // 定义最终返回前端的二三级数组
  let lastSecThrCtgyList: typeof relativeSecThrCtgyLst = []
  // 定义最终返回前端的二三级分类类型
  type LastSecThrdCtgy = EleOfArr<typeof relativeSecThrCtgyLst>
  // 组装最终返回前端的二三级数组
  noReptSecCtgyList.map((noReptSecCtgy) => {
    let lastThrdList: typeof thrdCtgyList = []
    thrdCtgyList.forEach(thrdCtgy => {
      if (noReptSecCtgy[PK] === thrdCtgy[FK]) {
        let lastThrd = thirdType.reduce((pre, cur)=> {
          return { ...pre, [cur]: thrdCtgy[cur]}
        },{}) as EleOfArr<typeof thrdCtgyList>
        lastThrdList.push(lastThrd)
      }
    });
    const lastSecThrdCtgy: LastSecThrdCtgy = combine(noReptSecCtgy, { [thirdName]: lastThrdList })
    lastSecThrCtgyList.push(lastSecThrdCtgy)
  })
  return lastSecThrCtgyList
}
const combineObj = combine({ username: 'www', age: '12' }, { phone: '13024444' })

