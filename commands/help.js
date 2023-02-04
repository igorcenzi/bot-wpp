// const help = (msg) => {
//   msg.reply(
//     `Olá, eu sou o bot do Hiago, exemplo de comandos:
//     /sticker
//     /menu -
//     /calc
//     /dono
//     /frase
//     /sobre
//     /bot
//     /perfil
//     /wame
//     /img

//     Para mais informações, acesse o link do meu dono:  https://wa.me/5521966916447
//     `
//   );
// };

const help = (prefix, hordat, numerodn, NickDono) => {
  return `​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
    ╔┅═┅══════┅═══┅════┅
    ╠⊹ ╭━─•⬕•HIAGO BOT•⬔•─━─━𒀸
    ╠⊹ ┝≼≽ Seja bem vindo(a) ao menu 
    ╠⊹ ┝≼≽ Prefixo: ⟮•  ${prefix} •⟯
    ╠⊹ ┝≼≽ Data/Hora : ⟮• ${hordat} •⟯
    ╠⊹ ╰─━─━─━──━──━─━─━━𒀸
    ║   
    ╠⊹ ╭─━━─━ AJUDA━─𒀸
    ╠⊹ ┝≼≽ ${prefix}ajuda - Exibe o menu de ajuda
    ╠⊹ ┝≼≽ ${prefix}bot - Fale com o bot
    ╠⊹ ┝≼≽ ${prefix}calc - Calculadora
    ╠⊹ ┝≼≽ ${prefix}dono - Informações sobre o dono
    ╠⊹ ┝≼≽ ${prefix}frase - Frases aleatórias
    ╠⊹ ┝≼≽ ${prefix}img - Imagens aleatórias
    ╠⊹ ┝≼≽ ${prefix}menu - Exibe o menu de comandos
    ╠⊹ ┝≼≽ ${prefix}perfil - Seu perfil(somente no privado)
    ╠⊹ ┝≼≽ ${prefix}sobr - Sobre o bot
    ╠⊹ ┝≼≽ ${prefix}sticker - Gera um sticker a partir de uma imagem
    ╠⊹ ┝≼≽ ${prefix}wame - Seu link do WhatsApp(somente no privado)
    ╠⊹ ╰─━─━─━──━──━─━─━𒀸
    ║
    ╠⊹            •INFO/DONO•
    ╠⊹ ╭─━─━─━─━─𒀸
    ╠⊹ ┝≼≽ NOME : ${NickDono}
    ╠⊹ ┝≼≽ NÚMERO : ${numerodn} 
    ╠⊹ ╰─━─━─━──━──━─━─𒀸
    ║ Para mais informações, acesse o link do meu dono:
    ║ https://wa.me/5521966916447
    ╚┅═┅══════┅═══┅════┅
    `;
};

const menu = (msg) => {
  const prefix = "/";
  const hordat = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
  const numerodn = "21966916447";
  const NickDono = "Hiago Silva";
  msg.reply(help(prefix, hordat, numerodn, NickDono));
};

module.exports = menu;
