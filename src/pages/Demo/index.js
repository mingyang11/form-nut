import React from 'react';
import Form, { Field } from '../../component/my-form';
import Input from '../../component/Input';

function FormNut() {
  const [form] = Form.useForm();
  return (
    <Form form={form}>
      <Field name="name">
        <Input />
      </Field>
      <Field name="age">
        <Input />
      </Field>
      <button>submit</button>
    </Form>
  );
}

export default FormNut;
