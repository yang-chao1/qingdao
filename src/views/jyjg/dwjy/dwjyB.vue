<template>
  <div>
    <page-header-wrapper> </page-header-wrapper>
    <a-card class="card">
      <a-input size="large" v-model="selectwhere" class="ainput" placeholder="请输入货主姓名" />
      <a-button class="abutton" type="primary" @click="cx">查询</a-button>

      <a-button class="abutton" type="primary" @click="handleEdit()">导出</a-button>
      <a-button v-permission="{active:'AQCBanimalsadd'}" class="abutton" type="primary" icon="plus" @click="addModal">新增</a-button>
      <a-button v-permission="{active:'AQCBanimalsdele'}" class="abutton" type="primary" @click="pli">批量删除</a-button>
      <a-row>
        <!-- <a-col :span="12" :offset="6">
          <a-tree-select
            style="width: 25%; position: relative; left: 100%; top: 0"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="所在地"
            :tree-data="options"
          >
          </a-tree-select>
        </a-col> -->
        <br>
      </a-row>
      <a-table
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :pagination="false"
        :scroll="{ x: 2000 }"

        :columns="columns1"
        :data-source="data1"
        style="margin-top: 5px"
      >
        <template slot="action" slot-scope="text,recoed">
          <a v-permission="{active:'AQCBanimalssele'}" slot="action" @click="showModal(recoed.FStId)">查看&nbsp;&nbsp;</a>
          <a v-permission="{active:'AQCBanimalsupd'}" slot="action" @click="updateModal(recoed.FStId)">修改&nbsp;&nbsp;</a>
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
        >当前第 {{ this.offset }}/{{ Math.ceil(this.total / this.limit) }} 页 共 {{ this.total }} 条记录 每页 {{ this.limit }} 条</span>
      </div>
    </a-card>
    <!-- 增加表单-->
    <a-modal :destroyOnClose="true" :footer="null" title="动物检疫证明(动物B)" v-model="visible">
      <dwjy-badd></dwjy-badd>
    </a-modal>
    <!-- 修改表单-->

    <a-modal :footer="null" title="修改申报单" v-model="updatevisible">
      <a-form :form="updateForm" @submit="handleSubmit">
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="记录单编号："
              :labelCol="{ lg: { span: 8 }, sm: { span: 6 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-input v-decorator="['JLDNumber', { rules: [{ required: true, message: '请输入' }] }]" />
              <a-input
                v-decorator="['JLDLX']"
                v-show="false"
              />
              <a-input
                v-decorator="['FGlid']"
                v-show="false"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="检疫证编号："
              :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-input v-decorator="['AQNumber', { rules: [{ required: true, message: '请输入' }] }]" />
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
              <a-input v-decorator="['AQCargoOwner', { rules: [{ required: true, message: '请输入' }] }]" />
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
              <a-input v-decorator="['AQPhone', { rules: [{ required: true, message: '请输入' }] }]" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="动物种类:"
              :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-select
                @change="getAQXuZhong"
                v-decorator="['AQXuZhong', { rules: [{ required: true, message: '请输入' }] }]"
                style="width: 160px"
                placeholder="请选择"
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
                v-decorator="['AQQuantity', { rules: [{ required: true, message: '请输入' }] }]"
                style="width: 100px; margin-right: 10px"
              ></a-input>
              <a-select
                v-decorator="['AQDanWei', {rules: [{ required: true, message: '请输入' }] }]"
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
          <a-col :span="12">
            <a-form-item
              label="用途:"
              :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            >
              <a-select
                v-decorator="['AQYongTu', {rules: [{ required: true, message: '请输入' }] }]"

                style="width: 160px"
                placeholder="请选择">
                <a-select-option value="饲养"> 饲养 </a-select-option>
                <a-select-option value="屠宰"> 屠宰 </a-select-option>
                <a-select-option value="乳用"> 乳用 </a-select-option>
                <a-select-option value="种用"> 种用 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="运载工具牌号"
              :labelCol="{ lg: { span: 7 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
            >
              <a-input
                v-decorator="['FSm5', { rules: [{ required: true, message: '请输入' }] }]"

              ></a-input
              ></a-form-item>
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
                v-decorator="['AQShengQy', { rules: [{ required: true, message: '请输入' }] }]"
              >
                <a-select-option v-for="(item,index) in arr" :value="item.label" :key="index">{{ item.label }}</a-select-option>
              </a-select>
              <a-select
                disabled
                style="width: 30%; margin-left: 2%"
                v-decorator="['AQShiQy', {rules: [{ required: true, message: '请输入' }] }]"
              >
                <a-select-option v-for="(item,index) in cityArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <a-select
                v-decorator="['AQXianQy', {rules: [{ required: true, message: '请输入' }] }]"
                style="width: 30%; margin-left: 2%"
              >
                <a-select-option v-for="(item,index) in countyArrQy" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item
              :labelCol="{ lg: { span: 1 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 17 }, sm: { span: 8 } }"
            >
              <a-input
                v-decorator="['AQXiangQy', {rules: [{ required: true, message: '请输入' }] }]"

                placeholder="请输入乡（镇）"
              ></a-input
              ></a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="地点类型:"
              :labelCol="{ lg: { span: 10 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 13 }, sm: { span: 8 } }"
            >
              <a-select
                v-decorator="['AQTypeQy', { rules: [{ required: true, message: '请输入' }] }]"
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
                v-model="Detailed"

                placeholder="请输入乡（镇）"
              ></a-input
              ></a-form-item>
          </a-col> -->
          <a-col :span="10">
            <a-form-item
              :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input
                v-decorator="['AQCunQy', { rules: [{ required: true, message: '请输入' }] }]"
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
                v-decorator="['AQShengDd', { rules: [{ required: true, message: '请输入' }] }]"
                disabled
                style="width: 30%;"
                @change="getCity" >
                <a-select-option v-for="(item,index) in arr" :value="item.label" :key="index">{{ item.label }}</a-select-option>
              </a-select>
              <a-select
                placeholder="请选择"
                v-decorator="['AQShiDd', { rules: [{ required: true, message: '请输入' }] }]"
                style="width: 30%; margin-left: 2%"
                @change="getCounty" >
                <a-select-option v-for="(item,index) in cityArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <a-select
                placeholder="请选择"
                v-decorator="['AQXianDd', { rules: [{ required: true, message: '请输入' }] }]"
                style="width: 30%; margin-left: 2%"
              >
                <a-select-option v-for="(item,index) in countyArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item
              :labelCol="{ lg: { span: 1 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 17 }, sm: { span: 8 } }"
            >
              <a-input
                v-decorator="['AQXiangDd', { rules: [{ required: true, message: '请输入' }] }]"
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
                v-decorator="['AQTypeDd', { rules: [{ required: true, message: '请输入' }] }]"
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
                v-decorator="['AQXiangDd', { rules: [{ required: true, message: '请输入' }] }]"
                placeholder="请输入乡（镇）"
              ></a-input
              ></a-form-item>
          </a-col> -->
          <a-col :span="10">
            <a-form-item
              :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input
                v-decorator="['AQCunDd', { rules: [{ required: true, message: '请输入' }] }]"
                placeholder="请输入养殖场名称"
              ></a-input
              ></a-form-item>
          </a-col>

          <a-col :span="20" v-show="updateForm.getFieldsValue().AQXuZhong==='猪'||updateForm.getFieldsValue().AQXuZhong==='羊'||updateForm.getFieldsValue().AQXuZhong==='牛'">
            <a-form-item
              label="牲畜耳标号:"
              :labelCol="{ lg: { span: 4 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 14 }, sm: { span: 1 } }"
            >
              <a-input
                v-decorator="['AQEarTag', { rules: [{ required: false, message: '请输入' }] }]"
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
                v-decorator="['AQMemo1']"
                style="height: 125px"
                type="textarea"
              /></a-form-item>
          </a-col>
          <a-col :span="22" :offset="1">
            <div>本批动物经检疫合格,应于当日内到达有效。</div>
            <br />
          </a-col>
          <a-col :span="15">
            <a-form-item
              label="官方兽医签字:"
              :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 8 }, sm: { span: 1 } }"
            >
              <a-input
                v-decorator="['AQVeterinary', { rules: [{ required: true, message: '请输入' }] }]"
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

                type="date"
                placeholder="请选择日期"
              /></a-form-item>
          </a-col>
        </a-row>
        <a-button
          type="primary"
          html-type="submit"
          style="margin-left: 50%; transform: translateX(-50%); width: 315px; height: 40px"
        >
          确认
        </a-button>
      </a-form>
    </a-modal>
    <!-- 显示表单-->
    <a-modal v-model="showvisible" :footer="null">
      <dwjy-binfo @child-showTF="showTFDJ" :info="info"></dwjy-binfo>
    </a-modal>
    <a-modal v-model="vv" :footer="null" width="900px">
      <clu
        :columns1="clo"

        :totalnum="tt"
        :shu="shu1"
        @child-event1="father"
        @tiao="tiao">

      </clu>
    </a-modal>
    <a-modal :destroyOnClose="true" :zIndex="1004" v-model="erVisited" :footer="null" width="800px">
      <er :man="man" :num="ernum" @hander-fa="ff"></er>
    </a-modal>
  </div>
</template>

<script>
import { placexiangx } from '@/assets/playdz'
import formatTime from '@/utils/public'
import { eartag, leixin } from '@/assets/eartag'
import er from '../compont/er'
import citys from '@/assets/citys'
import clu from '@/views/jyjg/compont/clu3'
import { OwnerGet, AnimalQuarantineBList, AnimalQuarantineB, AnimalQuarantineBDel, AnimalQuarantineBUpdate } from '@/api/cdjy'
import httper from '@/utils/httper'
import dwjyBadd from '../dwjy/dwjyBcompont/dwjyBadd'
import dwjyBinfo from '../dwjy/dwjyBcompont/dwjyBinfo'
import { getAdminAddress } from '@/api/AdministrativeAddress'

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
    key: 'AQNumber',
    align: 'center',
    dataIndex: 'AQNumber',
    width: 180
  },
  {
    title: '货主',
    key: 'AQCargoOwner',
    align: 'center',
    dataIndex: 'AQCargoOwner',
    width: 150
  },
  {
    title: '动物种类',
    key: 'AQXuZhong',
    align: 'center',
    dataIndex: 'AQXuZhong',
    width: 120
  },
  {
    title: '数量',
    key: 'AQQuantity',
    align: 'center',
    dataIndex: 'AQQuantity',
    width: 120
  },
  {
    title: '单位',
    key: 'AQDanWei',
    align: 'center',
    dataIndex: 'AQDanWei',
    width: 120
  },
  {
    title: '用途',
    key: 'AQYongTu',
    align: 'center',
    dataIndex: 'AQYongTu',
    width: 120
  },
  {
    title: '启运地点',
    key: 'AQMemo2',
    align: 'center',
    dataIndex: 'AQMemo2',
    width: 320
  },
  {
    title: '到达地点',
    key: 'AQMemo3',
    align: 'center',
    dataIndex: 'AQMemo3',
    width: 320
  },

  {
    title: '有效到达日',
    key: 'AQYouXiaoRi',
    align: 'center',
    dataIndex: 'AQYouXiaoRi',
    width: 120
  },

  {
    title: '官方兽医签字',
    key: 'AQVeterinary',
    align: 'center',
    dataIndex: 'AQVeterinary',
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
const data1 = [
  {
    xhao: 1,
    qfdata: '2020-09-17',
    biaohao: '3731014249',
    hzxm: '青岛康大生物科技有限公司',
    animal: '鸡',
    num: '51',
    dw: '只',
    yontu: '饲养',
    di: '山东省青岛市黄岛区张家楼西石岭康大生物科..',
    daoadree: '四川省成都市武侯区高朋大道28号',
    ren: '高刘兴',
    ri: 2,
    qz: '王红',
    kzry: '王红',
    zt: '已打印'

  },
  {
    xhao: 1,
    qfdata: '2020-09-17',
    biaohao: '3731014249',
    hzxm: '青岛康大生物科技有限公司',
    animal: '鸡',
    num: '51',
    dw: '只',
    yontu: '饲养',
    di: '山东省青岛市黄岛区张家楼西石岭康大生物科..',
    daoadree: '四川省成都市武侯区高朋大道28号',
    ren: '高刘兴',
    ri: 2,
    qz: '王红',
    zt: '已打印',
    wan: ''
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
    dwjyBinfo,
    dwjyBadd,
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
         clo: [{
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
        }],
       Detailed: '',
       erVisited: false,
       shu: [],
      shu1: [],
      tt: 0,
      vv: false,
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
      regInfo1: [],
      peoTF1: false,
      peoInfo1: [],

      // 区名称
      regName1: '请选择',
      // 动监站名称
      peoName1: '请选择',
      ernum: 0,
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
      rowSelection,
      visible: false,
      updatevisible: false,
      showvisible: false,
      man: '',
      columns1,
      data1,
        limit: 10,
      offset: 1,
      total: 0,
      UserId: sessionStorage.getItem('FStId'),
      selectwhere: '',
       idList: '',
       selectedRowKeys: [],
      info: {},
      updateForm: this.$form.createForm(this),
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
      .then((res) => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
        this.regInfo = this.options[0].children
         this.regInfo1 = this.options[0].children
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
    getAQXuZhong (val) {
      if (val !== '猪' || val !== '牛' || val !== '羊') {
        this.updateForm.setFieldsValue({
          AQEarTag: ''
        })
      }
    },
    cx () {
      yenum = 1

      const p = {
            selectwhere: this.selectwhere,
            limit: 10,
            offset: 1
      }
       AnimalQuarantineBList(p, this.UserId).then(res => {
        console.log(res)
        const Clres = JSON.parse(res.Data)
        this.data1 = Clres.rows
        this.total = parseInt(Clres.total)
        this.offset = 1
      }).catch(rol => {
        console.log(rol)
      })
    },
      qi () {
         this.updateForm.setFieldsValue({ AQShengQy: '山东省' })

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
        this.updateForm.setFieldsValue({ AQShengDd: '山东省' })

    for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]

        if (this.updateForm.getFieldsValue().AQShengDd === obj.label) {
          this.cityArr = obj.children
          obj.children.forEach((item, index) => {
             if (item.label === this.updateForm.getFieldsValue().AQShiDd) {
                 this.countyArr = item.children
             }
            })
        }
      }
  },
       getCity (val) {
      for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]

        if (val === obj.label) {
          this.cityArr = obj.children
        this.updateForm.setFieldsValue({ AQShiDd: obj.children[0].label })
        this.updateForm.setFieldsValue({ AQXianDd: obj.children[0].children[0].label })
         }
      }
    },
    getCounty (val) {
      for (let i = 0; i < this.cityArr.length; i++) {
        const obj = this.cityArr[i]
        if (val === obj.label) {
           this.countyArr = obj.children
        this.updateForm.setFieldsValue({ AQXianDd: obj.children[0].label })
        }
      }
    },
     er () {
       if (this.updateForm.getFieldsValue().AQQuantity && this.updateForm.getFieldsValue().AQXuZhong) {
          const allinfo = JSON.parse(localStorage.getItem('AllInfo'))
       const w = leixin(this.updateForm.getFieldsValue().AQXuZhong)

       const q = eartag(allinfo.FSunitUstrId)
        this.man = w + '' + q
         this.ernum = parseInt(this.updateForm.getFieldsValue().AQQuantity)
          this.erVisited = true
       } else {
         alert('请输入数量和动物种类')
       }
    },
      ff (arr) {
      console.log(arr)
      this.updateForm.setFieldsValue({
        AQEarTag: arr
      })
      this.erVisited = false
    },
      handleSubmit (e) {
      e.preventDefault()
        this.updateForm.validateFields((err, v) => {
            v.AQMemo2 = v.AQShengQy + v.AQShiQy + v.AQXianQy + v.AQXiangQy + v.AQCunQy
        v.AQMemo3 = v.AQShengDd + v.AQShiDd + v.AQXianDd + v.AQXiangDd + v.AQCunDd

         if (!err) {
           AnimalQuarantineB(this.fstid, this.UserId).then(res => {
        const info = res.Data
        for (var key in v) {
          info[key] = v[key]
        }
        // console.log(info)
        console.log(JSON.stringify(info))
        AnimalQuarantineBUpdate(info, this.UserId).then(res => {
          this.$message.success('修改成功')

           this.reload()
        })
      }).catch(res => {
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
   async pli () {
        if (this.selectedRowKeys.length > 0) {
         await this.deleteInfo(this.idList)
         this.idList = ''
      } else {
        alert('请选择要删除的数据')
      }
    },
    async deleteInfo (ids) {
     await AnimalQuarantineBDel(ids, this.UserId).then(res => {
        this.$message.success('删除成功')
      }).catch(res => {
        this.$message.error('服务器错误')
      })

       this.reload()
    },
      getAll (p) {
      AnimalQuarantineBList(p, this.UserId).then(res => {
        console.log(res)
        const Clres = JSON.parse(res.Data)
        this.data1 = Clres.rows
        this.total = parseInt(Clres.total)
      }).catch(rol => {
        console.log(rol)
      })
    },
    updateModal (id) {
       this.fstid = id
      AnimalQuarantineB(id, this.UserId).then(res => {
       this.$nextTick(() => {
        this.updateForm.setFieldsValue(res.Data)

           this.bb()
          this.qi()
       })
      }).catch(res => {
        this.$message.error('服务器异常')
      })

      this.updatevisible = true
    },
    addModal () {
      this.visible = true
    },
    showModal (id) {
       AnimalQuarantineB(id, this.UserId).then(res => {
        this.info = res.Data
        console.log(this.info)
      }).catch(res => {
        this.$message.error('服务器异常')
      })
      this.showvisible = true
    },
    showTFDJ () {
      console.log('执行了隐藏')
      this.showvisible = false
    },
 father (list) {
      const adree = list.FSdz
   const arr = placexiangx(adree)
         this.updateForm.setFieldsValue({ AQShengQy: arr[0] })
         this.updateForm.setFieldsValue({ AQShiQy: arr[1] })
         this.updateForm.setFieldsValue({ AQXianQy: arr[2] })
         this.updateForm.setFieldsValue({ AQXiangQy: arr[3].replace('/', '') })

        this.updateForm.setFieldsValue({ AQXuZhong: list.FSxz })
         this.updateForm.setFieldsValue({ AQCunQy: list.FSxxdz })
if (list.FSyzclx !== '散养户') {
        this.updateForm.AQTypeQy = '养殖场'
        } else {
        this.updateForm.AQTypeQy = '散养户'
        }
       this.updateForm.setFieldsValue({ AQCargoOwner: list.FSfzr })
       this.updateForm.setFieldsValue({ AQPhone: list.FSlxdh })
      this.vv = false
    },
      tiao (data) {
      OwnerGet(data, this.UserId).then(res => {
         this.shu1 = JSON.parse(res.Data).rows
         this.tt = parseInt(JSON.parse(res.Data).total)
        })
    },

      xz () {
         console.log(11)
        OwnerGet({ offset: 1, limit: 10, selectWhere: '', dist: 'gmyzc' }, this.UserId).then(res => {
          // console.log(res)
        this.shu1 = JSON.parse(res.Data).rows
         this.tt = parseInt(JSON.parse(res.Data).total)
        })
        this.vv = true
      },
    getLu () {
      const Allinfo = JSON.parse(localStorage.getItem('AllInfo'))
      this.$axios
        .get(
          httper +
            '/GetInfos.ashx?FStId=-1&Name=Qua_AnimalQuarantineB_CDJLD&uid=' +
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

        console.log(this.regName1, this.peoName1)
      }
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
  content: "注：";
  position: absolute;
  top: 0;left: -40px;
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
  letter-spacing:2px
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
