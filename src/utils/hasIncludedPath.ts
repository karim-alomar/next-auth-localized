export const hasIncludedPath = (target: string, list: string[]) => {
  const containsTarget = list.some((route) => target?.includes(route));
  return containsTarget;
};
