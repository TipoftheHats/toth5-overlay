/* eslint-disable object-property-newline */
'use strict';

const _PLAYERS = [
	// Scouts
	{name: 'ggglygy', playerClass: 'scout', index: 0, state: 'available'},
	{name: 'shrugger', playerClass: 'scout', index: 1, state: 'available'},
	{name: 'evilmrmuffinz', playerClass: 'scout', index: 2, state: 'available'},
	{name: 'auzzie', playerClass: 'scout', index: 3, state: 'available'},
	{name: 'clockwork', playerClass: 'scout', index: 4, state: 'available'},
	{name: 'enigma', playerClass: 'scout', index: 5, state: 'available'},
	{name: 'alfa', playerClass: 'scout', index: 6, state: 'available'},
	{name: 'TviQ', playerClass: 'scout', index: 7, state: 'available'},
	{name: 'elmo', playerClass: 'scout', index: 8, state: 'available'},

	// Soldiers
	{name: 'tagg', playerClass: 'soldier', index: 0, state: 'available'},
	{name: 'ma3la', playerClass: 'soldier', index: 1, state: 'available'},
	{name: 'paddie', playerClass: 'soldier', index: 2, state: 'available'},
	{name: 'Silentes', playerClass: 'soldier', index: 3, state: 'available'},
	{name: 'deathy', playerClass: 'soldier', index: 4, state: 'available'},
	{name: 'sideshow', playerClass: 'soldier', index: 5, state: 'available'},
	{name: 'duwatna', playerClass: 'soldier', index: 6, state: 'available'},
	{name: 'tri', playerClass: 'soldier', index: 7, state: 'available'},
	{name: 'Thaigrr', playerClass: 'soldier', index: 8, state: 'available'},

	// Pyros
	{name: 'TMP', playerClass: 'pyro', index: 0, state: 'available'},
	{name: 'Huey Lewis', playerClass: 'pyro', index: 1, state: 'available'},

	// Demomen
	{name: 'Rikachu', playerClass: 'demoman', index: 0, state: 'available'},
	{name: 'Jarrett', playerClass: 'demoman', index: 1, state: 'available'},
	{name: 'Kaidus', playerClass: 'demoman', index: 2, state: 'available'},
	{name: 'Dummy', playerClass: 'demoman', index: 3, state: 'available'},
	{name: 'smaka', playerClass: 'demoman', index: 4, state: 'available'},
	{name: 'alle', playerClass: 'demoman', index: 5, state: 'available'},

	// Heavy
	{name: 'Kresnik', playerClass: 'heavy', index: 0, state: 'available'},
	{name: 'Getawhale', playerClass: 'heavy', index: 1, state: 'available'},

	// Engineer
	{name: 'Sigafoo', playerClass: 'engineer', index: 0, state: 'available'},
	{name: 'Uncle Dane', playerClass: 'engineer', index: 1, state: 'available'},

	// Medic
	{name: 'TheFragile', playerClass: 'medic', index: 0, state: 'available'},
	{name: 'nursey', playerClass: 'medic', index: 1, state: 'available'},
	{name: 'Mangachu', playerClass: 'medic', index: 2, state: 'available'},
	{name: 'Skye', playerClass: 'medic', index: 3, state: 'available'},
	{name: 'Admirable', playerClass: 'medic', index: 4, state: 'available'},
	{name: 'CX', playerClass: 'medic', index: 5, state: 'available'},

	// Sniper
	{name: 'boar', playerClass: 'sniper', index: 0, state: 'available'},
	{name: 'BLoodSire', playerClass: 'sniper', index: 1, state: 'available'},

	// Spy
	{name: 'stabby', playerClass: 'spy', index: 0, state: 'available'},
	{name: 'buttnose', playerClass: 'spy', index: 1, state: 'available'}
];

module.exports = function (nodecg) {
	nodecg.Replicant('df_players', {defaultValue: _PLAYERS, persistent: false});
	nodecg.Replicant('df_teams', {
		defaultValue: {
			red: [],
			blu: []
		},
		persistent: false
	});

	// To change the draft order, edit the `default` property in `schemas/draft.json`.
	// Because we set `persistent: false`, the default value from the schema will be applied on every start.
	nodecg.Replicant('draft', {persistent: false});

	// These two get everything they need from their schemas.
	nodecg.Replicant('draftState');
	nodecg.Replicant('dotaCaptains');
	nodecg.Replicant('draftType', {defaultValue: 'default', persistent: false	});
};
