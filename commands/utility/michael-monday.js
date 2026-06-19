const { WebhookClient, EmbedBuilder } = require('discord.js');
const { michael_hookURL } = require ('../../config.json')

// Initialize the webhook client using your unique Webhook URL
const webhookClient = new WebhookClient({
    url: JSON.stringify(michael_hookURL)
});

async function michaelMonday() {


    webhookClient.send({
        content: "It's Michael Monday!",
        username: 'Michael Reborn',
        files: [
            {
                attachment: "../cowboy-bot/commands/media/meandmichael.mp4",
            }
        ]
    })
        .then(() => console.log('Message sent successfully!'))
        .catch(console.error);
}

module.exports = michaelMonday;
