import moment from 'moment';
import { useEffect, useState } from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { IoMdTime } from 'react-icons/io';
import { RxAvatar } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import {
  useFetchAllContents,
  useUpdateContentApprovalStatus,
} from '../../hooks/useContents';
import Modal from '../common/modal';
import NavItemsList from '../common/navItemsList';
import Layout from '../global/layout';
import { menuLinks } from './menu';
import { Link } from 'react-router-dom';

function ContentList({ contents, isLoading, user }) {
  const [approvalModalOpened, setApprovalModalOpened] = useState(false);
  const [rejectModalOpened, setRejectModalOpened] = useState(false);
  const [selectedContent, setSelectedContent] = useState({});

  const { mutate: updateApprovalStatus, isLoading: updatingStatus } =
    useUpdateContentApprovalStatus({
      slug: selectedContent?.slug,
      options: {
        onSuccess: (response) => {
          const { status } = response;

          if (status == 'success') {
            setRejectModalOpened(false);
            setApprovalModalOpened(false);
          }
        },
      },
    });

  const onApproveContent = (slug) => {
    let content = contents.find((item) => item.slug == slug);
    setSelectedContent(content);

    setApprovalModalOpened(true);
  };

  const handleApproval = () => {
    updateApprovalStatus({ approval_status: 'approved' });
  };

  const onRejectContent = (slug) => {
    let content = contents.find((item) => item.slug == slug);
    setSelectedContent(content);

    setRejectModalOpened(true);
  };

  const handleRejection = () => {
    updateApprovalStatus({ approval_status: 'rejected' });
  };

  const onCancel = () => {
    setSelectedContent({});

    setRejectModalOpened(false);
    setApprovalModalOpened(false);
  };

  return (
    <>
      <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
        {contents?.map((content) => (
          <article
            key={content.slug}
            className='border border-gray-300 rounded-xl p-5 flex flex-col justify-between'
          >
            <div>
              <div className='flex justify-between items-center mb-10'>
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

              <h1 className='text-lg font-medium mb-3'> {content.subject}</h1>
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
              <p className='text-primary text-sm flex gap-px items-center mb-8'>
                <RxAvatar />
                {content?.author?.username == user.username ? (
                  <span> Me </span>
                ) : (
                  <span> {content?.author?.username} </span>
                )}
              </p>
            </div>

            <div>
              <hr className='mb-5' />
              {content?.publication_status == 'pending' ? (
                <div className='flex justify-between items-center'>
                  {/* reject */}
                  <div
                    onClick={() => onRejectContent(content.slug)}
                    className='cursor-pointer text-rejected flex justify-center items-center gap-1'
                  >
                    <AiOutlineDislike />
                    <span> reject </span>
                  </div>

                  {/* divider */}
                  <div className='w-px h-5 bg-gray-300'></div>

                  {/* approve */}
                  <div
                    onClick={() => onApproveContent(content.slug)}
                    className='cursor-pointer text-approved flex justify-center items-center gap-1'
                  >
                    <AiOutlineLike />
                    <span> approve </span>
                  </div>
                </div>
              ) : (
                <Link to={`/sms/${content.category}/${content.slug}`}>
                  <div className='cursor-pointer text-blue-600 hover:text-blue-500 flex justify-center items-center gap-1'>
                    <FiSend />
                    <span> blast sms </span>
                  </div>
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
      {isLoading && (
        <div className='p-10 text-center text-sm'>getting contents...</div>
      )}

      {!contents?.length && !isLoading && (
        <div className='p-10 text-center text-sm'>No content found</div>
      )}

      {/* approval modals */}
      <Modal toggleModal={onCancel} modalIsOpen={approvalModalOpened}>
        <h1 className='text-center text-xl font-semibold'>Content Approval</h1>
        <p className='text-center'>
          Are you sure you want to approve this content? This action is
          irreversible.
        </p>

        <div className=' flex gap-5 justify-between mt-10'>
          <button onClick={onCancel} className='btn-secondary'>
            cancel
          </button>

          <button
            onClick={handleApproval}
            disabled={updatingStatus}
            className='btn-primary'
          >
            {updatingStatus ? 'approving' : 'approve content'}
          </button>
        </div>
      </Modal>

      {/* rejection modals */}
      <Modal toggleModal={onCancel} modalIsOpen={rejectModalOpened}>
        <h1 className='text-center text-xl font-semibold'>Content Rejection</h1>
        <p className='text-center'>
          Are you sure you want to reject this content? This action is
          irreversible.
        </p>

        <div className=' flex gap-5 justify-between mt-10'>
          <button onClick={onCancel} className='btn-secondary'>
            cancel
          </button>

          <button
            onClick={handleRejection}
            disabled={updatingStatus}
            className='btn-primary'
          >
            {updatingStatus ? 'rejecting' : 'reject content'}
          </button>
        </div>
      </Modal>
    </>
  );
}

function PageBody() {
  const { user } = useSelector((state) => state.user);

  const [contents, setContents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [contentCategory, setContentCategory] = useState('Any');
  const [contentApprovalStatus, setContentApprovalStatus] = useState('Any');

  const { data: fetchedContents, isLoading: gettingContents } =
    useFetchAllContents();

  useEffect(() => {
    if (searchTerm.length >= 2) {
      let searchResults = fetchedContents?.data?.filter((result) => {
        return (
          result.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.author?.username
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          result.author?.first_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          result.author?.last_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      });

      setContents(searchResults);
    } else {
      setContents(fetchedContents?.data);
    }
  }, [searchTerm, fetchedContents?.data]);

  useEffect(() => {
    let results;

    if (contentCategory != 'Any') {
      results = fetchedContents?.data?.filter(
        (content) => content.category == contentCategory,
      );
    } else {
      results = fetchedContents?.data;
    }

    if (contentApprovalStatus != 'Any') {
      results = results?.filter(
        (content) => content.approval_status == contentApprovalStatus,
      );
    }

    setContents(results);
  }, [contentCategory, contentApprovalStatus]);

  return (
    <>
      {/* Title, Search and Add User */}
      <div className='grid grid-cols-2 items-center pb-8 mb-10 border-b'>
        <h2 className='text-3xl font-medium mb-10 md:mb-0'>
          SMS Contents{' '}
          <span className='text-lg text-gray-400'>
            ({contents?.length?.toLocaleString()})
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
        </div>
      </div>

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

          {/* <a href={`${baseURL}/users/download/excel`}>
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
          </a> */}
        </div>
      </div>
      {/* filter and export buttons end */}

      {/*  filter controls */}
      {filterIsOpen && (
        <div>
          {/* filter field set */}
          <div className='mb-5'>
            <div className='flex flex-col md:flex-row gap-3'>
              <div>
                <label
                  htmlFor='countries'
                  className='block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400'
                >
                  Category
                </label>
                <select
                  id='countries'
                  className='input p-2 text-xs w-full'
                  value={contentCategory}
                  onChange={(e) => setContentCategory(e.target.value)}
                >
                  <option value='Any'>Any</option>
                  <option value='2021'>2021</option>
                  <option value='2022'>2022</option>
                  <option value='2023'>2023</option>
                  <option value='2024'>2024</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor='countries'
                  className='block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400'
                >
                  Approval Status
                </label>
                <select
                  id='countries'
                  className='input p-2 text-xs w-full'
                  value={contentApprovalStatus}
                  onChange={(e) => setContentApprovalStatus(e.target.value)}
                >
                  <option value='Any'>Any</option>
                  <option value='approved'>Approved</option>
                  <option value='pending'>Pending</option>
                  <option value='rejected'>Rejected</option>
                </select>
              </div>
            </div>
          </div>
          {/* filter field set end */}
        </div>
      )}
      {/* filter controls end  */}

      <ContentList
        isLoading={gettingContents}
        contents={contents}
        user={user}
      />
    </>
  );
}

function AdminSMS() {
  return (
    <div className='bg-black'>
      <Layout
        headerArea={<NavItemsList menuLinks={menuLinks} />}
        mainArea={<PageBody />}
      />
    </div>
  );
}

export default AdminSMS;
