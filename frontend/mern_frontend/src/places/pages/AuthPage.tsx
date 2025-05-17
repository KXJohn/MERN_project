import { FC, useCallback, useEffect, useRef, useState } from "react";
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
import { clearError } from "@/features/auth/authSlice.ts";
import { logoutUserAction } from "@/features/auth/authActions.ts";
import { useNavigate } from "react-router-dom";
import ErrorModal from "@/shared/components/UIElements/ErrorModal.tsx";

// Auth card styling
const StyledCard = styled(Card)`
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const AuthContainer = styled(FormContainer)`
  max-width: 450px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  
  
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 1.5rem;
    width: 100%;
    box-sizing: border-box;
  }
  
  .login-form-name,
  .login-form-email,
  .login-form-password {
    width: 100%;
    display: block;
    margin-bottom: 1rem;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 1.5rem;
    width: 100%;
    box-sizing: border-box;
    
    * {
      box-sizing: border-box;
    }

    label {
      font-weight: 500;
      margin-bottom: 0.3rem;
      display: block;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s ease;
      box-sizing: border-box;
      
      &:focus {
        outline: none;
        border-color: #4a90e2;
        box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
      }
    }
    
  }
  
  .password-input-wrapper {
    position: relative;
    width: 100%;
    display: block;
    
    input {
      width: 100%;
      padding-right: 4rem;
      box-sizing: border-box;
    }
    
    .toggle-password {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #666;
      font-size: 0.8rem;
      cursor: pointer;
      padding: 0.25rem 0.5rem;
      
      &:hover {
        color: #333;
      }
    }
  }
  
  .password-strength {
    margin-top: 0.5rem;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    
    .strength-meter {
      height: 4px;
      background-color: #eee;
      border-radius: 2px;
      margin-bottom: 0.25rem;
      width: 100%;
      
      .strength-meter-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.3s ease;
        
        &.strength-0 { background-color: #e74c3c; }
        &.strength-1 { background-color: #e67e22; }
        &.strength-2 { background-color: #f1c40f; }
        &.strength-3 { background-color: #2ecc71; }
        &.strength-4 { background-color: #27ae60; }
        &.strength-5 { background-color: #16a085; }
      }
    }
    
    .strength-text {
      font-size: 0.7rem;
      color: #666;
      text-align: right;
      white-space: nowrap;
    }
  }
  
  form {

    > div {
      padding-bottom: 1rem;
      width: 100%;
      display: block;
      
      &.hasError input {
        border-color: #e74c3c;
      }
    }

    .action-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      margin-top: 1.5rem;
      
      .switch-mode {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        
        span {
          font-size: 0.9rem;
          color: #666;
        }
        
        button {
          background: none;
          border: none;
          color: #4a90e2;
          font-weight: 600;
          padding: 0;
          margin: 0;
          cursor: pointer;
          text-decoration: underline;
          
          &:hover {
            color: #2c6cb2;
          }
        }
      }
    }

    button[type="submit"] {
      width: 80%;
      padding: 0.75rem;
      border-radius: 4px;
      font-weight: 500;
      background-color: #4a90e2;
      color: white;
      margin: 0 auto;
      
      &:disabled {
        background-color: #a9c7eb;
        cursor: not-allowed;
      }
    }

    .error-message {
      font-size: 0.8rem;
      color: #e74c3c;
      margin-top: 0.3rem;
    }
    
    .form-error {
      text-align: center;
      margin: 1.5rem auto 0;
      padding: 0.75rem;
      width: 80%;
      background-color: rgba(231, 76, 60, 0.1);
      border-radius: 4px;
      border-left: 3px solid #e74c3c;
      font-size: 0.9rem;
    }
  }
`;

const INITIAL_VALUES: LogInFormValue = {
  name: "",
  email: "",
  password: "",
};

// Create separate schemas for login and signup to avoid validation errors
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

// Helper function to calculate password strength
const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  
  // Length check
  if (password.length >= 8) strength += 1;
  
  // Complexity checks
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  
  return strength;
};

export const AuthPage: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, userInfo, success, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

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

  const onClearErrorMessage = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // If registration is successful, switch to login screen
    if (success && showSignUp) {
      toggleToShowSignUp();
    }
  }, [showSignUp, success, toggleToShowSignUp]);

  useEffect(() => {
    // If user is authenticated, redirect to home page
    if (isAuthenticated && userInfo && userInfo.id) {
      navigate("/");
    }
  }, [navigate, userInfo, isAuthenticated]);

  return (
    <Card className="auth-card">
      <AuthContainer className="place-form-container">
        <h2>{formText}</h2>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={showSignUp ? signupSchema : loginSchema}
          onSubmit={onSubmit}
          validateOnChange
          validateOnBlur
          enableReinitialize
        >
          {({ errors, values, touched, handleChange, handleSubmit, isValid, dirty }) => {
            return (
              <Form className="login-form">
                {showSignUp && (
                  <div
                    className={classNames("login-form-name", {
                      hasError: touched.name && errors.name,
                    })}
                  >
                    <label htmlFor={LogInFormValueFields.Name}>Your Name</label>
                    <Field
                      id={LogInFormValueFields.Name}
                      name={LogInFormValueFields.Name}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      value={values.name}
                      onChange={handleChange}
                      type="text"
                      autoFocus
                    />
                    {touched.name && errors.name && (
                      <div className="error-message">{errors.name}</div>
                    )}
                  </div>
                )}
                <div
                  className={classNames("login-form-email", {
                    hasError: touched.email && errors.email,
                  })}
                >
                  <label htmlFor={LogInFormValueFields.Email}>Email</label>
                  <Field
                    id={LogInFormValueFields.Email}
                    name={LogInFormValueFields.Email}
                    placeholder="yourname@example.com"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                    autoFocus={!showSignUp}
                  />
                  {touched.email && errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>
                <div
                  className={classNames("login-form-password", {
                    hasError: touched.password && errors.password,
                  })}
                >
                  <label htmlFor={LogInFormValueFields.Password}>
                    Password
                  </label>
                  <div className="password-input-wrapper">
                    <Field
                      id={LogInFormValueFields.Password}
                      name={LogInFormValueFields.Password}
                      placeholder={showSignUp ? "Create a secure password" : "Enter your password"}
                      autoComplete={showSignUp ? "new-password" : "current-password"}
                      value={values.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                    />
                    <button 
                      type="button" 
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  
                  {showSignUp && values.password && (
                    <div className="password-strength">
                      <div className="strength-meter">
                        <div 
                          className={`strength-meter-fill strength-${calculatePasswordStrength(values.password)}`} 
                          style={{width: `${calculatePasswordStrength(values.password) * 20}%`}}
                        ></div>
                      </div>
                      <div className="strength-text">
                        {calculatePasswordStrength(values.password) === 0 && "Very weak"}
                        {calculatePasswordStrength(values.password) === 1 && "Weak"}
                        {calculatePasswordStrength(values.password) === 2 && "Fair"}
                        {calculatePasswordStrength(values.password) === 3 && "Good"}
                        {calculatePasswordStrength(values.password) === 4 && "Strong"}
                        {calculatePasswordStrength(values.password) === 5 && "Very strong"}
                      </div>
                    </div>
                  )}
                  
                  {touched.password && errors.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                </div>
                <div className="action-col">
                  <Button
                    type="submit"
                    disabled={loading || (!isValid && dirty)}
                    onClick={handleSubmit}
                    aria-busy={loading}
                  >
                    {loading ? <Spinner /> : formText}
                  </Button>
                  
                  <div className="switch-mode">
                    <span>{showSignUp ? "Already have an account?" : "Don't have an account?"}</span>
                    <Button 
                      type="button" 
                      onClick={toggleToShowSignUp}
                    >
                      {showSignUp ? "Login" : "Sign Up"}
                    </Button>
                  </div>
                </div>
                {error && (
                  <div className="error-message form-error">{error}</div>
                )}
              </Form>
            );
          }}
        </Formik>
      </AuthContainer>
      {stringIsNotNullOrWhiteSpace(error) && ref != null ? (
        <ErrorModal error={error} ref={ref} onClear={onClearErrorMessage} />
      ) : null}
    </Card>
  );
};
