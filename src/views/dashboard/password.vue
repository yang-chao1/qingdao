<template>
  <div class="password">
    <!-- 页头 -->

    <page-header-wrapper>

      <!-- 内容 -->

      <div class="from-boox">

        <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
          <a-form @submit="handleSubmit" :form="form">
            <a-form-item
              label="用户账号"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-input v-model="FuAccount" placeholder="当前登录用户账号" disabled/>
            </a-form-item>

            <a-form-item
              label="旧密码"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-input
                v-decorator="[
                  'JiuPassword',
                  {rules: [{ required: true, message: '密码不能为空' }, {pattern: /^(?![^A-z]+$)(?!\D+$)[A-z\d]{8,16}$/, message: '密码必须是8-16为数字加字母组成'}]}
                ]"
                name="pwss"
                type="password"
                placeholder="请输入用户密码" />
            </a-form-item>

            <a-form-item
              label="新密码"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-input-password
                :visibilityToggle="true"
                v-decorator="[
                  'password',
                  {rules: [{ required: true, message: '新密码不能为空' }, {pattern: /^(?![^A-z]+$)(?!\D+$)[A-z\d]{8,16}$/, message: '密码必须是8-16为数字加字母组成'}]}
                ]"

                name="password"
                placeholder="请输入新密码" />
            </a-form-item>

            <a-form-item
              label="确认密码"
              :visibilityToggle="true"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-input-password
                v-decorator="[
                  'FuPassWord',
                  {rules: [{ required: true, message: '再次输入密码不能为空' }, {pattern: /^(?![^A-z]+$)(?!\D+$)[A-z\d]{8,16}$/, message: '密码必须是8-16为数字加字母组成'}]}
                ]"
                type="password"
                name="password2"
                placeholder="请输再次输入密码" />
            </a-form-item>

            <a-form-item
              :wrapperCol="{ span: 24 }"
              style="text-align: center"
            >
              <a-button htmlType="submit" type="primary">确定</a-button>
              <!-- <a-button style="margin-left: 8px" @click="replaceInfo">重置</a-button> -->
            </a-form-item>
          </a-form>
        </a-card>

      </div>
    </page-header-wrapper>
  </div>
</template>

<script>
import http from '@/utils/httpapi'
import { GetToken } from '@/api/getToken'
// import Qs from 'qs'
export default {
 name: 'BaseForm',
  data () {
    return {
      FuAccount: sessionStorage.getItem('FuAccount'),
      form: this.$form.createForm(this)
    }
  },
  methods: {
    replaceInfo () {
      this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // var data = JSON.stringify(values)
          if (values.FuPassWord !== values.password) {
            this.$message.error('新密码与确认密码不一致')
            this.form.resetFields()
          } else if (values.JiuPassword === values.password) {
            this.$message.error('新密码与旧密码一致')
            this.form.resetFields()
          } else {
            // var data = {
            //   FuPassWord: values.FuPassWord,
            //   JiuPassword: values.JiuPassword,
            //   FStId: 1
            // }
            var timestamp = (new Date()).valueOf()
            GetToken().then(res => {
              console.log(res.access_token)
              console.log(timestamp)
              this.$axios({
                method: 'post',
                url: http + '/User/PutPwd?FuPassWord=' + values.FuPassWord + '&JiuPassword=' + values.JiuPassword + '&FStId=' + sessionStorage.getItem('FStId'),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'AccessToken': res.access_token,
                  'timestamp': timestamp
                }
              }).then((res) => {
                console.log('修改密码成功' + res)
                setTimeout(() => {
                  this.$notification.success({
                    message: '修改密码成功'
                  })
                }, 100)
              }).catch((err) => {
                console.log('修改密码失败' + err)
              })
            })
          }
          this.form.resetFields()
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}

</script>

<style scoped>
.div{
  background-color: white;
  height: 80px;
}
.div1{
  background-color: white;
  margin-top: 40px;
}
.div2{
  margin-left: 20px;
}
.div3{
  margin-left: 20px;
}
.bq{
  font-size: 18px;
  color: black;
  margin-top: 10px;
  font-weight: bold;
}
.div4{
  margin-top: 20px;
}
.btn{
  width: 280%;
}
.div5{
  margin-top: 24px;
}

.from-boox{

background: #fff;
margin-top: 40px;
}
</style>
