import { useForm } from 'react-hook-form';
import { CgDanger } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { useRegisterUser } from '../../hooks/useAuth';
import NavItemsList from '../common/navItemsList';
import Layout from '../global/layout';
import { menuLinks } from './menu';

function PageBody() {
  const { user } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: createUser, isLoading } = useRegisterUser({
    onSuccess: (response) => {
      const { status } = response;

      if (status === 'success') {
        reset();
      }
    },
  });

  const onCreateUser = (data) => {
    createUser(data);
  };

  return (
    <div className='mx-auto md:w-4/6 lg:w-1/5'>
      <h3 className='font-semibold text-2xl text-center mb-8 '>Add User</h3>
      <form onSubmit={handleSubmit(onCreateUser)}>
        <div className='mb-6'>
          <label htmlFor='first_name' className='input-label'>
            First name
          </label>
          <input
            type='text'
            id='first_name'
            className='input w-full'
            placeholder='first name'
            {...register('first_name', {
              required: true,
              minLength: 2,
              pattern: /^[a-zA-Z]+$/i,
            })}
          />
          <>
            {errors.first_name?.type === 'required' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' />{' '}
                <span className='font-medium'>Oops!</span> You forgot to add a
                first name!
              </p>
            )}
            {errors.first_name?.type === 'minLength' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' />{' '}
                <span className='font-medium'>Oops!</span> Your name can't be
                less than 2 characters
              </p>
            )}
            {errors.first_name?.type === 'pattern' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' /> Your name shouldn't contain
                numbers or spaces!
              </p>
            )}
          </>
        </div>

        <div className='mb-6'>
          <label htmlFor='middle_name' className='input-label'>
            Middle name <span className='text-xs font-light'>(optional)</span>
          </label>
          <input
            type='text'
            id='middle_name'
            className='input w-full'
            placeholder='middle name'
            {...register('middle_name', {
              minLength: 2,
              pattern: /^[a-zA-Z]+$/i,
            })}
          />
          <>
            {errors.middle_name?.type === 'minLength' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' />{' '}
                <span className='font-medium'>Oops!</span> Your name can't be
                less than 2 characters
              </p>
            )}
            {errors.middle_name?.type === 'pattern' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' /> Your name shouldn't contain
                numbers or spaces!
              </p>
            )}
          </>
        </div>

        <div className='mb-6'>
          <label htmlFor='last_name' className='input-label'>
            Last name
          </label>
          <input
            type='text'
            id='last_name'
            className='input w-full'
            placeholder='last name'
            {...register('last_name', {
              required: true,
              minLength: 2,
              pattern: /^[a-zA-Z]+$/i,
            })}
          />
          <>
            {errors.last_name?.type === 'required' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' />{' '}
                <span className='font-medium'>Oops!</span> You forgot to add a
                last name!
              </p>
            )}
            {errors.last_name?.type === 'minLength' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' />{' '}
                <span className='font-medium'>Oops!</span> Your name can't be
                less than 2 characters
              </p>
            )}
            {errors.last_name?.type === 'pattern' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' /> Your name shouldn't contain
                numbers or spaces!
              </p>
            )}
          </>
        </div>

        <div className='mb-6'>
          <label htmlFor='username' className='input-label'>
            Username
          </label>
          <input
            type='text'
            id='username'
            className='input w-full'
            placeholder='username'
            {...register('username', {
              required: true,
              minLength: 4,
              pattern: /^[a-zA-Z]+$/i,
            })}
          />
          <>
            {errors.username?.type === 'required' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' />{' '}
                <span className='font-medium'>Oops!</span> You forgot to add a
                username!
              </p>
            )}
            {errors.username?.type === 'minLength' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' />{' '}
                <span className='font-medium'>Oops!</span> Your name can't be
                less than 4 characters
              </p>
            )}
            {errors.username?.type === 'pattern' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' /> Your username shouldn't contain
                numbers or spaces!
              </p>
            )}
          </>
        </div>

        <div className='mb-6'>
          <label htmlFor='email' className='input-label'>
            Email
          </label>
          <input
            type='email'
            id='email'
            className='input w-full'
            placeholder='email'
            {...register('email', {
              required: true,
              minLength: 4,
              pattern:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            })}
          />
          <>
            {errors.email && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' /> Enter a valid email address
              </p>
            )}
          </>
        </div>

        <div className='mb-6'>
          <label htmlFor='phone_number' className='input-label'>
            Phone number
          </label>
          <input
            type='text'
            id='phone_number'
            className='input w-full'
            placeholder='phone number'
            {...register('phone_number', {
              required: true,
              minLength: 9,
              maxLength: 12,
              pattern: /^[0-9]{9,12}$/g,
            })}
          />
          <>
            {errors.phone_number && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' /> Enter a valid phone number
              </p>
            )}
          </>
        </div>

        <div className='mb-6'>
          <label htmlFor='password' className='input-label'>
            Provisional password
          </label>
          <input
            type='text'
            id='password'
            className='input w-full'
            placeholder='password'
            {...register('password', {
              required: true,
              minLength: 4,
            })}
          />
          <>
            {errors.password?.type === 'required' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' />{' '}
                <span className='font-medium'>Oops!</span> You forgot to add a
                password!
              </p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' /> Your provisional password
                should be at least 4 characters
              </p>
            )}
          </>
        </div>

        <div className='mb-6'>
          <label htmlFor='user_role' className='input-label'>
            User role
          </label>
          <select
            id='user_role'
            className='input w-full'
            {...register('user_role', { required: true })}
          >
            <option value='Content Creator'>Content Creator</option>
            {user?.user_role == 'Super Admin' && (
              <option value='Admin'>Admin</option>
            )}
          </select>
          <>
            {errors.user_role?.type === 'required' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' />{' '}
                <span className='font-medium'>Oops!</span> You forgot to specify
                a user role!
              </p>
            )}
          </>
        </div>

        {/* <!-- save buttons --> */}
        <div className='flex justify-end'>
          <button
            disabled={isLoading}
            type='submit'
            className='btn-primary w-full'
          >
            {isLoading ? 'Creating user...' : 'Create user'}
          </button>
        </div>
      </form>
    </div>
  );
}

function AdminAddUser() {
  return (
    <div className='bg-black'>
      <Layout
        headerArea={<NavItemsList menuLinks={menuLinks} />}
        mainArea={<PageBody />}
      />
    </div>
  );
}

export default AdminAddUser;
