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


// Send email
const btn = document.querySelector('#sendEmail')
btn.addEventListener('click', () => {
	Email.send({
		SecureToken : "C973D7AD-F097-4B95-91F4-40ABC5567812",
		To : 'ianmat55@gmail.com',
		From : "you@isp.com",
		Subject : "This is the subject",
		Body : "And this is the body"
	});
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
			element.value = company;
		} else if (element.name == 'sendEmail') {
			element.value = sendEmail;
		} else if (element.name == 'range') {
			element.value = range;
		}
	};
	document.getElementById("criteria").submit();
};

// if (localStorage) {
// 	const checkEmpty = document.getElementById('noListings');
// 	if (checkEmpty.textContent != 'No listings to show') {
// 		getStorage();
// 	}
// }

function setStorage() {
	let formElements = document.querySelector('#criteria').elements;
	let company = [];
	let data = {};
	for (const element of formElements) {
		if (element.name == 'company') {
			company.push(element.value);
		} else if (element.name.length > 0) {
			data[element.name] = element.value;
		}
	};
	data['company'] = company;

	localStorage.setItem('data', JSON.stringify(data));
};



