import React from 'react';
import FormContext from './FormContext.js';

function Form(props) {
  const { children, form } = props;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FormContext.Provider value={form}>{children}</FormContext.Provider>
    </form>
  );
}

export default Form;
