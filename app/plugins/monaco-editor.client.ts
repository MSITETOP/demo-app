import { install } from '@guolao/vue-monaco-editor'

export default defineNuxtPlugin((nuxtApp) => {
  // Install Monaco Editor plugin for Vue
  nuxtApp.vueApp.use(install)
})