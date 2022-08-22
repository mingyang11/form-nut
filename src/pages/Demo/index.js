import React, { useEffect } from 'react';
import Form, { Field } from '../../component/my-form';
import Input from '../../component/Input';

function FormNut() {
  const [form] = Form.useForm();
  useEffect(() => {
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
  const onBlur = (e) => {
    console.log(e.target.value, '---------');
  };
  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Field name="name" rules={[{ required: true, message: '必填项' }]}>
        <Input onBlur={onBlur} />
      </Field>
      <Field name="age">
        <Input />
      </Field>
      <button>submit</button>
    </Form>
  );
}

export default FormNut;
