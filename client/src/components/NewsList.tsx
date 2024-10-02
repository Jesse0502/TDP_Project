// import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BentoGrid, BentoGridItem } from './BentoGrid';
import { excerpt } from '../lib/utils';

interface NewsListProps {
  onDiscussClick: (item: unknown) => void;
}

const NewsList: React.FC<NewsListProps> = ({ onDiscussClick }) => {
  const [newsData, setNewsData] = useState<
    {
      date: string; // ISO 8601 formatted date string (e.g., "2024-08-10T04:21:04Z")
      img: string; // URL of the news article image (might be empty)
      title: string; // Title of the news article
      content: string; // Content of the news article
      source_url: string; // URL of the source website
      source_name: string; // Name of the source website
      category: string; // Category of the news article (e.g., "Top Stories")
      keywords: string[]; // Array of keywords associated with the news article
    }[]
  >([]);

  useEffect(() => {
    (async () => {
      const newsData = await axios.get('http://localhost:8000/fake-data');
      setNewsData(newsData.data);
    })();
  }, []);

  return (
    <div className="ng-container">
      <div className="">
        <BentoGrid className="mx-auto max-w-7xl my-10">
          {newsData.map((item, i) => (
            <BentoGridItem
              source={item.source_url}
              category={item.category}
              key={i}
              title={item.title}
              description={excerpt(item.content, 80)}
              header={<Skeleton url={item.img} />}
              className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
              onClick={() => onDiscussClick(item)}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};
const Skeleton: React.FC<{ url: string }> = ({ url }) => (
  <div className="relative w-full h-[13rem] rounded-xl overflow-hidden">
    <img
      src={url}
      alt="Image"
      className="w-full h-full object-cover"
      onError={($e) =>
        ($e.target.src = `https://www.centaursoftware.com.au/wp-content/uploads/2019/06/default-fallback-image.png`)
      }
    />
  </div>
);

export default NewsList;
