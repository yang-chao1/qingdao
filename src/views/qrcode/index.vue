<template>
  <div id="qrcode" ref="qrcode"></div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {

  // eslint-disable-next-line vue/require-prop-types
  props: ['visible', 'codeId', 'trainName'],
  data () {
    return {
      qrcode: ''
    }
  },
  computed: {
    show: {
      get: function () {
        return this.visible
      },
      set: function () {}
    }
  },
  watch: {
    // 生成二维码js必须在 this.$nextTick(function(){调用})或setTimeout(() => { 调用 }, 100)，是为了确保二维码容器DOM已经存在
    visible (newVisible, fs) {
        // console.log(newVisible, fs)
        // console.log('二维码类型')
        // console.log(this.visible, this.codeId, this.qrcode)
          setTimeout(() => {
              this.init()
          }, 0)
    }
  },

  created () {
    this.visible = true
  },
  methods: {
    // 生成二维码
    init () {
      // 为了防止重复生成二维码，使用置空进行控制
      document.getElementById('qrcode').innerHTML = ''
      // 设置二维码内容  显示内容(text所指向内容)必须是UTF-8编码格式。
      const content = this.codeId
      this.qrcode = new QRCode('qrcode', {
        width: 80,
        height: 80,
        colorDark: '#000',
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.L, // 容错率，L/M/H
        text: content
      })
      console.log(content)
    },
    handleCancel () {
      this.$emit('close')
    },
    // 下载二维码
    hanleDown () {
      const imgs = document.getElementById('qrcode').getElementsByTagName('img')
      const a = document.createElement('a')
    //   a.download = this.trainName + new Date().getTime() || '一期一档二维码'
      a.href = imgs[0].src
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
}
</script>
<style scoped>
#qrcode {
  /* margin: 0 36px; */
  position: absolute;
  top: 20px;
  left: 100px;
  width: 100px;
  height: 100px;
}
</style>
