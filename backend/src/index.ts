import express from "express";
import { fakeData, newsFetcher } from "./helpers";
import cors from "cors";
import bodyParser from "body-parser";
import { textOnly } from "./utils/textOnly";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: ["*", "http://localhost:5173"],
    methods: ["GET", "POST"],
    // allowedHeaders: ["Content-Type", "application/json"],
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/get-context", async (req, res) => {
  try {
    const airesp = await textOnly(
      `Provide a brief of this news headlining (${req.body.data.title}) ${req.body.data.content}`
    );
    res.json(airesp);
  } catch (err) {
    res.json({ msg: "something went wrong: " + err.message });
  }
});

app.post("/respond", async (req, res) => {
  try {
    const airesp = await textOnly(`${req.body.data.msg}`);
    res.json(airesp);
  } catch (err) {
    res.json({ msg: "something went wrong: " + err.message });
  }
});

app.get("/news", async (req, res) => {
  try {
    const news = fakeData();
    res.json(news);
    // const singleNewsArticle = news[0];
    // console.log("singleNewsArticle", singleNewsArticle.title);

    // const response = await textOnly(
    //   `Provide a brief of this news headlining (${singleNewsArticle.title}) ${singleNewsArticle.content}`
    // );
    // console.log(response);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
