
echo "----------------------------------------------------------------------------------------------"
echo "config.json set up"
echo "----------------------------------------------------------------------------------------------"
echo "Note: To paste into a terminal, you can often use the shortcut Ctrl+Shift+V."
echo ""
read -p "Please enter the bot token: " botToken
read -p "Please enter the app ID: " clientID
read -p "Please enter the server ID: " serverID
read -p "Please enter the Michael Monday channel's webhook url: " mmHook
read -p "Please enter the Question of the Day channel's webhook url: " qHook
read -p "Please enter the spreadsheet ID: " sheetID

echo "Printing to file..."

rm -f config.json #if config.json already exists, delete it

printf "{\n" >> config.json
printf "\t\"token\": \"$botToken\",\n" >> config.json
printf "\t\"clientId\": \"$clientID\",\n" >> config.json
printf "\t\"guildId\": \"$serverID\",\n" >> config.json
printf "\t\"michael_hookURL\": \"$mmHook\",\n" >> config.json
printf "\t\"question_hookURL\": \"$qHook\",\n" >> config.json
printf "\t\"spreadsheetId\": \"$sheetID\", \n" >> config.json
printf "}\n" >> config.json

echo "config.json updated."
echo "set up finished."
