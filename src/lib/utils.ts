type keys = "token";

export function getFromObject(obj: Object, key: keys) {
  return Object.getOwnPropertyDescriptor(obj, key)?.value;
}
