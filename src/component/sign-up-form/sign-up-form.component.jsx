import Button from '../button/button.component';
import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('password do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      console.log(user);
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        alert('EMAIL_EXISTS');
      }
      console.log('user creation encoutered an error ', error);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up form with email and password</span>

      <form onSubmit={handleSubmit}>
        <label>Display name</label>
        <FormInput
          label="displayName"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleOnChange}
        />

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

        <label>Confirm password</label>
        <FormInput
          label="Confirm password"
          type="password"
          name="confirmPassword"
          onChange={handleOnChange}
          value={confirmPassword}
        />

        <Button type="submit" buttonType="inverted">
          Sign UP
        </Button>
      </form>
    </div>
  );
};
export default SignUpForm;
