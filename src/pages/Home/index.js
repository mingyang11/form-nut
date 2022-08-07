import React from 'react';
import Form, { Field } from '../../component/my-rc-field-form';
import Input from '../../component/Input';

function Home() {
  const [form] = Form.useForm();
  const onFinish = (val) => {
    console.log(val);
  };
  const onFinishFaild = (error) => {
    console.error(error);
  };
  React.useEffect(() => {
    form.setFieldValue({ name: '12' });
  }, []);
  return (
    <Form form={form} onFinish={onFinish} onFinishFaild={onFinishFaild}>
      <Field name="age" rules={[{ required: true }]}>
        <Input />
      </Field>
      <Field name="name" rules={[{ required: false }]}>
        <Input />
      </Field>
      <button>submit</button>
    </Form>
  );
}

export default Home;
