// add excluded company names
$(function() {
	$("#addMore").click(function(e) {
		e.preventDefault();
		$("#fieldList").append("<li>&nbsp;</li>");
		$("#fieldList").append("<input type='text' name='company' class='company' />");
	});
});

// Range selector
const rangeInput = document.querySelector(".range-input input");
const rangeValue = document.querySelector(".range-input .value div");

const  start = parseFloat(rangeInput.min);
const end = parseFloat(rangeInput.max);
const step = parseFloat(rangeInput.step);

for(let i=start; i<=end; i+=step) {
	rangeValue.innerHTML += '<div>'+i+'</div>';
};

rangeInput.addEventListener("input",function() {
let top = parseFloat(rangeInput.value)/step * -40;
rangeValue.style.marginTop = top+"px";
});

// local storage
function getStorage(){
	let formElements = document.querySelector('#criteria').elements;
	const { position, location, company, range, sendEmail } = JSON.parse(localStorage.data);
	for (const element of formElements) {
		if (element.name == 'position') {
			element.value = position;
		} else if (element.name == 'location') {
			element.value = location;
		} else if (element.name == 'company') {
			// how to set multiple inputs
			element.value = company;
		} else if (element.name == 'sendEmail') {
			// checkbox not checking
			if (sendEmail = 'on') {
				document.getElementById('sendEmail').checked = true;
			} else {
				document.getElementById('sendEmail').checked = false;
			}
			element.value = sendEmail;
		} else if (element.name == 'range') {
			element.value = range;
			// changes displayed slider range val
			let top = parseFloat(element.value)/step * -40;
			rangeValue.style.marginTop = top+"px";
		} 
	};
};

// if (localStorage) {
// 	const checkEmpty = document.getElementById('noListings');
// 	if (checkEmpty.textContent != 'No listings to show') {
// 		getStorage();
// 	}
// }

function setFormStorage() {
	let formElements = document.querySelector('#criteria').elements;
	let company = [];
	let data = {};
	for (const element of formElements) {
		if (element.name == 'company') {
			company.push(element.value);
		} else if (element.name == 'sendEmail') {
			if (document.getElementById('sendEmail').checked) {
				data[element.name] = 'on';
			} else {
				data[element.name] = undefined;
			}
		} else {
			data[element.name] = element.value;
		}
	};
	data['company'] = company;

	localStorage.setItem('data', JSON.stringify(data));
};

function setListingStorage() {

};



