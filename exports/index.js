const calculate = require("../commands/calculate");
const owner = require("../commands/owner");
const phrases = require("../commands/phrases");
const menu = require("../commands/menu");
const about = require("../commands/about");
const { botOpenAIResponse, getImageResponse } = require("../commands/openAI");
const help = require("../commands/help");
const { variantImage } = require("../commands/variant");

module.exports = {
  calculate,
  owner,
  phrases,
  menu,
  about,
  botOpenAIResponse,
  getImageResponse,
  help,
  variantImage,
};
