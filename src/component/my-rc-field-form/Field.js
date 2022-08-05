import React, { Component } from 'react';
import FieldContext from './FieldContext';

class Field extends Component {
  // 消费context
  static contextType = FieldContext;

  componentDidMount() {
    this.unregister = this.context.registerEntetities(this);
  }

  componentWillUnmount() {
    //   取消注册时
    this.unregister();
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const { name } = this.props;
    const { getFieldValue, setFieldValue } = this.context;
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value;
        setFieldValue({ [name]: newValue });
      },
    };
  };
  render() {
    console.log(2222);
    const { children } = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}

export default Field;
