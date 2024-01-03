import { Suspense } from 'react';
import CustomLoading from '../components/global/loading';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <div className='min-h-screen min-w-full flex justify-center items-center'>
        <div>
          <h2 className='lg:text-8xl md:text-7xl text-5xl  text-center mb-4'>
            {' '}
            This is the <br />
            404 page
          </h2>
          <p className='text-center mb-20 lg:text-4xl md:text-3xl text-2xl'>
            you must be lost
          </p>

          <p className='text-center lg:text-2xl md:text-xl'>
            go back{' '}
            <Link to='/'>
              <span className='capitalize text-primary underline'>home</span>
            </Link>
          </p>
        </div>
      </div>
    </Suspense>
  );
}
