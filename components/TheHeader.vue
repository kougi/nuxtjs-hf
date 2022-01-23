<!-- Please remove this file from your project -->
<template>
<header>
    <div class="row">
        <div class="col-xs-3 col-md-3 col-lg-6">
            <div class="logo-container">
                <a href="#">
                    <img src="~/assets/img/txo_logo.svg" class="logo" alt="TXO">
                </a>
            </div>
        </div>


        <aside class="col-xs-9 col-md-9 col-lg-6 company-details">

            <div class="hamburger">
                <input type="checkbox" @click="isOpen = !isOpen"/>
                <span></span>
                <span></span>
                <span></span>
            </div>


            <div 
               class="contact-container"
              :class="{hidden: !isOpen}">
                <div class="contact">
                    <h4>Enquiries</h4>
                    <div>
                        <!-- <br>s are used as the links are display: inline-bock to achieve the animated underline effect -->
                        <h5>General</h5><br>
                        <a href="tel:+44002036134733">+44 (0) 020 3613 4733</a><br>
                        <a href="mailto:info@txowork.com">Info@txowork.com</a><br><br>
                        <h5>Sales</h5><br>
                        <a href="tel:+44002036134733">+44 (0) 020 3613 4733</a><br>
                        <a href="mailto:info@txowork.com">Info@txowork.com</a><br>
                    </div>
                </div>
                <address>
                    <h4>Address</h4>
                    <p>
                        Morelands<br>
                        5-23 Old Street<br>
                        London EC1V 9HL
                    </p>
                </address>
                <div class="connect">
                    <h4>Connect</h4>
                    <ul>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">LinkedIn</a></li>
                        <li><a href="#">Facebook</a></li>
                    </ul>
                </div>
            </div>

        </aside>


    </div>
</header>
</template>

<script>

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  name: 'TheHeader',

  mount(){
  },

  data() {
        return {
            isOpen: false
        }
    }
}
</script>



<style lang="scss">;

header{
    position: fixed;
    z-index:2;
    top: 0;
    left:0;
    width: 100%;
    // Use a variable for the header's height as we can then tie it to media queries
    height:  var(--header-height);
    background: var(--background-color);
}

// Contact, Address and menu section in header
aside.company-details{
    opacity:0;
    // display: flex;
    top:0;
    right:0;
    // flex-direction: row;
    // justify-content: space-around;
    padding-top: 20px;
    padding-right: 20px;
    
    h4{
        text-transform: uppercase;
        margin: 0 0 0.5em 0;
    }
    h5{
        margin:0;
        font-size: 1em;
    }
    p{
        margin: 0;
    }
    address{
        font-style: unset;
    }
    a{
        display:block;
    }
}
    .contact-container{
        display: flex;

        animation: fadeIn 0.4s ease-out;
    }

// Logo
.logo-container{
    padding:10px;
    position: absolute;
    top: 0;
    transform-origin: left;
    img{
        max-width: 80px;
    }
}



// Hamburger icon
.hamburger{
    position: absolute;
    top:10px;
    right: 10px;
    >span{
        width: 30px;
        height: 2px;
        background-color: var(--font-color);
        display: block;
        margin-top: 10px;
        transition: all 0.3s ease-in-out;
        &:nth-child(2){
            margin-top:0;
        }
    
    }

    &:hover{
        cursor: pointer;
    }

    input{
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: -7px;
        left: -5px;
        background:red;
        transform-origin: center;
        cursor: pointer;
        
        opacity: 0; /* hide this */
        z-index: 2; /* and place it over the hamburger */
        
        -webkit-touch-callout: none;

        //Change css for the hamburger's <span> lines if checkbox is pressed. This is an alternative to using Javascript for the same effect
        &:checked ~ span{
            &:nth-child(2){
                transform: translateY(12px) rotate(45deg);
            }

            &:nth-child(3){
                // Middle bar turns transparent
                opacity: 0;
            }
            &:nth-child(4){
                transform: translateY(-12px) rotate(-45deg);
            }
        }
    }
} 


/* Small only */
@media (max-width: $mobile-breakpoint) {

    aside.company-details{
        // padding-right: 0;
        // visibility: hidden;

    }
    // Container for contact information on mobile
    .contact-container {
    /* display: block; */
    flex-direction: column;
    width: 100vw;
    left: 0;
    top: var(--header-height);
    padding: 1em;
    position: absolute;
    background: var(--background-color);
    height: calc(100vh - var(--header-height));

    // Add lines
    >*{
        border-top: solid 1px var(--font-color);
        padding: 1em 0px;

        &:last-child{
            border-bottom: solid 1px var(--font-color);
        }
    }
}
}



//(orientation: landscape)
/* Medium and up */
@media (min-width: $medium-breakpoint) {

    .hamburger{
        display: none;
    }
    aside.company-details{
        // padding-right: 110px;

        a,h5{
            display: inline-block;
        }
    }
    .contact-container{
 
        // display:block !important;
        display: flex !important;
        flex-direction: row;
        justify-content: space-around;
        gap: 1em;
        padding: 0 1em;
        padding-right: 4em;
    
    }
    .logo-container{
        padding: 20px;
        margin-left: 20px;
        opacity: 0;
        // top: 0;
        img{
            // transform-origin: left;
            max-width: 170px;
            padding-top: 3px;
        }
    }
}

// Tablets{}
@media (max-width: $tablet-breakpoint)   {
    .contact-container{
        padding-right: 1em;
    }
}




/* Medium only */
@media (min-width: 40em) and (max-width: 63.9375em) {}

// Large screens
@media (min-width: $medium-breakpoint) {
    body{
        // background: red;
    }

    .contact{
    a{display: block;}
    //Use CSS for Enquiries columns
    >div{
        columns: auto;
        columns: 2;
        column-gap: 40px;
    }
    }
}

/* Extra large */
@media (min-width: 100em) {
    body{
        // background: maroon;
    }
}

/* Large only */
@media (min-width: 64em) and (max-width: 74.9375em) {
    
}
</style>