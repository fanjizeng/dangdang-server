const secThrCtgys = [
  {
    "secondctgyid": 1,
    "secctgyname": "0-2岁",
    "firstctgyId": 1,
    "thirdctgyid": 1,
    "thirdctgyname": "图画故事",
    "secctgyid": 1
  },
  {
    "secondctgyid": 1,
    "secctgyname": "0-2岁",
    "firstctgyId": 1,
    "thirdctgyid": 2,
    "thirdctgyname": "认知",
    "secctgyid": 1
  },
  {
    "secondctgyid": 1,
    "secctgyname": "0-2岁",
    "firstctgyId": 1,
    "thirdctgyid": 3,
    "thirdctgyname": "益智游戏",
    "secctgyid": 1
  },
  {
    "secondctgyid": 1,
    "secctgyname": "0-2岁",
    "firstctgyId": 1,
    "thirdctgyid": 4,
    "thirdctgyname": "纸板书",
    "secctgyid": 1
  },
  {
    "secondctgyid": 1,
    "secctgyname": "0-2岁",
    "firstctgyId": 1,
    "thirdctgyid": 5,
    "thirdctgyname": "艺术课堂",
    "secctgyid": 1
  },
  {
    "secondctgyid": 1,
    "secctgyname": "0-2岁",
    "firstctgyId": 1,
    "thirdctgyid": 6,
    "thirdctgyname": "入园准备",
    "secctgyid": 1
  }
]

type SecThrCtgyList = {
  secondctgyid: number,
  secctgyname: string,
  firstctgyId: number,
  thirdctgyid: number,
  thirdctgyname: string,
  secctgyid: number
}[]
export type EleOfArr<T> = T extends Array<infer E> ? E : never

type SecThrCtgy = EleOfArr<typeof secThrCtgys>
type MyPick = Pick<SecThrCtgy, "secondctgyid" | "secctgyname">
type MyPick2 = Pick<SecThrCtgy, "secondctgyid" | "thirdctgyid" | "thirdctgyname">
type MyPicks = MyPick[]
type TP = [MyPick, MyPick2]
type TNumber = TP[number]

type UnionToFn<U> = U extends any ? (args: U) => void : never
type TestUnionToFn = UnionToFn<TP[number]>

type UnionToIntersection<U> = (U extends any ? (args: U) => void : never) extends (args: infer I) => void ? I : never
type TestUnionToIntersection<U> = UnionToIntersection<TP[number]>

type K = keyof EleOfArr<typeof secThrCtgys>
type Keys = K[]
let keys: Keys = ["secondctgyid", "secctgyname"]
type ItemType<T extends object[]> = {
  [K in keyof EleOfArr<T>]: EleOfArr<T>[K]
}
type ResltType = ItemType<typeof secThrCtgys>
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
export default function convert(secThrCtgys: SecThrCtgyList) {
  let secCtgys = getSubItemFrmArr(secThrCtgys, 'secondctgyid', 'secctgyname')
  // 去重后的二级分类和二级分类名称数组
  let noReptSecCtgyList = getNoReptItem(secCtgys, 'secondctgyid')
  // 从secThrdCtgys提取三级分类数组
  let thrdCtgyList = getSubItemFrmArr(secThrCtgys, 'thirdctgyid', 'thirdctgyname', 'secctgyid')
  
  // 定义最终返回前端的二三级分类数组类型
  const relativeSecThrCtgyLst = combineRelativeCtgy(noReptSecCtgyList, "thirdctgyList", [])
  // 定义最终返回前端的二三级数组
  let lastSecThrCtgyList: typeof relativeSecThrCtgyLst = []
  // 定义最终返回前端的二三级分类类型
  type LastSecThrdCtgy = EleOfArr<typeof relativeSecThrCtgyLst>
  // 组装最终返回前端的二三级数组
  noReptSecCtgyList.map((noReptSecCtgy) => {
    let lastThrdList: typeof thrdCtgyList = []
    thrdCtgyList.forEach(thrdCtgy => {
      if (noReptSecCtgy.secondctgyid === thrdCtgy.secctgyid) {
        lastThrdList.push({
          thirdctgyid: thrdCtgy.thirdctgyid,
          thirdctgyname: thrdCtgy.thirdctgyname,
          secctgyid: thrdCtgy.secctgyid
        })
      }
    });
    const lastSecThrdCtgy: LastSecThrdCtgy = combine(noReptSecCtgy, { thirdctgyList: lastThrdList })
    lastSecThrCtgyList.push(lastSecThrdCtgy)
  })
  return lastSecThrCtgyList
}
const secondCtgys = getSubItemFrmArr(secThrCtgys, 'secondctgyid', 'secctgyname')
const combineObj = combine({ username: 'www', age: '12' }, { phone: '13024444' })
console.log(getNoReptItem(secThrCtgys, 'secondctgyid'))

