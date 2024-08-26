import { cn } from '../../lib/utils';
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
        'grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  onClick,
}: {
  className?: string;
  title: string;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick: (item: unknown) => void;
}) => {
  return (
    <div
      className={cn(
        'row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none bg-white flex flex-col space-y-4',
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200 flex flex-col justify-between flex-grow p-4 !mt-0">
        <div>
          <div className=" font-bold mb-2 mt-2 text-2xl">{title}</div>
          <div className=" font-normal text-md">{description}</div>
        </div>
        <div className="mt-4">
          <Button>
            <Link to={`/news/${title.replaceAll(' ', '_')}`} onClick={onClick}>
              Discuss
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
