const configs = require('./config.js');

async function queryChatGPT(promptText) {
  const apiKey = configs.chatGPT.apiKey;
  const endpoint = configs.chatGPT.apiUrl;
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: promptText }]
    })
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data.choices[0].message;
}

module.exports = {queryChatGPT};