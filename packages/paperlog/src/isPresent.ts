export type NonEmptyString = string & { string: "nonEmpty" };

export function isPresent(
  value: string | undefined | null
): value is NonEmptyString {
  if (typeof value != "string") {
    return false;
  }
  return value.length > 0;
}
