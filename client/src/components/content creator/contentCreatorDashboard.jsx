import React from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { BsDashCircle } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { LuMessageSquarePlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useGetCreatorStats } from '../../hooks/useStats';
import NavItemsList from '../common/navItemsList';
import Layout from '../global/layout';
import { creatorMenuLinks } from './menu';
import { IoMdTime } from 'react-icons/io';
import moment from 'moment';

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

const contents = [];

const PageBody = () => {
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
          <Link to='create'>
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
        <div>
          <div className='mb-16'>
            <h2 className='mb-5'>Contents at a glance</h2>
            <div className='grid md:grid-cols-3 lg:grid-cols-5 gap-5'>
              <StatCard
                icon={<LuMessageSquarePlus />}
                label='Published'
                number={stats?.data?.published}
              />
              <StatCard
                icon={<FaRegEdit />}
                label='Draft'
                number={stats?.data?.draft}
              />
              <StatCard
                icon={<AiOutlineLike />}
                label='Approved'
                number={stats?.data?.approved}
              />

              <StatCard
                icon={<BsDashCircle />}
                label='Pending'
                number={stats?.data?.pending}
              />
              <StatCard
                icon={<AiOutlineDislike />}
                label='Rejected'
                number={stats?.data?.rejected}
              />
            </div>
          </div>

          <div>
            <h2 className='mb-5'>Recent Contents</h2>

            <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
              {stats?.data?.recent_contents?.map((content) => (
                <article
                  key={content.slug}
                  className='border border-gray-300 rounded-xl p-5 flex flex-col justify-between'
                >
                  <div>
                    <div
                      className={`flex ${
                        content?.publication_status == 'published'
                          ? 'justify-between'
                          : 'justify-end'
                      } items-center mb-10`}
                    >
                      {content?.publication_status == 'published' && (
                        <div>
                          {content.approval_status == 'pending' && (
                            <span className='pending-pill'>pending</span>
                          )}

                          {content.approval_status == 'approved' && (
                            <span className='active-pill'>approved</span>
                          )}

                          {content.approval_status == 'rejected' && (
                            <span className='inactive-pill'>rejected</span>
                          )}
                        </div>
                      )}

                      {content.publication_status == 'draft' && (
                        <Link to={`/my-contents/${content.slug}`}>
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
                </article>
              ))}
            </div>
          </div>
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
