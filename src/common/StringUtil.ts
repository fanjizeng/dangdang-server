class StringUtil {
  static inNotEmpty(str: string) {
    return Boolean(str && str.length > 0)
  }
  static toNumber = (val: any): any => {
    const n = parseFloat(val)
    return isNaN(n) ? val : n
  }
}

export const { inNotEmpty, toNumber} = StringUtil