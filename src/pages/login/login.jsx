import { loginUrl } from '../../services/authentication';
import styles from './login.module.css';

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginText}>Spotify Profile</div>
      <a className={styles.loginButton} href={loginUrl}>
        LOG IN TO SPOTIFY
      </a>
    </div>
  );
};

export default Login;
