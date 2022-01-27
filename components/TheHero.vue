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

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  name: 'TheHero',


        mounted() {
        //register plugins
        gsap.registerPlugin(ScrollTrigger);


        // //Is the user on mobile?
        // const isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));

        // //If on mobile, set the hero to fixed so that we can animate it outside of the smoothscroll container
        // if (isMobile) {
        //     console.log('mobile');
        //     heroMobile();
        // }
        // .appendChild(document.querySelector('.hero'));
        



        // function heroMobile(){
        //     // console.log("APP height "+this.$root.context.app.height+"")
        //     document.body.appendChild(document.querySelector('.hero'));

        //         var heroTimeline = gsap.timeline({
        //         scrollTrigger: {
        //         invalidateOnRefresh: true,
        //         markers: false,
        //         // trigger: "header",
        //         trigger: ".hero-headline",
        //         pin: false,
        //         scrub: true,
        //         // start: "+=0",
        //         start: "top bottom",
        //         //  start: () => start,
        //         // start: "+=0",
        //         //update view height value on refresh
        //         // end: () => "bottom bottom+=500",
        //         endTrigger: '.carousel',
        //         end: "+=1000",
        //          pinSpacing: false,
        //         // end: () => "bottom bottom -=600",
        //         // end: () =>  `+=${(viewport.clientHeight  - headerHeightOffset)}`,
        //         onRefresh: () => {
        //             console.log('Refreshed');
        //             //  ScrollTrigger.update();
        //         }
        //         // onRefresh: killScrub
                    
        //         }
        //         });
        //         heroTimeline
        //             .clear()
        //             //Use CSS' view height to position the logo at the bottom of the page
        //             // .fromTo(".logo-container", { transform: `translateY(calc(100vh - var(--header-height) * 1.6)) scale(3)` }, { transform: 'translateY(0px) scale(1)'  }, "0" )
                  
                  
        //           .fromTo
        //           (".hero-headline", { 
        //                 // scale: 3,
        //                 opacity:1,
        //                 // y: () => `${(viewport.clientHeight  - headerHeightOffset - headerHeightOffset)}`,
        //                 y: () => `100vh`,
        //                 }, 
        //                 { 
        //                  y: 0,
        //                 scale: 1,
        //                 }, "0")
        //             //Change opacity of header's side menu and hero as user scrolls down
        //             .fromTo(".hero-paragraph", 
        //             { y: 600, 
        //             scale:0,}, 
        //             { y: 0, 
        //             scale: 1 }, 
        //             "0" )
        //             // .fromTo("section.hero", { opacity: 0 }, { opacity: 1  }, "0" )
        //             // .fromTo("#stay-updated", { opacity: 0 }, { opacity: 1  }, "0" )
        //             ;


        // }

            





   
        } //mounted

}



</script>



<style lang="scss">;

section.hero{
    // background: red;
    // padding: 20px;
    // margin-top: 100vh;
    margin-bottom: 5em;
    // margin-top: 100vh;
    
    
    h1{
        // Font-size: 144px;
        // Line-height: 138px;
        // Letter-spacing: -0.05em;
        margin-bottom: 0.5em;
    }
    h2{
        margin-top:1em;
        text-transform: uppercase;
        // font-size: 1.5rem;
        font-size:1.2em;

    }
    p{
        margin:0.5em 0 0 0;
    }
}

.hero-headline{
    // margin-right: 6%;
}
//Content after header/hero animations
.below-fold{
    background-color: var(--background-color);
}
/* Small only */
@media (max-width: $mobile-breakpoint) {

    .row{
        margin:0;
        >div{
            padding:0;
        }
    }
    section.hero{

        padding: var(--header-height) var(--site-padding) 0 var(--site-padding);


        // height: 110vh;
        position:fixed;
        margin:0;
        height:100vh;
        width: 100vw;
        top:0;
        left:0;
        h1{
            // position: absolute;
            top:50px;
        }
    }

    .hero-text-container{
        // background:green;
        // position: absolute;
    }
    .hero-paragraph{
        // margin-top: 200px;
        // transform: translateY(100%);
        // position: absolute;
    }


}
</style>