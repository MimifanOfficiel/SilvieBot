const Discord = require("discord.js");
const { EmbedBuilder, Embed } = require("discord.js");

module.exports = {

    name:"unmute",
    description:"Removing the tape of someone's mouth",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    options: [
        {
            type:"user",
            name:"member",
            description: "Member to unmute",
            required: true
        }
    ],

    async run(bot, message, args) {
        let user = await args.getUser("member")
        if(!user) return message.reply("No member to unmute !");

        let member = message.guild.members.cache.get(user.id);
        if(!member) return message.reply("No member to unmute !");

        if(member && !member.moderatable) return message.reply("I can not unmute this user.");
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("You can not unmute this user.")        
        if(!member.isCommunicationDisabled()) return message.reply("This user is not mute.");
        
        try {await user.send(`You have been unmute from ${message.guild.name} by ${message.user.tag}.`) } catch (err){}

        await message.channel.send(`${user.tag} have been unmuted by ${message.user.tag}`);
        await member.timeout(null, null);
        
    }
}