import { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlastSMS } from '../../hooks/useSMS';
import {
  useFetchSMSTargetGroup,
  useSearchSubscriber,
} from '../../hooks/useSubscribers';
import NavItemsList from '../common/navItemsList';
import { creatorMenuLinks } from '../content creator/menu';
import Layout from '../global/layout';
import { menuLinks } from './menu';

function PageBody() {
  const { category, message } = useParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recipientsCount, setRecipientsCount] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [group, setGroup] = useState({
    all_subscribers: false,
    all_enough_balance: false,
    all_low_balance: false,
    list: [],
  });

  const { data: targets } = useFetchSMSTargetGroup(category);

  const { mutate: searchSubscriber, isLoading: gettingSubs } =
    useSearchSubscriber({
      category,
      options: {
        onSuccess: (response) => {
          const { status, data } = response;

          if (status == 'success') {
            setSearchResults(data);
          }
        },
      },
    });

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

    console.log(data);

    sendSMS(data);
  };

  // perform search
  useEffect(() => {
    if (searchTerm.startsWith('232') && searchTerm.length <= 6) {
      return;
    }

    if (searchTerm.length >= 3) {
      searchSubscriber({ term: searchTerm });
    }
  }, [searchTerm]);

  useEffect(() => {
    if (selectedGroup == '') {
      setRecipientsCount(0);
    }
    if (selectedGroup == 'all') {
      setRecipientsCount(targets?.data?.all_subscribers);
      setSearchTerm('');
      setSearchResults([]);
    }
    if (selectedGroup == 'enough-balance') {
      setRecipientsCount(targets?.data?.all_enough_balance);
      setSearchTerm('');
      setSearchResults([]);
    }
    if (selectedGroup == 'low-balance') {
      setRecipientsCount(targets?.data?.all_low_balance);
      setSearchTerm('');
      setSearchResults([]);
    }
    if (selectedContacts.length) {
      setRecipientsCount(selectedContacts.length);
    }
  }, [selectedGroup, selectedContacts]);

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

      setSelectedContacts([]);
    }

    if (selectedGroup == 'enough-balance') {
      setGroup({
        all_subscribers: false,
        all_enough_balance: true,
        all_low_balance: false,
        list: [],
      });

      setSelectedContacts([]);
    }

    if (selectedGroup == 'low-balance') {
      setGroup({
        all_subscribers: false,
        all_enough_balance: false,
        all_low_balance: true,
        list: [],
      });

      setSelectedContacts([]);
    }

    if (selectedContacts.length) {
      setGroup({
        all_subscribers: false,
        all_enough_balance: false,
        all_low_balance: false,
        list: selectedContacts,
      });
    }
  }, [selectedGroup]);

  const onAddToRecipientList = async (sub) => {
    setSelectedGroup('');
    let selectedSub = [];

    if (!selectedContacts.includes(sub)) {
      selectedSub = [...selectedContacts, sub];
      setSelectedContacts([...selectedContacts, sub]);
    } else {
      const filteredList = selectedContacts.filter((item) => item != sub);
      selectedSub = filteredList;
      setSelectedContacts(filteredList);
    }

    setGroup({
      all_subscribers: false,
      all_enough_balance: false,
      all_low_balance: false,
      list: selectedSub,
    });

    setRecipientsCount(selectedContacts.length);
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
            {searchResults?.map((user, index) => (
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

        {/* {!subs?.data?.length && !gettingSubs && (
          <div className='p-10 text-center text-sm'>No subscriber found</div>
        )} */}

        {searchTerm?.length && !searchResults?.length && !gettingSubs ? (
          <div className='p-10 text-center text-sm'>No subscriber found</div>
        ) : null}

        {!searchTerm?.length && selectedGroup == '' ? (
          <div className='p-10 text-center'>
            No subscribers selected to receive messages
          </div>
        ) : null}

        {!searchTerm?.length && selectedGroup == 'all' ? (
          <div className='p-10 text-center'>
            <span className='font-semibold'>
              {targets?.data?.all_subscribers}
            </span>{' '}
            subscribers selected to receive messages
          </div>
        ) : null}

        {!searchTerm?.length && selectedGroup == 'enough-balance' ? (
          <div className='p-10 text-center'>
            <span className='font-semibold'>
              {targets?.data?.all_enough_balance}
            </span>{' '}
            subscribers selected to receive messages
          </div>
        ) : null}

        {!searchTerm?.length && selectedGroup == 'low-balance' ? (
          <div className='p-10 text-center'>
            <span className='font-semibold'>
              {' '}
              {targets?.data?.all_low_balance}
            </span>{' '}
            subscribers selected to receive messages
          </div>
        ) : null}
      </div>

      {/* subs table end */}
    </>
  );
}

function AdminSMSMgt() {
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

export default AdminSMSMgt;
