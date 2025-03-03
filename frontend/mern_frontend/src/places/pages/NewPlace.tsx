import { FC, useState } from "react";
import { Field, Form, Formik } from "formik";
import { NewPlaceFormValue, NewPlaceFormValueFields } from "../types.ts";
import { FieldMetaProps } from "formik/dist/types";
import { validateFormStringValue } from "./validate.ts";

export const NewPlace: FC = () => {
  const [formData, setFormData] = useState<NewPlaceFormValue>({
    title: "",
    description: "",
    imageUrl: "",
    address: "",
    lat: 0,
    lng: 0,
  });

  const handleUpdateFormValue = (
    field: NewPlaceFormValueFields,
    value: string | number,
  ) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
  };

  const onSubmit = () => {};

  return (
    <div className="place-form-container">
      <h2>Add New Place</h2>
      <Formik initialValues={formData} onSubmit={onSubmit}>
        <Form>
          <label htmlFor="title">Title</label>
          <Field
            id={NewPlaceFormValueFields.Title}
            name={NewPlaceFormValueFields.Title}
            value={formData.title}
            validate={validateFormStringValue(
              NewPlaceFormValueFields.Title,
              formData.title,
            )}
          >
            {({ meta }: { meta: FieldMetaProps<NewPlaceFormValue> }) => (
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  onChange={(e) =>
                    handleUpdateFormValue(
                      NewPlaceFormValueFields.Title,
                      e.target.value,
                    )
                  }
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};
