export function presence<T extends object>(value: T): T {
  const updated = { ...value };

  for (const [key, value] of Object.entries(updated)) {
    if (value == undefined) {
      // @ts-expect-error requires object to have index type, but here we know the key exists
      delete updated[key];
    }
  }
  return updated;
}
