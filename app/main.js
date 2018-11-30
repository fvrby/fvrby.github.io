$(document).ready(function(){
	var imgItems = $('.slider li').length; // Slides a agregar
	var imgPos = 1;
    //js que controla los slides**
	// Agrega pagina
	for(i = 1; i <= imgItems; i++){
		$('.pagination').append('<li><span class="fa fa-circle"></span></li>');
	} 

	$('.slider li').hide(); // ocultan slides
	$('.slider li:first').show(); // Muestra 1r slide
	$('.pagination li:first').css({'color': '#Pink'}); //Estilo de pagina

	// Ejecutan funciones
	$('.pagination li').click(pagination);
	$('.right span').click(nextSlider);
	$('.left span').click(prevSlider);

	setInterval(function(){
		nextSlider();
	}, 4000);

	// Funciones

	function pagination(){
		var paginationPos = $(this).index() + 1; // Posicion de pagina 

		$('.slider li').hide(); // Ocultan Slides
		$('.slider li:nth-child('+ paginationPos +')').fadeIn(); // Muestra slide

		// Estilo De pagina
		$('.pagination li').css({'color': '#858585'});
		$(this).css({'color': '#CD6E2E'});

		imgPos = paginationPos;

	}

	function nextSlider(){
		if( imgPos >= imgItems){imgPos = 1;} 
		else {imgPos++;}

		$('.pagination li').css({'color': '#858585'});
		$('.pagination li:nth-child(' + imgPos +')').css({'color': '#CD6E2E'});

		$('.slider li').hide(); // Ocultan Slides
		$('.slider li:nth-child('+ imgPos +')').fadeIn(); // Muestra slide

	}

	function prevSlider(){
		if( imgPos <= 1){imgPos = imgItems;} 
		else {imgPos--;}

		$('.pagination li').css({'color': '#858585'});
		$('.pagination li:nth-child(' + imgPos +')').css({'color': '#CD6E2E'});

		$('.slider li').hide(); // Ocultan Slides
		$('.slider li:nth-child('+ imgPos +')').fadeIn(); // Muestra slide
	}

});
