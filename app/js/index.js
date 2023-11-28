let id = 1;
let active = 1;
let activeblock;

function MainForm() {
	while (1) {
		let find = document.getElementById("form" + id);

		if (!find) {
			id--;
			break;
		} else {
			id++;
			find.classList.add("d-none");
		}
	}

	SetActiveId(1);
}

function SetActiveId(num) {
	active = Math.max(0, Math.min(num, id));
	activeblock = document.getElementById("form" + num);
	for (let i = 1; i <= id; i++) {
		let item = document.getElementById("form" + i);
		i == num ? item.classList.remove("d-none") : item.classList.add("d-none");
	}

	CheckButton();
	CheckCurrentPage();
}

function ActiveNext() {
	active = Math.min(++active, id);
	SetActiveId(active);
}

function ActivePrev() {
	active = Math.max(--active, 0);
	SetActiveId(active);
}

function CheckButton() {
	let prev = document.getElementById("button-prev");
	let next = document.getElementById("button-next");

	active <= 1
		? prev.setAttribute("disabled", "")
		: prev.removeAttribute("disabled");

	active >= id
		? next.setAttribute("disabled", "")
		: next.removeAttribute("disabled");
}

function CheckCurrentPage() {
	let inputtype = activeblock.querySelectorAll("input");
	let textareatype = activeblock.querySelectorAll("textarea");

	if (inputtype.length <= 0 && textareatype.length <= 0) return;

	let type =
		(inputtype.length > 0 ? inputtype[0].getAttribute("name") : "") ||
		(textareatype.length > 0 ? textareatype[0].getAttribute("name") : "");

	switch (type) {
		case "radio" + active:
			console.log("radio");
			break;

		case "check" + active:
			console.log("check");
			break;

		case "input" + active:
			console.log("input");
			break;

		case "textarea" + active:
			console.log("textarea");
			break;
	}
}

MainForm();
