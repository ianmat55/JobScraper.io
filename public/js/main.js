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

for(let i=start; i<=end; i+=step){
  rangeValue.innerHTML += '<div>'+i+'</div>';
}
rangeInput.addEventListener("input",function(){
  let top = parseFloat(rangeInput.value)/step * -40;
  rangeValue.style.marginTop = top+"px";
});

// Send email
const btn = document.querySelector('#sendEmail')
btn.addEventListener('click', () => {
	Email.send({
		SecureToken : "C973D7AD-F097-4B95-91F4-40ABC5567812",
		To : 'them@website.com',
		From : "you@isp.com",
		Subject : "This is the subject",
		Body : "And this is the body"
	}).then(
	  message => alert("Email successfully sent")
	);
});