<!-- Headline/hero -->
<template>
<section class="hero">
    <div class="hero-text-container">
        <div class="row hero-headline">
            <div class="col-xs-12 col-md-11">
                <h1>We’re hands-on and committed to evolving your business to strive for better.</h1>
            </div>

        </div>
        <div class="row hero-paragraph">
            <div class="col-xs-12 col-md-6 col-md-offset-5">
                <h2>Our Offering</h2>
                <p>We provide physical, pragmatic and personal 
                    business guidance. Success is never static. 
                    Neither are we. We’ll be your business partners 
                    for positive change.
                </p>
            </div>
        </div>
    </div>
</section>
</template>

<script>

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  name: 'TheHero',


        mounted() {
        //register plugins
        // gsap.registerPlugin(ScrollTrigger);
        } //mounted

}



</script>



<style lang="scss">;


/* General styles for hero
--------------------------------------------------------------------- */
section.hero {
	margin-bottom: 6em;

	h1 {
		margin-bottom: 0.5em;
	}
	h2 {
		margin-top: 1em;
		text-transform: uppercase;
		font-size: 1.2em;
	}
	p {
		margin: 0.5em 0 0 0;
	}
}

.hero-headline {
}

//____ End general styles   //________________________________________


/* Mobile only
--------------------------------------------------------------------- */
@media (max-width: $mobile-breakpoint) {
	.row {
		margin: 0;
		> div {
			padding: 0;
		}
	}

	section.hero {
		// padding: var(--header-height) var(--site-padding) 0 var(--site-padding);
		margin-bottom: 3em;
		h2 {
			margin-top: 0;
		}
		.hero-headline h1 {
			// margin-bottom: -3.7em;
            margin-bottom: 1em;
		}
	}

	.hero-text-container {
	}
	

    // If mobile detected via JS
    body.mobile section.hero {
		.hero-headline h1 {
			margin-bottom: -3.7em;
		}
        .hero-paragraph {
		    opacity: 0;
	    }
	}
}
//____ End mobile styles   //_____________________________________________

/* Medium and up
--------------------------------------------------------------------- */
@media (min-width: $medium-breakpoint) {
	section.hero 
    {
        margin-bottom: 7em;
        h2{
        // margin-top: 0;
            margin-top: 2em;
        }
    }
}

</style>