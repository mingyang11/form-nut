import React from 'react';

class Field extends React.Component {
  getControlled = () => {
    return {
      value: '',
      onChange: (e) => {
        console.log();
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
