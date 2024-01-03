import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useAuth';

const LogoAndMenuItems = ({ openMenu, menuItems }) => {
  return (
    <div className='flex items-center'>
      {/* logo */}
      <h2 className='text-primary text-2xl pr-2 lg:pr-10 cursor-default'>
        Mobicom
      </h2>

      {/* menu items */}
      <div className='hidden lg:block '>
        <ul className='flex gap-5'>{menuItems}</ul>
      </div>

      {/* toggle mobile menu */}
      <div onClick={openMenu} className='block lg:hidden cursor-pointer'>
        <svg
          className='fill-current text-white'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path d='M4 6H20V8H4zM4 11H20V13H4zM4 16H20V18H4z' />
        </svg>
      </div>
    </div>
  );
};

const UserInfo = ({ user }) => {
  const navigate = useNavigate();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  //logout
  const { refetch: logout } = useLogout({
    enabled: false,
    onSuccess: (response) => {
      if (response.status === 'success') {
        navigate('/login');
      }
    },
  });

  return (
    <>
      <div className='relative inline-block text-left'>
        <div
          onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
          className='flex gap-1 items-center bg-gray-900  py-1 px-2 rounded-full hover:bg-gray-800 transition-all cursor-pointer'
        >
          {/* profile icon */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-7'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              fill='#4A5568'
              fillRule='evenodd'
              d='M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z'
              clipRule='evenodd'
            />
          </svg>
          {/* profile icon end */}

          {/* user name */}
          <div className='leading-none'>
            <p className='font-normal text-sm leading-none capitalize text-white hidden md:block'>
              {user}
            </p>
          </div>
          {/* user name end */}

          {/* dropdown icon */}
          <div className='leading-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='white'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M7.976 10.072l4.357-4.357.62.618L8.284 11h-.618L3 6.333l.619-.618 4.357 4.357z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          {/* dropdown icon end*/}
        </div>

        {/* dropdown menu items */}
        <AnimatePresence>
          {dropdownIsOpen && (
            <motion.div
              initial={{ scale: 0 }}
              exit={{ scale: 0 }}
              animate={{ scale: 1 }}
              className='absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`
              '
            >
              <ul className='m-2'>
                <Link to='/my-profile'>
                  <li className='flex rounded-md items-center w-full px-2 py-2 text-sm cursor-pointer hover:bg-slate-100 duration-150'>
                    Profile
                  </li>
                </Link>

                <li
                  onClick={logout}
                  className='flex rounded-md items-center w-full px-2 py-2 text-sm cursor-pointer hover:bg-slate-100 duration-150'
                >
                  Logout
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        {/* dropdown menu items end */}
      </div>
    </>
  );
};

const MobileMenuItems = ({ openMenu, isOpen, menuItems, user }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            exit={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{
              type: 'spring',
              stiffness: 360,
              damping: 35,
            }}
            className='w-full min-h-screen md:inset-0 fixed top-0 left-0 z-40'
          >
            <div className='w-full md:w-1/2'>
              {/* Modal content  */}
              <div className='bg-base min-h-screen'>
                {/* Modal header  */}
                <div className='flex justify-between items-center p-5 rounded-t border-b border-gray-900'>
                  <div className='flex gap-2 items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-7'
                      fill='none'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fill='#4A5568'
                        fillRule='evenodd'
                        d='M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z'
                        clipRule='evenodd'
                      />
                    </svg>

                    <div className='leading-none'>
                      <p className='font-normal text-sm leading-none capitalize text-white'>
                        {user}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={openMenu}
                    className='text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                  >
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </button>
                </div>
                {/* Modal body  */}
                <div className='p-6 space-y-6'>
                  <ul className='flex flex-col gap-7'>{menuItems}</ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function MainMenu({ menuItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='text-menu py-6'>
      <nav className='flex justify-between'>
        <LogoAndMenuItems openMenu={openMenu} menuItems={menuItems} />
        <UserInfo user={user.username} />
        <MobileMenuItems
          openMenu={openMenu}
          isOpen={isOpen}
          menuItems={menuItems}
          user={user.username}
        />
      </nav>
    </header>
  );
}

export default MainMenu;
