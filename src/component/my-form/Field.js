import React from 'react';
import FormContext from './FormContext';

class Field extends React.Component {
  static contextType = FormContext;

  componentDidMount() {
    // useForm中注册实例的方法
    const { registerEntetities } = this.context;
    // this代表的就是改filed的项，同时将返回值赋值给unregister方法，在卸载组件的生命周期中调用
    this.unregister = registerEntetities(this);
  }

  // 组件卸载时执行该方法，目的是将该实例从fieldEntetities中删除，同时删除store中保存的值
  componentWillUnmount() {
    this.unregister();
  }

  // 这个是给useForm.js中调用setFieldsValue方法时调用的
  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    // name是表单项的name值
    const { name, ...rest } = this.props;
    // 通过context我们可以拿到设置和获取store中的值，并将输入内容展示到表单上
    const { getFieldValue, setFieldsValue } = this.context;
    return {
      // 获取值
      value: getFieldValue(name),
      onChange: (e) => {
        // 修改值
        setFieldsValue({ [name]: e.target.value });
      },
    };
  };
  render() {
    const { children } = this.props;
    // 这一步的作用是将this.getControlled()的属性赋给Field的children
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}

export default Field;
