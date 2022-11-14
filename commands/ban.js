const Discord = require("discord.js")
const { EmbedBuilder, Embed } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Makes the ban hammer fall on someone !",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "member to ban",
            required: true 
        }, {
            type: "string",
            name: "reason",
            description: "Reason of the ban",
            required: false
        }
    ],
    async run (bot, message, args){
        try {
            let user = await args.getUser("member");
            if(!user) return message.reply("No member to ban !");

            let member = message.guild.members.cache.get(user.id);

            let reason = args.getString("reason");
            if(!reason) reason = "No reason set.";

            if(message.user.id === user.id) return message.reply("You can not ban yourself.");
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("Can not ban server's owner");
            if(member && !member.bannable) return message.reply("I can not ban this user.");
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("You can not ban this user.")
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("This user is already banned.")
            
            const embed = new EmbedBuilder()
            .setTitle("Ban")
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

            await message.guild.bans.create(user.id, {reason: reason});
            
        await message.channel.send({embeds: [embed]});

        } catch (error){
            return message.reply("This user doesn't exists.");
        }
    }
}