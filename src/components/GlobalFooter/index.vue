<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="#">版权所有:青岛市农业农村局</a><br>
      <a href="#">技术支持: 铭农(上海)信息科技有限公司电话: 021-60296871 网址: www.miliotech.com</a>
    </template>
    <template v-slot:copyright>
      Copyright 2014 Al rights reserved版本号: V3.8.0 建议使用1024*768以上分辨率和IE8以上版本浏览器
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
