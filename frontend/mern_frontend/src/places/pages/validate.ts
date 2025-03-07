import { NewPlaceFormValueFields } from "../types.ts";
import { stringIsNullOrWhiteSpace } from "@/shared/utilities.ts";

export function validateFormStringValue(
  field: NewPlaceFormValueFields,
  value: string,
): string {
  if (field === NewPlaceFormValueFields.Description && value.length > 255) {
    return "Description is too long, which should be less than 255 characters";
  }

  return stringIsNullOrWhiteSpace(value) ? `Please enter a valid ${field}` : "";
}

export function isValidImageUrl(url: string): string {
  const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))/i;
  const result = imageRegex.test(url);
  if (!result) {
    return "Please enter a valid imageURL";
  }

  return "";
}

export function isValidLocationNumber(
  field: NewPlaceFormValueFields.Latitude | NewPlaceFormValueFields.Longitude,
  value?: number,
): string {
  const regex =
    /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
  if (value != null && !regex.test(value.toString())) {
    return `Please enter a valid ${field} number`;
  }

  return "";
}
