(function () {
	'use strict';

	const MERCH_HOLD_TIME = 12;
	const brbShowing = nodecg.Replicant('brbShowing');
	const upNext = nodecg.Replicant('upNext');
	const nowPlayingEl = document.getElementById('nowPlaying');

	/**
	 * @customElement
	 * @polymer
	 */
	class TothBrb extends Polymer.Element {
		static get is() {
			return 'toth-brb';
		}

		static get properties() {
			return {
				importPath: String // https://github.com/Polymer/polymer-linter/issues/71
			};
		}

		ready() {
			super.ready();

			brbShowing.on('change', newVal => {
				TweenLite.to(this, 0.5, {
					opacity: newVal ? 1 : 0,
					ease: Power1.easeInOut
				});

				if (newVal) {
					TweenLite.set(nowPlayingEl, {
						top: 200
					});
				} else {
					TweenLite.set(nowPlayingEl, {
						clearProps: 'top',
						delay: 0.5
					});
				}
			});

			upNext.on('change', newVal => {
				TweenLite.to(this.$.upNext, 0.5, {
					opacity: newVal ? 1 : 0,
					ease: Power1.easeInOut,
					callbackScope: this,
					onStart() {
						if (newVal) {
							this.$.event.innerText = newVal;
						}
					},
					onComplete() {
						if (!newVal) {
							this.$.event.innerText = newVal;
						}
					}
				});
			});

			const tl = new TimelineMax({repeat: -1});

			tl.add('swap1', `+=${MERCH_HOLD_TIME}`);
			tl.to(this.$['merch-shirts'], 0.238, {
				opacity: 0,
				ease: Linear.easeNone
			}, 'swap1');
			tl.to(this.$['merch-store'], 0.238, {
				opacity: 1,
				ease: Linear.easeNone
			}, 'swap1');

			tl.add('swap2', `+=${MERCH_HOLD_TIME}`);
			tl.to(this.$['merch-store'], 0.238, {
				opacity: 0,
				ease: Linear.easeNone
			}, 'swap2');
			tl.to(this.$['merch-shirts'], 0.238, {
				opacity: 1,
				ease: Linear.easeNone
			}, 'swap2');
		}
	}

	customElements.define(TothBrb.is, TothBrb);
})();
