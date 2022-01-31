
<template>
    <TheHeader /> 
    <!-- Create a container for the viewport to utilize ScrollTrigger and give smooth scrolling -->
		<div id="viewport">
			<div id="content">
        <TheHero />
          <TheSlider />
          <NewsletterSubscribe />
          
     </div>
    </div>
    <TheFooter />

    <div id="cursor-swiper"><div id="cursor-text" /></div>
    <a href="#subscribe" id="stay-updated" class="anchor">Stay Updated</a>
   

</template>

<script>
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";

export default {
    //Set a few default variables
    data() {
        return {
            height: 0,
            width: 0,
            logoTimelineLoaded: 0,
            // showModal: false,
        };
    },
    created() {
        // Register GSAP ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    },
    mounted() {
        //Default window size
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        //Add smooth scrolling the website
        smoothScroll("#content");
        //Jump to top of page on refresh
        if (history.scrollRestoration) {
            history.scrollRestoration = "manual";
        }


        //Check the device being used by the user so we can see if they're on a mobile or tablet
        const userAgent = navigator.userAgent.toLowerCase();

        //is the user on mobile?
        var isMobile = /iPhone|Android/i.test(navigator.userAgent);
        // console.log(isMobile);

        //Are they on a tablet?
        const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
        //  console.log(isTablet)

        //If on mobile, animate the hero
        if (isMobile || isTablet) {
            // console.log("mobile");
            //Function which handles the GSAP animation
            heroMobile();
        }

        // Trigger resize event if on mobile and switching between landscape/portrait orientation
        screen.orientation.addEventListener("change", this.resizeHandler);

        //If on desktop, listen out for window resizing and refresh the logo timeline
        if (!isMobile && !isTablet) {
            window.addEventListener("resize", this.resizeHandler);
            // console.log("desktop");
            stayUpdatedDesktop();
        }


        //Events for mobile only
        ////////////////////////////////////////////////////
        function heroMobile() {
            // Get the height of phone
            var phoneHeight = window.innerHeight;
            //Determine the header's height by getting the CSS variable and then stripping the string of px
            var headerHeight = window.getComputedStyle(document.documentElement).getPropertyValue("--header-height");
            //remove the px from the returned value
            var headerHeightOffset = (Number(headerHeight.replace("px", "")) + 10);

            // Hero's GSAP actions
            gsap.to(".hero-headline", {
                scrollTrigger: {
                    trigger: ".hero-headline",
                    pin: true,
                    start: () => `top top+=${headerHeightOffset}`,
                    end: "+=450",
                    // scrub: true
                },
                // background: ''
            });
            ; //end timeline
        } //end of mobile only scripts

        // Create the "Stay updated" button's GSAP timeline if the user is on desktop
        function stayUpdatedDesktop() {
            //Handle the STAY UPDATED stickiness
            //Create another GSAP timeline to handle this event
            let stayUpdatedButton = gsap.timeline({
                scrollTrigger: {
                    trigger: ".newsletter",
                    invalidateOnRefresh: true,
                    start: () => `top 100%-=42`,
                    // end: 'bottom 50%',
                    toggleActions: "play none none reset",
                    markers: false,
                },
            });

            //Make the actual header visible once it collides with the fixed element.
            stayUpdatedButton.to("#stay-updated", {
                //Change the positioning once it collides with the newsletter subscribe form
                position: "absolute"
            }, "0").to("h2#subscribe", {
                // opacity:1,
                visibility: "visible",
            }, "0");

            //Scroll reveal animations, desktop only.
            gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
              hide(elem); // assure that the element is hidden when scrolled into view
              
              ScrollTrigger.create({
                trigger: elem,
                onEnter: function() { animateFrom(elem) }, 
                onEnterBack: function() { animateFrom(elem, -1) },
                onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
              });
            });

        }
        // Check if link is an anchor link to the same page so that the scroll to it can be animated
        function getSamePageAnchor(link) {
            if (link.protocol !== window.location.protocol || link.host !== window.location.host || link.pathname !== window.location.pathname || link.search !== window.location.search) {
                return false;
            }
            return link.hash;
        }
        //Determine the header's height by getting the CSS variable and then stripping the string of px
        var headerHeight = window.getComputedStyle(document.documentElement).getPropertyValue("--header-height");
        //remove the px from the returned value
        var headerHeightOffset = (Number(headerHeight.replace("px", "")));
        // Scroll to a given hash, preventing the event given if there is one
        function scrollToHash(hash, e) {
            const elem = hash ? document.querySelector(hash) : false;
            if (elem) {
                if (e)
                    e.preventDefault();
                gsap.to(window, {
                    scrollTo: {
                        y: elem,
                        offsetY: headerHeightOffset
                    },
                });
            }
        }
        // If a link's href is within the current page, scroll to it instead
        document.querySelectorAll("a[href]").forEach(a => {
            a.addEventListener("click", e => {
                scrollToHash(getSamePageAnchor(a), e);
            });
        });
        // Scroll to the element in the URL's hash on load
        scrollToHash(window.location.hash);

        //Run the resize handler on initial load
        this.resizeHandler();

        // GSAP's Smooth scroll implementation
        // This function was found at: https://codepen.io/GreenSock/pen/gOgWELo 
        function smoothScroll(content, viewport, smoothness) {
            content = gsap.utils.toArray(content)[0];
            smoothness = smoothness || 1;
            gsap.set(viewport || content.parentNode, {
                overflow: "hidden",
                position: "fixed",
                height: "100%",
                width: "100%",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            });
            gsap.set(content, {
                overflow: "visible",
                width: "100%"
            });
            let getProp = gsap.getProperty(content), setProp = gsap.quickSetter(content, "y", "px"), setScroll = ScrollTrigger.getScrollFunc(window), removeScroll = () => content.style.overflow = "visible", killScrub = trigger => {
                let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
                scrub && scrub.kill();
                trigger.animation.progress(trigger.progress);
                // console.log("Scrub killed");
            }, height, isProxyScrolling;
            function refreshHeight() {
                height = content.clientHeight;
                content.style.overflow = "visible";
                document.body.style.height = height + "px";
                return height - document.documentElement.clientHeight;
            }
            ScrollTrigger.addEventListener("refresh", () => {
                removeScroll();
                requestAnimationFrame(removeScroll);
            });
            ScrollTrigger.defaults({
                scroller: content
            });
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
                    return {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight
                    };
                }
            });
            return ScrollTrigger.create({
                animation: gsap.fromTo(content, {
                    y: 0
                }, {
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
        } // smooth scroll


        //GSAP reveal animations on scroll
        function animateFrom(elem, direction) {
      direction = direction || 1;
      var x = 0,
          y = direction * 100;
      if(elem.classList.contains("gs_reveal_fromLeft")) {
        x = -100;
        y = 0;
      } else if (elem.classList.contains("gs_reveal_fromRight")) {
        x = 100;
        y = 0;
      }
      elem.style.transform = "translate(" + x + "px, " + y + "px)";
      elem.style.opacity = "0";
      gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
        duration: 1.25, 
        x: 0,
        y: 0, 
        autoAlpha: 1, 
        ease: "expo", 
        overwrite: "auto"
      });
    }

    function hide(elem) {
      gsap.set(elem, {autoAlpha: 0});
    }


      






	    //Change the size of the viewport and perform events when the <details> is expanded (Attempt to fix bug where content is pushed beyond the bottom of the screen)
  		document.querySelectorAll('details')
  		.forEach(details => {
  			details.addEventListener("toggle", event => {
  				const expandedHeight = getComputedStyle(document.querySelector('details'))
  					.getPropertyValue('--expanded');
  				//Fade in the info when the <details> element is opened. For some strange reason, the CSS selector details[open] doesn't work with transitions/animations for child elements unless dev tools is open, so needed to use js
  				details.classList.toggle("fade-in");
 
          //Refresh "Stay updated" timeline when <details> is opened"
  				if (details.open) {
            // console.log("opened")
  				} else {
  					/* the element was toggled closed */
  					// console.log('Close');
  				}
  			});
  		})






    }, // mounted

    unmounted() {
        window.removeEventListener("resize", this.resizeHandler);
    }, //unmounted


    methods: {
        //Function which is triggered when the window is resized, including right after page loads as it contains logo animation's timeline.
        resizeHandler(e) {
            //Get new size
            this.height = window.innerHeight;
            this.width = window.innerWidth;
            //Update height of the header to match the CSS variable
            var headerHeight = window.getComputedStyle(document.documentElement).getPropertyValue("--header-height");
            //remove the px from the returned value
            var headerHeightOffset = (Number(headerHeight.replace("px", "")));
            let logoTimeline = gsap.timeline({
                scrollTrigger: {
                    invalidateOnRefresh: true,
                    markers: false,
                    trigger: "header",
                    pin: false,
                    scrub: true,
                    start: "+=0",
                    //update view height value on refresh
                    end: () => `+=${(this.height - headerHeightOffset)}`,
                    onRefresh: () => {
                        // console.log("Refreshed logo timeline");
                    }
                }
            });
            //Check if it's our first time loading the page. If this function is being called after the page has loaded, then it means the window has been resized.
            //In which case we need to destroy the current timeline so that the new one doesn't conflict.
            if (this.logoTimelineLoaded == 0) {
                console.log("first load");
                this.logoTimelineLoaded = 1;
            }
            else {
                console.log("resized");
                logoTimeline.kill();
            }
            //Update the logo timeline tweens
            logoTimeline.clear()
                .fromTo(".logo-container", {
                scale: 3,
                opacity: 1,
                y: () => `${(this.height - headerHeightOffset - headerHeightOffset)}`,
            }, {
                y: 0,
                scale: 1,
            }, "0")
            
                //Change opacity of header's side menu and hero as user scrolls down
                .fromTo("header aside", {
                opacity: 0,
            }, {
                opacity: 1,
            }, "0").fromTo("section.hero", {
                opacity: 0
            }, {
                opacity: 1
            }, "0").fromTo("#stay-updated", {
                opacity: 0
            }, {
                opacity: 1
            }, "0");

            // Resize carousel buttons. use a timer as as otherwise it uses the previous size of the window.
            let prevButton = document.querySelector(".swiper-button-prev");
            let nextButton = document.querySelector(".swiper-button-next");
            setTimeout(function () {
                let swiperHeight = document.querySelector(".swiper figure>img").offsetHeight;
                // console.log("Swiper height: " + swiperHeight + "");
                prevButton.style.height = `${swiperHeight}px`;
                nextButton.style.height = `${swiperHeight}px`;
            }, 500);
        },
    }, //methods

    setup() {
        //Define app meta for Nuxt3 (In Nuxt2 it seems this could be done in nuxt.config.js, but there's limited documentation for Nuxt3 )
        useMeta({
            meta: [{
                    title: "Hambly Freeman - Technical Challenge",
                    name: "viewport",
                    content: "width=device-width, initial-scale=1, maximum-scale=1",
                    name: "theme-color",
                    content: "#736357",
                }],
        });
    }, //setup
    
}; //export default

</script>


<style>;
/* Global SCSS in stored in assets/scss 
   /_main.scss
      - Global rules which apply to the entire site
   /_sass-variables.scss
      - Just a few variables for sass, such as media query breakpoints accessible in each .scss file
   /_variables.scss
      - CSS variables: branding colours, font sizes, etc.
*/

  /* // @font-face {
  //   font-family: "Messina Sans";
  //   src: url(~/assets/fonts/MessinaSansWeb-Regular.woff2) format('woff2');  
  //   font-weight: normal;
  //   font-style: normal;
  //   } */

  @font-face {
  font-family: 'Messina Sans';
  src: local("Messina Sans"),
      url('./assets/fonts/MessinaSansWeb-Regular.eot'), /* older browsers */
      url('~@/assets/fonts/MessinaSansWeb-Regular.woff') format('woff'),
      url('./assets/fonts/MessinaSansWeb-Regular.woff2') format('woff2'); /* Modern browsers */
  font-weight: normal;
  font-style: normal;
  }
</style>