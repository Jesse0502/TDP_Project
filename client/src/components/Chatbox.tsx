import { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import axios from 'axios';
import Loading from './Loading';

const Chatbox = ({ newsData }: { newsData: any }) => {
  const [waiting, setWaiting] = useState(true);
  const [conversation, setConversation] = useState<
    { sender: string; content: string }[]
  >([]);
  const [userText, setUserText] = useState('');
  const scrollRef = useRef(null);

  const handleSendMsg = async () => {
    setUserText('');
    setWaiting(true);
    setConversation((m) => [...m, { sender: 'You', content: userText }]);
    setTimeout(async () => {
      const result = await axios.post('http://localhost:8000/respond', {
        data: {
          msg: `Based on this chat history respond to this message. ${JSON.stringify(
            conversation
          )} - ${userText}`,
        },
      });

      setConversation((m) => [
        ...m,
        { sender: 'Bot', content: result.data.result },
      ]);

      setWaiting(false);
    }, 3500);
  };

  useEffect(() => {
    // Scroll to the bottom whenever the messages array changes
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  useEffect(() => {
    (async () => {
      setWaiting(true);

      const response = await axios.post('http://localhost:8000/get-context', {
        data: { title: newsData?.title, content: newsData?.content },
      });
      setConversation((prevResult) => [
        ...prevResult,
        { sender: 'Bot', content: response.data.result },
      ]);

      setWaiting(false);
    })();
  }, [newsData?.content, newsData?.title]);

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-xl">
      {/* Chat Header */}

      {/* Message List */}
      <div
        className="flex-1 overflow-y-auto p-6 py-8 space-y-6 custom-scroll h-[80%]"
        ref={scrollRef}
      >
        {conversation.length !== 0 &&
          conversation.map((m, idx) => {
            return m.sender === 'Bot' ? (
              // Example of a received message
              <div className="flex items-start space-x-2" key={idx}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf-KglkuMxuxbUHztqWI6DFl5JHinvNCFi2w&s"
                  className="w-8 h-8"
                  alt="Avatar"
                />

                <div className="bg-slate-100 py-2 px-4 rounded-xl text-sm">
                  <Markdown>{m.content}</Markdown>
                </div>
              </div>
            ) : (
              <>
                {/* Example of a sent message */}
                <div className="flex justify-end" key={idx}>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-full  text-sm">
                    {m.content}
                  </div>
                </div>
              </>
            );
          })}

        {waiting && ( // Example of a received message
          <div className="flex items-start space-x-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf-KglkuMxuxbUHztqWI6DFl5JHinvNCFi2w&s"
              className="w-8 h-8"
              alt="Avatar"
            />
            {waiting && (
              <div className="bg-slate-100 py-2 px-2 rounded-xl text-sm">
                <Loading />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex items-center p-6 h-[20%]">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Type your message..."
          onChange={($e) => {
            setUserText($e.target.value);
          }}
          value={userText}
        />
        <button
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 text-sm"
          onClick={handleSendMsg}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
