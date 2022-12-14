const { SlashCommandBuilder } = require('discord.js')
const { execute } = require('../../events/client/ready')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Return the ping of the bot in a message'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        })

        const newMessage = `API Latency: ${client.ws.ping}\n Client Ping: ${message.createdTimestamp - interaction.createdTimestamp}`
        await interaction.editReply({
            content: newMessage
        })
    }

}