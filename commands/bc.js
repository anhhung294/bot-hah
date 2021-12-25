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
        if(!usersMoney.get(userID)) usersMoney.set(userID, 0);
        if(args[0]==='start'){
            status=  true;
            message.channel.send('Tro choi bat dau');
            return;
        }else if(args[0]==='end'){
            status=false;
            let linhVat1 = linhVat[Math.floor(Math.random()*5)];
            let linhVat2 = linhVat[Math.floor(Math.random()*5)];
            let linhVat3 = linhVat[Math.floor(Math.random()*5)];
            let result=[linhVat1, linhVat2, linhVat3];
            message.channel.send('Ket qua la '+ result);
            moneyBox.forEach(function(value, key, map){
                let playerID = key;
                let betBox = value.split(' ');
                let sum = 0;
                let valet =0;
                for(let i=0; i< betBox.length-1; i+=2){
                    sum += Number(betBox[i+1]);
                    if(result.includes(betBox[i])){
                        valet+=Number(betBox[i+1]);
                    }else{
                        valet-=Number(betBox[i+1]);
                    }
                }
                if(sum>usersMoney.get(playerID)){
                    message.channel.send(`Nguoi choi ${client.users.cache.get(playerID)} cuoc qua so du`);
                }else{
                    let money = Number(usersMoney.get(playerID)) + valet;
                    usersMoney.set(playerID, money);
                    console.log(valet);
                    console.log(usersMoney.get(playerID));
                    message.channel.send(`So du cua ${client.users.cache.get(playerID)} thay doi: ${valet} \n Tong so du hien tai: ${usersMoney.get(playerID)}`);
                }
            });
            moneyBox = new Map();
            return;
        }else if(args[0]==='check'){ 
            if(!usersMoney.get(userID)) usersMoney.set(userID, 0);
            return message.channel.send(`${client.users.cache.get(userID)} co: `+ usersMoney.get(userID));
        }else if(args[0] ==='get'){
            if(!Number(usersMoney.get(userID))>0){
                usersMoney.set(userID, 2004);
                message.channel.send('Ban duoc cong 2004');
            }else{
                message.channel.send("Ban van con tien ma :))");
            }
            return;
        }
        else if(status ===false){
            message.channel.send('Vui long bat dau tro choi!');
            return;
        }
        if(!/[0-9]/g.test(args[0])&&status===true) return message.channel.send('Invalid command');
        let bet = `${args[1]} ${args[0]}`;
        if(!moneyBox.get(userID)){
            moneyBox.set(userID, bet);
        }else{
            let newBet = moneyBox.get(userID) + " " + bet;
            moneyBox.set(userID, newBet);
        }
    }
};