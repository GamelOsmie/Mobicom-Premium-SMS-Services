import { useForm } from 'react-hook-form';
import { CgDanger } from 'react-icons/cg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';

function Login() {
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: loginUser, isLoading: logingInUser } = useLogin({
    onSuccess: (response) => {
      const { status } = response;

      if (status === 'success') {
        navigate(from.includes('password') ? '/' : from, { replace: true });
      }
    },
  });

  const onLogin = (data) => {
    loginUser(data);
  };

  return (
    <div className='min-h-[100vh] flex items-center justify-center px-10'>
      <div className='rounded-md bg-white p-5 md:p-7 lg:p-10 w-full md:w-3/5 lg:w-1/4'>
        <h1 className='text-center text-primary font-bold text-2xl mb-10'>
          Login
        </h1>

        <form onSubmit={handleSubmit(onLogin)}>
          <div className='mb-6'>
            <label htmlFor='phone_number' className='input-label'>
              Phone number
            </label>
            <input
              type='tel'
              id='phone_number'
              className='input w-full'
              placeholder='your phone number'
              {...register('phone_number', {
                required: true,
                minLength: 9,
                maxLength: 12,
                pattern: /^[0-9]{9,12}$/g,
              })}
            />
            <>
              <>
                {errors.phone_number && (
                  <p className='form-error-text flex items-center gap-1'>
                    <CgDanger className='text-lg' /> Enter a valid phone number
                  </p>
                )}
              </>
            </>
          </div>

          <div className='mb-6'>
            <label htmlFor='password' className='input-label'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='input w-full'
              placeholder='your password'
              {...register('password', {
                required: true,
              })}
            />
            <>
              {errors.password && (
                <p className='form-error-text flex items-center gap-1'>
                  <CgDanger className='text-lg' /> You forgot to enter your
                  password
                </p>
              )}
            </>
          </div>

          <div>
            <button type='submit' className='btn-primary w-full'>
              {logingInUser ? 'loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
