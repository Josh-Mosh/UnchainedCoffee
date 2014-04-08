//= require jquery
//= require jquery_ujs

io = io.connect('http://localhost:8080', {force_connection: true});

$(document).ready(function(){

	$(document).on('submit', '.new_shop', function(){
		$.post($(this).attr('action'),
		$(this).serialize(),
		function(data){
			$('body').animate({
				   scrollTop: $('body').offset().top
				});
			if(data == "success")
			{
				io.emit('new_shop', data);
				$(".new_shop_success").fadeIn();
			}
			else
			{
				error_total = data.length-1;
				$(".new_shop_error_div").fadeIn();
				$('.new_shop_error_div').html("<p>"+data[0]+"</p><p> + "+ error_total +" other errors</p><button class='clear btn btn-danger'>Clear</button>");
			}
		})
		
		return false;
	})

	$('.add_another').click(function(){
		$(".new_shop_success").fadeOut();
		$('.new_shop input').val(' ');
		$('input').val(' ');
		return false;
	})

	$(document).on('click', '.clear', function(){
		$('.new_shop_error_div').fadeOut();
	})

});