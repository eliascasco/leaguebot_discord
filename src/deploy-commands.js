const { SlashCommandBuilder, REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder()
    .setName('summoner')
    .setDescription('Looks up summoner stats!')
    .addStringOption(option => option.setName('name')
    .setDescription('Enter an account on EUW.'))
]
    .map(command => command.toJSON());

const rest = new REST ({ version : '10'}).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body : commands})
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);