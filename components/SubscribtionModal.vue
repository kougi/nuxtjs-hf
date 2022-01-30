<template>
<!-- Template for a modal pop-up, which can be modified within other components via the <slot /> element -->
    <div class="modal-backdrop" @click="close">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Default modal header
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
        </button>
      </header>

      <section class="modal-body">
        <slot name="body">
          Default modal body
        </slot>
       </section>

      <footer class="modal-footer">
        <slot name="footer">
          Default modal footer
        </slot>
        <div
          class="button"
          @click="close"
        >
          X Close
        </div>
      </footer>
    </div>
  </div>


</template>

<script>

// import { defineProps } from 'vue'
//   const props = defineProps({
//       emit: Function
//   })

  export default {
      name: 'SubscriptionModal',

    data() {
        return {
            // fullName: 'NA',
            // companyName: 'NA',
            // emailAddress: 'NA',
        };
    },
      methods: {
      close() {
        this.$emit('close');
      },
    },

}
</script>


<style scoped lang="scss">;

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(0 0 0 / 70%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    opacity: 0;
    animation: fadeIn 0.4s ease-out 1 forwards;
    animation-delay: 200ms;
  }

  .modal {
        background: var(--background-color);
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 0px;
    /* padding: 2em 0.5em; */
    padding: 1em 1em 0.5em 1em;
text-align: center;
.button{
    margin-top:1em;
    // text-align: left;
    &:before{display: none;}
}
  }


  .modal-footer {
    padding: 15px;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid var(--font-color);
    padding: 0 0 0.5em 0;
  }

  .modal-footer {
    border-top: 1px solid var(--font-color);
  }

  .modal-body {
    position: relative;
    padding: 0.5em 0 0.5em 0;
  }

   .btn-close {
    position: absolute;
    top: -2em;
    right: -1.5em;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: var(--font-color);
    background: transparent;
    opacity: 0.3;
    transition: opacity 300ms linear;
    &:hover{
        opacity: 1;
    }
  }


/* Small only */
@media (max-width: $mobile-breakpoint) {
     .modal-backdrop {}
     .modal{
         padding: var(--site-padding);
         width:calc(100vw - var(--site-padding) - var(--site-padding));
         overflow-x: hidden;
     }

     .btn-close {
         display:none;
     }

}
</style>