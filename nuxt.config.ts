import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
    //target: 'static', // default is 'server'
    //  ssr: false,
    //buildDir: 'nuxt-build',
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