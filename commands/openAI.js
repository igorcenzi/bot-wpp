const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
const { MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");
dotenv.config();

const configuration = new Configuration({
  organization: process.env.ORGANIZATION_ID,
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const botOpenAIResponse = async (msg) => {
  const options = {
    model: "text-davinci-003",
    prompt: msg,
    temperature: 1,
    max_tokens: 4000,
  };

  try {
    const response = await openai.createCompletion(options);
    let botResponse = "";
    response.data.choices.forEach(({ text }) => {
      botResponse += text;
    });
    return `Chat GPT 🤖\n\n ${botResponse.trim()}`;
  } catch (e) {
    return `❌ OpenAI Response Error: ${e}`;
  }
};

const getImageResponse = async (msg) => {
  const options = {
    prompt: msg, // Descrição da imagem
    n: 1, // Número de imagens a serem geradas
    size: "1024x1024", // Tamanho da imagem
  };

  try {
    const response = await openai.createImage(options);
    const url = response.data.data[0].url;
    const { data } = await axios.get(url, { responseType: "arraybuffer" });
    const returnedB64 = Buffer.from(data).toString("base64");
    const image = new MessageMedia("image/jpeg", returnedB64, "image.jpg");
    return image;
  } catch (e) {
    return `❌ OpenAI Response Error: ${e}`;
  }
};

module.exports = {
  botOpenAIResponse,
  getImageResponse,
};
