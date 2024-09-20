import Navbar from '../components/Navbar';
import Chatbox from '../components/Chatbox';
import { formatReadableDate } from '../lib/utils';
import Badge from '../components/Badge';

const NewsSingle = ({ newsData }: { newsData: any }) => {
  return (
    <>
      <Navbar />
      <div
        className="bg-gray-100 pt-0 relative"
        style={{
          backgroundImage: `url("${newsData.img}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(#000, 0.2)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(to bottom, rgba(255, 255, 255, 0.99), rgba(255, 255, 255, 0.7))', // Gradient overlay
            zIndex: 0, // Ensures the gradient is on top of the blurred background
          }}
        ></div>
        <div className="ng-container top-20 relative grid grid-cols-12 gap-6">
          {/* Left Side */}
          <div className="col-span-8">
            <h1 className="text-3xl font-bold">{newsData.title}</h1>
            <p className="text-xs my-3 tracking-wider">
              By{' '}
              <a
                href={newsData.source_url}
                className="font-bold hover:underline underline-offset-2 transition-all"
                target="_blank"
              >
                {newsData.source_name.toUpperCase()}
              </a>{' '}
              | {formatReadableDate(newsData.date)}
            </p>
            <Badge>{newsData.category}</Badge>
            <p className="mt-6 mb-2"></p>
            <div className="max-h-[40rem] h-full">
              <Chatbox newsData={newsData} />
            </div>
          </div>
          {/* Right Side */}
          <div className="col-span-4 rounded-xl">
            <div className="w-full h-full">
              {/* <img
                src={newsData.img}
                alt=""
                className="w-full h-full object-cover rounded-xl"
                onError={($e) =>
                  ($e.target.src = `https://www.centaursoftware.com.au/wp-content/uploads/2019/06/default-fallback-image.png`)
                }
              /> */}

              <div className="p-4 rounded-xl shadow-xl bg-green-600 mb-4 relative">
                <h1 className="italic text-xs text-white">Sentiment Report</h1>
                <div className="flex items-center relative">
                  {/* Positive */}
                  <div className="flex gap-1 ">
                    <h1 className="font-bold text-white text-xl">Positive</h1>
                  </div>

                  <div className="hidden">
                    {/* Neutral */}
                    <div className="w-7 h-7">
                      <svg
                        width=""
                        height=""
                        viewBox="0 0 72 72"
                        id="emoji"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="color">
                          <path
                            fill="transparent"
                            d="M36,13c-12.6823,0-23,10.3177-23,23c0,12.6822,10.3177,23,23,23c12.6822,0,23-10.3178,23-23 C59,23.3177,48.6822,13,36,13z"
                          />
                        </g>
                        <g id="hair" />
                        <g id="skin" />
                        <g id="skin-shadow" />
                        <g id="line">
                          <circle
                            cx="36"
                            cy="36"
                            r="23"
                            fill="none"
                            stroke="#000000"
                            stroke-miterlimit="10"
                            stroke-width="4"
                          />
                          <line
                            x1="27"
                            x2="45"
                            y1="43"
                            y2="43"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                          />
                          <path d="M30,31c0,1.6568-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6552,1.3447-3,3-3C28.6552,28,30,29.3448,30,31" />
                          <path d="M48,31c0,1.6568-1.3447,3-3,3s-3-1.3433-3-3c0-1.6552,1.3447-3,3-3S48,29.3448,48,31" />
                        </g>
                      </svg>
                    </div>
                    {/* Sad */}
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 right-5 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#fff"
                    // className="size-10"
                    width={'3.5rem'}
                    height={'3.5rem'}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                    />
                  </svg>
                </div>
              </div>

              {/* Bias Detection */}
              <div className="p-4 rounded-xl shadow-xl bg-white">
                <div className="flex justify-between mb-5">
                  <h1 className="font-bold text-lg">Bias Distribution</h1>
                </div>
                <div className="flex p-4 bg-slate-100 rounded-xl gap-3 mb-3 hover:scale-105 transition-all">
                  <div className="flex items-top">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#91b3e9"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#3b82f6"
                      className="size-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-600">Predicted Bias</h3>
                    <p className="font-bold text-gray-700">Unbaised</p>
                  </div>
                </div>
                <div className="flex p-4 bg-slate-100 rounded-xl gap-3 mb-3 hover:scale-105 transition-all">
                  <div className="flex items-top">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#f3ca40"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke=""
                      className="size-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-xs text-gray-600">Predicted Opinion</h3>
                    <p className="font-bold text-sm text-gray-700">
                      Somewhat factual but also opinionated
                    </p>
                  </div>
                </div>
                <div className="flex p-4 bg-slate-100 rounded-xl gap-3 hover:scale-105 transition-all">
                  <div className="flex items-top">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#5f5e5e"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#333333"
                      className="size-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-xs text-gray-600">Predicted Type</h3>
                    <p className="font-bold text-sm text-gray-700">
                      Leans Left
                    </p>
                  </div>
                </div>
                {/* <div className="p-4 bg-gray-100 rounded-xl">
                  <div className="flex gap-3 mb-2">
                    <div className="flex items-top"></div>
                    <h3 className="font-bold text-base text-gray-700">
                      Predicted Type
                    </h3>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 flex">
                    <div
                      className="bg-red-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-6 rounded-l-full"
                      style={{ width: '45%' }}
                    >
                      {' '}
                      45%
                    </div>
                    <div
                      className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-6 rounded-r-full"
                      style={{ width: '55%' }}
                    >
                      {' '}
                      55%
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ng-conatainer mt-24">{/* <NewsList /> */}</div>
    </>
  );
};

export default NewsSingle;
