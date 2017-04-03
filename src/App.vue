<template lang="pug">
  #app
    .left-section
      router-view.page
      .btns.flex-center
        button.btn(
          @click="switchPage(false)",
          :disabled="isPrinting",
          :class="{ disabled: isPrinting }"
        ) ←
        button.btn.print-btn(
          @click="print",
          :disabled="isPrinting",
          :class="{ disabled: isPrinting }"
        ) {{ isPrinting ? 'Printing...' : 'Print!' }}
        button.btn(
          @click="switchPage(true)",
          :disabled="isPrinting",
          :class="{ disabled: isPrinting }"
        ) →
      .hint.flex-center(
        ref="hint",
        :class="{ hide: !isHinting }"
      ) Saved
    .right-section
      iframe.pdf-content(
        v-show="pdfData"
        :src="pdfData"
      )
</template>

<script>
  import JsPDF from 'jspdf'
  import { html2pdf, timeout, forEach } from '@utils'

  export default {
    data: () => ({
      pdfData: null,
      isPrinting: false,
      isHinting: false,
      pages: [],
      mountedRoutes: [],
      unsubscribe: null
    }),
    methods: {
      switchPage (isNext = true) {
        const currentRouteName = this.$router.currentRoute.name
        const index = this.pages.findIndex(name => name === currentRouteName)
        let targetIndex = isNext ? index + 1 : index - 1
        const lastPageIndex = this.pages.length - 1
        if (isNext && index === lastPageIndex) targetIndex = 0
        else if (!isNext && index === 0) targetIndex = lastPageIndex
        this.$router.replace({ name: this.pages[targetIndex] })
      },
      print () {
        this.isPrinting = true
        this.$router.replace({ name: this.pages[0] })
        let pdf = new JsPDF('p', 'pt', 'a4')
        this.mountedRoutes = []

        const self = this

        forEach(this.pages, async function (name, index) {
          const done = this.async()
          window.scrollTo(0, 0)
          self.$router.replace({ name })
          if (index !== 0) pdf.addPage()
          await self.waitUntilMounted(name, index)
          try {
            pdf = await html2pdf(self.$el.querySelector('.page'), pdf)
          } catch (e) {
            console.warn(e)
            this.isPrinting = false
          }
          done()
        }, () => {
          this.isPrinting = false
          this.showHint()
          this.pdfData = pdf.output('datauristring')
        })
      },
      showHint () {
        this.isHinting = true
        setTimeout(() => (this.isHinting = false), 3000)
      },
      async waitUntilMounted (routeName, index) {
        const getIsValid = () => this.mountedRoutes[index] === routeName &&
          this.mountedRoutes.length === index + 1
        while (!getIsValid()) await timeout(500)
      }
    },
    created () {
      this.$router.options.routes.forEach(route => {
        route.name && this.pages.push(route.name)
      })
    },
    mounted () {
      this.unsubscribe =
        this.$eventBus.subscribe(route => this.mountedRoutes.push(route))
    },
    beforeDestroy () {
      this.unsubscribe && this.unsubscribe()
    }
  }
</script>

<style lang="stylus">
  @import '~@styles/styles'

  $a4-height = 842px
  $a4-width = 595px
  $border-color = lightgrey

  #app
    width 100%
    display flex
    overflow hidden
    background #ededed
    font-family Helvetica
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50

  .page
    flex 0 0 $a4-width + 1
    max-height $a4-height + 1
    height $a4-height + 1
    max-width $a4-width + 1
    overflow hidden
    background #fff
    border-right 1px dashed $border-color
    border-bottom 1px dashed $border-color
    box-shadow 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)

  .left-section
    flex 0 0 $a4-width + 1
    height "calc(%s + 200px)" % ($a4-height)
  .right-section
    flex 1

  .btns
    margin 1rem
  .btn
    display inline-block
    margin 1rem
    padding .5rem
    width 120px
    height 56px
    font-size 1.1em
    background #5bb75b
    color white
    border none
    border-radius 4px
    text-align center
    text-decoration none
    box-shadow 2px 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
    cursor pointer
    transition background .2s
    &:hover
      background #51a351
  .print-btn
    background #fbb450
    &:hover
      background #f89406
  .disabled
    pointer-events none
    background darkgrey
    &:hover
      background darkgrey

  .hint
    color #bc4142
    margin-top 1rem
    font-size 1.5em
    opacity 1
    transition opacity 3s
  .hide
    opacity 0

  .pdf-content
    width 100%
    height 100%
</style>
