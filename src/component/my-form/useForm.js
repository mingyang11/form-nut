import React from 'react';
class FormStore {
  constructor() {
    // 这个是保存状态值的
    this.store = {};
  }
  //   form中获取某个表单项数据
  getFieldValue = (name) => {
    return this.store[name];
  };
  //   form中获取所有表单项数据
  getFieldsValue = () => {
    return { ...this.store };
  };
  //   form中设置表单值
  setFieldsValue = (newStore) => {
    this.store = { ...this.store, ...newStore };
  };
  getForm() {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
    };
  }
}

function useForm() {
  // 使用ref是可以保证ref实时更新保持一致
  const storeRef = React.useRef();
  //   判断ref是否创建，如果创建了则直接返回，否则新创建一个
  if (!storeRef.current) {
    const formStore = new FormStore();
    storeRef.current = formStore.getForm();
  }
  return [storeRef.current];
}

export default useForm;
