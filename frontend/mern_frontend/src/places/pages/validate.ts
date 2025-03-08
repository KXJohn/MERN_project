import { NewPlaceFormValueFields } from "../types.ts";
import { stringIsNullOrWhiteSpace } from "@/shared/utilities.ts";

export function validateFormStringValue(
  field: NewPlaceFormValueFields,
  value: string,
): string {
  if (field === NewPlaceFormValueFields.Description && value.length > 255) {
    return "Description is too long, which should be less than 255 characters";
  } else if (stringIsNullOrWhiteSpace(value)) {
    return `Please enter a valid ${field}`;
  }

  return "";
}

export function isValidImageUrl(url: string): string {
  const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))/i;
  const result = imageRegex.test(url);
  if (!result) {
    return "Please enter a valid imageURL";
  } else {
    return "";
  }
}

export function isValidLocationNumber(
  field: NewPlaceFormValueFields.Latitude | NewPlaceFormValueFields.Longitude,
  value?: number,
): string {
  const latLonRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
  const lonRegex = /^[-+]?((1[0-7]\d|\d{1,2})(\.\d+)?|180(\.0+)?)$/;

  if (
    (field === NewPlaceFormValueFields.Latitude &&
      value != null &&
      !latLonRegex.test(value.toString())) ||
    (field === NewPlaceFormValueFields.Longitude &&
      value != null &&
      !lonRegex.test(value.toString()))
  ) {
    return `Please enter a valid ${field} number`;
  }

  return "";
}
