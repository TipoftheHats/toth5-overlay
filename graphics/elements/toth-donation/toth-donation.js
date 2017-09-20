/**
 * @customElement
 * @polymer
 */
class TothDonation extends Polymer.Element {
	static get is() {
		return 'toth-donation';
	}

	static get properties() {
		return {
			tl: {
				type: TimelineLite,
				readOnly: true,
				value() {
					return new TimelineLite({autoRemoveChildren: true});
				}
			}
		};
	}

	ready() {
		super.ready();

		nodecg.listenFor('donation', donation => {
			const tl = this.routeDonation(donation);
			if (tl) {
				this.tl.add(tl);
			}
		});

		nodecg.listenFor('cheer', cheer => {
			const tl = this.routeCheer(cheer);
			if (tl) {
				this.tl.add(tl);
			}
		});

		nodecg.listenFor('subscription', subscription => {
			const tl = this.routeSubscription(subscription);
			if (tl) {
				this.tl.add(tl);
			}
		});
	}

	/**
	 * Queues the appropriate notification for a cash or item donation.
	 * @param donation
	 * {type, name, amount, rawAmount}
	 */
	routeDonation(donation) {
		if (donation.rawAmount < 100) {
			return this.$.tier1.handleDonation(donation.type, donation.name, donation.amount);
		} else if (donation.rawAmount < 500) {
			return this.$.tier2.handleDonation(donation.type, donation.name, donation.amount);
		} else if (donation.rawAmount >= 500) {
			return this.$.tier3.handleDonation(donation.type, donation.name, donation.amount);
		}
	}

	/**
	 * Queues the appropriate notification for "cheer" (a transaction of Twitch "bits").
	 * @param cheer
	 * bits_used - {integer}
	 * channel_id - {string}
	 * channel_name - {string}
	 * chat_message - {string}
	 * context - {string}
	 * message_id - {string}
	 * message_type - {string}
	 * time - {string}
	 * total_bits_used - {integer}
	 * user_id - {string}
	 * user_name - {string}
	 * version - {string}
	 */
	routeCheer(cheer) {
		if (cheer.bits_used < 100) {
			return;
		}

		const name = cheer.display_name || cheer.user_name;
		const formattedBits = cheer.bits_used.toLocaleString('en-US');
		if (cheer.bits_used < 100 * 100) {
			return this.$.tier1.handleDonation('cheer', name, formattedBits, cheer.bits_used);
		} else if (cheer.bits_used < 500 * 100) {
			return this.$.tier2.handleDonation('cheer', name, formattedBits);
		} else if (cheer.bits_used >= 500 * 100) {
			return this.$.tier3.handleDonation('cheer', name, formattedBits);
		}
	}

	/**
	 * Queues the appropriate notification for a Twitch subscription/resubscription.
	 * @param subscription
	 * user_name - {string}
	 * display_name - {string}
	 * channel_name - {string}
	 * user_id - {string}
	 * channel_id- {string}
	 * time- {string}
	 * sub_plan- {string} "Prime"/"1000"/"2000"/"3000"
	 * sub_plan_name - {string}
	 * months - {integer}
	 * context - {string}
	 * sub_message - {object}
	 * sub_message.message - {string}
	 * sub_message.emotes - {array}
	 */
	routeSubscription(subscription) {
		let amount;
		switch (subscription.sub_plan) {
			case 'Prime':
				amount = 'Prime Sub';
				break;
			case '1000':
				amount = '$5 Sub';
				break;
			case '2000':
				amount = '$10 Sub';
				break;
			case '3000':
				amount = '$25 Sub';
				break;
			default:
				amount = `${amount} Months`;
		}

		return this.$.tier1.handleDonation('subscription', subscription.display_name || subscription.user_name, amount);
	}
}

customElements.define(TothDonation.is, TothDonation);
