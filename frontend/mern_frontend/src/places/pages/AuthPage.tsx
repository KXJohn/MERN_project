import { FC } from "react";
import { LogInFormValue, LogInFormValueFields } from "@/places/types.ts";
import { FormContainer } from "@/places/pages/styles.ts";
import * as Yup from "yup";
import { ObjectSchema } from "yup";
import { Field, Form, Formik } from "formik";
import classNames from "classnames";
import { stringIsNotNullOrWhiteSpace } from "@/shared/utilities.ts";
import { Button } from "@/shared/components/FormElements/Button.tsx";
import styled from "styled-components";

const AuthContainer = styled(FormContainer)`
  form {
    align-items: end;

    label {
      padding-right: 20px;
    }

    > div {
      padding-bottom: 20px;
    }

    button {
      width: 100%;
    }
  }
`;

const INITIAL_VALUES: LogInFormValue = {
  email: "",
  password: "",
};

const schema: ObjectSchema<LogInFormValue> = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

export const AuthPage: FC = () => {
  const onSubmit = () => {};
  return (
    <AuthContainer className="place-form-container">
      <h2>Log In</h2>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={schema}
        onSubmit={onSubmit}
        validateOnChange
      >
        {({ errors, values, touched, handleChange, handleSubmit }) => {
          return (
            <Form className="login-form">
              <div
                className={classNames("login-form-email", {
                  hasError: stringIsNotNullOrWhiteSpace(errors.email),
                })}
              >
                <label htmlFor={LogInFormValueFields.Email}>Email</label>
                <Field
                  id={LogInFormValueFields.Email}
                  name={LogInFormValueFields.Email}
                  value={values.email}
                  onChange={handleChange}
                  type="email"
                />
                {stringIsNotNullOrWhiteSpace(errors.email) && touched.email ? (
                  <div className="error-message">{errors.email}</div>
                ) : null}
              </div>
              <div
                className={classNames("login-form-password", {
                  hasError: stringIsNotNullOrWhiteSpace(errors.password),
                })}
              >
                <label htmlFor={LogInFormValueFields.Password}>Password</label>
                <Field
                  id={LogInFormValueFields.Password}
                  name={LogInFormValueFields.Password}
                  value={values.password}
                  onChange={handleChange}
                  type="password"
                />
                {stringIsNotNullOrWhiteSpace(errors.password) &&
                touched.password ? (
                  <div className="error-message">{errors.password}</div>
                ) : null}
              </div>
              <Button
                type="submit"
                disabled={Object.keys(errors).length > 0}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </Form>
          );
        }}
      </Formik>
    </AuthContainer>
  );
};
