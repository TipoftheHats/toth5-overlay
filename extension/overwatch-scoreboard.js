/* eslint-disable object-property-newline */
'use strict';

module.exports = function (nodecg) {
	// Initialize replicants.
	nodecg.Replicant('scoreboardVisible', {defaultValue: false});
	nodecg.Replicant('blueTeamName', {defaultValue: 'Blue'});
	nodecg.Replicant('redTeamName', {defaultValue: 'Red'});
	nodecg.Replicant('blueTeamScore', {defaultValue: 0});
	nodecg.Replicant('redTeamScore', {defaultValue: 0});
	nodecg.Replicant('assets:teamlogos');
};
