import React from 'react';

import cx from 'classnames';

import s from './styles.scss';

const options = [{
  name: 'Login',
  fields: [{
    placeholder: 'Email',
    type: 'email',
   }, {
    placeholder: 'Password',
    type: 'password',
   }],
}, {
  name: 'Registration',
  fields: [{
    placeholder: 'Name',
    type: 'text',
  },{
    placeholder: 'Email',
    type: 'email',
   }, {
    placeholder: 'Password',
    type: 'password',
   }],
}, {
  name: 'Reset',
  fields: [{
    placeholder: 'Email',
    type: 'email',
   }],
}];

class AuthForm extends React.Component {
  state = {
    chosenOption: 0,
  }

  render() {
    const { chosenOption } = this.state;

    let i = 0;
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
                      className={cx(s.option, {
                        [s.chosen]: chosenOption === idx,
                      })}
                      onClick={() => this.setState({ chosenOption: idx })}
                    >
                      {option.name}
                    </button>
                    {chosenOption === idx && (
                      <div className={s.pseudoArrow} />
                    )}
                  </div>
                ))}
            </div>
            <div className={s.fields}>
                {options[chosenOption].fields.map((field, idx) => (
                  <input
                    key={idx}
                    type={field.type}
                    spellCheck="false"
                    placeholder={field.placeholder}
                  />
                ))}
            </div>
            <button className={s.actionBtn} type="button">Submit</button>
        </div>
      </div>
    )
  }
}

export default AuthForm;
