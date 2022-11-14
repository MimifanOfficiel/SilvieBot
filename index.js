const {Discord, Client,  GatewayIntentBits, Collection} = require('discord.js');
const config = require('./config.json');
const loadCommand = require('./loader/loadCommands');
const loadEvents = require('./loader/loadEvents');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection;
client.login(config.token);

loadCommand(client);
console.log("\n");
loadEvents(client);
console.log("\n");