import React from 'react';
import FieldContext from './FieldContext';

export default function Form({ children, form, onFinish, onFinishFaild }) {
  form.setCallbacks({
    onFinish,
    onFinishFaild,
  });
  return (
    <form
      onSubmit={(e) => {
        // 为了阻止form的默认事件，以避免每次提交的时候都会自动刷新页面
        e.preventDefault();
        form.submit();
      }}
    >
      <FieldContext.Provider value={form}>{children}</FieldContext.Provider>
    </form>
  );
}
