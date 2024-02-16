import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import NavItemsList from '../common/navItemsList';
import Layout from '../global/layout';
import { menuLinks } from './menu';
import { useSelector } from 'react-redux';

const PageBody = () => {
  const { user } = useSelector(state => state.user)

  return (
    <>
      <div className='pb-8 mb-10 border-b'>
        <h2 className='text-3xl font-medium mb-6'>Dashboard</h2>
        <div className='flex flex-wrap gap-3'>
          <NavLink
            to={'overview'}
            className={({ isActive }) =>
              isActive ? 'secondary-link-active' : 'secondary-link'
            }
          >
            Overview
          </NavLink> 
          {/* { user?.user_role === 'Super Admin' &&
            <>
              <NavLink
                to={'2020'}
                className={({ isActive }) =>
                  isActive ? 'secondary-link-active' : 'secondary-link'
                }
              >
                2020
              </NavLink>
              <NavLink
                to={'2021'}
                className={({ isActive }) =>
                  isActive ? 'secondary-link-active' : 'secondary-link'
                }
              >
                2021
              </NavLink>
              <NavLink
                to={'2022'}
                className={({ isActive }) =>
                  isActive ? 'secondary-link-active' : 'secondary-link'
                }
              >
                2022
              </NavLink>
              <NavLink
                to={'2023'}
                className={({ isActive }) =>
                  isActive ? 'secondary-link-active' : 'secondary-link'
                }
              >
                2023
              </NavLink>
              <NavLink
                to={'2024'}
                className={({ isActive }) =>
                  isActive ? 'secondary-link-active' : 'secondary-link'
                }
              >
                2024
              </NavLink>
            </>
          } */}
        </div>
      </div>

      {/* send sms */}
      <Outlet />
      {/* <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10 mb-5 md:mb-10'>
        <div className='card'>
          <p className='font-medium'>Delivered today</p>
          <p className='font-medium text-4xl md:text-6xl lg:text-8xl'>0</p>
        </div>
        <div className='card'>
          <p className='font-medium'>Delivered yesterday</p>
          <p className='font-medium text-4xl md:text-6xl lg:text-8xl'>0</p>
        </div>
        <div className='card'>
          <p className='font-medium'>Delivered this week</p>
          <p className='font-medium text-4xl md:text-6xl lg:text-8xl'>0</p>
        </div>
        <div className='card'>
          <p className='font-medium'>Delivered this month</p>
          <p className='font-medium text-4xl md:text-6xl lg:text-8xl'>0</p>
        </div>
      </section>
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10 mb-5 md:mb-10'>
        <div className='card'>
          <p className='font-medium'>Subscriptions today</p>
          <p className='font-medium text-4xl md:text-6xl lg:text-8xl'>0</p>
        </div>
        <div className='card'>
          <p className='font-medium'>Subscriptions yesterday</p>
          <p className='font-medium text-4xl md:text-6xl lg:text-8xl'>0</p>
        </div>
        <div className='card'>
          <p className='font-medium'>Subscriptions this week</p>
          <p className='font-medium text-4xl md:text-6xl lg:text-8xl'>0</p>
        </div>
        <div className='card'>
          <p className='font-medium'>Subscriptions this month</p>
          <p className='font-medium text-4xl md:text-6xl lg:text-8xl'>0</p>
        </div>
      </section> */}
    </>
  );
};

function AdminDashboard() {
  return (
    <Layout
      headerArea={<NavItemsList menuLinks={menuLinks} />}
      mainArea={<PageBody />}
    />
  );
}

export default AdminDashboard;
