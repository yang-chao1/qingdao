<template>
  <div>
    <a-form-model :model="addForm" ref="addFormref" :rules="rules">
      <a-row>
        <a-col :span="12">
          <a-form-model-item

            label="记录单编号： "
            prop="recordNo"
            :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input disabled v-model="addForm.recordNo" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item
            label="动物卫生监督所（分所）名称"
            prop="supervisename"
            :labelCol="{ lg: { span: 12 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
          >
            <a-input :disabled="prohibited|| baodisabled" v-model="addForm.supervisename" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <div class="qq">基本情况：</div>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="报检时间"
            prop="inspectiontime"
            :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 11 }, sm: { span: 12 } }"
          >
            <a-date-picker
              :disabled="prohibited|| baodisabled"
              v-model="addForm.inspectiontime"
              show-time
              type="date"
              placeholder="请选择时间"
              style="width:75%"
            />
            <a-button :disabled="prohibited" @click="bao" type="primary" style="position: absolute;margin: 3px 5px"> 申报单</a-button>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="检疫时间"
            prop="quarantinetime"
            :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-date-picker
              :disabled="prohibited|| baodisabled"
              v-model="addForm.quarantinetime"
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
            label="货主姓名"
            prop="shippername"
            :labelCol="{ lg: { span: 8 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
          >
            <a-input :disabled="prohibited|| baodisabled" v-model="addForm.shippername" />
            <a-button :disabled="prohibited|| baodisabled" type="primary" @click="xz" style="position: absolute;margin: 3px 5px">选择</a-button>
          </a-form-model-item>
        </a-col>
        <!-- <a-col :span="1" :pull="0.5">
          <a-button type="primary" @click="xz">选择</a-button>
        </a-col> -->
        <a-col :span="7">
          <a-form-model-item
            label="联系电话"
            prop="teltphone"
            :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 14 }, sm: { span: 12 } }"
          >
            <a-input :disabled="prohibited|| baodisabled" v-model="addForm.teltphone" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item
            ref="name"
            label="身份证号码"
            prop="idcardnum"
            :labelCol="{ lg: { span: 8 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 14 } }"
          >
            <a-input :disabled="prohibited" v-model="addForm.idcardnum" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="9">
          <a-form-model-item
            label="动物种类:"
            prop="animalsort"
            :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
          >
            <a-select :disabled="prohibited|| baodisabled" v-model="addForm.animalsort" style="width: 160px" placeholder="请选择">
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
          </a-form-model-item>
        </a-col>
        <a-col :span="7">
          <a-form-model-item
            label="用途:"
            prop="myuse"
            :labelCol="{ lg: { span: 9 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
          >
            <a-select :disabled="prohibited|| baodisabled" v-model="addForm.myuse" style="width: 160px" placeholder="请选择">
              <a-select-option value="屠宰"> 屠宰 </a-select-option>
              <a-select-option value="乳用"> 乳用 </a-select-option>
              <a-select-option value="饲养"> 饲养 </a-select-option>
              <a-select-option value="种用"> 种用 </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item
            label="动物来源:"
            prop="animalsources"
            :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
          >
            <a-select :disabled="prohibited|| baodisabled" v-model="addForm.animalsources" style="width: 160px" placeholder="请选择">
              <a-select-option value="养殖场"> 养殖场 </a-select-option>
              <a-select-option value="交易市场"> 交易市场 </a-select-option>
              <a-select-option value="散养户"> 散养户 </a-select-option>
              <a-select-option value="其他"> 其他 </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>

        <a-col :span="13">
          <a-form-model-item
            prop="farmsnme"
            label="养殖场、村、 原驻地或捕获地名称:"
            :labelCol="{ lg: { span: 12 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
          >
            <a-input :disabled="prohibited|| baodisabled" v-model="addForm.farmsnme"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item
            label="检疫地点:"
            prop="quarantineaddress"
            :labelCol="{ lg: { span: 11 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 13 }, sm: { span: 8 } }"
          >
            <a-input :disabled="prohibited|| baodisabled" v-model="addForm.quarantineaddress"></a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
            label="野生动物驯养繁殖许可证号"
            :labelCol="{ lg: { span: 13 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
          >
            <a-input :disabled="prohibited" v-model="addForm.domesticatedid"></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="野生动物捕捉(猎捕)许可证号"
            :labelCol="{ lg: { span: 11 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 11 }, sm: { span: 9 } }"
          >
            <a-input :disabled="prohibited" v-model="addForm.catchid"></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="18">
          <a-form-model-item
            label="数量及单位:"
            prop="animalnum"
            :labelCol="{ lg: { span: 4 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
          >
            <a-input :disabled="prohibited|| baodisabled" v-model="addForm.animalnum" style="width: 80px; margin-right: 10px"></a-input>
            <a-select
              :disabled="prohibited || baodisabled"
              v-model="addForm.QDWDanWei"
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
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="启运地点:"
            prop="startaddress2"
            :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
          >
            <a-select disabled v-model="addForm.startaddress" style="width: 30%;">
              <a-select-option v-for="(item, index) in arr" :value="item.label" :key="index">{{
                item.label
              }}</a-select-option>
            </a-select>
            <a-select disabled v-model="addForm.startaddress1" style="width: 30%; margin-left: 2%">
              <a-select-option v-for="(item, index) in cityArrQy" :value="item.label" :key="index">{{
                item.label
              }}</a-select-option>
            </a-select>
            <a-select :disabled="prohibited|| baodisabled" v-model="addForm.startaddress2" style="width: 30%; margin-left: 2%">
              <a-select-option v-for="(item, index) in countyArrQy" :value="item.label" :key="index">{{
                item.label
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item
            prop="startaddress3"
            :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input :disabled="prohibited|| baodisabled" v-model="addForm.startaddress3" placeholder="请输入乡（镇）"/>
          </a-form-model-item>
        </a-col>

        <a-col :span="16" :push="1">
          <a-form-model-item
            label="启运类型:"
            prop="startaddress5"
            :labelCol="{ lg: { span: 3 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 4 }, sm: { span: 8 } }"
          >
            <a-select :disabled="prohibited|| baodisabled" v-model="addForm.startaddress5" placeholder="请选择">
              <a-select-option value="养殖场"> 养殖场 </a-select-option>
              <a-select-option value="交易市场"> 交易市场 </a-select-option>
              <a-select-option value="散养户"> 散养户 </a-select-option>
              <a-select-option value="其他"> 其他 </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- <a-col :span="8">
          <a-form-model-item
            prop="startaddress3"
            :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 20 }, sm: { span: 8 } }"
          >
            <a-input :disabled="prohibited" v-model="addForm.startaddress3" placeholder="请输入乡（镇）"></a-input
            ></a-form-model-item>
        </a-col> -->
        <a-col :span="6" :pull="9">
          <a-form-item
            :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 24 }, sm: { span: 18 } }"
          >
            <a-input :disabled="prohibited|| baodisabled" v-model="addForm.startaddress4" placeholder="请输入养殖场名称"></a-input
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
        <a-col :span="12">
          <a-form-model-item
            prop="rdddzxx2"
            label="到达地点:"
            :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
          >
            <a-select :disabled="prohibited|| baodisabled" placeholder="请选择" v-model="addForm.rdddzxx" @change="getCity" style="width: 30%;">
              <a-select-option v-for="(item, index) in arr" :value="item.label" :key="index">{{
                item.label
              }}</a-select-option>
            </a-select>
            <a-select :disabled="prohibited|| baodisabled" placeholder="请选择" v-model="addForm.rdddzxx1" @change="getCounty" style="width: 30%; margin-left: 2%">
              <a-select-option v-for="(item, index) in cityArr" :value="item.label" :key="index">{{
                item.label
              }}</a-select-option>
            </a-select>
            <a-select :disabled="prohibited|| baodisabled" placeholder="请选择" v-model="addForm.rdddzxx2" style="width: 30%; margin-left: 2%">
              <a-select-option v-for="(item, index) in countyArr" :value="item.label" :key="index">{{
                item.label
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item
            prop="rdddzxx3"
            :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input :disabled="prohibited|| baodisabled" v-model="addForm.rdddzxx3" placeholder="请输入乡（镇）"/>
          </a-form-model-item>
        </a-col>

        <a-col :span="16" :push="1">
          <a-form-model-item
            label="到达类型:"
            prop="rdddzxx5"
            :labelCol="{ lg: { span: 3 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 4 }, sm: { span: 8 } }"
          >
            <a-select :disabled="prohibited|| baodisabled" v-model="addForm.rdddzxx5" placeholder="请选择">
              <a-select-option v-for="(item, index) in lei" :key="index" :value="item"> {{ item }} </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- <a-col :span="8">
          <a-form-model-item
            prop="rdddzxx3"
            :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 20 }, sm: { span: 8 } }"
          >
            <a-input :disabled="prohibited" v-model="addForm.rdddzxx3" placeholder="请输入乡（镇）"></a-input
            ></a-form-model-item>
        </a-col> -->
        <a-col :span="6" :pull="9">
          <a-form-item
            :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 24 }, sm: { span: 8 } }"
          >
            <a-input :disabled="prohibited|| baodisabled" v-model="addForm.rdddzxx4" placeholder="请输入养殖场名称"></a-input
            ></a-form-item>
        </a-col>

        <a-col :span="2">
          <a-form-item
            :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-button
              type="primary"
              @click="showdao"
              v-show="this.addForm.myuse === '2222222'"
            >请选择</a-button
            ></a-form-item
          >
        </a-col>
        <a-col :span="24">
          <a-form-model-item
            label="运载工具牌号"
            prop="toolid"
            :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
          >
            <a-input :disabled="prohibited" v-model="addForm.toolid"></a-input
            ></a-form-model-item>
        </a-col>
        <a-col :span="24">
          <div class="qq">查验材料与疫情调查</div>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="是否经强制免疫并在有效期内"
            prop="resource"
            :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }"
          >
            <a-radio-group :disabled="prohibited" v-model="addForm.qzmy">
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
            <a-radio-group :disabled="prohibited" v-model="addForm.recordrule">
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
            <a-radio-group :disabled="prohibited" v-model="addForm.logorule">
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
            <a-radio-group :disabled="prohibited" v-model="addForm.outbreak">
              <a-radio value="有">有 </a-radio>
              <a-radio value="无"> 无</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="是否疫区	"
            prop="resource"
            :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-radio-group :disabled="prohibited" v-model="addForm.eridemicarea">
              <a-radio value="是">是 </a-radio>
              <a-radio value="否"> 否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="12" :push="2">
          <a-form-item
            label="其他项目检查"
            :labelCol="{ lg: { span: 8}, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input :disabled="prohibited" v-model="addForm.other"></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="临床检查	"
            prop="resource"
            :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 12 } }"
          >
            <a-radio-group :disabled="prohibited" v-model="addForm.clinical">
              <a-radio value="合格">合格 </a-radio>
              <a-radio value="不合格"> 不合格</a-radio>
            </a-radio-group>
          </a-form-model-item>
          <div style="float: left" v-if="this.kaiTF ">
            <a-button @click="showA" type="primary" v-if="myinfo.rdddzxx !== '山东省' && myinfo.clinical === '合格' && FrName=='官方兽医'">
              动物A
            </a-button>

            <a-button @click="showB" type="primary" v-if="myinfo.rdddzxx === '山东省' && myinfo.clinical === '合格'&& FrName=='官方兽医'">
              动物B
            </a-button>
          </div>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="实验室检查	"
            prop="resource"
            :labelCol="{ lg: { span: 12 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 12 } }"
          >
            <a-radio-group :disabled="prohibited" v-model="addForm.laboratory">
              <a-radio value="需要">需要 </a-radio>
              <a-radio value="不需要"> 不需要</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item
            label="检测情况	"
            prop="resource"
            :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 12 } }"
          >
            <a-radio-group :disabled="prohibited" v-model="addForm.situation">
              <a-radio value="合格">合格 </a-radio>
              <a-radio value="不合格"> 不合格</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="是否符合检疫规定	"
            prop="resource"
            :labelCol="{ lg: { span: 12 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-radio-group :disabled="prohibited" v-model="addForm.quarantinerule">
              <a-radio value="是">是 </a-radio>
              <a-radio value="否"> 否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item
            label="出具《动物检疫合格证明》编号	"
            prop="resource"
            :labelCol="{ lg: { span: 6 }, sm: { span: 1 } }"
            :wrapperCol="{ lg: { span: 11 }, sm: { span: 12 } }"
          >
            <a-input :disabled="prohibited" v-model="addForm.code"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="14" v-if="addForm.quarantinerule == '否'">
          <a-form-model-item
            label="一般处理	"
            prop="resource"
            :labelCol="{ lg: { span: 4 }, sm: { span: 1 } }"
            :wrapperCol="{ lg: { span: 20 }, sm: { span: 12 } }"
          >
            <a-checkbox-group :disabled="prohibited" v-model="treatment">
              <a-checkbox value="实验室检测"> 实验室检测 </a-checkbox>
              <a-checkbox value="隔离"> 隔离 </a-checkbox>
              <a-checkbox value="治疗"> 治疗 </a-checkbox>
              <a-checkbox value="其它"> 其它 </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" v-if="addForm.quarantinerule == '否'">
          <a-form-model-item
            label="数量"
            prop="resource"
            :labelCol="{ lg: { span: 10 }, sm: { span: 1 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-input :disabled="prohibited" v-model="addForm.harmlesnums"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="14" v-if="addForm.quarantinerule == '否'">
          <a-form-model-item
            label="无害化处理"
            prop="resource"
            :labelCol="{ lg: { span: 4 }, sm: { span: 1 } }"
            :wrapperCol="{ lg: { span: 20 }, sm: { span: 12 } }"
          >
            <a-checkbox-group :disabled="prohibited" v-model="treatment1">
              <a-checkbox value="焚烧"> 焚烧 </a-checkbox>
              <a-checkbox value="化制"> 化制 </a-checkbox>
              <a-checkbox value="掩埋"> 掩埋 </a-checkbox>
              <a-checkbox value="发酵"> 发酵 </a-checkbox>
              <a-checkbox value="其它"> 其它 </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" v-if="addForm.quarantinerule == '否'">
          <a-form-model-item
            label="数量	"
            prop="harmlesnum"
            :labelCol="{ lg: { span: 10 }, sm: { span: 1 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-input :disabled="prohibited" v-model="addForm.harmlesnum"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item
            label="检疫人员签字"
            prop="vetname"
            :labelCol="{ lg: { span: 10 }, sm: { span: 1 } }"
            :wrapperCol="{ lg: { span: 13 }, sm: { span: 12 } }"
          >
            <a-input :disabled="prohibited" v-model="addForm.vetname"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            prop="Gftime"
            :labelCol="{ lg: { span: 1 }, sm: { span: 1 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 12 } }"
          >
            <a-date-picker
              :disabled="prohibited"
              v-model="addForm.Gftime"
              show-time
              type="date"
              placeholder="请选择时间"
              style="width: 100%"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8" >
          <a-form-model-item
            label="货主签字"
            prop="rhzqz"
            :labelCol="{ lg: { span: 10 }, sm: { span: 1 } }"
            :wrapperCol="{ lg: { span: 13 }, sm: { span: 12 } }"
          >
            <a-input :disabled="prohibited" v-model="addForm.rhzqz"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" >
          <a-form-model-item
            prop="rhzdate"
            :labelCol="{ lg: { span: 5 }, sm: { span: 1 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }"
          >
            <a-date-picker
              :disabled="prohibited"
              v-model="addForm.rhzdate"
              show-time
              type="date"
              placeholder="请选择时间"
              style="width: 100%"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item :wrapper-col="{ span: 12, offset: 7}" v-if="!this.kaiTF">
        <a-button type="primary" @click="onSubmit" style="width:315px; height: 40px;"> 保存 </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-modal :footer="null" v-model="daoVisitd" width="1000px">
      <dao :shu="daoData" @child-event1="parentEvent1"></dao>
    </a-modal>
    <a-modal :footer="null" v-model="baoVisitd" width="1000px">
      <!-- <dwcdjy-bao @child-eventxx="xx" :shu="baoData" @child-eventbao="parentEventBao"></dwcdjy-bao> -->
      <clu2
        keyword="货主姓名"
        :columns1="columns1"
        :totalnum="dangTotal"
        :shu="baoData"
        @child-event1="parentEventBao"
        @tiao="dangtiao">
      </clu2>
    </a-modal>
    <a-modal v-model="vv" :footer="null" width="1000px" :destroyOnClose="true">
      <clu :columns1="clo" :totalnum="tt" :shu="shu1" @child-event1="father" @tiao="tiao"> </clu>
    </a-modal>
    <!-- 动物A跳转 -->
    <a-modal width="1000px" :destroyOnClose="true" title="动物产地检疫A" v-model="showvisibleA" :footer="null">
      <dwjy-binfot ref="dw" :myinfo="info" :showvisible="showvisibleA" :JLDLX="JLDLX"></dwjy-binfot>
    </a-modal>
    <!-- 动物B跳转 -->
    <a-modal width="1000px" :destroyOnClose="true" title="动物产地检疫B" v-model="showvisible" :footer="null">
      <dwjy-ainfot ref="dw" :myinfo="info" :showvisible="showvisible" :JLDLX="JLDLX"></dwjy-ainfot>
    </a-modal>
  </div>
</template>

<script>
import { getXiang } from '@/assets/getXiang'
// eslint-disable-next-line no-unused-vars
import qs from 'qs'
// eslint-disable-next-line no-unused-vars
import { placexiangx } from '@/assets/playdz'
import citys from '@/assets/citys'
import { OwnerGet, SbdList } from '@/api/cdjy'
// eslint-disable-next-line import/no-duplicates
import clu from '../../compont/clu3'
// eslint-disable-next-line import/no-duplicates
import clu2 from '../../compont/clu2'
import dwcdjyBao from './dwcdjyBao'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import dao from '../../compont/dao'
import httper from '@/utils/httper'
import formatTime from '@/utils/public.js'
// import Qs from 'qs'
import { getAnimalOriginList } from '@/api/cdjyEb/cdjyshbd'
import dwjyBinfot from '@/views/jyjg/dwjy/dwcdjyCompont/dwjyA'
import dwjyAinfot from '@/views/jyjg/dwjy/dwcdjyCompont/dwjy'
export default {
  components: {
    dao,
    dwcdjyBao,
    clu,
    clu2,
    dwjyBinfot,
    dwjyAinfot
  },
  created () {
    this.arr = citys
    this.getHao()
    this.getRecordNo()
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
      .catch((rol) => {
        console.log(rol)
      })
  },
  inject: ['reload'],
  data () {
    // 这里是自定义的规则
    // eslint-disable-next-line no-unused-vars
    var newpwdmin = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入车牌号'))
      } else {
        var reg = /^([京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][1-9DF][1-9ABCDEFGHJKLMNPQRSTUVWXYZ]\d{3}[1-9DF]|[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][\dABCDEFGHJKLNMxPQRSTUVWXYZ]{5})$/
        if (reg.test(value)) {
          // eslint-disable-next-line no-mixed-spaces-and-tabs

          callback()
        } else {
          return callback(new Error('请输入正确的车牌号'))
        }
      }
    }
      // eslint-disable-next-line no-unused-vars
      const newcard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入身份证号'))
      } else {
            const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
          if (reg.test(value)) {
          // eslint-disable-next-line no-mixed-spaces-and-tabs

          callback()
        } else {
          return callback(new Error('请输入正确的身份证号'))
        }
      }
    }
    return {
      baodisabled: false,
      rules: {
        recordNo: [{ required: true, message: '请输入', trigger: 'blur' }],
        supervisename: [{ required: true, message: '请输入', trigger: 'blur' }],
        inspectiontime: [{ required: true, message: '请输入', trigger: 'change' }],
        quarantinetime: [{ required: true, message: '请输入', trigger: 'change' }],
        shippername: [{ required: true, message: '请输入', trigger: 'blur' }],
        teltphone: [{ required: true, message: '请输入', trigger: 'blur' }],
        idcardnum: [{ required: true, message: '请输入', trigger: 'blur' }],
        farmsnme: [{ required: true, message: '请输入', trigger: 'change' }],
        quarantineaddress: [{ required: true, message: '请输入', trigger: 'blur' }],
        animalnum: [{ required: true, message: '请输入', trigger: 'blur' }],
        animalsort: [{ required: true, message: '请输入', trigger: 'change' }],
        myuse: [{ required: true, message: '请输入', trigger: 'change' }],
        animalsources: [{ required: true, message: '请输入', trigger: 'change' }],
        qualifiedNum: [{ required: true, message: '请输入', trigger: 'change' }],
        startaddress2: [{ required: true, message: '请输入', trigger: 'change' }],
        startaddress5: [{ required: true, message: '请输入', trigger: 'change' }],
        startaddress3: [{ required: true, message: '请输入', trigger: 'blur' }],
        rdddzxx2: [{ required: true, message: '请输入', trigger: 'change' }],
        rdddzxx5: [{ required: true, message: '请输入', trigger: 'change' }],
        rdddzxx3: [{ required: true, message: '请输入', trigger: 'blur' }],
        // QDWXiangDd: [{ required: true, message: '请输入', trigger: 'blur' }],
        vetname: [{ required: true, message: '请输入', trigger: 'blur' }],
       Gftime: [{ required: true, message: '请输入', trigger: 'change' }],
        rhzqz: [{ required: true, message: '请输入', trigger: 'blur' }],
       rhzdate: [{ required: true, message: '请输入', trigger: 'change' }],

       toolid: [{ required: true, validator: newpwdmin, trigger: 'blur' }]
      },
      treatment: [],
      treatment1: [],
      prohibited: false,
      FrName: JSON.parse(localStorage.getItem('AllInfo')).FrName,
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
      dangshu: [],
      dangTotal: 0,
      columns1: [
        {
          title: '编号',
          key: 'QDWNumber',
          width: 180,
          align: 'center',
          dataIndex: 'QDWNumber'
        },
        {
          title: '报检时间',
          key: 'DateQF',
          width: 180,
          align: 'center',
          dataIndex: 'DateQF',
           customRender: (t, r, index) => {
            return t ? formatTime(t, 'yyyy-MM-dd hh:mm:ss') : ''
          }
        },
        {
          title: '货主',
          key: 'QDWCargoOwner',
          width: 100,
          align: 'center',
          dataIndex: 'QDWCargoOwner'
        },

        {
          title: '电话',
          key: 'QDWPhone',
          width: 140,
          align: 'center',
          dataIndex: 'QDWPhone'
        },
        {
          title: '养殖场名称',
          key: 'yzcmc',
          width: 140,
          align: 'center',
          dataIndex: 'yzcmc'
        },
        {
          title: '动物种类',
          key: 'QDWXuZhongZ',
          width: 140,
          align: 'center',
          dataIndex: 'QDWXuZhongZ'
        },
        {
          title: '数量',
          key: 'QDWQuantity',
          align: 'center',
          dataIndex: 'QDWQuantity',
          width: 80
        },
        {
          title: '单位',
          key: 'QDWDanWei',
          align: 'center',
          dataIndex: 'QDWDanWei',
          width: 80
        },
        {
          title: '起运地',
          key: 'QDAddQy',
          align: 'center',
          dataIndex: 'QDAddQy',
          width: 320
        },
        {
          title: '到达地',
          key: 'QDWAddDd',
          align: 'center',
          dataIndex: 'QDWAddDd',
          width: 320
        },
        {
          title: '官方兽医',
          key: 'QDWAttn',
          align: 'center',
          dataIndex: 'QDWAttn',
          width: 140
        },
        {
          title: '操作',
          key: 'cz',
          fixed: 'right',
          align: 'center',
          width: 140,
          scopedSlots: { customRender: 'action' }
        }
      ],
      dang: [
        {
          title: '屠宰企业',
          key: 'FhName',
          width: 80,
          align: 'center',
          dataIndex: 'FhName'
        },
        {
          title: '法人代表',
          key: 'FhLegal',
          align: 'center',
          dataIndex: 'FhLegal',
          width: 80
        },
        {
          title: '联系电话',
          key: 'FhPhone',
          align: 'center',
          dataIndex: 'FhPhone',
          width: 80
        },
        {
          title: '地址',
          key: 'AddressName',
          align: 'center',
          dataIndex: 'AddressName',
          width: 320
        },
        {
          title: '操作',
          key: 'cz',
          fixed: 'right',
          align: 'center',
          width: 140,
          scopedSlots: { customRender: 'action' }
        }
      ],
      Detailed: '',
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
      baoData: [],
      daoData: [],
      baoVisitd: false,
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
        id: '0',
        recordNo: '',
        supervisename: JSON.parse(localStorage.getItem('AllInfo')).FuseEName,
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
        animalnum: '',
        domesticatedid: '',
        catchid: '',
        QDWDanWei: '', // 单位
        startaddress: '山东省',
        startaddress1: '',
        startaddress2: '',
        startaddress3: '',
        startaddress4: '',
        startaddress5: '',
        rqydzxx: '',
        rdddzxxs: '',
        rdddzxx: '',
        rdddzxx1: '',
        rdddzxx2: '',
        rdddzxx3: '',
        rdddzxx4: '',
        rdddzxx5: '',

        quarantinerule: '是',
        toolid: '', // 运载工具号

        //    是否强制免疫
        qzmy: '是',
        recordrule: '是',
        //    养殖档案是否归档

        logorule: '符合',
        //   畜禽标识是否符合规定
        outbreak: '无',
        //   养殖场疫情
        eridemicarea: '否',
        //    是否疫区
        other: '',
        //     其他
        clinical: '合格',
        //    临床检查
        laboratory: '不需要',
        //    实验室检查
        situation: '合格',
        //    检测情况
        Gftime: '',
        vetname: '',
        rhzqz: '',
        code: '',
        //    动物检疫合格证明编号
        dr: '',
        dr1: '',
        dr2: '',
        dr3: '',
        rhzdate: '',
        general: '', // 一般处理数量 int类型
        harmlesnum: 0, // 无害化处理对象数量
        harmless: '', // 无害化处理对象  多选框 以,分割的字符串
        harmlesnums: 0 // 一般处理对象数量
      },
      daoVisitd: false,
      limit: 10,
      offset: 1,
      total: 0,
      selectwhere: '',

      ABTF: false,
      showvisible: false,
      showvisibleA: false,
      info: {},
      JLDLX: 'AH_AnimalOrigin',
      myinfo: {},
      kaiTF: false
    }
  },
  mounted () {
    this.bb()
    this.qi()
    this.getCurrentDate()
  },
  methods: {
    relod () {
      if (this.kaiTF) {
        this.reload()
      }
    },
    showB () {
      console.log('执行了B')
      this.info = this.myinfo
      this.showvisible = true
      // console.log(this.info)
    },
    showA () {
      console.log('执行力')
      this.info = this.myinfo
      this.showvisibleA = true
      console.log(this.info)
    },
    getAll () {
      const p = {
        selectwhere: this.selectwhere,
        UserId: this.UserId,
        limit: this.limit,
        offset: this.offset
      }
      getAnimalOriginList(p)
        .then((res) => {
          console.log(res)
          const Clres = JSON.parse(res.Data)
          console.log(Clres)
          this.myinfo = Clres.rows[0]
          this.total = parseInt(Clres.total)
        })
        .catch((rol) => {
          console.log(rol)
        })
    },
    // eslint-disable-next-line no-irregular-whitespace
    getCurrentDate () {
      // eslint-disable-next-line no-irregular-whitespace
      var currentDate = formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss')
      // eslint-disable-next-line no-irregular-whitespace
      this.addForm.rhzdate = currentDate
      this.addForm.Gftime = currentDate
    },

    qi () {
      for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]
        this.addForm.startaddress = '山东省'

        if (this.addForm.startaddress === obj.label) {
          this.cityArrQy = obj.children
          this.addForm.startaddress1 = '青岛市'
          obj.children.forEach((item, index) => {
            if (item.label === this.addForm.startaddress1) {
              this.countyArrQy = item.children
            }
          })
        }
      }
    },
    bb () {
      for (var i = 0; i < this.arr.length; i++) {
        var obj = this.arr[i]
        this.addForm.rdddzxx = '北京市'

        if (this.addForm.rdddzxx === obj.label) {
          this.cityArr = obj.children

          this.addForm.rdddzxx1 = obj.children[0].label
          this.countyArr = obj.children[0].children
          this.addForm.rdddzxx2 = obj.children[0].children[0].label
        }
      }
    },
    getCity (val) {
      this.addForm.rdddzxx = val
      for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]

        if (val === obj.label) {
          this.cityArr = obj.children

          this.addForm.rdddzxx1 = obj.children[0].label
          this.cityArr.forEach((item, index) => {
            if (item.label === this.addForm.rdddzxx1) {
              this.countyArr = item.children
            }
          })
          this.addForm.rdddzxx2 = obj.children[0].children[0].label
        }
      }
    },
    getCounty (val) {
      for (var i = 0; i < this.cityArr.length; i++) {
        var obj = this.cityArr[i]
        if (val === obj.label) {
          this.countyArr = obj.children
          this.addForm.rdddzxx2 = obj.children[0].label
        }
      }
    },

    dangtiao (data) {
      console.log(data)
      SbdList(data, this.UserId).then((res) => {
        console.log(JSON.parse(res.Data))
        this.baoData = JSON.parse(res.Data).rows
        this.dangTotal = parseInt(JSON.parse(res.Data).total)
      })
    },
    async bao () {
      // const AllInfo = JSON.parse(localStorage.getItem('AllInfo'))
      SbdList({ offset: 1, limit: 10, selectWhere: '' }, this.UserId).then((res) => {
        console.log(JSON.parse(res.Data))
        this.baoData = JSON.parse(res.Data).rows
        this.dangTotal = parseInt(JSON.parse(res.Data).total)
        console.log(this.dangTotal)
        this.baoVisitd = true
      })
      // const res = await this.$axios.post(`http://www.miliotech.com:8886/QingdaoServerInterface/api/Quarantine/V_AH_AnimalOrigin_SbdList`)
      //    this.baoData = res.data.dataList
      //    console.log(res)
      this.baoVisitd = true
    },
    father (list) {
      console.log(list)
      this.addForm.animalsort = list.FSxz
      this.addForm.shippername = list.FSfzr
      this.addForm.rhzqz = list.FSfzr
      this.addForm.teltphone = list.FSlxdh
      this.addForm.idcardnum = list.FSsfzhm
      const adree = list.FSdz
      const arr = placexiangx(adree)
      this.addForm.startaddress = arr[0]
      this.addForm.startaddress1 = arr[1]
      this.addForm.startaddress2 = arr[2]
      this.addForm.startaddress3 = arr[3].replace('/', '')
      this.addForm.startaddress4 = list.FSxxdz
      // this.addForm.startaddress5 = '养殖场'
        if (list.FSyzclx !== '散养户') {
        this.addForm.startaddress5 = '养殖场'
        } else {
        this.addForm.startaddress5 = '散养户'
        }
      this.vv = false
    },
    tiao (data) {
      console.log(data)
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
    // 获取记录单编号
    async getRecordNo () {
      const AllInfo = JSON.parse(localStorage.getItem('AllInfo'))
      const res = await this.$axios.post(
        `${httper}/SetSBDBH.ashx?FSunitUstrId=${AllInfo.FSuserId}&lx=jl&FSunitId=${AllInfo.FSunitId}&FSunitName=${AllInfo.FSunitName}&uid=${AllInfo.FSunitUstrId}`
      )
      console.log(res.data.data.result)
      this.addForm.recordNo = res.data.data.result
    },

    async getHao () {
      const AllInfo = JSON.parse(localStorage.getItem('AllInfo'))
      this.addForm.vetname = AllInfo.FuName
      //    http://www.miliotech.com:8886/QDZSAPP/HtmlAshxQua/SetSBDBH.ashx?FSunitUstrId=010808&lx=sb&FSunitId=1919&FSunitName=田横动监站&uid=58471
      const res = await this.$axios.post(
        `${httper}/SetSBDBH.ashx?FSunitUstrId=${AllInfo.FSuserId}&lx=sb&FSunitId=${AllInfo.FSunitId}&FSunitName=${AllInfo.FSunitName}&uid=${AllInfo.FSunitUstrId}`
      )
      this.addForm.QDWNumber = res.data.data.result
      console.log(this.addForm)
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
          this.addForm.startaddress2 = this.regName

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
        this.addForm.startaddress3 = this.peoInfo[val].label
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
          this.addForm.rdddzxx2 = this.regInfo1[val].label
        }, 0)
      }
    },
    ChangePeo1 (val) {
      if (val === '请选择') {
        this.peoName1 = '请选择'
      } else {
        this.peoTF1 = true
        this.peoName1 = this.peoInfo1[val].label
        this.addForm.rdddzxx3 = this.peoInfo1[val].label
        // console.log(this.addForm.QDWXsqDd)
      }
    },
    async xx (s) {
      console.log(s)
      const AllInfo = JSON.parse(localStorage.getItem('AllInfo'))

      const res = await this.$axios.post(
        httper +
          `/GetInfos.ashx?Name=Qua_CDCL_AnimalOrigin
  &FStId=-1&txt=${s}&uid=${AllInfo.FSuserId}&FSunitUstrId=${AllInfo.FSunitUstrId}`
      )

      this.baoData = res.data.dataList
      console.log(this.baoData)
    },
    parentEventBao (bao) {
      this.baodisabled = true
      // this.addForm.farmsnme =
      console.log(bao.DateNpy)
      this.addForm.id = bao.FStId
      this.addForm.rhzqz = bao.QDWCargoOwner
      this.addForm.shippername = bao.QDWCargoOwner
      this.addForm.teltphone = bao.QDWPhone
      this.addForm.inspectiontime = bao.inspectiontime
      this.addForm.farmsnme = bao.yzcmc
      this.addForm.qualifiedNum = bao.QDWQuantity
      this.addForm.QDWDanWei = bao.QDWDanWei
      this.addForm.QDWNumber = bao.QDWQuantity
      this.addForm.ErBiaoHao = bao.QDWErBiaoHao
      this.addForm.myuse = bao.QDWYongTu // 用途
      this.addForm.animalsort = bao.QDWXuZhong // 类型
      this.addForm.quarantineaddress = bao.QDWAddress // 检疫地
      this.addForm.animalsources = bao.QDWLaiYuan // 来源
      this.addForm.inspectiontime = bao.DateQF
      this.addForm.quarantinetime = bao.DateNpy
      this.addForm.dr = bao.dr

      this.addForm.startaddress = bao.QDWShengQy
      this.addForm.startaddress1 = bao.QDWShiQy
      this.addForm.startaddress2 = bao.QDWXianQy
      this.addForm.startaddress5 = bao.QDWTypeQy
      this.addForm.startaddress3 = bao.QDWXiangQy
      this.addForm.startaddress4 = bao.QDWCunQy

      this.addForm.rdddzxx = bao.QDWShengDd
      this.addForm.rdddzxx1 = bao.QDWShiDd
      this.addForm.rdddzxx2 = bao.QDWXianDd
      // this.addForm.rdddzxx3 = bao.QDWXiangDd
      this.addForm.rdddzxx3 = getXiang(bao.QDWXiangDd)
      this.addForm.rdddzxx4 = bao.QDWCunDd
      this.addForm.rdddzxx5 = bao.QDWTypeDd
      this.addForm.animalnum = bao.QDWQuantity

      // this.addForm.dr = bao.dr

      // this.addForm.ErBiaoHao = bao.
      console.log(bao)
      this.baoVisitd = false
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
      this.baoVisitd = false
    },
    async showdao () {
      const res = await this.$axios.post(httper + `/GetAnimalType.ashx?FStId=1276&type=tzc&name=`)
      this.daoData = res.data.dataList
      console.log(this.daoData)
      this.daoVisitd = true
    },
    onSubmit () {
      this.$refs.addFormref.validate((valid) => {
        if (valid) {
          this.addForm.general = this.treatment.join(',')
          this.addForm.harmless = this.treatment1.join(',')
          const data = {
            type: 'AH_AnimalOrigin',
            json: JSON.stringify(this.addForm),
            uid: JSON.parse(localStorage.getItem('AllInfo')).FStId
          }
          console.log(
            'http://www.miliotech.com:8886/QDZSAPP/HtmlAshxQua/UplaodJYFiles.ashx?json=' +
              data.json +
              '&type=' +
              data.type +
              '&uid=' +
              data.uid
          )
          this.$axios({
            method: 'post',
            url: 'http://www.miliotech.com:8886/QDZSAPP/HtmlAshxQua/UplaodJYFiles.ashx',
            // ?json=' + data.json + '&type=' + data.type + '&uid=' + data.uid
            data: qs.stringify(data)
          }).then((res) => {
            console.log(res)
            if (!res.data.errorCode) {
              this.$notification.success({
                message: '新增成功',
                 duration: 1

              })
              this.kaiTF = true
              this.prohibited = true
              this.getAll()
            }
            // this.reload()
          })
        } else {
              this.$notification.error({
              message: '请检查输入信息'
            })

          return false
        }
      })
    }
  }
}
</script>

<style scoped>

.qq {
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 20px;
}
</style>
