const FiveManSquad = require('../features/FiveManSquad.js');

module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldState, newState) {
		if(newState.channel?.name==='—5-Man Squad—'){
            return FiveManSquad(oldState, newState);
        }
	},
};