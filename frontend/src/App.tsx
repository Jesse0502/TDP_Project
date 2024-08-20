import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import NewsBlock from "./components/NewsBlock";
import { Flex, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setAllNews } from "./store/newsSlice";

function App() {
  const dispatch = useDispatch();
  const [newsData, setNewsData] = useState<
    {
      date: string; // ISO 8601 formatted date string (e.g., "2024-08-10T04:21:04Z")
      img: string; // URL of the news article image (might be empty)
      title: string; // Title of the news article
      content: string; // Content of the news article
      source_url: string; // URL of the source website
      source_name: string; // Name of the source website
      category: string; // Category of the news article (e.g., "Top Stories")
      keywords: string[]; // Array of keywords associated with the news article
    }[]
  >([]);

  useEffect(() => {
    (async () => {
      const newsData = await axios.get("http://localhost:8000/fake-data");
      setNewsData(newsData.data);
      console.log(newsData.data);
      dispatch(setAllNews(newsData.data));
    })();
  }, []);

  return (
    <>
      {newsData.length}
      {newsData.length && (
        <Flex flexWrap={"wrap"} gap="2">
          {newsData.map((n) => (
            <NewsBlock n={n} />
          ))}
        </Flex>
      )}
    </>
  );
}

export default App;
