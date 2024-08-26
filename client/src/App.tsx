import Navbar from './components/Navbar';
import NewsList from './components/NewsList';

const App = ({ passInTop }: { passInTop: (item: unknown) => void }) => {
  return (
    <>
      <Navbar />
      <NewsList onDiscussClick={(item) => passInTop(item)} />
    </>
  );
};

export default App;
