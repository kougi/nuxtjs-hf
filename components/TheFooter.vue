<!-- Please remove this file from your project -->
<template>
    <footer>
        <div class="row">
            <div class="col-xs-12 col-md-6">
                <img src="assets/img/thirdway.svg" class="logo" alt="Thirdway">
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
    padding: 2em 0;
    nav{
        ul{
            display: flex;
            justify-content: space-around;
            li{                
            }
        }
    }
}
</style>