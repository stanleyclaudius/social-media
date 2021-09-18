import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { register } from './../redux/actions/authActions';
import HeadInfo from './../utils/HeadInfo';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  const handleInputChange = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(register(userData));
    setUserData({name: '', username: '', email: '', password: '', confirmPassword: ''});
  }

  useEffect(() => {
    if (auth.token)
      history.push('/');
  }, [auth.token, history]);

  return (
    <>
      <HeadInfo title='SR Social - Register' />
      <div className='auth'>
        <div className="auth__box">
          <h1>SR Social</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="inputGroup">
              <label htmlFor="name">Name</label>
              <input type="text" id='name' name='name' autoComplete='off' value={userData.name} onChange={handleInputChange} />
            </div>
            <div className="inputGroup">
              <label htmlFor="username">Username</label>
              <input type="text" id='username' name='username' autoComplete='off' value={userData.username} onChange={handleInputChange} />
            </div>
            <div className="inputGroup">
              <label htmlFor="email">Email address</label>
              <input type="text" id='email' name='email' autoComplete='off' value={userData.email} onChange={handleInputChange} />
            </div>
            <div className="inputGroup">
              <label htmlFor="password">Password</label>
              <div className="inputGroup--password">
                <input type={isShowPassword ? 'text' : 'password'} name="password" id="password" value={userData.password} onChange={handleInputChange} />
                {isShowPassword ? <AiFillEyeInvisible onClick={() => setIsShowPassword(false)} /> : <AiFillEye onClick={() => setIsShowPassword(true)} />}
              </div>
            </div>
            <div className="inputGroup">
              <label htmlFor="confirmPassword">Password Confirmation</label>
              <div className="inputGroup--password">
                <input type={isShowConfirmPassword ? 'text' : 'password'} id='confirmPassword' name='confirmPassword' autoComplete='off' value={userData.confirmPassword} onChange={handleInputChange} />
                {isShowConfirmPassword ? <AiFillEyeInvisible onClick={() => setIsShowConfirmPassword(false)} /> : <AiFillEye onClick={() => setIsShowConfirmPassword(true)} />}
              </div>
            </div>
            <button>Register</button>
          </form>
          <p to='/register'>
            Already have an account? Click <Link to='/login'>here</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register;