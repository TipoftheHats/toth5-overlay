(function () {
	const brbShowing = nodecg.Replicant('brbShowing');
	const mainShowing = nodecg.Replicant('mainShowing');

	/**
	 * @customElement
	 * @polymer
	 */
	class DashMaster extends Polymer.Element {
		static get is() {
			return 'dash-master';
		}

		static get properties() {
			return {};
		}

		ready() {
			super.ready();

			brbShowing.on('change', newVal => {
				if (newVal) {
					this.$['brb-show'].setAttribute('disabled', 'true');
					this.$['brb-hide'].removeAttribute('disabled');
				} else {
					this.$['brb-show'].removeAttribute('disabled');
					this.$['brb-hide'].setAttribute('disabled', 'true');
				}
			});

			mainShowing.on('change', newVal => {
				if (newVal) {
					this.$['main-show'].setAttribute('disabled', 'true');
					this.$['main-hide'].removeAttribute('disabled');
				} else {
					this.$['main-show'].removeAttribute('disabled');
					this.$['main-hide'].setAttribute('disabled', 'true');
				}
			});
		}

		showBrb() {
			brbShowing.value = true;
		}

		hideBrb() {
			brbShowing.value = false;
		}

		showMain() {
			mainShowing.value = true;
		}

		hideMain() {
			mainShowing.value = false;
		}
	}

	customElements.define(DashMaster.is, DashMaster);
})();
