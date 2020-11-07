<template>
  <div>
    <a-form-model>
      <a-row>
        <a-col :span="12">

          <a-form-model-item
            label="记录单编号："
            :labelCol="{ lg: { span:6 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <!-- </a-col>
        <a-col :span="6"> -->
            <a-input disabled v-model="updateinfo.recordNo"></a-input>
          </a-form-model-item></a-col>
        <a-col :span="12">
          <a-form-model-item
            label="动物卫生监督所（分所）名称"
            :labelCol="{ lg: { span:12}, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }"
          >

            <!-- </a-col>
        <a-col :span="8"> -->
            <a-input v-model="updateinfo.supervisename"></a-input>
          </a-form-model-item></a-col>
        <br><br><br>
        <a-col :span="24">
          <div class="qq">基本情况：</div>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="报检时间"
            prop="resource"
            :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 11 }, sm: { span: 12 } }"
          >
            <a-date-picker
              v-model="updateinfo.inspectiontime"
              show-time
              type="date"
              placeholder="请选择时间"
              style="width: 75%"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="检疫时间"
            prop="resource"
            :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-date-picker
              v-model="updateinfo.quarantinetime"
              show-time
              type="date"

              placeholder="请选择时间"
              style="width: 75%"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="9">
          <a-form-model-item
            ref="name"
            label="货主姓名"
            prop="name"
            :labelCol="{ lg: { span: 8 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
          >
            <a-input v-model="updateinfo.shippername" />
            <a-button @click="xz" type="primary" style="position: absolute;margin: 3px 5px">选择</a-button>
          </a-form-model-item>
        </a-col>
        <!-- <a-col :span="2">
          <a-button @click="xz" type="primary">选择</a-button>
        </a-col> -->
        <a-col :span="7">
          <a-form-model-item
            ref="name"
            label="联系电话"
            prop="phone"
            :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 14 }, sm: { span: 12 } }"
          >
            <a-input v-model="updateinfo.teltphone" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item
            ref="name"
            label="身份证号码"
            prop="phone"
            :labelCol="{ lg: { span: 8 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 14 } }"
          >
            <a-input v-model="updateinfo.idcardnum" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="9">
          <a-form-item
            label="动物种类:"
            :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
          >
            <a-select v-model="updateinfo.animalsort" style="width: 160px" placeholder="请选择">
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
        <a-col :span="7">
          <a-form-item
            label="用途:"
            :labelCol="{ lg: { span: 9 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
          >
            <a-select v-model="updateinfo.myuse" style="width: 160px" placeholder="请选择">
              <a-select-option value="屠宰"> 屠宰 </a-select-option>
              <a-select-option value="乳用"> 乳用 </a-select-option>
              <a-select-option value="饲养"> 饲养 </a-select-option>
              <a-select-option value="种用"> 种用 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="动物来源:"
            :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
          >
            <a-select v-model="updateinfo.animalsources" style="width: 160px" placeholder="请选择">
              <a-select-option value="养殖场"> 养殖场 </a-select-option>
              <a-select-option value="交易市场"> 交易市场 </a-select-option>
              <a-select-option value="散养户"> 散养户 </a-select-option>
              <a-select-option value="其他"> 其他 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="13">
          <a-form-item
            label="养殖场、村、 原驻地或捕获地名称:"
            :labelCol="{ lg: { span: 12 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
          >
            <a-input v-model="updateinfo.farmsnme"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item
            label="检疫地点:"
            :labelCol="{ lg: { span: 11 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 13 }, sm: { span: 8 } }"
          >
            <a-input v-model="updateinfo.quarantineaddress"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="野生动物驯养繁殖许可证号"
            :labelCol="{ lg: { span: 13 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
          >
            <a-input v-model="updateinfo.domesticatedid"></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="野生动物捕捉(猎捕)许可证号"
            :labelCol="{ lg: { span: 11 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 11 }, sm: { span: 9 } }"
          >
            <a-input v-model="updateinfo.catchid"></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="18">
          <a-form-item
            label="数量及单位:"
            :labelCol="{ lg: { span: 4 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
          >
            <a-input v-model="updateinfo.animalnum" style="width:80px;margin-right:10px"></a-input>
            <a-select
              v-model="updateinfo.QDWDanWei"
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
        <a-col :span="24">
          <a-form-item
            label="启运地点:"
            :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 17 }, sm: { span: 17 } }"
          >
            <a-col :span="5">
              <a-select disabled placeholder="请选择" v-model="updateinfo.startaddress">
                <a-select-option v-for="(item,index) in arr" :value="item.label" :key="index">{{ item.label }}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="5">
              <a-select disabled placeholder="请选择" v-model="updateinfo.startaddress1">
                <a-select-option v-for="(item,index) in cityArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="5">
              <a-select placeholder="请选择" v-model="updateinfo.startaddress2" >
                <a-select-option v-for="(item,index) in countyArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="8">
              <a-input v-model="updateinfo.startaddress3" placeholder="请输入乡（镇）"/>
            </a-col>
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item
            label="启运类型:"
            :labelCol="{ lg: { span: 10 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
          >
            <a-select v-model="updateinfo.startaddress5" style="width: 140px" placeholder="请选择">
              <a-select-option value="养殖场"> 养殖场 </a-select-option>
              <a-select-option value="交易市场"> 交易市场 </a-select-option>
              <a-select-option value="散养户"> 散养户 </a-select-option>
              <a-select-option value="其他"> 其他 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!-- <a-col :span="5">
          <a-form-item
            :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input v-model="updateinfo.startaddress3" placeholder="请输入乡（镇）"></a-input
            ></a-form-item>
        </a-col> -->
        <a-col :span="8">
          <a-form-item
            :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
          >
            <a-input style="margin-left:-22px" v-model="updateinfo.startaddress4" placeholder="请输入养殖场名称"></a-input
            ></a-form-item>
        </a-col>
        <!-- <a-col :span="2">
          <a-form-item
            :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-button type="primary" @click="showQi">请选择</a-button
            ></a-form-item>
        </a-col> -->
        <a-col :span="24">
          <a-form-item
            label="到达地点:"
            :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 17 }, sm: { span: 17 } }"
          >

            <!-- <a-col :span="5">
              <a-select placeholder="请选择" v-model="updateinfo.rdddzxx" @change="getCity" >
                <a-select-option v-for="(item,index) in arr" :value="item.label" :key="index">{{ item.label }}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="5">
              <a-select placeholder="请选择" v-model="updateinfo.rdddzxx1" @change="getCounty" >
                <a-select-option v-for="(item,index) in cityArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="5">
              <a-select placeholder="请选择" v-model="updateinfo.rdddzxx2" >
                <a-select-option v-for="(item,index) in countyArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
            </a-col> -->
            <a-col>
              <Area
                :province.sync="updateinfo.rdddzxx"
                :city.sync="updateinfo.rdddzxx1"
                :area.sync="updateinfo.rdddzxx2"
              />
            </a-col>
            <a-col :span="8">
              <a-input v-model="updateinfo.rdddzxx3" placeholder="请输入乡（镇）"/>
            </a-col>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="到达类型:"
            :labelCol="{ lg: { span: 9 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 7 }, sm: { span: 8 } }"
          >
            <a-select v-model="updateinfo.rdddzxx5" style="width: 140px" placeholder="请选择">
              <a-select-option v-for="(item, index) in lei" :key="index" :value="item"> {{ item }} </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 7 }, sm: { span: 8 } }"
          >
            <a-input style="margin-left:-58px" v-model="updateinfo.rdddzxx4" placeholder="请输入养殖场名称"></a-input
            >
            <a-button
              type="primary"
              @click="showdao"
              style="position: absolute;margin: 3px 5px"
              v-show="this.updateinfo.myuse === '11111111'"
            >请选择</a-button
            >
          </a-form-item>
        </a-col>
        <a-col :span="18">
          <a-form-item
            label="运载工具牌号"
            :labelCol="{ lg: { span: 4 }, sm: { span: 3 } }"
          >
            <a-input style="width:280px" v-model="updateinfo.toolid"></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="24">
          <div class="qq">查验材料与疫情调查</div>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="是否经强制免疫并在有效期内"
            prop="resource"
            :labelCol="{ lg: { span: 12 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-radio-group v-model="updateinfo.qzmy">
              <a-radio value="是">是 </a-radio>
              <a-radio value="否"> 否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="养殖档案是否归档"
            prop="resource"
            :labelCol="{ lg: { span: 12 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-radio-group v-model="updateinfo.recordrule">
              <a-radio value="是">是 </a-radio>
              <a-radio value="否"> 否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="畜禽标识是否符合规定"
            prop="resource"
            :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-radio-group v-model="updateinfo.logorule">
              <a-radio value="符合">符合 </a-radio>
              <a-radio value="不符合"> 不符合</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="养殖场疫情（六个月内）"
            prop="resource"
            :labelCol="{ lg: { span: 12 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-radio-group v-model="updateinfo.outbreak">
              <a-radio value="有">有 </a-radio>
              <a-radio value="无"> 无</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="是否疫区	"
            prop="resource"
            :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-radio-group v-model="updateinfo.eridemicarea">
              <a-radio value="是">是 </a-radio>
              <a-radio value="否"> 否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="其他项目检查"
            :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input v-model="updateinfo.other"></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item
            label="临床检查	"
            prop="resource"
            :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 15 }, sm: { span: 12 } }"
          >
            <a-radio-group v-model="updateinfo.clinical">
              <a-radio value="合格">合格 </a-radio>
              <a-radio value="不合格"> 不合格</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item
            label="实验室检查	"
            prop="resource"
            :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 15 }, sm: { span: 12 } }"
          >
            <a-radio-group v-model="updateinfo.laboratory">
              <a-radio value="需要">需要 </a-radio>
              <a-radio value="不需要"> 不需要</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>

        <a-col :span="8">
          <a-form-model-item
            label="检测情况	"
            prop="resource"
            :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 15 }, sm: { span: 12 } }"
          >
            <a-radio-group v-model="updateinfo.situation">
              <a-radio value="合格">合格 </a-radio>
              <a-radio value="不合格"> 不合格</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item
            label="是否符合检疫规定	"
            prop="resource"
            :labelCol="{ lg: { span: 13 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }"
          >
            <a-radio-group v-model="updateinfo.quarantinerule">
              <a-radio value="是">是 </a-radio>
              <a-radio value="否"> 否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="16">
          <a-form-model-item
            label="出具《动物检疫合格证明》编号	"
            prop="resource"
            :labelCol="{ lg: { span: 9 }, sm: { span: 1 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-input v-model="updateinfo.code"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item
            label="检疫人员签字"
            prop="resource"
            :labelCol="{ lg: { span: 10 }, sm: { span: 1 } }"
            :wrapperCol="{ lg: { span: 13 }, sm: { span: 12 } }"
          >
            <a-input v-model="updateinfo.vetname"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            :labelCol="{ lg: { span: 1 }, sm: { span: 1 } }"
            :wrapperCol="{ lg: { span: 6 }, sm: { span: 12 } }"
          >
            <a-date-picker
              v-model="updateinfo.Gftime"
              show-time
              type="date"
              placeholder="请选择时间"
              style="width: 100%"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="8" >
          <a-form-model-item
            label="货主签字"
            prop="resource"
            :labelCol="{ lg: { span: 10 }, sm: { span: 1 } }"
            :wrapperCol="{ lg: { span: 13 }, sm: { span: 12 } }"
          >
            <a-input v-model="updateinfo.rhzqz"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" >
          <a-form-model-item
            :labelCol="{ lg: { span: 5 }, sm: { span: 1 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }"
          >
            <a-date-picker
              v-model="updateinfo.rhzdate"
              show-time
              type="date"
              placeholder="请选择时间"
              style="width: 100%"
            />
          </a-form-model-item></a-col>
      </a-row>
      <a-form-model-item :wrapper-col="{ span: 12, offset: 7 }">
        <a-button type="primary" @click="onSubmit" style="width:315px; height: 40px;">
          修改
        </a-button>
      </a-form-model-item>
    </a-form-model>

    <a-modal :footer="null" v-model="daoVisitd" width="1000px">
      <dao :shu="daoData" @child-event1="parentEvent1"></dao>
    </a-modal>
    <a-modal v-model="vv" :footer="null" width="1000px" :destroyOnClose="true">
      <clu :columns1="clo" :totalnum="tt" :shu="shu1" @child-event1="father" @tiao="tiao"> </clu>
    </a-modal>
  </div>
</template>

<script>
import formatTime from '@/utils/public.js'
import { placexiangx } from '@/assets/playdz'
import Area from '@/views/component/area/index'
import citys from '@/assets/citys'
import clu from '../../compont/clu3'
// eslint-disable-next-line camelcase
import { AH_AnimalOriginUpdate, OwnerGet } from '@/api/cdjy'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import dao from '../../compont/dao'
import httper from '@/utils/httper'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    updateinfo: {
      type: Object
    }
  },
  components: {
    dao,
    clu,
    Area
  },
  created () {
     this.arr = citys
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
          //  this.FeQD = item
          this.FeQD1 = item
          item.children.forEach((items, index) => {
            //  this.FeQS.push(items)
            this.FeQS1.push(items)
            items.children.forEach((itemOl, index) => {
              //    this.FeDjz.push(itemOl)
              this.FeDjz1.push(itemOl)
            })
          })
        })
        console.log(this.FeQD, this.FeQS, this.FeDJ)
      })
      .catch(rol => {
        console.log(rol)
      })
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
      shu1: [],
      tt: 0,
      vv: false,
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
      UserId: sessionStorage.getItem('FStId'),
      daoData: [],
      lei: ['养殖场', '交易市场', '散养户', '其他'],
      options: [],
      regInfo: [],
      regInfo1: [],
      // 行政存储
      FeQD: [],
      FeQS: [],
      FeDJ: [],
      FeDjz: [],
      xingzheng: false,
      // 区，动监站选择
      regionTF: false,

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

      peoTF1: false,
      peoInfo1: [],

      // 区名称
      regName1: '请选择',
      // 动监站名称
      peoName1: '请选择',
      form: {},
      addForm: {
        inspectiontime: '',
        quarantinetime: '',
        shippername: '',
        teltphone: '',
        idcardnum: '',
        farmsnme: '',
        quarantineaddress: '',

        animalsort: '',
        myuse: '',
        animalsources: '',

        domesticatedid: '',
        catchid: '',
        QDWDanWei: '', // 单位
        startaddress: '山东省',
        startaddress1: '青岛市',
        startaddress2: '',
        startaddress3: '',
        startaddress4: '',
        startaddress5: '',
        rqydzxx: '',
        rdddzxxs: '',
        rdddzxx: '山东省',
        rdddzxx1: '',
        rdddzxx2: '',
        rdddzxx3: '',
        rdddzxx4: '',
        rdddzxx5: '',

        quarantinerule: '',
        toolid: '', // 运载工具号

        //    是否强制免疫
        qzmy: '',
        recordrule: '',
        //    养殖档案是否归档

        logorule: '',
        //   畜禽标识是否符合规定
        outbreak: '',
        //   养殖场疫情
        eridemicarea: '',
        //    是否疫区
        other: '',
        //     其他
        clinical: '',
        //    临床检查
        laboratory: '',
        //    实验室检查
        situation: '',
        //    检测情况
        Gftime: '',
        vetname: '',
        rhzqz: '',
        code: ''
        //    动物检疫合格证明编号
      },
      daoVisitd: false
    }
  },
  mounted () {
    this.bb()
  },
  methods: {
  bb () {
    for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]
        if (this.updateinfo.rdddzxx === obj.label) {
          this.cityArr = obj.children
          obj.children.forEach((item, index) => {
             if (item.label === this.updateinfo.rdddzxx1) {
                 this.countyArr = item.children
             }
            })
        }
      }
  },
     getCity () {
      for (var i = 0; i < this.arr.length; i++) {
        var obj = this.arr[i]

        if (this.updateinfo.rdddzxx === obj.label) {
          this.cityArr = obj.children

         this.updateinfo.rdddzxx1 = obj.children[0].label
          this.updateinfo.rdddzxx2 = obj.children[0].children[0].label
        }
      }
    },
    getCounty () {
      for (var i = 0; i < this.cityArr.length; i++) {
        var obj = this.cityArr[i]
        if (this.updateinfo.rdddzxx1 === obj.label) {
           this.countyArr = obj.children
          // this.city = ''
          this.updateinfo.rdddzxx2 = obj.children[0].label
        }
      }
    },

    father (data) {
      // this.updateinfo.supervisename = data.FFarmName
      this.updateinfo.animalsort = data.FSxz
       const adree = data.FSdz
      const arr = placexiangx(adree)
      this.updateinfo.startaddress = arr[0]
      this.updateinfo.startaddress1 = arr[1]
      this.updateinfo.startaddress2 = arr[2]
      this.updateinfo.startaddress3 = arr[3].replace('/', '')
      this.updateinfo.startaddress4 = data.FSxxdz
      // this.addForm.startaddress5 = '养殖场'
        if (data.FSyzclx !== '散养户') {
        this.updateinfo.startaddress5 = '养殖场'
        } else {
        this.updateinfo.startaddress5 = '散养户'
        }
      this.updateinfo.shippername = data.FSfzr
      this.updateinfo.teltphone = data.FSlxdh
      console.log(data)
      this.vv = false
    },
    tiao (data) {
      console.log(data)
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
        console.log(val)
        console.log(this.peoInfo[val].label)
        this.peoName = this.peoInfo[val].label
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

        // console.log(this.addForm.QDWXsqDd)
      }
    },
    parentEvent1 (daodata) {
      console.log(daodata)
      this.peoTF1 = true
      this.daoVisitd = false
      // this.addForm.rdddzxx1 = daodata.QDWShiQy
      this.addForm.rdddzxx2 = daodata.Xian
      this.addForm.rdddzxx3 = daodata.Xiang

      this.addForm.rdddzxx4 = daodata.FhName
      //     const d = daodata.AddressName
      //     const arr = d.split(daodata.Xiang)
      // this.addForm.QDWXiangDd = arr[arr.length - 1]
      this.regInfo1.forEach((item, index, arr) => {
        console.log(item.label, index)
        if (item.label === this.addForm.rdddzxx2) {
          this.peoInfo1 = arr[index].children
          console.log(this.peoInfo1)
        }
      })
    },
    async showdao () {
      const res = await this.$axios.post(httper + `/GetAnimalType.ashx?FStId=1276&type=tzc&name=`)
      this.daoData = res.data.dataList
      console.log(this.daoData)
      this.daoVisitd = true
    },
    async onSubmit () {
      console.log(this.updateinfo)
      const d = this.updateinfo.inspectiontime
      const r = this.updateinfo.quarantinetime
      this.updateinfo.quarantinetime = formatTime(r, 'yyyy-MM-dd hh:mm:ss')

      this.updateinfo.inspectiontime = formatTime(d, 'yyyy-MM-dd hh:mm:ss')
      await AH_AnimalOriginUpdate(this.updateinfo, this.UserId)
        .then(res => {
          this.$message.success('修改成功')
          this.reload()
        })
        .catch(res => {
          this.$message.success('修改失败')
        })
      await this.$emit('gb')
    }
  }
}
</script>

<style>
.qq {
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 20px;
}</style>
