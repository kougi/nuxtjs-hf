import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
// export default defineNuxtConfig({

//     css: [
//         '~assets/css/styles.css'
//       ],
    
    
//     buildModules: [
//     '@nuxtjs/style-resources',
//   ],
//   env: {},
    
//   vite: {

//   },
  
//   styleResources: {
//     scss: [
//       '~assets/scss/mixins.scss',
//       '~assets/scss/variables.scss'
//     ]
//   },
// })


export default defineNuxtConfig({
    target: 'static', // default is 'server'
    //  ssr: false,
    buildDir: 'nuxt-build',
    meta: {
        meta: [
          // <meta name="viewport" content="width=device-width, initial-scale=1">
          { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
    },

    head: {
        title: "Hambly Freeman - Technical Challenge",
        meta: [
          { charset: "utf-8" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          {
            hid: "description",
            name: "description",
            content: "Technical challenge. Made in NuxtJS"
          }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
      },

    css: [
        '@/assets/scss/_main.scss',
        '@/assets/scss/_variables.scss',
    ],

    // modules: [
    // '@nuxtjs/style-resources'
    // ],

    // styleResources: {
    //     scss: ['./assets/scss/*.scss']
    //   },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/scss/_sass-variables.scss"',
                },
            },
        },
    },


      build: {
        transpile: [
          "gsap"
        ]
      },
});