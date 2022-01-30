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

<!-- class="gs_reveal gs_reveal_fromLeft" -->

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
      <!-- No office. Leaving blank, but could be personalised message too -->
       <template v-else>
        <br>
        </template>
    <!-- This is a new modal footer. -->
  </template>
</SubscribtionModal>

</template>

<script>

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { defineEmit } from 'vue'
// const emit = defineEmit(['selected'])
// const onEmit = (data) => console.log(data)
// import SubscribtionModal from "./SubscribtionModal.vue";
//    v-show="showModal" 

export default {
  name: 'NewsletterSubscribe',

//   components: {
//       SubscriptionModal,
//     },

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
      document.body.appendChild(document.querySelector('.modal-backdrop'));
  },

 methods: {
     //Prevent default when the form is submitted, so that we can show a modal window with a confirmation.
    //  formSubmit() {
    //   console.log('form submitted');
    // },

    //Check if all fields of the form have been filled out, if they have, show a modal window with a confirmation
    checkForm(){
        //Are fields filled out?
        if (this.fullName && this.emailAddress) {
            console.log("form submitted successfully")
            // Show the modal
            this.isModalVisible = true;
            //Hide errors if form is valid
            this.errors = [];

			document.querySelector("#fname").classList.remove("required");
			document.querySelector("#email").classList.remove("required");
            return true;
        }

        this.errors = [];

        //Add errors to the array which will then be displayed within the page
        if (!this.fullName) {
            this.errors.push('Enter a name.');

			// let fName = document.querySelector("fname");
			document.querySelector("#fname").classList.add("required");
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

    //Functions for showing/hiding the form submit modal.
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
            // border-bottom: solid 1px transparent;

            // outline: 1px dashed transparent;
            // outline-offset: 10px;

			text-decoration: underline 3px rgba(255, 255, 255, 0) ;
    			transition: text-decoration-color 500ms cubic-bezier(0.104, 0.204, 0.492, 1), opacity 300ms ease-out;
				text-underline-position: from-font;
				    &:focus{
						outline: none;
						text-decoration: underline 3px  var(--font-color) ;
					}

			&:hover {
				opacity: 1;
			}
		}
		label {
			display: none;
		}
	}
}

section.newsletter h2, #stay-updated {
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


// form rows, animated underline when selecting <input>
.form-row{
	position: relative;
	&:before{
        content: "";
        transition: transform 0.5s cubic-bezier(0.104, 0.204, 0.492, 1);
        position: absolute;
        display: block;
        height: 1px;
        background: var(--font-color);
        bottom: -1px;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        width: 100%;
        right: 0;
        transform: scale(0, 1);
        transform-origin: left;
    }
	// Is the <input> inside of the row currently focused? If so, we want an animated underline
	&:focus-within {
		&:before{
				// transform: scale(1,1);
			}
	}
}


//Change input placeholder colour.
::placeholder {
	color: var(--font-color);
	opacity: 0.3;
}

/* Small only */
@media (max-width: $mobile-breakpoint) {
	section.newsletter {
		padding-bottom: 20em;
		margin-top: 1em;

		h2#subscribe {
			visibility: visible;
		}
		h3 {
			margin: 0 0 0.2em 0;
		}

		form input:not([type="submit"]),
		h3 {
			// text-indent: -5px;
			margin-left: 0px;
			margin-bottom: 0;
			// font-size:2em;
			font-size:47px;
			
		}
		form input:not([type="submit"]) {
			    margin-top: 0px;
				// background: red;
				margin-top: 5px;
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
/* Medium and up */
@media (min-width: $mobile-breakpoint) {
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

			input.required{
				text-decoration: underline 3px red ;
			}
		}
		form input:not([type="submit"]),
		h3 {
			// text-indent: -5px;
			margin-left: -12px;
		}
	}

    // Form validation
    .errors-container {
        position: absolute;
        right: 10em;
        bottom: 0;
    }
}


</style>