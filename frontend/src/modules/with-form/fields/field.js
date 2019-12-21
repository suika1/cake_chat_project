import React from 'react';

export default class Field extends React.Component {
  componentDidMount = () => {
    const {
      name,
      fieldProps: {
        changeField,
      },
    } = this.props;
    changeField(name, '');
  }

  componentWillUnmount = () => {
    const {
      name,
      fieldProps: {
        removeField,
      },
    } = this.props;
    removeField(name);
  }

  render() {
    const {
      name,
      Component,
      fieldProps: {
        changeField,
        removeField,
      },
      formValues,
      errorMessage,
      clearError,
      ...props
    } = this.props;

    const defaultRender = (
      <Component
        name={name}
        onChange={e => {
          changeField(name, e.target.value);
          if (errorMessage && errorMessage.label) {
            clearError();
          }
        }}
        value={formValues[name] || ''}
        {...props}
      />
    );

    if (errorMessage && errorMessage.label) {
      return (
        <>
          {defaultRender}
          <div className={errorMessage.className}>
            {errorMessage.label || ''}
          </div>
        </>
      )
    }

    return defaultRender;
  }
}
