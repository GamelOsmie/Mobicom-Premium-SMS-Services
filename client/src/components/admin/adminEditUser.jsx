import { useForm } from 'react-hook-form';
import { CgDanger } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchUser, useUpdateUser } from '../../hooks/useUser';
import NavItemsList from '../common/navItemsList';
import Layout from '../global/layout';
import { menuLinks } from './menu';

function PageBody() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { data: selectedUser } = useFetchUser({
    slug,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: updateUser, isLoading } = useUpdateUser({
    slug,
    options: {
      onSuccess: (response) => {
        const { status } = response;

        if (status == 'success') {
          navigate(-1);
        }
      },
    },
  });

  const onUpdateUser = (data) => {
    updateUser(data);
  };

  return (
    <>
      {selectedUser?.data && (
        <div className='mx-auto md:w-4/6 lg:w-1/5'>
          <h3 className='font-semibold text-2xl text-center mb-8 '>
            Update {selectedUser?.data?.first_name}'s Details
          </h3>
          <form onSubmit={handleSubmit(onUpdateUser)}>
            <div className='mb-6'>
              <label htmlFor='first_name' className='input-label'>
                First name
              </label>
              <input
                type='text'
                id='first_name'
                className='input w-full'
                placeholder='first name'
                defaultValue={selectedUser?.data?.first_name}
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
                    <span className='font-medium'>Oops!</span> You forgot to add
                    a first name!
                  </p>
                )}
                {errors.first_name?.type === 'minLength' && (
                  <p className='form-error-text flex items-center gap-1'>
                    <CgDanger className='text-lg' />{' '}
                    <span className='font-medium'>Oops!</span> Your name can't
                    be less than 2 characters
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
                Middle name{' '}
                <span className='text-xs font-light'>(optional)</span>
              </label>
              <input
                type='text'
                id='middle_name'
                className='input w-full'
                placeholder='middle name'
                defaultValue={selectedUser?.data?.middle_name}
                {...register('middle_name', {
                  minLength: 2,
                  pattern: /^[a-zA-Z]+$/i,
                })}
              />
              <>
                {errors.middle_name?.type === 'minLength' && (
                  <p className='form-error-text flex items-center gap-1'>
                    <CgDanger className='text-lg' />{' '}
                    <span className='font-medium'>Oops!</span> Your name can't
                    be less than 2 characters
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
                defaultValue={selectedUser?.data?.last_name}
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
                    <span className='font-medium'>Oops!</span> You forgot to add
                    a last name!
                  </p>
                )}
                {errors.last_name?.type === 'minLength' && (
                  <p className='form-error-text flex items-center gap-1'>
                    <CgDanger className='text-lg' />{' '}
                    <span className='font-medium'>Oops!</span> Your name can't
                    be less than 2 characters
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
                defaultValue={selectedUser?.data?.username}
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
                    <span className='font-medium'>Oops!</span> You forgot to add
                    a username!
                  </p>
                )}
                {errors.username?.type === 'minLength' && (
                  <p className='form-error-text flex items-center gap-1'>
                    <CgDanger className='text-lg' />{' '}
                    <span className='font-medium'>Oops!</span> Your name can't
                    be less than 4 characters
                  </p>
                )}
                {errors.username?.type === 'pattern' && (
                  <p className='form-error-text flex items-center gap-1'>
                    <CgDanger className='text-lg' /> Your username shouldn't
                    contain numbers or spaces!
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
                defaultValue={selectedUser?.data?.email}
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
                defaultValue={selectedUser?.data?.phone_number}
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
              <label htmlFor='user_role' className='input-label'>
                User role
              </label>
              <select
                id='user_role'
                className='input w-full'
                defaultValue={selectedUser?.data?.user_role}
                {...register('user_role', { required: true })}
              >
                <option value={selectedUser?.data?.user_role}>
                  {selectedUser?.data?.user_role}
                </option>
                {selectedUser?.data?.user_role !== 'Content Creator' && (
                  <option value='Content Creator'>Content Creator</option>
                )}
                {user?.user_role == 'Super Admin' &&
                  selectedUser?.data?.user_role !== 'Admin' && (
                    <option value='Admin'>Admin</option>
                  )}
              </select>
              <>
                {errors.user_role?.type === 'required' && (
                  <p className='form-error-text flex items-center gap-1'>
                    <CgDanger className='text-lg' />{' '}
                    <span className='font-medium'>Oops!</span> You forgot to
                    specify a user role!
                  </p>
                )}
              </>
            </div>

            <div className='mb-6'>
              <label htmlFor='status' className='input-label'></label>
              <select
                id='status'
                className='input w-full'
                defaultValue={selectedUser?.data?.is_active}
                {...register('is_active', { required: true })}
              >
                <option value={Boolean(selectedUser?.data?.is_active)}>
                  {selectedUser?.data?.is_active ? 'Active' : 'Suspended'}
                </option>
                {selectedUser?.data?.is_active ? (
                  <option value={Boolean(false)}>Suspend</option>
                ) : (
                  <option value={Boolean(true)}>Reactive</option>
                )}
              </select>
              <>
                {errors.user_role?.type === 'required' && (
                  <p className='form-error-text flex items-center gap-1'>
                    <CgDanger className='text-lg' />{' '}
                    <span className='font-medium'>Oops!</span> You forgot to
                    specify a user role!
                  </p>
                )}
              </>
            </div>

            <div className='mb-6'>
              <label htmlFor='has_2020_access' className='input-label'>
                Has access to 2020
              </label>
              <select
                id='has_2020_access'
                className='input w-full'
                {...register('has_2020_access')}
                defaultValue={selectedUser?.data?.has_2020_access}
              >
                <option value={Boolean(selectedUser?.data?.has_2020_access)}>
                  {selectedUser?.data?.has_2020_access ? 'Yes' : 'No'}
                </option>
                {selectedUser?.data?.has_2020_access ? (
                  <option value={Boolean(false)}>No</option>
                ) : (
                  <option value={Boolean(true)}>Yes</option>
                )}
              </select>
            </div>

            <div className='mb-6'>
              <label htmlFor='has_2021_access' className='input-label'>
                Has access to 2021
              </label>
              <select
                id='has_2021_access'
                className='input w-full'
                {...register('has_2021_access')}
                defaultValue={selectedUser?.data?.has_2021_access}
              >
                <option value={Boolean(selectedUser?.data?.has_2021_access)}>
                  {selectedUser?.data?.has_2021_access ? 'Yes' : 'No'}
                </option>
                {selectedUser?.data?.has_2021_access ? (
                  <option value={Boolean(false)}>No</option>
                ) : (
                  <option value={Boolean(true)}>Yes</option>
                )}
              </select>
            </div>

            <div className='mb-6'>
              <label htmlFor='has_2022_access' className='input-label'>
                Has access to 2022
              </label>
              <select
                id='has_2022_access'
                className='input w-full'
                {...register('has_2022_access')}
                defaultValue={selectedUser?.data?.has_2022_access}
              >
                <option value={Boolean(selectedUser?.data?.has_2022_access)}>
                  {selectedUser?.data?.has_2022_access ? 'Yes' : 'No'}
                </option>
                {selectedUser?.data?.has_2022_access ? (
                  <option value={Boolean(false)}>No</option>
                ) : (
                  <option value={Boolean(true)}>Yes</option>
                )}
              </select>
            </div>

            <div className='mb-6'>
              <label htmlFor='has_2023_access' className='input-label'>
                Has access to 2023
              </label>
              <select
                id='has_2023_access'
                className='input w-full'
                {...register('has_2023_access')}
                defaultValue={selectedUser?.data?.has_2023_access}
              >
                <option value={Boolean(selectedUser?.data?.has_2023_access)}>
                  {selectedUser?.data?.has_2023_access ? 'Yes' : 'No'}
                </option>
                {selectedUser?.data?.has_2023_access ? (
                  <option value={Boolean(false)}>No</option>
                ) : (
                  <option value={Boolean(true)}>Yes</option>
                )}
              </select>
            </div>

            <div className='mb-6'>
              <label htmlFor='has_2024_access' className='input-label'>
                Has access to 2024
              </label>
              <select
                id='has_2024_access'
                className='input w-full'
                {...register('has_2024_access')}
                defaultValue={selectedUser?.data?.has_2024_access}
              >
                <option value={Boolean(selectedUser?.data?.has_2024_access)}>
                  {selectedUser?.data?.has_2024_access ? 'Yes' : 'No'}
                </option>
                {selectedUser?.data?.has_2024_access ? (
                  <option value={Boolean(false)}>No</option>
                ) : (
                  <option value={Boolean(true)}>Yes</option>
                )}
              </select>
            </div>

            {/* <!-- save buttons --> */}
            <div className='flex justify-end'>
              <button
                disabled={isLoading}
                type='submit'
                className='btn-primary w-full'
              >
                {isLoading ? 'Updating user...' : 'Update user'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

function AdminEditUser() {
  return (
    <div className='bg-black'>
      <Layout
        headerArea={<NavItemsList menuLinks={menuLinks} />}
        mainArea={<PageBody />}
      />
    </div>
  );
}

export default AdminEditUser;
