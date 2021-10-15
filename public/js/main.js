
$(function() {
	$("#addMore").click(function(e) {
		e.preventDefault();
		$("#fieldList").append("<li>&nbsp;</li>");
		$("#fieldList").append("<input type='text' name='company' class='company' />");
	});
});

