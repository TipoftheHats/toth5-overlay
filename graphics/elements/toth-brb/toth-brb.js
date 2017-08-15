(function () {
	'use strict';

	const brbShowing = nodecg.Replicant('brbShowing');
	const upNext = nodecg.Replicant('upNext');

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
		}
	}

	customElements.define(TothBrb.is, TothBrb);
})();
