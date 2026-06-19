const { WebhookClient, EmbedBuilder } = require('discord.js');
const { getMessageCell } = require('./getData.js');
const { question_hookURL } = require('../../config.json');
// Initialize the webhook client using your unique Webhook URL
const webhookClient = new WebhookClient({ 
	url: JSON.stringify(question_hookURL)
});

async function sendMessage(){

	// Send a basic text message
	const message = await getMessageCell();

	webhookClient.send({
	    content: message,
	    username: 'Question of the Day',
	})
	.then(() => console.log('Message sent successfully!'))
	.catch(console.error);
}


module.exports = sendMessage;
