import React from 'react';
import Form, { Field } from '../../component/my-form';
import Input from '../../component/Input';

function FormNut() {
  return (
    <Form>
      <Field>
        <Input />
      </Field>
      <Field>
        <Input />
      </Field>
    </Form>
  );
}

export default FormNut;
