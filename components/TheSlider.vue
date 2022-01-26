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
  


<!-- <details>
  <summary>
    <span data-css-icon="menu">etc<i></i></span>
  </summary>
 <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam ab animi velit est unde, quod, debitis voluptas, tenetur possimus corporis veritatis commodi eveniet placeat officiis non! Et consequatur nulla molestiae?</div>
</details> -->




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

            //Currently using absolute addresses for images due to vercel issue. usual path: assets/img/carousel-images/x.jpg
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

        //Change the cursor to "Previous"
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






        //Get the height of the <details> elements so that we can properly animate it
        function setDetailsHeight(selector, wrapper = document) {
            const setHeight = (detail, open = false) => {
                detail.open = open;
                const rect = detail.getBoundingClientRect();
                detail.dataset.width = rect.width;
                detail.style.setProperty(open ? `--expanded` : `--collapsed`,`${rect.height}px`);
            }
            const details = wrapper.querySelectorAll(selector);
            const RO = new ResizeObserver(entries => {
                return entries.forEach(entry => {
                    const detail = entry.target;
                    const width = parseInt(detail.dataset.width, 10);
                    if (width !== entry.contentRect.width) {
                        detail.removeAttribute('style');
                        setHeight(detail);
                        setHeight(detail, true);
                        detail.open = false;
                    }
                })
            });
            details.forEach(detail => {
                RO.observe(detail);
            });

            console.log("<detail> height refreshed")
    }

    /* Run it */
    setDetailsHeight('details');
    }, //mounted

   

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
                >div.col-md-6, &:last-child{
                    // border-bottom:unset;
                }
                &:last-child:before {
                    background: var(--font-color);
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -1px;
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

            // border-top: solid 1px var(--font-color);
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
        // &[open]{
        //     display:block;
        //     padding-top:0;
        //     animation: open .2s linear;
        //     padding-bottom: 60px;
            
        //     summary{
        //         position:absolute;
        //         bottom: 0;
        //         left:0;
        //         border:unset;
        //     }
        //     //buttons
        //     .open{
        //         display: none;
        //     }
        //     .close{
        //         display: block;
        //     }
        // }
    }
    
}

.swiper{
    width: 100%;
    //Put padding at bottom for the More/Less info buttons to rest
    padding-bottom: 5em;
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

 

    .open{
        margin-top: 10px;
    }

    .carousel{
        margin-top:5em;
        details[open] {
            padding-bottom: 30px;
        }

        figcaption.no-info {
            .row{
                >div:last-child,&:last-child{
                    border-bottom:unset;
                }
                // &:last-child:before {
                //     bottom: -1px;
                // }
            }
           
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
        &.no-info {
            .row{
                >div.col-md-6, &:last-child{
                    border-bottom:unset;
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
// @keyframes open {
//     0% {
//       opacity: 0;
//       transform: translateY(-10px);
//     }
//     100% {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }

//   CSS for opening <details>
details {
    span {
        --animdur: .3s;
        --loading-animdur: 0.8s;
        --animtf: ease-in;
        --bdw: 2px;
        --bdrs: 50%;
        --bgc: transparent;
        --c: currentcolor;
        --dots-bgc: silver;
        --dots-size: 0.5rem;
        --icon-size: 1rem;
        --size: 2.5rem;

        height: var(--size);
        align-items: center;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--bgc);
        border-radius: var(--bdrs);
        box-sizing: border-box;
        display: inline-flex;
        justify-content: center;
        position: relative;
        transition: background-color var(--animdur) var(--animtf);
        height: var(--size);
        width: var(--size);

        i{
            --bdrs: 0;
            --m: 7px;
            align-items: center;
            background-color: var(--bgc);
            border-radius: var(--bdrs);
            box-sizing: border-box;
            display: inline-flex;
            height: var(--size);
            justify-content: center;
            position: relative;
            transition: background-color var(--animdur) var(--animtf);
            width: var(--size);


            position: relative;
            right: calc((var(--size) - var(--w)) / 2);

            &,&:before,&:after{
                transform-origin: 50% 50%;
	            transition: all var(--animdur) var(--animtf);

                /* Width need to be the diagonal of the down-arrow side-length (--size): sqrt(2) * --size. */
                --w: calc(var(--icon-size) * 1.4142135623730950488016887242097);
                background: var(--c);
                content: '';
                height: var(--bdw);
                position: absolute;
                width: var(--w);
                top: calc(0px - var(--m));

            }

            &:after{
                top: var(--m);
            }
    }
    }

    &[open]{
        >summary>span i{
            background-color: transparent;

            &:before{transform: translateY(var(--m)) rotate(45deg);}
            &:after{transform: translateY(calc(0px - var(--m))) rotate(-45deg); }
        }
        // [open] > summary > [data-css-icon*="menu"] i { background-color: transparent; }
        // [open] > summary > [data-css-icon*="menu"] i::after { transform: translateY(calc(0px - var(--m))) rotate(-45deg); }
        // [open] > summary > [data-css-icon*="menu"] i::before { transform: translateY(var(--m)) rotate(45deg); }
    }
}


 /* For this demo only */
    // button, details { width: 25rem; }
    // button { font-family: inherit; font-size: inherit; }
    details {
        height: var(--collapsed);
        // overflow: hidden;
        transition: height 300ms cubic-bezier(0.4, 0.01, 0.165, 0.99);

        &[open]{
            height: var(--expanded);

            .open{
                display: none;
            }
            .close{
                display: block;
            }
        }
        summary{
                position:absolute;
                bottom: 0;
                left:0;
                border:unset;
                bottom: -1.3em;
            }
    }
    details[open] 
    button,
    summary { 
        // background-color: var(--bgc);
        // border: 0;
        // border-radius: 5px;
        // color: var(--c, inherit);
        // list-style-type: none;
        // margin: 0.5rem 0;
        // outline: none;
        // padding-bottom: 0.5rem;
        // padding-top: 0.5rem;
        // padding-inline-end: 0.5rem;
        // padding-inline-start: 1rem;
        // user-select: none;
    }
    summary::marker { display: none; }
    summary::-webkit-details-marker { display: none; }


</style>