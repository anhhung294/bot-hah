const Scraper = require('images-scraper');
const google = new Scraper({
  puppeteer:{
    headless: true
  }
})
module.exports={
  name: 'image',
  excecute: async function(client, message, args){
    //let num = typeof(args[args.length-1])==='number'?args.pop():1;
    let imageQuery = args.join(' ');
    if(!imageQuery) return message.channel.send('Please enter an image name!');
    const imageResult = await google.scrape(imageQuery, 1);
    //imageResult.forEach(item => message.channel.send(item));
    message.channel.send(imageResult[0].url);
  }
}