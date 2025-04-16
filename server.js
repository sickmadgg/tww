const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a tire, wheel, and rim expert assistant for a company called TWW Distribution. Be helpful, clear, and professional.' },
        { role: 'user', content: message },
      ],
    });
    res.json({ response: completion.data.choices[0].message.content });
  } catch (err) {
    res.status(500).send('Error communicating with AI: ' + err.message);
  }
});

app.listen(3000, () => {
  console.log('TWW Chatbot server running on port 3000');
});
