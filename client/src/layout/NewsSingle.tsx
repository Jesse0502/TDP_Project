import Navbar from '../components/Navbar';
import Chatbox from '../components/Chatbox';
import { formatReadableDate } from '../lib/utils';
import Badge from '../components/Badge';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface BiasReport {
  bias: string;
  opinion: string;
  type: string;
}

const NewsSingle = ({ newsData }: { newsData: any }) => {
  const [sentiment, setSentiment] = useState<string>(''); // Declare sentiment type
  const [isStLoading, setStLoading] = useState(true);
  const [biasReport, setBiasReport] = useState<BiasReport>({
    bias: '', // Initialize with empty strings
    opinion: '',
    type: '',
  });
  const [isBiasLoading, setBiasLoading] = useState(true);

  useEffect(() => {
    const analyzeSentiment = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/analyze_sentiment',
          {
            text: newsData.content,
          }
        );
        setSentiment(response.data.sentiment); // Set the sentiment based on API response
        setStLoading(false);
      } catch (error) {
        console.error('Error analyzing sentiment:', error);
      }
    };

    const analyzeBias = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/predict_bias',
          {
            articles: [
              {
                text: newsData.content,
              },
            ],
          }
        );
        setBiasReport(response.data.bias_predictions[0]);
        setBiasLoading(false);
      } catch (err) {
        console.error('Error analyzing sentiment:', err);
      }
    };
    analyzeBias();
    analyzeSentiment();
  }, [newsData.content]);

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
            <div className="h-[30rem]">
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

              <div
                className={`p-4 rounded-xl shadow-xl  mb-4 relative ${
                  !isStLoading
                    ? sentiment === 'POSITIVE'
                      ? 'bg-green-600'
                      : 'bg-red-600'
                    : 'bg-gray-600'
                }`}
              >
                <h1 className="italic text-xs text-white">Sentiment Report</h1>
                <div className="flex items-center relative">
                  <div className="flex gap-1 ">
                    <h1 className="font-bold text-white text-xl">
                      {isStLoading ? '------------------' : sentiment}
                    </h1>
                  </div>
                </div>
                <div className="absolute top-1/2 right-5 -translate-y-1/2">
                  {isStLoading && (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-11 h-11 text-gray-200 animate-spin fill-gray-400"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}

                  {!isStLoading &&
                    (sentiment === 'POSITIVE' ? (
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
                    ) : (
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
                          d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                        />
                      </svg>
                    ))}
                </div>
              </div>

              {/* Bias Detection */}
              {newsData.category === 'World' && (
                <div className="p-4 rounded-xl shadow-xl bg-white relative">
                  <div className={`${isBiasLoading && 'opacity-10'}`}>
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
                        <h3 className="text-xs text-gray-600">
                          Predicted Bias
                        </h3>
                        <p className="font-bold text-gray-700">
                          {biasReport.bias}
                        </p>
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
                        <h3 className="text-xs text-gray-600">
                          Predicted Opinion
                        </h3>
                        <p className="font-bold text-sm text-gray-700">
                          {biasReport.opinion}
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
                        <h3 className="text-xs text-gray-600">
                          Predicted Type
                        </h3>
                        <p className="font-bold text-sm text-gray-700">
                          {biasReport.type}
                        </p>
                      </div>
                    </div>
                  </div>
                  {isBiasLoading && (
                    <div
                      role="status"
                      className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="ng-conatainer mt-24">{/* <NewsList /> */}</div>
    </>
  );
};

export default NewsSingle;
