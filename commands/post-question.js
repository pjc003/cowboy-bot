const { Client, Collection, Events, GatewayIntentBits, MessageFlags, SlashCommandBuilder } = require('discord.js');
const { token } = require('../config.json');
const { spawn } = require('node:child_process');
const path = require('node:path');
const sendMessage = require('./utility/send-question.js');
 
//command
module.exports = {
        data: new SlashCommandBuilder().setName('post-question').setDescription('Posts a new question immediately.'),
        async execute(interaction)
        {
		await interaction.deferReply({ephemeral: true});
		await sendMessage();
		console.log("Posted question!");
		await interaction.editReply('Posted'); 
	}

}
