const axios = require("axios");

const calculate = async (msg) => {
  const expression = msg.body.substring(msg.body.indexOf(" ") + 1);
  const numbers = expression.split("+");
  const map = numbers.map((item) => parseInt(item));
  const sum = map.reduce((prev, curr) => prev + curr, 0);

  const regex = /[^0-9+\-*/.()]/g;
  if (regex.test(expression)) {
    msg.reply("❌ Expressão inválida");
    return;
  }
  try {
    if (expression.includes("+")) {
      const { data } = await axios.get(
        `https://api.mathjs.org/v4/?expr=${sum}`
      );
      msg.reply(`Resultado: ${data}`);
    } else {
      const { data } = await axios.get(
        `https://api.mathjs.org/v4/?expr=${expression}`
      );
      msg.reply(`Resultado: ${data}`);
    }
  } catch (e) {
    msg.reply("❌ Erro ao calcular expressão");
  }
};

module.exports = calculate;
