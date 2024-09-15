import { Button, Center, Image, Link, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setSingleNews } from "../store/newsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const NewsBlock = ({
  n,
}: {
  n: {
    date: string; // ISO 8601 formatted date string (e.g., "2024-08-10T04:21:04Z")
    img: string; // URL of the news article image (might be empty)
    title: string; // Title of the news article
    content: string; // Content of the news article
    source_url: string; // URL of the source website
    source_name: string; // Name of the source website
    category: string; // Category of the news article (e.g., "Top Stories")
    keywords: string[]; // Array of keywords associated with the news article
  };
}) => {
  console.log("n", n);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sentiment, setSentiment] = useState<string>("");

  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        const response = await axios.post("http://localhost:8000/analyze_sentiment", {
          text: n.content,
        });
        setSentiment(response.data.sentiment);
      } catch (error) {
        console.error("Error fetching sentiment:", error);
      }
    };
    fetchSentiment();
  }, [n.content]);

  const handleOnClick = () => {
    dispatch(setSingleNews(n));
    navigate("/headline/" + n.title.replaceAll(" ", "_"));
  };

  return (
    <Center
      flex="1 1 1"
      flexDir={"column"}
      p="1"
      w="350px"
      outline={"1px solid black"}
    >
      {n.img && <Image h="200px" src={n.img} w="300px" />}
      <Link href={n.source_url} color="blue.500" textAlign={"center"}>
        {n.title}
      </Link>
      {sentiment && (
        <Text fontWeight="bold" color="green.500">
          Sentiment: {sentiment}
        </Text>
      )}
      <Button w="full" my="2px" onClick={handleOnClick}>
        Discuss
      </Button>
    </Center>
  );
};

export default NewsBlock;
