import { BufferTime } from '@constants'

export default {
  mounted () {
    const isValid =
      this !== this.$router.app &&
      this.$el !== document.getElementById('app')
    if (isValid) {
      setTimeout(
        () => this.$eventBus && this.$eventBus.emit(this.$route.name),
        BufferTime
      )
    }
  }
}
