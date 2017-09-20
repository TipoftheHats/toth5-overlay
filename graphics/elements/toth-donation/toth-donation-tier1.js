/**
 * @customElement
 * @polymer
 */
class TothDonationTier1 extends Polymer.Element {
	static get is() {
		return 'toth-donation-tier1';
	}

	static get properties() {
		return {
			importPath: String, // https://github.com/Polymer/polymer-linter/issues/71
			selectedVideo: String,
			type: String
		};
	}

	/**
	 * Builds a notification animation.
	 * @param type {string='cash'|'item'|'subscription'|'cheer'}
	 * @param name {string}
	 * @param amount {string} - A pre-formatted amount string, which will be displayed verbatim.
	 * @returns {TimelineLite}
	 */
	handleDonation(type, name, amount, rawAmount) {
		const tl = new TimelineLite();
		tl.call(() => {
			this.$['name-content-text'].innerHTML = `${name} <b>${amount}</b>`;
		});

		tl.add('enter');

		tl.to(this.$['type-rect'], 0.411, {
			scaleY: 1,
			ease: Back.easeOut
		}, 'enter');

		tl.set(this.$.name, {
			visibility: 'visible',
			callbackScope: this,
			onStart() {
				if (type === 'cheer') {
					let variant = '100';
					if (rawAmount >= 5000) {
						variant = '5k';
					} else if (rawAmount >= 1000) {
						variant = '1k';
					}

					this.type = `cheer${variant}`;
					TweenLite.from(this.$.videos.selectedItem, 0.2, {
						scale: 0,
						ease: Circ.easeOut
					});
				} else {
					this.type = type;
				}

				this.$.videos.selectedItem.play();
			}
		}, 'enter+=0.08');

		tl.to(this.$.name, 0.511, {
			x: '0%',
			ease: Power2.easeInOut
		}, 'enter+=0.08');

		tl.to(this.$['name-content'], 0.392, {
			y: '0%',
			ease: Power2.easeInOut
		}, '-=0.08');

		// Exit
		tl.to(this, 0.511, {
			y: 100,
			ease: Power2.easeIn,
			callbackScope: this,
			onComplete() {
				this.type = 'none';
			}
		}, '+=5');

		// Reset
		tl.set([
			this,
			this.$['type-rect'],
			this.$.name,
			this.$['name-content']
		], {
			clearProps: 'all'
		});

		// Time padding
		tl.to({}, 0.2, {});
		return tl;
	}

	_equal(a, b) {
		return a === b;
	}
}

customElements.define(TothDonationTier1.is, TothDonationTier1);

