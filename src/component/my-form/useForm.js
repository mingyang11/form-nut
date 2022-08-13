import React from 'react';
class FormStore {
  constructor() {
    // 这个是保存状态值的
    this.store = {};
    // 存放Field实例的地方
    this.fieldEntetities = [];
    this.callBack = {};
  }

  registerEntetities = (entity) => {
    this.fieldEntetities.push(entity);
    return () => {
      // 将卸载的field表单项从fieldEntetities中删除
      this.fieldEntetities = this.fieldEntetities.filter(
        (item) => item !== entity
      );
      // 删除store中该表单保存的值
      delete this.store[entity.props.name];
    };
  };

  // 将form的函数传入callback中，是在form文件中调用
  setCallbacks = (newCallback) => {
    this.callBack = { ...this.callBack, ...newCallback };
  };

  // 校验通过遍历所有表单项的实例，然后取出每个表单项的name和rules来进行判断，如果是必填且未填的则放到错误信息数组中，返回该数组
  validate = () => {
    const errorArr = [];
    this.fieldEntetities.forEach((entity) => {
      const { name, rules } = entity.props;
      const value = this.getFieldValue(name);
      if (rules && rules[0].required && !value) {
        errorArr.push({ [name]: rules[0].message || '必填项', value: value });
      }
    });
    return errorArr;
  };

  // 提交
  submit = () => {
    const { onFinish, onFinishFailed } = this.callBack;
    const errorArr = this.validate();
    if (errorArr.length) {
      console.error(errorArr);
      onFinishFailed(errorArr);
    } else {
      onFinish && onFinish(errorArr);
    }
  };

  //   form中获取某个表单项数据
  getFieldValue = (name) => {
    console.log(this.store[name], 'name');
    return this.store[name];
  };
  //   form中获取所有表单项数据
  getFieldsValue = () => {
    return { ...this.store };
  };
  //   form中设置表单值
  setFieldsValue = (newStore) => {
    this.store = { ...this.store, ...newStore };
    // 循环fieldEntetities
    this.fieldEntetities.forEach((entity) => {
      // 拿到改变的表单项value，然后将键名与表单项的实例的name对比，
      // 如果对上了就表明当前改动的是这个表单项，然后调用该表单项的onStoreChange方法，进行强制更新
      Object.keys(newStore).forEach((item) => {
        if (item === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  };
  getForm() {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      registerEntetities: this.registerEntetities,
      setCallbacks: this.setCallbacks,
      submit: this.submit,
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
