import Navbar from '../components/Navbar';
import Chatbox from '../components/Chatbox';
import { formatReadableDate } from '../lib/utils';

const NewsSingle = ({ newsData }: { newsData: any }) => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 pt-0">
        <div className="ng-container top-14 relative grid grid-cols-12 gap-8">
          <div className="col-span-7">
            <h1 className="text-4xl font-bold">{newsData.title}</h1>
            <p className="my-2">{formatReadableDate(newsData.date)}</p>
            <div className="h-[70vh]">
              <Chatbox newsData={newsData} />
            </div>
          </div>
          <div className="col-span-5 rounded-xl">
            <div className="w-full h-full rounded-xl">
              <img
                src={newsData.img}
                alt=""
                className="w-full h-full object-cover rounded-xl"
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
