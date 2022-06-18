import { async } from '@firebase/util';
import SignUpForm from '../../component/sign-up-form/sign-up-form.component';

import './authentification.styles.scss';
import SignInForm from '../../component/sign-in-form/sign-in-form.component';

const Authentification = () => {
  return (
    <div className="authentification-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentification;
