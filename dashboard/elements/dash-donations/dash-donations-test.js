/**
 * @customElement
 * @polymer
 */
class DashDonationsTest extends Polymer.Element {
	static get is() {
		return 'dash-donations-test';
	}

	static get properties() {
		return {
			type: {
				type: String,
				value: 'cash'
			},
			subTier: {
				type: String,
				value: '1000'
			}
		};
	}

	send() {
		nodecg.sendMessage('testDonation', {
			rawAmount: parseFloat(this.$.amount.value),
			name: this.$.donor.value || 'Test Donor',
			type: this.$.type.value.toLowerCase(),
			subTier: this.subTier
		});
	}

	_equal(a, b) {
		return a === b;
	}
}

customElements.define(DashDonationsTest.is, DashDonationsTest);
