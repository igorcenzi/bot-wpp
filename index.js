const { Client, MessageMedia, LocalAuth } = require("whatsapp-web.js");
const axios = require("axios");
const qr_code = require("qrcode-terminal");
const sharp = require('sharp');
const fs = require('fs');

const commands = {
  STICKER: "/sticker",
  CALC: "/calc",
  FRASES: "/frases",
  MENU: "/menu",
  SOBRE: "/sobre",
  AJUDA: "/ajuda",
  VARIANTE: "/var",
  BOT: "/bot",
  IMAGEM: "/img",
}

async function saveAndResizeImage(base64Image, path, width, height) {
  const imageBuffer = Buffer.from(base64Image, 'base64');
  fs.writeFileSync(path, imageBuffer);
  sharp.cache(false);
  const resizedImageBuffer = await sharp(path)
    .resize({ width, height })
    .png()
    .toBuffer();
  const resizedImageBase64 = resizedImageBuffer.toString('base64');
  return resizedImageBase64;
}

// commands
const {
  calculate,
  owner,
  phrases,
  menu,
  about,
  help,
  botOpenAIResponse,
  getImageResponse,
  variantImage,
} = require("./exports");

const generateFrase = async (msg) => {
  const random = Math.floor(Math.random() * phrases.length);
    msg.reply(phrases[random].phrase);
}

const client = new Client({
  restartOnAuthFail: true,

  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  authStrategy: new LocalAuth({
    clientId: "client-one",
  }),
});

client.on("qr", (qr) => {
  qr_code.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Sistema iniciado com sucesso");
});

client.on("message_create", (msg) => {
  const command = msg.body.split(" ")[0];
  const question = msg.body.substring(msg.body.indexOf(" "));
  const sender = msg.from.includes("97022403") ? msg.to : msg.from;
  switch (command) {
    case commands.STICKER:
      generateSticker(msg, sender);
      break;
    case commands.CALC:
      calculate(msg);
      break;
    case commands.FRASES:
      generateFrase(msg);
      break;
    case commands.MENU:
      menu(sender, client);
      break;
    // case commands.SOBRE:
    //   about(msg);
    //   break;
    // case commands.AJUDA:
    //   help(msg);
    //   break;
    case commands.VARIANTE:
      generateVariantImage(msg, sender);
      break;
    case commands.BOT:
    botOpenAIResponse(question).then((response) => {
      msg.reply(response);
    });
      break;
    case commands.IMAGEM:
    getImageResponse(question).then((response) => {
      msg.reply(response);
    });
      break;
  }
});

client.initialize();

const generateVariantImage = async (msg, sender) => {
  const { data } = await msg.downloadMedia();
  if (msg.type === "image") {
    saveAndResizeImage(data, 'image.jpg', 512, 512)
    try {
      const message = await variantImage(data)
    await client.sendMessage(sender, message);
    } catch (e) {
      console.log(e)
      msg.reply("❌ Erro ao processar imagem");
    }
  }
}

const generateSticker = async (msg, sender) => {
  if (msg.type === "image") {
    try {
      const { data } = await msg.downloadMedia();
      const image = new MessageMedia("image/jpeg", data, "image.jpg");
      await client.sendMessage(sender, image, { sendMediaAsSticker: true });
    } catch (e) {
      console.log(e)
      msg.reply("❌ Erro ao processar imagem");
    }
  } else {
    try {
      const url = msg.body.substring(msg.body.indexOf(" ")).trim();
      const { data } = await axios.get(url, { responseType: "arraybuffer" });
      const returnedB64 = Buffer.from(data).toString("base64");
      const image = new MessageMedia("image/jpeg", returnedB64, "image.jpg");
      await client.sendMessage(sender, image, { sendMediaAsSticker: true });
    } catch (e) {
      msg.reply("❌ Não foi possível gerar um sticker com esse link");
    }
  }
};

const myProfile = async (msg) => {
  const contact = await client.getContactById(msg.from);
  console.log(contact);
  msg.reply(`👤 *${contact.pushname}*\n\n*Número:* ${contact.number}\n`);
};

const waMe = async (msg) => {
  const contact = await client.getContactById(msg.from);
  msg.reply(`Seu link para compartilhar: https://wa.me/${contact.number}`);
};
