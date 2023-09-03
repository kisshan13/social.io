type keys = "token" | "uuid";

export function getFromObject(obj: Object, key: keys) {
  return Object.getOwnPropertyDescriptor(obj, key)?.value;
}

export function addToObject(obj: Object, key: keys, value: string) {
  Object.defineProperty(obj, key, {
    value: value,
    writable: false,
  });
}
