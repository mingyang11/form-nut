import React from 'react';

function Form(props) {
  const { children } = props;
  return <form>{children}</form>;
}

export default Form;
