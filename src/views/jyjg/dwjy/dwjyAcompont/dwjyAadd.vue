<template>
  <div>
    <a-form :form="addForm" @submit="handleSubmit">
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="记录单编号："
            :labelCol="{ lg: { span: 8 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input v-decorator="['JLDNumber', { rules: [{ required: true, message: '请输入' }] }]" />
            <a-input v-decorator="['JLDLX']" v-show="false" />
            <a-input v-decorator="['FGlid']" v-show="false" />
            <!-- this.addForm.setFieldsValue({ JLDLX: list.JLDLX })
       this.addForm.setFieldsValue({ FGlid: list.FStId }) -->
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
            :labelCol="{ lg: { span: 9 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 13 }, sm: { span: 8 } }"
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
            :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
          >
            <a-select
              v-decorator="['AXuZhong', { rules: [{ required: true, message: '请输入' }] }]"
              placeholder="请选择"
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
              style="width: 100px; margin-right: 10px"
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
            :labelCol="{ lg: { span: 7 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 17 }, sm: { span: 17 } }"
          >
            <a-select
              disabled
              v-decorator="['AShengQy', { rules: [{ required: true, message: '请输入' }] }]"
              style="width: 30%;"
            >
              <a-select-option v-for="(item,index) in arr" :value="item.label" :key="index">{{ item.label }}</a-select-option>
            </a-select>
            <a-select
              disabled
              v-decorator="['AShiQy', {rules: [{ required: true, message: '请输入' }] }]"
              style="width: 30%; margin-left: 10px"
            >
              <a-select-option v-for="(item,index) in cityArr" :value="item.label" :key="index">{{
                item.label
              }}</a-select-option>
            </a-select>
            <a-select
              v-decorator="['AXianQy', {rules: [{ required: true, message: '请输入' }] }]"
              style="width: 30%; margin-left: 10px"
            >
              <a-select-option v-for="(item,index) in countyArrQy" :value="item.label" :key="index">{{
                item.label
              }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!-- <a-select
              v-decorator="['AShiQy', { initialValue: '青岛市', rules: [{ required: true, message: '请输入' }] }]"
              style="width: 120px; margin-right: 10px"
              @change="ChangeTown"
            >
              <a-select-option value="青岛市"> 青岛市 </a-select-option>
            </a-select>
            <a-select
              v-decorator="['AXianQy', { initialValue: '请选择', rules: [{ required: true, message: '请输入' }] }]"
              style="width: 120px; margin-right: 10px"
              @change="ChangeRegion"
            >
              <a-select-option value="请选择"> 请选择 </a-select-option>
              <a-select-option v-for="(item, index) in regInfo" :key="index">
                {{ item.label }}
              </a-select-option>
            </a-select>
            <a-select
              v-decorator="['AXiangQy', { initialValue: '请选择', rules: [{ required: true, message: '请输入' }] }]"
              style="width: 120px"
              v-if="peoTF"
              @change="ChangePeo"
            >
              <a-select-option value="请选择"> 请选择 </a-select-option>
              <a-select-option v-for="(item, index) in peoInfo" :key="index">
                {{ item.label }}
              </a-select-option>
            </a-select> -->
        <a-col :span="10">
          <a-form-item
            :labelCol="{ lg: { span: 9 }, sm: { span: 3 } }"
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
            :labelCol="{ lg: { span: 12 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
          >
            <a-select
              v-decorator="['ATypeQy', { rules: [{ required: true, message: '请输入' }] }]"
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
              placeholder="请输入乡（镇）"
            ></a-input
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
            :labelCol="{ lg: { span: 7 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 17 }, sm: { span: 17 } }"
          >
            <!-- <a-select
              v-decorator="['AShiDd', { initialValue: '青岛市', rules: [{ required: true, message: '请输入' }] }]"
              style="width: 120px; margin-right: 10px"
              @change="ChangeTown"
            >
              <a-select-option value="青岛市"> 青岛市 </a-select-option>
            </a-select>
            <a-select
              v-decorator="['AXianDd', { initialValue: '请选择', rules: [{ required: true, message: '请输入' }] }]"
              style="width: 120px; margin-right: 10px"
              @change="ChangeRegion"
            >
              <a-select-option value="请选择"> 请选择 </a-select-option>
              <a-select-option v-for="(item, index) in regInfo" :key="index">
                {{ item.label }}
              </a-select-option>
            </a-select>
            <a-select
              v-decorator="['AXiangDd', { initialValue: '请选择', rules: [{ required: true, message: '请输入' }] }]"
              style="width: 120px"
              v-if="peoTF"
              @change="ChangePeo"
            >
              <a-select-option value="请选择"> 请选择 </a-select-option>
              <a-select-option v-for="(item, index) in peoInfo" :key="index">
                {{ item.label }}
              </a-select-option>
            </a-select> -->
            <a-select
              v-decorator="['AShengDd', { rules: [{ required: true, message: '请输入' }] }]"
              placeholder="请输入"
              style="width: 30%;"
              @change="getCity" >
              <a-select-option v-for="(item,index) in arr" :value="item.label" :key="index">{{ item.label }}</a-select-option>
            </a-select>
            <a-select
              v-decorator="['AShiDd', { rules: [{ required: true, message: '请输入' }] }]"
              placeholder="请输入"
              style="width: 30%; margin-left: 10px"
              @change="getCounty" >
              <a-select-option v-for="(item,index) in cityArr" :value="item.label" :key="index">{{
                item.label
              }}</a-select-option>
            </a-select>
            <a-select
              v-decorator="['AXianDd', {rules: [{ required: true, message: '请输入' }] }]"
              placeholder="请输入"
              style="width: 30%; margin-left: 10px"
            >
              <a-select-option v-for="(item,index) in countyArr" :value="item.label" :key="index">{{
                item.label
              }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item
            :labelCol="{ lg: { span: 9 }, sm: { span: 3 } }"
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
            :labelCol="{ lg: { span: 12 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
          >
            <a-select
              v-decorator="['ATypeDd', { rules: [{ required: true, message: '请输入' }] }]"
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
              placeholder="请输入乡（镇）"
            ></a-input
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
            :labelCol="{ lg: { span: 8 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input v-decorator="['ACarrier', { rules: [{ required: true, message: '请输入' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="联系电话："
            :labelCol="{ lg: { span: 7 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input v-decorator="['APhoneCyr', { rules: [{ required: true, message: '请输入' }] }]" />
          </a-form-item>
        </a-col>

        <a-col :span="8">
          <a-form-item
            label="用途:"
            :labelCol="{ lg: { span: 12 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
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
            <a-radio-group v-decorator="['AYunZai', { rules: [{ required: true, message: '请输入' }],initialValue:'公路' }]">
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
            <a-select
              v-decorator="['ADisinfection', { rules: [{ required: true, message: '选择' }] }]"
              placeholder="请选择"
            >
              <a-select-option value="0.5%过氧乙酸"> 0.5%过氧乙酸 </a-select-option>
            </a-select>
            <!-- <a-input
              v-decorator="['ADisinfection', { rules: [{ required: true, message: '请输入' }] }]"
            /></a-form-item> -->
          </a-form-item></a-col>
        <a-col :span="1"><span style="line-height: 35px; margin-left: 5px">消毒</span></a-col>

        <a-col :span="24">
          <a-form-item
            label="本批动物经检疫合格,应于"
            :labelCol="{ lg: { span: 5 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 1 } }"
          >
            <a-select
              v-decorator="['AYouXiaoRi', { rules: [{ required: true, message: '请输入' }] }]"
              style="width:100px"
              placeholder="请选择"
            >
              <a-select-option value="1"> 1 </a-select-option>
              <a-select-option value="2"> 2 </a-select-option>
              <a-select-option value="3"> 3 </a-select-option>
              <a-select-option value="4"> 4 </a-select-option>
              <a-select-option value="5"> 5 </a-select-option>
            </a-select>
            <span style="margin-left: 5px">日内到达有效。</span>
          </a-form-item></a-col
        >
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
        <a-col :span="20" v-if="AXuZhong==='猪'||AXuZhong==='牛'||AXuZhong==='羊'">
          <a-form-item
            label="牲畜耳标号:"
            :labelCol="{ lg: { span: 4 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 14 }, sm: { span: 1 } }"
          >
            <a-input
              v-decorator="['AEarTag', { rules: [{ required: true, message: '请输入' }] }]"
              style="height: 125px"
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
              style="height: 125px"
              type="textarea"
            /></a-form-item>
        </a-col>
      </a-row>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="this.subTF"
        style="margin-left: 50%; transform: translateX(-50%); width: 315px; height: 40px"
      >
        保存
      </a-button>
    </a-form>
    <a-modal :footer="null" v-model="vv" width="900px">
      <clu :columns1="clo" :totalnum="tt" :shu="shu1" @child-event1="father" @tiao="tiao"> </clu>
    </a-modal>
    <a-modal :destroyOnClose="true" :zIndex="1004" v-model="erVisited" :footer="null" width="800px">
      <er :man="man" :num="ernum" @hander-fa="ff"></er>
    </a-modal>
  </div>
</template>

<script>
import { eartag, leixin } from '@/assets/eartag'
import { placexiangx } from '@/assets/playdz'

import citys from '@/assets/citys'
import cityData from '@/assets/citydata.js'
import { OwnerGet } from '@/api/cdjy'
// eslint-disable-next-line no-unused-vars
import er from '../../compont/er'
import clu from '../../compont/clu3'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import httper from '@/utils/httper'
export default {
  inject: ['reload'],
  components: {
    clu,
    er
  },
  data () {
    return {
      cityData,
      shu1: [],
      tt: 0,
      vv: false,
      UserId: sessionStorage.getItem('FStId'),
      erVisited: false,
      shu: [],
      subTF: false,
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
      AXuZhong: '',
      addVisitd: false,
      addForm: this.$form.createForm(this),
      ernum: 0,
      // 行政存储
      FeQD: [],
      FeQS: [],
      FeDJ: [],
      FeDjz: [],
      // 区，动监站选择
      regionTF: false,
      regInfo: [],
      peoTF: false,
      peoInfo: [],
      man: '',
      // 区名称
      regName: '请选择',
      // 动监站名称
      peoName: '请选择',
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
      countyArrQy: []
    }
  },
  mounted () {
    // this.bb()
    this.qi()
  },
  created () {
     this.arr = citys
    this.getRecordNo()
    this.getHao()
    // 行政树
    getAdminAddress()
      .then((res) => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
        this.regInfo = this.options[0].children
        // this.regName = '请选择'
        res.forEach((item) => {
          this.FeQD = item
          item.children.forEach((items, index) => {
            this.FeQS.push(items)
            items.children.forEach((itemOl, index) => {
              this.FeDjz.push(itemOl)
            })
          })
        })
        // for (var i = 0; i < this.FeQS.length - 1; i++) {

        // }
        console.log(this.FeQD, this.FeQS, this.FeDJ)
      })
      .catch((rol) => {
        console.log(rol)
      })
  },
  methods: {
    getAXuZhong (val) {
     this.AXuZhong = val
    },
    qi () {
      for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]
        this.addForm.setFieldsValue({ AShengQy: '山东省' })

        if (this.addForm.getFieldsValue().AShengQy === obj.label) {
          this.cityArrQy = obj.children
           this.addForm.setFieldsValue({ AShiQy: '青岛市' })
          obj.children.forEach((item, index) => {
            if (item.label === this.addForm.getFieldsValue().AShiQy) {
              this.countyArrQy = item.children
            }
          })
          //  this.addForm.rdddzxx1 = obj.children[0].label
          //  this.countyArr = obj.children[0].children
          //   this.addForm.rdddzxx2 = obj.children[0].children[0].label
        }
      }
    },
    // bb () {
    //   for (var i = 0; i < this.arr.length; i++) {
    //     var obj = this.arr[i]
    //     this.addForm.rdddzxx = '山东省'
    //     this.addForm.setFieldsValue({rdddzxx:'山东省'})
    //     if (this.addForm.rdddzxx === obj.label) {
    //       this.cityArr = obj.children

    //       this.addForm.rdddzxx1 = obj.children[0].label
    //       this.countyArr = obj.children[0].children
    //       this.addForm.rdddzxx2 = obj.children[0].children[0].label
    //     }
    //   }
    // },
    getCity (val) {
        this.addForm.setFieldsValue({ AShengDd: val })
      for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]

        if (val === obj.label) {
          this.cityArr = obj.children

           this.addForm.setFieldsValue({ AShiDd: obj.children[0].label })
            this.cityArr.forEach((item, index) => {
             if (item.label === this.addForm.getFieldsValue().AShiDd) {
                this.countyArr = item.children
             }
          })
            this.addForm.setFieldsValue({ AXianDd: obj.children[0].children[0].label })
        }
      }
    },
    getCounty (val) {
      for (var i = 0; i < this.cityArr.length; i++) {
        var obj = this.cityArr[i]
        if (val === obj.label) {
          this.countyArr = obj.children
           this.addForm.setFieldsValue({ AXianDd: obj.children[0].label })
        }
      }
    },
    ff (arr) {
      console.log(arr)
      this.addForm.setFieldsValue({
        AEarTag: arr
      })
      this.erVisited = false
    },
    er () {
       if (this.addForm.getFieldsValue().AQuantity && this.addForm.getFieldsValue().AXuZhong) {
          const allinfo = JSON.parse(localStorage.getItem('AllInfo'))
       const w = leixin(this.addForm.getFieldsValue().AXuZhong)

       const q = eartag(allinfo.FSunitUstrId)
        this.man = w + '' + q
         this.ernum = parseInt(this.addForm.getFieldsValue().AQuantity)
          this.erVisited = true
       } else {
         alert('请输入数量和动物种类')
       }
    },
    // 获取记录单编号
    async getRecordNo () {
      const AllInfo = JSON.parse(localStorage.getItem('AllInfo'))
      const res = await this.$axios.post(
        `${httper}/SetSBDBH.ashx?FSunitUstrId=${AllInfo.FSuserId}&lx=jl&FSunitId=${AllInfo.FSunitId}&FSunitName=${AllInfo.FSunitName}&uid=${AllInfo.FSunitUstrId}`
      )
      this.addForm.setFieldsValue({ JLDNumber: res.data.data.result })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.subTF = true
      this.addForm.validateFields((err, v) => {
        console.log(v)
        v.JLDLX = ''
        v.AMemo2 = v.AShengQy + v.AShiQy + v.AXianQy + v.AXiangQy + v.ACunQy
        v.AMemo3 = v.AShengDd + v.AShiDd + v.AXianDd + v.AXiangDd + v.ACunDd
        const data = {
          type: 'Qua_AnimalQuarantineA',
          json: JSON.stringify(v),
          uid: JSON.parse(localStorage.getItem('AllInfo')).FStId
        }
        const dataJson = encodeURI(data.json)
        console.log(`${httper}/Upload.ashx?uid=${data.uid}&type=${data.type}&json=${dataJson}`)
        if (!err) {
          this.$axios({
            method: 'post',
            url: `${httper}/Upload.ashx?uid=${data.uid}&type=${data.type}&json=${dataJson}`
          }).then((res) => {
            console.log(res)
            this.subTF = false
            if (res.data.errorCode !== 0) {
              this.$message.error(res.data.errorMsg)
            } else {
              this.$message.success('新增成功')
              this.reload()
            }
          })
        } else {
          this.subTF = false
          return false
        }
      })
    },
    father (list) {
      console.log(list)

       const adree = list.FSdz
     const arr = placexiangx(adree)

         this.addForm.setFieldsValue({ AShengQy: arr[0] })
         this.addForm.setFieldsValue({ AShiQy: arr[1] })
         this.addForm.setFieldsValue({ AXianQy: arr[2] })
         this.addForm.setFieldsValue({ AXiangQy: arr[3].replace('/', '') })
        // FSyzclx
        if (list.FSyzclx !== '散养户') {
         this.addForm.setFieldsValue({ ATypeQy: '养殖场' })
        } else {
         this.addForm.setFieldsValue({ ATypeQy: '散养户' })
        }
      this.addForm.setFieldsValue({ AXuZhong: list.FSxz })
      this.addForm.setFieldsValue({ ACunQy: list.FSxxdz })

      this.addForm.setFieldsValue({ ACargoOwner: list.FSfzr })
      this.addForm.setFieldsValue({ APhone: list.FSlxdh })
      this.vv = false
    },
    // xz () {
    //   this.getLu()
    //   this.addVisitd = true
    // },
    tiao (data) {
      console.log(data)
      data.offset = 1
      data.limit = 10
      OwnerGet(data, this.UserId).then((res) => {
        this.shu1 = JSON.parse(res.Data).rows
        this.tt = parseInt(JSON.parse(res.Data).total)
      })
    },
    xz () {
      console.log(11)
      OwnerGet({ offset: 1, limit: 10, selectWhere: '', dist: 'gmyzc' }, this.UserId).then((res) => {
        // console.log(res)
        this.shu1 = JSON.parse(res.Data).rows
        this.tt = parseInt(JSON.parse(res.Data).total)
      })
      this.vv = true
    },
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

    getLu () {
      const Allinfo = JSON.parse(localStorage.getItem('AllInfo'))
      this.$axios
        .get(
          httper +
            '/GetInfos.ashx?FStId=-1&Name=Qua_AnimalQuarantineA_CDJLD&uid=' +
            Allinfo.FStId +
            '&FSunitUstrId=' +
            Allinfo.FSunitUstrId +
            '&txt='
        )
        .then((res) => {
          console.log(res)

          this.shu = res.data.dataList
        })
    },
    getHao () {
      const Allinfo = JSON.parse(localStorage.getItem('AllInfo'))
      console.log(Allinfo)
      this.$axios.get(httper + '/GetNumber.ashx?type=1&uid=' + Allinfo.FStId).then((res) => {
        console.log(res)
        this.addForm.setFieldsValue({ ANumber: res.data.data.result })
      })
    }
  }
}
</script>

<style>
</style>
