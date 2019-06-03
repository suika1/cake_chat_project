import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import WithForm from 'modules/with-form';
import Field from 'modules/with-form/fields/field';

import s from './styles.scss';

const OPTION_TEXTS = {
  login: 'Login',
  registration: 'Registration',
  reset: 'Reset',
};

const options = [{
  text: OPTION_TEXTS.login,
  fields: [{
    placeholder: 'Email',
    type: 'email',
    name: 'loginEmail',
   }, {
    placeholder: 'Password',
    type: 'password',
    name: 'loginPassword',
   }],
}, {
  text: OPTION_TEXTS.registration,
  fields: [{
    placeholder: 'Name',
    type: 'text',
    name: 'regName',
  },{
    placeholder: 'Email',
    type: 'email',
    name: 'regEmail',
   }, {
    placeholder: 'Password',
    type: 'password',
    name: 'regPassword',
   }, {
    placeholder: 'Password again',
    type: 'password',
    name: 'regPasswordAgain',
   }],
}, {
  name: OPTION_TEXTS.reset,
  text: 'Reset',
  fields: [{
    placeholder: 'Email',
    type: 'email',
    name: 'resetEmail',
   }],
}];

class AuthForm extends React.Component {
  state = {
    chosenOption: 0,
  }

  handleSubmit = () => {
    const {
      formValues,
      createUser,
    } = this.props;

    createUser({
      data: formValues,
    });
  }

  isSubmitDisabled = () => {
    const { formValues } = this.props;
    const { chosenOption } = this.state;

    // check if any of fields are empty
    if (options[chosenOption].fields
      .filter(field => !formValues[field.name])
      .length
    ) {
     return true; 
    }

    // check if both passwords are same on registration step
    if (options[chosenOption].text === OPTION_TEXTS.registration
      && formValues.regPassword !== formValues.regPasswordAgain
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { changeField, formValues } = this.props;
    const { chosenOption } = this.state;

    const isSubmitDisabled = this.isSubmitDisabled();

    return (
      <div className={s.authFormWrapper}>
        <div className={s.authForm}>
            <div className={s.options}>
                {options.map((option, idx) => (
                  <div
                    key={idx}
                    className={s.optionWrapper}
                  >
                    <button
                      type="button"
                      className={cx(s.option, {
                        [s.chosen]: chosenOption === idx,
                      })}
                      onClick={() => this.setState({ chosenOption: idx })}
                    >
                      {option.text}
                    </button>
                    {chosenOption === idx && (
                      <div className={s.pseudoArrow} />
                    )}
                  </div>
                ))}
            </div>

            <div className={s.fields}>
                {options[chosenOption].fields.map((field, idx) => (
                  <Field
                    key={field.name}
                    name={field.name}
                    changeField={changeField}
                    Component={'input'}
                    formValues={formValues}
                    type={field.type}
                    spellCheck="false"
                    placeholder={field.placeholder}
                  />
                ))}
            </div>

            <button
              className={cx(s.actionBtn, {
                [s.btnDisabled]: isSubmitDisabled,
              })}
              type="button"
              onClick={() => isSubmitDisabled && this.handleSubmit()}
              disabled={isSubmitDisabled}
            >
              Submit
            </button>
        </div>
      </div>
    )
  }
}

AuthForm.propTypes = {
  formValues: PropTypes.shape({}).isRequired,
  changeField: PropTypes.func.isRequired,
}

export default WithForm(AuthForm);
