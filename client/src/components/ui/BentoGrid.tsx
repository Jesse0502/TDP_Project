import { cn } from '../../lib/utils';
import { Button } from './Button';

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
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none bg-white border border-gray-300 flex flex-col space-y-4',
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200 flex flex-col justify-between flex-grow p-4 !mt-0">
        <div>
          <div className="font-sans font-bold mb-2 mt-2 text-2xl">{title}</div>
          <div className="font-sans font-normal text-md">{description}</div>
        </div>
        <div className="mt-4">
          <Button>Discuss</Button>
        </div>
      </div>
    </div>
  );
};
