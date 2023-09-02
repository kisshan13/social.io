export function getFromObject(obj: Object, key: string) {
  return Object.getOwnPropertyDescriptor(obj, key)?.value;
}
