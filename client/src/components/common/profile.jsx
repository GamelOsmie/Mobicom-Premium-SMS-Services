import { FaRegEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { menuLinks } from '../admin/menu';
import { creatorMenuLinks } from '../content creator/menu';
import Layout from '../global/layout';
import NavItemsList from './navItemsList';

function PageBody() {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {/* Title, Search and Add User */}
      <div className='grid grid-cols-2 items-center pb-8 mb-10 border-b'>
        <h2 className='text-3xl font-medium mb-10 md:mb-0'>My Profile</h2>
      </div>

      <div className='mx-auto md:w-4/6 lg:w-1/3 text-center'>
        <h1 className='text-3xl'>
          {user?.first_name} {user?.middle_name} {user?.last_name}{' '}
          <span className='text-base text-gray-400'>({user?.username})</span>
        </h1>
        <p>{user?.email}</p>
        <p>{user?.phone_number}</p>

        <Link
          to={'update'}
          className='text-sm text-blue-600 hover:text-blue-500 duration-500 flex justify-center mt-8 gap-1'
        >
          <FaRegEdit className='text-xl' /> edit profile
        </Link>
      </div>
    </>
  );
}

function Profile() {
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

export default Profile;
