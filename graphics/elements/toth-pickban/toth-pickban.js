(function () {
	'use strict';

	const dotaCaptains = nodecg.Replicant('dotaCaptains');
	const draft = nodecg.Replicant('draft');
	const draftStatus = nodecg.Replicant('draftState');
	const players = nodecg.Replicant('df_players');
	const teams = nodecg.Replicant('df_teams');

	/**
	 * @customElement
	 * @polymer
	 * @appliesMixin Polymer.MutableData
	 */
	class TothPickBan extends Polymer.MutableData(Polymer.Element) {
		static get is() {
			return 'toth-pickban';
		}

		static get properties() {
			return {
				dotaCaptains: Array,
				teams: Array,
				ban: Boolean,
				pick: Boolean,
				players: Array,
				captain: {
					type: String,
					reflectToAttribute: true
				},
				captainLabel: {
					type: String
				},
				statusMessage: {
					type: String
				},
				classes: {
					type: Array,
					value() {
						return [{
							name: 'scout'
						}, {
							name: 'soldier'
						}, {
							name: 'demoman'
						}, {
							name: 'medic'
						}, {
							name: 'heavy'
						}, {
							name: 'pyro'
						}, {
							name: 'engineer'
						}, {
							name: 'sniper'
						}, {
							name: 'spy'
						}];
					}
				}
			};
		}

		ready() {
			super.ready();
			this.statusMessage = 'Ready to Begin Draft';

			players.on('change', newVal => {
				this.players = newVal;
			});

			teams.on('change', newVal => {
				this.teams = newVal;
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

		draftChanged() {
			this.freeze = false;
			this.updateDraft();
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
					this.updateDraft();
				}
			}
		}

		banPlayer(e) {
			const playerName = e.target.dataset.player;
			const team = this.currentTeam.toLowerCase();
			const player = players.value.find(player => player.name === playerName);
			if (!player) {
				nodecg.log.error(`Tried to ban ${playerName}, but could not find them in the players replicant!`);
				return;
			}

			draftStatus.value += 1;
			player.state = 'banned';
			dotaCaptains.value[team].bans.push(playerName);
		}

		_checkReplicantsReady() {
			if (this._draftReady && this._dotaCaptainsReady) {
				draftStatus.on('change', this.draftChanged.bind(this));
			}
		}

		_generateClassFilter(tf2class) {
			return function (player) {
				return player.playerClass === tf2class.name;
			};
		}

		_isAvailable(state, captain) {
			return !(state === 'available' && captain === this.currentTeam);
		}
	}

	customElements.define(TothPickBan.is, TothPickBan);
})();
