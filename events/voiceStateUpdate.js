const FiveManSquad = require('../features/FiveManSquad.js');

module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldState, newState) {
		if(newState.channel?.id==='971988068984848454'){
            return FiveManSquad(oldState, newState);
        }
	},
};