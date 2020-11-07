<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;" @submit="handleSubmit" :form="form">
            <a-row :gutter="24">
              <div class="div5">
                <a-col :sm="24">
                  <a-form-item label="企业名称">
                    <a-input v-model="queryParam.id" size="large" style="width: 100%" />
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary" style="height:40px" @click="mocheck">查询</a-button>
                  </a-form-item>
                </a-col>
              </div>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-item label="调用次数">
                    <a-input-number v-model="queryParam.callNo" style="width: 100%" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="更新日期">
                    <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="使用状态">
                    <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0" style="width: 80px">
                      <a-select-option value="0">全部</a-select-option>
                      <a-select-option value="1">关闭</a-select-option>
                      <a-select-option value="2">运行中</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </template>
              <div class="div4">
                <a-col :md="(!advanced && 8) || 24" :sm="24">
                  <span
                    class="table-page-search-submitButtons"
                    :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
                  >
                    <!-- <a-button type="primary" html-type="submit" style="height:40px">查询</a-button> -->
                    <!-- <a-button type="primary" style="height:40px">查询</a-button> -->
                    <!-- <a-button style="margin-left: 8px;height:40px" @click="() => (queryParam = {})">重置</a-button>
                    <a @click="toggleAdvanced" style="margin-left: 8px">
                      {{ advanced ? '收起' : '展开' }}
                      <a-icon :type="advanced ? 'up' : 'down'" />
                    </a> -->
                  </span>
                </a-col>
              </div>
            </a-row>
          </a-form>
          <div style="margin-top:35px;">
            <a-button type="primary" style="height:40px" icon="plus" @click="showModal()">导出</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-dropdown>
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1">红色</a-menu-item>
                <a-menu-item key="2">绿色</a-menu-item>
                <a-menu-item key="3">蓝色</a-menu-item>
                <a-menu-item key="4">黑色</a-menu-item>
                <a-menu-item key="5">所有</a-menu-item>
              </a-menu>
              <a-button type="primary" style="height:40px">颜色查询</a-button> </a-dropdown
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <a-button type="primary" style="height:40px" @click="showModal()">颜色查询</a-button>&nbsp;&nbsp;&nbsp;&nbsp; -->
            <a-button type="primary" style="height:40px" @click="showModal()">统计</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <a-button type="primary" style="height:40px">导出</a-button>&nbsp;&nbsp;&nbsp;&nbsp; -->
            <a-button type="primary" style="height:40px" @click="showModal()">列表定制</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button
              icon="minus"
              type="primary"
              @click="deletShow()"
              v-show="!this.delteItem && this.FrName === '动监站'"
              style="height:40px"
            >删除</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button
              icon="minus"
              type="primary"
              @click="deletShow()"
              v-show="this.delteItem && this.FrName === '动监站'"
              style="height:40px"
            >批量删除</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- && this.FrName === '动监站' -->
            <a-tree-select
              style="margin-top: -1px ;width: 250px;float:right;"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="所在地"
              allowClear
              :tree-data="options"
              @change="mocheck"
            >
            </a-tree-select>
          </div>
          <!-- 查看 -->
          <a-modal
            cancelText="取消"
            okText="确定"
            title="查看详情"
            :visible="lookInfo"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
            width="1000px"
          >
            <template>
              <a-card title="基本信息">
                <a-card-grid style="background-color:#7aa7d0" :hoverable="false" v-if="this.num >= 1 ? true : false">
                  养殖场、散养户名称
                </a-card-grid>
                <a-card-grid :hoverable="false" v-if="this.num >= 1 ? true : false">
                  {{ listInfo[0].FSenterpriseName }}
                </a-card-grid>
                <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                  详细地址
                </a-card-grid>
                <a-card-grid :hoverable="false">
                  {{ listInfo[0].FAddress }}
                </a-card-grid>
                <a-card-grid style="background-color:#7aa7d0" :hoverable="false" v-if="this.num >= 1 ? true : false">
                  联系方式
                </a-card-grid>
                <a-card-grid :hoverable="false" v-if="this.num >= 1 ? true : false">
                  {{ listInfo[0].DeclarePhone }}
                </a-card-grid>
                <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                  养殖场/畜主姓名身份证号
                </a-card-grid>
                <a-card-grid :hoverable="false">
                  {{ listInfo[0].CardID }}
                </a-card-grid>
                <a-card-grid style="background-color:#7aa7d0" :hoverable="false" v-if="this.num >= 1 ? true : false">
                  银行卡号/一卡通号
                </a-card-grid>
                <a-card-grid style="width:75%!important" :hoverable="false" v-if="this.num >= 1 ? true : false">
                  {{ listInfo[0].OneCardNumber }}
                </a-card-grid>
                <a-card-grid style="background-color:#7aa7d0" :hoverable="false" v-if="this.num >= 1 ? true : false">
                  畜主身份证号与一卡通号照片
                </a-card-grid>
                <a-card-grid style="width:75%!important" :hoverable="false" v-if="this.num >= 1 ? true : false">
                  <viewer :images="CardIDImagephoto">
                    <!-- //photo 一定要一个数组，否则报错 -->
                    <img
                      v-for="(item, index) in CardIDImagephoto"
                      :src="item.src"
                      :key="index"
                      style="width:50px; height:50px;"
                    />
                  </viewer>
                </a-card-grid>
              </a-card>
            </template>
            <div>
              <a-form @submit="handleSubmit" :form="form">
                <div
                  style=" min-height: 300px;width: 800px; margin: 10px auto; text-align: center; font-size: 20px; border:none;"
                >
                  <span>死亡畜禽种类和数量</span>
                  <a-table :columns="columns1" :data-source="data1" bordered :pagination="false" :scroll="{ y: 180 }">
                  </a-table>
                </div>
                <template>
                  <a-card title="" v-if="this.num >= 1 ? true : false">
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      申报人所在位置
                    </a-card-grid>
                    <a-card-grid style="width:75%!important" :hoverable="false">
                      {{ listInfo[0].GPS1 }}
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      死亡畜禽信息图片
                    </a-card-grid>
                    <a-card-grid style="width:75%!important" :hoverable="false">
                      <viewer :images="SWpoto" style="height: 160px">
                        <img
                          v-for="(item, index) in SWpoto"
                          :src="item.src"
                          :key="index"
                          style="width:50px; height:50px;margin:5px"
                        />
                      </viewer>
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      养殖场负责人签字
                    </a-card-grid>
                    <a-card-grid style="width:75%!important" :hoverable="false">
                      <viewer :images="photo" style="height: 60px">
                        <img
                          v-for="(item, index) in Farmspersonphoto"
                          :src="item.src"
                          :key="index"
                          style="width:50px; height:50px;margin-top: 2px;"
                        />
                      </viewer>
                    </a-card-grid>
                  </a-card>
                </template>
                <!---------------------------- 收集人员-------------------------------- -->
                <template>
                  <a-card title="收集人员收集" v-if="this.num >= 2 ? true : false">
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      车牌号
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      {{ listInfo[0].CPH }}
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      装车时间
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      {{ lists.FSuTime2 }}
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      收集位置信息
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      {{ listInfo[0].GPS2 }}
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      监管兽医签字
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      <viewer :images="photo">
                        <!-- //photo 一定要一个数组，否则报错 -->
                        <img
                          v-for="(item, index) in SYQZphoto"
                          :src="item.src"
                          :key="index"
                          style="width:50px; height:50px;"
                        />
                      </viewer>
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      养殖场负责人签字
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      <viewer :images="YZCQZphoto">
                        <!-- //photo 一定要一个数组，否则报错 -->
                        <img
                          v-for="(item, index) in YZCQZphoto"
                          :src="item.src"
                          :key="index"
                          style="width:50px; height:50px;"
                        />
                      </viewer>
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      收集人员签字
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      <viewer :images="photo">
                        <!-- //photo 一定要一个数组，否则报错 -->
                        <img
                          v-for="(item, index) in SJRQZphoto"
                          :src="item.src"
                          :key="index"
                          style="width:50px; height:50px;"
                        />
                      </viewer>
                    </a-card-grid>
                  </a-card>
                </template>
                <!-- ----------------------------------------驻厂兽医核查------------------------------------ -->
                <template>
                  <a-card title="驻厂兽医核查" v-if="this.num >= 3 ? true : false">
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      入场时间
                    </a-card-grid>
                    <a-card-grid style="width:75%!important" :hoverable="false">
                      {{ listInfo[0].FSuTime3 }}
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      驻厂位置信息
                    </a-card-grid>
                    <a-card-grid style="width:75%!important" :hoverable="false">
                      {{ listInfo[0].GPS3 }}
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      入库情况
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      <viewer :images="RKphoto" style="height: 100px;margin-top: -20px;">
                        <!-- //photo 一定要一个数组，否则报错 -->
                        <img
                          v-for="(item, index) in RKphoto"
                          :src="item.src"
                          :key="index"
                          style="width:50px; height:50px;margin:10px"
                        />
                      </viewer>
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      驻厂兽医签字（入库）
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      <viewer :images="ZCSYImage" style="height: 100px;margin-top: -20px;">
                        <!-- //photo 一定要一个数组，否则报错 -->
                        <img
                          v-for="(item, index) in ZCSYImage"
                          :src="item.src"
                          :key="index"
                          style="width:50px; height:50px;margin:10px"
                        />
                      </viewer>
                    </a-card-grid>
                  </a-card>
                </template>
                <!-- 无害化处理 -->
                <template>
                  <a-card title="无害化处理厂处理情况" v-if="this.num >= 4 ? true : false">
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      集中处理时间
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      {{ listInfo[0].FSuTime }}
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      处理方法
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      {{ listInfo[0].CLFS }}
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      温度（℃）
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      {{ listInfo[0].WenDu }}
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      压力（KPa）
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      {{ listInfo[0].CXDate }}
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      持续时间
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      {{ listInfo[0].FSuTime2 }}
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      集中处理位置信息
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      {{ lists.GPS }}
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      处理人签字
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      <viewer :images="CLRYQZ">
                        <!-- //photo 一定要一个数组，否则报错 -->
                        <img
                          v-for="(item, index) in CLRYQZ"
                          :src="item.src"
                          :key="index"
                          style="width:50px; height:50px;"
                        />
                      </viewer>
                    </a-card-grid>
                    <a-card-grid style="background-color:#7aa7d0" :hoverable="false">
                      收集人员签字
                    </a-card-grid>
                    <a-card-grid :hoverable="false">
                      <viewer :images="ZCSYQZ">
                        <!-- //photo 一定要一个数组，否则报错 -->
                        <img
                          v-for="(item, index) in ZCSYQZ"
                          :src="item.src"
                          :key="index"
                          style="width:50px; height:50px;"
                        />
                      </viewer>
                    </a-card-grid>
                  </a-card>
                </template>
                <a-row type="flex" justify="end" align="bottom">
                  <span> 填表时间：{{ this.time }} </span>
                  <!-- 填表人：{{ this.name }} -->
                </a-row>
              </a-form>
            </div>
          </a-modal>
          <!-- 删除弹窗 -->
          <a-modal
            title="删除"
            :visible="InfoDelAll"
            @ok="DeleteByFStId"
            @cancel="handleCancel"
            width="500px"
            :destroyOnClose="true"
          >
            <a-form :form="delForm">
              <a-form-item
                label="删除人"
                :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
              >
                <a-input v-decorator="['SCR', { rules: [{ required: true, message: '删除人' }] }]" name="SCR" />
              </a-form-item>
              <a-form-item
                label="删除原因"
                :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
              >
                <a-textarea v-decorator="['SCYY', { rules: [{ required: true, message: '删除原因' }] }]" name="SCYY" />
              </a-form-item>
            </a-form>
          </a-modal>
          <!-- 页面表格 -->
          <a-table
            :rowKey="record => record.FStId"
            :loading="isloading"
            :pagination="false"
            :columns="columns"
            :data-source="data"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
            :rowClassName="fnRowClass"
          >
            <template slot="action" slot-scope="text, record">
              <a v-permission="{ active: 'decsele' }" slot="action" @click="Look(record)">查看&nbsp;&nbsp;</a>
            </template>
          </a-table>
        </div>
        {{ tjInfo }}
        <!-- 养殖场（户）数：1855 申报死亡畜禽种类数：9 畜种：猪
        15338；猪(30-70cm)：10973；猪(70cm以上)：4352；奶牛
        46；肉牛1805；羊96；蛋鸡49923,132836.40公斤；肉鸡1180811,1959951.40公斤；鸭12387,26688.00公斤；鹅0,0.00公斤；兔43492,167108.00公斤其他3613,12712.00公斤 -->
      </div>
      <div>
        <a-pagination
          show-quick-jumper
          :default-current="offset"
          :total="total"
          show-less-items
          :current="offset"
          @change="onChange"
          style="margin: 10px"
        />
        <span
          style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
        >当前第 {{ this.offset }}/{{ Math.ceil(this.total / 10) }} 页 共 {{ this.total }} 条记录 每页 10 条</span
        >
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
// 接口请求调用
// import { getToken } from '@/api/getToken'
// 统计的方法TotalDataInfo暂定
import { FindAll, FindByInfo, getAppletCallDeclareDel, TotalDataInfo } from '@/api/sbjl'
import formatTime from '@/utils/public.js'
import { getAdminAddress } from '@/api/AdministrativeAddress'
// import http from '@/utils/httpapi'
var yenum = 1
// const Base64 = require('js-base64').Base64
const columns = [
  {
    title: '序号',
    width: 80,
    align: 'center',
    dataIndex: 'FStId',
    key: 'FStId',
    customRender: (t, r, index) => {
      if (yenum === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenum - 1) * 10 + 1
      }
    }
  },
  {
    title: '状态',
    width: 200,
    align: 'center',
    dataIndex: 'DeclareStatus',
    key: 'DeclareStatus',
    customRender: (t, r, index) => {
      // console.log(t, r, index)
      if (r.DeclareStatus === '1' || r.DeclareStatus === '0') {
        return '畜主已申报'
      } else if (r.DeclareStatus === '2') {
        return '收集人员已收集'
      } else if (r.DeclareStatus === '3') {
        return '驻场兽医已核查'
      } else if (r.DeclareStatus === '4') {
        return '无害化已处理'
      } else {
        return '暂未查询到状态'
      }
    }
  },
  { title: '企业名称', width: 200, align: 'center', dataIndex: 'FSenterpriseName', key: 'FSenterpriseName' },
  { title: '企业类型', width: 200, align: 'center', dataIndex: 'FEnterpriseType', key: 'FEnterpriseType' },
  {
    title: '地址',
    width: 200,
    align: 'center',
    dataIndex: 'FAddress',
    key: 'FAddress',
    customRender: (t, r, index) => {
      return t.replace(/\//g, '')
    }
  },
  {
    title: '申报时间',
    width: 200,
    align: 'center',
    dataIndex: 'DeclareDate',
    key: 'DeclareDate',
    customRender: (t, r, index) => {
      return r.DeclareDate ? formatTime(r.DeclareDate, 'yyyy-MM-dd hh:mm:ss') : ''
    }
  },
  { title: '申报来源', width: 200, align: 'center', dataIndex: 'UploadType', key: 'UploadType' },
  // { title: '法人代表', width: 200, dataIndex: 'LegalPerson', key: 'LegalPerson' },
  { title: '申报人电话', width: 200, align: 'center', dataIndex: 'DeclarePhone', key: 'DeclarePhone' },
  { title: '申报动物种类', width: 200, align: 'center', dataIndex: 'AnimalType', key: 'AnimalType' },
  // { title: '畜主身份证号', width: 200, align: 'center', dataIndex: 'CardID', key: 'CardID' },
  { title: '申报数量', width: 200, align: 'center', dataIndex: 'DeclareNum1', key: 'DeclareNum1' },
  { title: '实际处理数量', width: 200, align: 'center', dataIndex: 'DeclareNum', key: 'DeclareNum' },
  {
    title: '实际处理重量',
    width: 200,
    align: 'center',
    dataIndex: 'SWZL',
    key: 'SWZL',
    customRender: (t, r, index) => {
      if (r.DeclareStatus === '1') return 0
      if (r.AnimalType === '猪') return r.JZL
      if (r.AnimalType === '鸡') return r.JZL
      if (r.AnimalType === '肉鸡') return r.RJZL
      if (r.AnimalType === '鸭') return r.YYZL
      if (r.AnimalType === '鹅') return r.EZL
      if (r.AnimalType === '兔') return r.TZL
      if (r.AnimalType === '其他重量') return r.TTZL
    }
  },
  // { title: '收集人姓名', width: 200, align: 'center', dataIndex: 'SJName', key: 'CollectpersonnelName' },
  // { title: '身份证号码', width: 200, dataIndex: 'CardID', key: 'CardID' },
  // { title: '一卡通号', width: 200, align: 'center', dataIndex: 'OneCardNumber', key: 'OneCardNumber' },
  // {
  //   title: '收集日期',
  //   width: 200,
  //   align: 'center',
  //   dataIndex: 'SJTime',
  //   key: 'SJTime',
  //   customRender: (t, r, index) => {
  //     return formatTime(r.SJTime, 'yyyy-MM-dd hh:mm:ss')
  //   }
  // },
  // { title: '现存栏数', width: 200, align: 'center', dataIndex: 'XianCunlan', key: 'XianCunlan' },

  // { title: '地址', width: 350, align: 'center', dataIndex: 'FAddress', key: 'FAddress' },
  { title: '删除人', width: 200, align: 'center', dataIndex: 'SCR', key: 'SCR' },
  {
    title: '删除时间',
    width: 200,
    align: 'center',
    dataIndex: 'SCSJ',
    key: 'SCSJ',
    customRender: (t, r, index) => {
      return t ? formatTime(t, 'yyyy-MM-dd hh:mm:ss') : ''
    }
  },
  { title: '删除原因', width: 200, align: 'center', dataIndex: 'SCYY', key: 'SCYY' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
// 模拟数据
const data = []
const columns1 = [
  { title: '种类', width: 100, dataIndex: 'kind', key: 'kind' },
  { title: '数量', width: 100, dataIndex: 'num', key: 'num' },
  { title: '重量', width: 100, dataIndex: 'weight', key: 'weight' },
  { title: '参保数', width: 100, dataIndex: 'canbaoshu', key: 'canbaoshu' },
  { title: '耳标号', width: 110, dataIndex: 'erbiaohao', key: 'erbiaohao' }
]
const data1 = []
const keys = 'updatable'
export default {
  inject: ['reload'],
  name: 'BaseForm',

  data () {
    return {
      photo: [
        {
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598867830455&di=9125d637685fb33d5558c32a953db099&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F05%2F00%2F01300000194285122188000535877.jpg'
        }
        // { src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598867830455&di=9125d637685fb33d5558c32a953db099&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F05%2F00%2F01300000194285122188000535877.jpg' }
      ],
      // 畜主身份证号和一卡通号照片
      CardIDImagephoto: [],

      Farmspersonphoto: [],
      // 收集人签字
      SJRQZphoto: [],
      // 养殖场负责人签字
      YZCQZphoto: [],
      // 兽医签字图片
      SYQZphoto: [],
      // 入库照片
      RKphoto: [],
      // 驻场兽医签字(入库)
      ZCSYImage: [],
      // 驻场兽医签字(处理)
      ZCSYQZ: [],
      // 处理人签字
      CLRYQZ: [],
      lookInfo: false,
      lx: '',
      // 总条数
      total: 0,
      offset: 1,
      limit: 10,
      options: [],
      queryParam: { status: 0, status1: 0 },
      value: '',
      hasSelected: 'true',
      fromdata: '',
      // 是否是批量删除
      delteItem: false,
      InfoDelAll: false,
      // from 表单
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      delForm: this.$form.createForm(this),

      // 点击 新增弹出框
      // ModalText: '请不要输入错误噢~',
      visible: false,
      updateinfo: false,
      danwei: false,
      confirmLoading: false,
      confirmLoading1: false,
      deletinfo: false,
      jinyong: false,
      qiyedanwei: '',
      isloading: false,
      data1,
      columns1,
      data,
      columns,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      selectedRowKeys1: [],
      loading: false,
      userdanwei1: '',
      number: 0,
      allFStid: [],
      allFStidInfo: [],
      num: 0,
      name: '',
      time: '',
      // 图片路径前缀
      photoQZ: 'data:image/jpg;base64,',
      // 死亡畜
      SWpoto: [],
      FSenterpriseName: '',
      UserId: sessionStorage.getItem('FStId'),
      Status: '',
      unitID: sessionStorage.getItem('FSunitUstrId'),
      listInfo: [{}],
      lists: {},
      FrName: JSON.parse(localStorage.getItem('AllInfo')).FrName,
      scrInfo: false,
      tjInfo: ''
    }
  },
  created () {
    this.isloading = true
    yenum = 1
    getAdminAddress()
      .then(res => {
        // this.options = JSON.parse(res)
        this.options = res
      })
      .catch(err => {
        console.log(err)
      })
    var p = {
      offset: this.offset,
      limit: this.limit,
      FSenterpriseName: this.FSenterpriseName,
      UserId: this.UserId,
      Status: this.Status,
      unitID: this.unitID
    }
    FindAll(p).then(res => {
      var datalist = JSON.parse(res.Data)
      this.data = datalist.rows
      this.total = datalist.total
      this.isloading = false
    })
    this.getTongji()
  },
  mounted () {
    // 页面加载完成调用
    // 统计
    // var p = {
    //   UserId: this.UserId,
    //   Status: this.Status,
    //   unitID: this.unitID
    // }
    // TotalDataInfo(p).then(res => {})
  },
  methods: {
    mocheck (checkedValues, e) {
      // if (!this.queryParam.id) this.reload()
      // this.FSenterpriseName = this.queryParam.id
      this.limit = 10
      this.offset = 1
      yenum = 1
      // if (!checkedValues && this.queryParam.id === '') {
      //   this.reload()
      // }
      // console.log(this.queryParam.id)
      if (!e) {
        // if (!this.queryParam.id) this.reload()
        this.FSenterpriseName = this.queryParam.id || ''
      } else if (e.length) {
        this.options.forEach(item => {
          if (item.label === e[0]) {
            this.unitID = item.key
          } else {
            item.children.forEach(itemCh => {
              if (itemCh.label === e[0]) {
                this.unitID = itemCh.key
              } else {
                itemCh.children.forEach(itemS => {
                  if (itemS.label === e[0]) {
                    this.unitID = itemS.key
                  }
                })
              }
            })
            console.log(this.unitID)
          }
        })
      } else if (!e.length) {
        this.unitID = ''
      }
      var p = {
        offset: this.offset,
        limit: this.limit,
        FSenterpriseName: this.FSenterpriseName,
        UserId: this.UserId,
        Status: this.Status,
        unitID: this.unitID
      }
      FindAll(p).then(res => {
        var datalist = JSON.parse(res.Data)
        console.log('所有用户信息')
        console.log(datalist)
        this.data = datalist.rows
        this.total = datalist.total
      })
      this.getTongji()
    },
    // 获取统计
    getTongji () {
      var p = {
        FSenterpriseName: this.FSenterpriseName,
        UserId: this.UserId,
        Status: this.Status,
        unitID: this.unitID
      }
      TotalDataInfo(p).then(res => {
        console.log(res)
        this.tjInfo = res || ''
      })
    },
    fnRowClass (record, index) {
      if (record.DeclareStatus === '1') {
        return 'cssRed'
      } else if (record.DeclareStatus === '2') {
        return 'cssGreen'
      } else if (record.DeclareStatus === '3') {
        return 'cssBlue'
      } else {
        return 'cssBlack'
      }
    },
    handleMenuClick (v) {
      console.log(v)
      if (v.key === '5') {
        this.Status = ''
      } else {
        this.Status = v.key
      }

      this.limit = 10
      this.offset = 1
      yenum = 1
      var p = {
        offset: this.offset,
        limit: this.limit,
        FSenterpriseName: this.FSenterpriseName,
        UserId: this.UserId,
        Status: this.Status,
        unitID: this.unitID
      }
      FindAll(p).then(res => {
        var datalist = JSON.parse(res.Data)
        console.log('所有用户信息')
        console.log(datalist)
        // datalist.rows.forEach(item => {
        //   item.DeclareDate = item.DeclareDate.replace('T', ' ')
        // })
        this.data = datalist.rows

        this.total = datalist.total
      })
      this.getTongji()
    },
    Look (v) {
      if (!v.DeclareStatus) {
        this.$notification.error({
          message: '此条数据已失效，请联系管理人员'
        })
        return
      }
      this.$message.loading({ content: '加载中', keys, duration: 1 })
      FindByInfo(v.FStId).then(res => {
        console.log(res)
        this.data1 = []
        this.SWpoto = []
        this.CardIDImagephoto = []
        this.Farmspersonphoto = []
        this.YZCQZphoto = []
        this.SJRQZphoto = []
        this.SYQZphoto = []
        this.RKphoto = []
        this.ZCSYImage = []
        this.Z30Earmarks = []
        this.ZCSYQZ = []
        this.CLRYQZ = []

        if (res.Data != null) {
          this.lookInfo = true
          this.$message.success({ content: '加载成功', keys, duration: 2 })
          if (res.Data.list && !res.Data.list2) {
            this.listInfo = res.Data.list
          } else if (res.Data.list && res.Data.list2) {
            this.listInfo = res.Data.list
            this.listInfo[0].CLFS = res.Data.list2[0].CLFS
            this.listInfo[0].CLRYQZ = res.Data.list2[0].CLRYQZ
            this.listInfo[0].CXDate = res.Data.list2[0].CXDate
            this.listInfo[0].FSuTime = res.Data.list2[0].FSuTime
            this.listInfo[0].FSuserName = res.Data.list2[0].FSuserName
            this.listInfo[0].WenDu = res.Data.list2[0].WenDu
            this.listInfo[0].YL = res.Data.list2[0].YL
            this.listInfo[0].ZCSYQZ = res.Data.list2[0].ZCSYQZ
            this.listInfo[0].GPS = res.Data.list2[0].GPS
          }
          this.listInfo.forEach((item, index) => {
            if (index === 0) {
              var DeclareStatus = item.DeclareStatus
              if (item.Animalphotos1) {
                console.log(item.Animalphotos1.split(','))
                item.Animalphotos1.split(',').forEach(items => {
                  // console.log(items)
                  if (items.length) {
                    this.SWpoto.push({ src: this.photoQZ + items })
                  }
                })
                // this.SWpoto.push({ src: this.photoQZ + item.Animalphotos1 })
              }
              if (item.Animalphotos2) {
                this.SWpoto.push({ src: this.photoQZ + item.Animalphotos2 })
              }
              if (item.Animalphotos3) {
                this.SWpoto.push({ src: this.photoQZ + item.Animalphotos3 })
              }
              // 图片接收
              this.Farmspersonphoto.push({ src: this.photoQZ + item.Farmsperson })
              this.CardIDImagephoto.push({ src: this.photoQZ + item.CardIDImage })
              this.YZCQZphoto.push({ src: this.photoQZ + item.YZCQZ })
              this.SJRQZphoto.push({ src: this.photoQZ + item.SJRQZ })
              this.SYQZphoto.push({ src: this.photoQZ + item.SYQZ })
              this.ZCSYImage.push({ src: this.photoQZ + item.ZCSYImage })
              this.ZCSYQZ.push({ src: this.photoQZ + item.ZCSYQZ })
              this.CLRYQZ.push({ src: this.photoQZ + item.CLRYQZ })
              // console.log(item.DeclareStatus)
              if (item.RKImage1) {
                this.RKphoto.push({ src: this.photoQZ + item.RKImage1 })
              }
              if (item.RKImage2) {
                this.RKphoto.push({ src: this.photoQZ + item.RKImage2 })
              }
              if (item.DeclareStatus === '1') {
                this.data1.push({
                  kind: item.AnimalType,
                  num: item.DeclareNum,
                  weight: '',
                  canbaoshu: item.CBS,
                  erbiaohao: ''
                })
              } else {
                // 猪
                if (item.Z30SL || item.Z30CBS || item.Z30Earmarks) {
                  this.data1.push({
                    kind: '猪（30cm以下）',
                    num: item.Z30SL,
                    weight: '',
                    canbaoshu: item.Z30CBS,
                    erbiaohao: item.Z30Earmarks
                  })
                }
                if (item.Z37SL || item.Z37CBS || item.Z37Earmarks) {
                  this.data1.push({
                    kind: '猪（30cm～70cm）',
                    num: item.Z37SL,
                    weight: '',
                    canbaoshu: item.Z37CBS,
                    erbiaohao: item.Z37Earmarks
                  })
                }
                if (item.Z70SL || item.Z70CBS || item.Z30Earmarks) {
                  this.data1.push({
                    kind: '猪（70cm以上）',
                    num: item.Z70SL,
                    weight: '',
                    canbaoshu: item.ZCBS,
                    erbiaohao: item.ZEarmarks
                  })
                }
                // 牛
                if (item.NSL || item.NCBS || item.NEarmarks) {
                  this.data1.push({
                    kind: '牛',
                    num: item.NSL,
                    weight: '',
                    canbaoshu: item.NCBS,
                    erbiaohao: item.NEarmarks
                  })
                }
                // 羊
                if (item.YSL || item.YEarmarks) {
                  this.data1.push({
                    kind: '羊',
                    num: item.YSL,
                    weight: '',
                    canbaoshu: '',
                    erbiaohao: item.NEarmarks
                  })
                }
                // 奶牛
                if (item.RNSL || item.RNCBS || item.RNEarmarks) {
                  this.data1.push({
                    kind: '奶牛',
                    num: item.RNSL,
                    weight: '',
                    canbaoshu: item.RNCBS,
                    erbiaohao: item.RNEarmarks
                  })
                }
                // 鸡
                if (item.JSL || item.JZL) {
                  this.data1.push({
                    kind: '鸡',
                    num: item.JSL,
                    weight: item.JZL,
                    canbaoshu: '',
                    erbiaohao: ''
                  })
                }

                // 肉鸡
                if (item.RJZL || item.RJSL) {
                  this.data1.push({
                    kind: '肉鸡',
                    num: item.RJSL,
                    weight: item.RJZL,
                    canbaoshu: '',
                    erbiaohao: ''
                  })
                }
                // 鸭
                if (item.YYZL || item.YYSL) {
                  this.data1.push({
                    kind: '鸭',
                    num: item.YYSL,
                    weight: item.YYZL,
                    canbaoshu: '',
                    erbiaohao: ''
                  })
                }
                // 鹅
                if (item.EZL || item.ESL) {
                  this.data1.push({
                    kind: '鹅',
                    num: item.ESL,
                    weight: item.EZL,
                    canbaoshu: '',
                    erbiaohao: ''
                  })
                }
                // 兔
                if (item.TSL || item.TZL) {
                  this.data1.push({
                    kind: '兔',
                    num: item.TSL,
                    weight: item.TZL,
                    canbaoshu: '',
                    erbiaohao: ''
                  })
                }
                // 其他
                if (item.TTSL || item.TTZL) {
                  this.data1.push({
                    kind: '其他',
                    num: item.TTSL,
                    weight: item.TTZL,
                    canbaoshu: '',
                    erbiaohao: ''
                  })
                }
              }

              // console.log(DeclareStatus)
              // 根据状态判断填表时间
              if (DeclareStatus === '1') {
                this.name = item.FSuserName1 ? item.FSuserName1 : '未查询到'
                this.time = item.FSuTime1 ? formatTime(item.FSuTime1, 'yyyy-MM-dd hh:mm:ss') : '未查询到'
              } else if (DeclareStatus === '2') {
                this.name = item.FSuserName2 ? item.FSuserName2 : '未查询到'
                this.time = item.FSuTime2 ? formatTime(item.FSuTime2, 'yyyy-MM-dd hh:mm:ss') : '未查询到'
              } else if (DeclareStatus === '3') {
                this.name = item.FSuserName3 ? item.FSuserName3 : '未查询到'
                this.time = item.FSuTime3 ? formatTime(item.FSuTime3, 'yyyy-MM-dd hh:mm:ss') : '未查询到'
              } else if (DeclareStatus === '4') {
                this.name = item.FSuserName4 ? item.FSuserName4 : '未查询到'
                this.time = item.FSuTime ? formatTime(item.FSuTime, 'yyyy-MM-dd hh:mm:ss') : '未查询到'
              }
              this.num = parseInt(item.DeclareStatus)
              item.FSuTime2 = formatTime(item.FSuTime2, 'yyyy-MM-dd hh:mm:ss')
              item.FSuTime = formatTime(item.FSuTime, 'yyyy-MM-dd hh:mm:ss')
              item.FSuTime3 = formatTime(item.FSuTime3, 'yyyy-MM-dd hh:mm:ss')

              this.$nextTick(() => {
                this.form.setFieldsValue({
                  FSenterpriseName: item.FSenterpriseName,
                  FAddress: item.FAddress,
                  DeclarePhone: item.DeclarePhone,
                  ClientCardID: v.CardID,
                  OneCardNumber: item.OneCardNumber,
                  CardIDImage: item.CardIDImage,
                  DeclareNum: item.DeclareNum,
                  SWZL: item.SWZL,
                  CBS: item.CBS,
                  EBH: item.EBH,
                  GPS: item.GPS1,
                  // Animalphotos1: item.Animalphotos1,
                  // Animalphotos2: item.Animalphotos2,
                  // Animalphotos3: item.Animalphotos3,
                  Farmsperson: item.Farmsperson,
                  CPH: item.CPH,
                  FScTime: item.FSuTime2,
                  SJRYGPS: item.GPS2,
                  YZCQZ: item.YZCQZ,
                  SJRQZ: item.SJRQZ,
                  SYQZ: item.SYQZ,
                  RKImage1: item.RKImage1,
                  RKImage2: item.RKImage2,
                  // ZCSYImage: item.ZCSYImage,
                  FSuTime3: item.FSuTime3,
                  GPS3: item.GPS3,
                  CLFS: item.CLFS,
                  WenDu: item.WenDu,
                  YL: item.YL,
                  CXDate: item.CXDate,
                  // CLRYQZ: item.CLRYQZ,
                  ZCSYQZ: item.ZCSYQZ,
                  FSuTime: item.FSuTime,
                  GPS4: item.GPS
                })
              })
            }
            console.log('执行l')
            this.lists = item
            console.log(this.form.setFieldsValue.item)
            // 死亡种类判断
            // if (v.DeclareNum) {
            //   console.log(v.DeclareNum.substr(0, 9))
            // }
            console.log('----------------------')
            console.log(this.lists)
            console.log(this.listInfo)
          })
        }
      })
    },
    onSearch (value) {
      console.log(value)
    },
    deletShow () {
      if (this.allFStid.length > 0) {
        this.allFStidInfo.forEach(item => {
          if (item.SCR) {
            this.scrInfo = true
          }
        })
        if (this.scrInfo) {
          this.$notification.error({
            message: '请选择未被删除的记录'
          })
          this.scrInfo = false
        } else {
          this.InfoDelAll = true
          this.$nextTick(() => {
            this.delForm.setFieldsValue({
              SCR: sessionStorage.getItem('FuName') || ''
            })
          })
        }
      } else {
        this.$notification.error({
          message: '请选择要删除的数据'
        })
      }
    },
    // 批量删除
    DeleteByFStId () {
      this.delForm.validateFields((err, v) => {
        if (!err) {
          if (this.allFStid.length > 0) {
            console.log(this.allFStid)
            var p = {
              FSmemo3: this.allFStid.join(','),
              SCR: this.delForm.getFieldValue('SCR') || JSON.parse(localStorage.getItem('AllInfo')).FrName,
              SCSJ: this.delForm.getFieldValue('SCSJ') || formatTime(null, 'yyyy-MM-dd hh:mm:ss'),
              SCYY: this.delForm.getFieldValue('SCYY') || ''
            }
            getAppletCallDeclareDel(p).then(res => {
              if (res.Result) {
                this.$notification.success({
                  message: '删除成功'
                })
                this.reload()
              } else {
                this.$notification.error({
                  message: '删除失败请联系管理人员'
                })
              }
              this.InfoDelAll = false
            })
          } else {
            this.$notification.error({
              message: '请选择要删除的数据'
            })
          }
        } else {
          this.$notification.error({
            message: '请检查输入信息'
          })
        }
      })
    },
    handleSelectChange (value) {
      console.log(value)
      this.$nextTick(() => {
        this.form.setFieldsValue({
          note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
        })
      })
    },
    handleSelectChange1 (value) {
      console.log(value)
      this.lx = value
    },
    onChange (checkedValues) {
      console.log('checked = ', checkedValues)
      yenum = checkedValues
      this.offset = checkedValues
      var p = {
        offset: this.offset,
        limit: this.limit,
        FSenterpriseName: this.FSenterpriseName,
        UserId: this.UserId,
        Status: this.Status,
        unitID: this.unitID
      }
      FindAll(p).then(res => {
        // console.log(JSON.parse(res.Data).rows)
        this.data = JSON.parse(res.Data).rows
        this.total = JSON.parse(res.Data).total
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      // 把要删除的FStid放入数组
      console.log('selectedRows changed: ', selectedRows)
      var arr = []
      var arrInfo = []
      if (selectedRows.length) {
        selectedRows.forEach(item => {
          console.log(item.FStId)
          arrInfo.push(item)
          this.allFStidInfo = arrInfo
          arr.push(item.FStId)
          this.allFStid = arr
        })
      }
      if (selectedRows.length > 1) {
        this.delteItem = true
      } else {
        this.delteItem = false
      }
      arr = []
      arrInfo = []
    },
    onSelectChange1 (selectedRowKeys) {
      console.log('selectedRowKeys1 changed: ', selectedRowKeys)
      //   this.selectedRowKeys1 = selectedRowK eys
    },

    // 弹窗
    showModal (formName) {
      this.$notification.error({
        message: '待开发，敬请期待'
      })
      // this.fromdata = 'add'
      // this.visible =  true
    },
    // 弹窗关闭
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      this.data1.splice(0, this.data1.length)
      setTimeout(() => {
        this.lookInfo = false
        this.confirmLoading = false
      }, 100)
      // this.reload()
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.lookInfo = false
      this.data1.splice(0, this.data1.length)
      this.InfoDelAll = false
      // this.reload()
    },

    //  新增fro m表单验证
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.$nextTick(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.btn[data-v-6dafff04] {
  width: 129%;
}
.div {
  background-color: white;
  height: 80px;
}
.div1 {
  background-color: white;
  padding-bottom: 5px;
}
.div2 {
  margin-left: 20px;
}
.div3 {
  margin-left: 20px;
}
.bq {
  font-size: 18px;
  color: black;
  margin-top: 10px;
  font-weight: bold;
}
.div4 {
  margin-top: 20px;
}
.btn {
  width: 280%;
}
.div5 {
  margin-top: 24px;
}
.tab div {
  height: 60px;
  border: rgba(0, 0, 0, 0.1) 1px solid;
  line-height: 60px;
  text-align: center;
  margin: -1px;
}
.tab input {
  background-color: white;
  border: none;
  height: 60px;
}
.tab p {
  background-color: #7aa7d0;
  height: 60px;
}

/deep/.cssRed td {
  color: red;
}
/deep/.cssGreen td {
  color: green;
}
/deep/.cssBlue td {
  color: blue;
}
/deep/.cssBlack td {
  color: black;
}
.ant-card-grid {
  height: 80px;
  width: 25% !important;
  text-align: center;
}
</style>
