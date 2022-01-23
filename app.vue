
<template>
    <div id="cursor-swiper"></div>
    <a href="#subscribe" id="stay-updated" class="anchor">Stay Updated</a>
    <TheHeader />
    <!-- Create a container for the viewport to utilize ScrollTrigger and give smooth scrolling -->
		<div id="viewport">
			<div id="content">
        <TheHero />
        <TheSlider />
        <NewsletterSubscribe />

        <TheFooter />
     </div>
    </div>
</template>

<script>

// Define a custom layout
// definePageMeta({
//   layout: "defaultLayout",
// });

//import { defineComponent } from '@vue/composition-api';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


export default {
  mounted() {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    //Add smooth scrolling the website
    smoothScroll("#content");

  //use ScrollToPlugin to handle anchor links like STAY UPDATED.

  //First we need to determine the header's height which is stored as a CSS variable
  // let headerHeight = window.getComputedStyle(document.documentElement).getPropertyValue('--header-height');
  let headerHeight = window.getComputedStyle(document.documentElement).getPropertyValue('--header-height');
  let headerHeightOffset = (Number(headerHeight.replace('px', '')));


  console.log('Header height: '+ headerHeightOffset+ '');

  // gsap.utils.toArray(".anchor").forEach(function(a) {
  //   a.addEventListener("click", function(e) {
  //     e.preventDefault();
  //     const id = e.target.getAttribute("href"),
  //           trigger = ScrollTrigger.getById(id);


  //     gsap.to(window, {
  //       duration: 1,
  //       //Offset the anchor links so that they are below the header when navigating to them
  //       offsetY: 900,
  //       scrollTo:{
  //       //Loop through each anchor, and then use the header height as an offset
  //       y: trigger ? trigger.end : id, 
  //       offsetY:headerHeightOffset
  //     }

  //     });
  //   });
  // });

  // Scroll to anchor links with an offset based on the header's height when the user clicks a link
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

  //Find the viewport/window height, and then add an offset for the sticky header.
  let viewport = document.querySelector('#viewport');
  let viewHeight = (viewport.clientHeight  - headerHeightOffset);
  console.log('View height: '+ viewHeight+ '');
  //   Create a timeline so we can group animated elements together
  let tl = gsap.timeline({
      scrollTrigger: {
      markers: false,
      trigger: "header",
      pin: false,
      scrub: true,
      start: "top top",
      //update view height value on refresh
      end: () => `+=${viewHeight}`,
      invalidateOnRefresh: true,
        
      }
    });
    
    
    
    tl

      //Use CSS' view height to position the logo at the bottom of the page
      // .fromTo(".logo-container", { transform: `translateY(calc(100vh - var(--header-height) * 1.6)) scale(3)` }, { transform: 'translateY(0px) scale(1)'  }, "0" )
      .fromTo(".logo-container", { transform: `translateY(${(viewHeight - (headerHeightOffset))}px) scale(3)`, opacity:1 }, { transform: 'translateY(0px) scale(1)'  }, "0" )
      //Change opacity of header's side menu and hero as user scrolls down
      .fromTo("header aside", { opacity: 0, }, { opacity: 1,  }, "0" )
      .fromTo("section.hero", { opacity: 0 }, { opacity: 1  }, "0" )
      .fromTo("#stay-updated", { opacity: 0 }, { opacity: 1  }, "0" )

    ;

    //Handle the STAY UPDATED stickiness
    //Create another GSAP timeline to handle this event
    let stayUpdatedButton = gsap.timeline({
      scrollTrigger: {
          trigger: '.newsletter',
          start: 'top 100%-=40', // which means "when the top of the trigger hits 40px above the bottom of the viewport
        // end: 'bottom 50%',
          toggleActions: "play none none reset",
          markers: true,
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

    ;


//     ScrollTrigger.create({
//       trigger: "#content",
//       start: "top 15px",
//       // pin for the difference in heights between the content and the sidebar
//       end: self => "+=" + (document.querySelector("#content").offsetHeight - self.pin.offsetHeight),
//       pin: "#sidebar",
//       // before version 3.4.1, the "float" property wasn't copied to the pin-spacer, so we manually do it here. Could do it in a style sheet instead if you prefer. 
//       onRefresh: self => self.pin.parentNode.style.float = "left",
//       pinSpacing: false
// });




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





  },
};

// export default defineComponent({
//   setup() {
    
//   },
// })
</script>


<style lang="scss">;

</style>