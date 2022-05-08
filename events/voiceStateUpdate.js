const FiveManSquad = require('../features/FiveManSquad.js');

module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldState, newState) {
		if(newState.channel?.name){
            return FiveManSquad(oldState, newState);
        }
	},
};