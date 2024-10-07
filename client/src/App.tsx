import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import NewsList from './components/NewsList';
import Modal from './components/Modal';

const App = ({ passInTop }: { passInTop: (item: unknown) => void }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if 'newsFeedPreferences' exists in localStorage
    const preferences = localStorage.getItem('newsFeedPreferences');
    if (!preferences) {
      // If not found, show the modal
      setShowModal(true);
    }
  }, []);

  return (
    <>
      <Navbar activeSection={'All News'} />
      <NewsList onDiscussClick={(item) => passInTop(item)} />
      {showModal && <Modal />}
    </>
  );
};

export default App;
