import Navbar from './components/Navbar';
import NewsList from './components/NewsList';
import Modal from './components/Modal';

const App = ({ passInTop }: { passInTop: (item: unknown) => void }) => {
  return (
    <>
      <Navbar />
      <NewsList onDiscussClick={(item) => passInTop(item)} />
      <Modal />
    </>
  );
};

export default App;
