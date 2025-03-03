import { NewPlaceFormValueFields } from "../types.ts";
import { stringIsNullOrWhiteSpace } from "../../shared/utilities.ts";

export function validateFormStringValue(
  field: NewPlaceFormValueFields,
  value: string,
): string {
  if (field === NewPlaceFormValueFields.Description && value.length > 255) {
    return "Description is too long, which should be less than 255 characters";
  }

  return stringIsNullOrWhiteSpace(value) ? `Please enter a valid ${field}` : "";
}

export function isValidImageUrl(url: string): boolean {
  const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))/i;
  return imageRegex.test(url);
}
