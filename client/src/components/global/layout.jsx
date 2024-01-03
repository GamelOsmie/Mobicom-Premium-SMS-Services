import React from 'react';

function Layout({ headerArea, mainArea }) {
  return (
    <div className='relative pb-5 section_wrapper'>
      <section className='body_wrapper px-5 md:px-10 lg:px-16'>
        {headerArea}
      </section>
      <main className='min-h-screen p-5 md:p-10 lg:p-16 bg-white text-black rounded-3xl section_wrapper'>
        {mainArea}
      </main>
    </div>
  );
}

export default Layout;
