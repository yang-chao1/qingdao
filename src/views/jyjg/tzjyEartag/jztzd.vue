<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="屠宰场名称">
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
                      :defaultValue="getCurrentDate()"
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
            <a-button type="primary" @click="pil" style="height:40px">批量删除</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
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
              title="动物急宰通知书新增"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
              :zIndex="500"
              :destroyOnClose="true"
            >
              <a-form @submit="handleSubmit" :form="form">
                <h2 style="text-align:center"><b>动物急宰通知书</b></h2>
                <a-row type="flex" justify="end">
                  <a-col :span="12">
                    <a-form-item
                      label="No"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['FNumber', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="屠宰场名称"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['TName', { rules: [{ required: true, message: '请选择' }] }]"> </a-input>
                      <a-input style="display:none" v-decorator="['FTzcid', { initialValue: '1' }]" placeholder="屠宰场ID" />
                    </a-form-item>
                  </a-col>
                </a-row>

                <!-- <a-col :span="12">
                    <a-form-item
                      label="申报单编号"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 13 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['QCPNumber', { rules: [{ required: true, message: '请输入' }] }]"
                        style="width:90%"
                      />
                      <a-button
                        type="primary"
                        @click="findQCPNumberInfo"
                        style="position: absolute; margin: 3px 10px">
                        选择
                      </a-button>
                    </a-form-item>
                  </a-col> -->

                <a-row>
                  <a-col :span="24">
                    <a-form-item>
                      <span
                        style="margin-left:7%"
                      >依据《中华人民共和国动物防疫法》和国家有关检疫标准的规定，对你厂（场、点）的</span
                      >
                      <a-input
                        v-decorator="['Fruc', { rules: [{ required: true, message: '请输入' }] }]"
                        style="width:80px;margin:5px"
                      />
                      <a-select
                        v-decorator="['FUnit', { rules: [{ required: true, message: '请选择' }] }]"
                        style="width:100px;margin:5px"
                        @select="SetFUnit($event)"
                      >
                        <a-select-option value="头">头</a-select-option>
                        <a-select-option value="只">只</a-select-option>
                        <a-select-option value="羽">羽</a-select-option>
                        <a-select-option value="匹">匹</a-select-option>
                        <a-select-option value="箱">箱</a-select-option>
                        <a-select-option value="尾">尾</a-select-option>
                        <a-select-option value="其他">其他</a-select-option>
                      </a-select>
                      <a-select
                        v-decorator="['QCProduct', { rules: [{ required: true, message: '请选择' }] }]"
                        style="width:100px"
                      >
                        <a-select-option value="马">马</a-select-option>
                        <a-select-option value="猪">猪</a-select-option>
                        <a-select-option value="牛">牛</a-select-option>
                        <a-select-option value="羊">羊</a-select-option>
                        <a-select-option value="鹿">鹿</a-select-option>
                        <a-select-option value="骆驼">骆驼</a-select-option>
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
                      实施宰前检查。
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-form-item>
                    <span style="margin-left:7%">经宰前检查，因</span>
                    <a-input
                      v-decorator="['FReason', { rules: [{ required: true, message: '请输入' }] }]"
                      name="xx2"
                      style="width:260px;margin:5px"
                    />
                    原因。其中
                    <a-input
                      v-decorator="['FCount', { rules: [{ required: true, message: '请输入' }] }]"
                      style="width:80px;margin:5px"
                    />{{ FUnit }}
                    须作急宰处理。
                  </a-form-item>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="负责人"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['FSm1', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-form-item>
                      <span style="margin-left:7%">经官方兽医批准，予以急宰</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="动物卫生监督机构"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['FHygiene', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="官方兽医（签名）"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="[
                          'FVeterinary',
                          { rules: [{ required: true, message: '请输入' }], initialValue: loggedUserName }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="end">
                  <a-col :span="12">
                    <a-form-item
                      label="日期"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <!-- <a-input
                        v-decorator="['FDate', { rules: [{ required: true, message: '请输入' }] }]"
                      /> -->
                      <a-date-picker
                        v-decorator="[
                          'FDate',
                          { rules: [{ required: true, message: '请输入' }], initialValue: getCurrentDate() }
                        ]"
                        style="width: 100%"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                  <a-button type="primary" html-type="submit" style="width:315px; height: 40px;">
                    确认
                  </a-button>
                </a-form-item>
              </a-form>
            </a-modal>
            <!-- 修改弹窗  -->
            <a-modal
              title="动物急宰通知书修改"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="1000px"
              :zIndex="500"
              :destroyOnClose="true"
            >
              <a-form @submit="handleSubmit" :form="form">
                <h2 style="text-align:center"><b>动物急宰通知书</b></h2>
                <a-form-item>
                  <a-input style="display:none" v-decorator="['FStId']" placeholder="主键Id" />
                </a-form-item>
                <a-row type="flex" justify="end">
                  <a-col :span="12">
                    <a-form-item
                      label="No"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['FNumber', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="屠宰场名称"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 13 }, sm: { span: 17 } }"
                    >
                      <!-- <a-select
                        v-decorator="['TName', { rules: [{ required: true, message: '请选择' }],initialValue:'青岛正大食品有限公司'}]"
                        @select="getFTzcidVal()"
                      >
                        <a-select-option value="青岛正大食品有限公司">
                          青岛正大食品有限公司
                        </a-select-option>
                      </a-select> -->
                      <a-input
                        v-decorator="[
                          'TName',
                          { rules: [{ required: true, message: '请选择' }], initialValue: '青岛正大食品有限公司' }
                        ]"
                      ></a-input>
                      <a-input style="display:none" v-decorator="['FTzcid']" placeholder="屠宰场ID" />
                    </a-form-item>
                  </a-col>
                </a-row>

                <!-- <a-col :span="12">
                    <a-form-item
                      label="申报单编号"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['QCPNumber', { rules: [{ required: true, message: '请输入' }] }]"
                        style="width:90%"
                      />
                      <a-button
                        @click="findQCPNumberInfo"
                        style="position: absolute; margin: 3px 10px">
                        选择
                      </a-button>
                    </a-form-item>
                  </a-col> -->

                <a-row>
                  <a-col :span="24">
                    <a-form-item>
                      <span
                        style="margin-left:7%"
                      >依据《中华人民共和国动物防疫法》和国家有关检疫标准的规定，对你厂（场、点）的</span
                      >
                      <a-input
                        v-decorator="['Fruc', { rules: [{ required: true, message: '请输入' }] }]"
                        style="width:80px;margin:5px"
                      />
                      <a-select
                        v-decorator="['FUnit', { rules: [{ required: true, message: '请选择' }] }]"
                        style="width:100px;margin:5px"
                        @select="SetFUnit($event)"
                      >
                        <a-select-option value="头">头</a-select-option>
                        <a-select-option value="只">只</a-select-option>
                        <a-select-option value="羽">羽</a-select-option>
                        <a-select-option value="匹">匹</a-select-option>
                        <a-select-option value="箱">箱</a-select-option>
                        <a-select-option value="尾">尾</a-select-option>
                        <a-select-option value="其他">其他</a-select-option>
                      </a-select>
                      <a-select
                        v-decorator="['QCProduct', { rules: [{ required: true, message: '请选择' }] }]"
                        style="width:100px"
                      >
                        <a-select-option value="马">马</a-select-option>
                        <a-select-option value="猪">猪</a-select-option>
                        <a-select-option value="牛">牛</a-select-option>
                        <a-select-option value="羊">羊</a-select-option>
                        <a-select-option value="鹿">鹿</a-select-option>
                        <a-select-option value="骆驼">骆驼</a-select-option>
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
                      实施宰前检查。
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-form-item>
                    <span style="margin-left:7%">经宰前检查，因</span>
                    <a-input
                      v-decorator="['FReason', { rules: [{ required: true, message: '请输入' }] }]"
                      name="xx2"
                      style="width:260px;margin:5px"
                    />
                    原因。其中
                    <a-input
                      v-decorator="['FCount', { rules: [{ required: true, message: '请输入' }] }]"
                      style="width:80px;margin:5px"
                    />{{ FUnit }}
                    须作急宰处理。
                  </a-form-item>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="负责人"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['FSm1', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-form-item>
                      <span style="margin-left:7%">经官方兽医批准，予以急宰</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="动物卫生监督机构"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['FHygiene', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="官方兽医（签名）"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['FVeterinary', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="end">
                  <a-col :span="12">
                    <a-form-item
                      label="日期"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <!-- <a-input
                        v-decorator="['FDate', { rules: [{ required: true, message: '请输入' }] }]"
                      /> -->
                      <a-date-picker
                        v-decorator="[
                          'FDate',
                          { rules: [{ required: true, message: '请输入' }], initialValue: getCurrentDate() }
                        ]"
                        style="width: 100%"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                  <a-button type="primary" html-type="submit" style="width:315px; height: 40px;">
                    确认
                  </a-button>
                </a-form-item>
              </a-form>
            </a-modal>
            <!-- 查看弹窗 -->
            <a-modal
              title="动物急宰通知书详情"
              :visible="findinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="1000px"
              :destroyOnClose="true"
            >
              <div>
                <h2 style="text-align:center"><b>动物急宰通知书</b></h2>
                <template>
                  <a-row type="flex" justify="end"> No：{{ findList.FNumber }} </a-row>
                  <a-row>
                    <a-form-item> {{ findList.TName }}： </a-form-item>
                  </a-row>
                  <a-row>
                    <a-form-item>
                      <span
                        style="margin-left:3%"
                      >依据《中华人民共和国动物防疫法》和国家有关检疫标准的规定，对你厂（场、点）的
                        {{ findList.Fruc }} {{ findList.FUnit }} {{ findList.QCProduct }} 实施宰前检查。经宰前检查，因
                        {{ findList.FReason }} 原因。其中 {{ findList.FCount }}
                        {{ findList.FUnit }} 须作急宰处理。</span
                      >
                    </a-form-item>
                  </a-row>
                  <a-row>
                    <a-form-item>
                      <span style="margin-left:3%">负责人： {{ findList.FSm1 }}</span>
                    </a-form-item>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item>
                        <span style="margin-left:3%">经官方兽医批准，予以急宰</span>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item>
                        <span style="float:right;">动物卫生监督机构： {{ findList.FHygiene }}</span>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row type="flex" justify="end">
                    <a-form-item> 官方兽医签名： {{ findList.FVeterinary }} </a-form-item>
                  </a-row>
                  <a-row type="flex" justify="end">
                    <!-- <a-form-item>
                    </a-form-item> -->
                    {{ findList.FDate }}
                  </a-row>
                </template>
              </div>
            </a-modal>
            <!-- 删除弹窗 -->
            <a-modal
              okText="确认"
              cancelText="取消"
              title="删除"
              :visible="deletinfo"
              :confirm-loading="confirmLoading"
              @ok="handleDeletOk"
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
          </div>
          <!-- 弹出层根据申报单编号选择信息 -->
          <a-modal
            :footer="null"
            title="选择申报单信息"
            :visible="selectSbdinfo"
            :confirm-loading="confirmLoading"
            @cancel="handleCancelSbd"
            width="800px"
            :zIndex="1000"
            :destroyOnClose="true"
          >
            <div>
              <span>关键字:</span>
              <a-input v-model="keyWord" style="width:220px;margin-left:1%" />
              <a-button style="position: absolute; margin-left:1%;">
                搜索
              </a-button>
            </div>
            <a-table
              :pagination="false"
              :columns="columnsSbd"
              :data-source="dataSbd"
              :scroll="{ x: 1300 }"
              style="margin-top:5px;"
            >
              <!-- :row-selection="{selectedRowKeys: selectedRowKeysSbd, onChange: onSelectChangeSbd,type:'radio'} " -->
              <template slot="action" slot-scope="text, record">
                <a slot="action" @click="selectedSbdData(record)">选择&nbsp;&nbsp;</a>
              </template>
            </a-table>
            <div>
              <a-pagination
                show-quick-jumper
                :default-current="offsetSbd"
                :total="totalnumSbd"
                show-less-items
                @change="onChangeSbd"
                :current="offsetSbd"
                style="margin: 10px"
              />
              <span
                style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
              >当前第 {{ this.yenumSbd }}/{{ Math.ceil(this.totalnumSbd / 10) }} 页 共 {{ this.totalnumSbd }} 条记录
                每页 10 条</span
              >
            </div>
          </a-modal>
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
              <span v-show="findTF">

                <a slot="action" @click="find(record)">查看&nbsp;&nbsp;</a>

              </span>
              <span v-show="updateTF">
                <a slot="action" @click="update(record)">修改&nbsp;&nbsp;</a>
              </span>
              <!-- <a slot="action" @click="delet(record)">删除&nbsp;&nbsp;</a> -->
            </template></a-table>
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
          </div></div></div></page-header-wrapper></div></template>
          </a-table>
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
// 接口请求调用

import {
  FindAllInfo,
  AddInfo,
  FindInfoByFStId,
  UpdateInfo,
  DeleteInfo,
  FindSbdInfo,
  getNumberInfo
} from '@/api/tzjyEb/jztzd.js'
import formatTime from '@/utils/public.js'
// eslint-disable-next-line no-irregular-whitespace
import { GettzcsbdaddressInfo } from '@/api/tzjyEb/AnimaJyzmA.js'
import getKey from '@/utils/keyCheck.js'
import { getAdminAddress } from '@/api/AdministrativeAddress'
// 当前页
var yenum1 = 1
// var yenum1Sbd = 1
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
  { title: '编号', width: 200, align: 'center', dataIndex: 'FNumber', key: 'FNumber' },
  { title: '屠宰场名称', width: 200, align: 'center', dataIndex: 'TName', key: 'TName' },
  { title: '数量', width: 200, align: 'center', dataIndex: 'Fruc', key: 'Fruc' },
  { title: '单位', width: 200, align: 'center', dataIndex: 'FUnit', key: 'FUnit' },
  { title: '动物种类', width: 220, align: 'center', dataIndex: 'QCProduct', key: 'QCProduct' },
  { title: '急宰原因', width: 280, align: 'center', dataIndex: 'FReason', key: 'FReason' },
  { title: '急宰数量', width: 200, align: 'center', dataIndex: 'FCount', key: 'FCount' },
  { title: '动物卫生监督机构', width: 200, align: 'center', dataIndex: 'FHygiene', key: 'FHygiene' },
  { title: '官方兽医签名', width: 220, align: 'center', dataIndex: 'FVeterinary', key: 'FVeterinary' },
  { title: '时间', width: 200, align: 'center', dataIndex: 'FDate', key: 'FDate' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 150,
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]

// const data = [{
//     xx0: 'T02121',
//     xx1: '即墨市店集东里生猪屠宰场',
//     xx2: '2020-09-23'
//   }]

const columnsSbd = [
  { title: '申报单编号', width: 200, align: 'center', dataIndex: 'QCPNumber', key: 'QCPNumber' },
  { title: '动物种类', width: 150, align: 'center', dataIndex: 'QCProduct', key: 'QCProduct' },
  { title: '申报数量', width: 150, align: 'center', dataIndex: 'QCPQuantity', key: 'QCPQuantity' },
  { title: '申报人姓名', width: 200, align: 'center', dataIndex: 'SBRMC', key: 'SBRMC' },
  { title: '联系电话', width: 150, align: 'center', dataIndex: 'QCPPhone', key: 'QCPPhone' },
  { title: '单位', width: 150, align: 'center', dataIndex: 'QCPDanWei', key: 'QCPDanWei' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 150,
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
 // 权限控制
    var findTF = true
     var updateTF = true
export default {
  inject: ['reload'], // 页面刷新this.reload()使用
  data () {
    return {
      totalnum: 0, // 总条数
      yenum: 1, // 当前页
      DWtotal: 0, // 单位总数
      offset: 1, // 当前选择页数
      limit: 10, // 每页条数
      options: [],
      // 申报单列表
      totalnumSbd: 0, // 总条数
      yenumSbd: 1, // 当前页
      offsetSbd: 1, // 当前选择页数
      limitSbd: 10, // 每页条数
      columnsSbd,
      dataSbd: [],
      findTF,
      updateTF,

      selectedRowKeysSbd: [],
      keyWord: '',
      // 模糊查询当前页
      findBynameyenum: 1,
      idList: '',
      queryParam: {},
      formType: '',
      columns,
      data: [],
      selectwhere: '',
      UserId: sessionStorage.getItem('FStId'),
      loggedUserName: sessionStorage.getItem('FuName'), // 当前登录用户
      // from 表单
      form: this.$form.createForm(this),
      number: 0,
      FUnit: '', // 单位
      findList: [],

      // 点击 弹出框
      visible: false,
      f: true,
      updateinfo: false,
      findinfo: false,
      deletinfo: false,
      confirmLoading: false,
      selectSbdinfo: false, // 申报单信息弹窗
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      selectedRowKeys1: [],
      loading: false,
      unitID: '',
      mocheckInfo: '',
      moFSunitUstrId: ''

    }
  },

  created () {
    // 权限控制
    findTF = true
    yenum1 = 1
    getAdminAddress()
      .then(res => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
      })
      .catch(rol => {
        console.log(rol)
      })
    this.findAll()
  },
  methods: {

    // 模糊查询
    mocheck (che, val) {
      yenum1 = 1
      this.limit = 10
        this.offset = 1
      console.log(che, val)
      if (!val) {
        this.selectwhere = this.mocheckInfo
        this.unitID = this.moFSunitUstrId
      } else {
        if (val.length) {
          this.selectwhere = this.mocheckInfo
          this.unitID = getKey(this.options, val[0])
        } else {
          this.selectwhere = this.mocheckInfo
          this.unitID = this.moFSunitUstrId
        }
      }
      this.findAll()
    },
    getCurrentDate () {
      var currentDate = formatTime(null, 'yyyy-MM-dd hh:mm:ss')
      return currentDate
    },
    findAll () {
      var that = this
      var p = {
        limit: that.limit,
        offset: that.offset,
        selectwhere: that.selectwhere,
        UserId: this.UserId,
        unitID: this.unitID
      }
      FindAllInfo(p)
        .then(res => {
          if (res.Result) {
            // console.log(JSON.stringify(res))
            if (res.Data && res.Data !== '') {
              var datalist = JSON.parse(res.Data)
              datalist.rows.forEach(item => {
                item.FDate = formatTime(item.FDate, 'yyyy-MM-dd')
              })
              this.data = datalist.rows
              this.totalnum = parseInt(datalist.total)
            } else {
              this.$notification.error({ message: '未查询到任何信息' })
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
    onSelectChange (selectedRowKeys, selectedRow) {
      // 选中行
      console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRow)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRow = selectedRow
      var arr = ''
      selectedRow.forEach(item => {
        arr = arr + ',' + item.FStId
      })

      this.idList = arr.substring(1)
    },
    // getFTzcidVal (obj) { // 获取屠宰场Id
    //  var p = {
    //       FNumber: obj,
    //       UserId: this.UserId
    //   }
    //   GetFTzcid(p)
    //     .then(res => {
    //       console.log(JSON.stringify(res) + '@@@@')
    //         var FTzcid = res.FTzcid
    //         this.form.setFieldsValue({ FTzcid: FTzcid })
    //     })
    // },
    SetFUnit (obj) {
      this.FUnit = obj
    },
    pil () {
      const p = {
        FStId: this.idList,
        UserId: this.UserId
      }
      DeleteInfo(p)
        .then(res => {
          this.$message.success('删除成功')
        })
        .catch(res => {
          this.$message.error('删除失败')
        })
      yenum1 = 1
      this.idList = ''
      this.reload()
    },
    // 弹窗
    showModal (formName) {
      const allinfo = JSON.parse(localStorage.getItem('AllInfo'))
      console.log(allinfo.FSunitName)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({ FHygiene: allinfo.FSunitName })

        GettzcsbdaddressInfo(this.UserId).then(res => {
          console.log(res.Data.FGlid)
          this.form.setFieldsValue({ TName: res.Data.FsbdName })
          this.form.setFieldsValue({ FTzcid: res.Data.FGlid })
        })
        getNumberInfo(this.UserId)
          .then(res => {
            // 获取No编号
            console.log(res)
            this.form.setFieldsValue({ FNumber: res.FNumber })
          })
          .catch(rol => {
            console.log(rol)
          })
      })

      this.formType = 'add'
    },
    find (v) {
      var p = {
        FStId: v.FStId,
        UserId: this.UserId
      }
      FindInfoByFStId(p).then(res => {
        if (res.Result) {
          this.findinfo = true
          this.$nextTick(() => {
            res.Data[0].FDate = formatTime(res.Data.FDate, 'yyyy年MM月dd日')
            this.findList = res.Data[0]
          })
        } else {
          this.$notification.info({ message: '未查询到任何信息' })
        }
      })
    },
    update (v) {
      console.log('修改' + v.FStId)
      this.formType = 'update'
      var p = {
        FStId: v.FStId,
        UserId: this.UserId
      }
      var that = this
      FindInfoByFStId(p).then(res => {
        console.log(JSON.stringify(res) + '@@@@')
        if (res.Result) {
          this.updateinfo = true
          that.$nextTick(() => {
            var datalist = res.Data
            this.form.setFieldsValue(datalist[0])
            this.form.setFieldsValue({ FStId: v.FStId })

            this.FUnit = datalist[0].FUnit
          })
        } else {
          this.$notification.info({ message: '未查询到任何信息' })
          // this.$notification.info({ message: res.Msg })
        }
      })
    },
    delet (v) {
      this.number = v.FStId
      this.deletinfo = true
    },
    // 弹窗关闭
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
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
      this.visible = false
      this.updateinfo = false
      this.findinfo = false
      this.deletinfo = false
      this.formType = ''
      this.FUnit = ''
      // this.selectedRowKeys1 = []
      this.form.resetFields()
    },
    // 申报单弹窗操作
    findQCPNumberInfo () {
      // const QCPNumberVal = this.form.getFieldValue('QCPNumber')
      var p = {
        offsetSbd: this.offsetSbd,
        limitSbd: this.limitSbd,
        QCPNumber: '',
        UserId: this.UserId
      }
      // console.log(JSON.stringify(p))
      FindSbdInfo(p)
        .then(res => {
          if (res.Result) {
            this.selectSbdinfo = true
            console.log(JSON.stringify(res))
            if (res.Data) {
              var datalist = JSON.parse(res.Data)
              this.dataSbd = datalist.rows
              this.totalnumSbd = parseInt(datalist.total)
            }
          } else {
            this.$notification.info({ message: '系统繁忙，请稍后再试' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 申报单弹窗分页方法
    onChangeSbd (checkedValues) {
      this.selectedRowKeysSbd = []
      console.log('checked = ', checkedValues)
      this.yenumSbd = checkedValues
      this.offsetSbd = checkedValues
      // yenum1Sbd = checkedValues
      this.findQCPNumberInfo()
    },
    // onSelectChangeSbd (selectedRowKeys, selectedRows) {
    //    console.log(selectedRowKeys)
    //     this.selectedRowKeysSbd = selectedRowKeys
    //    if (selectedRows) {
    //      var dataRow = selectedRows[0]
    //      console.log(JSON.stringify(dataRow))
    //     this.selectSbdinfo = false
    //     this.$nextTick(() => {
    //       this.form.setFieldsValue({
    //         QCPNumber: dataRow.QCPNumber, // 申报单编号
    //         FUnit: dataRow.QCPDanWei, // 单位
    //         QCProduct: dataRow.QCProduct, // 动物种类
    //         FCount: dataRow.QCPQuantity // 申报数量
    //       })
    //     })
    //   }
    // },
    selectedSbdData (data) {
      // 选择申报单后填充form数据
      console.log(JSON.stringify(data) + '@选择的申报单数据')
      this.selectSbdinfo = false
      this.$nextTick(() => {
        this.selectSbdinfo = false
        this.$nextTick(() => {
          this.form.setFieldsValue({
            QCPNumber: data.QCPNumber, // 申报单编号
            FUnit: data.QCPDanWei, // 单位
            QCProduct: data.QCProduct, // 动物种类
            FCount: data.QCPQuantity // 申报数量
          })
          this.FUnit = data.QCPDanWei
        })
      })
    },
    handleCancelSbd (e) {
      this.selectSbdinfo = false
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
    //  from表单验证
    handleSubmit (e) {
      e.preventDefault()
      var that = this
      this.form.validateFields((err, v) => {
        console.log(v)
        if (!err) {
          var p = v
          p.UserId = that.UserId
          // 新增
          if (that.formType === 'add') {
            console.log(JSON.stringify(p) + '修改的数据')
            AddInfo(p)
              .then(res => {
                console.log(JSON.stringify(res) + '@@@@')
                setTimeout(() => {
                  this.$notification.success({
                    message: res.Msg
                  })
                }, 100)
                if (res.Result) {
                  this.fromdata = ''
                  this.visible = false
                  this.reload()
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
          // 修改
          if (that.formType === 'update') {
            UpdateInfo(p)
              .then(res => {
                console.log(JSON.stringify(res) + '@@@@')
                setTimeout(() => {
                  this.$notification.success({
                    message: res.Msg
                  })
                }, 100)
                if (res.Result) {
                  this.fromdata = ''
                  this.updateinfo = false
                  this.reload()
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        }
      })
    }
  }
}
</script>
<style scoped>
.btn[data-v-7b4fe6ed] {
  width: 129%;
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
