const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const { token } = require('./config.json'); //has tokens
const  registerCommands = require('./commands/utility/command-handler.js'); //checks commands
const cron = require ('node-cron'); // for timer
const sendMessage = require('./commands/utility/send-question.js');
const michaelMonday = require('./commands/utility/michael-monday.js');

//discord setup
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// give bot token
client.login(token);


// when client is ready
client.once(Events.ClientReady, (readyClient) => {
	console.log('Ready. Logged in as ${readyClient.user.username}');

	registerCommands(client);

	//copilot time until
	const now = new Date();

 	 // build target for today at 08:30
  	const target = new Date(now);
  	target.setHours(13, 30, 0, 0);

  	// if target already passed, use tomorrow
  	if (now >= target) {
    	target.setDate(target.getDate() + 1);
  	}

  	const diffMs = target - now; // milliseconds until target

  	const totalSeconds = Math.floor(diffMs / 1000);
  	const hours = Math.floor(totalSeconds / 3600);
  	const minutes = Math.floor((totalSeconds % 3600) / 60);
  	const seconds = totalSeconds % 60;

  	console.log(`Time until 8:30 AM: ${hours}h ${minutes}m ${seconds}s`);


	//start question timer
	const task = new cron.schedule('0 30 13 * * *', async () => {

		//at 8:30am, send question
		await sendMessage();

		//check if it's monday
		const d = new Date();
		let day = d.getDay();
		if (day == 1){
			console.log("it's monday!");
			michaelMonday(); //excute michael monday script
		} else {
			console.log("not monday :(");
		}}, //function
		true,); //start job
	//check it's running
	console.log("Question timer is:" + task.getStatus());
	console.log("Next run is " + task.getNextRun());

});


client.on(Events.InteractionCreate, async interaction => {
    // Ignore interactions that are not slash commands
    if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		} else {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		}
	}
});
