import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFetchAllUsers } from '../../hooks/useUser';
import { baseURL } from '../../utils/request';
import Modal from '../common/modal';
import NavItemsList from '../common/navItemsList';
import Layout from '../global/layout';
import { menuLinks } from './menu';

function UserTable({ users, isLoading }) {
  const [detailedModalOpened, setDetailedModalOpened] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const handleCloseModal = () => setDetailedModalOpened(false);

  const handleViewDetails = (slug) => {
    const user = users.find((data) => data.slug === slug);

    setUserDetails(user);

    setDetailedModalOpened(true);
  };

  return (
    <>
      <div className='relative overflow-x-auto sm:rounded-lg mb-10'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                name
              </th>
              <th scope='col' className='px-6 py-3'>
                username
              </th>
              <th scope='col' className='px-6 py-3'>
                role
              </th>
              <th scope='col' className='px-6 py-3'>
                status
              </th>
              <th scope='col' className='px-6 py-3'></th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className='bg-white border-b'>
                <th
                  scope='row'
                  className='px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {user.first_name} {user.middle_name} {user.last_name}
                </th>
                <td className='px-6 py-4'>{user?.username}</td>
                <td className='px-6 py-4'>{user?.user_role}</td>
                <td className='px-6 py-4'>
                  <span
                    className={
                      user?.is_active ? 'active-pill' : 'inactive-pill'
                    }
                  >
                    {user?.is_active ? 'active' : 'suspended'}
                  </span>
                </td>
                <td className='px-6 py-4 flex gap-4'>
                  <span
                    onClick={() => handleViewDetails(user.slug)}
                    className='font-medium text-blue-600 hover:text-blue-500 cursor-pointer'
                  >
                    View
                  </span>
                  <Link to={user.slug}>
                    <span className='font-medium text-blue-600 hover:text-blue-500 cursor-pointer'>
                      Edit
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading && (
          <div className='p-10 text-center text-sm'>getting users...</div>
        )}

        {!users?.length && !isLoading && (
          <div className='p-10 text-center text-sm'>No user found</div>
        )}

        {/*      
        <div className='mt-8 flex flex-col items-center md:flex-row justify-center md:justify-between'>
         
          <div className='text-sm text-gray-700 mb-4 md:mb-0 md:pl-3 flex gap-1 items-center'>
            Showing
            <span className='font-semibold text-gray-900'>
              {' '}
              Page {meta?.current_page}/{meta?.total_pages}
            </span>{' '}
            of
            <span className='font-semibold text-gray-900'>
              {' '}
              {meta?.count} Users
            </span>
          </div>

      
          <div className='flex items-center'>
            {meta?.prev_page && (
              <button
                onClick={() => {
                  setUsersURL(meta?.prev_page);
                  refetchUsers();
                }}
                className='pagination-btn'
              >
                <svg
                  className='mr-2 w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                Previous
              </button>
            )}

            {meta?.next_page && (
              <button
                onClick={() => {
                  setUsersURL(meta?.next_page);
                  refetchUsers();
                }}
                className='pagination-btn'
              >
                Next
                <svg
                  className='ml-2 w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </div> */}
      </div>

      {/* detail view modal */}
      <Modal toggleModal={handleCloseModal} modalIsOpen={detailedModalOpened}>
        <h2 className='font-semibold text-2xl'>
          {userDetails?.first_name} {userDetails?.middle_name}{' '}
          {userDetails?.last_name}{' '}
          <span className='text-base font-normal'>
            ({userDetails?.username})
          </span>
        </h2>
        <h6 className='text-primary mb-10'>{userDetails?.user_role}</h6>
        <section>
          <div className='mb-4'>
            <label className='text-sm text-gray-300 capitalize'>
              Phone Number
            </label>
            <p>{userDetails?.phone_number}</p>
          </div>
          <div>
            <label className='text-sm text-gray-300 capitalize'>email</label>
            <p>{userDetails?.email}</p>
          </div>
        </section>
      </Modal>
    </>
  );
}

function PageBody() {
  const { user } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [userRole, setUserRole] = useState('Any');
  const [userStatus, setUserStatus] = useState('Any');

  //fetch function to get all users
  const { data: fetchedUsers, isLoading: gettingUsers } = useFetchAllUsers();

  useEffect(() => {
    if (searchTerm.length >= 2) {
      let searchResults = fetchedUsers?.data?.filter((result) => {
        return (
          result.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (result.middle_name &&
            result.middle_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          result.last_name.includes(searchTerm.toLowerCase()) ||
          (result.email &&
            result.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          result.phone_number
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          result.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      setUsers(searchResults);
    } else {
      setUsers(fetchedUsers?.data);
    }
  }, [searchTerm, fetchedUsers?.data]);

  useEffect(() => {
    let results;

    if (userRole != 'Any') {
      results = fetchedUsers?.data?.filter(
        (user) => user.user_role == userRole,
      );
    } else {
      results = fetchedUsers?.data;
    }

    if (userStatus != 'Any') {
      results = results?.filter(
        (user) => user.is_active.toString() == userStatus,
      );
    }

    setUsers(results);
  }, [userRole, userStatus]);

  return (
    <>
      {/* Title, Search and Add User */}
      <div className='grid grid-cols-2 items-center pb-8 mb-10 border-b'>
        <h2 className='text-3xl font-medium mb-10 md:mb-0'>
          Users{' '}
          <span className='text-lg text-gray-400'>
            ({users?.length?.toLocaleString()})
          </span>
        </h2>

        {/* search and add new  */}
        <div className='col-span-2 md:col-span-1  flex flex-wrap items-center justify-end'>
          {/* <!-- search input --> */}
          <input
            type='text'
            id='base-input'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className='input w-full md:w-1/2 lg:w-2/6 mb-3 md:mb-0'
            placeholder='enter search term'
          />

          {/* <!-- add User button--> */}
          <Link to='create'>
            <button
              type='button'
              className='btn-primary md:ml-4 w-full md:w-fit'
            >
              Add User
            </button>
          </Link>
        </div>
      </div>
      {/* Title, Search and Add User ends*/}

      {/*  filter and export buttons */}
      <div className='text-sm flex justify-end items-center mb-5'>
        {/* filter and export buttons */}
        <div className='flex gap-3'>
          <button
            onClick={() => setFilterIsOpen(!filterIsOpen)}
            className='flex items-center gap-2 border border-gray-300 px-4 py-1 rounded-lg'
          >
            <span>filter</span>
            <svg
              className='w-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <g fillRule='evenodd' stroke='none' strokeWidth='1'>
                <g fill='current' fillRule='nonzero'>
                  <path d='M13.5,16 C13.9142136,16 14.25,16.3357864 14.25,16.75 C14.25,17.1642136 13.9142136,17.5 13.5,17.5 L10.5,17.5 C10.0857864,17.5 9.75,17.1642136 9.75,16.75 C9.75,16.3357864 10.0857864,16 10.5,16 L13.5,16 Z M16.5,11 C16.9142136,11 17.25,11.3357864 17.25,11.75 C17.25,12.1642136 16.9142136,12.5 16.5,12.5 L7.5,12.5 C7.08578644,12.5 6.75,12.1642136 6.75,11.75 C6.75,11.3357864 7.08578644,11 7.5,11 L16.5,11 Z M19.5,6 C19.9142136,6 20.25,6.33578644 20.25,6.75 C20.25,7.16421356 19.9142136,7.5 19.5,7.5 L4.5,7.5 C4.08578644,7.5 3.75,7.16421356 3.75,6.75 C3.75,6.33578644 4.08578644,6 4.5,6 L19.5,6 Z' />
                </g>
              </g>
            </svg>
          </button>

          <a href={`${baseURL}/users/download/excel`}>
            <button className='flex items-center gap-2 border border-gray-300 px-4 py-1 rounded-lg'>
              <span>export</span>
              <svg
                className='w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <path d='M23 1.5q.41 0 .7.3.3.29.3.7v19q0 .41-.3.7-.29.3-.7.3H7q-.41 0-.7-.3-.3-.29-.3-.7V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87 2.34-3.8H7.46l-1.3 2.4-.05.08-.04.09-.64-1.28-.66-1.29H2.59l2.27 3.82-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3Z' />
              </svg>
            </button>
          </a>
        </div>
      </div>
      {/* filter and export buttons end */}

      {/*  filter controls */}
      {filterIsOpen && (
        <div>
          {/* filter field set */}
          <div className='mb-5'>
            <div className='flex flex-col md:flex-row gap-3'>
              {/* Role status */}
              <div>
                <label
                  htmlFor='countries'
                  className='block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400'
                >
                  Role
                </label>
                <select
                  id='countries'
                  className='input p-2 text-xs w-full'
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option value='Any'>Any</option>
                  {user?.user_role == 'Super Admin' && (
                    <option value='Admin'>Admin</option>
                  )}
                  <option value='Content Creator'>Content Creator</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor='countries'
                  className='block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400'
                >
                  Status
                </label>
                <select
                  id='countries'
                  className='input p-2 text-xs w-full'
                  value={userStatus}
                  onChange={(e) => setUserStatus(e.target.value)}
                >
                  <option value='Any'>Any</option>

                  <option value='true'>Active</option>

                  <option value='false'>Suspended</option>
                </select>
              </div>
            </div>
          </div>
          {/* filter field set end */}
        </div>
      )}
      {/* filter controls end  */}

      <UserTable isLoading={gettingUsers} users={users} />
    </>
  );
}

function AdminUsers() {
  return (
    <div className='bg-black'>
      <Layout
        headerArea={<NavItemsList menuLinks={menuLinks} />}
        mainArea={<PageBody />}
      />
    </div>
  );
}

export default AdminUsers;
