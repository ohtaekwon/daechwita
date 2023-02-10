export function swap<T>(array: T[], i: number, j: number): T[] {
  const snapShot = [...array];
  const temp = snapShot[i];
  snapShot[i] = snapShot[j];
  snapShot[j] = temp;
  return snapShot;
}
