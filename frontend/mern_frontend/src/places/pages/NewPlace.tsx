import { FC } from "react";
import { Field, Form, Formik } from "formik";
import { NewPlaceFormValue, NewPlaceFormValueFields } from "../types.ts";
import { isValidImageUrl, validateFormStringValue } from "./validate.ts";
import styled from "styled-components";

const FormContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
  }

  label {
    text-align: left;
    padding-top: 10px;
    width: 100%;
  }

  .place-form-title,
  .place-form-description,
  .place-form-title,
  .place-form-imageUrl {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .place-form-location {
    padding: 10px 0;
    display: flex;
    label {
      padding-right: 5px;
    }

    .longitude {
      padding-left: 10px;
    }
  }

  textarea {
    resize: none;
  }
`;

const INITIAL_VALUES: NewPlaceFormValue = {
  title: "",
  description: "",
  imageUrl: "",
  address: "",
  lat: 0,
  lng: 0,
};

export const NewPlace: FC = () => {
  const onSubmit = () => {};

  return (
    <FormContainer className="place-form-container">
      <h2>Add New Place</h2>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validateOnChange
      >
        {({ errors, touched, values, handleChange }) => {
          return (
            <Form>
              <div className="place-form-title">
                <label htmlFor={NewPlaceFormValueFields.Title}>Title</label>
                <Field
                  id={NewPlaceFormValueFields.Title}
                  name={NewPlaceFormValueFields.Title}
                  value={values.title}
                  validate={() =>
                    validateFormStringValue(
                      NewPlaceFormValueFields.Title,
                      values.title,
                    )
                  }
                  onChange={handleChange}
                />
                {errors.title && touched.title ? (
                  <div>{errors.title}</div>
                ) : null}
              </div>
              <div className="place-form-imageUrl">
                <label htmlFor={NewPlaceFormValueFields.ImageUrl}>
                  Image URL
                </label>
                <Field
                  id={NewPlaceFormValueFields.ImageUrl}
                  name={NewPlaceFormValueFields.ImageUrl}
                  value={values.imageUrl}
                  validate={() => isValidImageUrl(values.imageUrl)}
                  onChange={handleChange}
                />
                {errors.imageUrl && touched.imageUrl ? (
                  <div>{errors.imageUrl}</div>
                ) : null}
              </div>
              <div className="place-form-description">
                <label htmlFor={NewPlaceFormValueFields.Description}>
                  Description
                </label>
                <Field
                  value={values.description}
                  validate={validateFormStringValue}
                  render={() => (
                    <textarea
                      id={NewPlaceFormValueFields.Description}
                      name={NewPlaceFormValueFields.Description}
                      placeholder="description here"
                      maxLength={255}
                      cols={4}
                      onChange={handleChange}
                    />
                  )}
                />
                {errors.description && touched.description ? (
                  <div>{errors.description}</div>
                ) : null}
              </div>
              <div className="place-form-location">
                <div className="latitude">
                  <label htmlFor={NewPlaceFormValueFields.Latitude}>
                    Latitude
                  </label>
                  <Field
                    id={NewPlaceFormValueFields.Latitude}
                    name={NewPlaceFormValueFields.Latitude}
                    value={values.lat}
                    onChange={handleChange}
                  />
                </div>
                <div className="longitude">
                  <label htmlFor={NewPlaceFormValueFields.Longitude}>
                    Longitude
                  </label>
                  <Field
                    id={NewPlaceFormValueFields.Longitude}
                    name={NewPlaceFormValueFields.Longitude}
                    value={values.lng}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </FormContainer>
  );
};
