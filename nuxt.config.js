export default defineNuxtConfig({
  extends: ["@geode/opengeodeweb-front"],

  modules: [
    "nuxt-electron",
    "vuetify-nuxt-module",
    [
      "@pinia/nuxt",
      {
        autoImports: ["storeToRefs", "defineStore"],
      },
    ],
    "@nuxt/devtools",
    "@vueuse/nuxt",
  ],

  electron: {
    build: [
      {
        // Main-Process entry file of the Electron App.
        entry: "electron/main.js",
      },
      {
        entry: "electron/preload.js",
        onstart(args) {
          args.reload();
        },
      },
    ],
  },

  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      labComponents: true,
      theme: {
        defaultTheme: "lightTheme",
        themes: {
          lightTheme: {
            dark: false,
            colors: {
              primary: "#3c9983",
              secondary: "#424242",
              accent: "#82B1FF",
              error: "#FF5252",
              info: "#2196F3",
              success: "#4CAF50",
              warning: "#FB8C00",
            },
          },
        },
      },
    },
  },

  ssr: false,

  app: {
    head: {
      titleTemplate: "Vease",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Platform for geological data visualization",
        },
      ],
      link: [{ rel: "icon", type: "image/ico", href: "/favicon.ico" }],
    },
  },

  imports: {
    dirs: ["stores", "@geode/opengeodeweb-front/stores"],
  },
  router: {
    options: {
      hashMode: true,
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["md-linedivider"].includes(tag),
    },
  },

  devtools: {
    enabled: process.env.NODE_ENV === "production" ? false : true,
  },

  css: ["assets/css/main.css"],

  vite: {
    optimizeDeps: {
      include: ["@geode/opengeodeweb-front"],
    },
    watch: {
      ignored: ["**"],
    },
  },

  router: {
    options: {
      hashMode: true,
    },
  },

  compatibilityDate: "2024-06-30",
});
