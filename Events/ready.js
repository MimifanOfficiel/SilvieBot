const {Discord, ActivityType} = require("discord.js");
const loadSlashCommands = require("../loader/loadSlashCommands");

module.exports = async bot => {
    await loadSlashCommands(bot)
    console.log("Le bot est fonctionnel");
    bot.user.setActivity(`Faire des enfants.`, {type:ActivityType.Competing});
}