# Cowboy Bot

## Table of Contents
1. [description](#description)

2. [to-do list](#to-do-list)

3. [install](#install)

4. [commands](#commands)

4. [config](#install)

5. [script usage](#script-usage)

6. [credits](#credits)

## Description
Posts daily questions. also michael monday.

## Install
1. clone the repo
2. install perquisites (found in set-up-tutorial) in project root directory
3. run `npm run set-up` and follow prompts
4. copy credentials.json to `cowboy-bot/commands/utility`
5. run `npm run deploy` to register slash commands
6. start bot with `npm run start`

## Commands
- `ping`: returns the time in milliseconds it took for the command to read and respond to your command.
- `post-question`: manually posts the question of the day, immediately. 
- `post-michael`: manually post Michael, immediately.

## Config
`config.json` is created by `npm run set-up` and contains the following:

- `token`: bot token
- `clientId`: application ID
- `guildId`: server ID
- `michael_hookURL`: url to a webhook on a channel you want the michael monday messages sent to
- `question_hookURL`: url to a webhook on a channel you want the question of the day messages sent to
- `spreadsheetId`: Question of the day spreadsheet ID

if you need to change any of these values, either run set-up again or edit the .json file manually.


## Scripts
`npm run start`
- starts the bot

`npm run set-up`
- set up the config.json

`npm run deploy` 
- deletes existing commands, if any
- adds commands in `/commands`
- note: current it also searches the `/commands/utility` folder and will return errors that those scripts are missing command parameters. ignore that.

## Credits

Written by peter, based on [michael-monday-bot](https://github.com/breadcrustbandit/michael-monday-bot) (including ripping this readme), with minor assistance from copilot (mostly reading error codes)

uses the discordjs framework and snippets of code from discordjs's guide on making a discord bot. discordjs's guide is under an MIT license

google sheets quickstart from here: https://developers.google.com/sheets/api/quickstart/nodejs

the google sheets quickstart code is distributed under the apache license: https://www.apache.org/licenses/LICENSE-2.0
