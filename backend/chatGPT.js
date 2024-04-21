const configs = require("./config.js");
const fs = require("fs");

async function queryChatGPT(promptText) {
  const apiKey = configs.chatGPT.apiKey;
  const endpoint = configs.chatGPT.apiUrl;

  const fs = require("fs").promises;

  try {
    const information = await fs.readFile("./backend/info.txt", "utf8");

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: information },
          { role: "user", content: promptText },
        ],
      }),
    });

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error("Error during file reading or fetching:", err);
    throw err;
  }
}

module.exports = { queryChatGPT };
