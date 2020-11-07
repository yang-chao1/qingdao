<template>
  <div>
    <page-header-wrapper> </page-header-wrapper>
    <a-card class="card">
      <a-input size="large" v-model="selectwhere" class="ainput" placeholder="请输入货主姓名" />
      <a-button class="abutton" type="primary" @click="cx">查询</a-button>

      <a-button class="abutton" type="primary" @click="handleEdit()">导出</a-button>
      <a-button v-permission="{active:'AQCAanimalsadd'}" class="abutton" type="primary" icon="plus" @click="addModal">新增</a-button>
      <a-button v-permission="{active:'AQCAanimalsdele'}" class="abutton" type="primary" @click="pil">批量删除</a-button>
      <a-row>
        <a-col :span="12" :offset="6">
          <!-- <a-tree-select
            style="width: 25%; position: relative; left: 100%; top: 0"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="所在地"
            :tree-data="options"
          >
          </a-tree-select> -->
          <br />
        </a-col>
      </a-row>
      <a-table
        :rowKey="record => record.FStIds"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :pagination="false"
        :scroll="{ x: 2000 }"
        :columns="columns1"
        :data-source="data1"
        style="margin-top: 5px"
      >
        <template slot="action" slot-scope="text, recoed">
          <a v-permission="{active:'AQCAanimalssele'}" slot="action" @click="showModal(recoed.FStId)">查看&nbsp;&nbsp;</a>
          <a v-permission="{active:'AQCAanimalsupd'}" slot="action" @click="updateModal(recoed.FStId)">修改&nbsp;&nbsp;</a>
          <!-- <template>
            <a-popconfirm placement="topRight" title="确认删除？" ok-text="确定" @confirm="confirm(recoed.FStId)" cancel-text="取消">
              <a>删除&nbsp;&nbsp;</a>
            </a-popconfirm>
          </template> -->
        </template>
      </a-table>
      <div>
        <a-pagination
          size="small"
          :total="total"
          :default-current="offset"
          show-size-changer
          show-quick-jumper
          style="margin: 10px"
          :current="offset"
          @change="onChanges"
          @showSizeChange="onShowSizeChange"
        />
        <span
          style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
        >当前第 {{ this.offset }}/{{ Math.ceil(this.total / this.limit) }} 页 共 {{ this.total }} 条记录 每页
          {{ this.limit }} 条</span
        >
      </div>
    </a-card>
    <!-- 增加表单-->
    <a-modal :destroyOnClose="true" title="动物检疫证明(动物A)" :footer="null" v-model="visible">
      <dwjy-aadd></dwjy-aadd>
    </a-modal>
    <!-- 修改表单-->
    <a-modal title="修改申报单" :footer="null" v-model="updatevisible">
      <a-form :form="updateForm" @submit="handleSubmit">
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="记录单编号："
              :labelCol="{ lg: { span: 8 }, sm: { span: 6 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-input v-decorator="['JLDNumber', { rules: [{ required: true, message: '请输入' }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="检疫证编号："
              :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-input v-decorator="['ANumber', { rules: [{ required: true, message: '请输入' }] }]" />
            </a-form-item>
          </a-col>

          <a-col :span="10">
            <a-form-item
              ref="name"
              label="货主姓名"
              prop="name"
              :labelCol="{ lg: { span: 8 }, sm: { span: 6 } }"
              :wrapperCol="{ lg: { span: 14 }, sm: { span: 8 } }"
            >
              <a-input v-decorator="['ACargoOwner', { rules: [{ required: true, message: '请输入' }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="2">
            <a-button @click="xz" type="primary" style="position: absolute;margin: 3px 5px">选择</a-button>
          </a-col>
          <a-col :span="12">
            <a-form-item
              ref="name"
              label="联系电话"
              prop="phone"
              :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-input v-decorator="['APhone', { rules: [{ required: true, message: '请输入' }] }]" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="动物种类:"
              :labelCol="{ lg: { span: 7 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-select
                v-decorator="['AXuZhong', { rules: [{ required: true, message: '请输入' }] }]"
                style="width: 160px"
                @change="getAXuZhong"
              >
                <a-select-option value="猪">猪</a-select-option>
                <a-select-option value="牛">牛</a-select-option>
                <a-select-option value="羊">羊</a-select-option>
                <a-select-option value="鹿">鹿</a-select-option>
                <a-select-option value="骆驼">骆驼</a-select-option>
                <a-select-option value="马">马</a-select-option>
                <a-select-option value="驴">驴</a-select-option>
                <a-select-option value="骡">骡</a-select-option>
                <a-select-option value="鸡">鸡</a-select-option>
                <a-select-option value="鸭">鸭</a-select-option>
                <a-select-option value="鹅">鹅</a-select-option>
                <a-select-option value="鹌鹑">鹌鹑</a-select-option>
                <a-select-option value="鸽">鸽</a-select-option>
                <a-select-option value="兔">兔</a-select-option>
                <a-select-option value="蜜蜂">蜜蜂</a-select-option>
                <a-select-option value="其他">其他</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="数量及单位:"
              :labelCol="{ lg: { span: 6 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-input
                v-decorator="['AQuantity', { rules: [{ required: true, message: '请输入' }] }]"
                style="width:100px;margin-right:10px"
              ></a-input>
              <a-select
                v-decorator="['ADanWei', { initialValue: '请选择', rules: [{ required: true, message: '请输入' }] }]"
                style="position: absolute; top: 50%; transform: translateY(-50%); width: 100px"
                placeholder="请选择"
              >
                <a-select-option value="头">头</a-select-option>
                <a-select-option value="只">只</a-select-option>
                <a-select-option value="羽">羽</a-select-option>
                <a-select-option value="匹">匹</a-select-option>
                <a-select-option value="箱">箱</a-select-option>
                <a-select-option value="尾">尾</a-select-option>
                <a-select-option value="其他">其他</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="14">
            <a-form-item
              label="启运地点:"
              :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
            >
              <a-select
                disabled
                style="width: 30%;"
                v-decorator="['AShengQy', { rules: [{ required: true, message: '请输入' }] }]"
              >
                <a-select-option v-for="(item, index) in arr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <a-select
                disabled
                style="width: 30%; margin-left: 10px"
                v-decorator="['AShiQy', { rules: [{ required: true, message: '请输入' }] }]"
              >
                <a-select-option v-for="(item, index) in cityArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <a-select
                style="width: 30%; margin-left: 10px"
                v-decorator="['AXianQy', { rules: [{ required: true, message: '请输入' }] }]"
              >
                <a-select-option v-for="(item, index) in countyArrQy" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item
              :labelCol="{ lg: { span: 1 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input
                v-decorator="['AXiangQy', { rules: [{ required: true, message: '请输入' }] }]"
                placeholder="请输入乡（镇）"
              ></a-input
              ></a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="启运类型:"
              :labelCol="{ lg: { span: 10 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-select
                v-decorator="['ATypeQy', { rules: [{ required: true, message: '请输入' }] }]"
                style="width: 160px"
                placeholder="请选择"
              >
                <a-select-option value="养殖场"> 养殖场 </a-select-option>
                <a-select-option value="交易市场"> 交易市场 </a-select-option>
                <a-select-option value="散养户"> 散养户 </a-select-option>
                <a-select-option value="其他"> 其他 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="6">
            <a-form-item
              :labelCol="{ lg: { span: 19 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input
                v-decorator="['AXiangQy', { rules: [{ required: true, message: '请输入' }] }]"

                placeholder="请输入乡（镇）"></a-input
                ></a-form-item>
          </a-col> -->
          <a-col :span="12">
            <a-form-item
              :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input
                v-decorator="['ACunQy', { rules: [{ required: true, message: '请输入' }] }]"
                placeholder="请输入养殖场名称"
              ></a-input
              ></a-form-item>
          </a-col>
          <a-col :span="14">
            <a-form-item
              label="到达地点:"
              :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
            >
              <a-select
                placeholder="请选择"
                v-decorator="['AShengDd', { rules: [{ required: true, message: '请输入' }] }]"
                style="width: 30%;"
                @change="getCity"
              >
                <a-select-option v-for="(item, index) in arr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <a-select
                placeholder="请选择"
                v-decorator="['AShiDd', { rules: [{ required: true, message: '请输入' }] }]"
                style="width: 30%; margin-left: 10px"
                @change="getCounty"
              >
                <a-select-option v-for="(item, index) in cityArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <a-select
                placeholder="请选择"
                v-decorator="['AXianDd', { rules: [{ required: true, message: '请输入' }] }]"
                style="width: 30%; margin-left: 10px"
              >
                <a-select-option v-for="(item, index) in countyArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item
              :labelCol="{ lg: { span: 1 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input
                v-decorator="['AXiangDd', { rules: [{ required: true, message: '请输入' }] }]"
                placeholder="请输入乡（镇）"
              ></a-input
              ></a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="地点类型:"
              :labelCol="{ lg: { span: 10 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-select
                v-decorator="['ATypeDd', { rules: [{ required: true, message: '请输入' }] }]"
                style="width: 160px"
                placeholder="请选择"
              >
                <a-select-option value="养殖场"> 养殖场 </a-select-option>
                <a-select-option value="交易市场"> 交易市场 </a-select-option>
                <a-select-option value="散养户"> 散养户 </a-select-option>
                <a-select-option value="其他"> 其他 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="6">
            <a-form-item
              :labelCol="{ lg: { span: 19 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input
                v-decorator="['AXiangDd', { rules: [{ required: true, message: '请输入' }] }]"

                placeholder="请输入乡（镇）"></a-input
                ></a-form-item>
          </a-col> -->
          <a-col :span="12">
            <a-form-item
              :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input
                v-decorator="['ACunDd', { rules: [{ required: true, message: '请输入' }] }]"
                placeholder="请输入养殖场名称"
              ></a-input
              ></a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="承运人："
              :labelCol="{ lg: { span: 7 }, sm: { span: 6 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-input v-decorator="['ACarrier', { rules: [{ required: true, message: '请输入' }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="联系电话："
              :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-input v-decorator="['APhoneCyr', { rules: [{ required: true, message: '请输入' }] }]" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item
              label="用途:"
              :labelCol="{ lg: { span: 10 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-select
                v-decorator="['AYongTu', { rules: [{ required: true, message: '请输入' }] }]"
                style="width: 180px"
                placeholder="请选择"
              >
                <a-select-option value="饲养"> 饲养 </a-select-option>
                <a-select-option value="屠宰"> 屠宰 </a-select-option>
                <a-select-option value="乳用"> 乳用 </a-select-option>
                <a-select-option value="种用"> 种用 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="16">
            <a-form-item
              label="运载方式:"
              :labelCol="{ lg: { span: 11 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-radio-group v-decorator="['AYunZai', { rules: [{ required: true, message: '请输入' }] }]">
                <a-radio value="公路">公路 </a-radio>
                <a-radio value="铁路"> 铁路</a-radio>
                <a-radio value="水路">水路 </a-radio>
                <a-radio value="航空"> 航空</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="运载工具牌号"
              prop="ATrademark"
              :labelCol="{ lg: { span: 8 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
            >
              <a-input v-decorator="['ATrademark', { rules: [{ required: true, message: '请输入' }] }]"></a-input
              ></a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item
              label="装运前经"
              :labelCol="{ lg: { span: 8 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 1 } }"
            >
              <a-input
                v-decorator="['ADisinfection', { rules: [{ required: true, message: '请输入' }] }]"
              /></a-form-item>
          </a-col>
          <a-col :span="1"><span style="line-height: 35px; margin-left: 5px;">消毒</span></a-col>

          <a-col :span="24">
            <a-form-item
              label="本批动物经检疫合格,应于"
              :labelCol="{ lg: { span: 5 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 15 }, sm: { span: 1 } }"
            >
              <a-select
                v-decorator="['AYouXiaoRi', { rules: [{ required: true, message: '请输入' }] }]"
                style="width: 100px;"
                placeholder="请选择"
              >
                <a-select-option value="1"> 1 </a-select-option>
                <a-select-option value="2"> 2 </a-select-option>
                <a-select-option value="3"> 3 </a-select-option>
                <a-select-option value="4"> 4 </a-select-option>
              </a-select>
              <span style=" margin-left: 5px;">日内到达有效。</span>
            </a-form-item></a-col
          >
          <!-- <a-col :span="10"><span
            style="line-height: 35px; margin-left: 5px;">日内到达有效。</span></a-col> -->
          <a-col :span="15">
            <a-form-item
              label="官方兽医签字:"
              :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 8 }, sm: { span: 1 } }"
            >
              <a-input
                v-decorator="['AVeterinary', { rules: [{ required: true, message: '请输入' }] }]"
              /></a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item
              label="签发日期："
              :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 1 } }"
            >
              <a-date-picker
                v-decorator="['DateQF', { rules: [{ required: true, message: '请输入' }] }]"
                type="data"
                placeholder="请选择日期"
              /></a-form-item>
          </a-col>
          <a-col :span="20" v-show="updateForm.getFieldsValue().AXuZhong==='猪'||updateForm.getFieldsValue().AXuZhong==='羊'||updateForm.getFieldsValue().AXuZhong==='牛'">
            <a-form-item
              label="牲畜耳标号:"
              :labelCol="{ lg: { span: 4 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 14 }, sm: { span: 1 } }"
            >
              <a-input
                v-decorator="['AEarTag', { rules: [{ required: false, message: '请输入' }] }]"
                style="height:125px;"
                type="textarea"
              />
              <a-button type="primary" @click="er" style="position: absolute;margin: 3px 5px">耳标输入</a-button>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="4" :offset="0">
            <a-button type="primary" @click="er">耳标输入</a-button>
          </a-col> -->
          <a-col :span="20">
            <a-form-item
              label="备注:"
              :labelCol="{ lg: { span: 4 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 14 }, sm: { span: 1 } }"
            >
              <a-input
                v-decorator="['AMemo1']"
                style="height:125px;"
                type="textarea"
              /></a-form-item>
          </a-col>
        </a-row>
        <a-button
          type="primary"
          html-type="submit"
          style="margin-left:50%;transform: translateX(-50%);width:315px; height: 40px;"
        >
          确认
        </a-button>
      </a-form>
    </a-modal>
    <!-- 显示表单-->
    <a-modal :zIndex="1004" v-model="showvisible" :footer="null">
      <dwjy-ainfo :info="info" @child-showTF="showTFDJ"></dwjy-ainfo>
    </a-modal>
    <a-modal :zIndex="1004" v-model="vv" width="900px">
      <clu :columns1="clo" :totalnum="tt" :shu="shu1" @child-event1="father" @tiao="tiao"> </clu>
    </a-modal>
    <a-modal :destroyOnClose="true" :zIndex="1004" v-model="erVisited" :footer="null" width="800px">
      <er :man="man" :num="ernum" @hander-fa="ff"></er>
    </a-modal>
  </div>
</template>

<script>
import { placexiangx } from '@/assets/playdz'
import { eartag, leixin } from '@/assets/eartag'
import er from '../compont/er'
import citys from '@/assets/citys'
import clu from '../compont/clu3'
import { OwnerGet, AnimalQuarantineAList, AnimalQuarantineAXQ, AnimalQuarantineADel, antineAUpdate } from '@/api/cdjy'
import dwjyAadd from '../dwjy/dwjyAcompont/dwjyAadd'
import dwjyAupdate from '../dwjy/dwjyAcompont/dwjyAupdate'
import dwjyAinfo from '../dwjy/dwjyAcompont/dwjyAinfo'

import { getAdminAddress } from '@/api/AdministrativeAddress'
import formatTime from '@/utils/public'
// import httper from '@/utils/httper'
// eslint-disable-next-line no-unused-vars
var yenum = 1

// eslint-disable-next-line no-unused-vars
var yeOffset = 10
const columns1 = [
  {
    title: '序号',
    width: 80,
    key: 'FStId',
    align: 'center',
    dataIndex: 'FStId',
    customRender: (t, r, index) => {
      if (yenum === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenum - 1) * yeOffset + 1
      }
    }
  },
  {
    title: '签发日期',
    key: 'DateQF',
    width: 180,
    align: 'center',
    dataIndex: 'DateQF',
    customRender: (t, r, index) => {
      return t ? formatTime(t, 'yyyy-MM-dd hh:mm:ss') : ''
    }
  },
  {
    title: '检疫证编号',
    key: 'ANumber',
    align: 'center',
    dataIndex: 'ANumber',
    width: 180
  },
  {
    title: '货主',
    key: 'ACargoOwner',
    align: 'center',
    dataIndex: 'ACargoOwner',
    width: 200
  },
  {
    title: '动物种类',
    key: 'AXuZhong',
    align: 'center',
    dataIndex: 'AXuZhong',
    width: 120
  },
  {
    title: '数量',
    key: 'AQuantity',
    align: 'center',
    dataIndex: 'AQuantity',
    width: 120
  },
  {
    title: '单位',
    key: 'ADanWei',
    align: 'center',
    dataIndex: 'ADanWei',
    width: 120
  },
  {
    title: '用途',
    key: 'AYongTu',
    align: 'center',
    dataIndex: 'AYongTu',
    width: 120
  },
  {
    title: '启运地点',
    key: 'AMemo2',
    align: 'center',
    dataIndex: 'AMemo2',
    width: 320
  },
  {
    title: '到达地点',
    key: 'AMemo3',
    align: 'center',
    dataIndex: 'AMemo3',
    width: 320
  },
  {
    title: '承运人',
    key: 'ACarrier',
    align: 'center',
    dataIndex: 'ACarrier',
    width: 150
  },
  {
    title: '有效到达日',
    key: 'AYouXiaoRi',
    align: 'center',
    dataIndex: 'AYouXiaoRi',
    width: 120
  },

  {
    title: '官方兽医签字',
    key: 'AVeterinary',
    align: 'center',
    dataIndex: 'AVeterinary',
    width: 150
  },

  {
    title: '开证人员',
    key: 'FSuserName',
    align: 'center',
    dataIndex: 'FSuserName',
    width: 150
  },
  {
    title: '检疫证状态',
    key: 'IsPrant',
    align: 'center',
    dataIndex: 'IsPrant',
    width: 120
  },

  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 100,
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}
export default {
  components: {
    dwjyAinfo,
    dwjyAadd,
    dwjyAupdate,
    clu,
    er
  },
  inject: ['reload'],
  data () {
    return {
      // 地址
      province: '',
      city: '',
      county: '',
      provinceQy: '',
      cityQy: '',
      countyQy: '',
      arr: [],
      cityArr: [],
      countyArr: [],
      arrQy: [],
      cityArrQy: [],
      countyArrQy: [],
      Detailed: '',
      clo: [
        {
          title: '名称',
          key: 'FSyzcmc',
          width: 100,
          align: 'center',
          dataIndex: 'FSyzcmc'
        },
        {
          title: '动物种类',
          key: 'FSxz',
          align: 'center',
          dataIndex: 'FSxz',
          width: 80
        },
        {
          title: '地址',
          key: 'FSxxdz',
          align: 'center',
          dataIndex: 'FSxxdz',
          width: 180
        },
        {
          title: '电话',
          key: 'FSlxdh',
          align: 'center',
          dataIndex: 'FSlxdh',
          width: 180
        },

        {
          title: '操作',
          key: 'cz',
          fixed: 'right',
          width: 150,
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      man: '',
      shu1: [],
      tt: 0,
      vv: false,
      ernum: 0,
      erVisited: false,
      options: [],
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
      regInfo1: [],
      // 区名称
      regName: '请选择',
      // 动监站名称
      peoName: '请选择',

      // 行政存储
      FeQD1: [],
      FeQS1: [],
      FeDJ1: [],
      FeDjz1: [],
      xingzheng1: false,
      // 区，动监站选择
      regionTF1: false,

      peoTF1: false,
      peoInfo1: [],

      // 区名称
      regName1: '请选择',
      // 动监站名称
      peoName1: '请选择',

      selectedRowKeys: [],
      form: {
        name: '',
        phone: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      updateForm: this.$form.createForm(this),
      rowSelection,
      visible: false,
      updatevisible: false,
      showvisible: false,
      limit: 10,
      offset: 1,
      total: 0,
      UserId: sessionStorage.getItem('FStId'),
      selectwhere: '',
      columns1,
      data1: [],
      info: {},
      idList: '',
      fstid: ''
    }
  },
  created () {
    this.arr = citys
    this.getAll({
      selectwhere: this.selectwhere,
      limit: this.limit,
      offset: this.offset
    })
    // 行政树
    getAdminAddress()
      .then(res => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
        this.regInfo = this.options[0].children
        this.regInfo1 = this.options[0].children
        // this.regName = '请选择'
        res.forEach(item => {
          this.FeQD = item
          this.FeQD1 = item
          item.children.forEach((items, index) => {
            this.FeQS.push(items)
            this.FeQS1.push(items)
            items.children.forEach((itemOl, index) => {
              this.FeDjz.push(itemOl)
              this.FeDjz1.push(itemOl)
            })
          })
        })
        // for (var i = 0; i < this.FeQS.length - 1; i++) {

        // }
        console.log(this.FeQD, this.FeQS, this.FeDJ)
      })
      .catch(rol => {
        console.log(rol)
      })
  },

  methods: {
    getAXuZhong (val) {
      if (val !== '猪' || val !== '牛' || val !== '羊') {
        this.updateForm.setFieldsValue({
          AEarTag: ''
        })
      }
    },
    cx () {
      yenum = 1
      const p = {
        selectwhere: this.selectwhere,
        limit: this.limit,
        offset: 1
      }
        AnimalQuarantineAList(p, this.UserId)
        .then(res => {
          console.log(res)
          const Clres = JSON.parse(res.Data)
          this.data1 = Clres.rows
          this.offset = 1
          this.total = parseInt(Clres.total)
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    qi () {
      console.log(this.updateForm.getFieldsValue().AShengQy)
      for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]

        if (this.updateForm.getFieldsValue().AShengQy === obj.label) {
          this.cityArrQy = obj.children

          obj.children.forEach((item, index) => {
            if (item.label === this.updateForm.getFieldsValue().AShiQy) {
              this.countyArrQy = item.children
            }
          })
        }
      }
    },
    bb () {
      for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]
        if (this.updateForm.getFieldsValue().AShengDd === obj.label) {
          this.cityArr = obj.children
          obj.children.forEach((item, index) => {
            if (item.label === this.updateForm.getFieldsValue().AShiDd) {
              this.countyArr = item.children
            }
          })
        }
      }
    },
    getCity (val) {
      console.log(val)
      for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]

        if (val === obj.label) {
          this.cityArr = obj.children
          this.updateForm.setFieldsValue({ AShiDd: obj.children[0].label })
          this.updateForm.setFieldsValue({ AXianDd: obj.children[0].children[0].label })
        }
      }
    },
    getCounty (val) {
      for (let i = 0; i < this.cityArr.length; i++) {
        const obj = this.cityArr[i]
        if (val === obj.label) {
          this.countyArr = obj.children
          this.updateForm.setFieldsValue({ AXianDd: obj.children[0].label })
        }
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      this.updateForm.validateFields((err, v) => {
        v.AMemo2 = v.AShengQy + v.AShiQy + v.AXianQy + v.AXiangQy + v.ACunQy
        v.AMemo3 = v.AShengDd + v.AShiDd + v.AXianDd + v.AXiangDd + v.ACunDd

        if (!err) {
          AnimalQuarantineAXQ(this.fstid, this.UserId)
            .then(res => {
              const info = res.Data
              for (var key in v) {
                info[key] = v[key]
              }
              console.log(info)
              antineAUpdate(info, this.UserId).then(res => {
                console.log(res)
                this.reload()
              })
            })
            .catch(res => {
              this.$message.error('服务器异常')
            })
        } else {
          return false
        }
      })
    },

    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      var arr = ''
      selectedRows.forEach(item => {
        arr = arr + ',' + item.FStId
      })
      this.idList = arr.substring(1)
    },
    confirm (id) {
      console.log(id)
      this.deleteInfo(id)
    },
    async pil () {
      if (this.selectedRowKeys.length > 0) {
        await this.deleteInfo(this.idList)
        this.idList = ''
      } else {
        alert('请选择要删除的数据')
      }
    },
    async deleteInfo (ids) {
      await AnimalQuarantineADel(ids, this.UserId)
        .then(res => {
          this.$message.success('删除成功')
        })
        .catch(res => {
          this.$message.error('服务器错误')
        })

      this.reload()
    },
    getAll (p) {
      console.log(p)
      AnimalQuarantineAList(p, this.UserId)
        .then(res => {
          console.log(res)
          const Clres = JSON.parse(res.Data)
          this.data1 = Clres.rows
          console.log(this.data1)
          this.total = parseInt(Clres.total)
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    updateModal (id) {
      this.fstid = id
      AnimalQuarantineAXQ(id, this.UserId)
        .then(res => {
          console.log(res)
          this.updateForm.setFieldsValue(res.Data)
          this.bb()
          this.qi()
        })
        .catch(res => {
          this.$message.error('服务器异常')
        })
      this.updatevisible = true
    },
    addModal () {
      this.visible = true
    },
    showModal (id) {
      AnimalQuarantineAXQ(id, this.UserId)
        .then(res => {
          console.log(res)
          this.info = res.Data
        })
        .catch(res => {
          this.$message.error('服务器异常')
        })
      this.showvisible = true
    },
    onShowSizeChange (current, pageSize) {
      console.log('1111', current, pageSize)
      yeOffset = pageSize
      this.offset = current
      this.limit = pageSize
      yenum = current
      const p = {
        selectwhere: this.selectwhere,
        UserId: this.UserId,
        limit: this.limit,
        offset: this.offset
      }
      this.getAll(p)
      this.totalPage = Math.ceil(this.total / this.limit)
    },
    onChanges (checkedValues) {
      this.selectedRowKeys = []
      console.log(checkedValues)
      yenum = checkedValues
      this.offset = checkedValues
      const p = {
        selectwhere: this.selectwhere,
        UserId: this.UserId,
        limit: this.limit,
        offset: this.offset
      }
      this.getAll(p)
    },
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
          this.updateForm.AXianDd = this.regInfo[val].label
          this.peoName = '请选择'
          this.peoInfo = this.regInfo[val].children
        }, 0)
      }
    },
    er () {
      if (this.updateForm.getFieldsValue().AQuantity && this.updateForm.getFieldsValue().AXuZhong) {
        const allinfo = JSON.parse(localStorage.getItem('AllInfo'))
        const w = leixin(this.updateForm.getFieldsValue().AXuZhong)

        const q = eartag(allinfo.FSunitUstrId)
        this.man = w + '' + q
        this.ernum = parseInt(this.updateForm.getFieldsValue().AQuantity)
        this.erVisited = true
      } else {
        alert('请输入数量和种类')
      }
    },
    ff (arr) {
      console.log(arr)
      this.updateForm.setFieldsValue({
        AEarTag: arr
      })
      this.erVisited = false
    },
    ChangePeo (val) {
      if (val === '请选择') {
        this.peoName = '请选择'
      } else {
        this.peoTF = true
        this.peoName = this.peoInfo[val].label
        this.updateForm.setFieldsValue({ AXiangDd: this.peoName })
        console.log(this.regName, this.peoName)
      }
    },
    ChangeRegion1 (val) {
      console.log(val)
      if (val === '请选择') {
        this.peoTF1 = false
      } else {
        this.peoTF1 = false
        setTimeout(() => {
          this.peoTF1 = true
          this.regName1 = this.regInfo1[val].label
          this.peoName1 = '请选择'
          this.peoInfo1 = this.regInfo1[val].children
        }, 0)
      }
    },
    ChangePeo1 (val) {
      if (val === '请选择') {
        this.peoName1 = '请选择'
      } else {
        this.peoTF1 = true
        this.peoName1 = this.peoInfo1[val].label
      }
    },
    xz () {
      console.log(11)
      OwnerGet({ offset: 1, limit: 10, selectWhere: '', dist: 'gmyzc' }, this.UserId).then(res => {
        console.log(res)
        this.shu1 = JSON.parse(res.Data).rows
        console.log(this.shu1)
        this.tt = parseInt(JSON.parse(res.Data).total)
      })
      this.vv = true
    },
    showTFDJ () {
      console.log('执行了隐藏')
      this.showvisible = false
    },
    father (list) {
      console.log(list)
      const adree = list.FSdz
      const arr = placexiangx(adree)
      this.updateForm.setFieldsValue({ AShengQy: arr[0] })
      this.updateForm.setFieldsValue({ AShiQy: arr[1] })
      this.updateForm.setFieldsValue({ AXianQy: arr[2] })
      this.updateForm.setFieldsValue({ AXiangQy: arr[3].replace('/', '') })
      this.updateForm.setFieldsValue({ ACunQy: list.FSxxdz })
      this.updateForm.setFieldsValue({ AXuZhong: list.FSxz })
          if (list.FSyzclx !== '散养户') {
        this.updateForm.ATypeQy = '养殖场'
        } else {
        this.updateForm.ATypeQy = '散养户'
        }
      this.updateForm.setFieldsValue({ ACargoOwner: list.FSfzr })
      this.updateForm.setFieldsValue({ APhone: list.FSlxdh })
      this.vv = false
    },
    tiao (data) {
      console.log(data)
      OwnerGet(data, this.UserId).then(res => {
        this.shu1 = JSON.parse(res.Data).rows
        this.tt = parseInt(JSON.parse(res.Data).total)
      })
    },

    // 列表定制
    handleEdit () {
      this.$notification.error({
        message: '待开发，敬请期待'
      })
    }
  }
}
</script>

<style scoped lang="less">
.infoTop {
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
}
.dayi {
  margin-top: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.z {
  margin-left: 70%;
}
.foot1 {
  margin-left: 40px;
  position: relative;
}
.foot1:before {
  content: '注：';
  position: absolute;
  top: 0;
  left: -40px;
}
.er {
  margin-left: 60%;
}

.zhong {
  margin: 20px 0;
}
.hao {
  color: red;
  margin-left: 70%;
  display: inline-block;
}
.s {
  margin-left: 10px;
  font-size: 18px;
}

.qq {
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 20px;
}
.zb {
  margin-left: 55%;
}
.foot {
  letter-spacing: 2px;
}
.maintop {
  font-size: 20px;
  margin-left: 50%;
  margin-bottom: 10px;
  display: inline-block;
  transform: translateX(-50%);
}

.test {
  display: inline-block;
  width: 700px;
  letter-spacing: 2px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.card {
  margin-top: 30px;
}

.ainput {
  width: 400px;
  margin-right: 20px;
}

.abutton {
  margin-right: 30px;
}

/deep/ .ant-modal {
  width: 900px !important;
}
</style>
