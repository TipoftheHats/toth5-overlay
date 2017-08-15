(function () {
	'use strict';

	const nowPlaying = nodecg.Replicant('nowPlaying');
	const pulsing = nodecg.Replicant('nowPlayingPulsing');

	/**
	 * @customElement
	 * @polymer
	 */
	class TothNowplaying extends Polymer.Element {
		static get is() {
			return 'toth-nowplaying';
		}

		static get properties() {
			return {
				importPath: String, // https://github.com/Polymer/polymer-linter/issues/71
				artUrl: {
					type: String
				},
				song: {
					type: String,
					value: '',
					observer: 'songChanged'
				},
				artist: {
					type: String,
					value: '',
					observer: 'artistChanged'
				},
				duration: {
					type: Number,
					value: 15
				},
				showing: {
					type: Boolean,
					value: false,
					readOnly: true
				},
				tl: {
					type: Object,
					value: new TimelineLite({autoRemoveChildren: true})
				}
			};
		}

		ready() {
			super.ready();

			pulsing.on('change', (newVal, oldVal) => {
				if (newVal && typeof oldVal !== 'undefined') {
					this.show(nowPlaying.value.artist, nowPlaying.value.song, nowPlaying.value.cover);
				} else {
					this.hide();
				}
			});
		}

		songChanged(newVal) {
			this.$.song.innerHTML = `&#9834; ${newVal}`;

			const song = this.$.song;
			const songWidth = song.scrollWidth;
			const maxWidth = this._getElementContentWidth(this.$.details);
			if (songWidth > maxWidth) {
				TweenLite.set(song, {scaleX: maxWidth / songWidth});
			} else {
				TweenLite.set(song, {scaleX: 1});
			}
		}

		artistChanged() {
			const artist = this.$.artist;
			const artistWidth = artist.scrollWidth;
			const maxWidth = this._getElementContentWidth(this.$.details);
			if (artistWidth > maxWidth) {
				TweenLite.set(artist, {scaleX: maxWidth / artistWidth});
			} else {
				TweenLite.set(artist, {scaleX: 1});
			}
		}

		show(artist, song, cover) {
			if (this.showing) {
				return;
			}

			this._setShowing(true);

			const self = this;

			// Prevent first "call" from getting ignored
			this.tl.to({}, 0.01, {});

			this.tl.call(() => {
				self.song = song;
				self.artist = artist;
				self.artUrl = cover;
			});

			this.tl.to(this.$.line, 0.5, {
				height: '100%',
				ease: Power1.easeInOut
			});

			this.tl.add('stuffIn');

			this.tl.to(this.$.art, 0.4, {
				x: '0%',
				ease: Power1.easeOut
			}, 'stuffIn');

			this.tl.to(this.$.details, 0.7, {
				x: '0%',
				ease: Power1.easeOut
			}, 'stuffIn');
		}

		hide() {
			if (!this.showing) {
				return;
			}

			this._setShowing(false);

			this.tl.add('stuffOut');

			this.tl.to(this.$.art, 0.4, {
				x: '100%',
				ease: Power1.easeIn
			}, 'stuffOut+=0.3');

			this.tl.to(this.$.details, 0.7, {
				x: '-100%',
				ease: Power1.easeIn
			}, 'stuffOut');

			this.tl.to(this.$.line, 0.5, {
				height: '0%',
				ease: Power1.easeInOut
			});
		}

		_getElementContentWidth(element) {
			const styles = window.getComputedStyle(element);
			const padding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
			return element.clientWidth - padding;
		}
	}

	customElements.define(TothNowplaying.is, TothNowplaying);
})();
