// Packages
const TwitchPubSub = require('twitchps');

// Ours
const nodecg = require('./util/nodecg-api-context').get();

const DEBUG = nodecg.bundleConfig.twitch.debug;
const log = new nodecg.Logger(`${nodecg.bundleName}:twitch`);
const pubsub = new TwitchPubSub({
	init_topics: [{ // eslint-disable-line camelcase
		topic: `channel-bits-events-v1.${nodecg.bundleConfig.twitch.channelId}`,
		token: nodecg.bundleConfig.twitch.oauthToken
	}, {
		topic: `channel-subscribe-events-v1.${nodecg.bundleConfig.twitch.channelId}`,
		token: nodecg.bundleConfig.twitch.oauthToken
	}],
	reconnect: true,
	debug: DEBUG
});

pubsub.on('connected', () => {
	log.info('Connected to PubSub, ready to receive cheers and subscriptions.');
});

pubsub.on('disconnected', () => {
	log.warn('Disconnected from PubSub.');
});

pubsub.on('reconnect', () => {
	log.info('Reconnecting to PubSub...');
});

pubsub.on('bits', cheer => {
	log[DEBUG ? 'info' : 'debug']('Received cheer:', cheer);
	nodecg.sendMessage('cheer', cheer);
});

pubsub.on('subscribe', subscription => {
	log[DEBUG ? 'info' : 'debug']('Received subscription:', subscription);
	nodecg.sendMessage('subscription', subscription);
});
