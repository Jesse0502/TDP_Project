const Loading = () => {
  return (
    <div className="flex space-x-1 justify-center items-centerh-screen p-1">
      <span className="sr-only">Loading...</span>
      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
    </div>
  );
};

export default Loading;
