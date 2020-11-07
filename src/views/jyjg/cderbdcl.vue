<template>
  <div>
    <page-header-wrapper> </page-header-wrapper>
    <a-card class="card">
      <a-row>
        <a-col :span="2"><span class="zi">货主姓名</span> </a-col>
        <a-col :span="8">
          <a-input size="large" v-model="selectWhere" />
        </a-col>
        <a-col :span="2" :offset="2">
          <a-button type="primary" @click="cx">查询</a-button>
        </a-col>
        <a-col :span="2">
          <a-button class="abutton" type="primary" @click="handleEdit()">导出</a-button>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12" :offset="12">
          <a-tree-select
            labelInValue
            @change="getAddree"
            style="width: 25%; float:right;"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="所在地"
            :tree-data="options"
          >
          </a-tree-select>
        </a-col>
      </a-row>
      <a-table
        :pagination="false"
        :columns="columns1"
        :data-source="data1"
        :scroll="{ x: 2000 }"
        style="margin-top: 5px"
      >
        <template slot="action" slot-scope="text, record">
          <a v-permission="{active:'OQDFProcessingsele'}" slot="action" @click="showModal(record.FStId)">查看&nbsp;&nbsp;</a>
          <a v-permission="{active:'OQDFProcessingupd'}" slot="action" @click="updateModal(record.FStId)" v-if="record.QDWAccepted === ''">处理&nbsp;&nbsp;</a>
          <a slot="action" v-else>已处理&nbsp;&nbsp;</a>
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
    <!-- 显示表单-->
    <a-modal width="900px" v-model="showvisible" :footer="null">
      <div id="printNew">

        <div class="maintop">动物产地检疫申报单处理</div>
        <div>申报单编号：{{ info.QDWNumber }}</div>
        <a-descriptions :column="2" bordered>
          <a-descriptions-item label="申报类型" :span="1"> {{ info.FqSbType }} </a-descriptions-item>
          <a-descriptions-item label="报检时间" :span="1"> {{ info.FSuTime | dateFormatHms }} </a-descriptions-item>
          <a-descriptions-item label="申报人名称" :span="1"> {{ info.QDWCargoOwner }} </a-descriptions-item>
          <a-descriptions-item label="联系电话" :span="1">{{ info.QDWPhone }} </a-descriptions-item>
          <a-descriptions-item label="启运地点" :span="2"> {{ info.QDAddQy }} </a-descriptions-item>
          <a-descriptions-item label="动物种类" :span="1"> {{ info.FqProduct }} </a-descriptions-item>
          <a-descriptions-item
            label="数量及单位"
            :span="1"
          >{{ info.QDWQuantity }}{{ info.QDWDanWei }}
          </a-descriptions-item>
          <a-descriptions-item label="用途" :span="1"> {{ info.QDWYongTu }}</a-descriptions-item>
          <a-descriptions-item label="来源" :span="1"> {{ info.QDWLaiYuan }} </a-descriptions-item>
          <a-descriptions-item label="有效《跨省引进乳用种用动物检疫审批表》" :span="2">
            <!-- {{ info.yx }} -->
            <span>{{ info.yx }}</span>
            <viewer :images="FSm4" style="width: 150px;" v-if="FSm4.length !== 0">
              <img v-for="(item, index) in FSm4" :src="item.src" :key="index" style="width:100px; height:100px;margin-left:20px;" />
            </viewer>
          </a-descriptions-item
          >
          <a-descriptions-item label="到达地点" :span="1"> {{ info.QDWAddDd }} </a-descriptions-item>
          <a-descriptions-item label="启运时间" :span="1"> {{ info.DateQy | dateFormatHms }} </a-descriptions-item>
          <a-descriptions-item label="牲畜耳标号" :span="2"><div style="display:inline-block;width:580px"> {{ info.QDWErBiaoHao }}</div></a-descriptions-item>

        </a-descriptions>
        <p class="foot">
          申报人依照《中华人民共和国动物防疫法》、《动物检疫管理办法》有关规定，特申报检疫。并对所填信息的真实性、完整性负责，如与事实不符，官方兽医有权终止检疫，由此导致的后果由申报人自行负责。
        </p>
        <div>
          申报人签字（盖章）：
          <span v-if="tt>50">
            <viewer :images="FhpwxkzP" style="width: 150px;" v-if="FhpwxkzP.length !== 0">
              <img v-for="(item, index) in FhpwxkzP" :src="item.src" :key="index" style="width:100px; height:100px;" />
            </viewer>
          </span>
          <span v-else>
            {{ info.FSm5 }}
          </span>
        </div>

        <br /><br /><br /><br />

        <br />
        <!-- <a-button class="dayi" type="primary">打印</a-button> -->
        <div v-if="info.QDWAccepted !== ''">
          <div>申报处理结果（动物卫生监督机构填写）</div>
          <a-row>
            {{ info.QDWAccepted }}
            拟派员于 {{ info.CLRQ | dateFormat }} 到{{ info.QDWAddress }}实施检疫
          </a-row>
          <a-row :gutter="[24, 32]">
            <a-col :span="8"> 经办人：{{ info.QDWAttn }} </a-col>
            <a-col :span="8"> 经办人联系电话：{{ info.QDWJBRDianHua }} </a-col>
            <a-col :span="8"> 时间 {{ info.DateNpy | dateFormat }} </a-col>
          </a-row>
          <div class="zb">填表人： {{ info.FSuserName }} 填表时间：{{ info.FSuTime | dateFormat }}</div>
        </div>
      </div>
      <a-button type="primary" v-print="'#printNew'" class="dayi">打印</a-button>
    </a-modal>
    <a-modal width="1000px" title="处理申报单" v-model="updatevisible" :footer="null">
      <a-form-model ref="updateForm" :form="updateForms">
        <a-row>
          <a-col :span="24">
            <a-form-model-item
              label="申报单编号："
              :labelCol="{ lg: { span: 4 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 9 }, sm: { span: 12 } }"
            >
              <a-input disabled v-model="updateForms.QDWNumber" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item
              label="申报类型"
              prop="FqSbType"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-radio-group disabled v-model="updateForms.FqSbType">
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
                disabled
                format="yyyy-MM-DD HH:mm:ss"
                v-model="updateForms.DateQF"
                show-time
                type="date"
                placeholder=""
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
              <a-input disabled v-model="updateForms.QDWCargoOwner" />
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item
              label="联系电话"
              prop="phone"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-input disabled v-model="updateForms.QDWPhone" />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-item
              label="启运地点:"
              :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
            >
              <a-select disabled v-model="updateForms.QDWShengQy" style="width: 30%; margin-left: 2%">
                <a-select-option v-for="(item, index) in arr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>

              <a-select disabled v-model="updateForms.QDWShiQy" style="width: 30%; margin-left: 2%">
                <a-select-option v-for="(item, index) in cityArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <a-select disabled v-model="updateForms.QDWXianQy" style="width: 30%; margin-left: 2%">
                <a-select-option v-for="(item, index) in countyArrQy" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>

            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input disabled v-model="updateForms.QDWXiangQy" placeholder="请输入乡（镇）"></a-input
              ></a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item
              label="启运类型:"
              :labelCol="{ lg: { span: 10 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 13 }, sm: { span: 8 } }"
            >
              <a-select disabled v-model="updateForms.QDWTypeQy" placeholder="请选择">
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
              <a-input disabled v-model="updateForms.QDWXiangQy" placeholder="请输入乡（镇）"></a-input
              ></a-form-item>
          </a-col> -->

          <a-col :span="10">
            <a-form-item
              :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input disabled v-model="updateForms.QDWCunDd" placeholder="请输入养殖场名称"></a-input
              ></a-form-item>
          </a-col>
          <!-- <a-col :span="2">
            <a-form-item
              :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-button type="primary" @click="showQi">请选择</a-button></a-form-item>
          </a-col> -->
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="动物种类:"
              :labelCol="{ lg: { span: 7 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            >
              <a-select disabled v-model="updateForms.FqProduct" placeholder="请选择">
                <a-select-option value="鸡"> 鸡</a-select-option>
                <a-select-option value="鸭"> 鸭 </a-select-option>
                <a-select-option value="猪"> 猪 </a-select-option>
                <a-select-option value="羊"> 羊 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="数量及单位:"
              :labelCol="{ lg: { span: 7 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            >
              <a-input disabled v-model="updateForms.QDWQuantity" style="width:120px"></a-input>
              <a-select
                disabled
                v-model="updateForms.QDWDanWei"
                style="position: absolute; top: 50%; transform: translateY(-50%); width: 80px"
                placeholder="请选择"
              >
                <a-select-option value="头"> 头 </a-select-option>
                <a-select-option value="只"> 只 </a-select-option>
                <a-select-option value="箱"> 箱 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="用途:"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 8 }, sm: { span: 6 } }"
            >
              <a-select disabled @change="chan" placeholder="请选择" v-model="updateForms.QDWYongTu">
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
              <a-select disabled v-model="updateForms.QDWLaiYuan" placeholder="请选择">
                <a-select-option value="家畜家禽"> 家畜家禽 </a-select-option>
                <a-select-option value="人工饲养"> 人工饲养 </a-select-option>
                <a-select-option value="合法捕获"> 合法捕获 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-model-item
              label="有效《跨省引进乳用种用动物检疫审批表"
              prop="resource"
              :labelCol="{ lg: { span: 7 }, sm: { span: 6 } }"
              :wrapperCol="{ lg: { span: 5 }, sm: { span: 5 } }"
            >
              <a-radio-group disabled v-model="updateForms.yx">
                <a-radio value="有">有 </a-radio>
                <a-radio value="无"> 无</a-radio>
              </a-radio-group>
              <viewer :images="FSm4" style="width: 150px;" v-if="FSm4.length !== 0">
                <img v-for="(item, index) in FSm4" :src="item.src" :key="index" style="width:100px; height:100px;margin-left:20px;" />
              </viewer>

            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="到达地点:"
              :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
            >
              <!-- <a-select disabled style="width: 30%;" @change="ChangeTown" default-value="青岛市">
                <a-select-option value="青岛市"> 青岛市 </a-select-option>
              </a-select>
              <a-select
                disabled
                style="width: 30%; margin-left: 10px"
                v-model="updateForms.QDWXianDd"
                @change="ChangeRegion1"
                default-value="请选择"
              > -->
              <a-select disabled placeholder="请选择" v-model="updateForms.QDWShengDd" @change="getCity" style="width: 30%;">
                <a-select-option v-for="(item, index) in arr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <a-select disabled placeholder="请选择" v-model="updateForms.QDWShiDd" @change="getCounty" style="width: 30%; margin-left: 2%">
                <a-select-option v-for="(item, index) in cityArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <a-select disabled placeholder="请选择" v-model="updateForms.QDWXianDd" style="width: 30%; margin-left: 2%">
                <a-select-option v-for="(item, index) in countyArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
              <!-- <a-select-option value="请选择"> 请选择 </a-select-option>
                <a-select-option v-for="(item, index) in regInfo1" :key="index">
                  {{ item.label }}
                </a-select-option>
              </a-select>
              <a-select
                disabled
                style="width: 30%; margin-left: 10px"
                v-model="updateForms.QDWXiangDd"
                @change="ChangePeo1"
                default-value="请选择"
              >
                <a-select-option value="请选择"> 请选择 </a-select-option>
                <a-select-option v-for="(item, index) in peoInfo1" :key="index">
                  {{ item.label }}
                </a-select-option>
              </a-select> -->
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input disabled placeholder="请输入乡（镇）" v-model="updateForms.QDWXiangDd"></a-input
              ></a-form-item>
          </a-col>
        </a-row><a-row>
          <a-col :span="7">
            <a-form-item
              label="到达类型:"
              :labelCol="{ lg: { span: 10 }, sm: { span: 4 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
            >
              <a-select
                disabled
                v-model="updateForms.QDWTypeDd"
                placeholder="请选择">
                <a-select-option v-for="(item, index) in lei" :key="index" :value="item"> {{ item }} </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="6">
            <a-form-item
              :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input disabled placeholder="请输入乡（镇）" v-model="updateForms.QDWXiangDd"></a-input
              ></a-form-item>
          </a-col> -->
          <a-col :span="10">
            <a-form-item
              :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-input disabled placeholder="请输入养殖场名称" v-model="updateForms.QDWCunDd"></a-input
              ></a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <!-- <a-col :span="2">
            <a-form-item
              :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
            >
              <a-button
                type="primary"
                @click="showdao"
                v-show="this.updateForms.QDWYongTu === '屠宰'"
              >请选择</a-button
              ></a-form-item >
          </a-col> -->
          <a-col :span="9">
            <a-form-model-item
              label="启运时间"
              prop="resource"
              :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-date-picker
                disabled
                v-model="updateForms.DateQy"
                format="YYYY-MM-DD HH:mm:ss"
                type="date"
                placeholder=""
                style="width: 100%"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="23">
            <a-form-model-item
              label="牲畜耳标号"
              prop="name"
              :labelCol="{ lg: { span: 3 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
            >
              <a-input :auto-size="{ minRows: 4, maxRows: 4 }" type="textarea" style="width:500px;height:150px" disabled v-model="updateForms.QDWErBiaoHao" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <p class="test">
          申报人依照《中华人民共和国动物防疫法》、《动物检疫管理办法》有关规定，特申报检疫。并对所填信息的真实性、完整性负责，如与事实不符，官方兽医有权终止检疫，由此导致的后果由申报人自行负责。
        </p>

        <a-form-model-item
          style="margin-left: -120px"
          label="申报人签字（盖章）："
          prop="name"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
        >
          <div v-if="tt>50">
            <viewer :images="FhpwxkzP" style="width: 150px;" v-if="FhpwxkzP.length !== 0">
              <img v-for="(item, index) in FhpwxkzP" :src="item.src" :key="index" style="width:100px; height:100px;" />
            </viewer>
          </div>
          <div v-else>
            <a-input disabled style="width: 200px" v-model="updateForms.FSm5" />

          </div>
        </a-form-model-item>
        <div>申报处理结果（动物卫生监督机构填写）</div>
        <a-row>
          <a-radio-group v-model="updateForms.QDWAccepted">
            <a-radio value="受理">
              受理
            </a-radio>
            <a-radio value="不受理">
              不受理
            </a-radio>
          </a-radio-group>
          拟派员于 <a-date-picker v-model="updateForms.CLRQ" type="date" style="width: 160px;" /> 到 <a-input
            style="width:120px"
            v-model="updateForms.QDWAddress"
          ></a-input
          > 实施检疫
        </a-row>
        <br />
        <a-row :gutter="[24, 32]">
          <a-col :span="8"> 经办人：<a-input style="width:180px" v-model="updateForms.QDWAttn"></a-input> </a-col>
          <a-col :span="8">
            经办人联系电话：<a-input style="width:180px" v-model="updateForms.QDWJBRDianHua"></a-input>
          </a-col>
          <a-col :span="8">
            <a-date-picker style="width:180px" show-time v-model="updateForms.DateNpy"></a-date-picker>
          </a-col>
        </a-row>
        <a-button class="baa-modalo" @click="updateSubmit" type="primary" style="margin-left:50%;transform:translateX(-50%);width:115px; height: 40px;">保存</a-button>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import citys from '@/assets/citys'
import { getAddreeCondition } from '@/assets/getAddree'
import er from '../jyjg/compont/er'
import dao from './compont/dao.vue'
import httper from '@/utils/httper'
// eslint-disable-next-line no-irregular-whitespace
import formatTime from '@/utils/public.js'
import { cdBaoAll, cdBaoInfo, cdjyInfoUpdate, cdjyInfo } from '@/api/cdjy'
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
    title: '申报类型',
    key: 'FqSbType',
    width: 120,
    align: 'center',
    dataIndex: 'FqSbType'
  },
  { title: '状态', key: 'IsPrant', width: 80, align: 'center', dataIndex: 'IsPrant' },
  {
    title: '申报受理结果',
    key: 'QDWAccepted',
    width: 120,
    align: 'center',
    dataIndex: 'QDWAccepted'
  },
  {
    title: '编号',
    key: 'QDWNumber',
    align: 'center',
    dataIndex: 'QDWNumber',
    width: 250
  },
  {
    title: '报检时间',
    key: 'DateQF',
    align: 'center',
    dataIndex: 'DateQF',
    width: 200,
    customRender: (t, r, index) => {
      return t ? formatTime(t, 'yyyy-MM-dd hh:mm:ss') : ''
    }
  },
  {
    title: '货主',
    key: 'QDWCargoOwner',
    align: 'center',
    dataIndex: 'QDWCargoOwner',
    width: 200
  },
  {
    title: '联系电话',
    key: 'QDWPhone',
    align: 'center',
    dataIndex: 'QDWPhone',
    width: 150
  },
  {
    title: '动物种类',
    key: 'QDWXuZhong',
    align: 'center',
    dataIndex: 'QDWXuZhong',
    width: 120
  },
  { title: '数量', key: 'QDWQuantity', align: 'center', dataIndex: 'QDWQuantity', width: 120 },
  { title: '单位', key: 'QDWDanWei', align: 'center', dataIndex: 'QDWDanWei', width: 120 },
  {
    title: '用途',
    key: 'QDWYongTu',
    align: 'center',
    dataIndex: 'QDWYongTu',
    width: 120
  },
  {
    title: '来源',
    key: 'QDWLaiYuan',
    align: 'center',
    dataIndex: 'QDWLaiYuan',
    width: 120
  },
  {
    title: '启运时间',
    key: 'DateQy',
    align: 'center',
    dataIndex: 'DateQy',
    width: 150,
    customRender: (t, r, index) => {
      return t ? formatTime(t, 'yyyy-MM-dd') : ''
    }
  },
  {
    title: '启运地点',
    key: 'QDAddQy',
    align: 'center',
    dataIndex: 'QDAddQy',
    width: 320,
     customRender: (t, r, index) => {
      return t.replace(/\//g, '')
    }
  },
  {
    title: '到达地点',
    key: 'QDWAddDd',
    align: 'center',
    dataIndex: 'QDWAddDd',
    width: 320,
    customRender: (t, r, index) => {
      return t.replace(/\//g, '')
    }
  },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 120,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    dao,
    er
  },
  inject: ['reload'],
  data () {
    return {
      printObj: {
        id: 'printNew',
        popTitle: '动物检疫（产品B）', // 文件标题
        extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      FuName: JSON.parse(localStorage.getItem('AllInfo')).FuName,
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

      addree: '',
      tt: 0,
      lei: ['养殖场', '交易市场', '散养户', '其他'],
      updateForms: {},
      updatevisible: false,
      selectWhere: '',
      // header 里的 userid
      UserId: sessionStorage.getItem('FStId'),
      // 总条数
      total: 0,
      // 当前页
      offset: 1,
      // 每页条数
      limit: 10,
      showvisible: false,
      options: [],
      columns1,
      data1: [],
      info: {},
      FhpwxkzP: [],
      FSm4: [],
      photoTop: 'data:image/jpg;base64,',
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
      peoName1: '请选择'
    }
  },
  created () {
     this.arr = citys
    this.findAll()
    getAdminAddress()
      .then(res => {
        // this.options = JSON.parse(res)
        console.log(res)
        this.options = res
      })
      .catch(err => {
        console.log(err)
      })
  },
  moutend () {
    this.$set(this.updateForms, 'QDWAddress', '现场')
  },
  methods: {
  getCity (val) {
      this.updateForms.QDWXShengDd = val
      for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]

        if (val === obj.label) {
          this.cityArr = obj.children

          this.updateForms.QDWShiDd = obj.children[0].label
          this.cityArr.forEach((item, index) => {
            if (item.label === this.updateForms.QDWShiDd) {
              this.countyArr = item.children
            }
          })
          this.updateForms.QDWXianDd = obj.children[0].children[0].label
        }
      }
    },
    getCounty (val) {
      for (var i = 0; i < this.cityArr.length; i++) {
        var obj = this.cityArr[i]
        if (val === obj.label) {
          this.countyArr = obj.children
          this.updateForms.QDWXianDd = obj.children[0].label
        }
      }
    },
 getAddree (val) {
      // eslint-disable-next-line no-unused-vars
     const arr = ['QDWShiQy', 'QDWXianQy', 'QDWXiangQy']
    this.addree = getAddreeCondition(arr, val.label, this.options)
      console.log(val)

    this.limit = 10
    this.offset = 1
    yenum = 1
     const data = {
        offset: this.offset,
        limit: this.limit,
        selectWhere: this.selectWhere,
        addree: this.addree
      }
     cdBaoAll(data, this.UserId)
        .then(res => {
          this.data1 = JSON.parse(res.Data).rows
          console.log(this.data1)
          this.total = parseInt(JSON.parse(res.Data).total)
        })
        .catch(res => {
          this.$message.error('查询失败')
        })
    },

    // eslint-disable-next-line no-irregular-whitespace
    getCurrentDate () {
// eslint-disable-next-line no-irregular-whitespace
      var currentDate = formatTime(null, 'yyyy-MM-dd hh:mm:ss')
// eslint-disable-next-line no-irregular-whitespace
      return currentDate
    },
    cx () {
      yenum = 1
       const data = {
        offset: 1,
        limit: this.limit,
        selectWhere: this.selectWhere
      }
       cdBaoAll(data, this.UserId)
        .then(res => {
          this.data1 = JSON.parse(res.Data).rows
          this.total = parseInt(JSON.parse(res.Data).total)
          this.offset = 1
        })
        .catch(res => {
          this.$message.error('查询失败')
        })
    },
    async showQi () {
      const AllInfo = JSON.parse(localStorage.getItem('AllInfo'))
      const res = await this.$axios.post(
        httper +
          `/GetSBXZINFO.ashx?FSunitUstrId=${AllInfo.FSunitUstrId}&FuDWType=${AllInfo.FuDWType}&FStId=-1&FuseEid=${AllInfo.FuseEid}&SBLX=gmyzc&TXT=&uid=${AllInfo.FStId}`
      )
      this.QiData = res.data.dataList
      console.log(this.QiData)
      this.qiVisitd = true
    },
    chan (val) {
      console.log(val)
      if (val === '屠宰') {
        this.lei = ['屠宰']
        return
      }
      this.lei = ['养殖场', '交易市场', '散养户', '其他']
    },
    async showdao () {
      const res = await this.$axios.post(httper + `/GetAnimalType.ashx?FStId=1276&type=tzc&name=`)
      this.daoData = res.data.dataList
      console.log(this.daoData)
      this.daoVisitd = true
    },
    // 修改表单
     updateSubmit () {
      this.updateForms.GZ = ''
      console.log(this.updateForms)
      // if (this.updateForms) {
      //   return
      // }
       cdjyInfoUpdate(this.updateForms, this.UserId)
        .then(res => {
          console.log(res)
          this.$message.success('处理成功')
          this.reload()
        })
        .catch(res => {
          console.log(res)
        })
      // this.$refs.updateForm.resetFields()
      this.updatevisible = false
    },
    preservation () {
      console.log(this.info)
      cdjyInfoUpdate(this.info, this.UserId)
        .then(res => {
          this.$message.success('保存成功')
          this.reload()
        })
        .catch(res => {
          this.$message.error('保存失败')
        })
    },
    onShowSizeChange (current, pageSize) {
      console.log('1111', current, pageSize)
      yeOffset = pageSize

      this.limit = pageSize
      yenum = current
      this.offset = current

      this.totalPage = Math.ceil(this.total / this.limit)
      this.findAll()
    },
    onChanges (checkedValues) {
      this.selectedRowKeys = []
      console.log(checkedValues)
      yenum = checkedValues

      this.offset = checkedValues
      this.findAll()
    },
    findAll () {
      const data = {
        offset: this.offset,
        limit: this.limit,
        selectWhere: this.selectWhere,
        addree: this.addree
      }
      cdBaoAll(data, this.UserId)
        .then(res => {
          const d = JSON.parse(res.Data)
          this.data1 = d.rows
          console.log(this.data1)
          this.total = parseInt(d.total)
        })
        .catch(res => {
          this.$message.error('查询失败')
        })
    },
       async updateModal (id) {
     await cdjyInfo(id, this.UserId).then(res => {
       this.updateForms = res.Data
       this.updateForms.QDWXiangQy = this.updateForms.QDWXiangQy.replace('/', '')
       this.updateForms.QDWXiangDd = this.updateForms.QDWXiangDd.replace('/', '')
       this.updateForms.QDWAddress = '现场'
       this.updateForms.QDWAccepted = '受理'
       this.updateForms.CLRQ = ''
        this.FhpwxkzP = []
        this.FSm4 = []

      // const tt = formatTime(this.updateForms.DateQF, 'yyyy-MM-dd')
        console.log(this.updateForms)
        // this.updateForms.DateQF = tt
     const all = JSON.parse(localStorage.getItem('AllInfo'))

        this.updateForms.QDWAttn = all.FuName
        this.updateForms.QDWJBRDianHua = all.FuPhone
       this.updateForms.DateNpy = this.getCurrentDate()
       if (this.updateForms.FSm4.length > 13) {
         this.FSm4.push({ src: this.photoTop + this.updateForms.FSm4 })
       }
       if (this.updateForms.FSm5.length > 13) {
         this.tt = 100
       } else {
         this.tt = 1
       }
       this.FhpwxkzP.push({ src: this.photoTop + this.updateForms.FSm5 })
      }).catch(res => {
        alert('失败')
      })

      this.updatevisible = true
    },
    showModal (id) {
      this.FhpwxkzP = []
      this.FSm4 = []
      cdBaoInfo(id, this.UserId)
        .then(res => {
          // res.Data.CLRQ = formatTime(res.Data.CLRQ, 'yyyy年MM月dd日')
          this.info = res.Data
          this.info.QDAddQy = this.info.QDAddQy.replace(/\//g, '')

           if (this.info.FSm5.length > 13) {
         this.tt = 100
       } else {
         this.tt = 1
       }
       if (this.info.FSm4.length > 13) {
        this.FSm4.push({ src: this.photoTop + this.info.FSm4 })
       } else {
         this.FSm4 = []
       }
          this.FhpwxkzP.push({ src: this.photoTop + this.info.FSm5 })
          console.log(this.info)
        })
        .catch(res => {
          this.$message.error('服务器暂时出问题了')
        })
      this.showvisible = true
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

           console.log(this.peoName)
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
        console.log(this.addForm.QDWXsqDd)
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
#q .foot {
  letter-spacing: 2px;
}
.dayi {
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
}
.zb {
  margin-left: 55%;
}
.maintop {
  font-size: 20px;
  margin-left: 50%;
  margin-bottom: 10px;
  display: inline-block;
  transform: translateX(-50%);
}
.zi {
  font-size: 14px;
  font-weight: bold;
  line-height: 36px;
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

.bao {
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
}
/deep/ .ant-descriptions-bordered .ant-descriptions-item-content:last-child {

    width: 220px !important;
}
/deep/ .ant-descriptions-bordered .ant-descriptions-item-label {
    background-color: #fafafa;
    width: 180px;
}
</style>
