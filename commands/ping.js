const Discord = require("discord.js");

module.exports = {

    name:"ping",
    description:"Renvoie pong ! Original nan ?",
    permission: "None",
    dm: true,

    async run(bot, message) {
        await message.reply(`Pong 🏓 \`${bot.ws.ping}\`ms`);
    }
}