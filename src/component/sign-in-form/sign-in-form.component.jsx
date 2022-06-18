import { useState } from 'react';
import {
  signWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';

import './sign-in-form.styles.scss';
import Button from '../button/button.component';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // for google auth
  const signInWithGoogle = async () => {
    await signWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Hey password is incorrect, yo');
          break;
        case 'auth/user-not-found':
          alert('Hey user not found, yo');
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an accout</h2>
      <span>Sign in form with email and password</span>

      <form onSubmit={handleSubmit}>
        <label>Display name</label>

        <label>Email</label>
        <FormInput
          label="email"
          type="email"
          name="email"
          onChange={handleOnChange}
          value={email}
        />

        <label>Password</label>
        <FormInput
          label="password"
          type="password"
          name="password"
          onChange={handleOnChange}
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            google Auth
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
