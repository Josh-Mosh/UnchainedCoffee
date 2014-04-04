//= require jquery
//= require jquery_ujs

io = io.connect('http://localhost:8080', {force_connection: true});

$(document).ready(function(){

	$(document).on('submit', '.new_shop', function(){
		$.post($(this).attr('action'),
		$(this).serialize(),
		function(data){
			io.emit('new_shop', data);
		})
		$(".new_shop_success").fadeIn();
		$('body').animate({
		   scrollTop: $('body').offset().top
		});
		return false;
	})

	$('.add_another').click(function(){
		$(".new_shop_success").hide();
		return false;
	})

});