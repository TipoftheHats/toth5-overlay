(function () {
	const scoreboardMode = nodecg.Replicant('scoreboardMode');

	/**
	 * @customElement
	 * @polymer
	 */
	class TothScoreboard extends Polymer.Element {
		static get is() {
			return 'toth-scoreboard';
		}

		static get properties() {
			return {};
		}

		ready() {
			super.ready();
			scoreboardMode.on('change', newVal => {
				this.$.ow.muted = newVal !== 'ow';
				this.$.tf2.muted = newVal !== 'tf2';
			});
		}
	}

	customElements.define(TothScoreboard.is, TothScoreboard);
})();
