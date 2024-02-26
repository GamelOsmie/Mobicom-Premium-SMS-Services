import moment from 'moment';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { IoMdTime } from 'react-icons/io';
import { LuMessageSquarePlus } from 'react-icons/lu';
import {
  TbDeviceMobileMessage,
  TbMessage2Minus,
  TbMessage2Plus,
  TbMessageCheck,
} from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetCreatorStats } from '../../hooks/useStats';
import NavItemsList from '../common/navItemsList';
import Layout from '../global/layout';
import { creatorMenuLinks } from './menu';

const StatCard = ({ icon, label, number }) => {
  return (
    <div className='card'>
      <div className='flex items-center gap-2 mb-5'>
        <span className='text-xl'>{icon}</span> <p>{label}</p>
      </div>
      <h3 className='text-6xl'>{number}</h3>
    </div>
  );
};

const PageBody = () => {
  const { user } = useSelector((state) => state.user);
  const { data: stats, isLoading } = useGetCreatorStats();

  //fetch function to get all contents
  return (
    <>
      {/* Title, Search and Add Content */}
      <div className='grid grid-cols-2 items-center pb-8 mb-10 border-b'>
        <h1 className='text-3xl font-medium mb-10 md:mb-0'>Overview</h1>

        <div className='col-span-2 md:col-span-1  flex flex-wrap items-center justify-end'>
          {/* <!-- search input --> */}

          {/* <!-- add User button--> */}
          <Link to='/my-contents/create'>
            <button
              type='button'
              className='btn-primary md:ml-4 w-full md:w-fit'
            >
              Create Content
            </button>
          </Link>
        </div>
      </div>
      {/* Title, Search and Add Content ends*/}

      {!isLoading && (
        <div className='space-y-16'>
          <div>
            <h2 className='mb-5'>Contents at a glance</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
              <StatCard
                icon={<LuMessageSquarePlus />}
                label='Published'
                number={stats?.data?.content_overview?.published}
              />
              <StatCard
                icon={<FaRegEdit />}
                label='Draft'
                number={stats?.data?.content_overview?.draft}
              />

              {user?.has_2020_access && (
                <StatCard
                  icon={<TbDeviceMobileMessage />}
                  label='2020'
                  number={stats?.data?.content_overview?.content_for_2020}
                />
              )}

              {user?.has_2021_access && (
                <StatCard
                  icon={<TbDeviceMobileMessage />}
                  label='2021'
                  number={stats?.data?.content_overview?.content_for_2021}
                />
              )}

              {user?.has_2022_access && (
                <StatCard
                  icon={<TbDeviceMobileMessage />}
                  label='2022'
                  number={stats?.data?.content_overview?.content_for_2022}
                />
              )}

              {user?.has_2023_access && (
                <StatCard
                  icon={<TbDeviceMobileMessage />}
                  label='2023'
                  number={stats?.data?.content_overview?.content_for_2023}
                />
              )}

              {user?.has_2024_access && (
                <StatCard
                  icon={<TbDeviceMobileMessage />}
                  label='2024'
                  number={stats?.data?.content_overview?.content_for_2024}
                />
              )}
            </div>
          </div>

          <div>
            <div className='flex justify-between items-center'>
              <h2 className='mb-5'>Recent Contents</h2>

              <Link to='/my-contents' className='text-primary text-xs'>
                view all
              </Link>
            </div>

            <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
              {stats?.data?.recent_contents?.map((content) => (
                <article
                  key={content.slug}
                  className='border border-gray-300 rounded-xl p-5 flex flex-col justify-between'
                >
                  <div>
                    <div
                      className={`flex ${
                        user?.user_role == 'Content Creator' &&
                        content.publication_status == 'published'
                          ? 'mb-0'
                          : 'mb-10'
                      } items-center justify-end`}
                    >
                      {content.publication_status == 'draft' && (
                        <Link to={content.slug}>
                          <FaRegEdit className='text-blue-600 hover:text-blue-500 duration-500 text-xl' />
                        </Link>
                      )}
                    </div>

                    <h1 className='text-lg font-medium mb-3'>
                      {' '}
                      {content.subject}
                    </h1>
                    <div className='flex justify-between items-center mb-3 '>
                      <p className='text-primary text-sm'>
                        <span className='text-sm'>{content.category} </span>
                      </p>

                      <p className='text-gray-400 font-light text-sm flex gap-px items-center'>
                        <IoMdTime />
                        <span>{moment(content.created_at).fromNow()}</span>
                      </p>
                    </div>
                    <p className='text-gray-400 mb-3'>{content.body}</p>
                  </div>

                  {content.publication_status == 'published' && (
                    <div>
                      <hr className='mb-5' />
                      <Link to={`/sms/${content.category}/${content.slug}`}>
                        <div className='text-blue-600 hover:text-blue-500 flex justify-center items-center gap-1'>
                          <FiSend />
                          <span> blast sms </span>
                        </div>
                      </Link>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          {user?.has_2020_access && (
            <div>
              <h2 className='mb-8 text-3xl'>2020 Performance</h2>
              <div className='mb-8'>
                <h2 className='mb-5'>SMS Deliveries</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  <StatCard
                    icon={<TbMessageCheck />}
                    label='Today'
                    number={
                      stats?.data?.performance_for_2020?.deliveries
                        ?.deliveries_for_2020_today
                    }
                  />

                  <StatCard
                    icon={<TbMessageCheck />}
                    label='This Week'
                    number={
                      stats?.data?.performance_for_2020?.deliveries
                        ?.deliveries_for_2020_this_week
                    }
                  />

                  <StatCard
                    icon={<TbMessageCheck />}
                    label='This Month'
                    number={
                      stats?.data?.performance_for_2020?.deliveries
                        ?.deliveries_for_2020_this_month
                    }
                  />

                  <StatCard
                    icon={<TbMessageCheck />}
                    label='This Year'
                    number={
                      stats?.data?.performance_for_2020?.deliveries
                        ?.deliveries_for_2020_this_year
                    }
                  />
                </div>
              </div>

              <div className='mb-8'>
                <h2 className='mb-5'>Subscriptions</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='This Week'
                    number={
                      stats?.data?.performance_for_2020?.subscribers
                        ?.subscribers_for_2020_this_week
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='This Month'
                    number={
                      stats?.data?.performance_for_2020?.subscribers
                        ?.subscribers_for_2020_this_month
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='This Year'
                    number={
                      stats?.data?.performance_for_2020?.subscribers
                        ?.subscribers_for_2020_this_year
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='Overall'
                    number={
                      stats?.data?.performance_for_2020?.subscribers
                        ?.subscribers_for_2020_overall
                    }
                  />
                </div>
              </div>

              <div className='mb-8'>
                <h2 className='mb-5'>Unsubscriptions</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='This Week'
                    number={
                      stats?.data?.performance_for_2020?.unsubscribers
                        ?.unsubscribers_for_2020_this_week
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='This Month'
                    number={
                      stats?.data?.performance_for_2020?.unsubscribers
                        ?.unsubscribers_for_2020_this_month
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='This Year'
                    number={
                      stats?.data?.performance_for_2020?.unsubscribers
                        ?.unsubscribers_for_2020_this_year
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='Overall'
                    number={
                      stats?.data?.performance_for_2020?.unsubscribers
                        ?.unsubscribers_for_2020_overall
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {user?.has_2021_access && (
            <div>
              <h2 className='mb-8 text-3xl'>2021 Performance</h2>
              <div className='mb-8'>
                <h2 className='mb-5'>SMS Deliveries</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  <StatCard
                    icon={<TbMessageCheck />}
                    label='Today'
                    number={
                      stats?.data?.performance_for_2021?.deliveries
                        ?.deliveries_for_2021_today
                    }
                  />

                  <StatCard
                    icon={<TbMessageCheck />}
                    label='This Week'
                    number={
                      stats?.data?.performance_for_2021?.deliveries
                        ?.deliveries_for_2021_this_week
                    }
                  />

                  <StatCard
                    icon={<TbMessageCheck />}
                    label='This Month'
                    number={
                      stats?.data?.performance_for_2021?.deliveries
                        ?.deliveries_for_2021_this_month
                    }
                  />

                  <StatCard
                    icon={<TbMessageCheck />}
                    label='This Year'
                    number={
                      stats?.data?.performance_for_2021?.deliveries
                        ?.deliveries_for_2021_this_year
                    }
                  />
                </div>
              </div>

              <div className='mb-8'>
                <h2 className='mb-5'>Subscriptions</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='This Week'
                    number={
                      stats?.data?.performance_for_2021?.subscribers
                        ?.subscribers_for_2021_this_week
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='This Month'
                    number={
                      stats?.data?.performance_for_2021?.subscribers
                        ?.subscribers_for_2021_this_month
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='This Year'
                    number={
                      stats?.data?.performance_for_2021?.subscribers
                        ?.subscribers_for_2021_this_year
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='Overall'
                    number={
                      stats?.data?.performance_for_2021?.subscribers
                        ?.subscribers_for_2021_overall
                    }
                  />
                </div>
              </div>

              <div className='mb-8'>
                <h2 className='mb-5'>Unsubscriptions</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='This Week'
                    number={
                      stats?.data?.performance_for_2021?.unsubscribers
                        ?.unsubscribers_for_2021_this_week
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='This Month'
                    number={
                      stats?.data?.performance_for_2021?.unsubscribers
                        ?.unsubscribers_for_2021_this_month
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='This Year'
                    number={
                      stats?.data?.performance_for_2021?.unsubscribers
                        ?.unsubscribers_for_2021_this_year
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='Overall'
                    number={
                      stats?.data?.performance_for_2021?.unsubscribers
                        ?.unsubscribers_for_2021_overall
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {user?.has_2022_access && (
            <div>
              <h2 className='mb-8 text-3xl'>2022 Performance</h2>
              <div className='mb-8'>
                <h2 className='mb-5'>SMS Deliveries</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  <StatCard
                    icon={<TbMessageCheck />}
                    label='Today'
                    number={
                      stats?.data?.performance_for_2022?.deliveries
                        ?.deliveries_for_2022_today
                    }
                  />

                  <StatCard
                    icon={<TbMessageCheck />}
                    label='This Week'
                    number={
                      stats?.data?.performance_for_2022?.deliveries
                        ?.deliveries_for_2022_this_week
                    }
                  />

                  <StatCard
                    icon={<TbMessageCheck />}
                    label='This Month'
                    number={
                      stats?.data?.performance_for_2022?.deliveries
                        ?.deliveries_for_2022_this_month
                    }
                  />

                  <StatCard
                    icon={<TbMessageCheck />}
                    label='This Year'
                    number={
                      stats?.data?.performance_for_2022?.deliveries
                        ?.deliveries_for_2022_this_year
                    }
                  />
                </div>
              </div>

              <div className='mb-8'>
                <h2 className='mb-5'>Subscriptions</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='This Week'
                    number={
                      stats?.data?.performance_for_2022?.subscribers
                        ?.subscribers_for_2022_this_week
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='This Month'
                    number={
                      stats?.data?.performance_for_2022?.subscribers
                        ?.subscribers_for_2022_this_month
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='This Year'
                    number={
                      stats?.data?.performance_for_2022?.subscribers
                        ?.subscribers_for_2022_this_year
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='Overall'
                    number={
                      stats?.data?.performance_for_2022?.subscribers
                        ?.subscribers_for_2022_overall
                    }
                  />
                </div>
              </div>

              <div className='mb-8'>
                <h2 className='mb-5'>Unsubscriptions</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='This Week'
                    number={
                      stats?.data?.performance_for_2022?.unsubscribers
                        ?.unsubscribers_for_2022_this_week
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='This Month'
                    number={
                      stats?.data?.performance_for_2022?.unsubscribers
                        ?.unsubscribers_for_2022_this_month
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='This Year'
                    number={
                      stats?.data?.performance_for_2022?.unsubscribers
                        ?.unsubscribers_for_2022_this_year
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='Overall'
                    number={
                      stats?.data?.performance_for_2022?.unsubscribers
                        ?.unsubscribers_for_2022_overall
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {user?.has_2023_access && (
            <div>
              <h2 className='mb-8 text-3xl'>2023 Performance</h2>
              <div className='mb-8'>
                <h2 className='mb-5'>SMS Deliveries</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  <StatCard
                    icon={<TbMessageCheck />}
                    label='Today'
                    number={
                      stats?.data?.performance_for_2023?.deliveries
                        ?.deliveries_for_2023_today
                    }
                  />

                  <StatCard
                    icon={<TbMessageCheck />}
                    label='This Week'
                    number={
                      stats?.data?.performance_for_2023?.deliveries
                        ?.deliveries_for_2023_this_week
                    }
                  />

                  <StatCard
                    icon={<TbMessageCheck />}
                    label='This Month'
                    number={
                      stats?.data?.performance_for_2023?.deliveries
                        ?.deliveries_for_2023_this_month
                    }
                  />

                  <StatCard
                    icon={<TbMessageCheck />}
                    label='This Year'
                    number={
                      stats?.data?.performance_for_2023?.deliveries
                        ?.deliveries_for_2023_this_year
                    }
                  />
                </div>
              </div>

              <div className='mb-8'>
                <h2 className='mb-5'>Subscriptions</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='This Week'
                    number={
                      stats?.data?.performance_for_2023?.subscribers
                        ?.subscribers_for_2023_this_week
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='This Month'
                    number={
                      stats?.data?.performance_for_2023?.subscribers
                        ?.subscribers_for_2023_this_month
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='This Year'
                    number={
                      stats?.data?.performance_for_2023?.subscribers
                        ?.subscribers_for_2023_this_year
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='Overall'
                    number={
                      stats?.data?.performance_for_2023?.subscribers
                        ?.subscribers_for_2023_overall
                    }
                  />
                </div>
              </div>

              <div className='mb-8'>
                <h2 className='mb-5'>Unsubscriptions</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='This Week'
                    number={
                      stats?.data?.performance_for_2023?.unsubscribers
                        ?.unsubscribers_for_2023_this_week
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='This Month'
                    number={
                      stats?.data?.performance_for_2023?.unsubscribers
                        ?.unsubscribers_for_2023_this_month
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='This Year'
                    number={
                      stats?.data?.performance_for_2023?.unsubscribers
                        ?.unsubscribers_for_2023_this_year
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='Overall'
                    number={
                      stats?.data?.performance_for_2023?.unsubscribers
                        ?.unsubscribers_for_2023_overall
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {user?.has_2024_access && (
            <div>
              <h2 className='mb-8 text-3xl'>2024 Performance</h2>
              <div className='mb-8'>
                <h2 className='mb-5'>SMS Deliveries</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  <StatCard
                    icon={<TbMessageCheck />}
                    label='Today'
                    number={
                      stats?.data?.performance_for_2024?.deliveries
                        ?.deliveries_for_2024_today
                    }
                  />

                  <StatCard
                    icon={<TbMessageCheck />}
                    label='This Week'
                    number={
                      stats?.data?.performance_for_2024?.deliveries
                        ?.deliveries_for_2024_this_week
                    }
                  />

                  <StatCard
                    icon={<TbMessageCheck />}
                    label='This Month'
                    number={
                      stats?.data?.performance_for_2024?.deliveries
                        ?.deliveries_for_2024_this_month
                    }
                  />

                  <StatCard
                    icon={<TbMessageCheck />}
                    label='This Year'
                    number={
                      stats?.data?.performance_for_2024?.deliveries
                        ?.deliveries_for_2024_this_year
                    }
                  />
                </div>
              </div>

              <div className='mb-8'>
                <h2 className='mb-5'>Subscriptions</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='This Week'
                    number={
                      stats?.data?.performance_for_2024?.subscribers
                        ?.subscribers_for_2024_this_week
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='This Month'
                    number={
                      stats?.data?.performance_for_2024?.subscribers
                        ?.subscribers_for_2024_this_month
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='This Year'
                    number={
                      stats?.data?.performance_for_2024?.subscribers
                        ?.subscribers_for_2024_this_year
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Plus />}
                    label='Overall'
                    number={
                      stats?.data?.performance_for_2024?.subscribers
                        ?.subscribers_for_2024_overall
                    }
                  />
                </div>
              </div>

              <div className='mb-8'>
                <h2 className='mb-5'>Unsubscriptions</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='This Week'
                    number={
                      stats?.data?.performance_for_2024?.unsubscribers
                        ?.unsubscribers_for_2024_this_week
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='This Month'
                    number={
                      stats?.data?.performance_for_2024?.unsubscribers
                        ?.unsubscribers_for_2024_this_month
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='This Year'
                    number={
                      stats?.data?.performance_for_2024?.unsubscribers
                        ?.unsubscribers_for_2024_this_year
                    }
                  />

                  <StatCard
                    icon={<TbMessage2Minus />}
                    label='Overall'
                    number={
                      stats?.data?.performance_for_2024?.unsubscribers
                        ?.unsubscribers_for_2024_overall
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div className='p-10 text-center text-sm'>
          computing the latest stats...
        </div>
      )}
    </>
  );
};

function ContentCreatorDashboard() {
  return (
    <div className='bg-black'>
      <Layout
        headerArea={<NavItemsList menuLinks={creatorMenuLinks} />}
        mainArea={<PageBody />}
      />
    </div>
  );
}

export default ContentCreatorDashboard;
