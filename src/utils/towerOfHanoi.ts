export default function towerOfHanoi(
  numberOfDisks: number,
  source: number = 1,
  auxiliary: number = 2,
  target: number = 3,
  cache: Map<number, string[]> = new Map<number, string[]>()
): string[] {
  if (cache.has(numberOfDisks)) {
    return cache.get(numberOfDisks)!;
  }

  if (numberOfDisks === 0) {
    return [];
  }

  if (numberOfDisks >= 1) {
    cache.set(numberOfDisks, [
      ...towerOfHanoi(numberOfDisks - 1, source, target, auxiliary),
      `${source} -> ${target}`,
      ...towerOfHanoi(numberOfDisks - 1, auxiliary, source, target)
    ]);
  }

  return cache.get(numberOfDisks)!;
}
