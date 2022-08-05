import React from 'react';
import Form, { Field } from '../../component/my-rc-field-form';
import Input from '../../component/Input';

function Home() {
  const [form] = Form.useForm();
  return (
    <Form form={form}>
      <Field name="name">
        <Input />
      </Field>
      <Field name="age">
        <Input />
      </Field>
    </Form>
  );
}

export default Home;
