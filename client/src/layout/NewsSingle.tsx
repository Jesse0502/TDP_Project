import Navbar from '../components/Navbar';
// import NewsList from '../components/NewsList';
import Chatbox from '../components/ui/Chatbox';
import { useEffect, useState } from 'react';
import axios from 'axios';

const NewsSingle = ({ newsData }: { newsData: any }) => {
  const [waiting, setWaiting] = useState(false);
  const [result, setResult] = useState<{ sender: string; content: string }[]>(
    []
  );

  useEffect(() => {
    (async () => {
      setWaiting(true);

      const response = await axios.post('http://localhost:8000/get-context', {
        data: { title: newsData?.title, content: newsData?.content },
      });
      setResult((prevResult) => [
        ...prevResult,
        { sender: 'Bot', content: response.data.result },
      ]);

      setWaiting(false);
    })();
  }, [newsData?.content, newsData?.title]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 pt-0">
        <div className="ng-container top-14 relative grid grid-cols-12 gap-8">
          <div className="col-span-7">
            <h1 className="text-4xl font-bold">{newsData.title}</h1>
            <p>Date</p>
            <div className="h-[55vh]">
              <Chatbox result={result} isWaiting={waiting} />
            </div>
          </div>
          <div className="col-span-5 rounded-xl">
            <div className="w-full h-full rounded-xl">
              <img
                src={newsData.img}
                alt=""
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="ng-conatainer mt-24">{/* <NewsList /> */}</div>
    </>
  );
};

export default NewsSingle;
