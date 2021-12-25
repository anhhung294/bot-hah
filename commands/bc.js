require('dotenv').config();
const prefix = process.env.prefix;
const linhVat = ['bau','cua','ca','ga','tom','nai'];
var status = false;
var usersMoney = new Map();
var moneyBox = new Map();
module.exports={
    name : 'bc',
    execute: function(client, message, args){
        let userID = message.author.id;
        if(args[0]==='start'){
            status=  true;
            message.channel.send('Tro choi bat dau');
            return;
        }else if(args[0]==='end'){
            status=false;
            let playersBag = new Map();
            let linhVat1 = linhVat[Math.floor(Math.random()*5)];
            let linhVat2 = linhVat[Math.floor(Math.random()*5)];
            let linhVat3 = linhVat[Math.floor(Math.random()*5)];
            let result=[linhVat1, linhVat2, linhVat3];
            message.channel.send('Ket qua la '+ result.toString());
            moneyBox.forEach(function(value, key, map){
                let playerID = key;
                let betBox = value.split(' ');
                let sum = 0;
                playersBag.set(playerID, 0);
                for(let i=0; i< betBox.length-1; i+=2){
                    sum += Number(betBox[i+1]);
                    if(result.includes(betBox[i])){
                        let newMoney = Number(playersBag.get(playerID)) + Number(betBox[i+1]);
                        playersBag.set(playerID, newMoney);
                    }else{
                        let newMoney = Number(playersBag.get(playerID)) - Number(betBox[i+1]);
                        playersBag.set(playerID, newMoney);
                    }
                }
                if(sum>usersMoney.get(playerID)){
                    message.channel.send(`Nguoi choi ${client.users.cache.get(playerID)} cuoc qua so du`);
                }else{
                    let money = Number(usersMoney.get(playerID)) + Number(playersBag.get(playerID));
                    usersMoney.set(playerID, money);
                    message.channel.send(`Nguoi choi ${client.users.cache.get(playerID)} nhan them: ${playersBag.get(playerID)} \n Tong so du: ${usersMoney.get(playerID)}`);
                }
            });
            moneyBox = new Map();
            return;
        }else if(args[0]==='check'){ 
            if(!usersMoney.get(userID)) usersMoney.set(userID, 0);
            return message.channel.send(`${client.users.cache.get(userID)} co: `+ usersMoney.get(userID));
        }else if(status ===false){
            message.channel.send('Vui long bat dau tro choi!');
            return;
        }else if(args[0] ==='get'){
            if(Number(usersMoney.get(userID))===0){
                let money = Number(usersMoney.get(playerID)) + 2004;
                usersMoney.set(playerID, money);
            }else{
                message.channel.send("Ban van con tien ma :))");
            }
        }
        if(!/[0-9]/g.test(args[0])) return message.channel.send('Invalid command');
        if(!usersMoney.get(userID)) usersMoney.set(userID, 0);
        let bet = `${args[1]} ${args[0]}`;
        if(!moneyBox.get(userID)){
            moneyBox.set(userID, bet);
        }else{
            let newBet = moneyBox.get(userID) + " " + bet;
            moneyBox.set(userID, newBet);
        }
    }
};