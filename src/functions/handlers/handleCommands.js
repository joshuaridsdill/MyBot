const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const fs = require('fs')

module.exports = (client => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands')
        const { commands, commandArray } = client
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter(file => file.endsWith('.js'))

            //const { commands, commandArray } = client
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`)
                if ('data' in command && 'execute' in command) {
                    commands.set(command.data.name, command)
                    commandArray.push(command.data.toJSON())
                    console.log(`Command: ${command.data.name} has been handled`)
                }
                else {
                    console.log(`[ERROR] The file ${file} is missing the required "data" or "execute" property`)
                }
            }
        }

        const clientId = '1052565771672371241'
        const guildId = '762772538970472498'
        const rest = new REST({ version: '9' }).setToken(process.env.token)
        try {
            console.log('Started refreshing application (/) commands.')

            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commandArray }
            )

            console.log('Successfully reloaded application (/) commands.')
        }
        catch (error) {
            console.error(error)
        }
    }
})