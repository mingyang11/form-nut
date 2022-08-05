import { useRef } from 'react';

class FormStore {
  constructor() {
    this.store = {};
    this.fieldEntetities = [];
  }

  // 注册实例
  // 注册与取消实例
  //   订阅与取消订阅
  registerEntetities = (entity) => {
    this.fieldEntetities.push(entity);
    return () => {
      this.fieldEntetities = this.fieldEntetities.filter(
        (item) => item !== entity
      );
      delete this.store[entity.props.name];
    };
  };

  // get
  getFieldValue = (name) => {
    return this.store[name];
  };
  getFieldsValue = () => {
    return { ...this.store };
  };

  // set
  setFieldValue = (newStore) => {
    // 1. 更新store
    this.store = {
      ...this.store,
      ...newStore,
    };
    // 1.循环fieldEntetities
    this.fieldEntetities.forEach((entity) => {
      // 2.拿到表单更新项的key值
      Object.keys(newStore).forEach((item) => {
        // 3.判断是哪项表单要更新，仅更新当前的表单项，避免了所有的表单项更新
        if (item === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  };

  // 暴露方法
  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldValue: this.setFieldValue,
      registerEntetities: this.registerEntetities,
    };
  };
}

export default function useForm() {
  const formRef = useRef();
  if (!formRef.current) {
    const formStore = new FormStore();
    formRef.current = formStore.getForm();
  }
  return [formRef.current];
}
