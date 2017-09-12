/* global _ */
(function () {
	'use strict';

	const scoreboardVisible = nodecg.Replicant('scoreboardVisible', {defaultValue: false});
	const redTeamScore = nodecg.Replicant('redTeamScore', {defaultValue: 0});
	const blueTeamScore = nodecg.Replicant('blueTeamScore', {defaultValue: 0});
	const blueTeamName = nodecg.Replicant('blueTeamName', {defaultValue: 'Team A'});
	const redTeamName = nodecg.Replicant('redTeamName', {defaultValue: 'Team B'});

	class OverwatchScoreboardControl extends Polymer.MutableData(Polymer.Element) {
		static get is() {
			return 'overwatch-scoreboard-control';
		}

		ready() {
			super.ready();
			scoreboardVisible.on('change', newVal => {
				this.scoreboardVisible = newVal;
			});
			blueTeamScore.on('change', newVal => {
				if (newVal === '') {
					this.blueTeamScore = 0;
				} else {
					this.blueTeamScore = newVal;
				}
			});
			redTeamScore.on('change', newVal => {
				if (newVal === '') {
					this.redTeamScore = 0;
				} else {
					this.redTeamScore = newVal;
				}
			});
			blueTeamName.on('change', newVal => {
				this.blueTeamName = newVal;
			});
			redTeamName.on('change', newVal => {
				this.redTeamName = newVal;
			});
		}
		switchTeams() {
			const newRedTeamName = this.blueTeamName;
			const newBlueTeamName = this.redTeamName;
			this.blueTeamName = newBlueTeamName;
			this.redTeamName = newRedTeamName;
			const newRedTeamLogo = this.blueTeamLogo;
			const newBlueTeamLogo = this.redTeamLogo;
			this.blueTeamLogo = newBlueTeamLogo;
			this.redTeamLogo = newRedTeamLogo;

			const newRedTeamScore = this.blueTeamScore;
			const newBlueTeamScore = this.redTeamScore;
			this.blueTeamScore = newBlueTeamScore;
			this.redTeamScore = newRedTeamScore;
		}
		hideOverlay() {
			this.scoreboardVisible = false;
		}
		showOverlay() {
			if (this.blueTeamName === '') {
				this.blueTeamName = 'Team A';
			}
			if (this.redTeamName === '') {
				this.redTeamName = 'Team B';
			}
			this.scoreboardVisible = true;
		}
		decrementBlueScore() {
			let score = _.toNumber(this.blueTeamScore) || 0;
			if (score > 0) {
				score--;
			}
			this.blueTeamScore = score;
		}
		decrementRedScore() {
			let score = _.toNumber(this.redTeamScore) || 0;
			if (score > 0) {
				score--;
			}
			this.redTeamScore = score;
		}
		incrementBlueScore() {
			let score = _.toNumber(this.blueTeamScore) || 0;
			score++;
			this.blueTeamScore = score;
		}
		incrementRedScore() {
			let score = _.toNumber(this.redTeamScore) || 0;
			score++;
			this.redTeamScore = score;
		}
	}

	customElements.define(OverwatchScoreboardControl.is, OverwatchScoreboardControl);
})();
