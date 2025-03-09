import { FC } from "react";
import { Field, Form, Formik } from "formik";
import { NewPlaceFormValue, NewPlaceFormValueFields } from "../types.ts";
import {
  isValidImageUrl,
  isValidLocationNumber,
  validateFormStringValue,
} from "./validate.ts";
import styled from "styled-components";
import { stringIsNotNullOrWhiteSpace } from "@/shared/utilities.ts";
import classNames from "classnames";
import { Button } from "@/shared/components/FormElements/Button.tsx";

const FormContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0 auto;
    padding: 1rem;
    width: 90%;
    max-width: 40rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 6px;
    background: white;
  }

  label {
    text-align: left;
    padding-top: 10px;
    width: 100%;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .place-form-title,
  .place-form-description,
  .place-form-title,
  .place-form-imageUrl,
  .place-form-address {
    width: 100%;
    display: flex;
    flex-direction: column;

    input,
    textarea {
      width: 100%;
      font: inherit;
      border: 1px solid #ccc;
      background: #f8f8f8;
      padding: 0.15rem 0.25rem;
    }

    input:focus,
    textarea:focus {
      outline: none;
      background: #ebebeb;
      border-color: #510077;
    }

    &.hasError {
      input,
      textarea {
        border-color: red;
        background: #ffd1d1;
      }
    }
  }

  .place-form-location {
    padding: 10px 0;
    display: flex;
    label {
      padding-right: 5px;
    }

    .latitude,
    .longitude {
      display: flex;
      flex-direction: column;
      label {
        padding-top: 0;
      }
    }

    .longitude {
      padding-left: 10px;
    }
  }

  textarea {
    resize: none;
  }

  button {
    margin-right: 0;
  }
`;

const INITIAL_VALUES: NewPlaceFormValue = {
  title: "",
  description: "",
  imageUrl: "",
  address: "",
  lat: undefined,
  lng: undefined,
};

export const NewPlace: FC = () => {
  const onSubmit = (values: NewPlaceFormValue) => {
    console.log("values", values);
  };

  return (
    <FormContainer className="place-form-container">
      <h2>Add New Place</h2>
      <Formik
        initialValues={INITIAL_VALUES}
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
              <Button
                type="submit"
                disabled={Object.keys(errors).length > 0}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </FormContainer>
  );
};
