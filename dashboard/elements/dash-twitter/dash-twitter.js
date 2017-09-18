(function () {
	const tweetShowing = nodecg.Replicant('tweetShowing');
	const tweetPulsing = nodecg.Replicant('tweetPulsing');

	/**
	 * @customElement
	 * @polymer
	 */
	class DashTwitter extends Polymer.Element {
		static get is() {
			return 'dash-twitter';
		}

		static get properties() {
			return {};
		}

		ready() {
			super.ready();

			tweetShowing.once('declared', () => {
				tweetPulsing.on('change', newVal => {
					if (tweetShowing.value && newVal) {
						this.$.hide.setAttribute('disabled', 'true');
					} else {
						this.$.hide.removeAttribute('disabled');
					}
				});
			});

			tweetShowing.on('change', newVal => {
				if (newVal) {
					this.$.show.setAttribute('disabled', 'true');
					this.$.seven.setAttribute('disabled', 'true');
					this.$.fifteen.setAttribute('disabled', 'true');
					this.$.thirty.setAttribute('disabled', 'true');
					this.$.hide.removeAttribute('disabled');
				} else {
					this.$.show.removeAttribute('disabled');
					this.$.seven.removeAttribute('disabled');
					this.$.fifteen.removeAttribute('disabled');
					this.$.thirty.removeAttribute('disabled');
					this.$.hide.setAttribute('disabled', 'true');
				}
			});
		}

		load() {
			nodecg.sendMessage('loadTweet', this.$.url.value);
		}

		show() {
			tweetShowing.value = true;
		}

		hide() {
			tweetShowing.value = false;
		}

		pulse(e) {
			nodecg.sendMessage('pulseTweet', parseInt(e.target.getAttribute('data-duration'), 10));
		}
	}

	customElements.define(DashTwitter.is, DashTwitter);
})();
