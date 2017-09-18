(function () {
	const bluTeamLogo = nodecg.Replicant('blueTeamLogo');
	const redTeamLogo = nodecg.Replicant('redTeamLogo');
	const scoreboardMode = nodecg.Replicant('scoreboardMode');
	const scoreboardShowing = nodecg.Replicant('scoreboardShowing');
	const scoreboardVerticalOffset = nodecg.Replicant('scoreboardVerticalOffset');
	const scores = nodecg.Replicant('scores');

	/**
	 * @customElement
	 * @polymer
	 */
	class DashScoreboard extends Polymer.Element {
		static get is() {
			return 'dash-scoreboard';
		}

		static get properties() {
			return {
				teamLogos: Array,
				bluTeamLogo: String,
				redTeamLogo: String,
				_inTF2Mode: Boolean
			};
		}

		ready() {
			super.ready();

			scoreboardMode.on('change', newVal => {
				this._inTF2Mode = newVal === 'tf2';
			});

			scores.on('change', newVal => {
				this.$.bluScore.value = newVal.blu.score;
				this.$.bluTag.value = newVal.blu.tag;
				this.$.redScore.value = newVal.red.score;
				this.$.redTag.value = newVal.red.tag;
			});

			scoreboardShowing.on('change', newVal => {
				if (newVal) {
					this.$.show.setAttribute('hidden', 'true');
					this.$.update.removeAttribute('hidden');
					this.$.hide.removeAttribute('disabled');
				} else {
					this.$.show.removeAttribute('hidden');
					this.$.update.setAttribute('hidden', 'true');
					this.$.hide.setAttribute('disabled', 'true');
				}
			});

			scoreboardVerticalOffset.on('change', newVal => {
				this.$.offset.value = newVal;
			});

			bluTeamLogo.on('change', newVal => {
				this.bluTeamLogo = newVal;
			});

			redTeamLogo.on('change', newVal => {
				this.redTeamLogo = newVal;
			});

			this.$.offset.addEventListener('change', e => {
				scoreboardVerticalOffset.value = parseInt(e.target.value, 10);
			});
		}

		show() {
			this.take();
			scoreboardShowing.value = true;
		}

		hide() {
			scoreboardShowing.value = false;
		}

		swap() {
			const tempBluLogo = this.bluTeamLogo;
			bluTeamLogo.value = this.redTeamLogo;
			redTeamLogo.value = tempBluLogo;
			scores.value = {
				red: {
					score: parseInt(this.$.bluScore.value, 10),
					tag: scores.value.blu.tag
				},
				blu: {
					score: parseInt(this.$.redScore.value, 10),
					tag: scores.value.red.tag
				}
			};
		}

		take() {
			bluTeamLogo.value = this.bluTeamLogo;
			redTeamLogo.value = this.redTeamLogo;
			scores.value = {
				red: {
					score: parseInt(this.$.redScore.value, 10),
					tag: this.$.redTag.value
				},
				blu: {
					score: parseInt(this.$.bluScore.value, 10),
					tag: this.$.bluTag.value
				}
			};
		}

		_handleModeToggle() {
			scoreboardMode.value = this._inTF2Mode ? 'tf2' : 'ow';
		}
	}

	customElements.define(DashScoreboard.is, DashScoreboard);
})();
