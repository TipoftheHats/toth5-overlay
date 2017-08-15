(function () {
	'use strict';

	const totalDisplay = document.getElementById('total');
	const total = nodecg.Replicant('total');
	total.on('change', newVal => {
		totalDisplay.innerText = newVal.formatted;
	});

	const toast = document.getElementById('toast');
	const update = document.getElementById('update');
	update.addEventListener('click', () => {
		update.setAttribute('disabled', 'true');
		nodecg.sendMessage('updateTotal', (err, updated) => {
			update.removeAttribute('disabled');

			if (err) {
				console.error(err.message);
				toast.show('Error updating total. Check console.');
				return;
			}

			if (updated) {
				console.info(`[${nodecg.bundleName}] Total successfully updated`);
				toast.show('Successfully updated total.');
			} else {
				console.info(`[${nodecg.bundleName}] Total unchanged, not updated`);
				toast.show('Total unchanged, not updated.');
			}
		});
	});

	const totalInput = nodecg.getDialogDocument('edit-total').getElementById('input');
	document.getElementById('edit').addEventListener('click', () => {
		totalInput.value = total.value.raw;
	});
})();
