let productList = {};

const typeObj = document.querySelector("#type");
const versionObj = document.querySelector("#version");
const editionObj = document.querySelector("#edition");
const downloadURL = document.querySelector("#download");

fetch("./products.json").then(data => data.json().then(products => {
	productList = products;
        // Normally we'd use constants, but Firefox <51 doesn't work right with the way we use them, so use variables.
	for (var i in products) {
		typeObj.append(new Option(i, i));
	}
}));

const updateVersions = () => {
	const versionOptions = document.querySelectorAll("#version option");
        // ditto
	for (var i of versionOptions) {
		if (!i.disabled) i.remove();
	}

	document.querySelector("#version option[value='placeholder']").selected = true;
        // ditto
	for (var i in productList[typeObj.value]) {
		versionObj.append(new Option(i, i));
	}

	updateEditions();
};

const updateEditions = () => {
	let editionOptions = document.querySelectorAll("#edition option");
	for (let i of editionOptions) {
		if (!i.disabled) i.remove();
	}

	document.querySelector("#edition option[value='placeholder']").selected = true;

	for (let i in productList[typeObj.value][versionObj.value]) {
		editionObj.append(new Option(i, i));
	}

	updateURL();
};

const updateURL = () => {
	if (typeObj.value && versionObj.value && editionObj.value != "placeholder") {
		const url = productList[typeObj.value][versionObj.value][editionObj.value];
		downloadURL.href = url;
	} else {
		downloadURL.removeAttribute("href");
		downloadURL.disabled = true;
	}
};