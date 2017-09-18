/**
 * @customElement
 * @polymer
 */
class DashDonationsTest extends Polymer.Element {
	static get is() {
		return 'dash-donations-test';
	}

	static get properties() {
		return {};
	}

	send() {
		nodecg.sendMessage('testDonation', {
			rawAmount: this.$.amount.value,
			name: this.$.donor.value,
			type: this.$.type.value.toLowerCase()
		});
	}
}

customElements.define(DashDonationsTest.is, DashDonationsTest);
