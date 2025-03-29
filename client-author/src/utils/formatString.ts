export function formatString(
  str: string | undefined | null,
  charCount: number = 20
) {
  if (str === undefined || str === null) return;
  if (str.length <= charCount) return str;

  const newStr = str.slice(0, charCount) + "...";

  return newStr;
}
