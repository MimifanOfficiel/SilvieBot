const Discord = require("discord.js");
const { EmbedBuilder, Embed } = require("discord.js");
const ms = require("ms");

module.exports = {

    name:"mute",
    description:"A bit of tape on someone's mouth",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    options: [
        {
            type:"user",
            name:"member",
            description: "Member to mute",
            required: true
        }, {
            type: "string",
            name: "duration",
            description: "Mute duration",
            required: true
        }, {
            type: "string",
            name: "reason",
            description: "Reason",
            required: false
        }
    ],

    async run(bot, message, args) {
        let user = await args.getUser("member")
        if(!user) return message.reply("No member to mute !");

        let member = message.guild.members.cache.get(user.id);
        if(!member) return message.reply("No member to mute !");

        let duration = args.getString("duration");
        if(!duration) return message.reply("No duration set.");
        if(isNaN(ms(duration))) return message.reply("Wrong duration format");
        if(ms(duration) > 142128000000) return message.reply("Mute duration can not be longer than 28 days");

        let reason = args.getString("reason");
        if(!reason) reason = "No reason set.";

        if(message.user.id === user.id) return message.reply("You can not mute yourself.");
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Can not mute server's owner");
        if(member && !member.moderatable) return message.reply("I can not mute this user.");
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("You can not mute this user.")

        if(member.isCommunicationDisabled()) return message.reply("This user is already muted.");
        
        try {await user.send(`You have been muted from ${message.guild.name} by ${message.user.tag} for the reason: ${reason}`) } catch (err){}
        
        const embed = new EmbedBuilder()
            .setTitle("Mute")
            .setColor(0xFF0000)
            .setImage(member.displayAvatarURL())
            .setThumbnail(message.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setAuthor({name: bot.user.tag})
            .addFields([
                {name: "User: ", value: user.tag, inline: true} , 
                {name: "By: ", value: message.user.tag, inline: true},
                {name: "Duration: ", value: duration, inline: true},
                {name: "Reason", value: reason, inline: false} ]);
        await message.channel.send({embeds: [embed]});
        await member.timeout(ms(duration), reason);
        
    }
}