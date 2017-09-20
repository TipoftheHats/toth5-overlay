'use strict';

// Ours
const nodecgApiContext = require('./util/nodecg-api-context');

module.exports = function (nodecg) {
	// Store a reference to this nodecg API context in a place where other libs can easily access it.
	// This must be done before any other files are `require`d.
	nodecgApiContext.set(nodecg);

	// Initialize replicants.
	nodecg.Replicant('scores');
	nodecg.Replicant('showHashtag');

	require('./lowerthird')(nodecg);
	require('./total')(nodecg);
	require('./donations')(nodecg);
	require('./bids')(nodecg);
	require('./completed-challenges')(nodecg);
	require('./nowplaying')(nodecg);
	require('./dotafortress')(nodecg);
	require('./twitter')(nodecg);
	require('./x32')(nodecg);
	require('./countdown')(nodecg);
	require('./nameplates')(nodecg);
	require('./overwatch-scoreboard')(nodecg);

	if (nodecg.bundleConfig.twitch) {
		require('./twitch');

		// If the appropriate config params are present,
		// automatically update the Twitch game and title when currentRun changes.
		if (nodecg.bundleConfig.twitch.titleTemplate) {
			nodecg.log.info('Automatic Twitch stream title updating enabled.');
			require('./twitch-title-updater');
		}
	}
};
