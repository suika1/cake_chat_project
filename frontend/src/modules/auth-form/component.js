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
    autoComplete: 'off',
  }],
}, {
  text: OPTION_TEXTS.registration,
  fields: [{
    placeholder: 'Name',
    type: 'text',
    name: 'regName',
  }, {
    placeholder: 'Email',
    type: 'email',
    name: 'regEmail',
  }, {
    placeholder: 'Password',
    type: 'password',
    name: 'regPassword',
    autoComplete: 'off',
  }, {
    placeholder: 'Password again',
    type: 'password',
    name: 'regPasswordAgain',
    autoComplete: 'off',
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
      loginUser,
    } = this.props;

    switch (this.state.chosenOption) {
      case 0:
        loginUser({
          data: formValues,
        });
        break;
      case 1:
        createUser({
          data: formValues,
        });
        break;
      case 2:
        alert('coming soon');
        break;
      default:
        console.log('something go wrong');
    }
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
    const {
      fieldProps,
      formValues,
      backendErrors,
      clearBackendError,
    } = this.props;
    const { chosenOption } = this.state;

    const isSubmitDisabled = Object.keys(backendErrors).length
      || this.isSubmitDisabled();

    return (
      <div className={s.authFormWrapper}>
        <form className={s.authForm}>
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
                errorMessage={{
                  label: backendErrors[field.name],
                  className: s.errorLabel,
                }}
                clearError={() => clearBackendError({
                  name: field.name,
                })}
                className={cx({
                  error: backendErrors[field.name],
                })}
                fieldProps={fieldProps}
                Component="input"
                formValues={formValues}
                spellCheck="false"
                {...field}
              />
            ))}
          </div>

          <button
            className={cx(s.actionBtn, {
              [s.btnDisabled]: isSubmitDisabled,
            })}
            type="button"
            onClick={() => !isSubmitDisabled && this.handleSubmit()}
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

AuthForm.propTypes = {
  formValues: PropTypes.shape({}).isRequired,
  fieldProps: PropTypes.shape({}).isRequired,
  createUser: PropTypes.func.isRequired,
}

export default WithForm(AuthForm);
