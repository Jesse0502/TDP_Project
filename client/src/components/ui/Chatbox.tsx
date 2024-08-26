import Markdown from 'react-markdown';
import Loading from './Loading';

const Chatbox = ({
  result,
  isWaiting,
}: {
  result: any;
  isWaiting: boolean;
}) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-xl">
      {/* Chat Header */}

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll">
        {/* Example of a received message */}
        <div className="flex items-start space-x-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf-KglkuMxuxbUHztqWI6DFl5JHinvNCFi2w&s"
            className="w-8 h-8 rounded-full"
            alt="Avatar"
          />
          {isWaiting && (
            <div className="bg-gray-200 py-2 px-2 rounded-xl text-sm">
              <Loading />
            </div>
          )}
          {!isWaiting && (
            <div className="bg-gray-200 py-2 px-4 rounded-xl text-sm">
              {result.length &&
                result.map((m, idx) => {
                  return <Markdown key={idx}>{m.content}</Markdown>;
                })}
            </div>
          )}
        </div>

        {/* Example of a sent message */}
        <div className="flex justify-end">
          {/* <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-full  text-sm">
            Hey there! How are you?
          </div> */}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex items-center  p-4">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Type your message..."
        />
        <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 text-sm">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
