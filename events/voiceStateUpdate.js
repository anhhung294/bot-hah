const FiveManSquad = require('../features/FiveManSquad.js');

module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldState, newState) {
        return FiveManSquad.execute(oldState, newState);
	},
};