import React, { useEffect } from 'react';
import { BentoGridItem } from './BentoGrid';
import { Skeleton } from './NewsList';
import { excerpt } from '../lib/utils';

export interface newsDataProps {
  date: string; // ISO 8601 formatted date string (e.g., "2024-08-10T04:21:04Z")
  img: string; // URL of the news article image (might be empty)
  title: string; // Title of the news article
  content: string; // Content of the news article
  source_url: string; // URL of the source website
  source_name: string; // Name of the source website
  category: string; // Category of the news article (e.g., "Top Stories")
  keywords: string[]; // Array of keywords associated with the news article
}

const CategoriesRow = ({
  newsData,
  onDiscussClick,
}: {
  newsData: newsDataProps[];
  onDiscussClick(item: unknown): void;
}) => {
  useEffect(() => {
    new Swiper('.multiple-slide-carousel', {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        nextEl: '.multiple-slide-carousel .swiper-button-next',
        prevEl: '.multiple-slide-carousel .swiper-button-prev',
      },
    });
  }, [newsData]);
  return (
    <div className="ng-container">
      <div className="w-full relative">
        <h1 className="font-extrabold text-2xl tracking-tight text-blue-600 underline-offset-4 underline mb-4">
          {newsData[0].category}
        </h1>

        <div
          className="swiper multiple-slide-carousel swiper-container relative"
          style={{ position: 'initial' }}
        >
          <div className="swiper-wrapper mb-8">
            {newsData.map((item, i) => (
              <div className="swiper-slide" key={i}>
                <BentoGridItem
                  source={item.source_url}
                  category={item.category}
                  title={item.title}
                  description={excerpt(item.content, 80)}
                  header={<Skeleton url={item.img} />}
                  className={'h-[26rem]'}
                  onClick={() => onDiscussClick(item)}
                />
              </div>
            ))}
          </div>
          <div
            className="flex items-center gap-8 lg:justify-start justify-center "
            style={{ position: 'initial' }}
          >
            <button
              id="slider-button-left"
              className="absolute -left-16 swiper-button-prev group !p-2 flex justify-center items-center border border-solid border-blue-600 !w-10 !h-10 transition-all duration-500 rounded-full !top-2/4 !-translate-y-8  hover:bg-blue-600 "
              data-carousel-prev
            >
              <svg
                className="h-5 w-5 text-blue-600 group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              id="slider-button-right"
              className=" absolute -right-16 swiper-button-next group !p-2 flex justify-center items-center border border-solid border-blue-600 !w-10 !h-10 transition-all duration-500 rounded-full !top-2/4 !-translate-y-8  hover:bg-blue-600"
              data-carousel-next
            >
              <svg
                className="h-5 w-5 text-blue-600 group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5.99984 4.00012L10 8.00029L5.99748 12.0028"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesRow;
