<!-- Page footer -->
<template>
    <footer>
        <div class="row">
            <div class="col-xs-12 col-md-6">
                <a href="#">
                    <img src="https://jbeach.xyz/hf-challenge/assets/img/thirdway.svg" class="logo" alt="Thirdway">
                    <!-- <img src="assets/img/thirdway.svg" class="logo" alt="Thirdway"> -->
                    </a>
            </div>
            <nav class="col-xs-12 col-md-6">
                <ul>
                    <li><a href="#">Terms and Conditions</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Cookie Policy</a></li>
                    <li><a href="#">Accessibility</a></li>
                </ul>
            </nav>
        </div>
    </footer>
</template>

<script>
export default {
  name: 'TheFooter',
}
</script>



<style lang="scss">;




footer{
    padding: 1em 0;
}
footer nav ul{
    display: flex;
    justify-content: space-around;
}


/* Small/tablets only */
@media (max-width: $tablet-breakpoint) {
    footer{
        padding: 1em 0 1em 0;
        .logo{
            max-width:120px;
            opacity:0.6;
            margin-bottom:1.4em;
        }
        nav.col-xs-12{
            padding:0;
            ul{
                justify-content: flex-start;
            
                li{
                    margin-right:1em;
                }
            }
        }
    }
}

// A few tweaks specific for tablets
@media (max-width: $tablet-breakpoint) and (min-width: $mobile-breakpoint) {

    footer{
        img{
            display: block;
            margin:0 auto;
        }
        .logo{
             max-width:200px;
        }
        a{
            font-size:1.4em;
        }

        nav.col-xs-12{
            ul{
                justify-content: space-evenly;
            }
        }
    }
}

/* Medium and up */
@media (min-width: $medium-breakpoint) {
    footer{
        nav{
            ul{
                margin-top: 9px;
            }
        }
        a{

        }
    }
}
</style>