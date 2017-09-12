/* global SteppedEase */
(function () {
	'use strict';

	const scoreboardVisible = nodecg.Replicant('scoreboardVisible');
	const blueTeamName = nodecg.Replicant('blueTeamName');
	const redTeamName = nodecg.Replicant('redTeamName');

	class TothOverwatch extends Polymer.Element {
		static get is() {
			return 'toth-overwatch';
		}
		ready() {
			super.ready();
			this.timeline = new TimelineLite({autoRemoveChildren: true});
			this.initialized = false;

			blueTeamName.on('change', newVal => {
				if (newVal) {
					this.blueTeamName = newVal;
				} else {
					this.blueTeamName = null;
				}
				if (!this._blueTeamReady) {
					this._blueTeamReady = true;
					this._checkReplicantsReady();
				}
			});

			redTeamName.on('change', newVal => {
				if (newVal) {
					this.redTeamName = newVal;
				} else {
					this.redTeamName = null;
				}
				if (!this._redTeamReady) {
					this._redTeamReady = true;
					this._checkReplicantsReady();
				}
			});
			blueTeamName.on('change', this.blueTeamNameChanged.bind(this));
			redTeamName.on('change', this.redTeamNameChanged.bind(this));
		}

		_checkReplicantsReady() {
			if (this._blueTeamReady && this._redTeamReady) {
				console.log('all replicants ready, adding change handlers for scoreboardVisible');
				scoreboardVisible.on('change', this.visibleChanged.bind(this));
			}
		}

		blueTeamNameChanged(newVal, oldVal) {
			const blueName = this.shadowRoot.querySelector('#blue-name');
			if ((oldVal === null) && this.initialized) {
				return;
			}
			TweenLite.fromTo(blueName, 0.2, {
				text: oldVal
			}, {
				text: newVal
			});
		}
		redTeamNameChanged(newVal, oldVal) {
			const redName = this.shadowRoot.querySelector('#red-name');
			if ((oldVal === null) && this.initialized) {
				return;
			}
			TweenLite.fromTo(redName, 0.2, {
				text: oldVal
			}, {
				text: newVal
			});
		}

		visibleChanged(newVal, oldVal) {
			if ((oldVal === null) && this.initialized) {
				return;
			}
			const lines = Array.from(this.shadowRoot.querySelectorAll('.line'));
			const bars = Array.from(this.shadowRoot.querySelectorAll('.bar'));
			const glows = Array.from(this.shadowRoot.querySelectorAll('.glow'));
			const logos = Array.from(this.shadowRoot.querySelectorAll('.logo'));
			const names = Array.from(this.shadowRoot.querySelectorAll('.name'));
			const scores = Array.from(this.shadowRoot.querySelectorAll('.score'));
			const blueName = this.shadowRoot.querySelector('#blue-name');
			const redName = this.shadowRoot.querySelector('#red-name');

			this.initialized = true;

			if (!oldVal && newVal) {
				nodecg.playSound('ow_scoreboard_in');
				this.timeline.fromTo(lines, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0);
				this.timeline.fromTo(bars, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.5);
				this.timeline.fromTo(glows, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.6);
				this.timeline.fromTo(logos, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1);
				this.timeline.fromTo(names, 1, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1);
				//	ease: SteppedEase.easeIn
				if (this.blueTeamName === null) {
					this.blueTeamName = 'Team A';
				}
				this.timeline.fromTo(blueName, 1, {
					text: ''
				}, {
					text: this.blueTeamName,
					ease: SteppedEase.config(20)
				}, 1);

				if (this.redTeamName === null) {
					this.redTeamName = 'Team B';
				}
				this.timeline.fromTo(redName, 1, {
					text: ''
				}, {
					text: this.redTeamName,
					ease: SteppedEase.config(20)
				}, 1);
				this.timeline.fromTo(scores, 0.2, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 2);
			} else if (oldVal && !newVal) {
				nodecg.playSound('ow_scoreboard_out');
				console.log('out');
				this.timeline.fromTo(scores, 0.2, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0);
				this.timeline.fromTo(names, 0.5, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.2);
				if (this.blueTeamName === null) {
					this.blueTeamName = '';
				}
				this.timeline.fromTo(blueName, 0.5, {
					text: this.blueTeamName
				}, {
					text: ''
				}, 0.2);
				if (this.redTeamName === null) {
					this.redTeamName = '';
				}
				this.timeline.fromTo(redName, 0.5, {
					text: this.redTeamName
				}, {
					text: ''
				}, 0.2);
				this.timeline.fromTo(logos, 0.2, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.7);
				this.timeline.fromTo(bars, 0.2, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.8);
				this.timeline.fromTo(glows, 0.2, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 1);
				this.timeline.fromTo(lines, 0.5, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 1.1);
			}
		}
	}

	customElements.define(TothOverwatch.is, TothOverwatch);
})();
