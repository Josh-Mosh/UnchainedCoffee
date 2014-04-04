		
$(document).ready(function(){

	$('.registration').click(function(){
		$('#user_info').attr("class", "inactive");
		$(this).parent().attr("class", "active");
		$('.login').parent().attr("class", "inactive");
		$('#myModal').modal({remote: 'register.html'});
	})

	$('.login').click(function(){
		$(this).parent().attr("class", "active");
		$('.registration').parent().attr("class", "inactive");
		$('#user_info').attr("class", "inactive");
		$('#registration').attr("class", "inactive");

		$('#loginModal').modal({remote: 'login.html'});
	})

})