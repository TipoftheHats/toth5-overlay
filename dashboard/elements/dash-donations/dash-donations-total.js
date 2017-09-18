(function () {
	const cashTotal = nodecg.Replicant('total');
	const autoUpdateTotal = nodecg.Replicant('autoUpdateTotal');

	/**
	 * @customElement
	 * @polymer
	 */
	class DashDonationsTotal extends Polymer.Element {
		static get is() {
			return 'dash-donations-total';
		}

		static get properties() {
			return {
				autoUpdateTotal: Boolean,
				cashTotal: {
					type: String,
					value: '?'
				}
			};
		}

		ready() {
			super.ready();
			cashTotal.on('change', newVal => {
				this.cashTotal = newVal.formatted;
			});
			autoUpdateTotal.on('change', newVal => {
				this.autoUpdateTotal = newVal;
			});
		}

		editCashTotal() {
			this.$.editTotalInput.value = cashTotal.value.raw;
			this.$.editDialog.open();
		}

		_handleAutoUpdateToggleChange(e) {
			autoUpdateTotal.value = e.target.checked;
		}

		_handleEditDialogConfirmed() {
			nodecg.sendMessage('setTotal', parseFloat(this.$.editTotalInput.value));
		}
	}

	customElements.define(DashDonationsTotal.is, DashDonationsTotal);
})();
