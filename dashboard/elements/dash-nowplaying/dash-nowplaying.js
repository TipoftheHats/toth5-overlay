(function () {
	const nowPlaying = nodecg.Replicant('nowPlaying');
	const pulsing = nodecg.Replicant('nowPlayingPulsing');

	/**
	 * @customElement
	 * @polymer
	 */
	class DashNowplaying extends Polymer.Element {
		static get is() {
			return 'dash-nowplaying';
		}

		static get properties() {
			return {
				currentSong: {
					type: String,
					value: 'Waiting for data...'
				}
			};
		}

		ready() {
			super.ready();

			pulsing.on('change', newVal => {
				if (newVal) {
					this.$.show.setAttribute('disabled', 'true');
				} else {
					this.$.show.removeAttribute('disabled');
				}
			});

			nowPlaying.on('change', newVal => {
				if (newVal.artistSong) {
					this.currentSong = newVal.artistSong;
				} else {
					this.currentSong = 'Waiting for data...';
				}
			});
		}

		show() {
			nodecg.sendMessage('pulseNowPlaying');
		}
	}

	customElements.define(DashNowplaying.is, DashNowplaying);
})();
