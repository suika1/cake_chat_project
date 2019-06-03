import React from 'react';

export default class Field extends React.Component {
  componentDidMount = () => {
    const {
      name,
      changeField,
    } = this.props;
    changeField(name, '');
  }

  componentWillUnmount = () => {
    const {
      name,
      changeField,
    } = this.props;
    changeField(name, '');
    console.log('unmount: ', name);
  }

  render() {
    const {
      name,
      Component,
      changeField,
      formValues,
      ...props
    } = this.props;
    return (
      <Component
        name={name}
        onChange={e => changeField(name, e.target.value)}
        value={formValues[name] || ''}
        {...props}
      />
    )
  }
}
