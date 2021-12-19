//jshint esversion: 8
var Scraper = require('images-scraper');
puppeteer.launch({ args: ['--no-sandbox'] });
//google
const google = new Scraper({
  puppeteer:{
    headless: true,
    args: ['--no-sandbox']
  },
});
module.exports={
  name: 'image',
  execute: async function(client, message, args){
    let num = /[0-9]/g.test(args[0])?args.shift():1;
    let imageQuery = args.join(' ');
    if(!imageQuery) return message.channel.send('Please enter an image name!');
    const imageResult = await google.scrape(imageQuery, num);
    imageResult.forEach(item => message.channel.send(item.url));
  }
};
