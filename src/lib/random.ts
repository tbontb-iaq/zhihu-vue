namespace random {
  // [0, max)
  export function int(max: number): number;
  // [min, max)
  export function int(min: number, max: number): number;
  export function int(arg1: number, arg2?: number): number {
    return arg2
      ? Math.floor(Math.random() * (arg2 - arg1) + arg1)
      : int(0, arg1);
  }

  export function str(
    length = 8,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  ): string {
    let result = "";
    const len = characters.length;
    for (let i = 0; i < length; i++) result += characters.charAt(int(len));
    return result;
  }
}

export default random;
