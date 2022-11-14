const Discord = require("discord.js");

module.exports = async (bot, interraction) => {
    if(interraction.type === Discord.InteractionType.ApplicationCommand) {
        let command = require(`../commands/${interraction.commandName}`);
        command.run(bot, interraction, interraction.options);
    }
}