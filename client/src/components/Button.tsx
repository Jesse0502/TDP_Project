export const Button: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <button className="border-b-orange-500 border-0 border-b-2 py-0 px-1 font-semibold">
      {children}
    </button>
  );
};
