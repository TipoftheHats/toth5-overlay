'use strict';

// Packages
const NanoTimer = require('nanotimer');

// Ours
const TimeObject = require('./classes/time-object');

const timerCountdown = new NanoTimer();

module.exports = function (nodecg) {
	const countdownRep = nodecg.Replicant('countdown', {
		defaultValue: {
			time: new TimeObject(600),
			running: false
		},
		persistent: true
	});

	/* When the replicant is persisted to disk, it's class doesn't survive stringification.
	 * We must replace the persisted values (if any) with new class instances based on those values.
	 */

	// If the countdown was running when NodeCG last stopped, figure out how much time passed.
	if (countdownRep.value.running && countdownRep.value.time.raw && countdownRep.value.time.timestamp) {
		const lostSeconds = Math.floor((Date.now() - countdownRep.value.time.timestamp) / 1000);
		countdownRep.value.time = new TimeObject(countdownRep.value.time.raw + lostSeconds);
		timerCountdown.setInterval(tick, '', '1s');
	} else {
		countdownRep.value.running = false;
	}

	nodecg.listenFor('startCountdown', start);
	nodecg.listenFor('stopCountdown', stop);

	function start(startTime) {
		if (countdownRep.value.running) {
			return;
		}

		const timeObj = new TimeObject(TimeObject.parseSeconds(startTime));
		if (timeObj.raw <= 0) {
			return;
		}

		countdownRep.value.running = true;
		countdownRep.value.time = timeObj;
		timerCountdown.setInterval(tick, '', '1s');
	}

	function stop() {
		if (!countdownRep.value.running) {
			return;
		}

		countdownRep.value.running = false;
		timerCountdown.clearInterval();
	}

	function tick() {
		TimeObject.decrement(countdownRep.value.time);

		if (countdownRep.value.time.raw <= 0) {
			stop();
		}
	}
};
