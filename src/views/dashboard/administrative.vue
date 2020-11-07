<template>
  <page-header-wrapper>
    <div class="div1">
      <div class="div3">
        <a-form layout="inline" style="margin-top:30px;" @submit="handleSubmit" :form="form">
          <a-row :gutter="48">
            <div class="div5">
              <a-col :md="10" :sm="24">
                <a-form-item label="负责人">
                  <a-input
                    v-decorator="['FePeople']"
                    placeholder="负责人"
                    size="large"
                    style="width: 100%"
                    @blur="mocheck"
                  />
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
                  <a-button
                    v-permission="{ active: 'admsele' }"
                    type="primary"
                    style="height:40px"
                    html-type="submit"
                    @click="findByinfo"
                  >查询</a-button
                  >
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
          <!-- 新增 -->
          <a-button
            v-permission="{ active: 'admadd' }"
            type="primary"
            style="height:40px"
            icon="plus"
            @click="showModal()"
          >新增</a-button
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <a-modal
            :footer="null"
            title="行政单位管理新增"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
            width="800px"
            :destroyOnClose="true"
          >
            <!-- form表单 -->
            <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
              <a-form @submit="handleSubmit" :form="form">
                <a-form-item
                  label="行政单位名称:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    v-decorator="['FeName', { rules: [{ required: true, message: '请输入行政单位名称' }] }]"
                    name="name"
                    placeholder="请输入行政单位名称"
                  />
                </a-form-item>
                <!-- { pattern: '/^\d+$|^\d+[.]?\d+$/', message: '只能输入数字' } -->

                <a-form-item
                  label="所属行政:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 17 }, sm: { span: 17 } }"
                >
                  <!-- <a-cascader
                    v-decorator="[
                      'FeAdd',
                      {
                        rules: [{ type: 'array', required: true, message: '所属行政' }]
                      }
                    ]"
                    @change="onChangesite"
                    :options="options"
                    :load-data="loadData"
                    placeholder="请输入所属行政"
                  /> -->
                  <!-- <a-cascader :options="options" @change="onChangesite" /> -->
                  <a-select style="width: 120px;margin-right: 10px;" @change="ChangeTown" default-value="青岛市">
                    <a-select-option value="青岛市">
                      青岛市
                    </a-select-option>
                  </a-select>
                  <a-select style="width: 120px;margin-right: 10px;" @change="ChangeRegion" :default-value="regName">
                    <a-select-option value="请选择" v-if="this.regInfo.length>1">
                      请选择
                    </a-select-option>
                    <a-select-option v-for="(item, index) in regInfo" :key="index">
                      {{ item.label }}
                    </a-select-option>
                  </a-select>
                  <a-select style="width: 120px;" @change="ChangePeo" :default-value="peoName">
                    <a-select-option value="请选择" v-if="this.peoInfo.length>1">
                      请选择
                    </a-select-option>
                    <a-select-option v-for="(item, index) in peoInfo" :key="index">
                      {{ item.label }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  label="经纬度:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    style="width:143.33px"
                    v-decorator="['FeJd', { rules: [{ required: true, message: '请输入经度' }] }]"
                    name="FeJd"
                    placeholder="请输入经度"
                  />

                  <a-input
                    style="width:143.33px"
                    v-decorator="['FeWd', { rules: [{ required: true, message: '请输入纬度' }] }]"
                    name="FeWd"
                    placeholder="请输入纬度"
                  />
                  <a-button @click="mapatlas" style="position: absolute; margin: 3px 10px">
                    选择
                  </a-button>
                </a-form-item>

                <a-form-item
                  label="单位类型:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-select
                    placeholder="请选择单位类型"
                    v-decorator="['FeLx', { rules: [{ required: true, message: '请选择单位类型' }] }]"
                  >
                    <a-select-option value="动物卫生监督所">动物卫生监督所</a-select-option>
                    <a-select-option value="稽查大队">稽查大队</a-select-option>
                    <a-select-option value="畜站">畜站</a-select-option>
                    <a-select-option value="畜牧兽医工作站">畜牧兽医工作站</a-select-option>
                    <a-select-option value="农业农村局">农业农村局</a-select-option>
                    <a-select-option value="基层动监站">基层动监站</a-select-option>
                    <a-select-option value="动物疫病预防与控制中心">动物疫病预防与控制中心</a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item
                  label="详细地址:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input v-decorator="['FeAddress']" name="detailed" placeholder="请输入详细地址" />

                  <span class="text_det">地址输入请精确到门牌号</span>
                </a-form-item>

                <a-form-item
                  label="负责人:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input v-decorator="['FePeople']" name="principal" placeholder="请输入负责人姓名" />
                </a-form-item>

                <a-form-item
                  label="联系电话:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    v-decorator="[
                      'FeTel',
                      { rules: [{ pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }] }
                    ]"
                    name="phone"
                    placeholder="请输入联系方式"
                  />
                </a-form-item>

                <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
                  <a-button style="width:300px;height:40px" htmlType="submit" type="primary">确定</a-button>
                </a-form-item>
              </a-form>
            </a-card>
          </a-modal>
          <!-- 查看 -->
          <a-modal
            cancelText="取消"
            okText="确定"
            title="查看"
            :visible="fintinfo"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
            width="1000px"
          >
            <div id="printNew">
              <template>
                <a-card title="查看详情">
                  <a-card-grid style="width:20%;text-align:center;background-color:#7aa7d0" :hoverable="false">
                    行政单位名称
                  </a-card-grid>
                  <a-card-grid style="width:30%;text-align:center;" :hoverable="false">
                    {{ lists.FeName }}
                  </a-card-grid>
                  <a-card-grid style="width:20%;text-align:center;background-color:#7aa7d0" :hoverable="false">
                    单位类型
                  </a-card-grid>
                  <a-card-grid style="width:30%;text-align:center" :hoverable="false">
                    {{ lists.FeLx }}
                  </a-card-grid>
                  <a-card-grid style="width:20%;text-align:center;background-color:#7aa7d0" :hoverable="false">
                    地址
                  </a-card-grid>
                  <a-card-grid style="width:30%;text-align:center;" :hoverable="false">
                    {{ lists.FeAddress }}
                  </a-card-grid>
                  <a-card-grid style="width:20%;text-align:center;background-color:#7aa7d0" :hoverable="false">
                    负责人
                  </a-card-grid>
                  <a-card-grid style="width:30%;text-align:center" :hoverable="false">
                    {{ lists.FePeople }}
                  </a-card-grid>
                  <a-card-grid style="width:20%;text-align:center;background-color:#7aa7d0" :hoverable="false">
                    联系电话
                  </a-card-grid>
                  <a-card-grid style="width:80%;text-align:center" :hoverable="false">
                    {{ lists.FeTel }}
                  </a-card-grid>
                </a-card>
              </template>
              <a-row type="flex" justify="end">
                <!-- <a-col> -->
                <span>填表人: {{ peopleT }} 填表时间: {{ time }}</span>
                <!-- </a-col> -->
              </a-row>
            </div>
            <a-button
              type="primary"
              v-print="'#printNew'"
              style="margin:20px 50%;transform:translateX(-50%)"
            >打印</a-button
            >
          </a-modal>
          <!-- 修改 -->
          <a-modal
            :footer="null"
            title="修改"
            :visible="updateinfo"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
            width="800px"
            :destroyOnClose="true"
          >
            <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
              <a-form @submit="handleSubmit" :form="form">
                <a-form-item
                  style="display: none;"
                  label="id:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input v-decorator="['FStId']" />
                </a-form-item>
                <a-form-item
                  label="行政单位名称:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    v-decorator="['FeName', { rules: [{ required: true, message: '请输入行政单位名称' }] }]"
                    name="name"
                    placeholder="请输入行政单位名称"
                  />
                </a-form-item>
                <!-- { pattern: '^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,4})?)|90(([.][0]{1,4})?))$', message: '请输入正确经度' }, -->

                <a-form-item
                  label="所属行政"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 17 }, sm: { span: 17 } }"
                >
                  <a-select style="width: 120px;margin-right: 10px;" @change="ChangeTown" default-value="青岛市">
                    <a-select-option value="青岛市">
                      青岛市
                    </a-select-option>
                  </a-select>
                  <a-select
                    style="width: 120px;margin-right: 10px;"
                    @change="ChangeRegion"
                    v-if="regionTF"
                    :default-value="regName"
                  >
                    <a-select-option value="请选择" v-if="this.regInfo.length>1">
                      请选择
                    </a-select-option>
                    <a-select-option v-for="(item, index) in regInfo" :key="index">
                      {{ item.label }}
                    </a-select-option>
                  </a-select>
                  <a-select style="width: 120px;" v-if="peoTF" @change="ChangePeo" :default-value="peoName">
                    <a-select-option value="请选择" v-if="this.peoInfo.length>1">
                      请选择
                    </a-select-option>
                    <a-select-option v-for="(item, index) in peoInfo" :key="index">
                      {{ item.label }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  label="经纬度:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    style="width:143.33px"
                    v-decorator="['FeJd', { rules: [{ required: true, message: '请输入经度' }] }]"
                    name="FeJd"
                    placeholder="请输入经度"
                  />

                  <a-input
                    style="width:143.33px"
                    v-decorator="['FeWd', { rules: [{ required: true, message: '请输入纬度' }] }]"
                    name="FeWd"
                    placeholder="请输入纬度"
                  />
                  <a-button @click="mapatlas" style="position: absolute; margin: 3px 10px">
                    选择
                  </a-button>
                </a-form-item>

                <a-form-item
                  label="单位类型:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-select
                    placeholder="请选择单位类型"
                    v-decorator="['FeLx', { rules: [{ required: true, message: '请选择单位类型' }] }]"
                  >
                    <a-select-option value="动物卫生监督所">动物卫生监督所</a-select-option>
                    <a-select-option value="稽查大队">稽查大队</a-select-option>
                    <a-select-option value="畜站">畜站</a-select-option>
                    <a-select-option value="畜牧兽医工作站">畜牧兽医工作站</a-select-option>
                    <a-select-option value="农业农村局">农业农村局</a-select-option>
                    <a-select-option value="基层动监站">基层动监站</a-select-option>
                    <a-select-option value="动物疫病预防与控制中心">动物疫病预防与控制中心</a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item
                  label="详细地址:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input v-decorator="['FeAddress']" name="detailed" placeholder="请输入详细地址" />

                  <span class="text_det">地址输入请精确到门牌号</span>
                </a-form-item>

                <a-form-item
                  label="负责人:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input v-decorator="['FePeople']" name="principal" placeholder="请输入负责人姓名" />
                </a-form-item>

                <a-form-item
                  label="联系电话:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    v-decorator="[
                      'FeTel',
                      {
                        rules: [{ pattern: /^1\d{10}$/, message: '手机号格式错误' }]
                      }
                    ]"
                    name="phone"
                    placeholder="请输入联系电话"
                  />
                </a-form-item>
                <!-- <a-form-item >
                  <a-select mode="multiple">
                    <a-select-option value="4">同事一</a-select-option>
                    <a-select-option value="5">同事二</a-select-option>
                    <a-select-option value="6">同事三</a-select-option>
                  </a-select>
                </a-form-item> -->

                <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
                  <a-button style="width:300px;height:40px" htmlType="submit" type="primary">确定</a-button>
                </a-form-item>
              </a-form>
            </a-card>
          </a-modal>
          <!-- 删除弹窗 -->
          <a-modal
            cancelText="取消"
            okText="确认"
            title="删除"
            :visible="deletinfo"
            :confirm-loading="confirmLoading"
            @ok="DeleteByFStId"
            @cancel="handleCancel"
            width="400px"
          >
            <div>
              <a-form @submit="handleSubmit" :form="form">
                <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
                  是否确认删除
                </a-form-item>
              </a-form>
            </div>
          </a-modal>

          <!-- 地图弹框-------------------------------------------------------------- -->

          <a-modal
            cancelText="取消"
            okText="确认"
            title="地图"
            :visible="mapShow"
            :confirm-loading="confirmLoadingmap"
            @ok="handleOkmap"
            @cancel="handleCancelmap"
            width="800px"
            :zIndex="10000"
          >
            <!-- <p>{{ ModalTextmap }}</p> -->
            <!-- 地图位置 -->
            <baidu-map
              class="map"
              @ready="handler"
              style="height: 500px;"
              :center="center"
              :zoom="1000"
              :map-click="true"
              :isVisible="true"
              @click="maplist"
              :scroll-wheel-zoom="true"
            >
              <div>
                <!-- 自定义地图标点   :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}" -->
                <bm-marker :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :position="center" @dragend="dragend">
                </bm-marker>
              </div>
            </baidu-map>
            <a-form @submit="handleSubmit" :form="form">
              <a-form-item
                label="经纬度:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
              >
                <a-input
                  style="width:143.33px"
                  v-decorator="['FeJd', { rules: [{ required: true, message: '请输入经度' }] }]"
                  name="FeJd"
                  placeholder="请输入经度"
                />

                <a-input
                  style="width:143.33px"
                  v-decorator="['FeWd', { rules: [{ required: true, message: '请输入纬度' }] }]"
                  name="FeWd"
                  placeholder="请输入纬度"
                />
                <a-button @click="handleReset" style="position: absolute; margin: 3px 10px">
                  重置
                </a-button>
              </a-form-item>
            </a-form>
          </a-modal>
          <!-- ------------------------------------------------------------------ -->
          <a-button
            v-permission="{ active: 'admdele' }"
            type="primary"
            style="height:40px"
            @click="delet"
          >批量删除</a-button
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <!-- <a-button type="primary" style="height:40px" @click="handleEdit()">批量修改</a-button>&nbsp;&nbsp;&nbsp;&nbsp; -->
          <!-- <a-button type="primary" style="height:40px" @click="handleEdit()">导出</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
          <a-button type="primary" style="height:40px" @click="handleEdit()">列表定制</a-button> -->
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
          <!-- <a-tree-select
            style="margin-top: -1px ;width: 250px;float:right;"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="所在地"
            v-model="locationAddress"
          >
            <a-tree-select-node v-for="item in options" :key="item.key" :title="item.label">
              <a-tree-select-node v-for="itemCh in item.children" :key="itemCh.key" :title="itemCh.label">
                <a-tree-select-node v-for="itemS in itemCh.children" :key="itemS.key" :title="itemS.label"/>
              </a-tree-select-node>
            </a-tree-select-node>
          </a-tree-select> -->
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
        <a-table
          :pagination="false"
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1300 }"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          style="margin-top:5px;"
        >
          <template slot="action" slot-scope="text, record">
            <a v-permission="{ active: 'admsele' }" slot="action" @click="fint(record)">查看&nbsp;&nbsp;</a>
            <a v-permission="{ active: 'admupd' }" slot="action" @click="update(record)">修改&nbsp;&nbsp;</a>
            <!-- <a slot="action" @click="delet(record)">删除</a> -->
          </template>
        </a-table>
        <div>
          <a-pagination
            show-quick-jumper
            :default-current="1"
            :total="totalnum"
            show-less-items
            :current="offset"
            @change="onChange"
            style="margin: 10px"
          />
          <span
            style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
          >当前第 {{ this.yenum }}/{{ Math.ceil(this.totalnum / 10) }} 页 共 {{ this.totalnum }} 条记录 每页 10
            条</span
          >
        </div>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>
import http from '@/utils/httpapi'
import formatTime from '@/utils/public.js'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import replaceAddress from '@/utils/replaceAddress'
import Clfunid from '@/utils/Clfunid'

var yenum1 = 1
const columns = [
  {
    title: '序号',
    width: 80,
    align: 'center',
    dataIndex: 'FStId',
    key: 'FStId',
    customRender: (t, r, index) => {
      if (yenum1 === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenum1 - 1) * 10 + 1
      }
    }
  },
  { title: '行政名称', width: 200, align: 'center', dataIndex: 'FSunitName', key: 'FSunitName' },
  { title: '行政单位名称', width: 200, align: 'center', dataIndex: 'FeName', key: 'FeName' },
  { title: '单位类型', width: 200, align: 'center', dataIndex: 'FeLx', key: 'FeLx' },
  {
    title: '所属行政',
    width: 280,
    align: 'center',
    dataIndex: 'FeAdd',
    key: 'FeAdd',
    customRender: (t, r, index) => {
      return t ? t.replace(/\//g, '') : ''
    }
  },
  { title: '详细地址', width: 200, align: 'center', dataIndex: 'FeAddress', key: 'FeAddress' },
  { title: '负责人', width: 150, align: 'center', dataIndex: 'FePeople', key: 'FePeople' },
  { title: '联系电话', width: 150, align: 'center', dataIndex: 'FeTel', key: 'FeTel' },

  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]

const data = []

export default {
  inject: ['reload'],
  name: 'BaseForm',
  data () {
    return {
      // 根据行政查出的地址数据
      FsuIdaddress: {},
      printObj: {
        id: 'printNew',
        popTitle: '动物检疫（产品B）', // 文件标题
        extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      // 树的显示
      treevalue: undefined,
      // 所在地
      locationAddress: '',
      // 模糊查询当前页
      findBynameyenum: 1,
      // 每页条数
      limit: 10,
      offset: 1,
      yenum: 1,
      totalnum: 0,
      // 地图显示隐藏
      mapShow: false,
      ModalTextmap: '请不要输入错误噢~',
      confirmLoadingmap: false,
      center: { FeJd: '120.39629', FeWd: '36.30744' },
      // 暂存地址
      centerNow: { FeJd: '120.39629', FeWd: '36.30744' },
      addr: '',
      site: '',
      // 模糊查询行政树
      siteId: '',
      lists: {},
      //  ------------------
      options: [],
      value: '',
      fromdata: '',

      // from 表单
      form: this.$form.createForm(this),
      upForm: this.$form.createForm(this),

      // 点击 新增弹出框
      // ModalText: '请不要输入错误噢~',
      visible: false,
      confirmLoading: false,
      fintinfo: false,
      updateinfo: false,
      deletinfo: false,

      data,
      columns,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],
      loading: false,
      number: 0,
      allFStid: [],
      time: '',
      peopleT: '',
      UserId: sessionStorage.getItem('FStId'),
      FSunitUstrId: sessionStorage.getItem('FSunitUstrId'),
      FePeople: '',
      BMap: {},
      map: {},
      // 行政存储
      FeQD: [],
      FeQS: [],
      FeDJ: [],
      FeDjz: [],
      xingzheng: false,
      // 区，动监站选择
      regionTF: false,
      regInfo: [],
      peoTF: false,
      peoInfo: [],
      // 区名称
      regName: '请选择',
      // 动监站名称
      peoName: '请选择',
      FeUnitId: ''
    }
  },
  created () {
    yenum1 = 1

    this.$axios({
      url:
        http +
        '/Enterprise/GetEnterprise?FSunitUstrId=' +
        this.FSunitUstrId +
        '&FePeople=' +
        this.FePeople +
        '&offset=' +
        this.offset +
        '&limit=' +
        this.limit,
      method: 'get',
      headers: {
        UserId: this.UserId
      }
    })
      .then(res => {
        console.log('通知管理' + JSON.parse(res.data.Data))
        var datalist = JSON.parse(res.data.Data)
        this.data = datalist.rows
        this.totalnum = datalist.total
      })
      .catch(err => {
        console.log('通知管理 失败' + err)
      })
    // 行政树
    getAdminAddress()
      .then(res => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
        this.regInfo = this.options[0].children
        // this.regName = '请选择'
        res.forEach(item => {
          this.FeQD = item
          item.children.forEach((items, index) => {
            this.FeQS.push(items)
            items.children.forEach((itemOl, index) => {
              this.FeDjz.push(itemOl)
            })
          })
        })
        this.FsuIdaddress = Clfunid(this.options)
        // for (var i = 0; i < this.FeQS.length - 1; i++) {

        // }
        console.log(this.FeQD, this.FeQS, this.FeDJ)
      })
      .catch(rol => {
        console.log(rol)
      })
  },
  methods: {
    // 市级选择触发
    ChangeTown (val) {
      console.log(val)
    },
    ChangeRegion (val) {
      console.log(val)
      if (val === '请选择') {
        this.peoTF = false
      } else {
        this.peoTF = false
        setTimeout(() => {
          this.peoTF = true
          this.regName = this.regInfo[val].label
          this.peoName = '请选择'
          this.peoInfo = this.regInfo[val].children
        }, 0)
      }
    },
    ChangePeo (val) {
      if (val === '请选择') {
        this.peoName = '请选择'
      } else {
        this.peoTF = true
        this.peoName = this.peoInfo[val].label

        console.log(this.regName, this.peoName)
      }
    },

    Hidden () {
      this.xingzheng = true
    },
    // 模糊查询
    mocheck (checkedValues, e) {
      console.log(checkedValues, e)
      if (!checkedValues.length && !this.form.getFieldValue('FePeople')) {
        this.reload()
      }
      if (!e) {
        this.FePeople = this.form.getFieldValue('FePeople')
      } else if (e.length) {
        this.options.forEach(item => {
          if (item.label === e[0]) {
            this.FSunitUstrId = item.key
          } else {
            item.children.forEach(itemCh => {
              if (itemCh.label === e[0]) {
                this.FSunitUstrId = itemCh.key
              } else {
                itemCh.children.forEach(itemS => {
                  if (itemS.label === e[0]) {
                    this.FSunitUstrId = itemS.key
                  }
                })
              }
            })
          }
        })
        // for (var i = 0; i < e.length; i++) {
        //   this.FSunitUstrId = e[e.length - 1].key
        // }
      }
      this.$axios({
        url:
          http +
          '/Enterprise/GetEnterprise?FSunitUstrId=' +
          this.FSunitUstrId +
          '&FePeople=' +
          this.FePeople +
          '&offset=' +
          this.offset +
          '&limit=' +
          this.limit,
        method: 'get',
        headers: {
          UserId: this.UserId
        }
      })
        .then(res => {
          console.log('通知管理' + JSON.parse(res.data.Data))
          var datalist = JSON.parse(res.data.Data)
          this.data = datalist.rows
          this.totalnum = datalist.total
        })
        .catch(err => {
          console.log('通知管理 失败' + err)
        })
    },
    // 解决选中文本框后点击下一页还有选中的效果
    start () {
      // ajax request after empty completing
      setTimeout(() => {
        this.selectedRowKeys = []
      }, 100)
    },
    // 行政按条件查询
    findByinfo () {
      console.log('用户按条件查询')
      this.fromdata = 'findbyinfo'
    },
    handleReset () {
      this.form.resetFields()
    },
    // ---------------------地图方法---[]
    handler: function ({ BMap, map }) {
      map.enableScrollWheelZoom(true)
      this.BMap = BMap
      this.map = map
      // this.center.FeJd = ''
      var point = new BMap.Point(this.center.FeJd, this.center.FeWd)
      map.centerAndZoom(point, 13)
      var marker = new BMap.Marker(point) // 创建标注
      map.addOverlay(marker) // 将标注添加到地图中
      // const hide = this.$message.loading('正在获取当前省市请稍候..', 0)
      const _this = this
      const geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(
        function (r) {
          // setTimeout(hide, 10)
          console.log(r)
          _this.center = { FeJd: '120.39629', FeWd: '36.30744' } // 设置center属性值
          // _this.autoLocationPoint = { lng: r.longitude, lat: r.latitude }        // 自定义覆盖物
          _this.initLocation = true
        },
        { enableHighAccuracy: true }
      )

      // 获取地理位置
      window.map = map
      // 赋值，方便调用，本节被用到
      this.BMap = BMap
      this.map = map
    },
    // 拖动结束后
    dragend (e) {
      console.log(e.point)
      console.log(e)
      const gc = new this.BMap.Geocoder()
      gc.getLocation(e.point, function (rs) {
        this.form.setFieldsValue({
          addr: rs.address,

          FeJd: rs.point.lng,
          FeWd: rs.point.lat
        })
      })
    },
    maplist: function (e) {
      // console.log(e)
      // console.log(e.point.lng + ',' + e.point.lat)
      this.center.FeJd = e.point.lng
      this.center.FeWd = e.point.lat
      // console.log(this.BMap, this.map)
      // const gc = new this.BMap.Geocoder()
      this.map.clearOverlays()
      var newPint = new this.BMap.Point(this.center.FeJd, this.center.FeWd)
      var marker = new this.BMap.Marker(newPint) // 创建标注
      this.map.addOverlay(marker) // 将标注添加到地图中
      this.map.panTo(newPint)

      this.form.setFieldsValue({
        FeJd: e.point.lng,
        FeWd: e.point.lat
      })
    },

    // ------------------------------------
    // 批量删除
    DeleteByFStId () {
      if (this.allFStid.length > 0) {
        this.$axios
          .post(http + '/Enterprise/AppletEnterpriseDel?FStId=' + this.allFStid)
          .then(res => {
            console.log('批量删除成功' + res)
            setTimeout(() => {
              this.$notification.success({
                message: '批量删除成功'
                // description: `${timeFix()}，欢迎回来`
              })
            }, 100)
            yenum1 = 1
            this.reload()
          })
          .catch(err => {
            console.log('批量删除失败' + err)
          })
      } else {
        alert('请选择要删除的数据')
      }
    },
    delet (v) {
      if (!this.allFStid.length > 0) {
        this.$notification.error({
          message: '请选择一条数据'
        })
      } else {
        console.log('删除')
        this.deletinfo = true
      }
    },
    update (v) {
      console.log('修改')
      console.log(v)
      this.fromdata = 'updateinfo'
      // 通过FStId 获取行政
      this.$axios({
        url: http + '/Enterprise/AppletEnterpriseCKan?FStId=' + v.FStId,
        method: 'get'
      })
        .then(res => {
          console.log(res)
          this.updateinfo = true
          // var AddresCl = res.data.Data[0].FeAdd.split('/')
          var AddresCl = replaceAddress(res.data.Data[0].FeAdd.replace(/\//g, ''), this.options) || []

          console.log(AddresCl)
          if (AddresCl.length === 1) {
            this.regionTF = true
            this.peoTF = true
            this.regInfo = this.options[0].children
            this.regName = this.regInfo[0].label
            this.peoInfo = this.regInfo[0].children
            this.peoName = this.peoName[0].label
          } else if (AddresCl.length === 2) {
            this.regionTF = false
            setTimeout(() => {
              this.regionTF = true
              this.regName = AddresCl[1]
              this.peoTF = true
              console.log(this.regInfo, this.regName)
              this.regInfo.forEach(item => {
                if (item.label === this.regName) {
                  this.peoInfo = item.children
                }
              })
              this.peoName = '请选择'
            }, 0)
          } else if (AddresCl.length === 3) {
            this.regionTF = false
            setTimeout(() => {
              this.regionTF = true
              this.regName = AddresCl[1]
              this.peoTF = true
              this.peoName = AddresCl[2]
              this.regInfo.forEach(item => {
                if (item.label === this.regName) {
                  this.peoInfo = item.children
                }
              })
            }, 0)
          }
          this.regInfo = this.FsuIdaddress.regInfo

          this.peoInfo = this.FsuIdaddress.peoInfo

          this.$nextTick(() => {
            this.form.setFieldsValue({
              // FeAdd: JSON.parse(JSON.stringify(res.data.Data[0].FeAdd)),
              FStId: v.FStId,
              FeLx: JSON.parse(JSON.stringify(res.data.Data[0].FeLx)),
              FeJd: JSON.parse(JSON.stringify(res.data.Data[0].FeJd)),
              FeWd: JSON.parse(JSON.stringify(res.data.Data[0].FeWd)),
              FePeople: JSON.parse(JSON.stringify(res.data.Data[0].FePeople)),
              FeTel: JSON.parse(JSON.stringify(res.data.Data[0].FeTel)),
              FeName: JSON.parse(JSON.stringify(res.data.Data[0].FeName)),
              FeAddress: JSON.parse(JSON.stringify(res.data.Data[0].FeAddress))

            })
          })
        })
        .catch(err => {
          console.log('查看单位详情 失败' + err)
        })
    },
    fint (v) {
      console.log('查看')
      console.log(v)
      this.fintinfo = true
      this.lists.FeName = v.FeName
      this.lists.FeLx = v.FeLx
      this.lists.FeAddress = v.FeAddress
      this.lists.FePeople = v.FePeople
      this.lists.FeTel = v.FeTel
      this.$axios({
        url: http + '/Enterprise/AppletEnterpriseCKan?FStId=' + v.FStId,
        method: 'get'
      })
        .then(res => {
          console.log(res)
          if (res.data.Data) {
            res.data.Data.forEach(item => {
              this.time = formatTime(item.FScTime, 'yyyy-MM-dd hh:mm:ss')
              this.peopleT = item.FSuserName
            })
          }
          // console.log('查看单位详情' + JSON.stringify(res.data.Data))
          this.$nextTick(() => {
            this.form.setFieldsValue({
              xzdwmc: JSON.parse(JSON.stringify(res.data.Data[0].FSunitName)),
              dz: JSON.parse(JSON.stringify(res.data.Data[0].FeAddress)),
              fzr: JSON.parse(JSON.stringify(res.data.Data[0].FePeople)),
              dwlx: JSON.parse(JSON.stringify(res.data.Data[0].FeLx)),
              lxdh: JSON.parse(JSON.stringify(res.data.Data[0].FeTel))
            })
          })
        })
        .catch(err => {
          console.log('查看单位详情 失败' + err)
        })
    },
    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    onChange1 (checkedValues) {
      console.log('checked = ', checkedValues)
    },
    onChangesite (checkedValues, e) {
      console.log(e)
      console.log('checked = ', checkedValues)
      console.log('e = ', e)
      for (var i = 0; i < e.length; i++) {
        // this.site = this.site + '/' + e[i].label
        this.site = e[e.length - 1].label
        this.FeNameIf = this.site
        this.siteId = e[e.length - 1].key
      }
      // this.$nextTick(() => {
      //   this.form.setFieldsValue({
      //     FeAdd: [this.site]
      //   })
      // })
      console.log(this.site, this.siteId)
      // this.site = this.site.substring(1)
    },
    onChange (checkedValues) {
      this.start()
      console.log('checked = ', checkedValues)
      this.yenum = checkedValues
      yenum1 = checkedValues
      this.offset = checkedValues
      this.$axios({
        url:
          http +
          '/Enterprise/GetEnterprise?FSunitUstrId=' +
          this.FSunitUstrId +
          '&FePeople=' +
          this.FePeople +
          '&offset=' +
          this.offset +
          '&limit=' +
          this.limit,
        method: 'get',
        headers: {
          UserId: this.UserId
        }
      })
        .then(res => {
          var datalist = JSON.parse(res.data.Data)
          this.data = datalist.rows
        })
        .catch(err => {
          console.log('行政管理分页 失败' + err)
        })
    },

    onChangeValue (value) {
      console.log(value)
      this.treevalue = value
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
      selectedRows.forEach(item => {
        console.log(item.FStId)
        arr.push(item.FStId)
        console.log('arr 数组' + arr)
        this.allFStid = arr
        console.log('FStid数组' + this.allFStid)
      })
      arr = []
    },

    // 地图弹窗
    mapatlas (mapName) {
      this.mapShow = true
    },
    handleOkmap (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoadingmap = true
      setTimeout(() => {
        this.mapShow = false
        this.confirmLoadingmap = false
      }, 100)

      this.form.setFieldsValue({
        FeJd: this.center.FeJd,
        FeWd: this.center.FeWd
      })
    },
    handleCancelmap (e) {
      console.log('点击了取消')
      this.mapShow = false
    },

    // 弹窗
    showModal (formName) {
      this.visible = true
      this.regionTF = true
      this.fromdata = 'addinfo'
      this.regInfo = this.FsuIdaddress.regInfo
      this.peoInfo = this.FsuIdaddress.peoInfo
      this.regName = this.FsuIdaddress.regName
      this.peoName = this.FsuIdaddress.peoName
    },
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.fintinfo = false
        this.updateinfo = false
        this.deletinfo = false
        this.confirmLoading = false
        this.form.resetFields()
      }, 100)
    },
    handleOk1 () {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.$axios
          .post(http + '/Enterprise/AppletEnterpriseDel?FStId=' + this.number)
          .then(res => {
            console.log('删除成功' + res)
            setTimeout(() => {
              this.$notification.success({
                message: '删除成功'
              })
            }, 100)
            yenum1 = 1
            this.reload()
          })
          .catch(err => {
            console.log('删除失败' + err)
          })
        this.deletinfo = false
        this.confirmLoading = false
        this.form.resetFields()
      }, 100)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.fintinfo = false
      this.updateinfo = false
      this.deletinfo = false
      this.peoName = '请选择'
      this.regName = '请选择'
      this.peoTF = false

      this.form.resetFields()
    },

    //  from表单验证
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        var that = this
        var time = new Date()
        var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
        var addressAdmin = ''
        if (this.regName === '请选择') {
          addressAdmin = '青岛市'
          this.options.forEach(item => {
            this.FeUnitId = item.key
          })
        } else if (this.peoName === '请选择') {
          addressAdmin = '青岛市' + this.regName
          this.options.forEach(item => {
            item.children.forEach(itemOne => {
              if (itemOne.label === this.regName) {
                this.FeUnitId = itemOne.key
              }
            })
          })
        } else {
          addressAdmin = '青岛市' + this.regName + this.peoName
          this.options.forEach(item => {
            item.children.forEach(itemOne => {
              itemOne.children.forEach(itemTwo => {
                if (itemTwo.label === this.peoName) {
                  this.FeUnitId = itemTwo.key
                }
              })
            })
          })
        }

        if (!err) {
          // var data = JSON.stringify(values)
          var data = {
            FeName: values.FeName,
            FeJd: values.FeJd,
            FeWd: values.FeWd,
            FeAdd: addressAdmin,
            FeLx: values.FeLx,
            FeAddress: values.FeAddress,
            FePeople: values.FePeople,
            FeTel: values.FeTel
          }
          if (this.fromdata === 'addinfo') {
            this.$axios
              .post(http + '/Enterprise/AppletEnterpriseAdd?FScTime=' + time1, data, {
                headers: {
                  UserId: this.UserId
                }
              })
              .then(res => {
                console.log('行政单位管理' + res)
                this.regName = '请选择'
                this.peoName = '请选择'
                setTimeout(() => {
                  this.$notification.success({
                    message: '行政单位管理新增成功'
                  })
                }, 100)
                this.reload()
              })
              .catch(() => {
                console.log('用户新增 失败')
              })
          } else if (this.fromdata === 'findbyinfo') {
            if (values.FePeople === undefined) {
              this.$axios({
                url: http + '/Enterprise/GetEnterprise?offset=1&limit=' + this.limit,
                method: 'get'
              })
                .then(res => {
                  console.log('用户管理' + JSON.parse(res.data.Data))
                  var datalist = JSON.parse(res.data.Data)
                  this.data = datalist.rows
                  this.totalnum = datalist.total
                })
                .catch(() => {
                  console.log('用户管理 失败')
                })
            }
            this.$axios
              .get(
                http + '/Enterprise/GetEnterpriseWhere?offset=1&limit=' + this.limit + '&FePeople=' + values.FePeople
              )
              .then(res => {
                console.log('用户姓名模糊查询' + res.data.Data)
                var datalist = JSON.parse(res.data.Data)
                console.log(datalist.rows)
                this.data = datalist.rows
                this.totalnum = datalist.total
                this.yenum = this.findBynameyenum
                yenum1 = this.findBynameyenum
              })
              .catch(err => {
                console.log('用户管理 失败' + err)
              })
          } else if (this.fromdata === 'updateinfo') {
            this.$axios
              .post(http + '/Enterprise/AppletEnterpriseUp', {
                FeName: values.FeName,
                FeJd: values.FeJd,
                FeWd: values.FeWd,
                FeLx: values.FeLx,
                FeAdd: addressAdmin,
                FeAddress: values.FeAddress,
                FePeople: values.FePeople,
                FeTel: values.FeTel,
                FSuTime: time1,
                FStId: values.FStId,
                FeUnitId: this.FeUnitId
              })
              .then(res => {
                console.log(that.site)
                this.regName = '请选择'
                this.peoName = '请选择'
                setTimeout(() => {
                  this.$notification.success({
                    message: '行政单位管理修改成功'
                  })
                }, 100)
                this.reload()
              })
              .catch(err => {
                console.log('行政单位管理 失败' + err)
              })
          }
          this.handleCancel()
          this.form.resetFields()
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.map {
  width: 100%;
  height: 800px;
  z-index: 1000;
}
.tab div {
  height: 40px;
  border: rgba(0, 0, 0, 0.041) 1px solid;
  line-height: 40px;
  text-align: center;
  margin: -1px;
}
.tab div p {
  background-color: antiquewhite;
}
.btn[data-v-215628ba] {
  width: 129%;
}

.text_det {
  font-size: 10px;
  color: #ccc;
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
.ant-card-grid {
  height: 65px;
}
</style>
