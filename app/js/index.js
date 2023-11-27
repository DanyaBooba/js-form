let id = 1;
let active = 1;

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
	console.log("C: " + active);
}

MainForm();
