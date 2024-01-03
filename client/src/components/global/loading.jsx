import Spinner from './spinner';

const CustomLoading = () => {
  return (
    <section className='min-h-screen flex justify-center items-center'>
      <div className='flex space-x-1 items-center'>
        <Spinner />
        <p className='text-primary'>Loading...</p>
      </div>
    </section>
  );
};

export default CustomLoading;
