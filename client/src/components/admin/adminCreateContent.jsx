import { useForm } from 'react-hook-form';
import { CgDanger } from 'react-icons/cg';

import { useCreateContent } from '../../hooks/useContents';
import NavItemsList from '../common/navItemsList';
import Layout from '../global/layout';
import { menuLinks } from './menu';
import { creatorMenuLinks } from '../content creator/menu';
import { useSelector } from 'react-redux';

function PageBody() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  // monitor character limitdas
  const message = watch('body');

  const { mutate: createContent, isLoading } = useCreateContent({
    onSuccess: (response) => {
      const { status } = response;

      if (status === 'success') {
        reset();
      }
    },
  });

  const onCreateContent = (data) => {
    createContent(data);
  };

  return (
    <div className='mx-auto md:w-4/6 lg:w-1/3'>
      <h3 className='font-semibold text-2xl text-center mb-8 '>
        Create Content
      </h3>
      <form onSubmit={handleSubmit(onCreateContent)}>
        <div className='mb-6'>
          <label htmlFor='subject' className='input-label'>
            Subject
          </label>
          <input
            type='text'
            id='subject'
            className='input w-full'
            placeholder='subject'
            {...register('subject', {
              required: true,
              minLength: 2,
            })}
          />
          <>
            {errors.subject?.type === 'required' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' />{' '}
                <span className='font-medium'>Oops!</span> You forgot to add a
                subject!
              </p>
            )}
            {errors.subject?.type === 'minLength' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' />{' '}
                <span className='font-medium'>Oops!</span> Your subject is too
                short
              </p>
            )}
          </>
        </div>

        <div className='mb-6'>
          <label htmlFor='body' className='input-label'>
            Message
          </label>
          <textarea
            rows={4}
            type='text'
            id='body'
            className='input w-full'
            placeholder='message'
            {...register('body', {
              minLength: 2,
              maxLength: 120,
            })}
          />
          <div className='flex justify-end'>
            {message?.length <= 120 && (
              <p className='text-gray-400 text-sm font-light'>
                {120 - message?.length} characters remaining
              </p>
            )}
          </div>
          <>
            {errors.body?.type === 'minLength' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' />{' '}
                <span className='font-medium'>Oops!</span> Your message is too
                short
              </p>
            )}
            {errors.body?.type === 'maxLength' && (
              <p className='form-error-text flex items-start gap-1'>
                <CgDanger className='text-lg' />
                Your message shouldn't be longer than 120 characters
              </p>
            )}
          </>
        </div>

        <div className='mb-6'>
          <label htmlFor='category' className='input-label'>
            Category
          </label>
          <select
            id='category'
            className='input w-full'
            {...register('category', { required: true })}
          >
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
            <option value='2023'>2023</option>
            <option value='2024'>2024</option>
          </select>

          <>
            {errors.category?.type === 'required' && (
              <p className='form-error-text flex items-center gap-1'>
                <CgDanger className='text-lg' /> You need to select a category
              </p>
            )}
          </>
        </div>

        <div className='mb-6'>
          <label htmlFor='publication_status' className='input-label'>
            Publication status
          </label>
          <select
            id='publication_status'
            className='input w-full'
            value='draft'
            {...register('publication_status', { required: true })}
          >
            <option value='draft'>Draft</option>
            <option value='published'>Published</option>
          </select>
        </div>

        {/* <!-- save buttons --> */}
        <div className='flex justify-end'>
          <button
            disabled={isLoading}
            type='submit'
            className='btn-primary w-full'
          >
            {isLoading ? 'Creating content...' : 'Create content'}
          </button>
        </div>
      </form>
    </div>
  );
}

function AdminCreateContent() {
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

export default AdminCreateContent;
