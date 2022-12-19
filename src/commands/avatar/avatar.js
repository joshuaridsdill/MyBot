const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { execute } = require('../../events/client/ready')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Return avatar of user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to grab avatar')
                .setRequired(false)),

    async execute(interaction, client) {
        const user = interaction.options.getUser('user')
        let embed
        if(!user) {
            embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('Avatar')
            .setURL('https://discord.com')
            .setAuthor({
                url: interaction.user.displayAvatarURL(),
                iconURL: interaction.user.displayAvatarURL(),
                name: `${interaction.user.tag}`,
            })
            .setDescription('Avatar of user')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: 'Regular field title', value: 'Some value here', inline: true }
            )
            .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            .setImage(interaction.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
        }

        else {
            embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('Avatar')
            .setURL('https://discord.com')
            .setAuthor({
                url: interaction.user.displayAvatarURL(),
                iconURL: interaction.user.displayAvatarURL(),
                name: `${interaction.user.tag}`,
            })
            .setDescription('Your Avatar')
            .setThumbnail(user.displayAvatarURL())
            .setImage(user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setFooter({ text: `${user.tag}'s Avatar`, iconURL: 'https://i.imgur.com/AfFp7pu.png' });
        }
        
        await interaction.reply({
            ephemeral: true,
            embeds: [embed]
        })
    }

}