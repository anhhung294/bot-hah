//jshint esversion: 8
const https = require('https');
const url = 'https://api.quotable.io/random';
//get quote
const getQuote = url =>{
  return new Promise((resolve, reject)=>{
     https.get(url, (response)=>{
         response.on('data', (data)=>{
           const jsonData = JSON.parse(data);
           resolve([jsonData.content, jsonData.author]);
         });
     });
  });
};
module.exports={
  name: 'quote',
  execute: async function(client, message, args){
    try{
      let quote = await getQuote(url);
      message.channel.send(`${quote[0]} \n --${quote[1]}--`);
    }catch(error){
      console.log(error);
    }
  }
};
    
