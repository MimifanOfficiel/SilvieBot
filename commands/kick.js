const Discord = require("discord.js")
const { EmbedBuilder, Embed } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Oops, a player left. They were not forced at all...",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "member to kick",
            required: true 
        }, {
            type: "string",
            name: "reason",
            description: "Reason of the kick",
            required: false
        }
    ],
    async run (bot, message, args){
        let user = await args.getUser("member")
        if(!user) return message.reply("No member to kick !");

        let member = message.guild.members.cache.get(user.id);
        if(!member) return message.reply("No member to kick !");

        let reason = args.getString("reason");
        if(!reason) reason = "No reason set.";

        if(message.user.id === user.id) return message.reply("You can not kick yourself.");
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Can not kick server's owner");
        if(member && !member.kickable) return message.reply("I can not kick this user.");
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("You can not kick this user.")

        const embed = new EmbedBuilder()
            .setTitle("Kick")
            .setColor(0xFF0000)
            .setImage(member.displayAvatarURL())
            .setThumbnail(message.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setAuthor({name: bot.user.tag})
            .addFields([
                {name: "User: ", value: user.tag, inline: true} , 
                {name: "By: ", value: message.user.tag, inline: true},
                {name: "Reason", value: reason, inline: false} ]);

        try {await user.send({embeds: [embed]}) } catch (err){}

        await member.kick(reason);
        
        await message.channel.send({embeds: [embed]});
    }
}