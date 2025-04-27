import { FC, useMemo } from "react";
import { Field, Form, Formik } from "formik";
import { NewPlaceFormValue, NewPlaceFormValueFields, Place } from "../types.ts";
import {
  isValidImageUrl,
  isValidLocationNumber,
  validateFormStringValue,
} from "./validate.ts";
import { stringIsNotNullOrWhiteSpace } from "@/shared/utilities.ts";
import classNames from "classnames";
import { Button } from "@/shared/components/FormElements/Button.tsx";
import { FormContainer } from "@/places/pages/styles.ts";
import { useUpdatePlace } from "@/features/place/useUpdatePlace.ts";

const INITIAL_VALUES: NewPlaceFormValue = {
  title: "",
  description: "",
  imageUrl: "",
  address: "",
  lat: undefined,
  lng: undefined,
};

interface Props {
  place?: Place;
}

export const NewPlace: FC<Props> = ({ place }) => {
  const { commandState, doCreatePlace } = useUpdatePlace();

  const onSubmit = (values: NewPlaceFormValue) => {
    doCreatePlace(values);
  };

  const placeFormValue: NewPlaceFormValue = useMemo(
    () => ({
      title: place?.title,
      description: place?.description,
      imageUrl: place?.imageUrl,
      address: place?.address,
      lat: place?.location.lat,
      lng: place?.location.lng,
    }),
    [],
  );

  return (
    <FormContainer className="place-form-container">
      <h2>Add New Place</h2>
      <Formik
        initialValues={placeFormValue ?? INITIAL_VALUES}
        onSubmit={onSubmit}
        validateOnChange
      >
        {({ errors, touched, values, handleChange, handleSubmit }) => {
          return (
            <Form className="place-form">
              <div
                className={classNames("place-form-title", {
                  hasError: stringIsNotNullOrWhiteSpace(errors.title),
                })}
              >
                <label htmlFor={NewPlaceFormValueFields.Title}>Title</label>
                <Field
                  id={NewPlaceFormValueFields.Title}
                  name={NewPlaceFormValueFields.Title}
                  value={values.title}
                  validate={() =>
                    validateFormStringValue(
                      NewPlaceFormValueFields.Title,
                      values.title ?? "",
                    )
                  }
                  onChange={handleChange}
                />
                {stringIsNotNullOrWhiteSpace(errors.title) && touched.title ? (
                  <div className="error-message">{errors.title}</div>
                ) : null}
              </div>
              <div
                className={classNames("place-form-imageUrl", {
                  hasError: stringIsNotNullOrWhiteSpace(errors.imageUrl),
                })}
              >
                <label htmlFor={NewPlaceFormValueFields.ImageUrl}>
                  Image URL
                </label>
                <Field
                  id={NewPlaceFormValueFields.ImageUrl}
                  name={NewPlaceFormValueFields.ImageUrl}
                  value={values.imageUrl}
                  validate={() => isValidImageUrl(values.imageUrl ?? "")}
                  onChange={handleChange}
                />
                {stringIsNotNullOrWhiteSpace(errors.imageUrl) &&
                touched.imageUrl ? (
                  <div className="error-message">{errors.imageUrl}</div>
                ) : null}
              </div>
              <div
                className={classNames("place-form-address", {
                  hasError: stringIsNotNullOrWhiteSpace(errors.address),
                })}
              >
                <label htmlFor={NewPlaceFormValueFields.Address}>Address</label>
                <Field
                  id={NewPlaceFormValueFields.Address}
                  name={NewPlaceFormValueFields.Address}
                  value={values.address}
                  onChange={handleChange}
                />
              </div>
              <div
                className={classNames("place-form-description", {
                  hasError: stringIsNotNullOrWhiteSpace(errors.description),
                })}
              >
                <label htmlFor={NewPlaceFormValueFields.Description}>
                  Description
                </label>
                <Field
                  id={NewPlaceFormValueFields.Description}
                  name={NewPlaceFormValueFields.Description}
                  value={values.description}
                  validate={() =>
                    validateFormStringValue(
                      NewPlaceFormValueFields.Description,
                      values.description ?? "",
                    )
                  }
                  render={() => (
                    <textarea
                      id={NewPlaceFormValueFields.Description}
                      name={NewPlaceFormValueFields.Description}
                      value={values.description}
                      placeholder="description here"
                      maxLength={255}
                      cols={4}
                      rows={3}
                      onChange={handleChange}
                    />
                  )}
                />
                {stringIsNotNullOrWhiteSpace(errors.description) &&
                touched.description ? (
                  <div className="error-message">{errors.description}</div>
                ) : null}
              </div>
              <div className="place-form-location">
                <div
                  className={classNames("latitude", {
                    hasError: stringIsNotNullOrWhiteSpace(errors.lat),
                  })}
                >
                  <label htmlFor={NewPlaceFormValueFields.Latitude}>
                    Latitude
                  </label>
                  <Field
                    id={NewPlaceFormValueFields.Latitude}
                    name={NewPlaceFormValueFields.Latitude}
                    value={values.lat}
                    validate={() =>
                      isValidLocationNumber(
                        NewPlaceFormValueFields.Latitude,
                        values.lat ?? 0,
                      )
                    }
                    onChange={handleChange}
                  />
                  {stringIsNotNullOrWhiteSpace(errors.lat) && touched.lat ? (
                    <div className="error-message">{errors.lat}</div>
                  ) : null}
                </div>
                <div
                  className={classNames("longitude", {
                    hasError: stringIsNotNullOrWhiteSpace(errors.lng),
                  })}
                >
                  <label htmlFor={NewPlaceFormValueFields.Longitude}>
                    Longitude
                  </label>
                  <Field
                    id={NewPlaceFormValueFields.Longitude}
                    name={NewPlaceFormValueFields.Longitude}
                    value={values.lng}
                    validate={() =>
                      isValidLocationNumber(
                        NewPlaceFormValueFields.Longitude,
                        values.lng,
                      )
                    }
                    onChange={handleChange}
                  />
                  {stringIsNotNullOrWhiteSpace(errors.lng) && touched.lng ? (
                    <div className="error-message">{errors.lng}</div>
                  ) : null}
                </div>
              </div>
              <div className="error-message">{commandState.error}</div>
              {commandState.isLoading ? (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
                  alt="loading"
                />
              ) : (
                <Button
                  type="submit"
                  disabled={
                    Object.keys(errors).length > 0 || commandState.isLoading
                  }
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )}
            </Form>
          );
        }}
      </Formik>
    </FormContainer>
  );
};
