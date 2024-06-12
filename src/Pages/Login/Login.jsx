import { Link } from 'react-router-dom';
import loginPicture from '../../assets/register.jpg'
import useAuth from '../../Hooks/useAuth';
const Login = () => {

    const {loginUser} = useAuth();
    const handleSubmit = (e) =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        loginUser(email, password)
        .then(() => {

        })
        .catch(err => {
            console.log(err);
        })
    }
  return (
    <div className='pt-24'>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <img className="max-w-lg w-full rounded-lg" src={loginPicture} />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name='email'
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name='password'
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-[#9B111E] text-white">Login</button>
              </div>
            </form>

            <h1 className='text-center mb-6'>Do not have an account? <Link to={'/register'} className='text-[#9B111E]'> Register </Link> Here. </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
