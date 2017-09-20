/**
 * @customElement
 * @polymer
 */
class TothDonationTier2 extends Polymer.Element {
	static get is() {
		return 'toth-donation-tier2';
	}

	static get properties() {
		return {
			importPath: String, // https://github.com/Polymer/polymer-linter/issues/71
			type: String
		};
	}

	/**
	 * Builds a notification animation.
	 * @param type {string=cash'|'item'|'subscription'|'cheer')
	 * @param name {string}
	 * @param amount {number}
	 * @returns {TimelineLite}
	 */
	handleDonation(type, name, amount) {
		const tl = new TimelineLite();
		tl.call(() => {
			this.$['name-content-name'].innerHTML = name;
			this.$['name-content-amount'].innerHTML = `&nbsp;${amount}`;
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
				this.type = type;
				this.$.videos.selectedItem.play();
				TweenLite.from(this.shadowRoot.querySelector('video[data-type="cheer"]'), 0.2, {
					scale: 0,
					ease: Circ.easeOut
				});
			}
		}, 'enter+=0.08');

		tl.to(this.$.name, 0.511, {
			x: '0%',
			ease: Power2.easeInOut
		}, 'enter+=0.08');

		tl.to(this.$['name-content'], 0.392, {
			y: '0%',
			ease: Power2.easeInOut,
			callbackScope: this,
			onComplete() {
				this.$.name.style.zIndex = 1;
				this.$['name-content'].style.zIndex = 2;
				this.$.shimmer.style.zIndex = 1;
				this.$['name-border'].style.zIndex = 0;
				this.$.name.style.overflow = 'visible';
			}
		}, '-=0.08');

		tl.call(() => {
			const nameWidth = this.$.name.clientWidth;
			TweenLite.to(this.$.shimmer, 1.5, {
				x: -190 - nameWidth - 28,
				ease: Power4.easeInOut
			});
		});

		// Exit
		tl.to(this, 0.811, {
			y: 210,
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
			this.$['name-content'],
			this.$.shimmer
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

customElements.define(TothDonationTier2.is, TothDonationTier2);
