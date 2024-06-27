var productList = {};

var typeObj = document.querySelector("#type");
var versionObj = document.querySelector("#version");
var editionObj = document.querySelector("#edition");
var downloadURL = document.querySelector("#download");

fetch("/downloads/products.json").then(function (data) {
  return data.json().then(function (products) {
    productList = products;
    // Normally we'd use constants, but Firefox <51 doesn't work right with the way we use them, so use variables.
    for (var i in products) {
      typeObj.append(new Option(i, i));
    }
  });
});

function updateVersions() {
	var versionOptions = document.querySelectorAll("#version option");
        // ditto
	for (var i=0; i<versionOptions.length; i++) {
		if (!i.disabled) i.remove();
	}

	document.querySelector("#version option[value='placeholder']").selected = true;
        // ditto
	for (var i in productList[typeObj.value]) {
		versionObj.append(new Option(i, i));
	}

	updateEditions();
};

function updateEditions() {
	var editionOptions = document.querySelectorAll("#edition option");
	for (var i=0; i<editionOptions.length; i++) {
		if (!i.disabled) i.remove();
	}

	document.querySelector("#edition option[value='placeholder']").selected = true;

	for (var i in productList[typeObj.value][versionObj.value]) {
		editionObj.append(new Option(i, i));
	}

	updateURL();
};

function updateURL() {
	if (typeObj.value && versionObj.value && editionObj.value) {
		var url = productList[typeObj.value][versionObj.value][editionObj.value];
		downloadURL.href = url;
	} else {
		downloadURL.removeAttr("href");
		downloadURL.disabled = true;
	}
};