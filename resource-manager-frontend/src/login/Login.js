import {Link} from 'react-router-dom';

function Login() {
    return (
      <div>
          Hello
          <Link to={location => ({...location, pathname: 'resources/mikzur'})}>halo</Link>
      </div>
    );
}

export default Login;