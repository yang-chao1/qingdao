<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :sm="24">
                  <a-form-item label="法人代表或养殖场名称">
                    <a-input v-model="queryParam.id" placeholder="" size="large" style="width: 100%" />
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
                    <a-select placeholder="请选择" default-value="0" style="width: 80px">
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
                    <!-- <a-button type="primary" style="height:40px" @click="$refs.table.refresh(true)">查询</a-button> -->
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
            <!-- 查看 -->
            <a-modal
              title="基层动监站审核详情"
              :visible="fintinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
              :footer="null"
            >
              <!--申请进度模块  -->
              <div>
                <a-card :bordered="false" title="申请进度">
                  <a-steps :current="applyPlan" progressDot>
                    <a-step>
                      <template v-slot:title>
                        <span>疫苗申请</span>
                      </template>
                    </a-step>
                    <a-step>
                      <template v-slot:title>
                        <span>基层动检站审核</span>
                      </template>
                    </a-step>
                    <a-step title="区市畜牧主管部门审核" />
                    <a-step title="市级主管部门审核" />
                  </a-steps>
                </a-card>
              </div>
              <!--基本信息模块  -->
              <div class="all">
                <p>基本信息</p>
                <a-form @submit="handleSubmit" :form="form">
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="养殖场名称"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['FyzName']" disabled />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="养殖畜种"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Fyzxz']" disabled />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="法定代表人"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Ffddbr']" disabled />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="联系方式"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Flxfs']" disabled />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="25">
                      <a-form-item
                        label="地址"
                        :labelCol="{ lg: { span: 5 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 15 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Fdz']" disabled />
                      </a-form-item>
                    </a-col>
                    <!-- <a-col :span="12">
                      <a-form-item
                        label="一卡通号"
                        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
                        <a-input
                          v-decorator="[
                            'yikatonghao',
                            {rules: [{ required: true, message: '请输入' }]}
                          ]"
                          disabled/>
                      </a-form-item>
                    </a-col> -->
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="账号"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Fzh', { rules: [{ required: true, message: '请输入' }] }]" disabled />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="开户行"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Fkhh', { rules: [{ required: true, message: '请输入' }] }]" disabled />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="实时存栏数"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['Fcunls', { rules: [{ required: true, message: '请输入' }] }]"
                          disabled
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="实免数（头/只）"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Fsms', { rules: [{ required: true, message: '请输入' }] }]" disabled />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="疫苗种类"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Fymzl']" disabled />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="申请补贴数"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['NewFsqbts']" disabled />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="申请人地址"
                        :labelCol="{lg: {span: 10}, sm: {span: 10}}"
                        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
                        <a-input
                          v-decorator="[
                            'shenqingrendizhi',
                            {rules: [{ required: true, message: '请输入' }]}
                          ]"
                          disabled/>
                      </a-form-item>
                    </a-col>
                  </a-row> -->
                </a-form>
                <p style="margin-left: 30px;">申请人所在位置:{{ GPSFSm4 }}</p>
              </div>
              <!-- 查看里的 购买信息模块 -->
              <div class="all">
                <p>购买信息</p>
                <a-table :columns="columns1" :data-source="shopInfo" style="width:900px; margin: 0 auto;">
                  <a slot="name" slot-scope="text">{{ text }}</a>
                </a-table>
              </div>
              <!-- 查看里的 附件管理模块 -->
              <div class="all fujianguanli">
                <p>附件管理</p>
                <div>
                  <viewer :images="photoPro" class="photos">
                    <!-- //photo 一定要一个数组，否则报错 -->
                    <span>与当地畜牧兽医主管部门签订的承诺书</span>
                    <img
                      v-for="(item, index) in photoPro"
                      :src="item ? item : ''"
                      :key="index"
                      alt="承诺书"
                      style="width:60px; height:60px;"
                    />
                  </viewer>
                </div>
                <div>
                  <viewer :images="photoVase" class="photos">
                    <!-- //photo 一定要一个数组，否则报错 -->
                    <span>已使用疫苗空瓶照片</span>
                    <img
                      v-for="(item, index) in photoVase"
                      :src="item ? item : ''"
                      :key="index"
                      alt="承诺书"
                      style="width:60px; height:60px;"
                    />
                  </viewer>
                </div>
                <div>
                  <viewer :images="photoRep" class="photos">
                    <!-- //photo 一定要一个数组，否则报错 -->
                    <span
                    >具有资质的兽医实验室出具相关强制免疫疫苗 免疫抗体检测报告原件（上半年、下半年各一
                      份）,免疫抗体合格率并达到国家规定标准</span
                      >
                    <img
                      v-for="(item, index) in photoRep"
                      :src="item ? item : ''"
                      :key="index"
                      alt="承诺书"
                      style="width:60px; height:60px;"
                    />
                  </viewer>
                </div>
              </div>
              <!-- 查看里的  实际注射疫苗二维码信息模块 -->
              <div class="all">
                <div>
                  <p>实际注射疫苗二维码信息</p>
                  <a-table :columns="columns2" :data-source="QRcordInfo" :pagination="false" style="margin: 0 auto;">
                    <a slot="name" slot-scope="text">{{ text }}</a>
                  </a-table>
                  <a-button
                    @click="showMore"
                    v-show="this.QRcordInfo.length && this.fintinfo"
                    type="primary"
                    style="width:150px;margin:20px  0 20px calc(50% - 102px);"
                  >
                    查看更多
                  </a-button>
                </div>

                <!-- <a-form-item :wrapper-col="{ span: 12, offset: 10 }">
                  <a-button type="primary" :span="8" style="width:150px">
                    查看更多
                  </a-button>
                </a-form-item> -->
                <div class="tab">
                  <a-form @submit="handleSubmit" :form="form" class="checkForm">
                    <a-row type="flex" justify="space-between" align="bottom">
                      <a-col class="applyTrue" :span="4">
                        <div>
                          <p>申请人签字</p>
                        </div>
                      </a-col>
                      <a-col class="applyTrue" :span="8">
                        <viewer :images="[applePeoplePh.V11]">
                          <img
                            style="width: 40px;height:30px;"
                            :src="applePeoplePh.V11 ? applePeoplePh.V11 : ''"
                            alt="申请人签字"
                          />
                        </viewer>
                      </a-col>
                      <a-col class="applyTrue" :span="4">
                        <div>
                          <p>申请日期</p>
                        </div>
                      </a-col>
                      <a-col class="applyTrue applyCheck" :span="8">
                        <div>
                          <p>{{ applePeoplePh.FScTime || '' }}</p>
                        </div>
                      </a-col>
                    </a-row>
                  </a-form>
                </div>
                <a-row type="flex" justify="space-between" align="bottom">
                  <a-col :span="12">
                    <!-- 查看里的 通过按钮 -->
                    <a-form-item :wrapper-col="{ span: 16, offset: 13 }">
                      <a-button type="primary" @click="auditOKInfo" :span="8" style="width:150px; margin-top: 40px">
                        审核通过
                      </a-button>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <!-- 查看里的 驳回按钮 -->
                    <a-form-item :wrapper-col="{ span: 16, offset: 4 }">
                      <a-button type="danger" @click="auditNO" :span="8" style="width:150px; margin-top: 40px">
                        驳回
                      </a-button>
                    </a-form-item>
                  </a-col>
                </a-row>
              </div>
            </a-modal>
            <!-- 驳回弹窗 -->
            <a-modal
              title="驳回"
              :visible="bohuiinfo"
              :confirm-loading="confirmLoading"
              @ok="handleSubmit"
              @cancel="handleCancel1"
              width="600px"
            >
              <div>
                <a-form @submit="handleSubmit" :form="applyInfoFrom">
                  <a-form-item
                    label="审核人"
                    :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-input v-decorator="['bohuiren']" placeholder="审核人" name="bohuiren" />
                  </a-form-item>
                  <a-form-item
                    label="驳回原因"
                    :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-textarea
                      placeholder="驳回原因"
                      :rows="4"
                      v-decorator="['bohuiRe', { rules: [{ required: true, message: '请输入' }] }]"
                      name="bohuiRe"
                    />
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>
            <!-- 审核通过弹窗 -->
            <a-modal
              title="审核通过"
              :visible="shenheinfo"
              :confirm-loading="confirmLoading"
              @ok="auditOK"
              @cancel="handleCancel1"
              width="600px"
              :zoom="1000"
            >
              <div>
                <a-form @submit="handleSubmit" :form="applyInfoFrom">
                  <a-form-item
                    label="审核人"
                    :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-input v-decorator="['shenheren']" placeholder="审核人" name="shenheren" />
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>
            <!-- 二维码查看更多 -->
            <a-modal
              title="实际注射疫苗二维码信息"
              :visible="showEWmore"
              :confirm-loading="confirmLoading"
              @ok="handleCancelY"
              @cancel="handleCancelY"
              width="80vw"
              :zIndex="1000"
              destroyOnClose
            >
              <div>
                <!-- <p>实际注射疫苗二维码信息</p> -->
                <!-- :pagination="false" -->
                <a-table :pagination="false" :columns="columns2" :data-source="QRcordInfoMore" style="margin: 0 auto;">
                  <a slot="name" slot-scope="text">{{ text }}</a>
                </a-table>
                <a-button
                  @click="showMore"
                  v-show="this.QRcordInfoMore.length >= 50"
                  type="primary"
                  style="width:150px;margin:20px  0 20px calc(50% - 102px);"
                >
                  查看更多
                </a-button>
              </div>
            </a-modal>

            <!-- <a-button type="primary" style="height:40px" @click="handleEdit()">批量删除</a-button>&nbsp;&nbsp;&nbsp;&nbsp; -->
            <!-- <a-cascader
              style="margin-top: -1px ;width: 250px;float:right;"
              :options="options"
              placeholder="所在地"
              size="large"
              @change="mocheck"
            >
              <a-icon
                slot="suffixIcon"
                type="environment"
                class="test"
                :style="{ fontSize: '26px', 'margin-top': '-11px', 'margin-right': '8px' }"
              />
            </a-cascader> -->
            <a-tree-select
              style="width: 15%;position: relative;
  left: 84%; top: 0;"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="所在地"
              :tree-data="options"
              allowClear
              @change="mocheck"
            >
            </a-tree-select>
          </div>
          <a-table
            :columns="columns"
            :data-source="applyInfo"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
            :pagination="false"
          >
            <span style="margin-left: 8px">
              <template v-if="hasSelected">
                {{ `Selected ${selectedRowKeys.length} items` }}
              </template>
            </span>
            <template slot="action" slot-scope="text, record">
              <a slot="action" v-permission="{ active: 'btssele' }" @click="fint(record)">查看&nbsp;&nbsp;</a>
            </template>
          </a-table>
          <div style="display: flex;justify-content: space-between;padding: 20px 30px 20px 0;">
            <a-pagination
              size="small"
              :total="this.total"
              show-size-changer
              show-quick-jumpera
              @change="changePage"
              :current="offset"
              @showSizeChange="onShowSizeChange"
            />
            <span>当前第{{ offset }} / {{ totalPage }} 页 共 {{ total }} 条记录 每页 {{ limit }} 条</span>
          </div>
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
import http from '@/utils/httpapi'
// import { min } from 'moment'
import { getTime } from '@/utils/time'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import formatTime from '@/utils/public.js'
import { returnFSunitUstrId, returnFSunitUstrIdTree } from '@/utils/returnFSunitUstrId'
var yenum1 = 1
var yeOffset = 10
const columns = [
  {
    title: '序号',
    width: 80,
    dataIndex: 'FStId',
    align: 'center',
    key: 'FStId',
    customRender: (t, r, index) => {
      // console.log('序号处理', t, r, index)
      if (yenum1 === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenum1 - 1) * yeOffset + 1
      }
    }
  },
  { title: '状态', width: 120, align: 'center', dataIndex: 'Fzt', key: 'Fzt' },
  { title: '养殖场名称', width: 200, align: 'center', dataIndex: 'FyzName', key: 'FyzName' },
  {
    title: '地址',
    width: 350,
    align: 'center',
    dataIndex: 'Fdz',
    key: 'Fdz',
    customRender: (t, r, index) => {
      return t.replace(/\//g, '')
    }
  },
  { title: '法定代表人', width: 200, align: 'center', dataIndex: 'Ffddbr', key: 'Ffddbr' },
  { title: '联系方式', width: 200, align: 'center', dataIndex: 'Flxfs', key: 'Flxfs' },
  { title: '养殖畜种', width: 200, align: 'center', dataIndex: 'Fyzxz', key: 'Fyzxz' },
  { title: '账号', width: 200, align: 'center', dataIndex: 'Fzh', key: 'Fzh' },
  { title: '开户行', width: 200, align: 'center', dataIndex: 'Fkhh', key: 'Fkhh' },
  { title: '实时存栏数（头/只）', width: 200, align: 'center', dataIndex: 'Fcunls', key: 'Fcunls' },
  { title: '实免数（头/只）', width: 200, align: 'center', dataIndex: 'Fsms', key: 'Fsms' },
  { title: '疫苗种类', width: 200, align: 'center', dataIndex: 'Fymzl', key: 'Fymzl' },
  { title: '补贴金额合计（元）', width: 200, align: 'center', dataIndex: 'NewFsqbts', key: 'NewFsqbts' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    xuhao: 1,
    state: '已上报',
    yangzhichangname: '青岛田瑞生态科技有限公司',
    dizhi: '青岛市即墨市店集动监站金口池戈...',
    fadingdaibiaoren: '曲晓青',
    lianxifangshi: '13573849237',
    yangzhixuzhong: '蛋鸡',
    zhanghao: '866150011014210...',
    kaihuhang: '齐鲁银行股份有限公司青岛分行',
    shishicunlanshu: '514120',
    shitushu: '497822',
    yimiaozhonglei: 'H5+H7禽流感',
    shanchushijian: '4000.00',
    haoshengbutie: '0.3',
    heji: '1200'
  },
  {
    xuhao: 2,
    state: '已上报',
    yangzhichangname: '青岛田瑞生态科技有限公司',
    dizhi: '青岛市即墨市店集动监站金口池戈...',
    fadingdaibiaoren: '曲晓青',
    lianxifangshi: '13573849237',
    yangzhixuzhong: '蛋鸡',
    zhanghao: '866150011014210...',
    kaihuhang: '齐鲁银行股份有限公司青岛分行',
    shishicunlanshu: '514120',
    shitushu: '497822',
    yimiaozhonglei: 'H5+H7禽流感',
    shanchushijian: '4000.00',
    haoshengbutie: '0.3',
    heji: '1200'
  },
  {
    xuhao: 3,
    state: '已上报',
    yangzhichangname: '青岛田瑞生态科技有限公司',
    dizhi: '青岛市即墨市店集动监站金口池戈...',
    fadingdaibiaoren: '曲晓青',
    lianxifangshi: '13573849237',
    yangzhixuzhong: '蛋鸡',
    zhanghao: '866150011014210...',
    kaihuhang: '齐鲁银行股份有限公司青岛分行',
    shishicunlanshu: '514120',
    shitushu: '497822',
    yimiaozhonglei: 'H5+H7禽流感',
    shanchushijian: '4000.00',
    haoshengbutie: '0.3',
    heji: '1200'
  }
]
const columns1 = [
  { title: '序号', width: 100, align: 'center', dataIndex: 'FGlid', key: 'FGlid' },
  { title: '生产企业', width: 380, align: 'center', dataIndex: 'Fscqy', key: 'Fscqy' },
  { title: '生产批号', width: 200, align: 'center', dataIndex: 'Fscph', key: 'Fscph' },
  { title: '采购数量(毫升)', width: 200, align: 'center', dataIndex: 'Fcgsl', key: 'Fcgsl' },
  { title: '采购日期', width: 200, align: 'center', dataIndex: 'Fcgrq', key: 'Fcgrq' }
  // { title: '使用数量(毫升)', width: 200, align: 'center', dataIndex: 'Fsysl', key: 'Fsysl' }
]

const data1 = [
  {
    xuhao: 1,
    shengchanqiye: '青岛易邦生物',
    pihao: '200244900',
    caigounum: '110000',
    caigoutime: '2020-03-12',
    shiyongnum: '91543'
  },
  {
    xuhao: 2,
    shengchanqiye: '青岛易邦生物',
    pihao: '200244900',
    caigounum: '110000',
    caigoutime: '2020-03-12',
    shiyongnum: '91543'
  },
  {
    xuhao: 3,
    shengchanqiye: '青岛易邦生物',
    pihao: '200244900',
    caigounum: '110000',
    caigoutime: '2020-03-12',
    shiyongnum: '91543'
  }
]
const columns2 = [
  { title: '疫苗名称', width: 250, align: 'center', dataIndex: 'Fymmc', key: 'Fymmc' },
  { title: '生产企业', width: 220, align: 'center', dataIndex: 'Fscqy', key: 'Fscqy' },
  { title: '用量（毫升）', width: 200, align: 'center', dataIndex: 'Fyl', key: 'Fyl' },
  { title: '批准文号', width: 200, align: 'center', dataIndex: 'Fpzwh', key: 'Fpzwh' },
  { title: '批准文号对比状态', width: 250, align: 'center', dataIndex: 'Fpzwhzt', key: 'Fpzwhzt' },
  { title: '追溯码', width: 200, align: 'center', dataIndex: 'Fzsm', key: 'Fzsm' },
  { title: '追溯码对比状态', width: 250, align: 'center', dataIndex: 'Fzsmzt', key: 'Fzsmzt' }
]

const data2 = [
  {
    yimiaoname: '重组禽流感病毒',
    shengchanqiye: '易邦生物',
    yongliang: '500.00',
    pizhunwenhao: '兽药临字',
    wnhaoduibi: '对比成功',
    zhuisuma: '9154312312312313',
    zhuisumaduibi: '对比成功'
  },
  {
    yimiaoname: '重组禽流感病毒',
    shengchanqiye: '易邦生物',
    yongliang: '500.00',
    pizhunwenhao: '兽药临字',
    wnhaoduibi: '对比成功',
    zhuisuma: '9154312312312313',
    zhuisumaduibi: '对比成功'
  },
  {
    yimiaoname: '重组禽流感病毒',
    shengchanqiye: '易邦生物',
    yongliang: '500.00',
    pizhunwenhao: '兽药临字',
    wnhaoduibi: '对比成功',
    zhuisuma: '9154312312312313',
    zhuisumaduibi: '对比成功'
  }
]

export default {
  inject: ['reload'],

  name: 'BaseForm',
  data () {
    return {
      bohuiinfo: false,
      photo: [
        {
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598867830455&di=9125d637685fb33d5558c32a953db099&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F05%2F00%2F01300000194285122188000535877.jpg'
        }
      ],
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ],
      value: '',
      hasSelected: 'true',

      // 基础信息from 表单
      form: this.$form.createForm(this),
      // 驳回申请人信息from表单
      applyInfoFrom: this.$form.createForm(this),

      // 点击 新增弹出框
      // ModalText: '请不要输入错误噢~',
      visible: false,
      fintinfo: false,
      confirmLoading: false,

      data,
      columns,
      data1,
      columns1,
      data2,
      columns2,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],
      loading: false,
      number: 0,
      // 申请进度
      applyPlan: 0,
      // 待审核申请请求数据
      // 结束时间
      FSuTime: '',
      // 开始时间
      FScTime: '',
      Conditionalvalue: '',
      // 待审核申请的分页
      total: 10,
      offset: 1,
      limit: 10,
      totalPage: 1,
      // 行政编号
      FSunitUstrId: '',

      // 返回列表页数据
      applyInfo: [],
      // 购买信息
      shopInfo: [],
      // 二维码信息
      QRcordInfo: [],
      QRcordInfoMore: [],
      showEWmore: false,
      // Gps地址
      GPSFSm4: '',
      applePeoplePh: {},
      FstidOne: 1,
      // 审核人
      shPeople: '',
      // 驳回原因
      bohuiRe: '',
      // 照片
      photoPro: [],
      photoVase: [],
      photoRep: [],
      photoTop: 'http://www.miliotech.com:8886/QingdaoServerInterface/upload/',
      UserId: sessionStorage.getItem('FStId'),
      Fyzname: '',
      FSunitId: sessionStorage.getItem('FSunitUstrId'),
      Fshdw: sessionStorage.getItem('FuseEName'),
      shenheinfo: false
    }
  },
  created () {
    yenum1 = 1
    getAdminAddress()
      .then(res => {
        // this.options = JSON.parse(res)
        this.options = returnFSunitUstrIdTree(res)
        // console.log(this.options)
      })
      .catch(err => {
        console.log(err)
      })
    this.checkapply()
  },
  methods: {
    // 模糊查询
    mocheck (checkedValues, e) {
      console.log(checkedValues, e, this.queryParam.id)
      // if (!checkedValues.length && this.queryParam.id === '') {
      //   this.reload()
      // }
      // console.log(this.queryParam.id)

      if (!e) {
        if (!this.queryParam.id) this.reload()
        this.Fyzname = this.queryParam.id
        console.log(this.FePeople)
      } else {
        this.FSunitId = returnFSunitUstrId(this.options, e || [])
        // this.options.forEach(item => {
        //   if (item.label === e[0]) {
        //     this.FSunitId = item.key
        //   } else {
        //     item.children.forEach(itemCh => {
        //       if (itemCh.label === e[0]) {
        //         this.FSunitId = itemCh.key
        //       } else {
        //         itemCh.children.forEach(itemS => {
        //           if (itemS.label === e[0]) {
        //             this.FSunitId = itemS.key
        //           }
        //         })
        //       }
        //     })
        //   }
        // })
        // for (var i = 0; i < e.length; i++) {
        //   this.FSunitId = e[e.length - 1].key
        // }
      }
      yenum1 = 1
      this.limit = 10
      this.offset = 1
      this.changePage(this.offset, this.limit)
    },
    // 待审核申请查询
    checkapply () {
      console.log(this.Fyzname, this.FSunitId, this.UserId)
      this.$axios
        .get(
          http +
            '/After/Waitingreview?Fyzname=' +
            this.Fyzname +
            '&FSunitId=' +
            this.FSunitId +
            '&offset=' +
            this.offset +
            '&limit=' +
            this.limit +
            '&FScTime=' +
            this.FScTime +
            '&FSuTime=' +
            this.FSuTime,
          {
            headers: {
              UserId: this.UserId
            }
          }
        )
        .then(res => {
          console.log(res)
          var Clres = JSON.parse(res.data.Data)
          this.applyInfo = Clres.rows
          this.total = Clres.total
          this.totalPage = Math.ceil(this.totalPage / this.limit)
          console.log(this.total)
          console.log(Clres)
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 基本信息查询
    checkbasicInfo (FStId) {
      this.$axios
        .get(http + '/After/AppletYzcqzmyymsqReview?FStId=' + FStId)
        .then(res => {
          console.log('基本信息查询')
          console.log(res)
          if (res.data.Result) {
            this.basicInfo = [...res.data.Data]
            this.GPSFSm4 = this.basicInfo[0].FSmemo2
            this.basicInfo.map((item, index) => {
              // 查看
              if (index === 0) {
                console.log(item)
                // 给对应的表单元素赋值
                this.fintinfo = true
                this.$nextTick(() => {
                  this.form.setFieldsValue({
                    FyzName: item.FyzName,
                    Fdz: item.Fdz.replace(/\//g, ''),
                    Ffddbr: item.Ffddbr,
                    Flxfs: item.Flxfs,
                    Fyzxz: item.Fyzxz,
                    Fzh: item.Fzh,
                    Fkhh: item.Fkhh,
                    Fcunls: item.Fcunls,
                    Fsms: item.Fsms,
                    Fymzl: item.Fymzl,
                    Fsqbts: item.Fsqbts,
                    NewFsqbts: item.Fsqbts
                  })
                })
              }
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 购买信息查询
    checkShopInfo (FStId) {
      this.shopInfo = []
      this.$axios
        .get(http + '/After/QueryPurchasing?FStId=' + FStId)
        .then(res => {
          console.log('购买信息查询')
          // 查看
          if (res.data.Result) {
            if (this.fintinfo) {
              res.data.Data.forEach((item, index) => {
                item.Fcgrq = formatTime(item.Fcgrq, 'yyyy-MM-dd')
              })
              this.shopInfo = [...res.data.Data]
            }
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    // 二维码管理查询
    checkQRcord (FStId) {
      this.QRcordInfo = []
      this.updateQRcordInfo = []
      this.$axios
        .get(http + '/After/QueryQRcode?FStId=' + FStId)
        .then(res => {
          console.log('二维码查询')
          if (res.data.Result) {
            if (this.fintinfo) {
              if (res.data.Data) {
                if (res.data.Data.length > 5) {
                  this.QRcordInfo = res.data.Data.slice(0, 5)
                } else {
                  this.QRcordInfo = res.data.Data
                }
                if (res.data.Data.length >= 50) {
                  this.QRcordInfoMore = res.data.Data.slice(0, 50)
                } else {
                  this.QRcordInfoMore = res.data.Data
                }
              }
              // this.QRcordInfo = res.data.Data
            } else if (this.updateinfo) {
              if (res.data.Data) {
                if (res.data.Data.length > 5) {
                  this.updateQRcordInfo = res.data.Data.slice(0, 5)
                } else {
                  this.updateQRcordInfo = res.data.Data
                }
                if (res.data.Data.length >= 50) {
                  this.QRcordInfoMore = res.data.Data.slice(0, 50)
                } else {
                  this.QRcordInfoMore = res.data.Data
                }
              }
            }
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 疫苗查看更多
    showMore () {
      this.showEWmore = true
    },
    // 申请人信息查询
    appplyPeople (FStId) {
      this.$axios
        .get(http + '/After/Signatureapplicant?FStId=' + FStId)
        .then(res => {
          console.log('申请人信息')
          console.log(res)
          if (res.data.Result) {
            this.photoPro = []
            this.photoVase = []
            this.photoRep = []
            res.data.Data.forEach((item, index) => {
              if (index === 0) {
                this.applePeoplePh = item
                this.applePeoplePh.FScTime = formatTime(item.FScTime, 'yyyy-MM-dd hh:mm:ss')
                if (item.FSmemo1) {
                  this.photoPro.push(this.photoTop + item.FSmemo1)
                }
                if (item.FSmemo2) {
                  this.photoPro.push(this.photoTop + item.FSmemo2)
                }
                if (item.V1) {
                  this.photoPro.push(this.photoTop + item.V1)
                }
                if (item.V2) {
                  this.photoPro.push(this.photoTop + item.V2)
                }
                if (item.V3) {
                  this.photoVase.push(this.photoTop + item.V3)
                }
                if (item.V4) {
                  this.photoVase.push(this.photoTop + item.V4)
                }
                if (item.V5) {
                  this.photoVase.push(this.photoTop + item.V5)
                }
                if (item.V6) {
                  this.photoRep.push(this.photoTop + item.V6)
                }
                if (item.V7) {
                  this.photoRep.push(this.photoTop + item.V7)
                }
                if (item.V8) {
                  this.photoVase.push(this.photoTop + item.V8)
                }
                if (item.V9) {
                  this.photoRep.push(this.photoTop + item.V9)
                }
                if (item.V10) {
                  this.photoRep.push(this.photoTop + item.V10)
                }
                if (item.V11) {
                  console.log(item.V11)
                  this.applePeoplePh.V11 = this.photoTop + item.V11
                }
                console.log(this.applePeoplePh.V11)
              }
            })
          } else {
            this.$notification.error({
              message: '暂未查询到该申请人信息，请联系管理人员'
            })
          }

          console.log(res)
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    auditOKInfo () {
      this.shenheinfo = true
    },
    // 审核通过
    auditOK () {
      if (!this.applyInfoFrom.getFieldValue('shenheren')) {
        this.$notification.error({
          message: '请输入审核人'
        })
      } else {
        console.log(getTime())
        this.$axios
          .post(
            http + '/After/Auditsuccessful',
            {
              FGlidV: this.FstidOne,
              FSuserName: this.applyInfoFrom.getFieldValue('shenheren'),
              Fshyj: '同意',
              Fbhly: '',
              Fshrq: getTime(),
              Fshdw: this.Fshdw,
              shzt: '基层动监站审核通过',
              FSmemo1: 1
            },
            {
              headers: {
                UserId: this.UserId
              }
            }
          )
          .then(res => {
            console.log(res)
            if (res.data.Result) {
              this.$notification.success({
                message: '审核通过'
              })
              this.reload()
              this.fintinfo = false
            } else {
              this.$notification.error({
                message: '审核暂未通过，请联系管理人员'
              })
            }
          })
          .catch(rol => {
            console.log(rol)
          })
      }
    },
    // 驳回
    auditNO () {
      this.bohuiinfo = true
      this.$nextTick(() => {
        this.applyInfoFrom.setFieldsValue({
          bohuiren: sessionStorage.getItem('FuName')
        })
      })
    },
    // 驳回确认
    handleNO () {
      this.bohuiinfo = true
      this.$axios({
        url: http + '/After/reject',
        method: 'post',
        headers: {
          UserId: this.UserId
        },
        data: {
          FGlidV: this.FstidOne,
          FSuserName: this.shPeople,
          Fshdw: sessionStorage.getItem('FuseEName'),
          Fshrq: getTime(),
          Fshyj: '驳回',
          Fbhly: this.bohuiRe,
          shzt: '基层动监站审核驳回',
          FSmemo1: 1
        }
      })
        .then(res => {
          console.log(res)
          if (res.data.Result) {
            this.bohuiinfo = false
            this.$notification.success({
              message: '驳回成功'
            })
            this.reload()
            this.checkapply()
          } else {
            this.bohuiinfo = false

            this.$notification.error({
              message: '驳回失败，请联系管理人员'
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    fint (v) {
      console.log('查看')
      console.log(v)
      if (v.Fzt === '已申请' || v.Fzt === '已上报' || !v.Fzt) {
        // this.fintinfo = true
        this.applyPlan = 0
        // this.DJZcase = false
        // this.SQcase = false
        // this.Scase = false
      } else if (v.Fzt === '基层动监站审核通过') {
        // this.fintinfo = false
        // this.DJZcase = true
        // this.SQcase = false
        // this.Scase = false
        this.applyPlan = 1
      } else if (v.Fzt === '区市审核通过') {
        // this.fintinfo = false
        this.applyPlan = 2
        // this.SQcase = true
        // this.Scase = false
      } else {
        // this.fintinfo = false
        this.applyPlan = 3
        // this.Scase = true
      }
      this.FstidOne = v.FStId
      this.checkbasicInfo(v.FStId)
      this.checkShopInfo(v.FStId)
      this.checkQRcord(v.FStId)
      this.appplyPeople(v.FStId)
    },
    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    onChange (checkedValues) {
      console.log('checked = ', checkedValues)
      console.log(this.value)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },

    // 弹窗
    showModal (formName) {
      this.visible = true
    },
    handleOk (e) {
      this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.fintinfo = false
        this.confirmLoading = false
      }, 1000)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.fintinfo = false
    },
    handleCancelY () {
      this.showEWmore = false
    },
    handleOk1 (e) {
      this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.bohuiinfo = false
        this.confirmLoading = false
      }, 1000)
    },

    handleCancel1 (e) {
      console.log('点击了取消')
      this.bohuiinfo = false
      this.shenheinfo = false
    },
    // 页码改变  index
    changePage (current, pageSize) {
      //  current 改变 后的页码，pageSize 每页显示条数
      console.log('log:', current, pageSize)
      this.offset = current
      this.limit = this.limit
      yenum1 = current
      this.selectedRowKeys = []
      this.checkapply()
    },
    // 每页数量改变 index
    onShowSizeChange (current, pageSize) {
      console.log(current, pageSize)

      // this.checkUserPower(this.userToken, this.timestamp, current, pageSize)
      this.offset = current
      this.limit = pageSize
      yenum1 = current
      yeOffset = pageSize
      this.checkapply()
      this.totalPage = Math.ceil(this.total / this.limit)
    },

    //  from表单验证
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(e)
        console.log(err)
        if (!err) {
          this.shPeople = this.applyInfoFrom.getFieldValue('bohuiren') || sessionStorage.getItem('FuseEName')
          this.bohuiRe = this.applyInfoFrom.getFieldValue('bohuiRe') || ''
          this.handleNO()
        }
      })
    }
  }
}
</script>
<style scoped>
.all {
  border-top: 2px solid rgba(0, 0, 0, 0.295);
  margin-top: 40px;
  padding-top: 10px;
}
.tab div {
  /* border: black 1px solid; */
  text-align: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.checkForm {
  border: 1px solid black;
  border-top: none;
}
.applyTrue {
  height: 40px;
  line-height: 40px;
  border-top: black 1px solid;
  border-right: black 1px solid;
}
.applyCheck {
  border-right: none;
}
.applyTop {
  height: 40px;
  line-height: 40px;

  border-top: 1px solid black;
}
/* .tab .row {
  height: 40px;
  line-height: 40px;
} */
.all p {
  margin-bottom: 30px;
}
.btn[data-v-1f680ab4] {
  width: 129%;
}
.div {
  background-color: white;
  height: 80px;
}
.div1 {
  background-color: white;
  margin: 20px;
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
.fujianguanli span {
  display: block;
  width: 300px;
  margin-bottom: 20px;
}
.photos {
  display: flex;
  justify-self: start;
  height: 80px;
  padding-bottom: 10px;
}
.photos img {
  display: inline-block;
  width: 60px;
  height: 60px;
  margin-right: 10px;
  /* background: slategray; */
}
</style>
