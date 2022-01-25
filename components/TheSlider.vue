<!-- Carousel using Swiperjs -->
<template>
<div class="carousel">
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :allowTouchMove="true"
    :navigation="true"
    :loop="true"
    :breakpoints="swiperOptions.breakpoints"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
  <!-- Use a foreach loop to use the slides array in order to get all the data for each slide while rendering them -->
    <swiper-slide v-for="slide in slides" :key="slide.id">
        <figure>
            <img  
            :src="slide.image"
            :alt="slide.name"
            >
            <figcaption
            :class="[slide.moreInfo ? 'info' : 'no-info']"
            >
                <div class="row">
                    <div class="col-xs-12 col-md-6">
                        Name: {{slide.name}}
                    </div>
                    <div class="col-xs-12 col-md-6">
                        Availability: [{{slide.availability}}]
                    </div>
                </div>
                <!-- Only load the additional information if it's enabled in the data/backend -->
                <template v-if="slide.moreInfo === 1">
                    <details>
                        <summary>
                            <div class="button open">Read More</div> 
                            <div class="button close">Hide Text</div>
                            <!-- <button @click="toggle">{{buttonToggle ? 'Read More' : 'Hide Text'}}</button> -->
                        </summary>

                        <div class="row">
                            <div class="col-xs-12 col-md-6">
                                Location: [{{slide.location}}]
                            </div>
                            <div class="col-xs-12 col-md-6">
                                Size: [{{slide.size}}] sqft
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12 col-md-6 col-md-offset-6">
                                <p>
                                    {{slide.description}}
                                </p>
                            </div>
                        </div>
                    </details>
                </template>

            </figcaption>
        </figure>
    </swiper-slide>

  </swiper>
  
</div>
</template>
<script>
  // Import Swiper Vue.js components
  import { Navigation } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { gsap } from "gsap";

    // Import Swiper styles
    import 'swiper/css';
    import 'swiper/css/navigation';
     import 'swiper/css/pagination';

  export default {

    data () {
        return {
            buttonToggle: false,
            //Breakpoints for Swiper
            swiperOptions: {
                breakpoints: {        
                    1024: {       
                        allowTouchMove: false,    
                    },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }

                } 
            },

            //Array of slides for the slideshow, "more info" section can be disabled by setting moreInfo

            //Currently using absolute addresses for images. usual path: assets/img/carousel-images/x.jpg
            //https://jbeach.xyz/hf-challenge/assets/img/carousel-images/
            slides: [
                { id: 1, image: "https://jbeach.xyz/hf-challenge/assets/img/carousel-images/c1.jpg", moreInfo: 1, name: "Sample Title", availability: "Now", location: "Soho", size: "4,200", description: "This is a description" },
                { id: 2, image: "https://jbeach.xyz/hf-challenge/assets/img/carousel-images/c2.jpeg", moreInfo: 1, name: "Lorem Ipsum", availability: "Soon", location: "Eastend", size: "4,700", description: "This is a description" },
                { id: 3, image: "https://jbeach.xyz/hf-challenge/assets/img/carousel-images/c3.jpeg", moreInfo: 1, name: "Etcetera", availability: "TBA", location: "Southend", size: "3,200", description: "This is a description" },
                { id: 4, image: "https://jbeach.xyz/hf-challenge/assets/img/carousel-images/c4.jpeg", moreInfo: 1, name: "Office", availability: "Later", location: "Camden", size: "7,400", description: "This is a description. <br> Testing" },
                { id: 5, image: "https://jbeach.xyz/hf-challenge/assets/img/carousel-images/c5.jpeg", moreInfo: 0, name: "Another office", availability: "Postponed", location: "Notting Hil", size: "6,100", description: "This is a description. <br> Testing" },
  
            ],
        }
    },


    methods: { 
         //Show/hide toggle for buttons below carousel.
        // toggle() {
        //     this.buttonToggle = !this.enable;
        //     console.log('test')
        //     },
    },



    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const onSwiper = (swiper) => {
        // console.log(swiper);
      };

      const onSlideChange = () => {
        console.log('slide change');
        //When the slide is changed, check if the <details> panel is open on the slideshow and close it if it is.
        document.body.querySelectorAll('details').forEach((e) => (e.hasAttribute('open')) ? e.removeAttribute('open') : e.setAttribute('close',false))
      };
      return {
        onSwiper,
        onSlideChange,
        modules: [Navigation],
      };
    },
    mounted() {


        //Make custom cursor when hovering over carousel.
        https://codepen.io/GreenSock/pen/WNNNBpo
        gsap.set("#cursor-swiper", {xPercent: -50, yPercent: -50});

        const cursor = document.querySelector("#cursor-swiper");
        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const mouse = { x: pos.x, y: pos.y };
        const speed = 0.35;

        const xSet = gsap.quickSetter(cursor, "x", "px");
        const ySet = gsap.quickSetter(cursor, "y", "px");


        gsap.set(cursor, { opacity: 0 })

        function mousemoveFunction(e) {   
            mouse.x = e.x;
            mouse.y = e.y;  
        }

        function tickerUpdate() {   
        var dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
        
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        xSet(pos.x);
        ySet(pos.y);
        }

        // Hide/show custom cursor when hovering over carousel
        var swiperContainer = document.querySelector(".swiper");

        swiperContainer.onmouseenter = function(){
            swiperContainer.addEventListener("mousemove", mousemoveFunction);
            gsap.ticker.add(tickerUpdate)
            gsap.to(cursor, { opacity: 1 })
        }

        swiperContainer.onmouseleave = function(){
            swiperContainer.removeEventListener("mousemove", mousemoveFunction);
            gsap.ticker.remove(tickerUpdate)
            gsap.to(cursor, { opacity: 0 })
        }

        

        // Test whether the cursor should be set to Next or Previous depending on side being hovered.
        let prevButton = document.querySelector('.swiper-button-prev');
        let nextButton = document.querySelector('.swiper-button-next');

        // Give appropriate height to Swiper's next/previous buttons so that they match the height of an image in the carousel.
        // document.getElementById("myImg").style.height
        var swiperHeight = document.querySelector(".swiper figure>img").offsetHeight;
        prevButton.style.height = `${swiperHeight}px`;
        nextButton.style.height = `${swiperHeight}px`;
        // console.log(swiperHeight);

        //Change the cursor to "Next" (Will try replace .svg with plain text)
        nextButton.addEventListener("mouseenter", function( event ) {
        cursor.innerHTML = "Next";
        console.log('next');
        }, false);

        //Change the cursor to "Previous" (Will try replace .svg with plain text)
        prevButton.addEventListener("mouseenter", function( event ) {
        cursor.innerHTML = "Previous";
        console.log('previous');
        }, false);

        //Hide cursor when hovering over figure caption (office information)
        document.querySelectorAll('figcaption').forEach(fig => {
            fig.addEventListener('mouseover', () => {
                // cursor.style.backgroundImage = "unset";
                cursor.innerHTML = "";
            });
        });


    },

   

  };

</script>


<style lang="scss">;
.carousel{
    overflow: hidden;
    width:100%;
    margin: 0 auto;
    position: relative;
    figure{
        margin: 0;
        img{
            width: 100%;
            max-width: 100%;
        }
    }
    figcaption{
        z-index:15;
        position: relative;
        p{
            margin: 10px 0;
        }

        div.row{
            margin-right:0;
            margin-left: 0;
            >div{
                padding: 0.7em 0;
            }
            >div:not(.col-md-offset-6), &:last-child{
                border-bottom:solid 1px var(--font-color);
            }
            // &:last-child:before {
            //     background: #736457;
            //     content: '';
            //     position: absolute;
            //     left: 0;
            //     right: 0;
            //     bottom: 1px;
            //     height: 1px;
            // }
           
        }
        &.no-info{
            .row{
                >div:last-child, &:last-child{
                    border-bottom:unset;
                }
                &:last-child:before {
                    background: var(--font-color);
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 1px;
                    height: 1px;
                }
            }
        }
    }
    //Toggle visibility of info on the carousel when opened.
    details{
        position:relative;
        summary{
            display:block;
            cursor: pointer;

            border-top: solid 1px var(--font-color);
            margin-top: -1px;
            // position: relative;
        }
        
        //open/close buttons
        .close{
            display: none;
        }
        .open{
            margin-top: 15px;
        }

    //When details is opened
    &[open]{
        display:block;
        // padding-bottom:1.5em;
        padding-top:0;
        animation: open .2s linear;
        padding-bottom: 60px;
        summary{
            position:absolute;
            bottom: 0;
            left:0;
            border:unset;
        }
        //buttons
        .open{
            display: none;
        }
        .close{
            display: block;
        }
    }
    }
    
}

.swiper{
    width: 100%;
}
.swiper-button-next,.swiper-button-prev{
    color: var(--background-color);
}
/* Small only */
@media (max-width: $mobile-breakpoint) {

:root{
    --swiper-navigation-size: 20px;
}
    #cursor-swiper{
        display: none;
    }
    .swiper-button-next,.swiper-button-prev{
        top: 2em;
        font-size:0.4em;
    }

    .carousel figcaption.no-info .row:last-child:before {
        bottom: -1px;
    }
    .open{
        margin-top: 10px;
    }
    
}

/* Small only */
@media (max-width: $mobile-breakpoint) {
    .carousel{
        margin-top:5em;
        details[open] {
            padding-bottom: 30px;
        }
    }
}
// Large screens (desktop, tablet landscape)
@media (min-width: $large-breakpoint) {
    // For desktop, make the Next/Previous swiper buttons take up 100% height and 50% width of either side.
    .carousel{
        .swiper-button-prev,
        .swiper-button-next {
        width: 50%;
        height: 80%;
        // height: 100vh;
        top: 0;
        margin: 0;
        transition: cursor 0.3s;
        cursor: none;
        
        &::after {
            display: none;
        }
        }
        
        .swiper-button-prev {
            left: 0;
        }
        
        .swiper-button-next {
            right: 0;
        }

        //Give borders to the columns of the carousel's item descriptions.
        figcaption{
        div.row{
            // margin-right:0;
            // margin-left: 0;
            >div{
                // padding: 0.5em 0;
                &:first-child{
                    //Line gap between columns
                    flex-basis: 49.5%;
                    margin-right: 0.5%;
                }
            }
        }
        }
    }
}

// custom cursor
#cursor-swiper{
    // height: 33px;
    opacity:0;
    // width: 174px;
    pointer-events: none;
    // background-image: url(assets/img/next.svg);
    // background: url(assets/img/next.svg) no-repeat center;
    background-size: contain;
    mix-blend-mode: difference;
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    font-size: 3em;
    color: #fff;
}

// Animation for opening details
@keyframes open {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>