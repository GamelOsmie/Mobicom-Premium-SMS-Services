import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgDanger } from 'react-icons/cg';
import { IoKeyOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdateMyPassword, useUpdateMyProfile } from '../../hooks/useUser';
import { setUser } from '../../redux/authSlice';
import { menuLinks } from '../admin/menu';
import { creatorMenuLinks } from '../content creator/menu';
import Layout from '../global/layout';
import Modal from './modal';
import NavItemsList from './navItemsList';

function PageBody() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [passwordModalOpened, setPasswordModalOpened] = useState(false);

  const togglePasswordModal = () => {
    setPasswordModalOpened(!passwordModalOpened);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
  } = useForm();

  const { mutate: updateProfile, isLoading: updatingProfile } =
    useUpdateMyProfile({
      onSuccess: (response) => {
        const { status, data } = response;

        if (status == 'success') {
          dispatch(setUser(data));

          navigate(-1);
        }
      },
    });

  const { mutate: updatePassword, isLoading: updatingPassword } =
    useUpdateMyPassword({
      onSuccess: (response) => {
        const { status, data } = response;

        if (status == 'success') {
          setPasswordModalOpened(false);
        }
      },
    });

  const onUpdateUser = (data) => {
    updateProfile(data);
  };

  const onUpdatePassword = (data) => {
    updatePassword(data);
  };

  return (
    <>
      {/* Title, Search and Add User */}
      <div className='grid grid-cols-2 items-center pb-8 mb-10 border-b'>
        <h2 className='text-3xl font-medium mb-10 md:mb-0'>Update Profile</h2>

        {/* search and add new  */}
        <div className='col-span-2 md:col-span-1  flex flex-wrap items-center justify-end'>
          {/* <!-- add User button--> */}

          <button
            onClick={togglePasswordModal}
            type='button'
            className='btn-primary md:ml-4 w-full md:w-fit flex items-center gap-2'
          >
            <IoKeyOutline className='text-xl' />
            Change Password
          </button>
        </div>
      </div>

      <div className='mx-auto md:w-4/6 lg:w-1/5'>
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
              defaultValue={user.first_name}
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
              defaultValue={user.middle_name}
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
              defaultValue={user.last_name}
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
              defaultValue={user.username}
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
              defaultValue={user.email}
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
              defaultValue={user.phone_number}
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

          {/* <!-- save buttons --> */}
          <div className='flex justify-end'>
            <button
              disabled={updatingProfile}
              type='submit'
              className='btn-primary w-full'
            >
              {updatingProfile ? 'Updating user...' : 'Update user'}
            </button>
          </div>
        </form>
      </div>

      <Modal
        toggleModal={togglePasswordModal}
        modalIsOpen={passwordModalOpened}
      >
        <h2 className='text-2xl text-center mb-5'>Change Your Password</h2>

        <form onSubmit={handleSubmitPassword(onUpdatePassword)}>
          <div className='mb-6'>
            <label htmlFor='current password' className='input-label'>
              Current Password
            </label>
            <input
              type='current_password'
              id='current_password'
              className='input w-full'
              placeholder='current password'
              {...registerPassword('current_password', {
                required: true,
              })}
            />
            <>
              {passwordErrors.current_password && (
                <p className='form-error-text flex items-center gap-1'>
                  <CgDanger className='text-lg' /> You forgot to enter your
                  current password
                </p>
              )}
            </>
          </div>

          <div className='mb-6'>
            <label htmlFor='current password' className='input-label'>
              New Password
            </label>
            <input
              type='new_password'
              id='new_password'
              className='input w-full'
              placeholder='new password'
              {...registerPassword('new_password', {
                required: true,
                minLength: 6,
              })}
            />
            <>
              {passwordErrors.new_password?.type == 'required' && (
                <p className='form-error-text flex items-center gap-1'>
                  <CgDanger className='text-lg' /> You forgot to enter your new
                  password
                </p>
              )}
              {passwordErrors.new_password?.type == 'minLength' && (
                <p className='form-error-text flex items-center gap-1'>
                  <CgDanger className='text-lg' /> Your password shouldn't be
                  less than 6 characters
                </p>
              )}
            </>
          </div>

          {/* <!-- save buttons --> */}
          <div className='flex justify-end'>
            <button
              disabled={updatingPassword}
              type='submit'
              className='btn-primary w-full'
            >
              {updatingPassword ? 'Changing...' : 'Change password'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

function UpdateProfile() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className='bg-black'>
      <Layout
        headerArea={
          <NavItemsList
            menuLinks={
              user.user_role.includes('Admin') ? menuLinks : creatorMenuLinks
            }
          />
        }
        mainArea={<PageBody />}
      />
    </div>
  );
}

export default UpdateProfile;
