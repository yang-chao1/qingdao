<template>
  <div>
    <page-header-wrapper> </page-header-wrapper>
    <a-card class="card">
      <a-input size="large" placeholder="请输入货主姓名" v-model="selectwhere" class="ainput" />
      <a-button class="abutton" type="primary" @click="cx">查询</a-button>

      <a-button class="abutton" type="primary" @click="handleEdit()">导出</a-button>
      <a-button v-permission="{active:'OQDeclarationformeadd'}" class="abutton" type="primary" icon="plus" @click="addModal">新增</a-button>
      <a-button v-permission="{active:'OQDeclarationformedele'}" class="abutton" type="primary" @click="DeleteAll()">批量删除</a-button>
      <a-row>
        <a-col :span="12" :offset="12">
          <a-tree-select
            style="width: 25%; float:right;"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="所在地"
            :tree-data="options"
            @change="selectWhereAdree"
          >
          </a-tree-select>
        </a-col>
      </a-row>
      <a-table
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :pagination="false"
        :scroll="{ x: 2000 }"
        :columns="columns1"
        :data-source="data1"
        style="margin-top: 5px"
      >
        <template slot="action" slot-scope="text, record">
          <a v-permission="{active:'OQDeclarationformesele'}" slot="action" @click="showModal(record.FStId)">查看&nbsp;&nbsp;</a>
          <a v-permission="{active:'OQDeclarationformeupd'}" slot="action" @click="updateModal(record.FStId)">修改&nbsp;&nbsp;</a>
          <!-- <a slot="action" @click="deleteinfo(record.FStId)">删除&nbsp;&nbsp;</a> -->
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
          style="float: right; font-size: 15px; margin-top: -2%; margin-right: 5%"
        >当前第 {{ this.offset }}/{{ Math.ceil(this.total / this.limit) }} 页 共 {{ this.total }} 条记录 每页
          {{ this.limit }} 条</span
        >
      </div>
    </a-card>
    <!-- 增加表单-->
    <a-modal @cancel="cancel" title="增加申报单" :footer="null" v-model="visible" width="1000px">
      <a-form-model :model="addForm" ref="addForm" :rules="rules">
        <a-row>
          <a-col :span="14">
            <a-form-model-item
              porp="QDWNumber"
              label="申报单编号："
              :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-input disabled v-model="addForm.QDWNumber" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item
              label="申报类型"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-radio-group v-model="addForm.FqSbType">
                <a-radio value="动物">动物 </a-radio>
                <a-radio value="繁殖材料"> 繁殖材料</a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item
              label="报检时间"
              prop="DateQF"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-date-picker
                v-model="addForm.DateQF"
                show-time

                type="date"
                placeholder="请选择时间"
                style="width: 100%"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item
              label="申报人名称"
              prop="QDWCargoOwner"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-input v-model="addForm.QDWCargoOwner" />
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item
              label="联系电话"
              prop="QDWPhone"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-input v-model="addForm.QDWPhone" />
            </a-form-model-item>
          </a-col>
          <a-col :span="14">
            <a-form-model-item
              prop="QDWXianQy"
              label="启运地点:"
              :labelCol="{ lg: { span: 6}, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
            >
              <a-select disabled v-model="addForm.QDWShengQy" style="width: 30%; margin-left: 2%">
                <a-select-option v-for="(item, index) in arr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>

              <a-select disabled v-model="addForm.QDWShiQy" style="width: 30%; margin-left: 2%">
                <a-select-option v-for="(item, index) in cityArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <a-select v-model="addForm.QDWXianQy" style="width: 30%; margin-left: 2%">
                <a-select-option v-for="(item, index) in countyArrQy" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item>
              <a-input v-model="addForm.QDWXiangQy" placeholder="请输入乡（镇）" style="width: 80%; " />
              <a-button type="primary" @click="showQi" style="position: absolute;margin: 3px 5px">请选择</a-button>
            </a-form-model-item>
          </a-col>
          <a-col :span="7">
            <a-form-model-item
              label="启运类型:"
              prop="QDWTypeQy"
              :labelCol="{ lg: { span: 12 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-select v-model="addForm.QDWTypeQy" placeholder="请选择">
                <a-select-option value="养殖场"> 养殖场 </a-select-option>
                <a-select-option value="交易市场"> 交易市场 </a-select-option>
                <a-select-option value="散养户"> 散养户 </a-select-option>
                <a-select-option value="其他"> 其他 </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <!-- <a-col :span="8">
            <a-form-model-item
              prop="QDWXiangQy"
              :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input v-model="addForm.QDWXiangQy" placeholder="请输入乡（镇）"></a-input
              ></a-form-model-item>
          </a-col> -->
          <a-col :span="12">
            <a-form-model-item
              prop="QDWCunQy"
              :labelCol="{ lg: { span: 4}, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-input v-model="addForm.QDWCunQy" placeholder="请输入养殖场名称"></a-input
              ></a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item
              label="动物种类:"
              prop="FqProduct"
              :labelCol="{ lg: { span: 7 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            >
              <a-select v-model="addForm.FqProduct" style="width: 160px" placeholder="请选择">
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
          <a-col :span="12">
            <a-form-model-item
              label="数量及单位:"
              prop="QDWQuantity"
              :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            >
              <a-input v-model="addForm.QDWQuantity" style="width:100px;"></a-input>
              <a-select
                v-model="addForm.QDWDanWei"
                style="position: absolute; top: 50%; transform: translateY(-50%); width: 80px"
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
              label="用途:"
              prop="QDWYongTu"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 8 }, sm: { span: 6 } }"
            >
              <a-select @change="chan" placeholder="请选择" v-model="addForm.QDWYongTu">
                <a-select-option value="屠宰"> 屠宰 </a-select-option>
                <a-select-option value="乳用"> 乳用 </a-select-option>
                <a-select-option value="饲养"> 饲养 </a-select-option>
                <a-select-option value="种用"> 种用 </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item
              label="来源:"
              prop="QDWLaiYuan"
              :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 9 }, sm: { span: 6 } }"
            >
              <a-select v-model="addForm.QDWLaiYuan" placeholder="请选择">
                <a-select-option value="家畜家禽"> 家畜家禽 </a-select-option>
                <a-select-option value="人工饲养"> 人工饲养 </a-select-option>
                <a-select-option value="合法捕获"> 合法捕获 </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>

          <a-col :span="23" :pull="1">
            <a-form-model-item
              label="有效《跨省引进乳用种用动物检疫审批表》"
              prop="yx"
              :labelCol="{ lg: { span: 9 }, sm: { span: 6 } }"
              :wrapperCol="{ lg: { span: 5 }, sm: { span: 5 } }"
            >
              <a-radio-group v-model="addForm.yx">
                <a-radio value="有">有 </a-radio>
                <a-radio value="无"> 无</a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>

          <a-col :span="14">
            <a-form-item
              label="到达地点:"
              prop="QDWXianDd"
              :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
            >
              <a-select placeholder="请选择" v-model="addForm.QDWShengDd" @change="getCity" style="width: 30%;">
                <a-select-option v-for="(item, index) in arr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <a-select
                placeholder="请选择"
                v-model="addForm.QDWShiDd"
                @change="getCounty"
                style="width: 30%; margin-left: 2%"
              >
                <a-select-option v-for="(item, index) in cityArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <a-select placeholder="请选择" v-model="addForm.QDWXianDd" style="width: 30%; margin-left: 2%">
                <a-select-option v-for="(item, index) in countyArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <!-- <a-col :span="8">
                <a-input placeholder="请输入乡（镇）" v-model="addForm.QDWXiangDd"></a-input
                >
              </a-col>
              <a-button
                type="primary"
                @click="showdao"
                v-show="this.addForm.QDWYongTu === '屠宰'"
                style="position: absolute;margin: 3px 5px"
              >请选择</a-button
              > -->
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item>
              <a-input placeholder="请输入乡（镇）" v-model="addForm.QDWXiangDd" style="width:80%;" />
              <a-button
                type="primary"
                @click="showdao"
                style="position: absolute;margin: 3px 5px"
                v-show="this.addForm.QDWYongTu === '屠宰'"
              >请选择</a-button
              >
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item
              label="到达类型:"
              prop="QDWTypeDd"
              :labelCol="{ lg: { span: 12 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 9 }, sm: { span: 8 } }"
            >
              <a-select v-model="addForm.QDWTypeDd" style="width: 160px" placeholder="请选择">
                <a-select-option v-for="(item, index) in lei" :key="index" :value="item"> {{ item }} </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="8">
            <a-form-item
              prop="QDWXiangDd"
              :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input placeholder="请输入乡（镇）" v-model="addForm.QDWXiangDd"></a-input
              ></a-form-item>
          </a-col> -->
          <a-col :span="8">
            <a-form-item
              prop="QDWCunDd"
              :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input placeholder="请输入养殖场名称" v-model="addForm.QDWCunDd"></a-input
              ></a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item
              label="启运时间"
              prop="DateQy"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-date-picker
                v-model="addForm.DateQy"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                type="date"
                placeholder="请选择时间"
                style="width: 100%"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="17" v-if="addForm.FqProduct==='牛'||addForm.FqProduct==='猪'||addForm.FqProduct==='羊'">
            <a-form-model-item
              label="牲畜耳标号"
              prop="QDWErBiaoHao"
              :labelCol="{ lg: { span: 5 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 12 } }"
            >
              <a-textarea style="height:200px" v-model="addForm.QDWErBiaoHao" />
              <a-button @click="er" style="position: absolute;margin-left:2%;"> 选择 </a-button>
            </a-form-model-item>
          </a-col>
          <!-- <a-col :span="2">
            <a-button @click="er"> 选择 </a-button>
          </a-col> -->

          <p class="test">
            申报人依照《中华人民共和国动物防疫法》、《动物检疫管理办法》有关规定，特申报检疫。并对所填信息的真实性、完整性负责，如与事实不符，官方兽医有权终止检疫，由此导致的后果由申报人自行负责。
          </p>
          <a-col :span="20">
            <a-form-model-item
              label="申报人签字（盖章）："
              prop="FSm5"
              :labelCol="{ lg: { span: 5 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-input style="width: 200px" v-model="addForm.FSm5" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item :wrapper-col="{ span: 12, offset: 7 }">
          <!-- <a-button type="primary" @click="onSubmit"> 新增 </a-button> -->
          <a-button :disabled="butDisabled" type="primary" @click="onSubmit" style="width:315px; height: 40px;">
            保存
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 修改表单   -->

    <a-modal title="修改申报单" v-model="updatevisible" :footer="null" width="1100px">
      <a-form-model ref="updateForm" :form="updateForms">
        <a-row>
          <a-col :span="14">
            <a-form-model-item
              label="申报单编号："
              :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-input v-model="updateForms.QDWNumber" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item
              label="申报类型"
              prop="FqSbType"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-radio-group v-model="updateForms.FqSbType">
                <a-radio value="动物">动物 </a-radio>
                <a-radio value="繁殖材料"> 繁殖材料</a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item
              label="报检时间"
              prop="resource"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-date-picker
                v-model="updateForms.DateQF"
                show-time

                type="date"
                placeholder="请选择时间"
                style="width: 100%"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item
              label="申报人名称"
              prop="name"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-input v-model="updateForms.QDWCargoOwner" />
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item
              label="联系电话"
              prop="phone"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-input v-model="updateForms.QDWPhone" />
            </a-form-model-item>
          </a-col>
          <a-col :span="14">
            <a-form-item
              label="启运地点:"
              :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
            >
              <!-- <a-select style="width: 120px; margin-right: 10px" @change="ChangeTown" default-value="青岛市">
                <a-select-option value="青岛市"> 青岛市 </a-select-option>
              </a-select>
              <a-select
                v-model="updateForms.QDWXianQy"
                style="width: 120px; margin-right: 10px"
                @change="ChangeRegion"
                default-value="请选择"
              >
                <a-select-option value="请选择"> 请选择 </a-select-option>
                <a-select-option v-for="(item, index) in regInfo" :key="index">
                  {{ item.label }}
                </a-select-option>
              </a-select>
              <a-select
                style="width: 120px"
                v-model="updateForms.QDWXiangQy"
                @change="ChangePeo"
                default-value="请选择"
              >
                <a-select-option value="请选择"> 请选择 </a-select-option>
                <a-select-option v-for="(item, index) in peoInfo" :key="index">
                  {{ item.label }}
                </a-select-option>
              </a-select> -->
              <a-select disabled placeholder="请选择" v-model="updateForms.QDWShengQy" style="width: 30%;">
                <a-select-option v-for="(item, index) in arr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>

              <a-select disabled placeholder="请选择" v-model="updateForms.QDWShiQy" style="width: 30%;margin-left: 2%">
                <a-select-option v-for="(item, index) in cityArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <a-select placeholder="请选择" v-model="updateForms.QDWXianQy" style="width: 30%;margin-left: 2%">
                <a-select-option v-for="(item, index) in cityXiuArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item>
              <a-input v-model="updateForms.QDWXiangQy" placeholder="请输入乡（镇）" style="width: 80%" />
              <a-button type="primary" @click="showQi" style="position: absolute;margin: 3px 5px">请选择</a-button>
            </a-form-model-item>
          </a-col>
          <a-col :span="7">
            <a-form-model-item
              label="启运类型:"
              :labelCol="{ lg: { span: 12 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-select v-model="updateForms.QDWTypeQy" placeholder="请选择">
                <a-select-option value="养殖场"> 养殖场 </a-select-option>
                <a-select-option value="交易市场"> 交易市场 </a-select-option>
                <a-select-option value="散养户"> 散养户 </a-select-option>
                <a-select-option value="其他"> 其他 </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <!-- <a-col :span="8">
            <a-form-item
              :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input v-model="updateForms.QDWXiangQy" placeholder="请输入乡（镇）"></a-input
              ></a-form-item>
          </a-col> -->

          <a-col :span="8">
            <a-form-item
              :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input v-model="updateForms.QDWCunQy" placeholder="请输入养殖场名称"></a-input
              ></a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="动物种类:"
              :labelCol="{ lg: { span: 7 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            >
              <a-select v-model="updateForms.FqProduct" placeholder="请选择">
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
              :labelCol="{ lg: { span: 7 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            >
              <a-input v-model="updateForms.QDWQuantity" style="width:100px;"></a-input>
              <a-select
                v-model="updateForms.QDWDanWei"
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
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 8 }, sm: { span: 6 } }"
            >
              <a-select @change="chan" placeholder="请选择" v-model="updateForms.QDWYongTu">
                <a-select-option value="屠宰"> 屠宰 </a-select-option>
                <a-select-option value="乳用"> 乳用 </a-select-option>
                <a-select-option value="饲养"> 饲养 </a-select-option>
                <a-select-option value="种用"> 种用 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="来源:"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 9 }, sm: { span: 6 } }"
            >
              <a-select v-model="updateForms.QDWLaiYuan" placeholder="请选择">
                <a-select-option value="家畜家禽"> 家畜家禽 </a-select-option>
                <a-select-option value="人工饲养"> 人工饲养 </a-select-option>
                <a-select-option value="合法捕获"> 合法捕获 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="23">
            <a-form-model-item
              label="有效《跨省引进乳用种用动物检疫审批表"
              prop="resource"
              :labelCol="{ lg: { span: 8 }, sm: { span: 6 } }"
              :wrapperCol="{ lg: { span: 8 }, sm: { span: 5 } }"
            >
              <a-radio-group v-model="updateForms.yx">
                <a-radio value="有">有 </a-radio>
                <a-radio value="无"> 无</a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>

          <a-col :span="14">
            <a-form-item
              label="到达地点:"
              :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
            >
              <!-- <a-select style="width: 120px; margin-right: 10px" @change="ChangeTown" default-value="青岛市">
                <a-select-option value="青岛市"> 青岛市 </a-select-option>
              </a-select>
              <a-select
                style="width: 120px; margin-right: 10px"
                v-model="updateForms.QDWXianDd"
                @change="ChangeRegion1"
                default-value="请选择"
              >
                <a-select-option value="请选择"> 请选择 </a-select-option>
                <a-select-option v-for="(item, index) in regInfo1" :key="index">
                  {{ item.label }}
                </a-select-option>
              </a-select>
              <a-select
                style="width: 120px"
                v-model="updateForms.QDWXiangDd"
                @change="ChangePeo1"
                default-value="请选择"
              >
                <a-select-option value="请选择"> 请选择 </a-select-option>
                <a-select-option v-for="(item, index) in peoInfo1" :key="index">
                  {{ item.label }}
                </a-select-option>
              </a-select> -->
              <a-select v-model="updateForms.QDWShengDd" style="width:30%" @change="getCity1">
                <a-select-option v-for="(item, index) in arr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <a-select v-model="updateForms.QDWShiDd" style="width:30%;margin-left:2%;" @change="getCounty1">
                <a-select-option v-for="(item, index) in cityArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <a-select v-model="updateForms.QDWXianDd" style="width:30%;margin-left:2%;">
                <a-select-option v-for="(item, index) in countyArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <!-- <a-input placeholder="请输入乡（镇）" v-model="updateForms.QDWXiangDd"/>
              <a-button
                type="primary"
                @click="showdao"
                v-show="this.updateForms.QDWYongTu === '屠宰'"
                style="position: absolute;margin: 3px 5px"
              >请选择</a-button
              > -->
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item
              :labelCol="{ lg: { span: 1 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input placeholder="请输入乡（镇）" v-model="updateForms.QDWXiangDd"></a-input>
              <a-button
                type="primary"
                @click="showdao"
                v-show="this.updateForms.QDWYongTu === '屠宰'"
                style="position: absolute;margin: 3px 5px"
              >请选择</a-button
              >
            </a-form-item>
          </a-col>
          <!-- <a-col :span="1" :pull="7">
            <a-form-item>
              <a-button
                type="primary"
                @click="showdao"
                v-show="this.updateForms.QDWYongTu === '屠宰'"
              >请选择</a-button
              ></a-form-item
            >
          </a-col> -->
          <a-col :span="7">
            <a-form-item
              label="到达类型:"
              :labelCol="{ lg: { span: 12 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-select v-model="updateForms.QDWTypeDd" placeholder="请选择">
                <a-select-option v-for="(item, index) in lei" :key="index" :value="item"> {{ item }} </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="8">
            <a-form-item
              :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input placeholder="请输入乡（镇）" v-model="updateForms.QDWXiangDd"></a-input
              ></a-form-item>
          </a-col> -->
          <a-col :span="8">
            <a-form-item
              :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input placeholder="请输入养殖场名称" v-model="updateForms.QDWCunDd"></a-input
              ></a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item
              label="启运时间"
              prop="resource"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-date-picker
                v-model="updateForms.DateQy"
                show-time
                format="YYYY-MM-DD HH时"
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="17" v-if="updateForms.FqProduct==='牛'||updateForms.FqProduct==='猪'||updateForms.FqProduct==='羊'">
            <a-form-model-item
              label="牲畜耳标号"
              prop="name"
              :labelCol="{ lg: { span: 5 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 12 } }"
            >
              <a-textarea style="height:200px" v-model="updateForms.QDWErBiaoHao" />
              <a-button @click="er1" style="position: absolute;margin-left:2%;"> 选择 </a-button>
            </a-form-model-item>
          </a-col>
          <!-- <a-col :span="4">
            <a-button @click="er1"> 选择 </a-button>
          </a-col> -->
        </a-row>
        <p class="test">
          申报人依照《中华人民共和国动物防疫法》、《动物检疫管理办法》有关规定，特申报检疫。并对所填信息的真实性、完整性负责，如与事实不符，官方兽医有权终止检疫，由此导致的后果由申报人自行负责。
        </p>

        <a-form-model-item
          style="margin-left: -120px"
          label="申报人签字（盖章）："
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
        >
          <span v-if="tt > 12">
            <viewer :images="FhpwxkzP" style="width: 150px" v-if="FhpwxkzP.length !== 0">
              <img v-for="(item, index) in FhpwxkzP" :src="item.src" :key="index" style="width: 100px; height: 100px" />
            </viewer>
          </span>
          <span v-else>
            <a-input style="width: 200px" v-model="updateForms.FSm5" />
          </span>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 12, offset: 7 }">
          <!-- <a-button type="primary" @click="updateSubmit"> 修改 </a-button> -->
          <a-button type="primary" @click="updateSubmit" style="width:315px; height: 40px;">
            保存
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 显示表单-->
    <a-modal width="900px" :footer="null" title="详情" v-model="showvisible">
      <div id="printNew" >

        <div class="maintop">动物产地检疫申报单</div>
        <a-descriptions :column="2" bordered>
          <a-descriptions-item label="申报类型" :span="1"> {{ this.forms.FqSbType }} </a-descriptions-item>
          <a-descriptions-item label="报检时间" :span="1"> {{ this.forms.DateQF | mydate }} </a-descriptions-item>
          <a-descriptions-item label="申报人名称" :span="1"> {{ this.forms.QDWCargoOwner }} </a-descriptions-item>
          <a-descriptions-item label="联系电话" :span="1">{{ this.forms.QDWPhone }} </a-descriptions-item>
          <a-descriptions-item label="启运地点" :span="2">
            {{ this.forms.QDWShengQy }}{{ this.forms.QDWShiQy }}{{ this.forms.QDWXianQy }}{{ this.forms.QDWXiangQy }}{{ this.forms.QDWCunQy }}
          </a-descriptions-item>
          <a-descriptions-item label="动物种类" :span="1"> {{ this.forms.FqProduct }} </a-descriptions-item>
          <a-descriptions-item
            label="数量及单位"
            :span="1"
          >{{ this.forms.QDWQuantity }}{{ this.forms.QDWDanWei }}
          </a-descriptions-item>
          <a-descriptions-item label="用途" :span="1"> {{ this.forms.QDWYongTu }}</a-descriptions-item>
          <a-descriptions-item label="来源" :span="1"> {{ this.forms.QDWLaiYuan }} </a-descriptions-item>
          <a-descriptions-item label="有效《跨省引进乳用种用动物检疫审批表》" :span="2">
            <span>{{ this.forms.yx }}</span>
            <viewer :images="FSm4" style="width: 150px;" v-if="FSm4.length !== 0">
              <img
                v-for="(item, index) in FSm4"
                :src="item.src"
                :key="index"
                style="width:100px; height:100px;margin-left:20px;"
              />
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="到达地点" :span="1">
            {{ this.forms.QDWShengDd }}{{ this.forms.QDWShiDd }}{{ this.forms.QDWXianDd }} {{ this.forms.QDWXiangDd }}

          </a-descriptions-item>
          <a-descriptions-item label="启运时间" :span="1"> {{ this.forms.DateQy | mydate }} </a-descriptions-item>
          <a-descriptions-item label="牲畜耳标号" :span="2"><div style="display:inline-block;width:580px"> {{ this.forms.QDWErBiaoHao }}</div></a-descriptions-item>
        </a-descriptions>
        <p class="foot">
          申报人依照《中华人民共和国动物防疫法》、《动物检疫管理办法》有关规定，特申报检疫。并对所填信息的真实性、完整性负责，如与事实不符，官方兽医有权终止检疫，由此导致的后果由申报人自行负责。
        </p>
        <div>
          申报人签字（盖章）：
          <viewer :images="FhpwxkzP" style="width: 150px" v-if="FhpwxkzP.length !== 0">
            <img
              v-for="(item, index) in FhpwxkzP"
              :src="item.src"
              :key="index"
              style="position: absolute;width: 100px; height: 100px"
            />
          </viewer>
          <span v-if="FhpwxkzP.length === 0">{{ this.forms.FSm5 }}</span>
        </div>

        <a-row type="flex" justify="end">
          <span>填表人：{{ this.forms.FSuserName }} 填表时间：{{ this.forms.FSuTime | dateYmd }} </span>
        </a-row>
      </div>
      <!-- <div class="zb">填表人：{{ this.forms.FSuserName }} 填表时间：{{ this.forms.FSuTime | dateYmd }}</div> -->
      <a-button type="primary" v-print="'#printNew'" class="dayi">打印</a-button>
    </a-modal>
    <!-- 删除弹窗 -->
    <a-modal
      cancelText="取消"
      okText="确认"
      title="删除"
      :visible="deletinfo"
      :confirm-loading="confirmLoading"
      @ok="handleOk1"
      @cancel="handleCancel"
      width="400px"
    >
      是否确认删除
    </a-modal>
    <a-modal @cancel="cancel" :footer="null" :zIndex="1111" v-model="qiVisitd" width="900px">
      <clu :columns1="clo" :totalnum="yzhNum" :shu="shu1" @child-event1="father" @tiao="tiao"> </clu>
    </a-modal>
    <a-modal @cancel="cancel" :footer="null" :zIndex="1111" v-model="daoVisitd" width="900px">
      <!-- <dao :shu="daoData" @child-event1="parentEvent1"></dao> -->
      <clu
        keyword="请输入法人代表"
        :columns1="slaughterCol"
        :totalnum="totalSBD"
        :shu="SBDInfo"
        @child-event1="father1"
        @tiao="tiao1"
      >
      </clu>
    </a-modal>
    <a-modal @cancel="cancel" v-model="erVisited" :footer="null" width="800px">
      <er :man="man" :num="erNum" @hander-fa="ff"></er>
    </a-modal>
    <!-- <a-modal :footer="null" v-model="qiVisitd" width="900px">
      <yzc :shu="QiData" @child-event="parentEvent"></yzc>
    </a-modal> -->
  </div>
</template>

<script>

import { getAddreeCondition } from '@/assets/getAddree'
import { getXiang, getadree } from '@/assets/getXiang'
import qs from 'qs'
import { getSlaughterBkGet } from '@/api/tzjyEb/tzsbd'
import { eartag, leixin } from '@/assets/eartag'
import { placexiangx } from '@/assets/playdz'
import citys from '@/assets/citys'
import er from '../jyjg/compont/er'
import yzc from './compont/yzc.vue'
import dao from './compont/dao.vue'
import httper from '@/utils/httper'
import clu from '../jyjg/compont/clu2'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import { getCdAll, cdjyInfo, cdjyInfoUpdate, OwnerGet } from '@/api/cdjy'
import http from '@/utils/httpapi'
// eslint-disable-next-line no-irregular-whitespace
import formatTime from '@/utils/public.js'
var yenum = 1

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
        return parseInt(index) + parseInt(yenum - 1) * 10 + 1
      }
    }
  },
  {
    title: '申报类型',
    key: 'FqSbType',
    width: 120,
    align: 'center',
    dataIndex: 'FqSbType'
  },
  { title: '状态', key: 'IsPrant', width: 120, align: 'center', dataIndex: 'IsPrant' },
  { title: '申报受理结果', key: 'QDWAccepted', width: 150, align: 'center', dataIndex: 'QDWAccepted' },
  { title: '编号', key: 'QDWNumber', width: 250, align: 'center', dataIndex: 'QDWNumber' },
  // { title: '审核人', key: 'ShrName', width: 150, align: 'center', dataIndex: 'ShrName' },

  {
    title: '报检时间',
    key: 'DateQF',
    width: 150,
    align: 'center',
    dataIndex: 'DateQF',
    customRender: (t, r, index) => {
      return formatTime(t, 'yyyy-MM-dd')
    }
  },
  { title: '货主', key: 'QDWCargoOwner', width: 150, align: 'center', dataIndex: 'QDWCargoOwner' },
  { title: '联系电话', key: 'QDWPhone', width: 150, align: 'center', dataIndex: 'QDWPhone' },
  {
    title: '动物种类',
    key: 'QDWXuZhong',
    align: 'center',
    dataIndex: 'QDWXuZhong',
    width: 120
  },
  {
    title: '数量',
    key: 'QDWQuantity',
    align: 'center',
    dataIndex: 'QDWQuantity',
    width: 120
  },
  {
    title: '单位',
    key: 'QDWDanWei',
    align: 'center',
    dataIndex: 'QDWDanWei',
    width: 120
  },
  {
    title: '用途',
    key: 'QDWYongTu',
    align: 'center',
    dataIndex: 'QDWYongTu',
    width: 150
  },
  {
    title: '来源',
    key: 'QDWLaiYuan',
    align: 'center',
    dataIndex: 'QDWLaiYuan',
    width: 200
  },
  {
    title: '启运时间',
    key: 'DateQy',
    align: 'center',
    dataIndex: 'DateQy',
    width: 150,
    customRender: (t, r, index) => {
      return formatTime(t, 'yyyy-MM-dd')
    }
  },
  {
    title: '启运地点',
    key: 'QDAddQy',
    align: 'center',
    dataIndex: 'QDAddQy',
    width: 320
  },
  {
    title: '到达地点',
    key: 'QDWAddDd',
    align: 'center',
    dataIndex: 'QDWAddDd',
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
]
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    // formatTime()
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
    yzc,
    dao,
    er,
    clu
  },
  inject: ['reload'],
  data () {
    return {
      butDisabled: false,
      printObj: {
        id: 'printNew',
        popTitle: '动物检疫（产品B）', // 文件标题
        extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      addree: '',
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
      cityXiuArr: [],
      erVisited: false,
      erNum: 0,
      tt: 0,
      shu1: [],
      man: '',
      yzhNum: 0,
      SBDInfo: [],
      totalSBD: 0,
      photoTop: 'data:image/jpg;base64,',
      rules: {
        QDWXiangQy: [{ required: true, message: '请输入', trigger: 'blur' }],
        QDWCargoOwner: [{ required: true, message: '请输入', trigger: 'blur' }],
        FqSbTyp: [{ required: true, message: '请输入', trigger: 'change' }],
        QDWNumber: [{ required: true, message: '请输入', trigger: 'blur' }],
        DateQF: [{ required: true, message: '请输入', trigger: 'change' }],
        QDWXianQy: [{ required: true, message: '请输入', trigger: 'blur' }],
        QDWPhone: [{ required: true, message: '请输入', trigger: 'blur' }],
        QDWTypeQy: [{ required: true, message: '请输入', trigger: 'change' }],
        QDWXiangDd: [{ required: true, message: '请输入', trigger: 'blur' }],
        QDWCunQy: [{ required: true, message: '请输入', trigger: 'blur' }],
        QDAddQy: [{ required: true, message: '请输入', trigger: 'blur' }],
        FqProduct: [{ required: true, message: '请输入', trigger: 'change' }],
        QDWQuantity: [{ required: true, message: '请输入', trigger: 'blur' }],
        FCityAdd: [{ required: true, message: '请输入', trigger: 'blur' }],
        QDWYongTu: [{ required: true, message: '请输入', trigger: 'change' }],
        QDWLaiYuan: [{ required: true, message: '请输入', trigger: 'change' }],
        yx: [{ required: true, message: '请输入', trigger: 'blur' }],
        QDWXsqDd: [{ required: true, message: '请输入', trigger: 'blur' }],
        QDWTypeDd: [{ required: true, message: '请输入', trigger: 'blur' }],
        // QDWXiangDd: [{ required: true, message: '请输入', trigger: 'blur' }],
        QDWCunDd: [{ required: true, message: '请输入', trigger: 'blur' }],
        DateQy: [{ required: true, message: '请输入', trigger: 'blur' }],
        QDWErBiaoHao: [{ required: true, message: '请输入', trigger: 'blur' }]
        // GZ: [{ required: true, message: '请输入', trigger: 'blur' }],
        // FSm5: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      lei: ['养殖场', '交易市场', '散养户', '其他'],
      daoVisitd: false,
      qiVisitd: false,
      selectwhere: '',
      // 增加表单
      addForm: {
        /// 申报单编号
        QDWNumber: '',
        FqSbType: '动物', // 申报类型
        FSuTime: '', // 报检时间
        QDWCargoOwner: sessionStorage.getItem('FuName'), // 申报人
        QDWPhone: '', // 联系电话

        FqProduct: '', // 动物种类
        QDWQuantity: 0, // 数量
        QDWDanWei: '头', // 单位
        QDWYongTu: '屠宰', // 用途
        QDWLaiYuan: '家禽家畜', // 来源
        yx: '有', // 有效《跨省引进乳用种用动物检疫审批表》
        QDWAddDd: '', // 到达地点
        DateQy: '', // 启运时间
        QDWErBiaoHao: '', // 牲畜耳标号
        /// 省【起运地】
        QDWShengQy: '山东省',
        /// 市【起运地】
        QDWShiQy: '青岛市',
        /// 县【起运地】
        QDWXianQy: '',
        ///  保存 县/市/区【起运地】
        QDWXsqQy: '',
        /// 乡镇【起运地】
        QDWXiangQy: '',
        /// 村【起运地】
        QDWCunQy: '',
        /// 养殖场、交易市场、散养户【起运地】
        QDWTypeQy: '',
        /// 起运地
        QDAddQy: '',
        /// 省【到达地】
        QDWShengDd: '',
        /// 市【到达地】
        QDWShiDd: '',
        /// 县【到达地】
        QDWXianDd: '',
        /// 县/市/区【到达地】
        QDWXsqDd: '',
        /// 乡镇【到达地】
        QDWXiangDd: '',
        /// 村【到达地】
        QDWCunDd: '',
        /// 养殖场、屠宰场、交易市场、散养户【到达地】
        QDWTypeDd: '',

        /// 报检时间
        DateQF: undefined,
        /// 申报人签字（盖章）
        FSm5: '',

        SGID: '',
        dr: '',
        FSm4: ''
      },
      slaughterCol: [
        {
           title: '序号',
          key: 'FStId',
          width: 80,
          align: 'center',

          scopedSlots: { customRender: 'xun' }

        },
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
          width: 80
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
      // addForm: this.$form.createForm(this),
      // 查看的详情
      forms: {
        // FqSbType: '', // 申报类型
        // FSuTime: '', // 报检时间
        // FSuserName: '', // 申报人
        // QDWPhone: '', // 联系电话
        // QDAddQy: '', // 起运地点
        // FqProduct: '', // 动物种类
        // QDWQuantity: 0, // 数量
        // QDWDanWei: '', // 单位
        // QDWYongTu: '', // 用途
        // QDWLaiYuan: '', // 来源
        // yx: '', // 有效《跨省引进乳用种用动物检疫审批表》
        // QDWAddDd: '', // 到达地点
        // DateQy: '', // 启运时间
        // QDWErBiaoHao: '' // 牲畜耳标号
      },
      info: {},
      FhpwxkzP: [],
      updateForms: {
        // FqSbType: '', // 申报类型
        // FSuTime: '', // 报检时间
        // FSuserName: '', // 申报人
        // QDWPhone: '', // 联系电话
        // QDAddQy: '', // 起运地点
        // FqProduct: '', // 动物种类
        // QDWQuantity: 0, // 数量
        // QDWDanWei: '', // 单位
        // QDWYongTu: '', // 用途
        // QDWLaiYuan: '', // 来源
        // yx: '', // 有效《跨省引进乳用种用动物检疫审批表》
        // QDWAddDd: '', // 到达地点
        // DateQy: '', // 启运时间
        // QDWErBiaoHao: '' // 牲畜耳标号
      },
      // 要批量删除的id
      idList: '',
      // 要删除的id
      fid: '',
      // 确认删除
      deletinfo: false,
      confirmLoading: false,
      selectedRowKeys: [],
      // header 里的 userid
      UserId: sessionStorage.getItem('FStId'),
      // 数据
      data1: [],
      // 页码
      limit: 10,
      // 当前页
      offset: 1,
      // 总条数
      total: 1,

      totalNum: 1,
      // 总页数
      totalPage: 1,

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
      columns1,
      QiData: [],
      daoData: [],
      FSm4: []
    }
  },
  created () {
    this.chan(this.addForm.QDWYongTu)
    this.arr = citys
    this.getall()
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
        console.log(this.FeQD, this.FeQS, this.FeDJ)
      })
      .catch(rol => {
        console.log(rol)
      })
  },
  filters: {
    mydate: function (originVal) {
      const dt = new Date(originVal)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      const hh = (dt.getHours() + '').padStart(2, '0')
      const mm = (dt.getMinutes() + '').padStart(2, '0')
      const ss = (dt.getSeconds() + '').padStart(2, '0')
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    },
    dateYmd: function (originVal) {
      const dt = new Date(originVal)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')

      return `${y}年${m}月${d}日`
    }
  },
  mounted () {
    this.bb()
    this.qi()

    this.bb1()
  },
  comments: {
    clu
  },
  methods: {
    async selectWhereAdree (value, label, extra) {
      this.selectwhere = ''
      const arr = ['QDWShiQy', 'QDWXianQy', 'QDWXiangQy']
      yenum = 1
      this.limit = 10
      this.offset = 1
      this.addree = getAddreeCondition(arr, label.join(''), this.options)
      const res = await getCdAll({ pageindex: 1, pagesize: 10, selectwhere: '', addree: this.addree }, this.UserId)
      const data = JSON.parse(res.Data)
      this.data1 = data.rows
      this.total = parseInt(JSON.parse(res.Data).total)
    },
    qiXiu () {
      for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]
        console.log('11111111', this.updateForms.QDWShiQy)
        if (this.updateForms.QDWShengQy === obj.label) {
          this.cityArrQy = obj.children
          // console.log(this.addForm.QDWShengQy, this.cityArrQy)
          obj.children.forEach((item, index) => {
            if (item.label === this.updateForms.QDWShiQy) {
              this.cityXiuArr = item.children
            }
          })
        }
      }
    },
    qi () {
      for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]

        if (this.addForm.QDWShengQy === obj.label) {
          this.cityArrQy = obj.children
          // console.log(this.addForm.QDWShengQy, this.cityArrQy)
          obj.children.forEach((item, index) => {
            if (item.label === this.addForm.QDWShiQy) {
              this.countyArrQy = item.children
            }
          })
        }
      }
    },
    bb1 () {
      for (var i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]
        if (this.updateForms.QDWShengDd === obj.label) {
          this.cityArr = obj.children
          obj.children.forEach((item, index) => {
            if (item.label === this.updateForms.QDWShiDd) {
              this.countyArr = item.children
            }
          })
        }
      }
    },
    bb () {
      for (var i = 0; i < this.arr.length; i++) {
        var obj = this.arr[i]
        this.addForm.QDWShengDd = '山东省'
        if (this.addForm.QDWShengDd === obj.label) {
          this.cityArr = obj.children

          this.addForm.QDWShiDd = obj.children[0].label
          this.countyArr = obj.children[0].children
          this.addForm.QDWXianDd = obj.children[0].children[0].label
        }
      }
    },
    getCity1 () {
      for (var i = 0; i < this.arr.length; i++) {
        var obj = this.arr[i]

        if (this.updateForms.QDWShengDd === obj.label) {
          this.cityArr = obj.children

          this.updateForms.QDWShiDd = obj.children[0].label
          this.updateForms.QDWXianDd = obj.children[0].children[0].label
        }
      }
    },
    getCounty1 () {
      for (var i = 0; i < this.cityArr.length; i++) {
        var obj = this.cityArr[i]
        if (this.updateForms.QDWShiDd === obj.label) {
          this.countyArr = obj.children
          // this.city = ''
          this.updateForms.QDWXianDd = obj.children[0].label
        }
      }
    },
    getCity () {
      for (var i = 0; i < this.arr.length; i++) {
        var obj = this.arr[i]

        if (this.addForm.QDWShengDd === obj.label) {
          this.cityArr = obj.children

          this.addForm.QDWShiDd = obj.children[0].label
          this.addForm.QDWXianDd = obj.children[0].children[0].label
        }
      }
    },
    getCounty () {
      for (var i = 0; i < this.cityArr.length; i++) {
        var obj = this.cityArr[i]
        if (this.addForm.QDWShiDd === obj.label) {
          this.countyArr = obj.children
          // this.city = ''
          this.addForm.QDWXianDd = obj.children[0].label
        }
      }
    },
    ff (arr) {
      console.log(arr)
      this.addForm.QDWErBiaoHao = arr
      this.erVisited = false
    },
    er () {
      if (this.addForm.QDWQuantity && this.addForm.FqProduct) {
        const allinfo = JSON.parse(localStorage.getItem('AllInfo'))
        const w = leixin(this.addForm.FqProduct)

        const q = eartag(allinfo.FSunitUstrId)
        this.man = w + '' + q

        this.erNum = parseInt(this.addForm.QDWQuantity)
        this.erVisited = true
      } else {
        alert('请输入数量')
      }
    },
    er1 () {
      if (this.updateForms.QDWQuantity) {
        const allinfo = JSON.parse(localStorage.getItem('AllInfo'))
        const w = leixin(this.updateForms.FqProduct)

        const q = eartag(allinfo.FSunitUstrId)
        this.man = w + '' + q

        this.erNum = parseInt(this.updateForms.QDWQuantity)
        this.erVisited = true
      } else {
        alert('请输入数量')
      }
    },
    // handleSubmit (e) {
    //     e.preventDefault()

    //   this.addForm.validateFields((err, v) => {
    //     console.log(err, v)
    //   })
    // },
    // 修改表单
    async updateSubmit () {
      const nowDate = formatTime(this.updateForms.DateQF, 'yyyy-MM-dd hh:mm:ss')

      const nowDate1 = formatTime(this.updateForms.DateQy, 'yyyy-MM-dd hh:mm:ss')
      this.updateForms.DateQy = nowDate1
      this.updateForms.DateQF = nowDate
      this.updateForms.QDAddQy =
        this.updateForms.QDWShengQy +
        this.updateForms.QDWShiQy +
        this.updateForms.QDWXianQy +
        this.updateForms.QDWXiangQy
      this.updateForms.QDWAddDd =
        this.updateForms.QDWShengDd +
        this.updateForms.QDWShiDd +
        this.updateForms.QDWXianDd +
        this.updateForms.QDWXiangDd
      await cdjyInfoUpdate(this.updateForms, this.UserId)
        .then(res => {
          console.log(res)
        })
        .catch(res => {
          console.log(res)
        })
      this.$refs.updateForm.resetFields()
      this.updatevisible = false
    },
    chan (val) {
      console.log(val)
      if (val === '屠宰') {
        this.lei = ['屠宰场']
        this.addForm.QDWTypeDd = '屠宰场'
        this.updateForms.QDWTypeDd = '屠宰场'
      } else if (val === '饲养') {
        this.lei = ['养殖场']
        this.addForm.QDWTypeDd = '养殖场'
        this.updateForms.QDWTypeDd = '养殖场'
      } else {
        this.addForm.QDWTypeDd = '养殖场'
        this.updateForms.QDWTypeDd = '养殖场'

        this.lei = ['养殖场', '交易市场', '散养户', '其他']
      }
    },
    parentEvent (Qidata) {
      this.peoTF = true
      this.qiVisitd = false
      this.addForm.TZCID = Qidata.TZCID
      this.addForm.YZCID = Qidata.YZCID
      this.addForm.QDWShiQy = Qidata.QDWShiQy
      this.addForm.QDWXianQy = Qidata.QDWXianQy
      this.addForm.QDWXiangQy = Qidata.QDWXiangQy
      this.addForm.QDWTypeQy = Qidata.QDWTypeQy
      this.addForm.QDAddQy = Qidata.FFarmName
      // QDAddQy
      const d = Qidata.FCityAdd
      const arr = d.split(Qidata.QDWXiangQy)
      this.addForm.FCityAdd = arr[arr.length - 1]
      const index = this.regInfo.indexOf(this.addForm.QDWXianQy)
      const xiao = 0
      this.regInfo.forEach((item, index, arr) => {
        console.log(item.label, index)
        if (item.label === this.addForm.QDWXianQy) {
          this.peoInfo = arr[index].children
          console.log(this.peoInfo)
        }
      }) // QDWXiangQy
      console.log('1219', this.regInfo, xiao, index, this.addForm.QDWXianQy)
      //  this.peoInfo = this.regInfo[this.addForm.QDWXianQy].children
      console.log('fu', Qidata)
    },
    father1 (list) {
      console.log(list)

      if (list.FhAdressA.indexOf('/') !== -1) {
        const arr = getadree(list.FhAdressA)
        this.addForm.QDWShiDd = arr[0]
        this.addForm.QDWXianDd = arr[1]
        this.addForm.QDWXiangDd = arr[2]
        this.addForm.QDWCunDd = list.FhName
        this.updateForms.QDWShengDd = '山东省'
        this.updateForms.QDWShiDd = arr[0]
        this.updateForms.QDWXianDd = arr[1]
        this.updateForms.QDWXiangDd = arr[2]
      } else {
        const arr = placexiangx(list.FhAdressA)
        this.addForm.QDWShiDd = arr[1]
        this.addForm.QDWXianDd = arr[2]
        this.addForm.QDWXiangDd = arr[3]
        this.addForm.QDWCunDd = list.FhName
        this.updateForms.QDWShengDd = arr[0]
        this.updateForms.QDWShiDd = arr[1]
        this.updateForms.QDWXianDd = arr[2]
        this.updateForms.QDWXiangDd = arr[3]
      }
      //  const arr = list.AddressName.split('/')
      //  this.addForm.QDWShengDd = '山东省'

      //      this.updateForms.QDWCunDd = list.FhName
      this.daoVisitd = false
    },
    father (list) {
      console.log(list)
      const arr = placexiangx(list.FSdz)
      console.log(arr)
      this.addForm.QDWShengQy = arr[0]
      this.addForm.QDWShiQy = arr[1]
      this.addForm.QDWXianQy = arr[2]
      this.addForm.QDWXiangQy = arr[3].replace('/', '')
      this.addForm.QDWCunQy = list.FSxxdz
      this.addForm.QDWCargoOwner = list.FSfzr
      this.addForm.QDWPhone = list.FSlxdh
      this.addForm.FqProduct = list.FSxz
      this.addForm.QDWTypeQy = '养殖场'
      this.updateForms.QDWShengQy = arr[0]
      this.updateForms.QDWShiQy = arr[1]
      this.updateForms.QDWXianQy = arr[2]
      this.updateForms.QDWXiangQy = arr[3].replace('/', '')
      this.updateForms.QDWCunQy = list.FSxxdz
      this.updateForms.QDWCargoOwner = list.FSfzr
      this.updateForms.QDWPhone = list.FSlxdh
      this.updateForms.FqProduct = list.FSxz

      this.qiVisitd = false
    },
    // xz () {
    //   this.getLu()
    //   this.addVisitd = true
    // },
    async tiao1 (data) {
      console.log(data)
      const newData = {
        offset: data.offset,
        limit: data.limit,
        FhLegal: data.selectWhere,
        UserId: this.UserId
      }
      const data1 = await getSlaughterBkGet(newData)
      console.log(data1)
      if (data1.Data) {
         const Clres = JSON.parse(data1.Data)
      this.SBDInfo = Clres.rows
      this.totalSBD = parseInt(Clres.total)
      } else {
         this.SBDInfo = []
          this.totalSBD = 0
      }
    },
    tiao (data) {
      data.dist = 'gmyzc'
      OwnerGet(data, this.UserId).then(res => {
        console.log(res)
        const dataInfo = JSON.parse(res.Data)
        this.shu1 = dataInfo.rows
        this.yzhNum = parseInt(dataInfo.total)
      })
    },
    parentEvent1 (daodata) {
      this.peoTF1 = true
      this.daoVisitd = false
      this.addForm.QDWShengDd = '山东省'
      this.addForm.QDWShiDd = daodata.Shi
      this.addForm.QDWXianDd = daodata.Xian
      const arr = daodata.AddressName.split(daodata.Xian)

      this.addForm.QDWXiangDd = arr[arr.length - 1]
      this.addForm.QDWCunDd = daodata.FhName
      console.log(daodata)
      // this.regInfo1.forEach((item, index, arr) => {
      //   console.log(item.label, index)
      //   if (item.label === this.addForm.QDWXianDd) {
      //     this.peoInfo1 = arr[index].children
      //     console.log(this.peoInfo)
      //   }
      // })
      //  this.addForm.QDWCunDd = daodata.FhName
      //   const d = daodata.AddressName
      //   const arr = d.split(daodata.Xiang)
      //   this.addForm.QDWXiangDd = arr[arr.length - 1]
    },
    async showQi () {
      OwnerGet({ offset: 1, limit: 10, selectWhere: '', dist: 'gmyzc' }, this.UserId).then(res => {
        console.log(res)
        const listNum = JSON.parse(res.Data)
        this.shu1 = listNum.rows
        this.yzhNum = parseInt(listNum.total)
      })

      // const AllInfo = JSON.parse(localStorage.getItem('AllInfo'))
      // const res = await this.$axios.post(
      //   httper +
      //     `/GetSBXZINFO.ashx?FSunitUstrId=${AllInfo.FSunitUstrId}&FuDWType=${AllInfo.FuDWType}&FStId=-1&FuseEid=${AllInfo.FuseEid}&SBLX=gmyzc&TXT=&uid=${AllInfo.FStId}`
      // )
      // this.QiData = res.data.dataList
      // console.log(this.QiData)
      this.qiVisitd = true
    },
    async showdao () {
      const p = {
        limit: 10,
        offset: 1,
        FhLegal: '',
        UserId: this.UserId
      }
      const data = await getSlaughterBkGet(p)
      console.log(data)
      const Clres = JSON.parse(data.Data)
      this.SBDInfo = Clres.rows
      this.totalSBD = parseInt(Clres.total)

      // const res = await this.$axios.post(httper + `/GetAnimalType.ashx?FStId=1276&type=tzc&name=`)
      // this.daoData = res.data.dataList
      // console.log(this.daoData)
      this.daoVisitd = true
    },
    onSubmit () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // this.addForm
          // 当前时间
          // eslint-disable-next-line no-irregular-whitespace
          const time = new Date()
          // 获取小时
          // eslint-disable-next-line no-irregular-whitespace
          const hours = time.getHours()
          this.addForm.dr = hours
          this.addForm.IsPrant = '已保存'
          this.addForm.FqZxqscjyxkz = this.addForm.yx
          this.addForm.QDWXuZhongZ = this.addForm.FqProduct
          this.addForm.QDWXuZhong = this.addForm.FqProduct
          this.addForm.QDAddQy =
            this.addForm.QDWShengQy +
            this.addForm.QDWShiQy +
            this.addForm.QDWXianQy +
            this.addForm.QDWXiangQy +
            this.addForm.QDWCunQy
          this.addForm.QDWAddDd =
            this.addForm.QDWShengDd +
            this.addForm.QDWShiDd +
            this.addForm.QDWXianDd +
            this.addForm.QDWXiangDd +
            this.addForm.QDWCunDd
          const AllInfo = JSON.parse(localStorage.getItem('AllInfo'))

          // const dataset = { 'QDWNumber': '鲁青(37)20221025565', 'FqSbType': '动物', 'FqZxqscjyxkz': '无', 'QDWCargoOwner': '唐正伟', 'QDWPhone': '15863475100', 'DateQF': '2020-10-22', 'DateQy': '2020-10-22', 'FqProduct': '猪', 'IsPrant': '已保存', 'QDAddQy': '', 'QDWAddDd': '', 'QDWCunDd': '', 'QDWCunQy': '', 'QDWDanWei': '', 'QDWErBiaoHao': '133', 'QDWQuantity': 1, 'QDWShengDd': '', 'QDWShengQy': '', 'QDWShiDd': '', 'QDWShiQy': '', 'QDWTypeDd': '屠宰场', 'QDWTypeQy': '养殖场', 'QDWXianDd': '即墨区', 'QDWXianQy': '即墨市', 'QDWXiangDd': '/北宅天上', 'WW': '111', 'QDWXuZhong': '猪', 'QDWXuZhongZ': '猪', 'SGID': '', 'dr': 23, 'yx': '无', 'QDWYongTu': '屠宰', 'QDWLaiYuan': '家畜家禽', 'FSm5': '' }
          const p = {
            // json: JSON.stringify({ 'DateQF': '2020-09-07', 'DateQy': '2020-09-07', 'FqProduct': '种蛋', 'FqSbType': '繁殖材料', 'FqZxqscjyxkz': '无', 'IsPrant': '已保存', 'QDAddQy': '山东省青岛市即墨市田横动监站相会养殖场', 'QDWAddDd': '山东省青岛市青岛市振华路街道金伦运维', 'QDWCargoOwner': '孙玉峰', 'QDWCunDd': '金伦运维', 'QDWCunQy': '相会养殖场', 'QDWDanWei': '枚', 'QDWErBiaoHao': '137028208566086', 'QDWNumber': '鲁青(37)20044322434', 'QDWPhone': '13455229160', 'QDWQuantity': 1, 'QDWShengDd': '山东省', 'QDWShengQy': '山东省', 'QDWShiDd': '青岛市', 'QDWShiQy': '青岛市', 'QDWTypeDd': '屠宰场', 'QDWTypeQy': '养殖场', 'QDWXianDd': '青岛市', 'QDWXianQy': '即墨市', 'QDWXiangDd': '振华路街道', 'QDWXiangQy': '田横动监站', 'QDWXuZhong': '猪', 'QDWXuZhongZ': '猪', 'SGID': '', 'TZCID': '1260', 'YZCID': '1965', 'dr': '10', 'yx': '无' }),
            json: JSON.stringify(this.addForm),
            type: 'Qua_QuarantineDeclarationCD',
            // eslint-disable-next-line key-spacing
            // json: JSON.stringify(dataset),
            uid: AllInfo.FStId
          }
           this.butDisabled = true
            this.$message.loading('正在新增，请等待', 0)
          this.$axios({
            method: 'post',
            url: httper + '/UplaodJYFiles.ashx',
            data: qs.stringify(p)
          })
            .then(res => {
               this.butDisabled = false
              this.$message.destroy()
              this.$notification.success({
                message: '成功',
                duration: 1
              })
              this.$refs.addForm.resetFields()
              this.getall()
              this.visible = false
            })
            .catch(err => {
               this.$message.destroy()
                this.butDisabled = false
              this.$notification.error({
                message: '失败',
                duration: 1
              })
              // alert('失败')
              console.log(err)
            })
        } else {
          this.$notification.error({
          message: '请检测信息是否完全输入',
          duration: 1.5
        })
          return false
        }
      })

      // console.log(httper + '/UplaodJYFiles.ashx' + '?type=' + p.type + '&uid=' + p.uid + '&json=' + p.json)
      // console.log('http://www.miliotech.com:8886/QDZSAPP/HtmlAshxQua/UplaodJYFiles.ashx' + '?type=' + p.type + '&uid=' + p.uid + '&json=' + p.json)

      //  const res = await addInfo(this.addForm, this.UserId)
    },
    // 批量删除
    DeleteAll () {
      if (this.selectedRowKeys.length > 0) {
        this.$axios({
          method: 'post',
          url: http + '/Quarantine/QuarantineDeclarationCDDel?FStId=' + this.idList
        }).then(res => {
          setTimeout(() => {
            this.$notification.success({
              message: '删除成功'
            })
          }, 100)
          this.reload()
        })
      } else {
        this.$notification.error({
          message: '请选择要删除的数据'
        })
        // alert('请选择要删除的数据')
      }
    },

    onShowSizeChange (current, pageSize) {
      console.log('1111', current, pageSize)
      const data = {
        pagesize: pageSize,
        pageindex: current,
        selectwhere: this.selectwhere,
        addree: this.addree
      }
      const that = this

      getCdAll(data, that.UserId).then(res => {
        that.data1 = JSON.parse(res.Data).rows

        that.total = parseInt(JSON.parse(res.Data).total)
      })
      this.limit = pageSize
      yenum = current

      this.totalPage = Math.ceil(this.total / this.limit)
    },
    onChanges (checkedValues) {
      this.selectedRowKeys = []
      console.log('checked = ', checkedValues)
      yenum = checkedValues
      var that = this
      that.offset = checkedValues

      var p = {
        pagesize: that.limit,
        pageindex: that.offset,
        selectwhere: this.selectwhere,
        addree: this.addree
      }
      console.log(this.UserId)
      getCdAll(p, this.UserId).then(res => {
        console.log('1014', JSON.parse(res.Data).rows)
        that.data1 = JSON.parse(res.Data).rows

        that.total = parseInt(JSON.parse(res.Data).total)
      })
    },

    async cdjyInfo (id) {
      this.FhpwxkzP = []
      this.FSm4 = []
      const res = await cdjyInfo(id, this.UserId)
      console.log(res)
      if (res.Data !== null) {
        this.forms = res.Data
        this.forms.QDWXiangDd = getXiang(this.forms.QDWXiangDd)
        this.forms.QDWXiangQy = getXiang(this.forms.QDWXiangQy)

        this.info = res.Data
        console.log(res.Data)
        if (this.info.FSm5.length > 13) {
          this.FhpwxkzP.push({ src: this.photoTop + this.info.FSm5 })
        } else {
          this.FhpwxkzP = []
        }

        if (this.info.FSm4 !== '' && this.info.FSm4) {
          this.FSm4.push({ src: this.photoTop + this.info.FSm4 })
        }
      } else {
        this.$notification.error({
          message: '查询失败'
        })
        // alert('查询失败')
      }
    },
    cx () {
       yenum = 1
      getCdAll({ pageindex: 1, pagesize: this.limit, selectwhere: this.selectwhere }, this.UserId)
        .then(res => {
          const data = JSON.parse(res.Data)
          this.data1 = data.rows
          this.total = parseInt(JSON.parse(res.Data).total)
           this.offset = 1
          this.$message.success('查询成功')
        })
        .catch(res => {
          this.$message.error('查询失败')
        })
    },
    async getall () {
      const res = await getCdAll(
        { pageindex: this.offset, pagesize: this.limit, selectwhere: '', addree: this.addree },
        this.UserId
      )
      console.log(res)
      const data = JSON.parse(res.Data)
      this.data1 = data.rows
      this.total = parseInt(JSON.parse(res.Data).total)
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
    deleteinfo (id) {
      this.fid = id
      this.deletinfo = true
    },
    // data 表格删除关闭按钮方法
    handleCancel () {
      this.deletinfo = false
    },
    handleOk1 () {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.$axios({
          method: 'post',
          url: http + '/Quarantine/QuarantineDeclarationCDDel?FStId=' + this.fid
        }).then(res => {
          setTimeout(() => {
            this.$notification.success({
              message: '删除成功'
            })
          }, 100)
          this.getall()
        })
        this.deletinfo = false
        this.confirmLoading = false
      }, 1000)
    },
    async updateModal (id) {
      this.FhpwxkzP = []
      await cdjyInfo(id, this.UserId)
        .then(res => {
          this.updateForms = res.Data
          this.updateForms.QDWXiangDd = getXiang(this.updateForms.QDWXiangDd)
          this.updateForms.QDWXiangQy = getXiang(this.updateForms.QDWXiangQy)
          console.log(this.updateForms)
          if (this.updateForms.FSm5.length > 13) {
            this.tt = 100
          } else {
            this.tt = 1
          }
          this.FhpwxkzP.push({ src: this.photoTop + this.updateForms.FSm5 })
          this.qiXiu()
        })
        .catch(res => {
          // alert('失败1345')
        })

      this.updatevisible = true
    },
    cancel () {
      this.$refs.addForm.resetFields()
    },
    async addModal () {
      const AllInfo = JSON.parse(localStorage.getItem('AllInfo'))

      //    http://www.miliotech.com:8886/QDZSAPP/HtmlAshxQua/SetSBDBH.ashx?FSunitUstrId=010808&lx=sb&FSunitId=1919&FSunitName=田横动监站&uid=58471
      const res = await this.$axios.post(
        `${httper}/SetSBDBH.ashx?FSunitUstrId=${AllInfo.FSunitUstrId}&lx=sb&FSunitId=${AllInfo.FSunitId}&FSunitName=${AllInfo.FSunitName}&uid=${AllInfo.FStId}`
      )
      this.addForm.QDWNumber = res.data.data.result

      //  console.log(res.data.data.result)
      //   this.addForm.setFieldsValue({ QDWNumber: res.data.data.result })
      this.visible = true
    },
    showModal (id) {
      this.cdjyInfo(id)
      this.showvisible = true
      // this.$nextTick(() => {
      //   this.addForm.setFieldsValue({
      //     QDWCargoOwner: sessionStorage.getItem('FuName')
      //   })
      // })
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
        this.addForm.QDWXiangQy = this.peoName
        this.addForm.FCityAdd = ''
        this.addForm.QDWXianQy = this.regName
        this.addForm.QDWXsqQy = '山东省青岛市' + this.regName + this.peoName
        this.addForm.QDWXiangQy = this.peoName
        console.log(this.addForm.QDWXsqQy)
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
          this.addForm.QDWXianDd = this.regName1
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
        this.addForm.QDWXsqDd = '山东省青岛市' + this.regName1 + this.peoName1
        this.addForm.QDWXiangDd = this.peoName1
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
// 打印表格的样式
#printNew{
  padding: 20px;
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
.dayi {
  margin-top: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
}
/deep/ .ant-descriptions-bordered .ant-descriptions-item-label{
    background-color: #fafafa;
    width: 180px;
}
/deep/ .ant-descriptions-bordered .ant-descriptions-item-label:last-child,/deep/ .ant-descriptions-bordered .ant-descriptions-item-content:last-child {
    border-right: none;
     width: 180px;
}

</style>
