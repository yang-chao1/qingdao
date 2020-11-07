<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="法人代表或养殖场名称">
                    <a-input v-model="queryParam.id" placeholder="" size="large" style="width: 100%" @blur="mocheck" />
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary" style="height:40px" @click="mocheck">查询</a-button>
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
                <!-- <a-col :md="8" :sm="24">
                <a-form-item label="使用状态">
                  <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0" style="width: 80px">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col> -->
                <a-col :md="8" :sm="24">
                  <a-form-item label="使用状态">
                    <a-select placeholder="请选择" default-value="0">
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
                    <!-- <a-button v-permission="{active:'firsele'}" type="primary" style="height:40px" @click="mocheck">查询</a-button> -->
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
            <!-- 查看 -->
            <a-modal
              title="疫苗申请详情"
              :visible="fintinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
              :footer="null"
              :zIndex="100"
              destroyOnClose
            >
              <!--申请进度模块  -->
              <div>
                <a-card :bordered="false" title="申请进度">
                  <a-steps :current="applyPlan" progressDot>
                    <a-step>
                      <template v-slot:title>
                        <span>疫苗申请</span>
                      </template>
                    </a-step>
                    <a-step>
                      <template v-slot:title>
                        <span>基层动检站审核</span>
                      </template>
                    </a-step>
                    <a-step title="区市畜牧主管部门审核" />
                    <a-step title="市级主管部门审核" />
                  </a-steps>
                </a-card>
              </div>
              <!--基本信息模块  -->
              <div class="all">
                <p>基本信息</p>

                <a-form @submit="handleSubmit" :form="basicInfoForm">
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="养殖场名称"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['FyzName']" disabled />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="养殖畜种"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Fyzxz']" disabled />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="法定代表人"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Ffddbr']" disabled />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="联系方式"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Flxfs']" disabled />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="账号"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Fzh', { rules: [{ required: true, message: '请输入' }] }]" disabled />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="开户行"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Fkhh', { rules: [{ required: true, message: '请输入' }] }]" disabled />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="实时存栏数"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['Fcunls', { rules: [{ required: true, message: '请输入' }] }]"
                          disabled
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="实免数（头/只）"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Fsms', { rules: [{ required: true, message: '请输入' }] }]" disabled />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="疫苗种类"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Fymzl', { rules: [{ required: true, message: '请输入' }] }]" disabled />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="申请补贴数"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['Fsqbts', { rules: [{ required: true, message: '请输入' }] }]"
                          disabled
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="17">
                      <a-form-item
                        label="地址"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 15 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Fdz']" disabled />
                      </a-form-item>
                    </a-col>
                    <!-- <a-col :span="12">
                      <a-form-item
                        label="一卡通号"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['yikatonghao', { rules: [{ required: true, message: '请输入' }] }]"
                          disabled
                        />
                      </a-form-item>
                    </a-col> -->
                  </a-row>
                </a-form>
                <p style="margin-left: 30px;">申请人所在位置：{{ GPSFSm4 }}</p>
              </div>
              <!-- 查看里的 购买信息模块 -->
              <div class="all">
                <p>购买信息</p>
                <a-table :columns="columns1" :data-source="shopInfo" style="width:900px; margin: 0 auto;">
                  <!-- <a slot="name" slot-scope="text">{{ text }}</a> -->
                </a-table>
              </div>
              <!-- 查看里的 附件管理模块 -->
              <div class="all fujianguanli">
                <p>附件管理</p>
                <div>
                  <viewer :images="photoPro" class="photos">
                    <!-- //photo 一定要一个数组，否则报错 -->
                    <span>与当地畜牧兽医主管部门签订的承诺书</span>
                    <img
                      v-for="(item, index) in photoPro"
                      :src="item ? item : ''"
                      :key="index"
                      alt="承诺书"
                      style="width:60px; height:60px;"
                    />
                  </viewer>
                </div>
                <div>
                  <viewer :images="photoVase" class="photos">
                    <!-- //photo 一定要一个数组，否则报错 -->
                    <span>已使用疫苗空瓶照片</span>
                    <img
                      v-for="(item, index) in photoVase"
                      :src="item ? item : ''"
                      :key="index"
                      alt="已使用疫苗空瓶"
                      style="width:60px; height:60px;"
                    />
                  </viewer>
                </div>
                <div>
                  <viewer :images="photoRep" class="photos">
                    <!-- //photo 一定要一个数组，否则报错 -->
                    <span
                    >具有资质的兽医实验室出具相关强制免疫疫苗 免疫抗体检测报告原件（上半年、下半年各一
                      份）,免疫抗体合格率并达到国家规定标准
                    </span>
                    <img
                      v-for="(item, index) in photoRep"
                      :src="item ? item : item"
                      :key="index"
                      alt="报告原件"
                      style="width:60px; height:60px;"
                    />
                  </viewer>
                </div>
              </div>
              <!-- 查看里的  实际注射疫苗二维码信息模块 -->
              <div class="all">
                <div>
                  <p>实际注射疫苗二维码信息</p>
                  <!-- :pagination="false" -->
                  <a-table :pagination="false" :columns="columns2" :data-source="QRcordInfo" style="margin: 0 auto;">
                    <a slot="name" slot-scope="text">{{ text }}</a>
                  </a-table>
                  <a-button @click="showMore" v-show="this.QRcordInfo.length && this.fintinfo" type="primary" style="width:150px;margin:20px  0 20px calc(50% - 102px);">
                    查看更多
                  </a-button>
                </div>

                <!-- <a-form-item :wrapper-col="{ span: 12, offset: 10 }">
                  <a-button type="primary" :span="8" style="width:150px">
                    查看更多
                  </a-button> -->
                <!-- </a-form-item> -->
                <!-- 查看里面的审核状况 -->
                <div class="tab">
                  <a-form @submit="handleSubmit" :form="form" class="checkForm">
                    <!-- 申请人签字 -->
                    <a-form-item v-show="applyUserName">
                      <a-row type="flex" justify="space-between" align="bottom">
                        <a-col class="applyTrue" :span="4">
                          <div>
                            <p>申请人签字</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue" :span="8">
                          <viewer :images="[applePeoplePh.V11]">
                            <img
                              style="width: 40px;height:30px;"
                              :src="applePeoplePh.V11 ? applePeoplePh.V11 : ''"
                              alt="申请人签字"
                            />
                          </viewer>
                        </a-col>
                        <a-col class="applyTrue" :span="4">
                          <div>
                            <p>申请日期</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue applyCheck" :span="8">
                          <div>
                            <p>{{ applePeoplePh.FScTime ? applePeoplePh.FScTime.replace(/T/g, ' ') : '' }}</p>
                          </div>
                        </a-col>
                      </a-row>
                    </a-form-item>
                    <a-form-item v-show="DJZcase">
                      <!-- 基层动监站 -->
                      <a-row type="flex" justify="space-between" align="bottom">
                        <a-col class="applyTop" :span="24">
                          <div>
                            <p>基层动监站审核情况</p>
                          </div>
                        </a-col>
                      </a-row>
                      <a-row type="flex" justify="space-between" align="bottom">
                        <a-col class="applyTrue" :span="4">
                          <div>
                            <p>审核单位</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue" :span="8">
                          <p>{{ this.JDcase.Fshdw ? this.JDcase.Fshdw : '' }}</p>
                        </a-col>
                        <a-col class="applyTrue " :span="4">
                          <div>
                            <p>审核日期</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue applyCheck" :span="8">
                          <p>{{ this.JDcase.Fshrq ? this.JDcase.Fshrq.replace(/T/g, ' ') : '' }}</p>
                          <!-- <a-form-item :wrapperCol="{ lg: { span: 16 }, sm: { span: 16 } }">
                            <a-input v-decorator="['shenhetime']" disabled style="margin-left:10px;" />
                          </a-form-item> -->
                        </a-col>
                        <a-col class="applyTrue" :span="4">
                          <div>
                            <p v-show="this.JDcase.Fshyj === '同意'">审核人</p>
                            <p v-show="this.JDcase.Fshyj === '驳回'">审核状态</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue" :span="8">
                          <p v-show="this.JDcase.Fshyj === '同意'">
                            {{ this.JDcase.FSuserName ? this.JDcase.FSuserName : '' }}
                          </p>
                          <p v-show="this.JDcase.Fshyj === '驳回'">
                            {{ this.JDcase.Fshdw ? this.JDcase.Fshdw : '' }}驳回
                          </p>
                        </a-col>
                        <a-col class="applyTrue" :span="4">
                          <div>
                            <p v-show="this.JDcase.Fshyj === '同意'">审核意见</p>
                            <p v-show="this.JDcase.Fshyj === '驳回'">驳回理由</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue applyCheck" :span="8">
                          <div>
                            <p v-show="this.JDcase.Fshyj === '同意'">
                              {{ this.JDcase.Fshyj ? this.JDcase.Fshyj : '' }}
                            </p>
                            <p v-show="this.JDcase.Fshyj === '驳回'">
                              {{ this.JDcase.Fbhly ? this.JDcase.Fbhly : '' }}
                            </p>
                          </div>
                        </a-col>
                      </a-row>
                    </a-form-item>

                    <a-form-item v-show="SQcase">
                      <!-- 区市审核 -->
                      <a-row type="flex" justify="space-between" align="bottom">
                        <a-col class="applyTop" :span="24">
                          <div>
                            <p>区市畜牧主管部门审核情况</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue" :span="4">
                          <div>
                            <p>审核单位</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue" :span="8">
                          <!-- <a-form-item :wrapperCol="{ lg: { span: 16 }, sm: { span: 16 } }">
                            <a-input v-decorator="['shiqushenhedanwei']" disabled style="margin-left:10px;" />
                          </a-form-item> -->
                          <p>{{ this.QScase.Fshdw ? this.QScase.Fshdw : '' }}</p>
                        </a-col>
                        <a-col class="applyTrue" :span="4">
                          <div>
                            <p>审核日期</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue" :span="8">
                          <!-- <a-form-item :wrapperCol="{ lg: { span: 16 }, sm: { span: 16 } }">
                            <a-input v-decorator="['shiqushenhetime']" disabled style="margin-left:10px;" />
                          </a-form-item> -->
                          <p>{{ this.QScase.Fshrq ? this.QScase.Fshrq.replace(/T/g, ' ') : '' }}</p>
                        </a-col>
                        <a-col class="applyTrue" :span="4">
                          <div>
                            <p v-show="this.QScase.Fshyj === '同意'">审核人</p>
                            <p v-show="this.QScase.Fshyj === '驳回'">审核状态</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue" :span="8">
                          <div>
                            <p v-show="this.QScase.Fshyj === '同意'">
                              {{ this.QScase.FSuserName ? this.QScase.FSuserName : '' }}
                            </p>
                            <p v-show="this.QScase.Fshyj === '驳回'">
                              {{ this.QScase.Fshdw ? this.QScase.Fshdw : '' }}驳回
                            </p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue" :span="4">
                          <div>
                            <p v-show="this.QScase.Fshyj === '同意'">审核意见</p>
                            <p v-show="this.QScase.Fshyj === '驳回'">驳回理由</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue applyCheck" :span="8">
                          <div>
                            <p v-show="this.QScase.Fshyj === '同意'">
                              {{ this.QScase.Fshyj ? this.QScase.Fshyj : '' }}
                            </p>
                            <p v-show="this.QScase.Fshyj === '驳回'">
                              {{ this.QScase.Fbhly ? this.QScase.Fbhly : '' }}
                            </p>
                          </div>
                        </a-col>
                      </a-row>
                    </a-form-item>

                    <a-form-item v-show="Scase">
                      <!-- 市审核 -->
                      <a-row type="flex" justify="space-between" align="bottom">
                        <a-col class="applyTop" :span="24">
                          <div>
                            <p>市级畜牧主管部门审核</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue" :span="4">
                          <div>
                            <p>审核单位</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue" :span="8">
                          <!-- <a-form-item :wrapperCol="{ lg: { span: 16 }, sm: { span: 16 } }">
                            <a-input v-decorator="['shiqushenhedanwei']" disabled style="margin-left:10px;" />
                          </a-form-item> -->
                          <p>{{ this.SJcase.Fshdw ? this.SJcase.Fshdw : '' }}</p>
                        </a-col>
                        <a-col class="applyTrue" :span="4">
                          <div>
                            <p>审核日期</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue" :span="8">
                          <!-- <a-form-item :wrapperCol="{ lg: { span: 16 }, sm: { span: 16 } }">
                            <a-input v-decorator="['shiqushenhetime']" disabled style="margin-left:10px;" />
                          </a-form-item> -->
                          <p>{{ this.SJcase.Fshrq ? this.SJcase.Fshrq.replace(/T/g, ' ') : '' }}</p>
                        </a-col>
                        <a-col class="applyTrue" :span="4">
                          <div>
                            <p v-show="this.SJcase.Fshyj === '同意'">审核人</p>
                            <p v-show="this.SJcase.Fshyj === '驳回'">审核状态</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue" :span="8">
                          <div>
                            <p v-show="this.SJcase.Fshyj === '同意'">
                              {{ this.SJcase.FSuserName ? this.SJcase.FSuserName : '' }}
                            </p>
                            <p v-show="this.SJcase.Fshyj === '驳回'">
                              {{ this.SJcase.Fshdw ? this.SJcase.Fshdw : '' }}驳回
                            </p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue" :span="4">
                          <div>
                            <p v-show="this.SJcase.Fshyj === '同意'">审核意见</p>
                            <p v-show="this.SJcase.Fshyj === '驳回'">驳回理由</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue" :span="8">
                          <div>
                            <p v-show="this.SJcase.Fshyj === '同意'">
                              {{ this.QScase.Fshyj ? this.QScase.Fshyj : '' }}
                            </p>
                            <p v-show="this.SJcase.Fshyj === '驳回'">
                              {{ this.QScase.Fbhly ? this.QScase.Fbhly : '' }}
                            </p>
                          </div>
                        </a-col>
                      </a-row>
                    </a-form-item>
                  </a-form>
                </div>
                <!-- 查看里的 删除按钮 -->
                <!-- <a-form-item :wrapper-col="{ span: 12, offset: 10 }">
                  <a-button type="primary" :span="8" @click="lookDel" style="width:150px; margin-top: 40px">
                    删除
                  </a-button>
                </a-form-item> -->
              </div>
            </a-modal>
            <!-- 修改 -->
            <a-modal
              title="修改疫苗申请"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
              :footer="null"
              destroyOnClose
              :zIndex="100"
            >
              <!--申请进度模块  -->
              <div>
                <a-card :bordered="false" title="申请进度">
                  <a-steps :current="applyPlan" progressDot>
                    <a-step>
                      <template v-slot:title>
                        <span>疫苗申请</span>
                      </template>
                    </a-step>
                    <a-step>
                      <template v-slot:title>
                        <span>基层动检站审核</span>
                      </template>
                    </a-step>
                    <a-step title="区市畜牧主管部门审核" />
                    <a-step title="市级主管部门审核" />
                  </a-steps>
                </a-card>
              </div>
              <!--基本信息模块  -->
              <div class="all">
                <p>基本信息</p>
                <a-form @submit="handleSubmit" :form="updateBasicInfoForm">
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="养殖场名称"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['FyzName']" disabled />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="养殖畜种"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Fyzxz']" disabled />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="法定代表人"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Ffddbr']" disabled />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="联系方式"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Flxfs']" disabled />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="17">
                      <a-form-item
                        label="地址"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Fdz']" disabled />
                      </a-form-item>
                    </a-col>
                    <!-- <a-col :span="12">
                      <a-form-item
                        label="一卡通号"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['yikatonghao', { rules: [{ required: true, message: '请输入' }] }]" />
                      </a-form-item>
                    </a-col> -->
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="账号"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="[
                            'Fzh',
                            {
                              rules: [
                                { required: true, message: '请输入' },
                                { pattern: /^[a-zA-Z0-9]{1,16}$/, message: '请输入1～16位数字或字母' }
                              ]
                            }
                          ]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="开户行"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input v-decorator="['Fkhh', { rules: [{ required: true, message: '请输入' }] }]" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="实时存栏数"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="[
                            'Fcunls',
                            {
                              rules: [
                                { required: true, message: '请输入' },
                                { pattern: /^[+]{0,1}(\d+)$/, message: '请输入大于0的整数' }
                              ]
                            }
                          ]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="实免数（头/只）"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="[
                            'Fsms',
                            {
                              rules: [
                                { required: true, message: '请输入' },
                                { pattern: /^[+]{0,1}(\d+)$/, message: '请输入大于0的整数' }
                              ]
                            }
                          ]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="疫苗种类"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-select v-decorator="['Fymzl', { rules: [{ required: true, message: '请选择疫苗种类' }] }]">
                          <a-select-option value="O型口蹄疫">O型口蹄疫</a-select-option>
                          <a-select-option value="O-A型口蹄疫">O-A型口蹄疫</a-select-option>
                          <a-select-option value="H5+H7禽流感">H5+H7禽流感</a-select-option>
                        </a-select>
                        <!-- <a-input v-decorator="['Fymzl', { rules: [{ required: true, message: '请输入' }] }]" /> -->
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="申请补贴数"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="[
                            'Fsqbts',
                            {
                              rules: [
                                { required: true, message: '请输入' },
                                { pattern: /^[+]{0,1}(\d+)$/, message: '请输入大于0的整数' }
                              ]
                            }
                          ]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="申请人地址"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['shenqingrendizhi', { rules: [{ required: true, message: '请输入' }] }]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row> -->
                </a-form>
                <p style="margin-left: 30px;">申请人所在位置:{{ GPSFSm4 }}</p>
              </div>

              <!-- 修改里的 购买信息模块 -->
              <div class="all">
                <p>购买信息</p>
                <a-table :columns="columns3" :data-source="updateShopInfo" style="width:900px; margin: 0 auto;">
                  <a slot="name" slot-scope="text">{{ text }}</a>
                  <template slot="action" slot-scope="text, record">
                    <a slot="action" @click="delet1(record)">删除&nbsp;&nbsp;</a>
                  </template>
                </a-table>
              </div>
              <!-- 修改里的 附件管理模块 -->
              <div class="all fujianguanli">
                <p>附件管理</p>
                <div>
                  <viewer :images="photoPro" class="photos">
                    <!-- //photo 一定要一个数组，否则报错 -->
                    <span>与当地畜牧兽医主管部门签订的承诺书</span>
                    <img
                      v-for="(item, index) in photoPro"
                      :src="item ? item : ''"
                      :key="index"
                      alt="承诺书"
                      style="width:60px; height:60px;"
                    />
                  </viewer>
                </div>
                <div>
                  <viewer :images="photoRep" class="photos">
                    <!-- //photo 一定要一个数组，否则报错 -->
                    <span>已使用疫苗空瓶照片</span>
                    <img
                      v-for="(item, index) in photoVase"
                      :src="item ? item : ''"
                      :key="index"
                      alt="已使用疫苗空瓶"
                      style="width:60px; height:60px;"
                    />
                  </viewer>
                </div>
                <div>
                  <viewer :images="photoRep" class="photos">
                    <!-- //photo 一定要一个数组，否则报错 -->
                    <span
                    >具有资质的兽医实验室出具相关强制免疫疫苗 免疫抗体检测报告原件（上半年、下半年各一
                      份）,免疫抗体合格率并达到国家规定标准
                    </span>
                    <img
                      v-for="(item, index) in photoRep"
                      :src="item ? item : ''"
                      :key="index"
                      alt="报告原件"
                      style="width:60px; height:60px;"
                    />
                  </viewer>
                </div>
              </div>
              <!-- 修改里的  实际注射疫苗二维码信息模块 -->
              <div class="all">
                <div>
                  <p>实际注射疫苗二维码信息</p>
                  <a-table :columns="columns2" :data-source="updateQRcordInfo" style="margin: 0 auto;">
                    <a slot="name" slot-scope="text">{{ text }}</a>
                  </a-table>
                  <a-button @click="showMore" v-show="this.updateQRcordInfo.length && this.updateinfo" type="primary" style="width:150px;margin:20px  0 20px calc(50% - 102px);">
                    查看更多
                  </a-button>
                </div>

                <!-- <a-form-item :wrapper-col="{ span: 12, offset: 10 }">
                  <a-button type="primary" :span="8" style="width:150px">
                    查看更多
                  </a-button>
                </a-form-item> -->
                <!-- 修改里申请人信息 -->
                <div class="tab">
                  <a-form @submit="handleSubmit" :form="form" class="checkForm">
                    <a-form-item v-show="applyUserName">
                      <a-row type="flex" justify="space-between" align="bottom">
                        <a-col class="applyTrue" :span="4">
                          <div>
                            <p>申请人签字</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue" :span="8">
                          <viewer :images="[applePeoplePh.V11]">
                            <img
                              style="width: 40px;height:30px;"
                              :src="applePeoplePh.V11 ? applePeoplePh.V11 : ''"
                              alt="申请人签字"
                            />
                          </viewer>
                        </a-col>
                        <a-col class="applyTrue" :span="4">
                          <div>
                            <p>申请日期</p>
                          </div>
                        </a-col>
                        <a-col class="applyTrue applyCheck" :span="8">
                          <div>
                            <p>{{ applePeoplePh.FScTime ? applePeoplePh.FScTime.replace(/T/g, ' ') : '' }}</p>
                          </div>
                        </a-col>
                      </a-row>
                    </a-form-item>
                  </a-form>
                </div>
                <!-- 修改里的 删除按钮 -->
                <a-form-item :wrapper-col="{ span: 12, offset: 10 }">
                  <a-button type="primary" :span="8" style="width:150px; margin-top: 40px" @click="handleOk">
                    保存
                  </a-button>
                </a-form-item>
              </div>
            </a-modal>
            <!-- 删除弹窗 -->
            <a-modal
              title="删除"
              :visible="deletinfo"
              :confirm-loading="confirmLoading"
              @cancel="handleCancel"
              width="400px"
              :destroyOnClose="true"
              :footer="null"
            >
              <div>
                <a-form :form="checkDeletForm" @submit="handleOk1">
                  <a-form-item label="删除人">
                    <a-input disabled v-model="Fscr" />
                  </a-form-item>
                  <a-form-item label="删除原因">
                    <a-input
                      v-decorator="['deletCause', { rules: [{ required: true, message: '请输入' }] }]"
                      placeholder="请输入你的删除原因"
                    />
                  </a-form-item>
                  <a-form-item style="display: flex;justify-content: flex-end;">
                    <a-button type="primary" @click="handleCancel" style="margin-right:20px;">
                      取消
                    </a-button>

                    <a-button type="primary" html-type="submit">
                      确定
                    </a-button>
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>
            <!-- 警告弹窗 -->
            <a-modal
              title="提示"
              okText="确认"
              cancelText="取消"
              :visible="tishi"
              :confirm-loading="confirmLoading"
              @ok="handleOk2"
              @cancel="handleCancel"
              width="400px"
            >
              此状态无法进行操作
            </a-modal>
            <!-- 删除弹窗2 -->
            <a-modal
              title="删除"
              :visible="deletinfo1"
              :confirm-loading="confirmLoading"
              @ok="handleOk2"
              @cancel="handleCancelY"
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
            <!-- 二维码查看更多 -->
            <a-modal
              title="实际注射疫苗二维码信息"
              :visible="showEWmore"
              :confirm-loading="confirmLoading"
              @ok="handleCancelY"
              @cancel="handleCancelY"
              width="80vw"
              :zIndex="1000"
              destroyOnClose
            >
              <div>
                <!-- <p>实际注射疫苗二维码信息</p> -->
                <!-- :pagination="false" -->
                <a-table :pagination="false" :columns="columns2" :data-source="QRcordInfoMore" style="margin: 0 auto;">
                  <a slot="name" slot-scope="text">{{ text }}</a>
                </a-table>
                <a-button @click="showMore" v-show="this.QRcordInfoMore.length>=50" type="primary" style="width:150px;margin:20px  0 20px calc(50% - 102px);">
                  查看更多
                </a-button>
              </div>
            </a-modal>

            <!-- <a-button type="primary" style="height:40px" @click="RemoveP()">批量删除</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp; -->
            <a-button type="primary" style="height:40px" @click="handleEdit()">列表定制</a-button>
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
            :columns="columns"
            :data-source="applyInfo"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
            :pagination="false"
          >
            <span style="margin-left: 8px">
              <template v-if="hasSelected">
                {{ `Selected ${selectedRowKeys.length} items` }}
              </template>
            </span>
            <template slot="action" slot-scope="text, record">
              <a v-permission="{active:'firsele'}" slot="action" @click="fint(record)">查看&nbsp;&nbsp;</a>
              <a v-permission="{active:'firupd'}" slot="action" @click="update(record)">修改&nbsp;&nbsp;</a>
              <a v-permission="{active:'firdele'}" slot="action" @click="lookDel(record)">删除&nbsp;&nbsp;</a>
            </template>
          </a-table>
          <div style="display: flex;justify-content: space-between;padding: 20px 30px 20px 0;">
            <a-pagination
              size="small"
              :total="this.total"
              show-size-changer
              show-quick-jumpera
              @change="changePage"
              :current="offset"
              @showSizeChange="onShowSizeChange"
            />
            <span>当前第{{ offset }} / {{ totalPage }} 页 共 {{ total }} 条记录 每页 {{ limit }} 条</span>
          </div>
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
import http from '@/utils/httpapi'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import { getTime } from '@/utils/time'
import formatTime from '@/utils/public.js'
import { returnFSunitUstrId, returnFSunitUstrIdTree } from '@/utils/returnFSunitUstrId'
var yenum1 = 1
var yeOffset = 10
// import { apply } from 'lodash.pick'
// import { ConfigConsumerProps } from 'ant-design-vue/es/config-provider'
// 修改里的购买信息table规范
const columns3 = [
  // { title: '序号', width: 100, dataIndex: 'FGlid', key: 'FGlid' },
  { title: '序号', width: 100, align: 'center', dataIndex: 'FGlid', key: 'FGlid' },
  { title: '生产企业', width: 380, align: 'center', dataIndex: 'Fscqy', key: 'Fscqy' },
  { title: '生产批号', width: 200, align: 'center', dataIndex: 'Fscph', key: 'Fscph' },
  { title: '采购数量(毫升)', width: 200, align: 'center', dataIndex: 'Fcgsl', key: 'Fcgsl' },
  { title: '采购日期', width: 200, align: 'center', dataIndex: 'Fcgrq', key: 'Fcgrq' },
  // { title: '使用数量(毫升)', width: 200, align: 'center', dataIndex: 'Fsysl', key: 'Fsysl' },
  {
    title: '操作',
    width: 100,
    dataIndex: 'caozuo',
    key: 'caozuo',
    scopedSlots: { customRender: 'action' }
  }
]
// 查看里的购买信息table规范
const columns1 = [
  { title: '序号', width: 100, align: 'center', dataIndex: 'FGlid', key: 'FGlid' },
  { title: '生产企业', width: 380, align: 'center', dataIndex: 'Fscqy', key: 'Fscqy' },
  { title: '生产批号', width: 200, align: 'center', dataIndex: 'Fscph', key: 'Fscph' },
  { title: '采购数量(毫升)', width: 200, align: 'center', dataIndex: 'Fcgsl', key: 'Fcgsl' },
  { title: '采购日期', width: 200, align: 'center', dataIndex: 'Fcgrq', key: 'Fcgrq' }
  // { title: '使用数量(毫升)', width: 200, align: 'center', dataIndex: 'Fsysl', key: 'Fsysl' }
]

const data1 = [
  {
    xuhao: 1,
    shengchanqiye: '青岛易邦生物',
    pihao: '200244900',
    caigounum: '110000',
    caigoutime: '2020-03-12',
    shiyongnum: '91543'
  },
  {
    xuhao: 2,
    shengchanqiye: '青岛易邦生物',
    pihao: '200244900',
    caigounum: '110000',
    caigoutime: '2020-03-12',
    shiyongnum: '91543'
  },
  {
    xuhao: 3,
    shengchanqiye: '青岛易邦生物',
    pihao: '200244900',
    caigounum: '110000',
    caigoutime: '2020-03-12',
    shiyongnum: '91543'
  }
]
// 二维码table的规范
const columns2 = [
  { title: '疫苗名称', width: 250, align: 'center', dataIndex: 'Fymmc', key: 'Fymmc' },
  { title: '生产企业', width: 200, align: 'center', dataIndex: 'Fscqy', key: 'Fscqy' },
  { title: '用量（毫升）', width: 200, align: 'center', dataIndex: 'Fyl', key: 'Fyl' },
  { title: '批准文号', width: 200, align: 'center', dataIndex: 'Fpzwh', key: 'Fpzwh' },
  { title: '批准文号对比状态', width: 250, align: 'center', dataIndex: 'Fpzwhzt', key: 'Fpzwhzt' },
  { title: '追溯码', width: 200, align: 'center', dataIndex: 'Fzsm', key: 'Fzsm' },
  { title: '追溯码对比状态', width: 250, align: 'center', dataIndex: 'Fzsmzt', key: 'Fzsmzt' }
]

const data2 = [
  {
    yimiaoname: '重组禽流感病毒',
    shengchanqiye: '易邦生物',
    yongliang: '500.00',
    pizhunwenhao: '兽药临字',
    wnhaoduibi: '对比成功',
    zhuisuma: '9154312312312313',
    zhuisumaduibi: '对比成功'
  },
  {
    yimiaoname: '重组禽流感病毒',
    shengchanqiye: '易邦生物',
    yongliang: '500.00',
    pizhunwenhao: '兽药临字',
    wnhaoduibi: '对比成功',
    zhuisuma: '9154312312312313',
    zhuisumaduibi: '对比成功'
  },
  {
    yimiaoname: '重组禽流感病毒',
    shengchanqiye: '易邦生物',
    yongliang: '500.00',
    pizhunwenhao: '兽药临字',
    wnhaoduibi: '对比成功',
    zhuisuma: '9154312312312313',
    zhuisumaduibi: '对比成功'
  }
]
const columns = [
  {
    title: '序号',
    width: 80,
    align: 'center',
    dataIndex: 'FStId',
    key: 'FStId',
    customRender: (t, r, index) => {
      // console.log('序号处理', t, r, index)
      if (yenum1 === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenum1 - 1) * yeOffset + 1
      }
    }
  },
  { title: '状态', width: 120, align: 'center', dataIndex: 'Fzt', key: 'Fzt' },
  { title: '养殖场名称', width: 200, align: 'center', dataIndex: 'FyzName', key: 'FyzName' },
  { title: '地址',
      width: 230,
      align: 'center',
      dataIndex: 'Fdz',
      key: 'Fdz',
   customRender: (t, r, index) => {
    const a = t.replace(/\//g, '')
    return a
    }
  },
  { title: '法定代表人', width: 180, align: 'center', dataIndex: 'Ffddbr', key: 'Ffddbr' },
  { title: '联系方式', width: 180, align: 'center', dataIndex: 'Flxfs', key: 'Flxfs' },
  { title: '养殖畜种', width: 150, align: 'center', dataIndex: 'Fyzxz', key: 'Fyzxz' },
  { title: '账号', width: 200, align: 'center', dataIndex: 'Fzh', key: 'Fzh' },
  { title: '开户行', width: 200, align: 'center', dataIndex: 'Fkhh', key: 'Fkhh' },
  { title: '实时存栏数（头/只）', width: 180, align: 'center', dataIndex: 'Fcunls', key: 'Fcunls' },
  { title: '实免数（头/只）', width: 180, align: 'center', dataIndex: 'Fsms', key: 'Fsms' },
  { title: '疫苗种类', width: 200, align: 'center', dataIndex: 'Fymzl', key: 'Fymzl' },
  { title: '删除人', width: 180, align: 'center', dataIndex: 'FSm3', key: 'FSm3' },
  { title: '删除时间', width: 200, align: 'center', dataIndex: 'FSm4', key: 'FSm4' },
  { title: '删除原因', width: 200, align: 'center', dataIndex: 'FSm5', key: 'FSm5' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    xuhao: 1,
    state: '已申请',
    yangzhichangname: '青岛田瑞生态科技有限公司',
    dizhi: '青岛市即墨市店集动监站金口池戈...',
    fadingdaibiaoren: '曲晓青',
    lianxifangshi: '13573849237',
    yangzhixuzhong: '蛋鸡',
    zhanghao: '866150011014210...',
    kaihuhang: '齐鲁银行股份有限公司青岛分行',
    shishicunlanshu: '514120',
    shitushu: '497822',
    yimiaozhonglei: '',
    shanchuren: '',
    shanchushijian: '',
    shanchuyuanyin: ''
  },
  {
    xuhao: 2,
    state: '已申请',
    yangzhichangname: '青岛田瑞生态科技有限公司',
    dizhi: '青岛市即墨市店集动监站金口池戈...',
    fadingdaibiaoren: '曲晓青',
    lianxifangshi: '13573849237',
    yangzhixuzhong: '蛋鸡',
    zhanghao: '866150011014210...',
    kaihuhang: '齐鲁银行股份有限公司青岛分行',
    shishicunlanshu: '514120',
    shitushu: '497822',
    yimiaozhonglei: '',
    shanchuren: '',
    shanchushijian: '',
    shanchuyuanyin: ''
  },
  {
    xuhao: 3,
    state: '已申请',
    yangzhichangname: '青岛田瑞生态科技有限公司',
    dizhi: '青岛市即墨市店集动监站金口池戈...',
    fadingdaibiaoren: '曲晓青',
    lianxifangshi: '13573849237',
    yangzhixuzhong: '蛋鸡',
    zhanghao: '866150011014210...',
    kaihuhang: '齐鲁银行股份有限公司青岛分行',
    shishicunlanshu: '514120',
    shitushu: '497822',
    yimiaozhonglei: '',
    shanchuren: '',
    shanchushijian: '',
    shanchuyuanyin: ''
  }
]

export default {
  inject: ['reload'],
  name: 'BaseForm',
  data () {
    return {
      deletinfo: false,
      deletinfo1: false,
      photo: [
        {
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598867830455&di=9125d637685fb33d5558c32a953db099&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F05%2F00%2F01300000194285122188000535877.jpg'
        }
      ],
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ],
      value: '',
      hasSelected: 'true',

      // from 表单
      // 查看里基本信息表单
      basicInfoForm: this.$form.createForm(this),
      // 修改里面基本信息表单
      updateBasicInfoForm: this.$form.createForm(this),
      form: this.$form.createForm(this),

      // 点击 新增弹出框
      // ModalText: '请不要输入错误噢~',
      visible: false,
      fintinfo: false,
      updateinfo: false,
      confirmLoading: false,

      data,
      columns,
      data1,
      columns1,
      data2,
      columns2,
      columns3,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数----查看
      queryParam: {},
      selectedRowKeys: [],
      loading: false,
      number: 0,
      // 疫苗申请请求数据
      // 结束时间
      FSuTime: new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate(),
      // 开始时间
      FScTime: '',
      Conditionalvalue: '',
      // 疫苗申请的分页
      total: 10,
      offset: 1,
      limit: 10,
      totalPage: 1,

      // 返回的申请数据
      applyInfo: [],
      // 单条数据的FStId
      FstidOne: 7879,
      // 基本信息
      basicInfo: [],
      // 查看购买信息
      shopInfo: [],
      // 修改里的购买信息
      updateShopInfo: [],
      // 修改里的疫苗种类
      updateKind: '',
      // 查看里二维码信息
      QRcordInfo: [],
      // 更多
      QRcordInfoMore: [],
      // 控制查看二维码信息弹窗
      showEWmore: false,
      // 修改里二维码信息
      updateQRcordInfo: [],
      // 控制
      // 申请人签字
      applyUserName: true,
      // 申请进度
      applyPlan: 0,
      // 基层动监站
      DJZcase: false,
      // 区市
      SQcase: false,
      // 市级
      Scase: false,
      // 申请状态
      // applyState: ''
      // 删除人
      deletPeople: null,
      // 删除原因
      deletCause: null,
      // 查看中的删除的form表单
      checkDeletForm: this.$form.createForm(this),
      // 修改后的基础信息数据
      updateBeforeBasic: {
        FyzName: '',
        Ffddbr: '',
        Fyzxz: '',
        Fcunls: '',
        Fymzl: '',
        Fdz: '',
        Flxfs: '',
        Fkhh: '',
        Fsms: '',
        Fsqbts: '',
        FStId: '',
        type: '',
        Fzh: ''
      },
      // 提示
      tishi: false,
      // 所选的列对应的FStID
      removeFS: [],
      // Gps地址
      GPSFSm4: '',
      applePeoplePh: '',
      // 审核情况返回值
      JDcase: {},
      QScase: {},
      SJcase: {},
      // 照片
      photoPro: [],
      photoVase: [],
      photoRep: [],
      // 图片的网络地址前缀
      photoTop: 'http://www.miliotech.com:8886/QingdaoServerInterface/upload/',
      UserId: sessionStorage.getItem('FStId'),
      // 删除人信息
      Fscr: '超级管理员',
      Fsctime: '',
      Fscly: '',
      FSunitId: sessionStorage.getItem('FSunitUstrId'),
      Ffddbr: '',
      Fyzname: ''
    }
  },

  created () {
    yenum1 = 1
    getAdminAddress()
      .then(res => {
        // this.options = JSON.parse(res)
        // this.options = res
        this.options = returnFSunitUstrIdTree(res)
      })
      .catch(err => {
        console.log(err)
      })

    // 测试
    // 疫苗
    // this.checkbasicInfo()

    this.checkapply(this.queryParam.id)

    // 审核情况
    // this.auditCase()
    // 基本信息查询
    // 购买信息查询
    // this.checkShopInfo()
    // 二维码管理查询
    // this.checkQRcord()
    // this.onupdateBasicInfoForm()
    // this.che()
  },
  methods: {
    // 模糊查询
    mocheck (checkedValues, e) {
      // console.log(checkedValues, e, this.queryParam.id)
      // if (!checkedValues.length && this.queryParam.id === '') {
      //   this.reload()
      // }
      // console.log(this.queryParam.id)
      if (!e) {
        if (!this.queryParam.id) this.reloa()
        this.Fyzname = this.queryParam.id
      } else {
        this.FSunitId = returnFSunitUstrId(this.options, e || [])
        // this.options.forEach(item => {
        //   if (item.label === e[0]) {
        //     this.FSunitId = item.key
        //   } else {
        //     item.children.forEach(itemCh => {
        //       if (itemCh.label === e[0]) {
        //         this.FSunitId = itemCh.key
        //       } else {
        //         itemCh.children.forEach(itemS => {
        //           if (itemS.label === e[0]) {
        //             this.FSunitId = itemS.key
        //           }
        //         })
        //       }
        //     })
        //   }
        // })
      }
      // else if (!e.length) {
      //   this.FSunitId = sessionStorage.getItem('FSunitUstrId')
      // }
      yenum1 = 1
      this.limit = 10
      this.offset = 1
      this.changePage(this.offset, this.limit)
    },
    // 疫苗申请查询
    checkapply (s) {
      this.FSuTime = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate()
      console.log(http)
      console.log(s)
      // console.log(new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate())
      this.$axios
        .get(
          http +
            '/After/QueryVaccine?Fyzname=' +
            this.Fyzname +
            '&FSunitId=' +
            this.FSunitId +
            '&offset=' +
            this.offset +
            '&limit=' +
            this.limit +
            '&FScTime=' +
            this.FScTime +
            '&FSuTime=' +
            this.FSuTime,
          {
            headers: {
              UserId: this.UserId
            }
          }
        )
        .then(res => {
          console.log(res)
          if (res.data.Result) {
            var Clres = JSON.parse(res.data.Data)
            this.applyInfo = Clres.rows
            this.total = Clres.total
            this.totalPage = Math.ceil(this.total / this.limit)
          }
          console.log(this.total)
          console.log(Clres)
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 查看弹窗控制
    fint (v) {
      console.log(getTime())
      console.log(v)
      this.fintinfo = true
      this.FstidOne = v.FStId
      if (v.Fzt === '已申请' || v.Fzt === '已上报' || !v.Fzt) {
        // this.fintinfo = true
        this.applyPlan = 0
        this.DJZcase = false
        this.SQcase = false
        this.Scase = false
      } else if (v.Fzt === '基层动监站审核通过' || v.Fzt === '基层动监站审核通过') {
        // this.fintinfo = false
        this.DJZcase = true
        this.SQcase = false
        this.Scase = false
        this.applyPlan = 1
      } else if (v.Fzt === '区市审核通过') {
        // this.fintinfo = false
        this.applyPlan = 2
        this.SQcase = true
        this.Scase = false
      } else {
        // this.fintinfo = false
        this.applyPlan = 3
        this.Scase = true
      }
      // 审核情况
      if (this.applyPlan) {
        this.auditCase()
      }
      // 基础信息查询
      this.checkbasicInfo(this.FstidOne)
      // 购买信息查询
      this.checkShopInfo(this.FstidOne)
      // 二维码查询
      this.checkQRcord(this.FstidOne)
      // 申请人信息查询
      this.appplyPeople()
      // 审核情况
    },
    // 疫苗查看更多
    showMore () {
      this.showEWmore = true
    },
    // 基本信息查询
    checkbasicInfo (Fstid) {
      this.$axios
        .get(http + '/After/AppletYzcqzmyymsqReview?FStId=' + Fstid)
        .then(res => {
          if (res.data.Result) {
            console.log('基本信息')
            console.log(res)
            this.basicInfo = [...res.data.Data]
            this.GPSFSm4 = this.basicInfo[0].FSmemo2
            this.basicInfo.map((item, index) => {
              // this.GPSFSm4 = item.Fnum
              // 查看
              if (index === 0 && !this.updateinfo) {
                console.log(index)
                console.log(item.Fzt)
                console.log(item)
                // 给对应的表单元素赋值
                this.$nextTick(() => {
                  this.basicInfoForm.setFieldsValue({
                    FyzName: item.FyzName,
                    Fdz: item.Fdz.replace(/\//g, ''),
                    Ffddbr: item.Ffddbr,
                    Flxfs: item.Flxfs,
                    Fyzxz: item.Fyzxz,
                    Fzh: item.Fzh,
                    Fkhh: item.Fkhh,
                    Fcunls: item.Fcunls,
                    Fsms: item.Fsms,
                    Fymzl: item.Fymzl,
                    Fsqbts: item.Fsqbts,
                    NewFsqbts: item.Fsqbts
                  })
                })
              } else if (index === 0 && this.updateinfo) {
                console.log('执行了修改')
                // 修改
                // 给对应的表单元素赋值
                this.$nextTick(() => {
                  this.updateBasicInfoForm.setFieldsValue({
                    FyzName: item.FyzName,
                    Fdz: item.Fdz.replace(/\//g, ''),
                    Ffddbr: item.Ffddbr,
                    Flxfs: item.Flxfs,
                    Fyzxz: item.Fyzxz,
                    Fzh: item.Fzh,
                    Fkhh: item.Fkhh,
                    Fcunls: item.Fcunls,
                    Fsms: item.Fsms,
                    Fymzl: item.Fymzl,
                    Fsqbts: item.Fsqbts
                  })
                })
              }
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    // 购买信息查询
    checkShopInfo (Fstid) {
      this.updateShopInfo = []
      this.shopInfo = []
      this.$axios
        .get(http + '/After/QueryPurchasing?FStId=' + Fstid)
        .then(res => {
          console.log('购买信息查询')
          console.log(res)
          // 查看
          if (this.fintinfo) {
            res.data.Data.forEach((item, index) => {
              item.Fcgrq = formatTime(item.Fcgrq, 'yyyy-MM-dd')
            })
            this.shopInfo = [...res.data.Data]
          } else if (this.updateinfo) {
            // 修改
            res.data.Data.forEach((item, index) => {
              item.Fcgrq = formatTime(item.Fcgrq, 'yyyy-MM-dd')
            })
            this.updateShopInfo = [...res.data.Data]
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    // 二维码管理查询
    checkQRcord (Fstid) {
      this.QRcordInfo = []
      this.updateQRcordInfo = []
      this.$axios
        .get(http + '/After/QueryQRcode?FStId=' + Fstid)
        .then(res => {
          console.log('二维码查询')
          console.log(res)
          if (this.fintinfo) {
            console.log('执行了查看赋值')
            if (res.data.Data) {
              if (res.data.Data.length > 5) {
                this.QRcordInfo = res.data.Data.slice(0, 5)
              } else {
                this.QRcordInfo = res.data.Data
              }
              if (res.data.Data.length >= 50) {
                this.QRcordInfoMore = res.data.Data.slice(0, 50)
              } else {
                this.QRcordInfoMore = res.data.Data
              }
            }
          } else if (this.updateinfo) {
            console.log('执行了二维码修改查询')
            if (res.data.Data) {
              if (res.data.Data.length > 5) {
              this.updateQRcordInfo = res.data.Data.slice(0, 5)
            } else {
              this.updateQRcordInfo = res.data.Data
            }
            if (res.data.Data.length >= 50) {
                this.QRcordInfoMore = res.data.Data.slice(0, 50)
              } else {
                this.QRcordInfoMore = res.data.Data
              }
            }
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 申请人信息查询
    appplyPeople () {
      this.$axios
        .get(http + '/After/Signatureapplicant?FStId=' + this.FstidOne)
        .then(res => {
          // 申请人信息查询
          console.log('申请人信息查询')
          console.log(res)
          this.photoPro = []
          this.photoVase = []
          this.photoRep = []
          if (res.data.Result) {
            res.data.Data.forEach((item, index) => {
              if (index === 0) {
                this.applePeoplePh = item
                console.log(this.applePeoplePh)
                if (item.FSmemo1) {
                  this.photoPro.push(this.photoTop + item.FSmemo1)
                }
                if (item.FSmemo2) {
                  this.photoPro.push(this.photoTop + item.FSmemo2)
                }
                if (item.V1) {
                  this.photoPro.push(this.photoTop + item.V1)
                }
                if (item.V2) {
                  this.photoPro.push(this.photoTop + item.V2)
                }
                if (item.V3) {
                  this.photoVase.push(this.photoTop + item.V3)
                }
                if (item.V4) {
                  this.photoVase.push(this.photoTop + item.V4)
                }
                if (item.V5) {
                  this.photoVase.push(this.photoTop + item.V5)
                }
                if (item.V6) {
                  this.photoRep.push(this.photoTop + item.V6)
                }
                if (item.V7) {
                  this.photoRep.push(this.photoTop + item.V7)
                }
                if (item.V8) {
                  this.photoVase.push(this.photoTop + item.V8)
                }
                if (item.V9) {
                  this.photoRep.push(this.photoTop + item.V9)
                }
                if (item.V10) {
                  this.photoRep.push(this.photoTop + item.V10)
                }
                if (this.applePeoplePh.V11) {
                  this.applePeoplePh.V11 = this.photoTop + this.applePeoplePh.V11
                }
                console.log(this.applePeoplePh.V11)
              }
            })
          } else {
            this.$notification.error({
              message: '申请人暂未签字,请尽快确认'
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 修改基础信息
    onupdateBasicInfoForm (value) {
      console.log('开始修改')
      console.log(value)
      this.$axios
        .post(http + '/After/PutVaccine', value)
        .then(res => {
          console.log(res)
          if (res.data.Result) {
            this.$notification.success({
              message: '修改成功'
            })
            this.reload()
            this.checkapply(this.queryParam.id)
          } else {
            this.$notification.error({
              message: '修改失败，请重试'
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 修改购买信息
    onupdateShopInfo () {
      this.$axios({
        url: http + '/After/Deletepurchase?FStId=' + this.FstidOne,
        method: 'post',
        headers: {
          UserId: this.UserId
        }
      })
        .then(res => {
          console.log(res)
          if (res.data.Result) {
            this.$notification.success({
              message: '修改成功'
            })
            this.reload()
            this.checkapply(this.queryParam.id)
          } else {
            this.$notification.error({
              message: '修改失败，请重试'
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    // lookDel：查看删除弹窗控制
    lookDel (v) {
      // console.log(v)
      // 暂时隐掉
      if (v.Fzt === '已申请') {
        this.FstidOne = v.FStId
        this.deletinfo = true
      } else {
        this.tishi = true
      }
      console.log(v)
    },

    delet (v) {
      this.deletinfo = true
      console.log(v.xuhao)
      this.number = v.xuhao
    },
    delet1 (v) {
      console.log(v)
      this.deletinfo1 = true
      this.FstidOne = v.FGlid
      console.log(v.xuhao)
      this.number = v.xuhao
    },

    update (v) {
      console.log(v)
      if (v.Fzt === '已申请' || !v.Fzt || v.Fzt === '已上报') {
        this.FstidOne = v.FStId
        this.applyPlan = 0
        this.updateinfo = true
        // 基础信息查询
        this.checkbasicInfo(this.FstidOne)
        // 购买信息查询
        this.checkShopInfo(this.FstidOne)
        // 二维码查询
        this.checkQRcord(this.FstidOne)
        // 申请人信息
        this.appplyPeople()
        console.log('修改')
      } else {
        this.tishi = true
        this.updateinfo = false
      }
    },

    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    onChange (checkedValues) {
      console.log('checked = ', checkedValues)
      console.log(this.value)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selecedRowKeys, selecedRow) {
      console.log('selectedRowKeys changed: ', selecedRowKeys, selecedRow)
      this.selectedRowKeys = selecedRowKeys
      this.removeFS = selecedRow
    },

    // 弹窗
    showModal (formName) {
      this.visible = true
    },
    // 修改弹窗确认事件
    handleOk (e) {
      this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      // 获取基础信息表修改后的状态与值
      // this.getFieldsError
      this.updateBasicInfoForm.validateFields(err => {
        console.log(err)
        if (!err) {
          this.visible = false
          this.fintinfo = false
          this.updateinfo = false
          this.deletinfo = false
          this.confirmLoading = false
          console.log(this.basicInfo)
          this.basicInfo.map((item, index) => {
            if (index === 0) {
              this.updateBeforeBasic.FyzName = this.updateBasicInfoForm.getFieldValue('FyzName')
              this.updateBeforeBasic.Ffddbr = this.updateBasicInfoForm.getFieldValue('Ffddbr')
              this.updateBeforeBasic.Fyzxz = this.updateBasicInfoForm.getFieldValue('Fyzxz')
              this.updateBeforeBasic.Fcunls = this.updateBasicInfoForm.getFieldValue('Fcunls')
              this.updateBeforeBasic.Fymzl = this.updateBasicInfoForm.getFieldValue('Fymzl')
              this.updateBeforeBasic.Fdz = this.updateBasicInfoForm.getFieldValue('Fdz')
              this.updateBeforeBasic.Flxfs = this.updateBasicInfoForm.getFieldValue('Flxfs')
              this.updateBeforeBasic.Fkhh = this.updateBasicInfoForm.getFieldValue('Fkhh')
              this.updateBeforeBasic.Fsms = this.updateBasicInfoForm.getFieldValue('Fsms')
              this.updateBeforeBasic.Fsqbts = this.updateBasicInfoForm.getFieldValue('Fsqbts')
              this.updateBeforeBasic.FStId = this.FstidOne
              this.updateBeforeBasic.type = 'string'
              this.updateBeforeBasic.Fzh = this.updateBasicInfoForm.getFieldValue('Fzh')
              console.log(this.updateBeforeBasic)
              this.onupdateBasicInfoForm(this.updateBeforeBasic)
            }
          })
        } else {
          this.$notification.error({
            message: '请检查输入信息'
          })
        }
      })
    },
    // 删除弹窗的确认事件
    handleOk1 (e) {
      e.preventDefault()
      // console.log(this.deletPeople !==  '' && this.deletCause !== '')
      this.checkDeletForm.validateFields((err, val) => {
        if (!err) {
          console.log(this.applyInfo)
          this.Fscly = this.checkDeletForm.getFieldValue('deletCause')
          this.Fsctime = getTime()
          this.$axios({
            url:
              http +
              '/after/DeletePurchaseinformation?FStId=' +
              this.FstidOne +
              '&Fscr=' +
              this.Fscr +
              '&Fsctime=' +
              this.Fsctime +
              '&Fscly=' +
              this.Fscly,
            method: 'post'
          })
            .then(res => {
              this.$notification.success({
                message: '删除成功'
              })
              console.log(res)
              this.deletinfo = false
              this.reload()
            })
            .catch(rol => {
              this.$notification.error({
                message: '删除'
              })
              console.log(rol)
            })
        }
      })

      // this.applyInfo.map((item, index) => {
      //   console.log(item, this.FstidOne)
      //   if (item.FStId === this.FstidOne) {
      //     var dates = new Date()
      //     var years = dates.getFullYear()
      //     var months = dates.getMonth() + 1
      //     var dateOne = dates.getDate()
      //     var dateTime = years + '/' + months + '/' + dateOne
      //     item.shanchuren = this.checkDeletForm.getFieldValue('deletPeople')
      //     item.shanchuyuanyin = this.checkDeletForm.getFieldValue('deletCause')
      //     item.shanchushijian = dateTime
      //   }
      // })
      this.checkDeletForm.setFieldsValue({
        deletPeople: null,
        deletCause: null
      })

      this.confirmLoading = true
      this.deletinfo = false
      this.confirmLoading = false
    },
    handleCancelY () {
      this.deletinfo1 = false
      this.showEWmore = false
    },
    // RemoveP 批量删除
    RemoveP () {
      console.log(this.removeFS)
    },
    handleOk2 () {
      this.confirmLoading = true
      this.tishi = false
      this.confirmLoading = false
      // 删除购买信息
      if (this.deletinfo1) {
        this.onupdateShopInfo()
        this.deletinfo1 = false
      }
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.fintinfo = false
      this.deletinfo = false

      this.updateinfo = false
      this.tishi = false
      this.deletPeople = ''
      this.deletCause = ''
    },
    // 页码改变  index
    changePage (current, pageSize) {
      //  current 改变 后的页码，pageSize 每页显示条数
      console.log('log:', current, pageSize)
      this.offset = current
      this.limit = this.limit
      yenum1 = current
      this.selectedRowKeys = []
      this.checkapply(this.queryParam.id)
    },
    // 每页数量改变 index
    onShowSizeChange (current, pageSize) {
      console.log(current, pageSize)

      // this.checkUserPower(this.userToken, this.timestamp, current, pageSize)
      this.offset = current
      this.limit = pageSize
      yenum1 = current
      yeOffset = pageSize
      this.checkapply(this.queryParam.id)

      this.totalPage = Math.ceil(this.total / this.limit)
    },

    //  from表单验证
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    // 审核情况
    auditCase () {
      this.$axios
        .get(http + '/after/Auditinformation?FStId=' + this.FstidOne)
        .then(res => {
          console.log('审核情况00')
          console.log(res)
          if (res.data.Result) {
            this.fintinfo = true
            res.data.Data.forEach((item, index) => {
              if (index === 0) {
                this.JDcase = item
                this.DJZcase = true
                this.SQcase = false
                this.Scase = false
              } else if (index === 1) {
                this.QScase = item
                this.SQcase = true
                this.DJZcase = true
                this.Scase = false
              } else if (index === 2) {
                this.SJcase = item
                this.Scase = true
                this.SQcase = true
                this.DJZcase = true
              }
            })
          } else {
            console.log('执行了错误')
            this.Scase = false
            this.SJcase = []
            this.SQcase = false
            this.QScase = []
            this.DJZcase = false
            this.JDcase = []
            this.$notification.error({
              message: '未查询到该条数据的审核情况,查看失败，请联系管理人员'
            })
            // this.fintinfo = false
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    }
  }
}
</script>
<style scoped>
.all {
  border-top: 2px solid rgba(0, 0, 0, 0.295);
  margin-top: 40px;
  padding-top: 10px;
}
.tab div {
  /* border: black 1px solid; */
  text-align: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.checkForm {
  border: 1px solid black;
  border-top: none;
}
.applyTrue {
  height: 40px;
  line-height: 40px;
  border-top: black 1px solid;
  border-right: black 1px solid;
}
.applyCheck {
  border-right: none;
}
.applyTop {
  height: 40px;
  line-height: 40px;

  border-top: 1px solid black;
}
/* .tab .row {
  height: 40px;
  line-height: 40px;
} */
.all p {
  margin-bottom: 30px;
}
.btn[data-v-1f680ab4] {
  width: 129%;
}
.div {
  background-color: white;
  height: 80px;
}
.div1 {
  background-color: white;
  margin: 20px;
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
.fujianguanli span {
  display: block;
  width: 300px;
  margin-bottom: 20px;
}
.photos {
  display: flex;
  justify-self: start;
  height: 80px;
  padding-bottom: 10px;
}
.photos img {
  display: inline-block;
  width: 60px;
  height: 60px;
  margin-right: 10px;
  /* background: slategray; */
}
</style>
