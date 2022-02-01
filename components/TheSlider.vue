<!-- Carousel using Swiperjs -->
<template>
<div class="carousel" >
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :allowTouchMove="true"
    :navigation="true"
    :loop="true"
    :breakpoints="swiperOptions.breakpoints"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
  <!-- Use a foreach loop to use the slides array in order to get all the data for each slide while rendering them -->
    <swiper-slide v-for="slide in slides" :key="slide.id">
        <figure>
            <img  
            :src="slide.image"
            :alt="slide.name"
            >
            <figcaption
            :class="[slide.moreInfo ? 'info' : 'no-info']"
            >
                <div class="row">
                    <div class="col-xs-6 col-md-6">
                        Name: {{slide.name}}
                    </div>
                    <div class="col-xs-6 col-md-6">
                        Availability: [{{slide.availability}}]
                    </div>
                </div>
                <!-- Only load the additional information if it's enabled in the data/backend -->
                <template v-if="slide.moreInfo === 1">
                    <details class="fade-in">
                        <div class="row">
                            <div class="col-xs-6 ">
                                Location: [{{slide.location}}]
                            </div>
                            <div class="col-xs-6">
                                Size: [{{slide.size}}] sqft
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12 col-md-6 col-md-offset-6">
                                <p>
                                    {{slide.description}}
                                </p>
                            </div>
                        </div>

                        <summary>
                            <div class="button open">Read More</div> 
                            <div class="button close">Hide Text</div>
                            <!-- <button @click="toggle">{{buttonToggle ? 'Read More' : 'Hide Text'}}</button> -->
                        </summary>
                    </details>
                </template><!-- End v-if -->
            </figcaption>
        </figure>
    </swiper-slide>

  </swiper>
</div>

</template>
<script>
  // Import Swiper Vue.js components
  import {Navigation} from 'swiper';
  import {Swiper,SwiperSlide} from 'swiper/vue';
  import {gsap} from "gsap";

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  export default {
  	data() {
  		return {
  			buttonToggle: false,
  			//Breakpoints for Swiper
  			swiperOptions: {
  				breakpoints: {
  					1024: {
  						allowTouchMove: false,
  					},
  					navigation: {
  						nextEl: ".swiper-button-next",
  						prevEl: ".swiper-button-prev"
  					}
  				}
  			},
  			//Array of slides for the slideshow, "more info" section can be disabled by setting moreInfo
  			//Currently using absolute addresses for images due to vercel issue. usual path: assets/img/carousel-images/x.jpg
  			//https://jbeach.xyz/hf-challenge/assets/img/carousel-images/
  			slides: [{
  				id: 1,
  				image: "https://jbeach.xyz/hf-challenge/assets/img/carousel-images/c1.jpg",
  				moreInfo: 1,
  				name: "Sample Title",
  				availability: "Now",
  				location: "Soho",
  				size: "4,200",
  				description: "Quam eos premqui tem cupta il inimet as rerum rent volum sitibus idunt la consenis ea nos doluptur, ipsapernates praeperrunte nobist peditaquis eum audaecto quam, susa consecae isto eum fugit "
  			}, {
  				id: 2,
  				image: "https://jbeach.xyz/hf-challenge/assets/img/carousel-images/c2.jpeg",
  				moreInfo: 1,
  				name: "Lorem Ipsum",
  				availability: "Soon",
  				location: "Eastend",
  				size: "4,700",
  				description: "This is a description"
  			}, {
  				id: 3,
  				image: "https://jbeach.xyz/hf-challenge/assets/img/carousel-images/c3.jpeg",
  				moreInfo: 1,
  				name: "Etcetera",
  				availability: "TBA",
  				location: "Southend",
  				size: "3,200",
  				description: "This is a description"
  			}, {
  				id: 4,
  				image: "https://jbeach.xyz/hf-challenge/assets/img/carousel-images/c4.jpeg",
  				moreInfo: 1,
  				name: "Office",
  				availability: "Later",
  				location: "Camden",
  				size: "7,400",
  				description: "This is a description. Testing"
  			}, {
  				id: 5,
  				image: "https://jbeach.xyz/hf-challenge/assets/img/carousel-images/c5.jpeg",
  				moreInfo: 0,
  				name: "Together",
  				availability: "N/A",
  				location: "Notting Hil",
  				size: "6,100",
  				description: "This is a description. Testing"
  			}, ],
  		}
  	},
  	methods: {},

  	components: {
  		Swiper,
  		SwiperSlide,
  	},

  	setup() {
  		const onSwiper = (swiper) => {
  			// console.log(swiper);
  		};
  		const onSlideChange = () => {
  			//When the slide is changed, check if the <details> panel is open on the slideshow and close it if it is.
  			document.body.querySelectorAll('details')
  				.forEach((e) => (e.hasAttribute('open')) ? e.removeAttribute('open') : e.setAttribute('close', false))
  		};
  		return {
  			onSwiper,
  			onSlideChange,
  			modules: [Navigation],
  		};
  	},

  	mounted() {
  		//Open a <details> on page load  so that it adds the correct height to the page with GSAP's smooth scroll 
  		// document.body.querySelectorAll('details').forEach((e) => (e.hasAttribute('open')) ? e.removeAttribute('open') : e.setAttribute('open',false))
  		//Make custom cursor when hovering over carousel.
  		https: //codepen.io/GreenSock/pen/WNNNBpo
  			gsap.set("#cursor-swiper", {
  				xPercent: -50,
  				yPercent: -50
  			});
  		const cursor = document.querySelector("#cursor-swiper");
  		const pos = {
  			x: window.innerWidth / 2,
  			y: window.innerHeight / 2
  		};
  		const mouse = {
  			x: pos.x,
  			y: pos.y
  		};
  		const speed = 0.35;
  		const xSet = gsap.quickSetter(cursor, "x", "px");
  		const ySet = gsap.quickSetter(cursor, "y", "px");
  		gsap.set(cursor, {
  			opacity: 0
  		})

  		function mousemoveFunction(e) {
  			mouse.x = e.x;
  			mouse.y = e.y;
  		}

  		function tickerUpdate() {
  			var dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
  			pos.x += (mouse.x - pos.x) * dt;
  			pos.y += (mouse.y - pos.y) * dt;
  			xSet(pos.x);
  			ySet(pos.y);
  		}
  		// Hide/show custom cursor when hovering over carousel
  		var swiperContainer = document.querySelector(".swiper");
  		swiperContainer.onmouseenter = function() {
  			swiperContainer.addEventListener("mousemove", mousemoveFunction);
  			gsap.ticker.add(tickerUpdate)
  			gsap.to(cursor, {
  				opacity: 1
  			})
  		}
  		swiperContainer.onmouseleave = function() {
  			swiperContainer.removeEventListener("mousemove", mousemoveFunction);
  			gsap.ticker.remove(tickerUpdate)
  			gsap.to(cursor, {
  				opacity: 0
  			})
  		}
  		// Test whether the cursor should be set to Next or Previous depending on side being hovered.
  		let prevButton = document.querySelector('.swiper-button-prev');
  		let nextButton = document.querySelector('.swiper-button-next');

  		//Define the container for the cursor's text
  		let cursorContainer = document.getElementById("cursor-text");

  		// Give appropriate height to Swiper's next/previous buttons so that they match the height of an image in the carousel.
  		var swiperHeight = document.querySelector(".swiper figure>img").offsetHeight;

  		prevButton.style.height = `${swiperHeight}px`;
  		nextButton.style.height = `${swiperHeight}px`;

  		//Change the cursor to "Next" 
  		nextButton.addEventListener("mouseenter", function(event) {
  			cursorContainer.innerHTML = "Next";
  			// console.log('next');
  		}, false);

  		//Change the cursor to "Previous"
  		prevButton.addEventListener("mouseenter", function(event) {
  			cursorContainer.innerHTML = "Previous";
  			// console.log('previous');
  		}, false);

  		//Hide cursor when hovering over figure caption (office information)
  		document.querySelectorAll('figcaption')
  		.forEach(fig => {
  			fig.addEventListener('mouseover', () => {
  				cursorContainer.innerHTML = "";
  			});
  		});

  		// Play animation when clicking navigation directions
  		// Bounce effect on click
  		// Next button
  		nextButton.addEventListener("click", function(event) {
  			cursorContainer.classList.add("next-button-animation");
  			setTimeout(function() {
  				cursorContainer.classList.remove("next-button-animation");
  			}, 300);
  		}, false);

  		// Previous button
  		prevButton.addEventListener("click", function(event) {
  			cursorContainer.classList.add("prev-button-animation");
  			setTimeout(function() {
  				cursorContainer.classList.remove("prev-button-animation");
  			}, 300);
  		}, false);
          
  		//Get the height of the <details> elements so that we can properly animate it
        //https://codepen.io/stoumann/pen/ExydEYL
  		function setDetailsHeight(selector, wrapper = document) {
  			const setHeight = (detail, open = false) => {
  				detail.open = open;
  				const rect = detail.getBoundingClientRect();
  				detail.dataset.width = rect.width;
  				detail.style.setProperty(open ? `--expanded` : `--collapsed`, `${rect.height}px`);
  			}
  			const details = wrapper.querySelectorAll(selector);
  			const RO = new ResizeObserver(entries => {
  				return entries.forEach(entry => {
  					const detail = entry.target;
  					const width = parseInt(detail.dataset.width, 10);
  					if (width !== entry.contentRect.width) {
  						detail.removeAttribute('style');
  						setHeight(detail);
  						setHeight(detail, true);
  						detail.open = false;
  					}
  				})
  			});
  			details.forEach(detail => {
  				RO.observe(detail);
  			});
  			// console.log("<detail> height refreshed")
  		}

  		/* Run it */
  		setDetailsHeight('details');
  	}, //mounted
  };
</script>


<style lang="scss">;

/* ---------------------------------------------------------------------
  Global styles for carousel
_______________________________________________________________________*/
.carousel {
	overflow: hidden;
	width: 100%;
	margin: 0 auto;
	position: relative;
	//For the carousel, I'm using HTML's <figure> element with <figcaption> for the office information. This keeps it semantic too, along with the <details> element.
	figure {
		margin: 0;
		img {
			width: 100%;
			max-width: 100%;
		}
	}
	figcaption {
		z-index: 15;
		position: relative;
		p {
			margin: 10px 0;
		}

		div.row {
			margin-right: 0;
			margin-left: 0;
			> div {
				padding: 0.7em 0;
					
			}
			//Bottom Border effect on the Carousel details
			> div:not(.col-md-offset-6) {
				border-bottom: solid 1px var(--font-color);

                &:first-child {
						//Line gap between columns
						flex-basis: 49%;
						margin-right: 1%;
					}
			}

			//Create a psuedo element which acts as a line at the bottom, so that it can be animated with the opening of the <details> element
			&:last-child:before {
				background: #736457;
				content: "";
				position: absolute;
				left: 0;
				right: 0;
				bottom: 1px;
				height: 1px;
			}
		}

		//Use custom styles if this carousel item doesn't have additional information
		&.no-info {
			.row {
                >div{
                    border-bottom: unset !important;
                }
				&:last-child:before {
					background: var(--font-color);
					content: "";
					position: absolute;
					left: 0;
					right: 0;
					bottom: -1px;
					height: 1px;
				}
			}
		}

		//Hide underline on first row of Carousel information
		> div.row {
			&:first-child > div {
				// border-bottom-color: transparent;
			}
		}
	}

	// "READ MORE" Buttons, using HTML <details>
	//Toggle visibility of info on the carousel when opened.
	details {
		position: relative;
		border-bottom: solid 1px var(--font-color);
		top: -1px;
		height: var(--collapsed);
		// transition: height 300ms cubic-bezier(0.4, 0.01, 0.165, 0.99);
		transition: height 600ms cubic-bezier(0.345, 0.115, 0.135, 1.42);
		// transform 500ms cubic-bezier(.345,.115,.135,1.42),opacity 150ms ease-out,border-color 200ms ease-out
		.row {
			opacity: 0;
		}
		//Container for the Read More/Hide Text buttons
		summary {
			display: block;
			cursor: pointer;
			position: absolute;
			bottom: 0;
			left: 0;
			border: unset;
			bottom: -1.3em;
			div.button {
				&:before {
					display: none;
				}
			}
			margin-top: -1px;
		}
		//open/close buttons
		.close {
			display: none;
		}
		.open {
		}

		//The <details> element is toggled open
		&[open] {
			height: var(--expanded);
			div.row {
				> div {
				}
			}

			//toggle the Read More/Hide Text buttons
			.open {
				display: none;
			}
			.close {
				display: block;
			}
		}
	}
}

// Hide defaults
summary::marker {
	display: none;
}
summary::-webkit-details-marker {
	display: none;
}

.swiper {
	width: 100%;
	//Put padding at bottom for the More/Less info buttons to rest
	padding-bottom: 5em;
}
.swiper-button-next,
.swiper-button-prev {
	color: var(--background-color);
}

// custom cursor, only visible when hovering over carousel.
#cursor-swiper {
	opacity: 0;
	pointer-events: none;
	background-size: contain;
	mix-blend-mode: difference;
	z-index: 10;
	position: fixed;
	top: 0;
	left: 0;
	font-size: 3em;
	color: #fff;
}

//____ End global styles   //__________________________________________


/* Mobile only
--------------------------------------------------------------------- */
@media (max-width: $mobile-breakpoint) {
	:root {
		--swiper-navigation-size: 20px;
	}
	#cursor-swiper {
		display: none;
	}

	.swiper-button-next,
	.swiper-button-prev {
		top: 2em;
		font-size: 0.4em;
	}

	.carousel {

        figcaption{
            div.row{
                //Bottom Border effect on the Carousel details
			    > div:not(.col-md-offset-6) {
                    // white-space: nowrap;
				    border-bottom: solid 1px var(--font-color);
                    &:first-child {
						//Line gap between columns
						flex-basis: 48%;
						margin-right: 2%;
					}
			    }
            }
        }
		details[open] {
			// padding-bottom: 1.1em;
			p {
				margin: 0;
			}
		}

		figcaption.no-info {
			.row {
				> div:last-child,
				&:last-child {
					border-bottom: unset;
				}
			}
		}
		details summary {
			bottom: -1.8em;
		}
	}
}
//____ End mobile   //_______________________________________________


/* Large screens (desktop, tablet landscape)
--------------------------------------------------------------------- */

@media (min-width: $large-breakpoint) {
	// For desktop, make the Next/Previous swiper buttons take up 100% height and 50% width of either side.
	.carousel {
		.swiper-button-prev,
		.swiper-button-next {
			width: 50%;
			height: 80%;
			top: 0;
			margin: 0;
			transition: cursor 0.3s;
			cursor: none;

			&::after {
				display: none;
			}
		}

		.swiper-button-prev {
			left: 0;
		}

		.swiper-button-next {
			right: 0;
		}

		//Give borders to the columns of the carousel's item descriptions.
		figcaption {
			div.row {
				> div {
					
				}
                
			}
			&.no-info {
				.row {
					> div.col-md-6,
					&:last-child {
						border-bottom: unset;
					}
				}
			}
		}
	}
}
// End large screens


</style>