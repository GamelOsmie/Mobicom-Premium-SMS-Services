import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { IoCheckmarkOutline, IoCloseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification } from '../../redux/notificationSlice';

function Toast() {
  const {
    notification: { type, message },
  } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!type) return;

    setTimeout(() => {
      dispatch(clearNotification());
    }, 3500);
  }, [dispatch, type]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ x: '200%' }}
          exit={{ x: '200%' }}
          animate={{ x: 0 }}
          transition={{
            type: 'spring',
            duration: 1.2,
          }}
          className={`absolute bottom-32 right-2  md:right-5 lg:right-8 rounded-lg flex items-center px-5 py-2 md:px-5 md:py-3 space-x-1 md:space-x-2  ${
            type === 'success' && 'text-approved bg-approved'
          } ${type === 'error' && 'text-rejected bg-rejected'} z-[100]`}
        >
          {type === 'success' && <IoCheckmarkOutline className='md:text-lg' />}
          {type === 'error' && <IoCloseOutline className='md:text-lg' />}
          <div className='text-xs md:text-sm  font-normal'>{message}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;
