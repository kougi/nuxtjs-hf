<!-- Please remove this file from your project -->
<template>
    <section class="newsletter" >
        <h2 id="subscribe">Stay Updated</h2>
        <form 
        id="subscription-form"
        @submit.prevent="checkForm"
        method="post"
        >
            <h3>Newsletter</h3>
        <template v-if="errors.length">
             <div class="errors-container gs_reveal" >
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </div>
            </template>
			<!-- Form rows. gs_reveal causes an animation only on desktop. -->
			<div class="form-row gs_reveal gs_reveal_fromLeft">
				<label for="fname">Full Name</label>
				<input type="text" id="fname" name="fname" v-model="fullName" placeholder="Full Name" maxlength="25" >
			</div>

			<div class="form-row gs_reveal gs_reveal_fromLeft">
				<label for="cname">Company Name</label>
				<input type="text" id="cname" name="cname" v-model="companyName"  placeholder="Company Name" maxlength="25">
			</div>
			
			<div class="form-row gs_reveal gs_reveal_fromLeft">
				<label for="email">Email Address</label>
				<input type="email" id="email" name="email" v-model="emailAddress"  placeholder="Email Address" maxlength="25">
            </div>

			<div class="form-row-submit gs_reveal gs_reveal_fromLeft">
				<input 
					type="submit" 
					value="Submit" 
					class="submit"
				>
            </div>
            
        </form>
    </section>

	<!-- Modal window for confirming form details when submitted -->
    <SubscribtionModal
  	v-show="isModalVisible"
  	@close="closeModal"
	>
		<template v-slot:header>
			Thank you for your interest,<br>
			<strong>{{ fullName }}</strong>.
		</template>

		<template v-slot:body>
			We'll keep you updated at: <br>
			<em>{{ emailAddress }}</em>
		</template>

		<template v-slot:footer>
			<!-- Check if company name was entered -->
			<template v-if="companyName">
				We look forward to working with<br>
				<strong>{{companyName}}</strong><br>
				in the future
			</template>
			<!-- No company name entered. Leaving blank, but could be personalised message too -->
			<template v-else>
				<br>
				</template>
			<!-- This is a new modal footer. -->
		</template>
</SubscribtionModal>

</template>

<script>
export default {
  name: 'NewsletterSubscribe',

    data() {
        return {
            // showModal: false,
            isModalVisible: false,
            //User's details when they subscribe
            fullName: null,
            companyName: null,
            emailAddress: null,
            errors: [],
        };
    },

  mounted(){
	//Move the modal container to the body, so that the Fixed positioning works correctly   
    document.body.appendChild(document.querySelector('.modal-backdrop'));
	//Close <details> if it's open when the user clicks on an <input>
	var inputs = document.querySelectorAll('section.newsletter input');
	for(var i=0,len=inputs.length;i<len;i++){
		inputs[i].addEventListener('focus',function(){
			document.body.querySelectorAll('details').forEach((e) => (e.hasAttribute('open')) ? e.removeAttribute('open') : e.setAttribute('close', false))
		})
	}

	//Dynamic Form Label for showing green underline when text is entered into a text field.
	const input = document.querySelectorAll('.form-row input');

	input.forEach(function(el) {
		el.addEventListener('input', function(e) {
			if (e.target.value == "") {
			e.target.classList.remove('valid')
			} else {
			e.target.classList.add('valid')
			}

		});
	});
  }, //mounted

 methods: {
    //Check if all fields of the form have been filled out, if they have, show a modal window with a confirmation
    checkForm(){
        //Are fields valid?
        if (this.fullName && this.emailAddress) {
            console.log("form submitted successfully")
            // Show the modal
            this.isModalVisible = true;
            //Hide errors if form is valid
            this.errors = [];

			//If the form goes through correctly, remove the "required" red underline class on the <input>s
			document.querySelector("#fname").classList.remove("required");
			// document.querySelector("#fname").classList.add("valid");
			document.querySelector("#email").classList.remove("required");
            return true;
        }

        this.errors = [];

        //Add errors to the array which will then be displayed within the page
        if (!this.fullName) {
            this.errors.push('Enter a name.');

			// let fName = document.querySelector("fname");
			document.querySelector("#fname").classList.add("required");
        }else{
			document.querySelector("#fname").classList.add("valid");
		}
        // if (!this.companyName) {
        //     this.errors.push('Company name required');
        // }
        if (!this.emailAddress) {
            this.errors.push('Please enter an Email address.');
			document.querySelector("#email").classList.add("required");
        }

        // e.preventDefault();
    },

		//Functions for showing/hiding the confirmation modal on form submission.
		showModal() {
			this.isModalVisible = true;
			console.log('show modal')
		},
		closeModal() {
			this.isModalVisible = false;
			console.log('hide modal')
		}

    }
}
</script>



<style lang="scss">;

/* Global newsletter subscribtion form styles
--------------------------------------------------------------------- */

// Fixed anchor link to jump to newsletter subscribe form
#stay-updated {
	position: fixed;
	bottom: 30px;
	left: var(--site-padding);
	padding: 0px;
	opacity: 0;
	z-index: 11;
	text-transform: uppercase;
}

//Target for stay updated button
h2#subscribe {
	// opacity:0;
	visibility: hidden;
}

section.newsletter {
	margin-top: 10em;
	padding-bottom: 10em;
	h3 {
		margin: 0;
	}
	.form-row {
		position: relative;
	}
	form {
		position: relative;

		//Text inputs
		input:not([type="submit"]) {
			background: transparent;
			border: none;
			padding: 0;
			opacity: 0.7;
			margin: -23px 0 0 0;
			text-decoration: underline 3px rgba(255, 255, 255, 0);
			transition: text-decoration-color 500ms cubic-bezier(0.104, 0.204, 0.492, 1),
				opacity 300ms ease-out;
			text-underline-position: from-font;
			&:focus {
				outline: none;
				text-decoration: underline 3px var(--font-color);
			}

			&:hover {
				opacity: 1;
			}
		}
		// Red underline if form field invalid
		input.required {
			text-decoration: underline 3px red;
		}
		input.valid {
			text-decoration: underline 3px #2e6c25;
		}
		label {
			display: none;
		}
	}
}

section.newsletter h2,
#stay-updated {
	font-size: 1.2em;
	text-transform: uppercase;
}

input[type="submit"] {
	opacity: 0.3;
	height: unset;
	background: transparent;
	border: none;
	padding: 0;
	margin-top: 1em;
	display: block;
	cursor: pointer;

	&:hover {
		opacity: 1;
	}
}

// Container for form errors
.errors-container {
	ul {
		padding-top: 0.3em;
	}
	li {
		list-style-type: disc;
		list-style-position: inside;
		padding-left: 0.5em;
		font-style: italic;
	}
}

//Change input placeholder colour.
::placeholder {
	color: var(--font-color);
	opacity: 0.3;
}

//____ End global Newsletter subscribtion form styles   //______________


/* Small/mobile only
--------------------------------------------------------------------- */

// Tall phones
@media (max-width: $thin-tall-mobile-breakpoint) {
}

//Normal phones
@media (max-width: $mobile-breakpoint) {
	section.newsletter {
		padding-bottom: 20em;
		margin-top: 1em;
		// min-height:100vh;
		h2#subscribe {
			visibility: visible;
		}
		h3 {
			margin: 0 0 0.2em 0;
		}

		form input:not([type="submit"]),
		h3 {
			margin-left: -3px;
			margin-bottom: 0;
		}
		form input:not([type="submit"]) {
			margin-top: 0px;
			line-height: normal;
			// Limit width of the form Inputs so that it doesn't cause horizontal scrolling
			max-width: calc(100vw - var(--site-padding) - var(--site-padding));
		}
	}
	// Form validation
	.errors-container {
		padding: 1em 0;
	}

	#stay-updated {
		display: none;
	}
}


//____ End small/mobile only   //_______________________________________


/* Medium and up
--------------------------------------------------------------------- */
@media (min-width: $medium-breakpoint) {
	section.newsletter {
		h3 {
			height: 168px;
			line-height: unset;
		}
		form {
			// Inputs which aren't the submit button
			input:not([type="submit"]) {
				height: 168px;
			}
		}
		form input:not([type="submit"]),
		h3 {
			margin-left: -11px;
		}
	}

	// Form validation
	.errors-container {
		position: absolute;
		right: 10em;
		bottom: 0;
	}
}

// high end tablets in landscape
@media 
  (max-device-width: 1280px) 
  and (orientation: landscape) { 

    section.newsletter form input:not([type=submit]),section.newsletter h3{
		height: unset;
	}
		h2#subscribe {
			visibility: visible !important;
		}
		#stay-updated{
			display: none;
		}
  }
//____ End medium and up  //___________________________________________


</style>