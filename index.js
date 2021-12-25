//require
const { doesNotReject } = require('assert');
const Discord = require('discord.js-12');
const client = new Discord.Client();
require('dotenv').config();
const fs = require('fs');
//variant
const token = process.env.TOKEN;
var prefix=process.env.prefix;
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
//program
client.commands = new Discord.Collection();
commandFiles.forEach(file => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});
client.on('message', (msg)=>{
  const args = msg.content.slice(prefix.length).split(/ +/);
  const inputCommand = args.shift();
  if(!msg.content.startsWith(prefix)||msg.author.bot)return;
  if(!client.commands.get(inputCommand)) return msg.channel.send('Error!');
  client.commands.get(inputCommand).execute(client, msg, args);
});

client.on('message',  msg=>{
  if(msg.content.startsWith('sum')){
    let args = msg.content.split(' ');
    msg.channel.send(sum(args[1], args[2]));
  }
});

client.once('ready', () =>{
    console.log(`Logged in as ${client.user.tag}`);
});
client.login(token);
