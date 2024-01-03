import { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlastSMS } from '../../hooks/useSMS';
import { useFetchAllSubscribers } from '../../hooks/useSubscribers';
import NavItemsList from '../common/navItemsList';
import Layout from '../global/layout';
import { menuLinks } from './menu';

function PageBody() {
  const { category, message } = useParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [subscribers, setSubscribers] = useState([]);
  const [recipientsCount, setRecipientsCount] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [group, setGroup] = useState({
    all_subscribers: false,
    all_enough_balance: false,
    all_low_balance: false,
    list: [],
  });

  const { data: subs, isLoading: gettingSubs } =
    useFetchAllSubscribers(category);

  const { mutate: sendSMS, isLoading: sendingSMS } = useBlastSMS({
    onSuccess: (response) => {
      const { status } = response;

      if (status == 'success') {
        navigate(-1);
      }
    },
  });

  const onSendSMS = () => {
    const data = {
      message,
      category,
      group,
    };

    sendSMS(data);
  };

  useEffect(() => {
    if (searchTerm.length >= 2) {
      let searchResults = subs?.data?.filter((result) => {
        return result.msisdn_no
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });

      setSubscribers(searchResults);
    } else {
      setSubscribers(subs?.data);
    }
  }, [searchTerm, subs?.data]);

  useEffect(() => {
    setRecipientsCount(selectedContacts.length);
  }, [selectedContacts]);

  useEffect(() => {
    if (selectedGroup == '') {
      setGroup({
        all_subscribers: false,
        all_enough_balance: false,
        all_low_balance: false,
        list: [],
      });

      setSelectedContacts([]);
    }

    if (selectedGroup == 'all') {
      setGroup({
        all_subscribers: true,
        all_enough_balance: false,
        all_low_balance: false,
        list: [],
      });

      let selectedList = [];

      subs?.data?.forEach((item) => selectedList.push(item));

      setSelectedContacts(selectedList);
    }

    if (selectedGroup == 'enough-balance') {
      setGroup({
        all_subscribers: false,
        all_enough_balance: true,
        all_low_balance: false,
        list: [],
      });

      const filteredList = subs?.data?.filter(
        (item) => item.has_enough_balance == true,
      );

      let selectedList = [];

      filteredList.forEach((item) => selectedList.push(item));

      setSelectedContacts(selectedList);
    }

    if (selectedGroup == 'low-balance') {
      setGroup({
        all_subscribers: false,
        all_enough_balance: false,
        all_low_balance: true,
        list: [],
      });

      const filteredList = subs?.data?.filter(
        (item) => item.has_enough_balance == false,
      );

      let selectedList = [];

      filteredList.forEach((item) => selectedList.push(item));

      setSelectedContacts(selectedList);
    }
  }, [selectedGroup]);

  const onAddToRecipientList = async (sub) => {
    if (!selectedContacts.includes(sub)) {
      console.log(sub);

      setSelectedContacts([...selectedContacts, sub]);
    } else {
      const filteredList = selectedContacts.filter((item) => item != sub);
      setSelectedContacts(filteredList);
    }

    setGroup({
      all_subscribers: false,
      all_enough_balance: false,
      all_low_balance: false,
      list: selectedContacts,
    });
  };

  return (
    <>
      {/* Title, Search and Add User */}
      <div className='grid grid-cols-2 items-center pb-8 mb-10 border-b'>
        <h2 className='text-3xl font-medium mb-10 md:mb-0'>SMS Management</h2>

        {/* search and add new  */}
        <div className='col-span-2 md:col-span-1  flex flex-wrap items-center justify-end'>
          {/* <!-- add User button--> */}
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

          {recipientsCount > 0 ? (
            <button
              disabled={sendingSMS}
              onClick={onSendSMS}
              type='button'
              className='btn-primary md:ml-4 w-full md:w-fit flex gap-2 items-center'
            >
              <FiSend className='text-xl' />{' '}
              {sendingSMS ? 'sending' : 'Blast SMS'}
            </button>
          ) : (
            <button
              type='button'
              className='cursor-not-allowed btn-secondary text-gray-400 md:ml-4 w-full md:w-fit flex gap-2 items-center'
            >
              <FiSend className='text-xl' /> Blast SMS
            </button>
          )}
        </div>
      </div>

      {/* filter controls */}
      <div>
        {/* filter field set */}
        <div className='mb-5'>
          <div className='flex flex-col justify-between items-center md:flex-row gap-3'>
            {/* Role status */}
            <div>
              <label
                htmlFor='countries'
                className='block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400'
              >
                Recipients
              </label>
              <select
                id='countries'
                className='input p-2 text-xs w-full'
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option value=''>Select recipient group </option>
                <option value='all'>All Subscribers</option>
                <option value='enough-balance'>All Enough Balance</option>
                <option value='low-balance'>All Low Balance</option>
              </select>
            </div>

            <div className='flex items-start gap-1'>
              <p className='text-5xl'>{recipientsCount}</p>{' '}
              <p className='text-sm leading-none'>
                recipients <br /> selected
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* filter field set end */}

      {/* subs table */}
      <div className='relative overflow-x-auto sm:rounded-lg mb-10'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                id
              </th>
              <th scope='col' className='px-6 py-3'>
                MSISDN{' '}
              </th>

              <th scope='col' className='px-6 py-3'>
                Balance Status
              </th>
            </tr>
          </thead>

          <tbody>
            {subscribers?.map((user, index) => (
              <tr
                onClick={() => onAddToRecipientList(user)}
                key={user._id}
                className={`${
                  selectedContacts.includes(user)
                    ? 'bg-primary_transparent'
                    : 'bg-white'
                } border-b cursor-pointer hover:scale-[.98] duration-500`}
              >
                <td className='px-6 py-4'>{index + 1}</td>
                <th
                  scope='row'
                  className='px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {user?.msisdn_no}
                </th>

                <td className='px-6 py-4'>
                  <span
                    className={
                      user?.has_enough_balance ? 'active-pill' : 'inactive-pill'
                    }
                  >
                    {user?.has_enough_balance
                      ? 'Enough Balance'
                      : 'Low Balance'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {gettingSubs && (
          <div className='p-10 text-center text-sm'>getting subscribers...</div>
        )}

        {!subs?.data?.length && !gettingSubs && (
          <div className='p-10 text-center text-sm'>No subscriber found</div>
        )}

        {searchTerm?.length && !subscribers.length ? (
          <div className='p-10 text-center text-sm'>No subscriber found</div>
        ) : null}

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

      {/* subs table end */}
    </>
  );
}

function AdminSMSMgt() {
  return (
    <div className='bg-black'>
      <Layout
        headerArea={<NavItemsList menuLinks={menuLinks} />}
        mainArea={<PageBody />}
      />
    </div>
  );
}

export default AdminSMSMgt;
