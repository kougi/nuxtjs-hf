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
  opacity:0;
  z-index: 11;
  text-transform: uppercase;
}

//Target for stay updated button
h2#subscribe{
    // opacity:0;
    visibility: hidden;
}

section.newsletter{
    margin-top: 10em;
    padding-bottom: 3.5em;
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
            margin: -23px 0 0 0;
            // height:162px;
            max-width: 100%;
            // text-indent: -3px;

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
    display:block;

    &:hover{
        opacity:1;
    }
}

//Change input placeholder colour.
::placeholder{
    color: var(--font-color);
    opacity: 0.3;
}



/* Small only */
@media (max-width: $mobile-breakpoint) {
    section.newsletter{
        padding-bottom:5em;

        margin-top: 5em;

        h3 {
            margin: 0 0 0.2em 0;
        }

        form input:not([type=submit]),h3{
            // text-indent: -5px;
            margin-left: -5px;
        }
    }
    
}
/* Medium and up */
@media (min-width: $mobile-breakpoint) {
    section.newsletter{
        h3{
            height:168px;
            line-height:unset;
        }
        form{
            input:not([type=submit]){

                height:168px;
                }

        }
        form input:not([type=submit]),h3{
            // text-indent: -5px;
            margin-left: -12px;
        }
    }

}

</style>