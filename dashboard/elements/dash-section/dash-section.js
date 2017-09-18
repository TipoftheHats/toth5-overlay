/**
 * @customElement
 * @polymer
 */
class DashSection extends Polymer.Element {
	static get is() {
		return 'dash-section';
	}

	static get properties() {
		return {
			icon: String,
			label: String
		};
	}
}

customElements.define(DashSection.is, DashSection);
