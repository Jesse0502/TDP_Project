const NewsAPI = require("newsapi");

var fs = require("fs");

export const newsFetcher = async (
  category = "",
  language = "en",
  country = ""
) => {
  const url = "https://newscafapi.p.rapidapi.com/apirapid/news/?q=news";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "newscafapi.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    fs.writeFile("myjsonfile.json", JSON.stringify(result), "utf8", () => {});
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export const fakeData = () => {
  const data = fs.readFileSync("myjsonfile.json", "utf8");
  return JSON.parse(data);
};
