export function isPlanValidGoal(input: string) {
  const blacklist = ['안녕', '요즘', '도와줘', 'ㅋㅋ', 'ㅎㅎ', '?', '잘 모르겠어요'];
  const maxLength = 40;

  if (!input.trim()) return false;
  if (input.length > maxLength) return false;
  if (blacklist.some((word) => input.includes(word))) return false;

  return true;
}
