import { NewPlaceFormValueFields } from "../types.ts";
import { stringIsNullOrWhiteSpace } from "../../shared/utilities.ts";

export function validateFormStringValue(
  field: NewPlaceFormValueFields,
  value: string,
): string {
  return stringIsNullOrWhiteSpace(value) ? `Please enter a valid ${field}` : "";
}
