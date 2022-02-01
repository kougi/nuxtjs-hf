<template>
    <aside class="col-xs-9 col-md-9 col-lg-6 company-details">
        <!-- Hamburger icon for mobile -->
        <div class="hamburger">
            <!-- Uses a checkbox to toggle styles between closed and open -->
            <input type="checkbox" @click="isOpen = !isOpen"/>
            <span></span>
            <span></span>
            <span></span>
        </div>


        <div 
            class="contact-container"
            :class="{hidden: !isOpen}">
            <div class="contact">
                <h4>Enquiries</h4>
                <div>
                    <!-- 2 columns for the contact info, which are rows on mobile -->
                    <div class="col">
                        <h5>General</h5>
                        <span class="line"><a href="tel:+44002036134733">+44 (0) 020 3613 4733</a></span>
                        <span class="line"><a href="mailto:info@txowork.com">Info@txowork.com</a></span>

                    </div>
                    <div class="col">
                        <h5>Sales</h5>
                        <span class="line"><a href="tel:+44002036134733">+44 (0) 020 3613 4733</a></span>
                        <span class="line"><a href="mailto:info@txowork.com">Info@txowork.com</a></span>
                    </div>
                </div>
            </div>
            <address>
                <h4>Address</h4>
                <p>
                    Morelands<br>
                    5-23 Old Street<br>
                    London EC1V 9HL
                </p>
            </address>
            <!-- Social media -->
            <div class="connect">
                <h4>Connect</h4>
                <ul>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">LinkedIn</a></li>
                    <li><a href="#">Facebook</a></li>
                </ul>
            </div>
        </div>
    </aside>
</template>

<script>
  export default {
      name: 'CompanyInfo',

    data() {
        return {
            isOpen: false,
        };
    },
      methods: {
    },

}
</script>


<style scoped lang="scss">;

/* Global company info styles for header
--------------------------------------------------------------------- */
// Contact, Address and menu section in header
aside.company-details {
	opacity: 0;
	top: 0;
	right: 0;
	padding-top: 20px;
	padding-right: 20px;

	h4 {
		text-transform: uppercase;
		margin: 0 0 0.5em 0;
	}
	h5 {
		margin: 0;
		font-size: 1em;
	}
	p {
		margin: 0;
	}
	address {
		font-style: unset;
	}
	a {
		display: inline-block;
	}
}
.contact-container {
	display: flex;
	animation: fadeIn 0.4s ease-out;
}


// Hamburger icon
.hamburger {
	right: 0;
	padding: 10px 10px;
	position: absolute;
	//Center vertically in header
	top: 50%;
	transform: translateY(-50%);
	-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
	> span {
		width: 30px;
		height: 2px;
		background-color: var(--font-color);
		display: block;
		margin-top: 10px;
		transition: all 0.3s ease-in-out;
		&:nth-child(2) {
			margin-top: 0;
		}
	}

	&:hover {
		cursor: pointer;
	}

	input {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transform-origin: center;
		cursor: pointer;

		opacity: 0; 
		z-index: 2; 

		-webkit-touch-callout: none;

		//Change css for the hamburger's <span> lines if checkbox is pressed. This is an alternative to using Javascript for the same effect
		&:checked ~ span {
			&:nth-child(2) {
				transform: translateY(12px) rotate(45deg);
			}

			&:nth-child(3) {
				// Middle bar turns transparent
				opacity: 0;
			}
			&:nth-child(4) {
				transform: translateY(-12px) rotate(-45deg);
			}
		}
	}
}


//____ End general Company Info styles   //________________________________________


/* Small only
--------------------------------------------------------------------- */
@media (max-width: $mobile-breakpoint) {
    	aside.company-details {
		h4 {
			font-size: 1.2em;
		}
		h5,
		a,
		address p {
			font-size: var(--fs-annotation-text);
			line-height: 19px;
			letter-spacing: 0em;
		}
	}
	.contact {
		br {
			display: none;
		}
	}
	// Container for contact information on mobile
	.contact-container {
		flex-direction: column;
		width: 100vw;
		left: 0;
		top: var(--header-height);
		padding: 1em;
		position: absolute;
		background: var(--background-color);
		height: calc(100vh - var(--header-height));
		padding-top: 3em;

		// Add lines to divide contact sections on mobile
		> * {
			border-top: solid 1px var(--font-color);
			padding: 2em 0px;

			&:last-child {
				border-bottom: solid 1px var(--font-color);
			}
		}
	}

	.contact {
		.col:nth-child(1) {
			padding-bottom: 1em;
		}
	}
}


// for tablets/mobile in Landscape
@media only screen and (min-width: 500px) and (max-width: 855px) and (orientation: landscape){
  .hamburger {
		// display: none;
	}
    // .contact-container {
	// 	display: flex !important;
	// 	flex-direction: row;
	// 	justify-content: space-around;
    //     }
}

//____ End small only   //________________________________________

/* Medium and up
--------------------------------------------------------------------- */
@media (min-width: $tablet-breakpoint) {
    // Hide hamburger icon on medium and larger screens
    .hamburger {
		display: none;
	}
	.contact-container {
		display: flex !important;
		flex-direction: row;
		justify-content: space-around;
		gap: 1em;
		padding: 0 1em;
		padding-right: 110px;
	}
}

// Large screens
@media (min-width: $tablet-breakpoint) {
	.contact {
		//CSS for Enquiries columns on desktop
		> div {
			display: flex;
			.col {
				display: flex;
				flex-direction: column;
				&:nth-child(1) {
					padding-right: 40px;
				}
			}
		}
	}
}
//____ End medium and up   //________________________________________

</style>