import _Form from './Form.js';
import Field from './Field.js';
import useForm from './useForm';

const Form = _Form;
Form.Field = Field;
Form.useForm = useForm;

export default Form;
export { Field, useForm };
