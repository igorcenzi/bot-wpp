const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
const { MessageMedia } = require("whatsapp-web.js");
const sharp = require('sharp');
const fs = require('fs');
const axios = require("axios");
dotenv.config();

const configuration = new Configuration({
  organization: process.env.ORGANIZATION_ID,
  apiKey: process.env.OPENAI_KEY,
});

async function saveAndResizeImage(base64Image, path, width, height) {
  const imageBuffer = Buffer.from(base64Image, 'base64');
  fs.writeFileSync(path, imageBuffer);
  sharp.cache(false);
  const resizedImageBuffer = await sharp(path)
    .resize({ width, height })
    .png()
    .toBuffer();
}

const getImage = async (fileName) => {
  let outputFile = `new-png-variant.png`;
  sharp.cache(false);
  return await sharp(fileName)
    .resize({ height: 512, width: 512 })
    .toFile(outputFile)
    .then(() => generateImage(outputFile))
    .catch(function () {
      console.log("Error occured");
    });
};

const generateImage = async (outputFile) => {
  try {
    let response = await openai.createImageVariation(
      fs.createReadStream(outputFile),
      1,
      "512x512"
    ).catch((e) => {
      return `❌ Erro ao processar imagem`;
    });
    return response.data.data[0].url;
  } catch (e) {
    return `❌ OpenAI Response Error: ${e.response.data.error.message}`;
  }
}

const openai = new OpenAIApi(configuration);

const variantImage = async (data) => {
  await saveAndResizeImage(data, 'image.png', 512, 512)
  try{
    const image_url = await getImage('image.png');
    return await MessageMedia.fromUrl(image_url);

  }catch(e){
    console.log(e);
  }
}

module.exports = {
  variantImage,
};