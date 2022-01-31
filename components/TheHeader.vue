<!-- Page Header -->
<template>
<header id="site-header">
    <div class="row">
        <div class="col-xs-3 col-md-3 col-lg-6">
            <div class="logo-container">
                <a href="#">
                    <img src="~/assets/img/txo_logo.svg" class="logo" alt="TXO">
                </a>
            </div>
        </div>

        <!-- Company information / mobile nav drawer -->
        <CompanyInfo />


    </div>
</header>
</template>

<script>

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

/* General header styles
--------------------------------------------------------------------- */
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
	// transform: scale(3) translatey(100vh);
	// opacity:0;

	img {
		opacity: 0;
		max-width: 80px;
		animation: fadeIn 3s;
		animation-delay: 300ms;
        animation-fill-mode: forwards;
		transition-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
		
	}
}

//____ End general styles   //________________________


/* Mobile only
--------------------------------------------------------------------- */
@media (max-width: $mobile-breakpoint) {

}

//____ End mobile styles   //________________________


/* Medium and up
--------------------------------------------------------------------- */
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

// Tablets
@media (max-width: $tablet-breakpoint) {
	.contact-container {
		padding-right: 1em;
	}
}


</style>