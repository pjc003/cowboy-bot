const { SlashCommandBuilder } = require('discord.js');

//commands composed of two members:
//data, which provides the command definition for registering to discord
//execute, which contains the functionality to run from the event handler
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with pong'),
    async execute(interaction)
    {
        let message = await interaction.deferReply({ fetchReply: true });
        await interaction.editReply(`PONG! latency is ${message.createdTimestamp - interaction.createdTimestamp}ms`);
    }
}