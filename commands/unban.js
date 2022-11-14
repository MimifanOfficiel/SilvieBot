const Discord = require("discord.js")
const { EmbedBuilder, Embed } = require("discord.js");

module.exports = {
    name: "unban",
    description: "The ban hammer will be removed !",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "member to unban",
            required: true 
        }
    ],
    async run (bot, message, args){
        try {

            let user = await args.getUser("member");
            if(!user) return message.reply("No user to unban.");

            if((!await message.guild.bans.fetch()).get(user.id)) return message.reply("This user is not banned.");
            try {await user.send(`You have been unbanned of ${message.guild.name} by ${message.member.tag}`)} catch(err) {}
            message.channel.send(`${message.user.tag} unbanned ${user.tag} of the server.`);
            await message.guild.members.unban(user, null);

        } catch (error){
            return message.reply("This user doesn't exists.");
        }
    }
}