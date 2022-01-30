<!-- Page Header -->
<template>
<header id="site-header">
    <div class="row">
        <div class="col-xs-3 col-md-3 col-lg-6">
            <div class="logo-container">
                <a href="#">
                    <img src="~/assets/img/txo_logo.svg" class="logo" alt="TXO">
                    <!-- <img src="https://jbeach.xyz/hf-challenge/assets/img/txo_logo.svg" class="logo" alt="TXO"> -->
                    
                </a>
            </div>
        </div>

        <!-- Company information / mobile nav drawer -->
        <CompanyInfo />


    </div>
</header>
</template>

<script>

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  name: 'TheHeader',

  mount(){
  }
//   data() {
//         return {
//             isOpen: false
//         }
//     }
}
</script>



<style lang="scss">;
header#site-header {
	position: fixed;
	z-index: 2;
	top: 0;
	left: 0;
	width: 100%;
	// Use a variable for the header's height as we can then tie it to media queries
	height: var(--header-height);
	background: var(--background-color);
}


// Logo
.logo-container {
	padding: 10px;
	position: absolute;
	top: 5px;
	transform-origin: left;

	// To prevent logo jankiness on initial load
	transform: scale(3) translatey(100vh);
	// opacity:0;

	img {
		opacity: 0;
		max-width: 80px;
		animation: fadeIn 3s;
		animation-delay: 300ms;
		// animation-iteration-count: 1;
		transition-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
		animation-fill-mode: forwards;
	}
}


/* Small only */
@media (max-width: $mobile-breakpoint) {

}

/* Medium and up */
@media (min-width: $medium-breakpoint) {
	.logo-container {
		padding: 20px;
		margin-left: 20px;
		opacity: 0;
		// top: 0;
		img {
			// transform-origin: left;
			max-width: 170px;
			padding-top: 3px;
		}
	}
}

// Tablets{}
@media (max-width: $tablet-breakpoint) {
	.contact-container {
		padding-right: 1em;
	}
}

/* Medium only */
@media (min-width: 40em) and (max-width: 63.9375em) {
}

// Large screens
@media (min-width: $medium-breakpoint) {
}

/* Extra large */
@media (min-width: 100em) {
}

/* Large only */
@media (min-width: 64em) and (max-width: 74.9375em) {
}

</style>