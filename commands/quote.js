const https = require('https');
const url = 'https://quotes.rest/quote/random?language=en&limit=1';
  
const getQuote = url =>{
  return new Promise((resolve, reject)=>{
     https.get(url, (response)=>{
         response.on('data', (data)=>{
             const jsonData =JSON.parse(data);
             if(jsonData.contents){
              resolve(jsonData.contents.quotes[0].quote)
             }else{
              reject(jsonData.error.message);
             }
         });
     });
  });
};
module.exports={
  name: 'quote',
  excecute: async function(client, message, args){
    let quote = await getQuote(url);
    message.channel.send(quote);
  }
}
    