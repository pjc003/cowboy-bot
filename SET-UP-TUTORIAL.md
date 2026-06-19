# Install
## Hosting

You need a VPS to host this bot on and/or a way to generate credentials for the google sheets API.

I wrote this bot using a VPS hosted on google cloud, which offers a free tier debian micro computer. It also allows us to make credentials to use with the google sheets API via the google cloud organization. It’s plenty for this bot and also allows for uploading and downloading files.

If you don’t use google cloud, the credentials method should still work but it is untested.

## Prerequisites

Once you have your VPS set up, download and unzip the project. Switch to the project directory and install the following:
- Node.js (for base functionality)
- discord.js (for discord API)
- Google sheets API (to talk to the spreadsheet)
- Express (see above)
- Ejs (see above)
- Cron (for timer based functions)

Next, we need those credentials mentioned earlier. [This tutorial](https://youtu.be/PFJNJQCU_lo?si=WoxiLTKM_vvgAZTc
) will walk you through how to create the credentials.json file we need, as well as installing the dependencies. (Follow along until about 6:50, the rest is irrelevant for our purposes)

```
Key troubleshooting:
If it won’t let you make keys, switch to the organization level, go to the IAM page and add the “Organization Policy Administrator” role to yourself. Then under the organization policies page, disable the following policies:

	iam.managed.disableServiceAccountKeyCreation
	iam.disableServiceAccountKeyCreation

After you’ve done that, try to make the keys again. This is probably very insecure, so be very careful about making sure your credentials.json file isn’t shared.

```
## Server Set Up

This bot utilizes webhooks to send messages to the server. [Here's a link](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) to the official discord documentation on how to do this. 

This bot is set up so that you can have the question of the day and michael monday sent to different channels via the webhook url. This is optional. If you want them sent to the same webhook, just enter that url twice during `npm run set-up`.

## Spreadsheet Set Up

Assuming you followed the tutorial earlier. This is for the formatting of the sheet.

- Questions should be in column A. Cell A1 should be labled "questions"
- Cell B1 should be labled "status". When the bot posts questions, it will update the status to "posted" so it knows to skip to the next question.
- if you want a question to be postable, make sure the "status" is blank.
