/**
 * @customElement
 * @polymer
 */
class TothDonationTier3 extends Polymer.Element {
	static get is() {
		return 'toth-donation-tier3';
	}

	static get properties() {
		return {
			importPath: String // https://github.com/Polymer/polymer-linter/issues/71
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
		const scoreboard = document.getElementById('scoreboard');
		const sponsors = document.getElementById('sponsors');
		const rectLeft = this.shadowRoot.querySelector('.type-rect.left');
		const rectRight = this.shadowRoot.querySelector('.type-rect.right');
		const cheerLeft = this.shadowRoot.querySelector('.cheer.left');
		const cheerRight = this.shadowRoot.querySelector('.cheer.right');
		const moneyLeft = this.shadowRoot.querySelector('.money.left');
		const moneyRight = this.shadowRoot.querySelector('.money.right');
		const giftboxLeft = this.shadowRoot.querySelector('.giftbox.left');
		const giftboxRight = this.shadowRoot.querySelector('.giftbox.right');
		const borderLeft = this.shadowRoot.querySelector('.border.left');
		const borderRight = this.shadowRoot.querySelector('.border.right');

		// Fade out the sponsor graphic and scoreboard
		tl.to([scoreboard, sponsors], 0.33, {
			opacity: 0,
			ease: Power1.easeInOut
		});

		tl.call(() => {
			this.$['name-content-name'].innerHTML = name;
			this.$['name-content-amount'].innerHTML = `&nbsp;${amount}`;

			// Shrink name to fit if necessary
			const nameClientWidth = this.$['name-content-name'].clientWidth;
			const nameScrollWidth = this.$['name-content-name'].scrollWidth;
			if (nameScrollWidth > nameClientWidth) {
				TweenLite.set(this.$['name-content-name'], {scaleX: nameClientWidth / nameScrollWidth});
			} else {
				TweenLite.set(this.$['name-content-name'], {scaleX: 1});
			}

			setTimeout(() => {
				nodecg.playSound('notification_tier3');
			}, 0);
		});

		tl.add('enter');

		tl.to([rectLeft, rectRight], 0.411, {
			scaleX: 1,
			ease: Back.easeOut
		}, 'enter');

		tl.to([borderLeft, borderRight], 0.511, {
			scaleX: 1,
			ease: Power2.easeInOut
		}, 'enter+=0.08');

		tl.to(this.$['name-content'], 0.392, {
			y: '0%',
			ease: Power2.easeInOut,
			callbackScope: this,
			onStart() {
				if (type === 'cheer') {
					TweenLite.from([cheerLeft, cheerRight], 0.2, {
						scale: 0,
						ease: Circ.easeOut
					});
					cheerLeft.style.display = 'block';
					cheerRight.style.display = 'block';
					cheerLeft.play();
					cheerRight.play();
				} else if (type === 'item') {
					giftboxLeft.style.display = 'block';
					giftboxRight.style.display = 'block';
					giftboxLeft.play();
					giftboxRight.play();
				} else {
					moneyLeft.style.display = 'block';
					moneyRight.style.display = 'block';
					moneyLeft.play();
					moneyRight.play();
				}
			}
		}, '-=0.08');

		// Exit
		tl.to(this.$.cover, 0.511, {
			scaleY: 1,
			ease: Power2.easeIn,
			callbackScope: this,
			onComplete() {
				cheerLeft.style.display = 'none';
				cheerRight.style.display = 'none';
				giftboxLeft.style.display = 'none';
				giftboxRight.style.display = 'none';
				moneyLeft.style.display = 'none';
				moneyRight.style.display = 'none';
				cheerLeft.currentTime = 0;
				cheerRight.currentTime = 0;
				giftboxLeft.currentTime = 0;
				giftboxRight.currentTime = 0;
				moneyLeft.currentTime = 0;
				moneyRight.currentTime = 0;
				this.$.cover.style.transformOrigin = 'top center';
			}
		}, '+=5');

		tl.set([
			rectLeft,
			rectRight,
			borderLeft,
			borderRight,
			this.$['name-content']
		], {
			clearProps: 'all'
		});

		tl.to(this.$.cover, 0.511, {
			scaleY: 0,
			ease: Power2.easeOut
		});

		tl.set(this.$.cover, {clearProps: 'all'});

		// Fade in the sponsor graphic and scoreboard
		tl.to([scoreboard, sponsors], 0.33, {
			opacity: 1,
			ease: Power1.easeInOut
		}, '+=0.08');

		// Time padding
		tl.to({}, 0.2, {});
		return tl;
	}

	_equal(a, b) {
		return a === b;
	}
}

customElements.define(TothDonationTier3.is, TothDonationTier3);
