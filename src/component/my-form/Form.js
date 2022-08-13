import React from 'react';
import FormContext from './FormContext.js';

function Form(props) {
  const { children, form, onFinish, onFinishFailed } = props;
  // 将检验完成和未完成需要执行的事件放到useForm的callBack对象中
  form.setCallbacks({
    onFinish,
    onFinishFailed,
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // 执行提交校验操作
        form.submit();
      }}
    >
      <FormContext.Provider value={form}>{children}</FormContext.Provider>
    </form>
  );
}

export default Form;
