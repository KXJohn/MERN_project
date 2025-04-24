import { FC, useEffect } from "react";
import { LogInFormValue, LogInFormValueFields } from "@/places/types.ts";
import { FormContainer } from "@/places/pages/styles.ts";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import classNames from "classnames";
import { stringIsNotNullOrWhiteSpace } from "@/shared/utilities.ts";
import { Button } from "@/shared/components/FormElements/Button.tsx";
import styled from "styled-components";
import { Card } from "@/shared/components/UIElements/Card.tsx";
import { useToggle } from "@/shared/hooks/useToggle.ts";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store.ts";
import { RootState } from "@/store.ts";
import { Spinner } from "@/shared/components/UIElements/Spinner.tsx";
import { userLogin, registerUser } from "@/features/auth/authActions.ts";
import { useNavigate } from "react-router-dom";

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

    .error-message {
      font-size: 12px;
      color: red;
    }
  }
`;

const INITIAL_VALUES: LogInFormValue = {
  name: "",
  email: "",
  password: "",
};

const schema = Yup.object().shape({
  name: Yup.string().notRequired(),
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

export const AuthPage: FC = () => {
  const {
    loading,
    // error: registerError,
    userInfo,
    success,
  } = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [showSignUp, toggleToShowSignUp] = useToggle(false);
  const formText = `${showSignUp ? "Sign Up" : "Log In"}`;

  const onSubmit = async (values: LogInFormValue) => {
    const value: LogInFormValue = {
      password: values.password,
      email: values.email,
    };
    if (showSignUp) {
      const registerUserValue: LogInFormValue = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      dispatch(registerUser(registerUserValue));
    } else {
      dispatch(userLogin(value));
    }
  };

  useEffect(() => {
    if (success && showSignUp) {
      // if register success, switch register screen to login screen
      toggleToShowSignUp();
    }
  }, [showSignUp, success, toggleToShowSignUp]);

  useEffect(() => {
    if ((userInfo.token ?? "").length > 0) {
      navigate(`/${userInfo.id}`);
    }
  }, [navigate, userInfo]);

  return (
    <Card>
      <AuthContainer className="place-form-container">
        <h2>{formText}</h2>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={schema}
          onSubmit={onSubmit}
          validateOnChange
        >
          {({ errors, values, touched, handleChange, handleSubmit }) => {
            return (
              <Form className="login-form">
                {showSignUp && (
                  <div
                    className={classNames("login-form-name", {
                      hasError:
                        stringIsNotNullOrWhiteSpace(errors.name) && showSignUp,
                    })}
                  >
                    <label htmlFor={LogInFormValueFields.Name}>Your Name</label>
                    <Field
                      id={LogInFormValueFields.Name}
                      name={LogInFormValueFields.Name}
                      value={values.name}
                      onChange={handleChange}
                      type="text"
                    />
                    {stringIsNotNullOrWhiteSpace(errors.name) &&
                    touched.name &&
                    showSignUp ? (
                      <div className="error-message">{errors.name}</div>
                    ) : null}
                  </div>
                )}
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
                  {stringIsNotNullOrWhiteSpace(errors.email) &&
                  touched.email ? (
                    <div className="error-message">{errors.email}</div>
                  ) : null}
                </div>
                <div
                  className={classNames("login-form-password", {
                    hasError: stringIsNotNullOrWhiteSpace(errors.password),
                  })}
                >
                  <label htmlFor={LogInFormValueFields.Password}>
                    Password
                  </label>
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
                <div className="action-col">
                  <Button
                    type="submit"
                    disabled={Object.keys(errors).length > 0 || loading}
                    onClick={handleSubmit}
                  >
                    {loading ? <Spinner /> : formText}
                  </Button>
                  <Button type="submit" onClick={toggleToShowSignUp}>
                    {`Switch To ${showSignUp ? "LogIn" : "Sign Up"}`}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </AuthContainer>
    </Card>
  );
};
