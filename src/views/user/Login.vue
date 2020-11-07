<template>
  <div class="main">
    <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
      <!-- <div class="header">
        <a href="/">
          <img src="~@/assets/logo1.png" class="logo" alt="logo" />
          <span class="title">青岛智慧农业监管系统</span>
        </a>
      </div> -->
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" class="logins">
          <!-- <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="账户或密码错误" />
          <a-alert v-if="isYzmError" type="error" showIcon style="margin-bottom: 24px;" message="验证码错误" /> -->
          <a-form-item class="username">
            <a-input
              type="text"
              placeholder="请输入账号或手机号"
              v-decorator="[
                'username',
                {
                  rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }],
                  validateTrigger: 'change'
                }
              ]"
            >
              <!-- <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" /> -->
            </a-input>
          </a-form-item>

          <a-form-item class="password">
            <!-- <div>qd66089799</div> -->
            <a-input-password

              placeholder="请输入密码"
              v-decorator="[
                'password',
                { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }
              ]"
            >
              <!-- <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" /> -->
            </a-input-password>
          </a-form-item>
          <a-form-item class="yzm">
            <a-input

              placeholder="验证码"
              v-decorator="['yzm', { rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur' }]"
              :maxLength="5"
            >
              <!-- <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" /> -->
            </a-input>
            <canvas
              id="canvas"
              width="105"
              height="40"
              @click="drawYzm()"
              style="position: absolute; top:-15px; margin: 3px 10px; float:right; margin-left: 161px;"
            ></canvas>
          </a-form-item>
          <a-form-item >
            <a-button
              htmlType="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
            ></a-button
            >
          </a-form-item>
        </a-tab-pane>
        <!-- <a-tab-pane key="tab2" tab="手机号登录">
          <a-form-item>
            <a-input size="large" type="text" placeholder="手机号" v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]">
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input size="large" type="text" placeholder="验证码" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane> -->
      </a-tabs>
      <!--
      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa' } }"
          class="forge-password"
          style="float: right;"
        >忘记密码</router-link
        >
      </a-form-item> -->

      <!-- <div class="user-login-other">
        <span>其他登录方式</span>
        <a>
          <a-icon class="item-icon" type="alipay-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="taobao-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="weibo-circle"></a-icon>
        </a>
        <router-link class="register" :to="{ name: 'register' }">注册账户</router-link>
      </div> -->
    </a-form>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>
  </div>
</template>

<script>
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { getSmsCaptcha, get2step } from '@/api/login'
import storage from 'store'
// import { generator } from '@/router/generator-routers.js'
// import router from '@/router'
import request from '@/utils/request'
export default {
  components: {
    TwoStepCaptcha
  },
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      isYzmError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      // randNum: [],
      yzmNum: '',
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  created () {
    get2step({})
      .then(res => {
        this.requiredTwoStepCaptcha = res.result.stepCode
      })
      .catch(() => {
        this.requiredTwoStepCaptcha = false
      })
  },
  mounted () {
    this.drawYzm()
  },
  methods: {
    ...mapActions(['Login', 'Logout', 'GenerateRoutes']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    // 验证码
    drawYzm () {
      this.yzmNum = '' // 清空验证码
      var canvas = document.getElementById('canvas') // 获取到canvas的对象，演员
      var canvasWidth = canvas.offsetWidth
      var canvasHeight = canvas.offsetHeight
      var context = canvas.getContext('2d') // 获取到canvas画图的环境，演员表演的舞台
      canvas.width = canvasWidth
      canvas.height = canvasHeight
      var sCode = 'A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0'
      var aCode = sCode.split(',')
      var aLength = aCode.length // 获取到数组的长度

      for (var i = 0; i <= 3; i++) {
        var j = Math.floor(Math.random() * aLength) // 获取到随机的索引值
        var deg = (Math.random() * 30 * Math.PI) / 180 // 产生0~30之间的随机弧度
        var txt = aCode[j] // 得到随机的一个内容
        // this.randNum[i] = txt.toLowerCase()
        this.yzmNum += txt.toLowerCase()
        var x = 10 + i * 20 // 文字在canvas上的x坐标
        var y = 20 + Math.random() * 8 // 文字在canvas上的y坐标
        context.font = 'bold 23px 微软雅黑'

        context.translate(x, y)
        context.rotate(deg)

        context.fillStyle = this.randomColor()
        context.fillText(txt, 0, 0)

        context.rotate(-deg)
        context.translate(-x, -y)
      }
      for (let i = 0; i <= 5; i++) {
        // 验证码上显示线条
        context.strokeStyle = this.randomColor()
        context.beginPath()
        context.moveTo(Math.random() * canvasWidth, Math.random() * canvasHeight)
        context.lineTo(Math.random() * canvasWidth, Math.random() * canvasHeight)
        context.stroke()
      }
      for (let i = 0; i <= 30; i++) {
        // 验证码上显示小点
        context.strokeStyle = this.randomColor()
        context.beginPath()
        const x = Math.random() * canvasWidth
        const y = Math.random() * canvasHeight
        context.moveTo(x, y)
        context.lineTo(x + 1, y + 1)
        context.stroke()
      }
      return this.yzmNum
    },
    randomColor () {
      // 得到随机的颜色值
      var r = Math.floor(Math.random() * 256)
      var g = Math.floor(Math.random() * 256)
      var b = Math.floor(Math.random() * 256)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    handleTabClick (key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit (e) {
      console.log(this)
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password', 'yzm'] : ['mobile', 'captcha']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          sessionStorage.setItem('FuAccount', values.username)
          const loginParams = { ...values }
          delete loginParams.username
          delete loginParams.password
          // sessionStorage.setItem('getInfo', JSON.stringify(values))

          // 验证码判断
          if (values.yzm) values.yzm = values.yzm.toLowerCase()
          if (values.yzm !== this.yzmNum) {
            this.isYzmError = true
            this.$notification.error({
              message: '验证码不正确，请重新输入'
            })
            state.loginBtn = false
            return false
          } else {
            this.isYzmError = false
          }
          loginParams[!state.loginType ? 'email' : 'Account'] = values.username
          loginParams.PassWord = values.password
          loginParams.flg = 1
          Login(loginParams)
            .then(res => {
              if (res.result === 'false' || !res.result) {
                this.$notification.error({
                  message: res.mes
                })
              } else {
                this.loginSuccess(res)
              }
            })
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    getCaptcha (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state
      } = this

      validateFields(['mobile'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = this.$message.loading('验证码发送中..', 0)
          getSmsCaptcha({ mobile: values.mobile })
            .then(res => {
              setTimeout(hide, 2500)
              this.$notification['success']({
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                duration: 8
              })
            })
            .catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
        }
      })
    },
    stepCaptchaSuccess () {
      this.loginSuccess()
    },
    stepCaptchaCancel () {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },
    loginSuccess (data) {
      console.log('login方法', data)
      data.Data.forEach(item => {
        sessionStorage.setItem('FStId', item.FStId)
        sessionStorage.setItem('FuName', item.FuName)
        sessionStorage.setItem('FuseEName', item.FuseEName)
        sessionStorage.setItem('FSunitUstrId', item.FSunitUstrId)
        sessionStorage.setItem('FSenterpriseName', item.FSenterpriseName)
        sessionStorage.setItem('FSenterpriseId', item.FSenterpriseId)
        sessionStorage.setItem('FuseEid', item.FuseEid)
        // sessionStorage.setItem('AllInfo', JSON.stringify(item))
        storage.set('AllInfo', item)
      })

      storage.set('permissionList', JSON.parse(data.Data[0].PCArray))
      if (!data.Data[0].PCArray) {
        this.$notification.error({
          message: '暂未分配权限'
        })
      }

      request({
        url: 'Security/GetAccessToken?appKey=tysfrz&appSecret=86F0063E11A7BD282537DCCE1FEC6F6E',
        method: 'get',
        data: {
          appKey: 'tysfrz',
          appSecret: '86F0063E11A7BD282537DCCE1FEC6F6E'
        }
      }).then(res => {
        console.log(res)
        storage.set('Access-Token', res.access_token)
        this.isLoginError = false
        // const routerMap = generator(data.menustr)
        // this.GenerateRoutes(routerMap).then(() => {
        //   console.log(this.$route)
        //   console.log(this.$router)
        this.$router.push({ path: '/home' })
        // })
      })
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '用户账号或密码不正确，请重试',
        duration: 4
      })
    }
  }
}
</script>
<style lang="less">
.container {
  background: #f0f2f5 url('../../../public/loginaa.png') no-repeat 50% !important;
  background-size: 100% 100% !important;
  background-attachment: fixed;
}
.ant-form-item-control {

    line-height: 29px !important;

}
#formLogin {
  background: url('~@/assets/logs.png');
  width: 472px;
  height: 377px;
  position: absolute;
  top: 43%;
  left: 51%;
  margin: -183px 0 0 -249px;

  input {
    height: 31px !important;
    line-height: 31px !important;
    font-size: 16px;
    border: none;
    outline: none;
    background: none;
    text-indent: 10px;
  }
  input:hover{
    border: none;
    background: none;
  }
  .username {
    width: 260px;
  }
  .password{
    width: 260px;
  }
  .yzm{
    width: 150px;
  }
  .logins{
    margin: 62px 0 0 147px;
    font-size: 14px;
  }
}
.header {
  height: 44px;
  line-height: 44px;

  .badge {
    position: absolute;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    margin-left: -12px;
    margin-top: -10px;
    opacity: 0.8;
  }

  .logo {
    height: 44px;
    vertical-align: top;
    margin-right: 16px;
    border-style: none;
  }

  .title {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.85);
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
    position: relative;
    top: 2px;
  }
}
.main {
  width: 100%;
  height: 100%;
}

.user-layout-login {
  label {
    font-size: 14px;
  }
  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    // padding: 0 15px;
    // font-size: 16px;
    margin-left: -100px;
    height: 51px;
    width: 100%;
    background: none;
    border: none;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
