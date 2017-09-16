(function () {
	'use strict';
	const players = nodecg.Replicant('df_players');
	const teams = nodecg.Replicant('df_teams');
	const draftStatus = nodecg.Replicant('draftState');

	const draft = nodecg.Replicant('draft');
	const dotaCaptains = nodecg.Replicant('dotaCaptains');

	class TothPickBan extends Polymer.MutableData(Polymer.Element) {
		static get is() {
			return 'toth-pickban';
		}
		static get properties() {
			return {
				captain: {
					type: String,
					reflectToAttribute: true
				},
				captainLabel: {
					type: String
				},
				statusMessage: {
					type: String
				}
			};
		}

		ready() {
			super.ready();
			this.statusMessage = 'Ready to Begin Draft';
			players.on('change', newVal => {
				this.players = newVal;
			});
			draft.on('change', newVal => {
				this.draft = newVal.filter(draft => draft);
				if (!this._draftReady) {
					this._draftReady = true;
					this._checkReplicantsReady();
				}
			});
			dotaCaptains.on('change', newVal => {
				this.dotaCaptains = newVal;
				if (!this._dotaCaptainsReady) {
					this._dotaCaptainsReady = true;
					this._checkReplicantsReady();
				}
			});
		}

		_checkReplicantsReady() {
			if (this._draftReady && this._dotaCaptainsReady) {
				draftStatus.on('change', this.draftChanged.bind(this));
			}
		}
		draftChanged() {
			this.freeze = false;
			this.updateDraft();
		}
		_isClass(playerType, classType) {
			if (playerType === classType) {
				return true;
			}
			return false;
		}
		_isAvailable(state, captain) {
			if (state === 'available' && captain === this.currentTeam) {
				return false;
			}
			return true;
		}
		updateDraft() {
			if (this.draft.length > 0 && draftStatus.value + 1 <= this.draft.length) {
				this.currentTeam = this.draft[draftStatus.value].team;
				this.currentDraftAction = this.draft[draftStatus.value].type;
				if (this.currentDraftAction === 'ban') {
					this.ban = false;
					this.pick = true;
				} else {
					this.ban = true;
					this.pick = false;
				}
				players.on('change', newVal => {
					this.players = newVal;
				});
				this.statusMessage = this.currentTeam + '\'s turn to ' + this.currentDraftAction;
			} else {
				this.statusMessage = 'Draft Completed';
				this.ban = true;
				this.pick = true;
			}
		}
		pickPlayer(e) {
			const team = this.currentTeam.toLowerCase();
			const playerName = e.target.dataset.player;
			const teamIndex = 0;
			let newIndex = 0;

			if (playerName === '') {
				teams.value[team][teamIndex] = '';
			} else {
				draftStatus.value += 1;
				let playerIndex;
				players.value.some((player, idx) => {
					if (player.name === playerName) {
						playerIndex = idx;
						player.state = 'drafted';
						// i am tired....
						const i = dotaCaptains.value[team].picks.length;
						dotaCaptains.value[team].picks[i] = [playerName];
						return true;
					}

					return false;
				});
				if (typeof playerIndex !== 'undefined') {
					if (teams.value[team].length > 0) {
						newIndex = teams.value[team].length;
					} else {
						newIndex = teamIndex;
					}
					teams.value[team][newIndex] = players.value[playerIndex];
					// draftStatus.value += 1;
					this.updateDraft();
				}
			}
		}
		banPlayer(e) {
			const playerName = e.target.dataset.player;
			const team = this.currentTeam.toLowerCase();
			players.value.some(player => {
				if (player.name === playerName) {
					draftStatus.value += 1;
					player.state = 'banned';
						// i am tired....fix this
					const i = dotaCaptains.value[team].bans.length;
					dotaCaptains.value[team].bans[i] = [playerName];
					// PENIS
					return true;
				}
				return false;
			});
		}
}
	customElements.define(TothPickBan.is, TothPickBan);
})();
