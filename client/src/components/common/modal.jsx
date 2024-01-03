import { AnimatePresence, motion } from 'framer-motion';

const Modal = ({ toggleModal, modalIsOpen, children }) => {
  return (
    <AnimatePresence>
      {modalIsOpen && (
        <div className='bg-black bg-opacity-20 backdrop-blur-sm min-h-screen fixed top-0 bottom-0 left-0 right-0 z-50 overflow-hidden flex justify-center items-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            exit={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.15,
            }}
            className='inline-block w-full max-w-md max-h-[85vh] overflow-y-auto p-10 my-8 overflow-x-hidden bg-white shadow-xl rounded-2xl mx-5'
          >
            {/*  close add content modal */}
            <div className='flex justify-end'>
              <button
                onClick={toggleModal}
                className='text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
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

            <>{children}</>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
