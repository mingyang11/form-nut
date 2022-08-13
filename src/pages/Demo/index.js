import React, { useEffect } from 'react';
import Form, { Field } from '../../component/my-form';
import Input from '../../component/Input';

function FormNut() {
  const [form] = Form.useForm();
  useEffect(() => {
    console.log(form, 'form');
    form.setFieldsValue({ name: 'default' });
  }, []);
  // 表单校验成功执行的事件
  const onFinish = (value) => {
    console.log(value);
  };
  // 表单校验失败执行的事件
  const onFinishFailed = (err) => {
    console.log(err);
  };
  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Field name="name" rules={[{ required: true, message: '必填项' }]}>
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
