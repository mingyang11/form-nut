import React from 'react';
import FormContext from './FormContext';

class Field extends React.Component {
  static contextType = FormContext;
  getControlled = () => {
    // name是表单项的name值
    const { name } = this.props;
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
