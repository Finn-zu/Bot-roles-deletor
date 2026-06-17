const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const BOT_TOKEN = 'PASTE_YOUR_BOT_TOKEN_HERE';
const SERVER_ID = '1509127033995919530';

client.once('ready', async () => {
  console.log('Bot ready! Starting role deletion...');
  const guild = await client.guilds.fetch(SERVER_ID);
  await guild.roles.fetch();

  const roles = guild.roles.cache.filter(role =>
    role.name !== '@everyone' && role.editable
  );

  console.log(`Found ${roles.size} roles to delete.`);
  for (const [id, role] of roles) {
    try {
      await role.delete();
      console.log(`Deleted: ${role.name}`);
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.log(`Skipped: ${role.name} — ${err.message}`);
    }
  }

  console.log('Done!');
  client.destroy();
});

client.login(BOT_TOKEN);
    
