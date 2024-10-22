import { useState, useEffect } from 'react';
import axios from 'axios';
import { BentoGrid, BentoGridItem } from './BentoGrid';
import { excerpt } from '../lib/utils';

interface NewsListProps {
  onDiscussClick: (item: unknown) => void;
}

// Retrieve the array from localStorage
const storedClicks = localStorage.getItem('userClicks');

// Parse the stored array or initialize an empty array if it doesn't exist
const userClicks: any[] = storedClicks ? JSON.parse(storedClicks) : [];

const NewsList: React.FC<NewsListProps> = ({ onDiscussClick }) => {
  const [newsData, setNewsData] = useState<
    {
      date: string;
      img: string;
      title: string;
      content: string;
      source_url: string;
      source_name: string;
      category: string;
      keywords: string[];
    }[]
  >([]);

  const getSortedNewsDataByClicks = (unsortedNewsData: any) => {
    // Count clicks for each category
    const clickCounts = userClicks.reduce<Record<string, number>>(
      (acc, category) => {
        acc[category.toLowerCase()] = (acc[category.toLowerCase()] || 0) + 1;
        return acc;
      },
      {}
    );

    // Calculate total clicks
    const totalClicks = userClicks.length;

    // Calculate probabilities for categories mentioned in userClicks
    const categoryProbabilities = Object.entries(clickCounts).reduce<
      Record<string, number>
    >((acc, [category, count]) => {
      acc[category] = count / totalClicks;
      return acc;
    }, {});

    // Assign baseline probability of 0.1 for categories not mentioned
    const baselineProbability = 0.1;

    // Add all news items to array, but weight them based on category probability
    const randomizedNewsData = unsortedNewsData.map((newsItem: any) => {
      const category = newsItem.category.toLowerCase();
      const probability =
        categoryProbabilities[category] || baselineProbability;

      // Add a weight to each news item
      return { ...newsItem, weight: Math.random() * probability };
    });

    // Sort based on weight (higher probability articles appear first)
    const sortedNewsData = randomizedNewsData.sort(
      (a: any, b: any) => b.weight - a.weight
    );

    setNewsData(sortedNewsData);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:8000/news-data');
        getSortedNewsDataByClicks(response.data);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
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

export const Skeleton: React.FC<{ url: string }> = ({ url }) => (
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
