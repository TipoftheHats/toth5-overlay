(function () {
	const texts = nodecg.Replicant('texts');
	const lowerthirdShowing = nodecg.Replicant('lowerthirdShowing');
	const lowerthirdPulsing = nodecg.Replicant('lowerthirdPulsing');

	/**
	 * @customElement
	 * @polymer
	 */
	class DashLowerthird extends Polymer.Element {
		static get is() {
			return 'dash-lowerthird';
		}

		static get properties() {
			return {};
		}

		ready() {
			super.ready();

			lowerthirdShowing.once('declared', () => {
				lowerthirdPulsing.on('change', newVal => {
					if (lowerthirdShowing.value && newVal) {
						this.$.hide.setAttribute('disabled', 'true');
					} else {
						this.$.hide.removeAttribute('disabled');
					}
				});
			});

			lowerthirdShowing.on('change', newVal => {
				if (newVal) {
					this.$.show.setAttribute('disabled', 'true');
					this.$.seven.setAttribute('disabled', 'true');
					this.$.fifteen.setAttribute('disabled', 'true');
					this.$.thirty.setAttribute('disabled', 'true');
					this.$.hide.removeAttribute('disabled');
				} else {
					this.$.show.removeAttribute('disabled');
					this.$.seven.removeAttribute('disabled');
					this.$.fifteen.removeAttribute('disabled');
					this.$.thirty.removeAttribute('disabled');
					this.$.hide.setAttribute('disabled', 'true');
				}
			});
		}

		show() {
			this.take();
			lowerthirdShowing.value = true;
		}

		hide() {
			lowerthirdShowing.value = false;
		}

		take() {
			texts.value = {
				title: this.$.title.value,
				body: this.$.body.value
			};
		}

		pulse(e) {
			this.take();
			nodecg.sendMessage('pulseLowerthird', parseInt(e.target.getAttribute('data-duration'), 10));
		}
	}

	customElements.define(DashLowerthird.is, DashLowerthird);
})();
