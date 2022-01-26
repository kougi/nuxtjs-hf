
<template>
    <TheHeader />
    <!-- Create a container for the viewport to utilize ScrollTrigger and give smooth scrolling -->
		<div id="viewport">
			<div id="content">
        <TheHero />
        <!-- <div class="below-fold"> -->
          <p><b>DEBUG: </b> The window width and height are respectively {{width}}, {{height}}</p>
          <TheSlider />
          <NewsletterSubscribe />
          <TheFooter />
        <!-- </div> -->
     </div>
    </div>

    <div id="cursor-swiper"></div>
    <a href="#subscribe" id="stay-updated" class="anchor">Stay Updated</a>

</template>

<script>


//import { defineComponent } from '@vue/composition-api';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


export default {

  //Use vue to get window size
data() {
    return {
      height: 0,
      width: 0,
      logoTimelineLoaded: 0,
    };
  },

  created() {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  },

  mounted() {
    //Default window size
    this.height =  window.innerHeight;
    this.width =  window.innerWidth;


    //Is the user on mobile?
    const isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));

    //Listen for window resizing, only if not mobile
    if (!isMobile) {
      window.addEventListener("resize", this.resizeHandler);
      console.log('desktop')
    }

    // Trigger resize event if on mobile and switching between landscape/portrait
    // window.addEventListener("orientationchange", this.resizeHandler);
    screen.orientation.addEventListener('change', this.resizeHandler)


    
    //Add smooth scrolling the website
    smoothScroll("#content");
      
    // Check if link is an anchor link to the same page.
    function getSamePageAnchor (link) {
      if (
        link.protocol !== window.location.protocol ||
        link.host !== window.location.host ||
        link.pathname !== window.location.pathname ||
        link.search !== window.location.search
      ) {
        return false;
      }

      return link.hash;
    }

    // Scroll to a given hash, preventing the event given if there is one
    function scrollToHash(hash, e) {
      const elem = hash ? document.querySelector(hash) : false;
      if(elem) {
        if(e) e.preventDefault();
        gsap.to(window, {
          scrollTo:{
            y:elem,
            offsetY:headerHeightOffset
          },
          });
      }
    }

      // If a link's href is within the current page, scroll to it instead
      document.querySelectorAll('a[href]').forEach(a => {
        a.addEventListener('click', e => {
          scrollToHash(getSamePageAnchor(a), e);
        });
      });

      // Scroll to the element in the URL's hash on load
      scrollToHash(window.location.hash);

      //Run the resize handler on initial load
      this.resizeHandler()


      // this is the helper function that sets it all up. Pass in the content <div> and then the wrapping viewport <div> (can be the elements or selector text). It also sets the default "scroller" to the content so you don't have to do that on all your ScrollTriggers.
      // This function was found at: https://codepen.io/GreenSock/pen/gOgWELo 
      function smoothScroll(content, viewport, smoothness) {
      content = gsap.utils.toArray(content)[0];
      smoothness = smoothness || 1;

      gsap.set(viewport || content.parentNode, {overflow: "hidden", position: "fixed", height: "100%", width: "100%", top: 0, left: 0, right: 0, bottom: 0});
      gsap.set(content, {overflow: "visible", width: "100%"});

      let getProp = gsap.getProperty(content),
        setProp = gsap.quickSetter(content, "y", "px"),
        setScroll = ScrollTrigger.getScrollFunc(window),
        removeScroll = () => content.style.overflow = "visible",
        killScrub = trigger => {
          let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
          scrub && scrub.kill();
          trigger.animation.progress(trigger.progress);
          // console.log("Scrub killed");
        },
        height, isProxyScrolling;

      function refreshHeight() {
        height = content.clientHeight;
        content.style.overflow = "visible"
        document.body.style.height = height + "px";
        return height - document.documentElement.clientHeight;
      }

      ScrollTrigger.addEventListener("refresh", () => {
        removeScroll();
        requestAnimationFrame(removeScroll);
      })
      ScrollTrigger.defaults({scroller: content});
      ScrollTrigger.prototype.update = p => p; // works around an issue in ScrollTrigger 3.6.1 and earlier (fixed in 3.6.2, so this line could be deleted if you're using 3.6.2 or later)

      ScrollTrigger.scrollerProxy(content, {
        scrollTop(value) {
          if (arguments.length) {
            isProxyScrolling = true; // otherwise, if snapping was applied (or anything that attempted to SET the scroll proxy's scroll position), we'd set the scroll here which would then (on the next tick) update the content tween/ScrollTrigger which would try to smoothly animate to that new value, thus the scrub tween would impede the progress. So we use this flag to respond accordingly in the ScrollTrigger's onUpdate and effectively force the scrub to its end immediately.
            setProp(-value);
            setScroll(value);
            return;
          }
          return -getProp("y");
        },
        scrollHeight: () => document.body.scrollHeight,
        getBoundingClientRect() {
          return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        }
      });

      return ScrollTrigger.create({
        animation: gsap.fromTo(content, {y:0}, {
          y: () => document.documentElement.clientHeight - height,
          ease: "none",
          onUpdate: ScrollTrigger.update
        }),
        scroller: window,
        invalidateOnRefresh: true,
        start: 0,
        end: refreshHeight,
        refreshPriority: -999,
        scrub: smoothness,
        onUpdate: self => {
          if (isProxyScrolling) {
            killScrub(self);
            isProxyScrolling = false;
          }
        },
        onRefresh: killScrub // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
      });
    }
  }, //end mounted

   unmounted() {
    window.removeEventListener('resize', this.resizeHandler);
  },
  methods: {
    resizeHandler(e)  {
        this.height =  window.innerHeight;
        this.width =  window.innerWidth;

        // Actions on resize
        // let logoTimeline = 0;
        //Update height of the header to match the CSS variable
        var headerHeight = window.getComputedStyle(document.documentElement).getPropertyValue('--header-height');
        //remove the px from the returned value
        var headerHeightOffset = (Number(headerHeight.replace('px', '')));

        let logoTimeline = gsap.timeline({
          scrollTrigger: {
          invalidateOnRefresh: true,
          markers: false,
          trigger: "header",
          pin: false,
          scrub: true,
          start: "+=0",
          //  start: () => start,
          //update view height value on refresh
          // end: () => `+=${viewHeight}`,
          end: () =>  `+=${(this.height  - headerHeightOffset)}`,
          // end: () =>  `+=${(viewHeight)}`,
          onRefresh: () => {
            console.log('Refreshed logo timeline');
          }
        // onRefresh: killScrub
            
        }
      });

        //Check if it's our first time loading the page. If this function is being called after the page has loaded, then it means the window has been resized.
        //In which case we need to destroy the current timeline so that the new one doesn't conflict.
        if (this.logoTimelineLoaded == 0){
          console.log("first load")
          this.logoTimelineLoaded = 1;
         }else{
          console.log("resized")
          logoTimeline.kill()
          stayUpdatedButton.kill()
         }

  


        //Update the logo timeline tweens
        logoTimeline
        .clear()
        //Use CSS' view height to position the logo at the bottom of the page
        // .fromTo(".logo-container", { transform: `translateY(calc(100vh - var(--header-height) * 1.6)) scale(3)` }, { transform: 'translateY(0px) scale(1)'  }, "0" )
        .fromTo(".logo-container", { 
          // transform: `translateY(${(viewHeight - (headerHeightOffset))}px) scale(3)`, opacity:1
          scale: 3,
          opacity:1,
          y: () => `${(this.height - headerHeightOffset - headerHeightOffset)}`,
          }, 
          { 
            // transform: 'translateY(0px) scale(1)'  
            y: 0,
            scale: 1,
            }, "0")
        //Change opacity of header's side menu and hero as user scrolls down
        .fromTo("header aside", { opacity: 0, }, { opacity: 1,  }, "0" )
        .fromTo("section.hero", { opacity: 0 }, { opacity: 1  }, "0" )
        .fromTo("#stay-updated", { opacity: 0 }, { opacity: 1  }, "0" )



        // .fromTo(".hero-headline", { 
        //   opacity: 0,
        //   y: () => `${((viewHeight - headerHeightOffset)*2)}`
        //   }, { 
        //     opacity: 1,
        //     y: () => `${(headerHeightOffset + 20)}`
        //     }, "0" )

      ;


          //Handle the STAY UPDATED stickiness
        //Create another GSAP timeline to handle this event
        let stayUpdatedButton = gsap.timeline({
          scrollTrigger: {
              trigger: '.newsletter',
              start: 'top 100%-=40', // which means "when the top of the trigger hits 40px above the bottom of the viewport
            // end: 'bottom 50%',
              toggleActions: "play none none reset",
              markers: false,
            },
        });
        stayUpdatedButton
          .to('#stay-updated', {
            //Change the positioning once it collides with the newsletter subscribe form
            position:'absolute'
          }, "0")
          .to('h2#subscribe', {
            // opacity:1,
            visibility: 'visible',
          }, "0");


          // Resize carousel buttons
          let prevButton = document.querySelector('.swiper-button-prev');
          let nextButton = document.querySelector('.swiper-button-next');
          var swiperHeight = document.querySelector(".swiper figure>img").offsetHeight;
          prevButton.style.height = `${swiperHeight}px`;
          nextButton.style.height = `${swiperHeight}px`;

      },
  },



 setup () {
   //Define app meta for Nuxt3 (In Nuxt2 it seems this could be done in nuxt.config.js, but there's limited documentation for Nuxt3 )
    useMeta({
      meta: [
        {  
          title: "Hambly Freeman - Technical Challenge",
          name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1',
          name: 'theme-color', content: '#736357',
           }
      ],
    })
  }, //setup

  


}; //export default


</script>


<style>
/* Global SCSS in stored in assets/scss 
   /_main.scss
      - Global rules which apply to the entire site
   /_sass-variables.scss
      - Just a few variables for sass, such as media query breakpoints accessible in each .scss file
   /_variables.scss
      - CSS variables: branding colours, font sizes, etc.
*/

</style>