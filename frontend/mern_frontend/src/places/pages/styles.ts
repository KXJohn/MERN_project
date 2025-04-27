import styled from "styled-components";

export const FormContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0 auto;
    padding: 1rem;
    width: 90%;
    max-width: 40rem;
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

  .action-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    button:first-child {
      margin-bottom: 20px;
    }
  }

  .error-message {
    height: 30px;
  }
`;
