// deploy-commands.js
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../config.json');
const fs = require('node:fs');
const path = require('node:path');

const rest = new REST({ version: '10' }).setToken(token);
const commandsDir = path.join(__dirname, '..', 'commands');

if (!fs.existsSync(commandsDir)) {
  console.error('[ERROR] commands directory not found at', commandsDir);
  process.exit(1);
}

(async () => {
  try {
    //Delete all existing guild commands
    console.log('[INFO] Fetching existing guild commands to delete...');
    const existing = await rest.get(Routes.applicationGuildCommands(clientId, guildId));
    if (Array.isArray(existing) && existing.length) {
      console.log(`[INFO] Deleting ${existing.length} existing guild command(s)...`);
      await Promise.all(existing.map(cmd =>
        rest.delete(Routes.applicationGuildCommand(clientId, guildId, cmd.id))
      ));
      console.log('[INFO] Existing guild commands deleted.');
    } else {
      console.log('[INFO] No existing guild commands to delete.');
    }

    //Collect command files
    const commands = [];
    const seenNames = new Map(); // name -> filePath

    const entries = fs.readdirSync(commandsDir);
    for (const entry of entries) {
      const entryPath = path.join(commandsDir, entry);
      const stat = fs.lstatSync(entryPath);

      if (stat.isDirectory()) {
        // read files inside subfolder
        const files = fs.readdirSync(entryPath).filter(f => f.endsWith('.js'));
        for (const file of files) {
          const filePath = path.join(entryPath, file);
          const command = require(filePath);
          if (!command || !command.data || !command.execute) {
            console.warn(`[WARN] skipping ${filePath} (missing data or execute)`);
            continue;
          }
          const name = command.data.name;
          if (seenNames.has(name)) {
            console.error(`[ERROR] duplicate command name "${name}" found in: ${seenNames.get(name)} and ${filePath}. Skipping duplicate.`);
            continue;
          }
          seenNames.set(name, filePath); //add to seen to prevent duplicates
          commands.push(command.data.toJSON());
        }
      } else if (stat.isFile() && entry.endsWith('.js')) {
        // file directly inside commands/
        const filePath = entryPath;
        const command = require(filePath);
        if (!command || !command.data || !command.execute) {
          console.warn(`[WARN] skipping ${filePath} (missing data or execute)`);
          continue;
        }
          const name = command.data.name;

          //skip dupes
        if (seenNames.has(name)) {
          console.error(`[ERROR] duplicate command name "${name}" found in: ${seenNames.get(name)} and ${filePath}. Skipping duplicate.`);
          continue;
        }
        seenNames.set(name, filePath);
        commands.push(command.data.toJSON());
      } else {
        // ignore non-js files
      }
    }

    //Deploy commands to the server
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error('[ERROR] deploy failed:', error);
  }
})();
