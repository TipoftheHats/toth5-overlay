/**
 * @customElement
 * @polymer
 */
class TothDotaDraft extends Polymer.Element {
	static get is() {
		return 'toth-dota-draft';
	}

	static get properties() {
		return {
			redTeam: Array,
			bluTeam: Array,
			availablePlayers: Array
		};
	}
}

customElements.define(TothDotaDraft.is, TothDotaDraft);
