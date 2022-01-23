<!-- Please remove this file from your project -->
<template>
<section class="hero">
    <div class="row hero-headline">

        <div class="col-xs-11">

            <h1>We’re hands-on and committed to evolving your business to strive for better.</h1>
        </div>

    </div>

    
    <div class="row">
        <div class="col-xs-12 col-md-6 col-md-offset-5">
            <h2>Our Offering</h2>
            <p>We provide physical, pragmatic and personal 
                business guidance. Success is never static. 
                Neither are we. We’ll be your business partners 
                for positive change.
            </p>
        </div>
    </div>
</section>
</template>

<script>

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  name: 'TheHero',


        mounted() {
            // gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
            // var scrollSunTl = gsap.timeline();
            // scrollSunTl.to('#stay-updated', {
            // scrollTrigger: {
            //     trigger: '.newsletter',
            //     start: 'top 100%-=40', // which means "when the top of the trigger hits 40px above the bottom of the viewport
            // // end: 'bottom 50%',
            //     toggleActions: "play none none reset",
            //     markers: true,
            // },
            // position:'absolute', // new
            // top:10 // new 
            // });
        }

}



</script>



<style lang="scss">;

section.hero{
    // background: red;
    // padding: 20px;
    // margin-top: 100vh;
    margin-bottom: 5em;
    
    
    h1{
        // Font-size: 144px;
        // Line-height: 138px;
        // Letter-spacing: -0.05em;
        margin-bottom: 0.5em;
    }
    h2{
        margin-top:1em;
        text-transform: uppercase;
        font-size: 1.5rem;
    }
    p{
        margin:0.5em 0 0 0;
    }
}

.hero-headline{
    // margin-right: 6%;
}
</style>