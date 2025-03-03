export function stringIsNullOrWhiteSpace(
  str?: string | null,
): str is null | undefined {
  return str == null || str.trim() === "";
}

export function stringIsNotNullOrWhiteSpace(
  str?: string | null,
): str is string {
  return !stringIsNullOrWhiteSpace(str);
}
