//require
const Discord = require('discord.js-12');
const client = new Discord.Client();
const fs = require('fs');
//variant
const token = process.env.TOKEN;
var prefix='ah';
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
//program
client.commands = new Discord.Collection();
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
client.on('message', (msg)=>{
  const args = msg.content.slice(prefix.length).split(/ +/);
  const inputCommand = args.shift();
  if(msg.content.startsWith(prefix)||msg.author.bot) return;
  if(!client.commands.get(inputCommand)) return;
  else{
    client.commands.get(inputCommand).excecute(client, msg, args);
  }
})

client.once('ready', () =>{
    console.log(`Logged in as ${client.user.tag}`);
});
client.login(token);