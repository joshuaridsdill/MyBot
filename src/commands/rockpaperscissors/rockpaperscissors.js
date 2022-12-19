const { SlashCommandBuilder } = require('discord.js')
const { execute } = require('../../events/client/ready')

const values = new Map([
    //["rock", 1],
    //["paper", 2],
    //["scissors", 3]
    [1, "rock"],
    [2, "paper"],
    [3, "scissors"]
])

const values_game = ["rock", "paper", "scissors"]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rockpaperscissors')
        .setDescription('Plays rock paper scissors')
        .addStringOption(option =>
            option.setName('answer')
                .setDescription('Weapon of choice')
                .setRequired(true)
                .addChoices(
                    { name: 'rock', value: '1' },
                    { name: 'paper', value: '2' },
                    { name: 'scissors', value: '3' },
                )),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        })

        const bot_answer_int = Math.floor(Math.random() * 3) + 1
        const bot_answer = values.get(bot_answer_int)
        const client_answer_int = parseFloat(interaction.options.getString('answer'))
        const client_answer = values.get(client_answer_int)

        let player_victory = false
        let draw = false

        console.log(`${bot_answer} .. ${bot_answer_int}`)
        console.log(`${client_answer} .. ${client_answer_int}`)

        switch (client_answer_int) {
            case 1:
                switch (bot_answer_int) {
                    case 1:
                        player_victory = false
                        draw = true
                        break
                    case 2:
                        player_victory = false
                        draw = false
                        break
                    case 3:
                        player_victory = true
                        draw = false
                        break
                }
                break

            default:
                break
        }

        let newMessage

        if (draw){
            newMessage = `<@${interaction.user.id}> picked ${client_answer}\n<@${client.user.id}> picked ${bot_answer}\nStalemate... It's a draw`
            console.log('draw')
        }
        else if (player_victory){
            newMessage = `<@${interaction.user.id}> picked ${client_answer}\n<@${client.user.id}> picked ${bot_answer}\n<@${interaction.user.id}> WON!!!`
            console.log('victory')
        }
        else{
            newMessage = `<@${interaction.user.id}> picked ${client_answer}\n<@${client.user.id}> picked ${bot_answer}\n<@${interaction.user.id}> Lost`
            console.log('loss')
        }

        await interaction.editReply({
            content: newMessage
        })
    }

}