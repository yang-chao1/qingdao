<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="货主">
                    <a-input v-model="mocheckInfo" size="large" style="width: 150%" />
                  </a-form-item>
                </a-col>
              </div>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-item label="调用次数">
                    <a-input-number style="width: 100%" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="更新日期">
                    <a-date-picker
                      v-model="queryParam.date"
                      style="width: 100%"
                      placeholder="请输入更新日期"
                      :showToday="false"
                    />
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
                    <a-button type="primary" @click="mocheck" style="height:40px">查询</a-button>
                  </span>
                </a-col>
              </div>
            </a-row>
          </a-form>
          <div style="margin-top:35px;">
            <!-- 新增-->
            <a-button type="primary" style="height:40px" icon="plus" @click="showModal()">新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px" @click="pil">批量删除</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px; width:80px;" @click="handleEdit()">导出</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px">列表定制</a-button>
            <a-tree-select
              style="margin-top: -1px ;width: 250px;float:right;"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="所在地"
              allowClear
              :tree-data="options"
              @change="mocheck"
            >
            </a-tree-select>
            <a-modal
              :footer="null"
              title="新增动物检疫证明(产品A)"
              :visible="visibleTF"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1050px"
            >
              <a-form @submit="handleSubmit" :form="form">
                <template>
                  <a-descriptions bordered :column="2" size="small">
                    <a-descriptions-item label="肉品品质检验合格报告单编号" :span="1">
                      <a-form-item>
                        <a-input
                          v-decorator="[
                            'JLDNumber',
                            {
                              rules: [
                                { required: true, message: '请输入' },
                                { pattern: /^[0-9]*$/, message: '只能为数字' }
                              ]
                            }
                          ]"
                        />
                      </a-form-item>
                      <!-- style="border:none" -->
                    </a-descriptions-item>
                    <a-descriptions-item label="检疫证编号" :span="1">
                      <a-form-item>
                        <a-input
                          v-decorator="[
                            'PNumber',
                            {
                              rules: [
                                { required: true, message: '请输入' },
                                { pattern: /^[0-9]*$/, message: '只能为数字' }
                              ]
                            }
                          ]"
                        />
                      </a-form-item>
                    </a-descriptions-item>
                    <a-descriptions-item label="货主" :span="1">
                      <a-form-item>
                        <a-input
                          v-decorator="['PCargoOwner', { rules: [{ required: true, message: '请输入' }] }]"
                          style="width:75%"
                        />
                        <a-button
                          @click="findShipper"
                          class="abutton"
                          type="primary"
                          style="position: absolute;margin: 3px 5px"
                        >选择</a-button
                        >
                      </a-form-item>
                    </a-descriptions-item>
                    <a-descriptions-item label="联系电话" :span="1">
                      <a-form-item>
                        <a-input

                          v-decorator="['PPhone', { rules: [{ required: true, message: '请输入' }] }]"
                        />
                      </a-form-item>
                    </a-descriptions-item>
                    <a-descriptions-item label="产品名称" :span="1">
                      <a-form-item>
                        <a-select
                          v-decorator="['PName', { rules: [{ required: true, message: '请选择' }] }]"
                          placeholder="请选择"
                        >
                          <a-select-option value="">
                            请选择
                          </a-select-option>
                          <a-select-option value="猪-肉产品">
                            猪-肉产品
                          </a-select-option>
                          <a-select-option value="猪-副产品">
                            猪-副产品
                          </a-select-option>
                          <a-select-option value="牛-肉产品">
                            牛-肉产品
                          </a-select-option>
                          <a-select-option value="牛-副产品">
                            牛-副产品
                          </a-select-option>
                          <a-select-option value="羊-肉产品">
                            羊-肉产品
                          </a-select-option>
                          <a-select-option value="羊-副产品">
                            羊-副产品
                          </a-select-option>
                          <a-select-option value="鸡-肉产品">
                            鸡-肉产品
                          </a-select-option>
                          <a-select-option value="鸡-副产品">
                            鸡-副产品
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-descriptions-item>
                    <a-descriptions-item label="数量及单位" :span="1">
                      <a-form-item>
                        <a-input
                          v-decorator="['PQuantity', { rules: [{ required: true, message: '请输入' }] }]"
                          style="width:55%"
                        />
                        <a-select
                          disabled
                          v-decorator="[
                            'PDanWei',
                            { rules: [{ required: true, message: '请选择' }], initialValue: '千克(公斤)' }
                          ]"
                          placeholder="请选择"
                          style="position: absolute;width:110px; margin: 4px"
                        >
                          <a-select-option value="千克(公斤)">
                            千克(公斤)
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-descriptions-item>
                    <a-descriptions-item label="生产单位名称地址" :span="2">
                      <a-form-item>
                        <a-input
                          disabled
                          v-decorator="['PUnitName']"
                          style="width:40%"
                        />
                        <a-input
                          disabled
                          v-decorator="['PProductionunit']"
                          style="width:50%;margin-left: 1%"
                        />
                        <a-input v-decorator="['PMemo4']" placeholder="生产单位地址" style="display:none" />
                      </a-form-item>
                    </a-descriptions-item>
                    <a-descriptions-item label="目的地" :span="2">
                      <!-- <a-form-item>
                        <a-select v-decorator="['PSheng', { rules: [{ required: true, message: '请输入' }],initialValue:'北京市' }]" style="width: 30%;margin-right: 1%;" @change="ChangeTown">
                          <a-select-option value="北京市">
                            北京市
                          </a-select-option>
                        </a-select>
                        <a-select
                          v-decorator="['PShi', { rules: [{ required: true, message: '请输入' }],initialValue:'0'}]"
                          style="width: 30%;margin-right: 1%;"
                          @change="ChangeRegion"
                        >
                          <a-select-option value="请选择">
                            请选择
                          </a-select-option>
                          <a-select-option v-for="(item, index) in regInfo" :key="index" :value="JSON.stringify(index)">
                            {{ item.label }}
                          </a-select-option>
                        </a-select>
                        <a-select
                          v-decorator="['PXian', { rules: [{ required: true, message: '请输入' }],initialValue:'请选择' }]"
                          style="width: 30%;"
                          @change="ChangePeo" >
                          <a-select-option value="请选择">
                            请选择
                          </a-select-option>
                          <a-select-option v-for="(item, index) in peoInfo" :key="index" :value="JSON.stringify(index)">
                            {{ item.label }}
                          </a-select-option>
                        </a-select>
                        <a-input
                          v-decorator="['PDiDian', { rules: [{ required: true, message: '请输入' }] }]"
                          style="width:45%;"
                        />
                        <a-input
                          v-decorator="['PMemo2']"
                          placeholder="目的地"
                          style="display:none"
                        >
                        </a-input></a-form-item> -->
                      <a-form-item>
                        <a-col :span="5">
                          <a-select v-decorator="['PSheng']" :defaultValue="this.shengDD" @select="getCity">
                            <a-select-option v-for="(item, index) in arr" :value="item.label" :key="index">{{
                              item.label
                            }}</a-select-option>
                          </a-select>
                        </a-col>
                        <a-col :span="5">
                          <a-select v-decorator="['PShi']" @select="getCounty">
                            <a-select-option v-for="(item, index) in cityArr" :value="item.label" :key="index">{{
                              item.label
                            }}</a-select-option>
                          </a-select>
                        </a-col>
                        <a-col :span="5">
                          <a-select v-decorator="['PXian']">
                            <a-select-option v-for="(item, index) in countyArr" :value="item.label" :key="index">{{
                              item.label
                            }}</a-select-option>
                          </a-select>
                        </a-col>
                        <a-col :span="5">
                          <a-input
                            v-decorator="['PDiDian', { rules: [{ required: true, message: '请输入' }] }]"
                          />
                        </a-col>
                      </a-form-item>
                    </a-descriptions-item>
                    <a-descriptions-item label="承运人" :span="1">
                      <a-form-item>
                        <a-input v-decorator="['PCarrier', { rules: [{ required: true, message: '请输入' }] }]" />
                      </a-form-item>
                    </a-descriptions-item>
                    <a-descriptions-item label="联系电话" :span="1">
                      <a-form-item>
                        <a-input v-decorator="['PPhoneCyr', { rules: [{ required: true, message: '请输入' }] }]" />
                      </a-form-item>
                    </a-descriptions-item>
                    <a-descriptions-item label="运载方式" :span="2">
                      <a-form-item>
                        <a-radio-group v-decorator="['PYunZai',{initialValue:'公路'}]">
                          <a-radio value="公路">公路</a-radio>
                          <a-radio value="铁路">铁路</a-radio>
                          <a-radio value="水路">水路</a-radio>
                          <a-radio value="航空">航空</a-radio>
                        </a-radio-group>
                      </a-form-item>
                    </a-descriptions-item>
                    <a-descriptions-item label="运载工具牌号" :span="1">
                      <a-form-item>
                        <a-input v-decorator="['PTrademark', { rules: [{ required: true, message: '请输入' }] }]" />
                      </a-form-item>
                    </a-descriptions-item>
                    <!-- <a-descriptions-item label="非洲猪瘟检测单号" :span="1">
                      <a-input v-decorator="['Fsm3', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-descriptions-item> -->
                    <a-descriptions-item label="装运前经" :span="2">
                      <a-form-item>
                        <!-- <a-input
                          v-decorator="['PDisinfection', { rules: [{ required: true, message: '请输入' }],initialValue:'0.5%过氧乙酸' }]"
                          style="width:40%"
                        /> -->

                        <!-- <a-button style="margin: 6px 5px">
                          选择
                        </a-button>消毒 -->
                        <a-select
                          v-decorator="[
                            'PDisinfection',
                            { rules: [{ required: true, message: '请输入' }], initialValue: '0.5%过氧乙酸' }
                          ]"
                          placeholder="0.5%过氧乙酸"
                          @select="selectXiaodu"
                          style="width:180px;margin: 3px 5px"
                        >
                          <a-select-option value="0.5%过氧乙酸">
                            0.5%过氧乙酸
                          </a-select-option> </a-select
                        >消毒
                      </a-form-item>
                    </a-descriptions-item>
                  </a-descriptions>
                  <a-form-item>
                    <span
                    >本批动物经检疫合格,应于
                      <a-select
                        v-decorator="['PYouXiaoRi', { rules: [{ required: true, message: '请选择' }] ,initialValue:'2'}]"
                        placeholder="请选择"
                        style="width:100px; margin: 4px 5px"
                      >
                        <a-select-option v-for="index in 7" :key="index" :value="JSON.stringify(index)">
                          {{ index }}
                        </a-select-option>
                      </a-select>
                      日内到达有效。</span>
                  </a-form-item>

                  <!-- </template>
                <template> -->
                  <a-descriptions bordered :column="2" size="small">
                    <a-descriptions-item label="官方兽医签字" :span="1">
                      <a-form-item>
                        <a-input disabled v-decorator="['PVeterinary', { initialValue: loggedUserName }]" />
                      </a-form-item>
                    </a-descriptions-item>
                    <a-descriptions-item label="签发日期" :span="1">
                      <a-form-item>
                        <!-- <a-input
                          disabled
                          v-decorator="['DateQF', { rules: [{ required: true, message: '请输入' }],initialValue:getCurrentDate() }]"
                        /> -->
                        <a-date-picker
                          disabled
                          format="yyyy-MM-DD hh:mm:ss"
                          v-decorator="['DateQF', { initialValue: getCurrentDate() }]"
                        />
                      </a-form-item>
                    </a-descriptions-item>
                    <a-descriptions-item label="备注" :span="2">
                      <a-form-item>
                        <a-textarea v-decorator="['PMemo1']" rows="4" cols="20" style="width:95%" />
                      </a-form-item>
                    </a-descriptions-item>
                    <a-descriptions-item label="动物卫生监督所联系电话" :span="2">
                      <a-form-item>
                        <a-input
                          v-decorator="['PDwPhone', { rules: [{ required: true, message: '请输入' }] }]"
                          style="width:30%"
                        />
                      </a-form-item>
                    </a-descriptions-item>
                  </a-descriptions>
                </template>

                <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                  <a-button type="primary" html-type="submit" style="width:315px; height: 40px;margin-top:30px;">
                    保存
                  </a-button>
                </a-form-item>
              </a-form>
            </a-modal>
            <!-- 修改弹窗 -->
            <a-modal
              title="动物检疫证明(产品A)修改"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="1050px"
              :destroyOnClose="true"
            >
              <div>
                <a-form @submit="handleSubmit" :form="form">
                  <a-form-item style="display: none">
                    <a-input v-decorator="['FStId']" placeholder="主键Id" />
                  </a-form-item>
                  <template>
                    <a-descriptions bordered :column="2" size="small">
                      <a-descriptions-item label="肉品品质检验合格报告单编号" :span="1">
                        <a-form-item>
                          <a-input
                            v-decorator="[
                              'JLDNumber',
                              {
                                rules: [
                                  { required: true, message: '请输入' },
                                  { pattern: /^[0-9]*$/, message: '只能为数字' }
                                ]
                              }
                            ]"
                          />
                        </a-form-item>
                        <!-- style="border:none" -->
                      </a-descriptions-item>
                      <a-descriptions-item label="检疫证编号" :span="1">
                        <a-form-item>
                          <a-input
                            v-decorator="[
                              'PNumber',
                              {
                                rules: [
                                  { required: true, message: '请输入' },
                                  { pattern: /^[0-9]*$/, message: '只能为数字' }
                                ]
                              }
                            ]"
                          />
                        </a-form-item>
                      </a-descriptions-item>
                      <a-descriptions-item label="货主" :span="1">
                        <a-form-item>
                          <a-input
                            v-decorator="['PCargoOwner', { rules: [{ required: true, message: '请输入' }] }]"
                            style="width:75%"
                          />
                          <a-button
                            @click="findShipper"
                            class="abutton"
                            type="primary"
                            style="position: absolute;margin: 3px 5px"
                          >选择</a-button
                          >
                        </a-form-item>
                      </a-descriptions-item>
                      <a-descriptions-item label="联系电话" :span="1">
                        <a-form-item>
                          <a-input v-decorator="['PPhone', { rules: [{ required: true, message: '请输入' }] }]" />
                        </a-form-item>
                      </a-descriptions-item>
                      <a-descriptions-item label="产品名称" :span="1">
                        <a-form-item>
                          <a-select
                            v-decorator="['PName', { rules: [{ required: true, message: '请选择' }] }]"
                            placeholder="请选择"
                          >
                            <a-select-option value="">
                              请选择
                            </a-select-option>
                            <a-select-option value="猪-肉产品">
                              猪-肉产品
                            </a-select-option>
                            <a-select-option value="猪-副产品">
                              猪-副产品
                            </a-select-option>
                            <a-select-option value="牛-肉产品">
                              牛-肉产品
                            </a-select-option>
                            <a-select-option value="牛-副产品">
                              牛-副产品
                            </a-select-option>
                            <a-select-option value="羊-肉产品">
                              羊-肉产品
                            </a-select-option>
                            <a-select-option value="羊-副产品">
                              羊-副产品
                            </a-select-option>
                            <a-select-option value="鸡-肉产品">
                              鸡-肉产品
                            </a-select-option>
                            <a-select-option value="鸡-副产品">
                              鸡-副产品
                            </a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-descriptions-item>
                      <a-descriptions-item label="数量及单位" :span="1">
                        <a-form-item>
                          <a-input
                            v-decorator="['PQuantity', { rules: [{ required: true, message: '请输入' }] }]"
                            style="width:55%"
                          />
                          <a-select
                            disabled
                            v-decorator="[
                              'PDanWei',
                              { rules: [{ required: true, message: '请选择' }], initialValue: '千克(公斤)' }
                            ]"
                            placeholder="请选择"
                            style="position: absolute;width:110px; margin: 4px"
                          >
                            <a-select-option value="千克(公斤)">
                              千克(公斤)
                            </a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-descriptions-item>
                      <a-descriptions-item label="生产单位名称地址" :span="2">
                        <a-form-item>
                          <a-input disabled v-decorator="['PUnitName']" style="width:40%" />
                          <a-input disabled v-decorator="['PProductionunit']" style="width:45%;margin-left: 1%" />
                          <a-input v-decorator="['PMemo4']" placeholder="生产单位地址" style="display:none" />
                        </a-form-item>
                      </a-descriptions-item>
                      <a-descriptions-item label="目的地" :span="2">
                        <a-form-item>
                          <a-col :span="5">
                            <a-select v-decorator="['PSheng']" :defaultValue="this.shengDD" @select="getCity">
                              <a-select-option v-for="(item, index) in arr" :value="item.label" :key="index">{{
                                item.label
                              }}</a-select-option>
                            </a-select>
                          </a-col>
                          <a-col :span="5">
                            <a-select v-decorator="['PShi']" @select="getCounty">
                              <a-select-option v-for="(item, index) in cityArr" :value="item.label" :key="index">{{
                                item.label
                              }}</a-select-option>
                            </a-select>
                          </a-col>
                          <a-col :span="5">
                            <a-select v-decorator="['PXian']">
                              <a-select-option v-for="(item, index) in countyArr" :value="item.label" :key="index">{{
                                item.label
                              }}</a-select-option>
                            </a-select>
                          </a-col>
                          <a-col :span="8">
                            <a-input
                              v-decorator="['PDiDian', { rules: [{ required: true, message: '请输入' }] }]"/>
                          </a-col>
                        </a-form-item>
                        <!-- <a-form-item>
                          <a-select
                            v-decorator="['PSheng', { rules: [{ required: true, message: '请输入' }] }]"
                            style="width: 30%;margin-right: 1%;"
                            @change="ChangeTown"
                          >
                            <a-select-option value="青岛市">
                              青岛市
                            </a-select-option>
                          </a-select>
                          <a-select
                            v-decorator="['PShi', { rules: [{ required: true, message: '请输入' }] }]"
                            style="width: 30%;margin-right: 1%;"
                            @change="ChangeRegion"
                          >
                            <a-select-option value="请选择">
                              请选择
                            </a-select-option>
                            <a-select-option
                              v-for="(item, index) in regInfo"
                              :key="index"
                              :value="JSON.stringify(index)"
                            >
                              {{ item.label }}
                            </a-select-option>
                          </a-select>
                          <a-select
                            v-decorator="['PXian', { rules: [{ required: true, message: '请输入' }] }]"
                            style="width: 30%;"
                            @change="ChangePeo"
                          >
                            <a-select-option value="请选择">
                              请选择
                            </a-select-option>
                            <a-select-option
                              v-for="(item, index) in peoInfo"
                              :key="index"
                              :value="JSON.stringify(index)"
                            >
                              {{ item.label }}
                            </a-select-option>
                          </a-select>
                          <a-input
                            v-decorator="['PDiDian', { rules: [{ required: true, message: '请输入' }] }]"
                            style="width:45%;"/>
                          <a-input v-decorator="['PMemo2']" placeholder="目的地" style="display:none"> </a-input
                          ></a-form-item> -->
                      </a-descriptions-item>
                      <a-descriptions-item label="承运人" :span="1">
                        <a-form-item>
                          <a-input v-decorator="['PCarrier', { rules: [{ required: true, message: '请输入' }] }]" />
                        </a-form-item>
                      </a-descriptions-item>
                      <a-descriptions-item label="联系电话" :span="1">
                        <a-form-item>
                          <a-input v-decorator="['PPhoneCyr', { rules: [{ required: true, message: '请输入' }] }]" />
                        </a-form-item>
                      </a-descriptions-item>
                      <a-descriptions-item label="运载方式" :span="2">
                        <a-form-item>
                          <a-radio-group v-decorator="['PYunZai']">
                            <a-radio value="公路">公路</a-radio>
                            <a-radio value="铁路">铁路</a-radio>
                            <a-radio value="水路">水路</a-radio>
                            <a-radio value="航空">航空</a-radio>
                          </a-radio-group>
                        </a-form-item>
                      </a-descriptions-item>
                      <a-descriptions-item label="运载工具牌号" :span="1">
                        <a-form-item>
                          <a-input v-decorator="['PTrademark', { rules: [{ required: true, message: '请输入' }] }]" />
                        </a-form-item>
                      </a-descriptions-item>
                      <!-- <a-descriptions-item label="非洲猪瘟检测单号" :span="1">
                        <a-input v-decorator="['Fsm3', { rules: [{ required: true, message: '请输入' }] }]" />
                      </a-descriptions-item> -->
                      <a-descriptions-item label="装运前经" :span="2">
                        <a-form-item>
                          <a-input
                            v-decorator="['PDisinfection', { rules: [{ required: true, message: '请输入' }] }]"
                            style="width:40%"
                          />
                          <!-- <a-button style="margin: 6px 5px">
                            选择
                          </a-button>消毒 -->
                          <a-select
                            v-decorator="['xiaoduSel']"
                            placeholder="请选择"
                            @select="selectXiaodu"
                            style="width:180px;margin: 3px 5px"
                          >
                            <a-select-option value="请选择">
                              请选择
                            </a-select-option>
                            <a-select-option value="0.5%过氧乙酸">
                              0.5%过氧乙酸
                            </a-select-option> </a-select
                          >消毒
                        </a-form-item>
                      </a-descriptions-item>
                    </a-descriptions>
                    <a-form-item>
                      <span
                      >本批动物经检疫合格,应于
                        <a-select
                          v-decorator="['PYouXiaoRi', { rules: [{ required: true, message: '请选择' }] }]"
                          placeholder="请选择"
                          style="width:100px; margin: 4px 5px"
                        >
                          <a-select-option v-for="index in 7" :key="index">
                            {{ index }}
                          </a-select-option> </a-select
                        >日内到达有效。</span
                      >
                    </a-form-item>
                    <a-descriptions bordered :column="2" size="small">
                      <a-descriptions-item label="官方兽医签字" :span="1">
                        <a-form-item>
                          <a-input
                            disabled
                            v-decorator="[
                              'PVeterinary',
                              { rules: [{ required: true, message: '请输入' }], initialValue: loggedUserName }
                            ]"
                          />
                        </a-form-item>
                      </a-descriptions-item>
                      <a-descriptions-item label="签发日期" :span="1">
                        <a-form-item>
                          <!-- <a-input
                            disabled
                            v-decorator="['DateQF', { rules: [{ required: true, message: '请输入' }],initialValue:getCurrentDate() }]"
                          /> -->
                          <a-date-picker
                            disabled
                            format="yyyy-MM-DD hh:mm:ss"
                            v-decorator="[
                              'DateQF',
                              { rules: [{ required: true, message: '请输入' }], initialValue: getCurrentDate() }
                            ]"
                          />
                        </a-form-item>
                      </a-descriptions-item>
                      <a-descriptions-item label="备注" :span="2">
                        <a-form-item>
                          <a-textarea v-decorator="['PMemo1']" rows="4" cols="20" style="width:90%" />
                        </a-form-item>
                      </a-descriptions-item>
                      <a-descriptions-item label="动物卫生监督所联系电话" :span="2">
                        <a-form-item>
                          <a-input
                            v-decorator="['PDwPhone', { rules: [{ required: true, message: '请输入' }] }]"
                            style="width:30%"
                          />
                        </a-form-item>
                      </a-descriptions-item>
                    </a-descriptions>
                  </template>

                  <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                    <a-button type="primary" html-type="submit" style="width:315px; height: 40px;margin-top:30px;">
                      确认
                    </a-button>
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>
            <!-- 查看弹窗   title="动物检疫证明(产品A)查看"-->
            <a-modal
              :visible="findinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="1050px"
              :destroyOnClose="true"
            >
              <div>
                <div>
                  <qr-code :visible="visibleTF" :codeId="codeId"></qr-code>
                  <img src="@/assets/b.png" alt="" class="zhang" />
                  <h1 class="infoTop">动 物 检 疫 合 格 证 明（产品A）</h1>
                  <a-row type="flex" justify="end">
                    <span style="color:red;font-size:15px">No {{ findList.PNumber }}</span>
                  </a-row>
                </div>

                <table class="tbClass tablePrint">
                  <tbody>
                    <tr>
                      <td>货主</td>
                      <td>
                        {{ findList.PCargoOwner }}
                      </td>
                      <td>联系电话</td>
                      <td>
                        {{ findList.PPhone }}
                      </td>
                    </tr>
                    <tr>
                      <td>产品名称</td>
                      <td>
                        {{ findList.PName }}
                      &nbsp;
                      </td>
                      <td>数量及单位</td>
                      <td>{{ findList.PQuantity }}{{ findList.PDanWei }}</td>
                    </tr>
                    <tr>
                      <td>生产单位名称地址</td>
                      <td colspan="3">
                        {{ findList.PMemo4 }}
                      </td>
                    </tr>
                    <tr>
                      <td>目的地</td>
                      <td colspan="3">
                        {{ findList.PMemo2 }}
                      </td>
                    </tr>
                    <tr>
                      <td>承运人</td>
                      <td>
                        {{ findList.PCarrier }}
                      </td>
                      <td>联系电话</td>
                      <td>
                        {{ findList.PPhoneCyr }}
                      </td>
                    </tr>
                    <tr>
                      <td>运载方式</td>
                      <td colspan="3">
                        <a-radio-group disabled v-model="findList.PYunZai">
                          <a-radio value="公路">公路</a-radio>
                          <a-radio value="铁路">铁路</a-radio>
                          <a-radio value="水路">水路</a-radio>
                          <a-radio value="航空">航空</a-radio>
                        </a-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <td>运载工具牌号</td>
                      <td>
                        {{ findList.PTrademark }}
                      &nbsp;
                      </td>
                      <td>装运前经</td>
                      <td>
                        {{ findList.PDisinfection }}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4">
                        <div style="height: 230px;">
                          <span style="float:left"> 本批动物经检疫合格,应于{{ findList.PYouXiaoRi }} 日内到达有效。</span
                          ><br />
                          <span style="float:right">
                            <a id="a1">官方兽医签字：</a>
                            {{ findList.PVeterinary }}
                            <a id="a1"></a><br />
                            签发日期：{{ findList.DateQF }}
                            <!-- 二〇二〇年 七月 十七日 15:44:54 -->
                            <br />
                            <a id="a2">(动物卫生监督所检疫专用章)</a>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>动物卫生监督检查站签章</td>
                      <td colspan="3"></td>
                    </tr>
                    <tr>
                      <td>备注</td>
                      <td colspan="3">
                        {{ findList.PMemo1 }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <a-row>
                  <span>注:1.本证书一式两联,第一联动物卫生监督所留存,第二联随货同行。</span>
                </a-row>
                <a-row>
                  <span style="margin-left:2%">2.动物卫生监督所联系电话：17621696833</span>
                </a-row>
              </div>
              <a-button v-print="'#printNew'" @click="showPrintTF">打印</a-button>
            </a-modal>
            <!-- 弹出层选择货主信息 -->
            <a-modal
              title="选择货主信息"
              :visible="selectShipperinfo"
              :footer="null"
              @cancel="handleCancelHZ"
              width="900px"
              :zIndex="1001"
              :destroyOnClose="true"
            >
              <clu :columns1="clo" :totalnum="tt" :shu="shu" @child-event1="father" @tiao="tiao"> </clu>
            </a-modal>
          </div>
          <!-- 页面表格 -->
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="data"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a slot="action" @click="find(record)">查看&nbsp;&nbsp;</a>
              <a slot="action" @click="update(record)">修改&nbsp;&nbsp;</a>
              <!-- <a slot="action" @click="delet(record)">删除&nbsp;&nbsp;</a> -->
            </template>
          </a-table>
          <div>
            <a-pagination
              show-quick-jumper
              :default-current="offset"
              :total="totalnum"
              show-less-items
              @change="onChange"
              :current="offset"
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

    <div id="printNew" v-show="printTF" v-html="this.printInfo"></div>

  </div>
</template>
<script>
// 接口请求调用
import httper from '@/utils/httper'
import {
  FindAllInfo,
  AddInfo,
  FindInfoByFStId,
  UpdateInfo,
  DeleteInfo,
  FindShipperInfo,
  GettzcsbdaddressInfo
} from '@/api/tzjyEb/AnimaJyzmA.js'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import formatTime from '@/utils/public.js'
import clu from '../compont/clu2.vue'
import qrCode from '@/views/qrcode/index'
import { getQrCode } from '@/api/crcode'
import mapaddres from '../../../../static/citys.json'
import httpers from '@/utils/httpers.js'
import getKey from '@/utils/keyCheck.js'
import smallToBig from '@/utils/numberTocase'
// 当前页
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
  { title: '签发日期', width: 150, align: 'center', dataIndex: 'DateQF', key: 'DateQF' },
  { title: '检疫证编号', width: 200, align: 'center', dataIndex: 'PNumber', key: 'PNumber' },
  { title: '货主', width: 200, align: 'center', dataIndex: 'PCargoOwner', key: 'PCargoOwner' },
  { title: '产品名称', width: 220, align: 'center', dataIndex: 'PName', key: 'PName' },
  { title: '数量', width: 150, align: 'center', dataIndex: 'PQuantity', key: 'PQuantity' },
  { title: '单位', width: 200, align: 'center', dataIndex: 'PDanWei', key: 'PDanWei' },
  { title: '生产单位名称地址', width: 320, align: 'center', dataIndex: 'PMemo4', key: 'PMemo4' },
  { title: '承运人', width: 200, align: 'center', dataIndex: 'PCarrier', key: 'PCarrier' },
  { title: '有效到达日', width: 150, align: 'center', dataIndex: 'PYouXiaoRi', key: 'PYouXiaoRi' },
  { title: '目的地', width: 280, align: 'center', dataIndex: 'PMemo2', key: 'PMemo2' },
  { title: '官方兽医签字', width: 320, align: 'center', dataIndex: 'PVeterinary', key: 'PVeterinary' },
  { title: '开证人员', width: 200, align: 'center', dataIndex: 'FSuserName', key: 'FSuserName' },
  { title: '检疫证状态', width: 200, align: 'center', dataIndex: 'IsPrant', key: 'IsPrant' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 150,
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]

// 货主列表弹窗
const clo = [
  { title: '名称', key: 'PCargoOwner', align: 'center', width: 200, dataIndex: 'PCargoOwner' },
  { title: '联系电话', key: 'PPhone', align: 'center', width: 280, dataIndex: 'PPhone' },
  { title: '产品名称', key: 'PName', align: 'center', width: 220, dataIndex: 'PName' },
  { title: '生产单位名称地址', key: 'PProductionunit', align: 'center', width: 220, dataIndex: 'PProductionunit' },
  { title: '目的地', key: 'PMemo2', align: 'center', width: 220, dataIndex: 'PMemo2' },
  { title: '承运人', key: 'PCarrier', align: 'center', width: 220, dataIndex: 'PCarrier' },
  { title: '联系电话', key: 'PPhoneCyr', align: 'center', width: 220, dataIndex: 'PPhoneCyr' },
  { title: '签发日期', key: 'FScTime', align: 'center', width: 220, dataIndex: 'FScTime' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    align: 'center',
    width: 140,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  inject: ['reload'], // 页面刷新this.reload()使用
  components: {
    clu,
    qrCode
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    info: {
      type: Object
    }
  },
  data () {
    return {
      printObj: {
        id: 'printNew',
        popTitle: '动物检疫（产品A）', // 文件标题
        extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      // 总条数
      totalnum: 0,
      // 单位总数
      DWtotal: 0,
      // 当前页
      yenum: 1,
      // 单位选择当前页数
      offset: 1,
      // 每页条数
      limit: 10,
      // 模糊查询当前页
      findBynameyenum: 1,
      mocheckInfo: '',
      idList: '',
      // 货主列表
      offsetHz: 1,
      limitHz: 10,
      PCargoOwner: '',
      clo, // 列
      tt: 0, // 总条数
      shu: [], // 数据
      selectShipperinfo: false,

      queryParam: { status: 0, status1: 0 },
      columns,
      data: [],
      selectwhere: '',
      UserId: sessionStorage.getItem('FStId'), // 当前登录用户Id
      loggedUserName: sessionStorage.getItem('FuName'), // 当前登录用户
      options: [],
      regName: '',
      peoName: '',
      regInfo: [],
      peoInfo: [],

      // from 表单
      form: this.$form.createForm(this),
      formType: '',
      number: 0,
      findList: [],

      FSzxjyxkzP: [], // 二维码照片
      // 点击 弹出框
      visibleTF: false,
      updateinfo: false,
      findinfo: false,
      deletinfo: false,
      confirmLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      selectedRowKeys1: [],
      loading: false,

      codeId: '',
      // 地址
      arr: [],
      cityArr: [],
      countyArr: [],
      arrQy: [],
      cityArrQy: [],
      countyArrQy: [],
      shengDD: '北京市',
      shiDD: '',
      xianDD: '',
      printTF: false,
      printFStId: '',
      earTagPrint: '',
      TicketType: 31,
      printInfo: '',
      moFSunitUstrId: ''
    }
  },
  watch: {
    info (newInfo) {
      console.log(newInfo)
      this.infoItem = newInfo
      var p = {
        FStId: this.infoItem.FStId,
        Mid: 31,
        UserId: sessionStorage.getItem('FStId')
      }
      getQrCode(p).then(res => {
        console.log(res)
        this.codeId = res.Data
      })
    }
  },
  created () {
    this.arr = mapaddres
    this.shengDD = this.arr[0].label
    this.cityArr = this.arr[0].children
    this.shiDD = this.cityArr[0].label
    this.countyArr = this.cityArr[0].children
    this.xianDD = this.countyArr[0].label
    this.$nextTick(() => {
      this.form.setFieldsValue({
        PSheng: '北京市',
        PShi: '北京城区',
        PXian: '东城区'
      })
    })
    console.log(this.info)
    yenum1 = 1
    // 行政树
    getAdminAddress()
      .then(res => {
        this.options = res
        this.regInfo = this.options[0].children
      })
      .catch(rol => {
        console.log(rol)
      })

    this.findAll()
  },
  methods: {
    // 打印
    // printBB () {
    //   this.$axios({
    //     method: 'get',
    //     url:
    //       httpers +
    //       '/SVPrint/TicketPrint.ashx?earTagPrint=' +
    //       this.earTagPrint +
    //       '&TicketType=' +
    //       this.TicketType +
    //       '&FSuserId=' +
    //       this.UserId +
    //       '&FStid=' +
    //       this.printFStId
    //   }).then(res => {
    //     console.log(res)
    //     this.printInfo = res.data
    //     this.findinfo = false
    //     this.printTF = true
    //     setTimeout(() => {
    //       this.$print(this.$refs.printNew)
    //     }, 100)
    //   })
    //   console.log('执行了打印')
    // },
    mocheck (che, val) {
      yenum1 = 1
      this.limit = 10
      this.offset = 1
      console.log(che, val)
      if (!val) {
        if (this.moFSunitUstrId !== '') {
          this.selectwhere = 'PCargoOwner:' + this.mocheckInfo + ';FSunitUstrId:' + this.moFSunitUstrId
        } else {
          this.selectwhere = 'PCargoOwner:' + this.mocheckInfo
        }
      } else {
        if (val.length) {
          this.moFSunitUstrId = getKey(this.options, val[0])
          if (this.mocheckInfo) {
            this.selectwhere = 'PCargoOwner:' + this.mocheckInfo + ';FSunitUstrId:' + this.moFSunitUstrId
          } else {
            this.selectwhere = 'FSunitUstrId:' + this.moFSunitUstrId
          }
        } else {
          this.moFSunitUstrId = ''
          if (this.mocheckInfo) {
            this.selectwhere = 'PCargoOwner:' + this.mocheckInfo
          } else {
            this.selectwhere = ''
          }
        }
      }
      this.findAll()
    },
    // 地址
    getCity () {
      for (var i = 0; i < this.arr.length; i++) {
        var obj = this.arr[i]
        if (this.form.getFieldValue('PSheng') === obj.label) {
          this.cityArr = obj.children
          this.countyArr = this.cityArr[0].children
          console.log(this.cityArr[0].children[0].label)
          this.$nextTick(() => {
            this.form.setFieldsValue({
              PShi: this.cityArr[0].label,
              PXian: this.cityArr[0].children[0].label
            })
          })
        }
      }
    },
    getCounty () {
      for (var i = 0; i < this.cityArr.length; i++) {
        var obj = this.cityArr[i]
        if (this.form.getFieldValue('PShi') === obj.label) {
          this.countyArr = obj.children
          this.$nextTick(() => {
            this.form.setFieldsValue({
              PXian: this.countyArr[0].label
            })
          })
        }
      }
    },
    getCityQy () {
      for (var i = 0; i < this.arr.length; i++) {
        var obj = this.arrQy[i]
        if (this.provinceQy === obj.label) {
          this.cityArr = obj.children
          console.log(obj.children)
          this.cityQy = obj.children[0].label
          this.countyQy = obj.children[0].children[0].label
        }
      }
    },
    getCountyQy () {
      for (var i = 0; i < this.cityArr.length; i++) {
        var obj = this.cityArrQy[i]
        if (this.city === obj.label) {
          this.countyArrQy = obj.children
          // this.city = ''
          this.countyQy = obj.children[0].label
        }
      }
    },
    async pil () {
         console.log(this.idList)
        if (this.selectedRowKeys.length > 0) {
         var p = {
        FStId: this.idList,
        UserId: this.UserId
      }
      DeleteInfo(p).then(res => {
        this.$message.success('删除成功')
      }).catch(res => {
        this.$message.error('删除失败')
      })
        yenum1 = 1
         this.idList = ''
        this.reload()
      } else {
        alert('请选择要删除的数据')
      }
    },
    getCurrentDate () {
      // 当前时间
      var currentDate = formatTime(null, 'yyyy-MM-dd hh:mm:ss')
      return currentDate
    },
    getHao () {
      // 获取检疫证编号
      const Allinfo = JSON.parse(localStorage.getItem('AllInfo'))
      console.log(Allinfo)
      this.$axios.get(httper + '/GetNumber.ashx?type=3&uid=' + Allinfo.FStId).then(res => {
        console.log(res)
        this.form.setFieldsValue({ PNumber: res.data.data.result })
      })
    },
    findAll () {
      var that = this
      var p = {
        limit: that.limit,
        offset: that.offset,
        selectwhere: that.selectwhere,
        UserId: this.UserId
      }
      FindAllInfo(p)
        .then(res => {
          //  console.log(JSON.stringify(res))
          if (res.Result) {
            if (res.Data) {
              var datalist = JSON.parse(res.Data)
              datalist.rows.forEach(item => {
                item.DateQF = formatTime(item.DateQF, 'yyyy-MM-dd')
              })
              this.data = datalist.rows
              this.totalnum = parseInt(datalist.total)
            }
          } else {
            this.$notification.info({ message: '未查询到任何信息' })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 分页方法
    onChange (checkedValues) {
      this.selectedRowKeys = []
      console.log('checked = ', checkedValues)
      this.yenum = checkedValues
      this.offset = checkedValues
      yenum1 = checkedValues
      this.findAll()
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 市级选择触发
    ChangeTown (val) {
      console.log(val)
    },
    ChangeRegion (val) {
      this.form.setFieldsValue({ PXian: '请选择' })
      console.log(val)
      if (val === '请选择' || val === '') {
      } else {
        this.peoName = '请选择'
        if (this.regInfo[val]) {
          this.regName = this.regInfo[val].label
          this.peoInfo = this.regInfo[val].children
        }
      }
    },
    ChangePeo (val) {
      if (val === '请选择' || val === '') {
      } else {
        this.peoName = this.peoInfo[val].label
        console.log(this.regName, this.peoName)
      }
    },
    onSelectChange (selectedRowKeys, selectedRow) {
      // 选中行
      console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRow)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRow = selectedRow
      var arr = ''
      selectedRow.forEach(item => {
        arr = arr + ',' + item.FStId
      })
      console.log(arr)
      this.idList = arr.substring(1)
    },
    selectXiaodu (obj) {
      // 消毒选择下拉框
      if (obj === '请选择') obj = ''
      this.form.setFieldsValue({ PDisinfection: obj })
    },
    // 弹窗
    showModal (formName) {
      this.getHao()
      this.formType = 'add'
      this.visibleTF = true
      this.arr = mapaddres
      this.shengDD = this.arr[0].label
      this.cityArr = this.arr[0].children
      this.shiDD = this.cityArr[0].label
      this.countyArr = this.cityArr[0].children
      this.xianDD = this.countyArr[0].label
      GettzcsbdaddressInfo(this.UserId).then(res => {
        console.log(res)
        if (res.Result) {
          this.$nextTick(() => {
            this.form.setFieldsValue({
              PBSheng: '北京市',
              PBShi: '北京城区',
              PBXian: '东城区',
              PUnitName: res.Data.FsbdName,
              PProductionunit: res.Data.FAddress + res.Data.FLAddress
            })
          })
        }
      })
    },
    showPrintTF () {
      this.printTF = true
    },
    find (v) {
      var p = {
        FStId: v.FStId,
        UserId: this.UserId
      }
      this.printFStId = v.FStId
      console.log(p)
      FindInfoByFStId(p).then(res => {
        if (res.Result) {
          console.log(res)
          this.findinfo = true
          this.$nextTick(() => {
            res.Data.FDate = formatTime(res.Data.FDate, 'yyyy年MM月dd日')
            res.Data.DateQF = formatTime(res.Data.DateQF, 'yyyy年MM月dd日 hh:mm:ss')
            this.findList = res.Data
            this.findList.PQuantity = smallToBig(this.findList.PQuantity)
            this.findList.PYouXiaoRi = smallToBig(this.findList.PYouXiaoRi)
          })
        } else {
          this.$notification.info({ message: '未查询到任何信息' })
        }
      })
      var pp = {
        FStId: v.FStId,
        Mid: 31,
        UserId: sessionStorage.getItem('FStId')
      }
      getQrCode(pp).then(res => {
        console.log(res)
        this.codeId = res.Data
      })
      this.$axios({
        method: 'get',
        url:
          httpers +
          '/SVPrint/TicketPrint.ashx?earTagPrint=' +
          this.earTagPrint +
          '&TicketType=' +
          this.TicketType +
          '&FSuserId=' +
          this.UserId +
          '&FStid=' +
          this.printFStId
      }).then(res => {
        // console.log(res.data.indexOf('..\\Jsonashx\\BitmapQRCode.ashx'))
        // console.log(res.data.replace('..\\Jsonashx\\BitmapQRCode.ashx', 'http://www.miliotech.com:8886\\QingDaoZhuiSuPT\\Jsonashx\\BitmapQRCode.ashx'))
        this.printInfo = res.data.replace('..\\Jsonashx\\BitmapQRCode.ashx', 'http://www.miliotech.com:8886\\QingDaoZhuiSuPT\\Jsonashx\\BitmapQRCode.ashx')
        // this.printTF = true
         console.log(this.printInfo)

        // }, 100)
      })
    },
    update (v) {
      console.log('修改' + v.FStId)
      this.formType = 'update'
      var p = {
        FStId: v.FStId,
        UserId: this.UserId
      }
      FindInfoByFStId(p)
        .then(res => {
          console.log(res)
          if (res.Result) {
            this.updateinfo = true
            this.$nextTick(() => {
              var datalist = res.Data
              this.form.setFieldsValue(datalist)
              this.form.setFieldsValue({ xiaoduSel: datalist.PDisinfection })
            })
          } else {
            this.$notification.info({ message: '未查询到任何信息' })
            // this.$notification.info({ message: res.Msg })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notification.info({ message: '系统繁忙，请稍后再试' })
        })
    },
    delet (v) {
      this.number = v.FStId
      this.deletinfo = true
    },
    //  from表单验证
    handleSubmit (e) {
      e.preventDefault()
      var that = this
      var PUnitName = this.form.getFieldValue('PUnitName')
      var PProductionunit = this.form.getFieldValue('PProductionunit')
      var PPumAdd = PUnitName + ' ' + PProductionunit
      this.form.setFieldsValue({ PMemo4: PPumAdd }) // 生产单位名称地址

      var PSheng = this.form.getFieldValue('PSheng')
      var PShi = this.form.getFieldValue('PShi')
      var PXian = this.form.getFieldValue('PXian')
      var PDiDian = this.form.getFieldValue('PDiDian')
      var PDestinations = PSheng + PShi + PXian + PDiDian
      this.form.setFieldsValue({ PMemo2: PDestinations }) // 目的地

      this.form.validateFields((err, v) => {
        console.log(v)
        if (!err) {
          var p = v
          p.UserId = that.UserId
          p.PMemo2 = '' +
            this.form.getFieldValue('PSheng') +
            this.form.getFieldValue('PShi') +
            this.form.getFieldValue('PXian') +
            this.form.getFieldValue('PDiDian')
          // 新增
          if (that.formType === 'add') {
            console.log(p)
            AddInfo(p)
              .then(res => {
                console.log(res)
                // setTimeout(() => {
                //   this.$notification.success({
                //     message: '检疫证编号不属于本人，或已存在'
                //   })
                // }, 100)
                if (res.Result) {
                  this.formType = ''
                  this.$notification.success({
                    message: res.Msg
                  })
                  this.visibleTF = false
                  this.reload()
                } else {
                  this.$notification.error({
                    message: res.Msg
                  })
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
          // 修改
          if (that.formType === 'update') {
            var parm = { FStId: v.FStId, UserId: this.UserId }
            FindInfoByFStId(parm).then(res => {
              console.log(JSON.stringify(parm))
              console.log(JSON.stringify(res))
              var result = res.Data // 查询最新后台的数据（包含除页面上的数据）
              for (var i in p) {
                result[i] = p[i]
              } // 当前页面修改后的数据更新至后台
              UpdateInfo(result)
                .then(res => {
                  console.log(JSON.stringify(res) + '@@@@')
                  setTimeout(() => {
                    this.$notification.success({
                      message: res.Msg
                    })
                  }, 100)
                  if (res.Result) {
                    this.formType = ''
                    this.updateinfo = false
                    this.reload()
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            })
          }
        } else {
          this.$notification.error({
            message: '请检查输入信息'
          })
        }
      })
    },
    handleDeletOk () {
      // 删除
      this.confirmLoading = true
      var p = {
        FStId: this.number,
        UserId: this.UserId
      }
      console.log(JSON.stringify(p))
      DeleteInfo(p)
        .then(res => {
          var result = res.Result
          var Msg = res.Msg
          setTimeout(() => {
            this.$notification.success({
              message: Msg
            })
          }, 100)
          if (result) {
            this.deletinfo = false
            this.confirmLoading = false
            this.form.resetFields()
            this.reload()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 选择货主信息
    findShipper () {
      var p = {
        offset: this.offsetHz,
        limit: this.limitHz,
        PCargoOwner: this.PCargoOwner,
        UserId: this.UserId
      }
      // console.log(JSON.stringify(p))
      FindShipperInfo(p)
        .then(res => {
          this.selectShipperinfo = true
          console.log(JSON.stringify(res) + '@@@@')
          if (res.Data) {
            var datalist = JSON.parse(res.Data)
            this.shu = datalist.rows
            this.tt = parseInt(datalist.total)
          } else {
            this.$notification.info({ message: '未查询到任何信息' })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notification.info({ message: '系统繁忙，请稍后再试' })
        })
    },
    tiao (data) {
      this.offsetHz = data.offset
      this.limitHz = data.limit
      this.PCargoOwner = data.selectWhere ? data.selectWhere : ''
      console.log(JSON.stringify(data) + '@@@')
      this.findShipper()
    },
    father (data) {
      console.log(JSON.stringify(data) + '@@@@选择的数据')
      this.selectShipperinfo = false
      this.$nextTick(() => {
        this.form.setFieldsValue({
          PCargoOwner: data.PCargoOwner, // 货主
          PPhone: data.PPhone, // 联系电话
          PName: data.PName, // 产品名称
          // 用户信息取值？ PUnitName: data.PUnitName, // 生产单位名称
          // PProductionunit: data.PProductionunit, // 生产单位地址
          PSheng: data.PSheng, // 省
          PShi: data.PShi, // 市
          PXian: data.PXian, // 县
          PCarrier: data.PCarrier, // 承运人
          PPhoneCyr: data.PPhoneCyr, // 承运人联系电话
          PTrademark: data.PTrademark, // 工具号牌
          PDisinfection: data.PDisinfection, // 运载工具牌号
          PDwPhone: data.PDwPhone, // 动物卫生监督所联系电话
          PQuantity: data.PQuantity,
          PUnitName: data.PUnitName,
          PProductionunit: data.PProductionunit
        })
      })
    },
    handleCancelHZ (e) {
      this.selectShipperinfo = false
      this.PCargoOwner = ''
    },
    // 弹窗关闭
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visibleTF = false
        this.updateinfo = false
        this.findinfo = false
        this.deletinfo = false
        this.confirmLoading = false
        this.formType = ''
        this.form.resetFields()
      }, 100)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visibleTF = false
      this.updateinfo = false
      this.findinfo = false
      this.deletinfo = false
      this.printTF = false
      this.formType = ''
      this.selectedRowKeys1 = []
      this.form.resetFields()
    }
  }
}
</script>
<style scoped>
@media print {
  #printNew #qrcode{
   margin-left: -100px;
  }
  .infoTop{
    width:420px;
    margin-bottom: 40px;
  }
}
.zhang {
  width: 150px;
  height: 90px;
  position: absolute;
  left: 40%;
  top: 10px;
}
.infoTop {
  display: inline-block;
  margin-left: 50%;
  color: #754946;
  transform: translateX(-50%);
  /* font-size: 30px; */
}
.hao {
  color: red;
  font-size: 15px;
  margin-left: 70%;
  display: inline-block;
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
.tbClass {
  width: 100%;
  line-height: 60px;
}

.tbClass td {
  border: 1px solid #754946;
  padding: 0 20px;
  width: 25%;
}
.tbClass td:nth-child(1),
td:nth-child(3) {
  text-align: center;
}
</style>
