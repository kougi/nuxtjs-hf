<!-- Please remove this file from your project -->
<template>
    <section class="newsletter">
        <h2 id="subscribe">Stay Updated</h2>
        <form>
            <h3>Newsletter</h3>
            <label for="fname">Full Name</label>
            <input type="text" id="fname" name="fname" placeholder="Full Name" maxlength="20">

            <label for="cname">Company Name</label>
            <input type="text" id="cname" name="cname" placeholder="Company Name" maxlength="20">

            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Email Address" maxlength="20">
            
            <input type="submit" value="Submit" class="submit">
        </form>
    </section>
</template>

<script>

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default {
  name: 'NewsletterSubscribe',

  mounted(){
    //   gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

//             var scrollSunTl = gsap.timeline();
// scrollSunTl.to('#stay-updated', {
//   scrollTrigger: {
//     trigger: '.newsletter',
//     start: 'top 100%-=40', // which means "when the top of the trigger hits 40px above the bottom of the viewport
//    // end: 'bottom 50%',
//     toggleActions: "play none none reset",
//     markers: true,
//   },
//   position:'absolute', // new
//   top:10 // new 
// });
  },

}

    

</script>



<style lang="scss">;

// Fixed anchor link to jump to newsletter subscribe form
#stay-updated{
  position: fixed;
  bottom: 30px;
  left: var(--site-padding);
  padding:0px;
  //  background:red;
  z-index: 11;
  // font-size:1.5em;
  text-transform: uppercase;
}

//Target for stay updated button
h2#subscribe{
    // opacity:0;
    visibility: hidden;
}

section.newsletter{
    margin-top: 10em;
    padding-bottom: 10em;
    h3{
        margin:0;
    }
    .form-row{
        position: relative;
    }
     h3{
        // height:162px;
        // line-height:unset;
    }
    form{
        input:not([type=submit]){
            background: transparent;
            border: none;
            padding: 0;
            opacity: 0.7;
            margin: -20px 0 0 0;
            // height:162px;

            &:focus{
                outline: none;
            }
            &:hover{
                opacity:1;
            }
        }
       label {
       display: none;
        }
    }
}
section.newsletter h2, #stay-updated{
        font-size:1.2em;
        text-transform: uppercase;
        // padding-left: 13px;
    }

input[type=submit]{
    opacity: 0.3;
    height:unset;
    background: transparent;
    border: none;
    padding: 0;
    margin-top:1em;

    &:hover{
        opacity:1;
    }
}

//Change input placeholder colour.
::placeholder{
    color: #d5d0cd;
}



/* Small only */
@media (max-width: 39.9375em) {
    section.newsletter{
        
    }
}
/* Medium and up */
@media (min-width: 40em) {
    section.newsletter{
        h3{
            height:162px;
            line-height:unset;
        }
        form{
            input:not([type=submit]){

                height:162px;
                }

        }
    }

}

</style>