import { cn } from '../lib/utils';
import { Button } from './Button';
import { Link } from 'react-router-dom';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto ',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  source,
  className,
  title,
  description,
  header,
  category,
  onClick,
}: {
  source?: string;
  className?: string;
  title: string;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  category?: string;
  onClick: (item: unknown) => void;
}) => {
  return (
    <div
      className={cn(
        'row-span-1 rounded-xl group/bento hover:shadow-md transition duration-200 shadow-input dark:shadow-none bg-white flex flex-col space-y-4',
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200 flex flex-col justify-between flex-grow p-2 !mt-0">
        <div>
          <div className="text-xs bg-blue-100 inline-block px-2 py-1 rounded-full font-semibold mt-2 mb-1">
            {category}
          </div>
          <div className="font-bold mb-2 text-xl">
            <a
              href={source}
              className="hover:underline hover:text-blue-500"
              target="_blank"
            >
              {title}
            </a>
          </div>
          <div className="text-gray-600 font-normal text-sm">{description}</div>
        </div>
        <div className="mt-4">
          <Button>
            <Link to={`/${title.replaceAll(' ', '_')}`} onClick={onClick}>
              Discuss
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
