const { Client, Collection, Events, GatewayIntentBits, MessageFlags, SlashCommandBuilder } = require('discord.js');
const { token } = require('../config.json');
const { spawn } = require('node:child_process');
const path = require('node:path');
const michaelMonday  = require('./utility/michael-monday.js');
 
//command
module.exports = {
        data: new SlashCommandBuilder().setName('post-michael').setDescription('Posts michael immediately.'),
        async execute(interaction)
        {
                await interaction.deferReply({ephemeral: true});
                await michaelMonday();
                console.log("Posted Michael!");
                await interaction.editReply('Posted'); 
        }

}
