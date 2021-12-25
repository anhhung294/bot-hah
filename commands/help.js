//jshint esversion: 8
const fsPromises = require('fs').promises;

module.exports={
    name : 'help',
    execute: async function(client, message, args) {
        try {
            let helpMess = await fsPromises.readFile('./data/helpMess.txt',{
                encoding: 'utf8'
            });
            message.channel.send(helpMess);
        } catch (err) {
            console.log(err);
        }
    }
};