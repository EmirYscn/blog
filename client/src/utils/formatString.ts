export function formatString(str: string, charCount: number = 20) {
  if (str.length <= charCount) return str;

  const newStr = str.slice(0, charCount) + "...";

  return newStr;
}
