let id = 1;
let active = 1;
let activeblock;
let activearray = [];

//
// Main
//

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

	InitActiveArray();
	InitProgress();

	UpdateActivePage(1);
}

//
// Initer
//

function InitProgress() {
	let progress = document.getElementsByClassName("main-progress");

	if (progress.length <= 0) return;

	progress = progress[0];

	for (let i = 1; i <= id; i++) {
		progress.insertAdjacentHTML(
			"beforeend",
			"<button class='btn' onClick='UpdateActivePage(" +
				i +
				")' disabled>" +
				i +
				"</button>"
		);
	}
}

function InitActiveArray() {
	for (let i = 0; i < id; i++) {
		activearray[i] = false;
	}
}

//
// Buttons
//

function ButtonActiveNext() {
	active = Math.min(++active, id);
	UpdateActivePage(active);
}

function ButtonActivePrev() {
	active = Math.max(--active, 0);
	UpdateActivePage(active);
}

function ButtonActiveFinish() {
	let finish = document.getElementById("form-finish");
	finish.classList.remove("d-none");

	let progress = document.getElementsByClassName("main-progress")[0];
	let buttons = document.getElementsByClassName("main-button")[0];
	progress.classList.add("d-none");
	buttons.classList.add("d-none");

	for (let i = 1; i <= id; i++) {
		let item = document.getElementById("form" + i);
		item.classList.add("d-none");
	}
}

//
// Update active
//

function UpdateActivePage(num) {
	active = Math.max(0, Math.min(num, id));
	activeblock = document.getElementById("form" + num);
	document.getElementById("form-finish").classList.add("d-none");

	for (let i = 1; i <= id; i++) {
		let item = document.getElementById("form" + i);
		i == num ? item.classList.remove("d-none") : item.classList.add("d-none");
	}

	CheckButton();
	CheckCurrentPage();
}

function UpdateActiveStateRadio(inputs) {
	let state = false;

	for (let i = 0; i < inputs.length; i++) {
		if (inputs[i].checked) {
			state = true;
			break;
		}
	}

	return state;
}

function UpdateActiveStateInput(input) {
	return input.value > 0;
}

//
// Checker
//

function CheckCurrentPage() {
	let inputtype = activeblock.querySelectorAll("input");
	let textareatype = activeblock.querySelectorAll("textarea");

	if (inputtype.length <= 0 && textareatype.length <= 0) return;

	let type =
		(inputtype.length > 0 ? inputtype[0].getAttribute("name") : "") ||
		(textareatype.length > 0 ? textareatype[0].getAttribute("name") : "");

	switch (type) {
		case "radio" + active:
			activearray[active] = UpdateActiveStateRadio(inputtype);
			break;

		case "check" + active:
			activearray[active] = UpdateActiveStateRadio(inputtype);
			break;

		case "input" + active:
			activearray[active] = UpdateActiveStateInput(inputtype[0]);
			break;

		case "textarea" + active:
			activearray[active] = UpdateActiveStateInput(textareatype[0]);
			break;
	}

	let casenext;
	let buttonnext = document.getElementById("button-next");
	let buttonfinish = document.getElementById("button-finish");

	active >= id ? (casenext = buttonfinish) : (casenext = buttonnext);

	activearray[active]
		? casenext.removeAttribute("disabled")
		: casenext.setAttribute("disabled", "");
}

function CheckButton() {
	let prev = document.getElementById("button-prev");
	let casenext;
	let next = document.getElementById("button-next");
	let finish = document.getElementById("button-finish");

	if (active >= id) {
		finish.classList.remove("d-none");
		next.classList.add("d-none");

		casenext = finish;
	} else {
		finish.classList.add("d-none");
		next.classList.remove("d-none");

		casenext = next;
	}

	active <= 1
		? prev.setAttribute("disabled", "")
		: prev.removeAttribute("disabled");
}

MainForm();
