// JavaScript source code

// commands handler
const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Collection, Routes } = require('discord.js')
const { token, clientId } = require('../../config.json')
const fs = require('node:fs');
const path = require('node:path');

;

function registerCommands(client) {
  const commands = [];
  const commandsPath = path.join(__dirname,'..'); 
  //console.log('[DEBUG] commandsPath =', commandsPath);

  let commandFiles;
  try {
    commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  } catch (err) {
    console.error('[ERROR] Could not read commands directory:', err.message);
    return; // or throw depending on how you want to handle it
  }

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (command && command.data && command.execute) {
      commands.push(command.data.toJSON());
      // If client is provided, register into collection
      if (client) {
        client.commands = client.commands || new Collection();
        client.commands.set(command.data.name, command);
      }
    } else {
      console.log(`[WARNING] the command at ${filePath} is missing "data" or "execute"`);
    }
  }
	const rest = new REST({ version: '10' }).setToken(token);


	// and deploy your commands!
	(async () => {
		try {
			console.log(`Started refreshing ${commands.length} application (/) commands.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
	
			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		} catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
  });
}

module.exports = registerCommands;
