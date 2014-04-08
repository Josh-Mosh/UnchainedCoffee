//= require jquery
//= require bootstrap/modal
//= require jquery_ujs

io = io.connect('http://localhost:8080', {force_connection: true});

$(document).ready(function(){

// REGISTRATIONS //
	$('.registration').click(function(){
		$('#myModal').modal();
	})

	$(document).on('submit', '.new_user', function(){
		$.post($(this).attr('action'),
		$(this).serialize(),
		function(data){
			if(data == 'success'){
				window.location.replace("/");
			}
			else {
				error_total = data.length-1;
				$('.register_error_div').show();
				$('.register_error_div').html("<p>"+data[0]+"</p><p> + "+ error_total +" other errors</p>");
			}
		});
	    return false;
	})
//	LOGINS //
	$('.login').click(function(){
		$('#loginModal').modal();
	})

	$(document).on('submit', '.session', function(){
		$.post($(this).attr('action'),
		$(this).serialize(),
		function(data){
			if(data == 'success'){
				window.location.replace("/");
			}
			else {
				$('.login_error_div').show();
				$('.login_error_div').html("<p>"+data+"</p>");
			}
		});
	    return false;
	})

	$(document).on('click', '.cancel', function(){
		$('.login_error_div').hide();
		$('.register_error_div').hide();
	})
// MAPSTUFF //
	$(document).on('submit', '.mapsearch', function(){
		var address = $('#address').val();
		codeAddress(address);
		return false;
	});
	   
	$("#maprefresh").submit(function(){
	  	$.post($(this).attr('action'),
		$(this).serialize(),
		function(data){
			$('.shops').html(data);
		});
	    return false;
	});

// FAVORITE STUFF //
	$(document).on('submit', '#new_favorite', function(){
		$.post($(this).attr('action'),
		$(this).serialize(),
		function(data){
			io.emit('new_favorite', data);
		})
		
		$(this).parent().siblings().show();
		$(this).parent().hide();
	    return false;
	})

	/// listens for new favorites being added and appends to activity log ///
	io.on('updated_favorite', function(data){
		$('.show_activities').prepend(data);
	})

	$(document).on('submit', '#delete_favorite', function(){
		$.post($(this).attr('action'),
		$(this).serialize());
		$(this).parent().siblings().show();
		$(this).parent().hide();
	    return false;
	})

	$('.disabled').parent().mouseenter(function(){
		$( this ).tooltip({ show: { effect: "blind", duration: 800 } });
	})

// UPDATES ACTIVITIES WALL WHEN NEW SHOP ADDED //
	io.on('updated_shop', function(data){
		$('.show_activities').prepend(data);
	})

/// PROFILE PAGE STUFF ///
	$(document).on('click', '#edit_profile', function(){
		$(this).hide();
		$('#done_editing_profile').show();
		$('.edit_profile').show();
		$('.profile_info').hide();
	})

	$(document).on('click', '#done_editing_profile', function(){
		$('.edit_user').submit();
		$(this).hide();
		$('#edit_profile').show();
		$('.edit_profile').hide();
		$('.profile_info').show();
	})

	$(document).on('submit', '.edit_user', function(){
		$.post($(this).attr('action'),
		$(this).serialize(),
		function(data){
			console.log(data);
		})
	    return false;
	})

})

