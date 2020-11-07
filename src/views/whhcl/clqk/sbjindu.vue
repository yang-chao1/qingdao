<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="序号">
                    <a-input v-model="queryParam.id" placeholder="" size="large" class="btn" />
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
                <!-- <a-col :md="8" :sm="24">
                <a-form-item label="使用状态">
                  <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col> -->
                <a-col :md="8" :sm="24">
                  <a-form-item label="使用状态">
                    <a-select placeholder="请选择" default-value="0">
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
                    <a-button type="primary" style="height:40px" @click="$refs.table.refresh(true)">查询</a-button>
                    <a-button style="margin-left: 8px;height:40px" @click="() => (queryParam = {})">重置</a-button>
                    <a @click="toggleAdvanced" style="margin-left: 8px">
                      {{ advanced ? '收起' : '展开' }}
                      <a-icon :type="advanced ? 'up' : 'down'" />
                    </a>
                  </span>
                </a-col>
              </div>
            </a-row>
          </a-form>
          <div style="margin-top:35px;">
            <a-button type="primary" style="height:40px" icon="plus" @click="showModal()">注释</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-dropdown>
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1">黑色</a-menu-item>
                <a-menu-item key="2">绿色</a-menu-item>
                <a-menu-item key="3">紫色</a-menu-item>
                <a-menu-item key="4">粉色</a-menu-item>
                <a-menu-item key="5">红色</a-menu-item>
                <a-menu-item key="6">黄色</a-menu-item>
              </a-menu>
              <a-button type="primary" style="height:40px">颜色查询</a-button>
            </a-dropdown>&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <a-button type="primary" style="height:40px" @click="showModal()">颜色查询</a-button>&nbsp;&nbsp;&nbsp;&nbsp; -->
            <a-button type="primary" style="height:40px">统计</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px">导出</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px">列表定制</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <!-- 查看 -->
          <a-modal
            title="查看"
            :visible="findinfo"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"

            width="900px"
          >
            <p>查看详情</p>
            <div class="tab">
              <a-form @submit="handleSubmit" :form="form">
                <a-row type="flex" justify="space-between" align="bottom">
                  <a-col :span="6">
                    <div>
                      <p>养殖场、散养户名称</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['xxfsr']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <div>
                      <p>详细地址</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['uptime']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="space-between" align="bottom">
                  <a-col :span="6">
                    <div>
                      <p>联系方式</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['sjr']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <div>
                      <p>养殖场/畜主姓名身份证号：</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['cathao']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="space-between" align="bottom">
                  <a-col :span="6">
                    <div>
                      <p>银行卡号/一卡通号：</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['diename']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <!-- <div>
                        <p>&nbsp;</p>
                        </div> -->
                  </a-col>
                  <a-col :span="6">
                  </a-col>
                </a-row>
                <a-row type="flex" justify="space-between" align="bottom">
                  <a-col :span="6">
                    <div>
                      <p>畜主身份证号与一卡通号照片</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['diename']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <!-- <div>
                        <p>&nbsp;</p>
                        </div> -->
                  </a-col>
                  <a-col :span="6">
                  </a-col>
                </a-row>
                <a-row type="flex" style="height: 300px">
                  <div style="width: 700px; margin: 10px auto; text-align: center; font-size: 20px; border:none;">
                    <span>死亡畜禽种类和数量</span>
                    <a-table :columns="columns1" :data-source="data1" bordered :pagination="false">
                    </a-table>
                  </div>
                </a-row>
                <a-row type="flex" style="height: 60px">
                  <a-col :span="6" style="height: 60px">
                    <div>
                      <p style="height: 60px; line-height: 60px;">申报GPS地址</p>
                    </div>
                  </a-col>
                </a-row>
                <a-row type="flex" style="height: 180px">
                  <a-col :span="6" style="height: 180px">
                    <div>
                      <p style="height: 180px; line-height: 180px;">死亡畜禽信息图片</p>
                    </div>
                  </a-col>
                  <a-col :span="18" style="height: 180px">
                    <div style="height: 180px">
                      <viewer :images="photo" style="height: 180px">
                        <!-- //photo 一定要一个数组，否则报错 -->
                        <img
                          v-for="(item,index) in photo"
                          :src="item.src"
                          :key="index"
                          style="width:180px; height:150px;margin:10px"
                        >
                      </viewer>
                    </div>
                  </a-col>
                </a-row>
                <a-row type="flex" style="height: 60px">
                  <a-col :span="6" style="height: 60px">
                    <div>
                      <p style="height: 60px; line-height: 60px;">养殖场负责人签字</p>
                    </div>
                  </a-col>
                </a-row>
                <!---------------------------- 收集人员-------------------------------- -->
                <a-row type="flex" style="height: 60px">
                  <a-col :span="24" style="height: 60px">
                    <span style="text-align: center;font-size: 20px; line-height: 60px;">收集人员收集</span>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="space-between" align="bottom">
                  <a-col :span="6">
                    <div>
                      <p>车牌号</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['xxfsr']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <div>
                      <p>装车时间</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['uptime']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="space-between" align="bottom">
                  <a-col :span="6">
                    <div>
                      <p>收集GPS地址</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['xxfsr']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <div>
                      <p>监管兽医签字</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['uptime']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="space-between" align="bottom">
                  <a-col :span="6">
                    <div>
                      <p>养殖场负责人签字</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['xxfsr']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <div>
                      <p>收集人员签字</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['uptime']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- ----------------------------------------驻厂兽医核查------------------------------------ -->
                <a-row type="flex" style="height: 60px">
                  <a-col :span="24" style="height: 60px">
                    <span style="text-align: center;font-size: 20px; line-height: 60px;">驻场兽医核查</span>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="space-between" align="bottom">
                  <a-col :span="6">
                    <div>
                      <p>入场时间</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['xxfsr']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                  </a-col>
                  <a-col :span="6">
                  </a-col>
                </a-row>
                <a-row type="flex" justify="space-between" align="bottom">
                  <a-col :span="6">
                    <div>
                      <p>驻厂GPS地址</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['xxfsr']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                  </a-col>
                  <a-col :span="6">
                  </a-col>
                </a-row>
                <a-row type="flex" justify="space-between" align="bottom" style="height: 100px">
                  <a-col :span="6" style="height: 100px">
                    <div style="height: 100px">
                      <p style="height: 100px; line-height:100px">入库情况</p>
                    </div>
                  </a-col>
                  <a-col :span="6" style="height: 100px">
                    <div style="height: 100px">
                      <viewer :images="photo" style="height: 100px">
                        <!-- //photo 一定要一个数组，否则报错 -->
                        <img
                          v-for="(item,index) in photo"
                          :src="item.src"
                          :key="index"
                          style="width:80px; height:60px;margin:10px"
                        >
                      </viewer>
                    </div>
                  </a-col>
                  <a-col :span="6" style="height: 100px">
                    <div style="height: 100px">
                      <p style="height: 100px; line-height:100px">驻厂兽医签字（入库）</p>
                    </div>
                  </a-col>
                  <a-col :span="6" style="height: 100px">
                  </a-col>
                </a-row>
                <a-row type="flex" style="height: 60px">
                  <a-col :span="24" style="height: 60px">
                    <span style="text-align: center;font-size: 20px; line-height: 60px;">无害化处理厂处理情况</span>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="space-between" align="bottom">
                  <a-col :span="6">
                    <div>
                      <p>集中处理时间</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['xxfsr']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <div>
                      <p>处理方法</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['uptime']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="space-between" align="bottom">
                  <a-col :span="6">
                    <div>
                      <p>温度（℃）</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['xxfsr']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <div>
                      <p>压力（KPa）</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['uptime']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="space-between" align="bottom">
                  <a-col :span="6">
                    <div>
                      <p>持续时间</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['xxfsr']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <div>
                      <p>集中处理GPS地址</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['uptime']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="space-between" align="bottom">
                  <a-col :span="6">
                    <div>
                      <p>处理人签字</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['xxfsr']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <div>
                      <p>驻场兽医签字（处理）</p>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                      <a-input
                        v-decorator="['uptime']"
                        disabled
                        style="margin-left:10px;"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="end" align="bottom">
                  <span>填表人：XXX 填表时间：2020年9月14号</span>
                </a-row>
              </a-form>
            </div>
          </a-modal>
          <!-- 注释弹窗 -->
          <a-modal
            title="注释"
            :visible="fontColor"
            :confirm-loading="confirmLoading"
            @cancel="handleCancel"
            :footer="null"
            width="600px"
          >
          </a-modal>
          <!-- 用户管理页面表格 -->
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="data"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
            :scroll="{ x: 1300 }"
          >
            <template slot="action" slot-scope="text, record">
              <a slot="action" @click="find(record)">查看&nbsp;&nbsp;</a>
            </template>
          </a-table>
          <div>
            <a-pagination
              show-quick-jumper
              :default-current="offset"
              :total="100"
              show-less-items
              @change="onChange"
              style="margin: 10px"
            />
            <span style="float: right;font-size:15px; margin-top:-3%;margin-right:5%">当前第1 / 10 页 共 50 条记录 每页 5 条</span>
          </div>
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
const columns = [
  { title: '序号', width: 80, dataIndex: 'FStId', key: 'FStId' },
  { title: '申报状态', width: 150, dataIndex: 'a', key: 'a' },
  { title: '企业名称', width: 150, dataIndex: 'b', key: 'b' },
  { title: '企业类型名称', width: 200, dataIndex: 'c', key: 'c' },
  { title: '申报时间', width: 250, dataIndex: 'd', key: 'd' },
  { title: '法人代表', width: 150, dataIndex: 'e', key: 'e' },
  { title: '申报人电话', width: 150, dataIndex: 'f', key: 'f' },
  { title: '畜主身份证号', width: 250, dataIndex: 'g', key: 'g' },
  { title: '实际处理数量', width: 150, dataIndex: 'h', key: 'h' },
  { title: '动物重量', width: 150, dataIndex: 'i', key: 'i' },
  { title: '收集人姓名', width: 150, dataIndex: 'j', key: 'j' },
  { title: '身份证号码', width: 250, dataIndex: 'k', key: 'k' },
  { title: '一卡通', width: 250, dataIndex: 'l', key: 'l' },
  { title: '收集日期', width: 250, dataIndex: 'm', key: 'm' },
  { title: '删除人', width: 150, dataIndex: 'n', key: 'n' },
  { title: '删除时间', width: 250, dataIndex: 'o', key: 'o' },
  { title: '删除原因', width: 250, dataIndex: 'p', key: 'p' },
  { title: '现存栏数', width: 150, dataIndex: 'q', key: 'q' },
  { title: '申报动物种类', width: 150, dataIndex: 'r', key: 'r' },
  { title: '申报数量', width: 150, dataIndex: 's', key: 's' },
  { title: '地址', width: 250, dataIndex: 't', key: 't' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    FStId: 1,
    a: '畜主已申报',
    b: '孙佳祥',
    c: '散养户',
    d: '2020-08-12 13:25:31',
    e: '',
    f: '2020-08-12 13:25:31',
    g: '',
    h: '猪(70cm以上):5;',
    i: '0.00',
    j: '刘瑞忠',
    k: '',
    l: '',
    m: '',
    n: '220',
    o: '猪',
    p: '猪(70cm以上):5;',
    q: '头',
    r: '青岛市胶州市马店动监站胶莱镇闸...',
    s: '',
    t: ''
  },
  {
    FStId: 1,
    a: '畜主已申报',
    b: '孙佳祥',
    c: '散养户',
    d: '2020-08-12 13:25:31',
    e: '',
    f: '2020-08-12 13:25:31',
    g: '',
    h: '猪(70cm以上):5;',
    i: '0.00',
    j: '刘瑞忠',
    k: '',
    l: '',
    m: '',
    n: '220',
    o: '猪',
    p: '猪(70cm以上):5;',
    q: '头',
    r: '青岛市胶州市马店动监站胶莱镇闸...',
    s: '',
    t: ''
  },
  {
    FStId: 1,
    a: '畜主已申报',
    b: '孙佳祥',
    c: '散养户',
    d: '2020-08-12 13:25:31',
    e: '',
    f: '2020-08-12 13:25:31',
    g: '',
    h: '猪(70cm以上):5;',
    i: '0.00',
    j: '刘瑞忠',
    k: '',
    l: '',
    m: '',
    n: '220',
    o: '猪',
    p: '猪(70cm以上):5;',
    q: '头',
    r: '青岛市胶州市马店动监站胶莱镇闸...',
    s: '',
    t: ''
  }
]

const columns1 = [
  { title: '种类', width: 100, dataIndex: 'kind', key: 'kind' },
  { title: '数量', width: 100, dataIndex: 'num', key: 'num' },
  { title: '重量', width: 100, dataIndex: 'weight', key: 'weight' },
  { title: '参保数', width: 100, dataIndex: 'canbaoshu', key: 'canbaoshu' },
  { title: '耳标号', width: 100, dataIndex: 'erbiaohao', key: 'erbiaohao' }
]

const data1 = [
    {
        kind: '猪（30cm以下）',
        num: '',
        weight: '',
        canbaoshu: '',
        erbiaohao: ''
    },
    {
        kind: '猪（30cm以下）',
        num: '',
        weight: '',
        canbaoshu: '',
        erbiaohao: ''
    },
    {
        kind: '猪（30cm以下）',
        num: '',
        weight: '',
        canbaoshu: '',
        erbiaohao: ''
    }
]
export default {
  name: 'BaseForm',
  data () {
    return {
      photo: [
        { src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598867830455&di=9125d637685fb33d5558c32a953db099&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F05%2F00%2F01300000194285122188000535877.jpg' }
        // { src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598867830455&di=9125d637685fb33d5558c32a953db099&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F05%2F00%2F01300000194285122188000535877.jpg' }
      ],
      hasSelected: 'true',
      // from 表单
      form: this.$form.createForm(this),

      // 点击 新增弹出框
      // ModalText: '请不要输入错误噢~',
      visible: false,
      danwei: false,
      confirmLoading: false,
      confirmLoading1: false,
      qiyedanwei: '',
      findinfo: false,
      fenpairw: false,
      data,
      columns,
      data1,
      columns1,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],
      loading: false,
      userdanwei1: '',
      number: 0,
      // 角色列表请求数据
      offset: 1,
      limit: 5,
      rwinfo: false,
      fontColor: false
    }
  },
  created () {
  },
  methods: {
    handleMenuClick (e) {
      console.log('click', e)
    },
    dianjixuanzhong () {

    },
    // 查看
    find (v) {
        this.findinfo = true
    },
    onSearch (value) {
      console.log(value)
    },
    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    onChange (checkedValues) {
      console.log('checked = ', checkedValues)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onSelectChange1 (selectedRowKeys) {
      console.log('selectedRowKeys1 changed: ', selectedRowKeys)
      this.selectedRowKeys1 = selectedRowKeys
    },

    // 弹窗
    showModal (formName) {
        this.fontColor = true
    },
    // 弹窗关闭
    handleOk (e) {
      this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.fontColor = false
        this.findinfo = false
        this.confirmLoading = false
      }, 1000)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.fontColor = false
      this.findinfo = false
    },
    //  from表单验证
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
    // 新增角色 测试
    // 修改角色 测试
  }
}
</script>
<style scoped>
.tab div {
  height: 40px;
  border: rgba(0, 0, 0, 0.103) 0.1px solid;
  line-height: 40px;
  text-align: center;
  margin: -1px;
}
.height_80 {
    height: 80px;
    line-height: 80px;
}
.tab input {
    background-color: white;
    border: none;
}
.tab p {
    background-color: wheat;
}
.btn[data-v-5e6caa37] {
  width: 129%!important;
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
</style>
