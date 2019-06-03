import React from 'react';

const WithForm = (WrappedComponent) => {
  return class WithForm extends React.Component {
    state = {
      values: {},
    }

    getValues = () => this.state.values || {};

    changeFieldValue = (fieldName, value) => {
      if (!fieldName || !fieldName.length) return;
      this.setState(state => ({
        values: {
          ...state.values,
          [fieldName]: value,
        }
      }));
    }
    
    render() {
      return (
        <WrappedComponent
          formValues={this.getValues()}
          changeField={this.changeFieldValue}
          {...this.props}
        />
      )
    }
  }  
}

export default WithForm;
