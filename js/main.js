;(function () {
	
	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#gtco-offcanvas, .js-gtco-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	    	$('.js-gtco-nav-toggle').addClass('gtco-nav-white');

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');
				
	    	}
	    
	    	
	    }
		});

	};

	var formTab = function() {

		$('.tab-menu a').on('click', function(event){
			var $this = $(this),
				data = $this.data('tab');

			$('.tab-menu li').removeClass('active');
			$this.closest('li').addClass('active')

			$('.tab .tab-content-inner').removeClass('active');
			$this.closest('.tab').find('.tab-content-inner[data-content="'+data+'"]').addClass('active');

			event.preventDefault();

		});

	};

	var offcanvasMenu = function() {

		$('#page').prepend('<div id="gtco-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-gtco-nav-toggle gtco-nav-toggle gtco-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#gtco-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#gtco-offcanvas').append(clone2);

		$('#gtco-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#gtco-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});
//comentario

		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-gtco-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;

		// $('.gtco-section').waypoint( function( direction ) {


			$('.animate-box').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
					
					i++;

					$(this.element).addClass('item-animate');
					setTimeout(function(){

						$('body .animate-box.item-animate').each(function(k){
							var el = $(this);
							setTimeout( function () {
								var effect = el.data('animate-effect');
								if ( effect === 'fadeIn') {
									el.addClass('fadeIn animated-fast');
								} else if ( effect === 'fadeInLeft') {
									el.addClass('fadeInLeft animated-fast');
								} else if ( effect === 'fadeInRight') {
									el.addClass('fadeInRight animated-fast');
								} else {
									el.addClass('fadeInUp animated-fast');
								}

								el.removeClass('item-animate');
							},  k * 200, 'easeInOutExpo' );
						});
						
					}, 100);
					
				}

			} , { offset: '85%' } );
		// }, { offset: '90%'} );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var owlCarousel = function(){
		
		var owl = $('.owl-carousel-carousel');
		owl.owlCarousel({
			items: 3,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	],
	     	responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:3
	        }
	    	}
		});


		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	]
		});


		

	};

	

	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".gtco-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#gtco-counter').length > 0 ) {
			$('#gtco-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};


	var dateForm = function() {
		$('#date-start').datepicker();
	};

	var parallax = function() {
		$(window).stellar({
			horizontalScrolling: false,
			hideDistantElements: false, 
			responsive: true

		});
	};


	
	$(function(){
		mobileMenuOutsideClick();
		formTab();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		owlCarousel();
		goToTop();
		loaderPage();
		counterWayPoint();
		dateForm();
		parallax();
	});

}());


const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const nacimiento = document.getElementById("nacimiento");
const email = document.getElementById("email");
const user = document.getElementById("user");
const pais = document.getElementById("pais");
const pass = document.getElementById("pass");

const signButton = document.getElementById("signButton");


signButton.addEventListener("click",()=>{
	var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "userId": user.value,
  "clave": pass.value,
  "email": email.value,
  "nombre": firstname.value,
  "apellido": lastname.value,
  "fechaNac": nacimiento.value,
  "paisResidencia": pais.value,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3000/signUp", requestOptions)
  .then(response => response.json())
  .then(result => window.location.replace("./login.html"))
  .catch(error => console.log('error', error));
})

//imagenes de paquetes turísticos
const pintarPaqTur = async () => {
	const response = await fetch("http://localhost:3000/paquetes-turisticos-index");
	const result = await response.json();
	console.log(result);
	const contenedorPaquetes = document.querySelector(".paquetes");
	
	result.forEach((paquete) => {
		//si el paquete está activo
		if (paquete.activo) {
			//crear un div contenedor
			const container = document.createElement("div");
			container.classList.add("col-lg-4");
			container.classList.add("col-md-4");
			container.classList.add("col-sm-6");

			//crear foto
			const anchor = document.createElement("a");
			// anchor.href = paquete.imgUrl;
			anchor.classList.add("fh5co-card-item");
			anchor.classList.add("image-popup");

			//crear figure tag contenedor
			const figure = document.createElement("figure");

			//crear overlay
			const overlay = document.createElement("div");
			overlay.classList.add("overlay");
			//crear icono
			const icon = document.createElement("i");
			icon.classList.add("ti-plus");

			//unir icono y overlay
			overlay.appendChild(icon);

			//crear imagen responsive
			const imgRes = document.createElement("img");
			imgRes.src = paquete.imgUrl;
			imgRes.classList.add("img-responsive");

			//append overlay e imgRes al figure
			figure.appendChild(overlay);
			figure.appendChild(imgRes);

			//insertar figure en container
			container.appendChild(figure);

			//crear div textual
			const textDiv = document.createElement("div");
			textDiv.classList.add("fh5co-text");

			//crear h2 nombreDestino
			const nombreDestino = document.createElement("h2");
			nombreDestino.textContent = paquete.nombreDestino;

			//crear descripcion p
			const descripcion = document.createElement("p");
			descripcion.textContent = paquete.descripcion;

			//crear boton
			const p = document.createElement("p");
			const span = document.createElement("span");
			span.classList.add("btn");
			span.classList.add("btn-primary");
			span.textContent = "Seleccionar";
			p.appendChild(span);

			//insertar texto al div
			textDiv.appendChild(nombreDestino);
			textDiv.appendChild(descripcion);
			textDiv.appendChild(p);

			//insertar figure y textdiv en anchor
			anchor.appendChild(figure);
			anchor.appendChild(textDiv);

			//insertar anchor en continer
			container.appendChild(anchor);

			//insertar container en contenedorPaquetes
			contenedorPaquetes.appendChild(container);
		}
	});
}

pintarPaqTur();