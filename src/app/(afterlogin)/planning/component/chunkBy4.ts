export const chunkBy4 = <T>(arr: T[]) => {
  const base = Array.from(
    { length: 4 },
    () => [] as { item: T; index: number }[]
  );
  arr.forEach((item, i) => base[i % 4].push({ item, index: i }));
  return base;
};
