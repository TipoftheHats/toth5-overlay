(function () {
	'use strict';

	const talkbackIntent = nodecg.Replicant('talkback_intent');
	const talkbackStatus = nodecg.Replicant('talkback_status');

	/**
	 * @customElement
	 * @polymer
	 * @appliesMixin Polymer.GestureEventListeners
	 */
	class TothTalkback extends Polymer.GestureEventListeners(Polymer.Element) {
		static get is() {
			return 'toth-talkback';
		}

		static get properties() {
			return {
				station: {
					type: String,
					reflectToAttribute: true
				},
				stationLabel: {
					type: String
				},
				targets: {
					type: Array,
					/* eslint-disable object-property-newline */
					value() {
						return [
							{name: 'couch', displayName: 'Couch & Host', intent: false, status: false, latch: false},
							{name: 'host', intent: false, status: false, latch: false},
							{name: 'players', intent: false, status: false, latch: false},
							{name: 'all', intent: false, status: false, latch: false},
							{name: 'player1', intent: false, status: false, latch: false},
							{name: 'player2', intent: false, status: false, latch: false},
							{name: 'player3', intent: false, status: false, latch: false},
							{name: 'player4', intent: false, status: false, latch: false}
						];
					}
					/* eslint-enable object-property-newline */
				},
				allLatchesToggled: {
					type: Boolean,
					value: false,
					readOnly: true,
					reflectToAttribute: true
				}
			};
		}

		ready() {
			super.ready();

			talkbackIntent.on('change', newVal => {
				this.set('targets.0.intent', newVal[this.station].couch);
				this.set('targets.1.intent', newVal[this.station].host);
				this.set('targets.2.intent', newVal[this.station].player1 &&
					newVal[this.station].player2 && newVal[this.station].player3 && newVal[this.station].player4);
				this.set('targets.3.intent', this.targets[0].intent && this.targets[1].intent && this.targets[2].intent);
				this.set('targets.4.intent', newVal[this.station].player1);
				this.set('targets.5.intent', newVal[this.station].player2);
				this.set('targets.6.intent', newVal[this.station].player3);
				this.set('targets.7.intent', newVal[this.station].player4);
			});

			talkbackStatus.on('change', newVal => {
				this.set('targets.0.status', newVal[this.station].couch);
				this.set('targets.1.status', newVal[this.station].host);
				this.set('targets.2.status', newVal[this.station].player1 &&
					newVal[this.station].player2 && newVal[this.station].player3 && newVal[this.station].player4);
				this.set('targets.3.status', this.targets[0].status && this.targets[2].status);
				this.set('targets.4.status', newVal[this.station].player1);
				this.set('targets.5.status', newVal[this.station].player2);
				this.set('targets.6.status', newVal[this.station].player3);
				this.set('targets.7.status', newVal[this.station].player4);
			});
		}

		checkLatches() {
			if (!this.station) {
				return;
			}

			this.targets.forEach(target => {
				if (!target.latch) {
					if (target.name === 'all') {
						for (const mixbus in talkbackIntent.value[this.station]) {
							if (!{}.hasOwnProperty.call(talkbackIntent.value[this.station], mixbus)) {
								continue;
							}

							talkbackIntent.value[this.station][mixbus] = false;
						}
					} else if (target.name === 'players') {
						talkbackIntent.value[this.station].player1 = false;
						talkbackIntent.value[this.station].player2 = false;
						talkbackIntent.value[this.station].player3 = false;
						talkbackIntent.value[this.station].player4 = false;
					} else {
						talkbackIntent.value[this.station][target.name] = false;
					}
				}
			});
		}

		talkback(e) {
			const target = this.getTarget(e.target.getAttribute('data-target'));
			if (target.latch) {
				return;
			}

			if (target.name === 'all') {
				for (const mixbus in talkbackIntent.value[this.station]) {
					if (!{}.hasOwnProperty.call(talkbackIntent.value[this.station], mixbus)) {
						continue;
					}

					// The host also gets talkback from the Couch mixbus.
					// So to avoid giving them talkback twice, we disable their dedicated talkback channel.
					if (mixbus === 'host') {
						talkbackIntent.value[this.station][mixbus] = false;
						continue;
					}

					talkbackIntent.value[this.station][mixbus] = true;
				}
			} else if (target.name === 'players') {
				talkbackIntent.value[this.station].player1 = true;
				talkbackIntent.value[this.station].player2 = true;
				talkbackIntent.value[this.station].player3 = true;
				talkbackIntent.value[this.station].player4 = true;
			} else {
				talkbackIntent.value[this.station][target.name] = true;
			}
		}

		mute(e) {
			const target = this.getTarget(e.target.getAttribute('data-target'));
			if (target.latch) {
				return;
			}

			if (target.name === 'all') {
				for (const mixbus in talkbackIntent.value[this.station]) {
					if (!{}.hasOwnProperty.call(talkbackIntent.value[this.station], mixbus)) {
						continue;
					}

					talkbackIntent.value[this.station][mixbus] = false;
				}
			} else if (target.name === 'players') {
				talkbackIntent.value[this.station].player1 = false;
				talkbackIntent.value[this.station].player2 = false;
				talkbackIntent.value[this.station].player3 = false;
				talkbackIntent.value[this.station].player4 = false;
			} else {
				talkbackIntent.value[this.station][target.name] = false;
			}
		}

		toggle(e) {
			const target = this.getTarget(e.target.getAttribute('data-target'));
			if (!target.latch) {
				return;
			}

			if (target.name === 'all') {
				for (const mixbus in talkbackIntent.value[this.station]) {
					if (!{}.hasOwnProperty.call(talkbackIntent.value[this.station], mixbus)) {
						continue;
					}

					talkbackIntent.value[this.station][mixbus] = !talkbackIntent.value[this.station][mixbus];
				}
			} else if (target.name === 'players') {
				talkbackIntent.value[this.station].player1 = !talkbackIntent.value[this.station].player1;
				talkbackIntent.value[this.station].player2 = !talkbackIntent.value[this.station].player2;
				talkbackIntent.value[this.station].player3 = !talkbackIntent.value[this.station].player3;
				talkbackIntent.value[this.station].player4 = !talkbackIntent.value[this.station].player4;
			} else {
				talkbackIntent.value[this.station][target.name] = !talkbackIntent.value[this.station][target.name];
			}
		}

		getTarget(name) {
			return this.targets.find(target => target.name === name);
		}

		toggleAllLatches() {
			this._setAllLatchesToggled(!this.allLatchesToggled);

			this.targets.forEach((target, index) => {
				this.set(`targets.${index}.latch`, this.allLatchesToggled);
			});

			this.checkLatches();
		}

		_calcToggleAllLatchesButtonLabel(allLatchesToggled) {
			return allLatchesToggled ? 'TOGGLE ALL LATCHES OFF' : 'TOGGLE ALL LATCHES ON';
		}

		_calcLabel(target) {
			if (!target) {
				return '';
			}

			return target.displayName || target.name;
		}
	}

	customElements.define(TothTalkback.is, TothTalkback);
})();
