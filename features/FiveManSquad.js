module.exports = async function(oldState, newState){
    const hostMember = newState.member;
    const channelSend = await newState.guild.channels.cache.get('927207463898472478');
    
    if(oldState.channel !== null){
        const oldMessage = await channelSend.messages.cache.find(message => message.content.split(/\s+/g)[1]+' '+message.content.split(/\s+/g)[2]===oldState.channel.name);
        if(/(TEAM #\w+)/.test(oldState.channel.name)&&oldState.channel.members.size===0){
        let channels = await oldState.guild.channels.fetch();
        let oldChannel = await channels.find(channel => channel.id ===oldState.channel?.id);
        await oldMessage?.edit({
            content: `${oldMessage.content} giải tán`,
            embeds:[]
        });
        return oldChannel?.delete();
        }else if(/(TEAM #\w+)/.test(oldState.channel.name)&&oldState.channel.members.size!==0){
        let index = oldState.channel.members.size;
        let oldMembers = [...oldState.channel.members.values()];
        let invite = await oldState.channel.createInvite({
            maxUses: 5-index,
            reason: 'Bấm để tham gia'
        });
        const embedS = new MessageEmbed()
        .addFields(oldMembers.map(member => {
            return {
            name: member.displayName,
            value:'\u200B',
            inline: true
            }
        }))
        .setTimestamp()
        .setTitle(`Bấm để tham gia (${index}/5)`)
        .setURL(`${invite}`)
        return oldMessage.edit({
            embeds:[embedS]
        });
        }
    }
    if(!newState.channel) return;
    
    let members = [...newState.channel.members.values()];
    
    if(/(TEAM #\w+)/.test(newState.channel.name)&&newState.channel.members.size>1){
        let newMessage = await channelSend.messages.cache.find(message => message.content.split(/\s+/g)[1]+' '+message.content.split(/\s+/g)[2]===newState.channel.name);
        let index = newState.channel.members.size;
        let invite = await newState.channel.createInvite({
        maxUses: 5-index,
        reason: 'Bấm để tham gia'
        });
        const embedS = new MessageEmbed()
        .setTimestamp()
        .addFields(members.map(member => {
        return {
            name: member.displayName,
            value:'\u200B',
            inline: true
        }
        }))
        .setTitle(`Bấm để tham gia (${index}/5)`)
        .setURL(`${invite}`)
        return newMessage.edit({
        embeds:[embedS]
        });
    }
    if(newState.channel.name !== '5-Man Squad') return;
    const parentChannel = await newState.guild.channels.cache.get('789138759631241256');
    const values = await parentChannel.children.values();
    const valueArr = [...values];
    var childrenChannel = valueArr;
    childrenChannel = childrenChannel.map(value => value.name).filter(name => /(TEAM #\w+)/.test(name));
    const lastChannel = childrenChannel[childrenChannel.length-1];
    const position = lastChannel?lastChannel.position+1:valueArr.length;
    const newChannel = await parentChannel.createChannel(`TEAM #${hostMember.displayName}`, {
        position: position,
        userLimit: 5,
        type: "GUILD_VOICE"
    });
    newState.setChannel(newChannel);
    
    const invite = await newChannel.createInvite({
        maxUses: 4,
        reason: 'Bấm để tham gia'
    });
    
    var index = newChannel.members.size;
    
    const embed = new MessageEmbed()
    .setTimestamp()
    .addFields(members.map(member => {
        return {
        name: member.displayName,
        value:'\u200B',
        inline: true
        }
    }))
    .setTitle(`Bấm để tham gia (${index}/5)`)
    .setURL(`${invite}`)
    
    return channelSend.send({
        content: `${hostMember.user} ${newChannel.name}`,
        embeds: [embed]
    });
}