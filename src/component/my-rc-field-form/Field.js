import React, {
  Component,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';
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
    const { children } = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}

// 函数组件版Field
// function Field(props) {
//   const { children, name } = props;
//   // 使用useReducer改变后一定会触发渲染
//   const [_, forceUpdate] = React.useReducer((x) => x + 1, 0);
//   const { getFieldValue, setFieldValue, registerEntetities } =
//     useContext(FieldContext);

//   const getControlled = () => {
//     return {
//       value: getFieldValue(name),
//       onChange: (e) => {
//         const newValue = e.target.value;
//         setFieldValue({ [name]: newValue });
//       },
//     };
//   };

//   // useEffect执行是在node元素渲染完成之后才执行的，有一定的滞后性
//   // useLayoutEffect执行是立即执行的，这是两者的区别
//   // useEffect(() => {
//   useLayoutEffect(() => {
//     const unregister = registerEntetities({
//       props,
//       onStoreChange: forceUpdate,
//     });
//     return () => {
//       unregister();
//     };
//   }, []);

//   const returnChildNode = React.cloneElement(children, getControlled());
//   return returnChildNode;
// }

export default Field;
