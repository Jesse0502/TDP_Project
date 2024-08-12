import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";

const SingleNews = () => {
  const singleNews = useSelector((state: RootState) => state.news.currentNews);
  const [waiting, setWaiting] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<
    { sender: string; content: string }[]
  >([]);
  const handleSendMsg = async () => {
    setWaiting(true);
    setMessages((m) => [...m, { sender: "You", content: msg }]);
    setTimeout(async () => {
      const result = await axios.post("http://localhost:3000/respond", {
        data: {
          msg: `Based on this chat history respond to this message. ${JSON.stringify(
            messages
          )} - ${msg}`,
        },
      });

      setMessages((m) => [
        ...m,
        { sender: "Bot", content: result.data.result },
      ]);
      setMsg("");

      setWaiting(false);
    }, 3500);
  };
  useEffect(() => {
    (async () => {
      setWaiting(true);
      const response = await axios.post("http://localhost:3000/get-context", {
        data: { title: singleNews?.title, content: singleNews?.content },
      });
      setMessages((m) => [
        ...m,
        { sender: "Bot", content: response.data.result },
      ]);
      setWaiting(false);
    })();
  }, []);
  return (
    <Center flexDir={"column"}>
      <Image src={singleNews?.img} w="300px" />
      <Text fontWeight={"bold"} w="30%" textAlign={"center"}>
        {singleNews?.title}
      </Text>
      <Flex
        w="100vh"
        h="350px"
        justify={"space-between"}
        flexDir={"column"}
        outline={"2px solid black"}
      >
        <Flex flexDir={"column"} p="2" gap="1" overflowY={"scroll"}>
          {messages.length && messages.map((m) => <SingleMessage d={m} />)}
          {waiting && (
            <Flex gap="2">
              <Avatar name={"Bot"} />
              <Box>
                <Text fontWeight={"bold"}>Bot</Text>
                <Text color={"gray"}>
                  Bot is writing...
                  {/* <Text
            dangerouslySetInnerHTML={{
              __html: `${d.content}`,
            }}
          ></Text> */}
                </Text>
              </Box>
            </Flex>
          )}
        </Flex>
        <Flex p="2" alignItems={"center"}>
          <Input
            onChange={(text) => {
              setMsg(text.target.value);
            }}
            value={msg}
            type="text"
            placeholder="Enter something"
            rounded="none"
          />
          <Button
            isLoading={waiting && msg}
            onClick={handleSendMsg}
            colorScheme="green"
            rounded="none"
          >
            Send
          </Button>
        </Flex>
      </Flex>
    </Center>
  );
};
const SingleMessage = ({ d }) => {
  return (
    <Flex gap="2">
      <Avatar name={d.sender} />
      <Box>
        <Text fontWeight={"bold"}>{d.sender}</Text>
        <Markdown>
          {d.content}
          {/* <Text
            dangerouslySetInnerHTML={{
              __html: `${d.content}`,
            }}
          ></Text> */}
        </Markdown>
      </Box>
    </Flex>
  );
};
export default SingleNews;
