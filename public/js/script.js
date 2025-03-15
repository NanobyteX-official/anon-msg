document.addEventListener("DOMContentLoaded", function() {
	const form = document.getElementById("emailForm");
	const emailInput = document.getElementById("email");
	const message = document.getElementById("confirmationMessage");

	form.addEventListener("submit", async function(event) {
		event.preventDefault();

		const email = emailInput.value.trim();

		if(!validateEmail(email)) {
			message.innerHTML = "Please enter a valid email address";
			message.style.color = "red";
			return;
		}

		message.innerHTML = "Submitting...";
		message.style.color = "#f1c40f";

		try{
			const response = await fetch("https://api.brevo.com/v3/contacts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"api-key": "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"
				},
				body: JSON.stringify({
					email: email,
					listIds: [3]
				})
			});

			if(response.ok) {
				message.innerHTML = "Successfully subscribed!";
				message.style.color = "green";
				emailInput.value = "";
			} else {
				message.innerHTML = "Error subscribing. Try again.";
				message.style.color = "red";
			}
		} catch (error) {
			message.innerHTML = "Network error. Check your connection!";
			message.style.color = "red";
		}
	});

	function validateEmail(email) {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}
});