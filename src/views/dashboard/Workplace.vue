<template>
  <page-header-wrapper>
    <template v-slot:content>
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="currentUser.avatar" />
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix }}，欢迎来到青岛智慧畜牧<span class="welcome-text">{{ welcome }}</span>
          </div>
        </div>
      </div>
    </template>
    <div style="margin-top:35px;">
      <!-- 通知公告查看 -->
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
    <div>
      <a-row :gutter="24">
        <a-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
          <!-- <a-card hoverable >
            <img
              slot="cover"
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <template slot="actions" class="ant-card-actions">
              <a-icon key="setting" type="setting" /> <a-icon key="edit" type="edit" />
              <a-icon key="ellipsis" type="ellipsis" />
            </template>
            <a-card-meta title="Card title" description="This is the description">
              <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </a-card-meta>
          </a-card> -->
          <a-card :loading="loading" title="数据报表" :bordered="false" class="bb">
            <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
              <bar :data="barData" title="" />
            </a-col>
          </a-card>
        </a-col>

        <a-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
          <a-card :loading="loading" title="数据报表" :bordered="false" class="bb">
            <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
              <bar :data="barData" title="" />
            </a-col>
          </a-card>
        </a-col>

        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card title="通知公告" style="margin-bottom: 24px;" :bordered="false" :body-style="{ padding: 0 }">
            <div class="item-group">
              <a v-for="(item, index) in announcementsData" :key="index" @click="seeAnnouncementOne(item)">
                {{ item.Fititle }} &nbsp;&nbsp;&nbsp;&nbsp; {{ item.FiDate }}</a><br />
              <!-- <a>收购环节检疫证号关联信息功能恢复正常 2020-03-24 </a><br />
              <a>收购环节检疫证号关联信息功能恢复正常 2020-03-24 </a><br />
              <a>收购环节检疫证号关联信息功能恢复正常 2020-03-24 </a><br />
              <a>收购环节检疫证号关联信息功能恢复正常 2020-03-24 </a><br />
              <a>收购环节检疫证号关联信息功能恢复正常 2020-03-24 </a><br />
              <a>收购环节检疫证号关联信息功能恢复正常 2020-03-24 </a><br />
              <a>收购环节检疫证号关联信息功能恢复正常 2020-03-24 </a> -->
            </div>
          </a-card>
          <a-card :loading="loading" title="团队" :bordered="false">
            <div class="members">
              <a>收购环节检疫证号关联信息功能恢复正常 2020-03-24 </a><br />
              <a>收购环节检疫证号关联信息功能恢复正常 2020-03-24 </a><br />
              <a>收购环节检疫证号关联信息功能恢复正常 2020-03-24 </a><br />
              <a>收购环节检疫证号关联信息功能恢复正常 2020-03-24 </a><br />
              <a>收购环节检疫证号关联信息功能恢复正常 2020-03-24 </a>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-header-wrapper>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar, Bar } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'
import http from '@/utils/httpapi'
import formatTime from '@/utils/public.js'

const DataSet = require('@antv/data-set')
const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}
export default {
  name: 'Workplace',
  components: {
    PageHeaderWrapper,
    Radar,
    Bar
  },
  data () {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},
      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: [],
      barData,
      barData2,
      announcementsData: [],
      UserId: sessionStorage.getItem('FStId'),
      // 通知公告查看
      Fititle: '',
      FiJB: '',
      FiContent: '',
      seeinfo: false,
      // data
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [
        {
          dataKey: 'score',
          min: 0,
          max: 80
        }
      ],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 }
      ],
      radarData: [],
      permissionList: ['a', 'b', 'c']
    }
  },
  computed: {
    ...mapState({
      nickname: state => state.user.nickname,
      welcome: state => state.user.welcome
    }),
    currentUser () {
      return {
        name: sessionStorage.getItem('FuName') ? sessionStorage.getItem('FuName') : '未登录',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
      }
    },
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    // this.test()
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar

    getRoleList().then(res => {
      // console.log('workplace -> call getRoleList()', res)
    })

    getServiceList().then(res => {
      // console.log('workplace -> call getServiceList()', res)
    })
    // this.requiredTwoStepCaptcha = true
    // const resD = JSON.parse(sessionStorage.getItem('getInfo'))

    // const FuAccount = resD.username
    // const FuPassWord = resD.password
    // console.log(FuAccount, FuPassWord)

    // this.$axios({
    //   method: 'post',
    //   url: http + '/User/AppletUserInfo?FuAccount=' + FuAccount + '&FuPassWord=' + FuPassWord
    // }).then(res => {
    //   console.log(res)
    //   sessionStorage.setItem('FStId', res.data.Data[0].FStId)
    //   sessionStorage.setItem('FuName', res.data.Data[0].FuName)
    //   sessionStorage.setItem('FuseEName', res.data.Data[0].FuseEName)
    //   sessionStorage.setItem('FSunitUstrId', res.data.Data[0].FSunitUstrId)
    //   sessionStorage.setItem('FSenterpriseName', res.data.Data[0].FSenterpriseName)
    // }).catch(rol => {
    //   console.log(rol)
    // })
  },
  mounted () {
    this.getProjects()
    this.getActivity()
    this.getTeams()
    this.initRadar()
    this.getAnnouncements()
  },
  methods: {
    // test () {
    //   let obj = [
    //     {
    //       meta: { id: 0 },
    //       child: [
    //         {
    //           meta: {}
    //         }
    //       ]
    //     },
    //     {
    //       meta: {},
    //       child: [
    //         {
    //           meta: {}
    //         }
    //       ]
    //     }
    //   ]
    //   const newObj = []
    //   obj = this.test2(obj, newObj)
    //   console.log(newObj)
    // },
    // test2 (obj, newObj) {
    //   obj.map(item => {
    //     if (!item.meta.permission) {
    //       newObj.push(item)
    //     } else {

    //     }
    //   })
    // },
    getProjects () {
      this.$http.get('/list/search/projects').then(res => {
        this.projects = res.result && res.result.data
        this.loading = false
      })
    },
    getActivity () {
      this.$http.get('/workplace/activity').then(res => {
        this.activities = res.result
      })
    },
    getTeams () {
      this.$http.get('/workplace/teams').then(res => {
        this.teams = res.result
      })
    },
    initRadar () {
      this.radarLoading = true

      this.$http.get('/workplace/radar').then(res => {
        const dv = new DataSet.View().source(res.result)
        dv.transform({
          type: 'fold',
          fields: ['个人', '团队', '部门'],
          key: 'user',
          value: 'score'
        })

        this.radarData = dv.rows
        this.radarLoading = false
      })
    },
    getAnnouncements () { // 通知公告
      this.$axios({
            url:
              http +
              '/Management/AppletInformGet?FSunitUstrId=&Fititle=&offset=1&limit=10',
            method: 'get',
            headers: {
              UserId: this.UserId
            }
          }).then(res => {
              var datalist = JSON.parse(res.data.Data)
              datalist.rows.forEach(item => {
              item.FiDate = formatTime(item.FiDate, 'yyyy-MM-dd')
          })
              this.announcementsData = datalist.rows
          }).catch(err => {
            console.log('通知公告获取 失败' + err)
          })
      },
      seeAnnouncementOne (v) {
      console.log('查看通知公告详情')
      this.seeinfo = true
      console.log(this.seeinfo)
      this.$axios
        .get(http + '/Management/AppletInformGetWhere?FStId=' + v.FStId)
        .then(res => {
          this.Fititle = JSON.parse(JSON.stringify(res.data.Data[0].Fititle))
          this.FiJB = JSON.parse(JSON.stringify(res.data.Data[0].FiJB))
          this.FiContent = JSON.parse(JSON.stringify(res.data.Data[0].FiContent))
        })
        .catch(err => {
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
    }
  }
}
</script>

<style lang="less" scoped>
@import './Workplace.less';

.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }

  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;

    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }

    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }

  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;

  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 100%;
  }
}

.members {
  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 100%;

    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }

    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
.bb {
  width: 151%;
}
</style>
