<template>
  <div>
    <div class="top">
      <div class="top_right">
        <a-dropdown>
          <a-avatar
            class="avatar"
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          />

          <a-menu class="ant-pro-drop-down" slot="overlay" @click="handleMenuClick">
            <a-menu-item class="menuItem" key="1"> 退出登录 </a-menu-item>
          </a-menu>

        </a-dropdown>
        <span>{{ this.userName }}</span>
      </div>
    </div>
    <a-row :gutter="[24, 32]" style="margin-top: 10px">
      <a-col :span="10">
        <a-card class="acard">
          <h2>通知公告</h2>
          <div class="item-group">

            <a v-for="(item, index) in announcementsData" :key="index" @click="seeAnnouncementOne(item)">
              <span>{{ item.Fititle }}
              </span>
              <p class="s1">{{ item.FiDate }}</p>
            </a
            ><br />

          </div>
        </a-card>
      </a-col>
      <a-col :span="14">
        <baidu-map class="map" center="青岛市">
          <bm-geolocation
            anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
            :showAddressBar="true"
            :autoLocation="true"
          ></bm-geolocation>
        </baidu-map>
      </a-col>
    </a-row>
    <div class="gutter-example">
      <a-row :gutter="16">
        <a-col :span="4">
          <div class="but used" id="tu0" @click="old">
            <span>畜牧生产</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div class="but" id="tu1" @click="tiaoRouter('jyjg')">
            <span>检疫监管</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div id="tu2" class="but used" @click="old">
            <span>兽药饲养</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div id="tu3" class="but" @click="old">
            <span>疫病防控</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div id="tu4" class="but used" @click="old">
            <span>畜产品安全</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div id="tu5" class="but s" @click="tiao1('tzgl')">
            <span>屠宰管理</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div id="tu6" class="but s" @click="tiao1('whhcl')">
            <span>无害化处理</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div id="tu7" class="but" @click="tiaoRouter('jbfk')">
            <span>耳标追溯</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div id="tu8" class="but used" @click="old">
            <span>兽医管理</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div id="tu9" class="but used" @click="old">
            <span>应急管理</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div id="tu10" class="but used" @click="old">
            <span>机构人员</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div id="tu11" class="but s" @click="tiaoRouter('jcsj')">
            <span>基础数据</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div id="tu12" class="but used" @click="old">
            <span>行政执法</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div id="tu13" class="but" @click="tiaoRouter('form')">
            <span>先打后补</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div id="tu14" class="but used" @click="old">
            <span>畜禽产品合格证</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div id="tu15" class="but s" @click="tiaoRouter('dashboard')">
            <span>系统管理</span>
          </div>
        </a-col>
      </a-row>
    </div>

    <div class="foot">
      <p>版权所有:青岛市农业农村局</p>
      <p>技术支持: 铭农(上海)信息科技有限公司电话: 021-60296871 网址: www.miliotech.com</p>
      <p>Copyright 2014 Al rights reserved版本号: V3.8.0 建议使用1024*768以上分辨率和IE8以上版本浏览器</p>
    </div>
    <a-modal
      okText="确认"
      cancelText="取消"
      title="查看"
      :visible="seeinfo"
      @ok="handleOk"
      @cancel="handleCancel"
      width="650px"
    >
      <div>
        <p><b>标题</b>：《{{ Fititle }}》</p>
        <p><b>级别</b>：【{{ FiJB }}】</p>
        <p>
          <b>内容</b>：
          <span v-html="FiContent">{{ FiContent }} </span>
        </p>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue'
import avatarDro from '@/components/GlobalHeader/AvatarDropdown'
import http from '@/utils/httpapi'
import formatTime from '@/utils/public.js'
var Base64 = require('js-base64').Base64
export default {
  components: {
    avatarDro
  },
  data () {
    return {
      userName: sessionStorage.getItem('FuName'),
      UserId: sessionStorage.getItem('FStId'),
      announcementsData: [],
      // 通知公告查看
      Fititle: '',
      FiJB: '',
      FiContent: '',
      seeinfo: false
    }
  },
  mounted () {
    this.getAnnouncements()
  },
  methods: {
    handleMenuClick (e) {
      if (parseInt(e.key) === 1) {
        Modal.confirm({
          title: this.$t('确定退出登录吗？'),
          content: this.$t('是否退出'),
           okText: '确认',
        cancelText: '取消',
          onOk: () => {
            return this.$store.dispatch('Logout').then(() => {
              this.$router.push({ name: 'login' })
            })
          }
        })
      }
    },
    seeAnnouncementOne (v) {
      console.log('查看通知公告详情')
      this.seeinfo = true
      console.log(this.seeinfo)
      this.$axios
        .get(http + '/Management/AppletInformGetWhere?FStId=' + v.FStId)
        .then((res) => {
          this.Fititle = JSON.parse(JSON.stringify(res.data.Data[0].Fititle))
          this.FiJB = JSON.parse(JSON.stringify(res.data.Data[0].FiJB))
          this.FiContent = JSON.parse(JSON.stringify(res.data.Data[0].FiContent))
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleOk (e) {
      setTimeout(() => {
        this.seeinfo = false
      }, 100)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.seeinfo = false
    },
    getAnnouncements () {
      // 通知公告
      this.$axios({
        url: http + '/Management/AppletInformGet?FSunitUstrId=&Fititle=&offset=1&limit=10',
        method: 'get',
        headers: {
          UserId: this.UserId
        }
      })
        .then((res) => {
          var datalist = JSON.parse(res.data.Data)
          datalist.rows.forEach((item) => {
            item.FiDate = formatTime(item.FiDate, 'yyyy-MM-dd')
          })
          this.announcementsData = datalist.rows
        })
        .catch((err) => {
          console.log('通知公告获取 失败' + err)
        })
    },

    tiao (urlName) {
      console.log(urlName)
      this.$router.push({ name: urlName })
    },
    tiao1 (urlName) {
      const FSunitUstrId = sessionStorage.getItem('FSunitUstrId')
      if (FSunitUstrId.indexOf('0110') !== -1) {
        this.tiaoRouter(urlName)
      } else {
        this.old()
      }
    },
    tiaoRouter (urlName) {
      const arr = this.$router.options.routes[0].children

      const jurisdiction = JSON.parse(localStorage.getItem('permissionList'))
      if (!jurisdiction) {
        this.$notification.error({
          message: '未分配该权限',
          duration: 1.5
        })
        return
      }
      for (const item of arr) {
        // console.log(item.name)
        if (item.name === urlName) {
          const perm = item.children
          // eslint-disable-next-line no-unused-vars
          var tt = true
          // eslint-disable-next-line no-unused-vars
          var nameU = {}
          for (const i of perm) {
            if (jurisdiction.indexOf(i.meta.permission) !== -1) {
              // console.log(i.name)
              // this.$router.push({ name: i.name })
              nameU = { name: i.name }
              tt = true
              break
            } else {
              tt = false
            }
          }
          if (tt) {
            this.$router.push({ name: nameU.name })
          } else {
            this.$notification.error({
              message: '未分配该权限',
              duration: 1.5
            })
          }
          // this.$router.push({ name: item.children[0].children[0].name })
          // this.$router.push({ name: item.children[0].name })
        }
      }
    },
    old () {
      const user = JSON.parse(localStorage.getItem('AllInfo'))
      const username = user.FuAccount + ',' + user.FuPassWord
      // eslint-disable-next-line no-unused-vars
      const t = Base64.encode(username)

      window.open('http://qdxmsupervision.qingdao.gov.cn:8181/QDPT/Home.aspx?key=' + t)
    }
  }
}
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
  overflow: hidden;
  box-sizing: border-box;
}
.top {
  position: relative;
  width: 100%;

  height: 80px;
  background-image: url('../assets/img/top1.jpg');
  background-repeat: no-repeat;
  background-color: #2668be;
  .top_right {
    position: absolute;
    right: 120px;
    top: 50%;
    transform: translateY(-50%);
    span {
      color: #fff;
      margin-left: 5px;
    }
  }
}
/deep/ .ant-pro-drop-down {
  margin-left: 50px;
  margin-top: 5px;
  top: 20px;
}
/deep/ .menuItem {
  padding-left: 25%;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100px;
}
.acard {
  height: 413px;

  background-color: #59B44F;
  h2{
    color: #fff;
    font-family: STSong;
  }
}
.notice {
  height: 313px;
}
.map {
  display: inline-block;
  width: 100%;
  margin-left: 0px;

  height: 413px;
}
.iconA {
  margin: 0 auto;
  width: 1327px;
}
.iconA a {
  float: left;
  width: 15%;
  background: blue;
  height: 80px;
  margin-left: 10px;
  margin-top: 10px;
}

#tu0 {
  background: url('../assets/img/m2-0.png') left center no-repeat rgb(#7bb2e5);
}

#tu1 {
  background: url('../assets/img/m2-1.png') left center no-repeat rgb(#7bb2e5);
}
#tu2 {
  background: url('../assets/img/m2-2.png') left center no-repeat rgb(#7bb2e5);
}
#tu3 {
  background: url('../assets/img/m2-3.png') left center no-repeat rgb(#7bb2e5);
}
#tu4 {
  background: url('../assets/img/m2-4.png') left center no-repeat rgb(#7bb2e5);
}
#tu5 {
  background: url('../assets/img/m2-5.png') left center no-repeat rgb(#7bb2e5);
}
#tu6 {
  background: url('../assets/img/m2-6.png') left center no-repeat rgb(#7bb2e5);
}
#tu7 {
  background: url('../assets/img/m2-7.png') left center no-repeat rgb(#7bb2e5);
}

#tu8 {
  background: url('../assets/img/m2-8.png') left center no-repeat rgb(#7bb2e5);
}

#tu9 {
  background: url('../assets/img/m2-9.png') left center no-repeat rgb(#7bb2e5);
}

#tu10 {
  background: url('../assets/img/m2-10.png') left center no-repeat rgb(#7bb2e5);
}

#tu11 {
  background: url('../assets/img/m2-11.png') left center no-repeat rgb(#7bb2e5);
}
#tu12 {
  background: url('../assets/img/m2-12.png') left center no-repeat rgb(#7bb2e5);
}
#tu13 {
  background: url('../assets/img/m2-13.png') left center no-repeat rgb(#7bb2e5);
}
#tu14 {
  background: url('../assets/img/m2-14.png') left center no-repeat rgb(#7bb2e5);
}

#tu15 {
  background: url('../assets/img/m2-15.png') left center no-repeat rgb(#7bb2e5);
}

.but {
  background: rgb(107 169 228);
  height: 70px;
  margin-top: 10px;
  position: relative;

  span {
    position: absolute;
    top: 50%;

    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.s {
  background: #f08080;
}
.used {
  background: #8fbc8f;
}
.gutter-example {
  margin-top: 10px;
}

 .item-group {

  padding: 20px 0 8px 24px;
  font-size: 0;
  margin-top: 10px;
  > a {

    color: #fff;
    display: inline-block;
    font-size: 14px;
    margin-bottom: 7px;
    width: 100%;
    position: relative;
    span{
      display: inline-block;
      width: 80%;
      overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
    }
    .s1{
       display: inline-block;
      position: absolute;
      right: 0px;
    }
  }
}
.foot {
  margin-top: 10px;
  width: 100%;
  text-align: center;
  background: #2668be;
  letter-spacing: 2px;
  padding: 10px 0;
    color: #bcc9dc;
    font-size: 8px;

  p {
    margin-bottom: 5px;

  }
}
</style>
