<!-- Page footer -->
<template>
    <footer id="site-footer">
        <div class="row">
            <div class="col-xs-12 col-md-6">
                <a href="#">
                    <!-- <img src="https://jbeach.xyz/hf-challenge/assets/img/thirdway.svg" class="logo" alt="Thirdway"> -->
                    <img src="~/assets/img/thirdway.svg" class="logo" alt="Thirdway">
                    </a>
            </div>
            <nav class="col-xs-12 col-md-6">
                <ul>
                    <li><a href="#">Terms and Conditions</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Cookie Policy</a></li>
                    <li><a href="#">Accessibility</a></li>
                </ul>
            </nav>
        </div>
    </footer>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  name: 'TheFooter',

created() {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
  },
  mounted(){

    //Animate the footer into view when the user reaches the bottom of the page
    gsap.set('footer#site-footer', {
        yPercent: 100,
        y: 0
    });
    gsap
    .timeline({
        scrollTrigger: {
        trigger: '.newsletter',
        // start: 'bottom bottom',
        // start: 'top-=400 top',
        start: 'bottom bottom ',
        end: () => `bottom bottom-=20`,
        // markers: true,
        // scrub: true,
        toggleActions: 'play none reverse none'
        }
    })
    .to('footer#site-footer', {
        yPercent: 0,
        duration: 0.4
    });

  },

        methods: {
        },
}
</script>



<style lang="scss">;


/* General footer styles
--------------------------------------------------------------------- */
footer#site-footer {
	padding: 1em var(--site-padding) 1em var(--site-padding);
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	width: calc(100vw - var(--site-padding));
	transform: translateY(100%);

    nav ul {
        display: flex;
        justify-content: space-around;
        a{
            display:block;
        }
    }
}

//____ End general styles   //________________________


/* Small to tablet sizes
--------------------------------------------------------------------- */
@media (max-width: $tablet-breakpoint) {
	footer#site-footer {
		// padding: 1em 0 1em 0;
		.logo {
			max-width: 120px;
			opacity: 0.6;
			margin-bottom: 1.4em;
		}
		nav.col-xs-12 {
			padding: 0;
			ul {
				justify-content: flex-start;

				li {
					margin-right: 0.7em;
				}
			}
		}
	}
}

// A few tweaks specific for tablets
@media (max-width: $tablet-breakpoint) and (min-width: $mobile-breakpoint) {
	footer#site-footer {
		img {
			display: block;
			margin: 0 auto;
		}
		.logo {
			max-width: 200px;
		}
		a {
			font-size: 1.4em;
		}

		nav.col-xs-12 {
			ul {
				justify-content: space-evenly;
			}
		}
	}
}
//____ End mobile styles   //________________________


/* Medium and up
--------------------------------------------------------------------- */
@media (min-width: $medium-breakpoint) {
	footer#site-footer {
		nav {
			ul {
				margin-top: 9px;
			}
		}
		a {
		}
	}
}

</style>