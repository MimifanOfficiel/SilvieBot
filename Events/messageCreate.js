const config = require("../config.json");

module.exports = async (bot, message) => {
    if(message.author.bot) return;

    let messageArray = message.content.split(" ");
    let commandName = messageArray[0].slice(config.prefix.length);
    let args = messageArray.slice(1);
    
}