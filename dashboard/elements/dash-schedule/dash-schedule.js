(function () {
	const onNow = nodecg.Replicant('onNow');
	const upNext = nodecg.Replicant('upNext');

	/**
	 * @customElement
	 * @polymer
	 */
	class DashSchedule extends Polymer.Element {
		static get is() {
			return 'dash-schedule';
		}

		static get properties() {
			return {};
		}

		ready() {
			super.ready();

			onNow.on('change', newVal => {
				this.$.onNowMonitor.innerText = newVal;
			});

			upNext.on('change', newVal => {
				this.$.upNextMonitor.innerText = newVal;
			});
		}

		take() {
			onNow.value = this.$.onNowInput.value || '';
			upNext.value = this.$.upNextInput.value || '';
		}
	}

	customElements.define(DashSchedule.is, DashSchedule);
})();
