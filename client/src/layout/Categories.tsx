import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CategoriesRow, { newsDataProps } from '../components/CategoriesRow';

const Categories = ({ passInTop }: { passInTop: (item: unknown) => void }) => {
  const [categorizedNews, setCategorizedNews] = useState<{
    [key: string]: newsDataProps[];
  }>({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:8000/news-data');
        const data = response.data;

        // Categorize the news data
        const groupedData = data.reduce(
          (acc: { [key: string]: newsDataProps[] }, article: newsDataProps) => {
            const category = article.category;
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(article);
            return acc;
          },
          {}
        );

        setCategorizedNews(groupedData);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    })();
  }, []);

  return (
    <>
      <div className="mb-10">
        <Navbar activeSection={'Categories'} />
      </div>
      {Object.keys(categorizedNews).map((category) => (
        <CategoriesRow
          key={category}
          newsData={categorizedNews[category]}
          onDiscussClick={(item) => passInTop(item)}
        />
      ))}
    </>
  );
};

export default Categories;
