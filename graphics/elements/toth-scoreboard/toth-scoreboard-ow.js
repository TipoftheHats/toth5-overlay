(function () {
	'use strict';

	const scoreboardShowing = nodecg.Replicant('scoreboardShowing');
	const scores = nodecg.Replicant('scores');

	/**
	 * @customElement
	 * @polymer
	 */
	class TothScoreboardOW extends Polymer.Element {
		static get is() {
			return 'toth-scoreboard-ow';
		}

		static get properties() {
			return {
				importPath: String, // https://github.com/Polymer/polymer-linter/issues/71
				blueTeamName: {
					type: String,
					observer: '_blueTeamNameChanged'
				},
				redTeamName: {
					type: String,
					observer: '_redTeamNameChanged'
				},
				blueTeamScore: {
					type: Number,
					default: 0
				},
				redTeamScore: {
					type: Number,
					default: 0
				},
				visible: {
					type: Boolean,
					observer: '_visibleChanged'
				},
				timeline: {
					type: TimelineLite,
					readOnly: true,
					value() {
						return new TimelineLite({autoRemoveChildren: true});
					}
				},
				muted: {
					type: Boolean,
					reflectToAttribute: true
				}
			};
		}

		ready() {
			super.ready();

			scores.on('change', newVal => {
				if (!newVal) {
					return;
				}

				this.blueTeamName = newVal.blu.tag;
				this.redTeamName = newVal.red.tag;
				this.blueTeamScore = newVal.blu.score;
				this.redTeamScore = newVal.red.score;
			});

			scoreboardShowing.on('change', newVal => {
				this.visible = newVal;
			});
		}

		show() {
			const bars = Array.from(this.shadowRoot.querySelectorAll('.bar'));
			const glows = Array.from(this.shadowRoot.querySelectorAll('.glow'));
			const lines = Array.from(this.shadowRoot.querySelectorAll('.line'));
			const logos = Array.from(this.shadowRoot.querySelectorAll('.logo'));
			const names = Array.from(this.shadowRoot.querySelectorAll('.name'));
			const scores = Array.from(this.shadowRoot.querySelectorAll('.score'));

			this.timeline.call(() => {
				if (this.muted) {
					return;
				}
				nodecg.playSound('ow_scoreboard_in');
			});

			this.timeline.to(lines, 0.5, {className: '+=visible'}, 0);
			this.timeline.to(bars, 0.5, {className: '+=visible'}, 0.5);
			this.timeline.to(glows, 0.5, {className: '+=visible'}, 0.6);
			this.timeline.to(logos, 0.5, {className: '+=visible'}, 1);
			this.timeline.to(names, 1, {className: '+=visible'}, 1);

			this.timeline.call(() => {
				TweenLite.to(this.$['blue-name'], 1, {
					text: this.blueTeamName,
					ease: SteppedEase.config(20)
				});

				TweenLite.to(this.$['red-name'], 1, {
					text: this.redTeamName,
					ease: SteppedEase.config(20)
				});
			}, null, null, 1);

			this.timeline.to(scores, 0.2, {className: '+=visible'}, 2);
		}

		hide() {
			const bars = Array.from(this.shadowRoot.querySelectorAll('.bar'));
			const glows = Array.from(this.shadowRoot.querySelectorAll('.glow'));
			const lines = Array.from(this.shadowRoot.querySelectorAll('.line'));
			const logos = Array.from(this.shadowRoot.querySelectorAll('.logo'));
			const names = Array.from(this.shadowRoot.querySelectorAll('.name'));
			const scores = Array.from(this.shadowRoot.querySelectorAll('.score'));

			this.timeline.call(() => {
				if (this.muted) {
					return;
				}
				nodecg.playSound('ow_scoreboard_out');
			});

			this.timeline.to(scores, 0.2, {className: '-=visible'}, 0);
			this.timeline.to(names, 0.5, {className: '-=visible'}, 0.2);
			this.timeline.to(this.$['blue-name'], 0.5, {text: ''}, 0.2);
			this.timeline.to(this.$['red-name'], 0.5, {text: ''}, 0.2);
			this.timeline.to(logos, 0.2, {className: '-=visible'}, 0.7);
			this.timeline.to(bars, 0.2, {className: '-=visible'}, 0.8);
			this.timeline.to(glows, 0.2, {className: '-=visible'}, 1);
			this.timeline.to(lines, 0.5, {className: '-=visible'}, 1.1);
		}

		_blueTeamNameChanged(newVal) {
			TweenLite.to(this.$['blue-name'], 0.2, {text: newVal});
		}

		_redTeamNameChanged(newVal) {
			TweenLite.to(this.$['red-name'], 0.2, {text: newVal});
		}

		_visibleChanged(newVal) {
			if (newVal) {
				this.show();
			} else {
				this.hide();
			}
		}
	}

	customElements.define(TothScoreboardOW.is, TothScoreboardOW);
})();
