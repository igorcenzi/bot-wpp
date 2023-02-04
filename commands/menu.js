
const getWelcomeMessage = () => {
return `
🤖 Olá, eu sou o Dev Bot, um bot de WhatsApp desenvolvido por Hiago Silva e Igor Cenzi.
📚 Aqui vai uma lista do que sou capaz de fazer!
`
}

const getBotGPTMessage = () => {
  return `
🤖 Caso você tenha alguma dúvida ou queira apenas conversar comigo, você pode usar o comando /bot seguido da dúvida/mensagem.
📚 Exemplo: /bot O que você acha de mim?
E é só aguardar que eu te respondo!
`;
};

const getImageMessage = () => {
  return `
🤖 Caso você queira uma imagem muito específica, você pode usar o comando /img seguido da descrição dela.
📚 Exemplo: /img um cachorro correndo de uma zebra no deserto
Eu prometo caprichar na imagem, então ela pode demorar um pouquinho!
`;
};

const getStickerMessage = () => {
  return `
🤖 Agora, se você tem uma imagem maneira e gostaria que ela virasse uma figurinha pra sua coleção, você pode usar o comando /sticker enviando a imagem que você quer transformar.
📚 Exemplo: /sticker (anexar uma imagem)
Essa eu te respondo bem rápido, então não precisa ficar esperando muito!
`;
};

const getCalcMessage = () => {
  return `
🤖 Se você está no meio daquela prova de matemática e esqueceu a cola em casa, fica tranquilo que eu te ajudo! Basta usar o comando /calc seguido da expressão matemática.
📚 Exemplo: /calc 2 + 2 * 5 / 10
Eu sou expert em matemática, então não precisa ficar com medo de errar!
`;
};

const getVariantMessage = () => {
  return `
🤖 Agora aqui vai uma funcionalidade interessante, se você tem uma imagem, eu posso criar uma variação a partir dela! Basta usar o comando /var e enviar a imagem junto.
📚 Exemplo: /var (anexar imagem)
`;
};

const menu = (sender, client) => {
  let index = 0;
  const messages = [
    getWelcomeMessage(),
    getBotGPTMessage(),
    getImageMessage(),
    getStickerMessage(),
    getCalcMessage(),
    getVariantMessage(),
  ];

  const sendNextMessage = () => {
    if (index === messages.length) return;

    client.sendMessage(sender, messages[index++]);
    setTimeout(sendNextMessage, 1500);
  }
  sendNextMessage();
};

module.exports = menu;
