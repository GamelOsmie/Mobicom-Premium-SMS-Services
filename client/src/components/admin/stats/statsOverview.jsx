import {
  Bar,
  BarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useGetDashboardStats } from '../../../hooks/useStats';

export default function StatsOverview() {
  const { data: stats, isLoading } = useGetDashboardStats();

  
  return (
    <>
      {!isLoading && (
        <div className='grid lg:grid-cols-5 gap-10 '>
          <div className='space-y-5 col-span-5 lg:col-span-2'>
            {/* subs */}
            <section className='card'>
              <p className='mb-5 md:mb-10'>Subscriptions Today</p>

              <div className='flex justify-between'>
                <div className='text-center'>
                  <p className='text-sm md:text-base text-primary'>2021</p>
                  <p className='text-4xl  md:text-6xl'>
                    {stats?.data?.subscriptions_today['2021']}
                  </p>
                </div>

                <div className='text-center'>
                  <p className='text-sm md:text-base text-primary'>2022</p>
                  <p className='text-4xl  md:text-6xl'>
                    {stats?.data?.subscriptions_today['2022']}
                  </p>
                </div>

                <div className='text-center'>
                  <p className='text-sm md:text-base text-primary'>2023</p>
                  <p className='text-4xl  md:text-6xl'>
                    {stats?.data?.subscriptions_today['2023']}
                  </p>
                </div>

                <div className='text-center'>
                  <p className='text-sm md:text-base text-primary'>2024</p>
                  <p className='text-4xl  md:text-6xl'>
                    {stats?.data?.subscriptions_today['2024']}
                  </p>
                </div>
              </div>
            </section>

            {/* unsubs */}
            <section className='card'>
              <p className='mb-5 md:mb-10'>Unsubscriptions Today</p>

              <div className='flex justify-between'>
                <div className='text-center'>
                  <p className='text-sm md:text-base text-primary'>2021</p>
                  <p className='text-4xl  md:text-6xl'>
                    {stats?.data?.unsubscriptions_today['2021']}
                  </p>
                </div>

                <div className='text-center'>
                  <p className='text-sm md:text-base text-primary'>2022</p>
                  <p className='text-4xl  md:text-6xl'>
                    {stats?.data?.unsubscriptions_today['2022']}
                  </p>
                </div>

                <div className='text-center'>
                  <p className='text-sm md:text-base text-primary'>2023</p>
                  <p className='text-4xl  md:text-6xl'>
                    {stats?.data?.unsubscriptions_today['2023']}
                  </p>
                </div>

                <div className='text-center'>
                  <p className='text-sm md:text-base text-primary'>2024</p>
                  <p className='text-4xl  md:text-6xl'>
                    {stats?.data?.unsubscriptions_today['2024']}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* graph */}
          {/* <p className='mb-5 md:mb-10'>SMS Deliveries Today</p> */}
          <section className='flex flex-col gap-5 h-[50vh] lg:h-auto col-span-5 lg:col-span-3'>
            <p className='mb-5 md:mb-10'>SMS Deliveries Today</p>
            <div className='h-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  width={500}
                  height={300}
                  data={stats?.data?.sms_deliveries}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  {/* <CartesianGrid strokeDasharray='3 3' /> */}
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar
                    dataKey='deliveries'
                    fill='#1999e3'
                    activeBar={<Rectangle fill='#097bbc' stroke='#097bbc' />}
                  />
                  {/* <Bar
                dataKey='uv'
                fill='#82ca9d'
                activeBar={<Rectangle fill='gold' stroke='purple' />}
              /> */}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}

      {isLoading && (
        <div className='p-10 text-center text-sm'>
          computing the latest stats...
        </div>
      )}
    </>
  );
}
