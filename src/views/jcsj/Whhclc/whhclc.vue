<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :span="7">
                  <a-form-item
                    label="厂名称"
                    :labelCol="{ lg: { span: 9 }, sm: { span: 10 } }"
                    :wrapperCol="{ lg: { span: 15 }, sm: { span: 14 } }"
                  >
                    <a-input @blur="mocheck" v-model="queryParam.id" placeholder="" size="large" style="width: 100%" />
                  </a-form-item>
                </a-col>
                <a-col :span="3">
                  <a-select @change="selectShow" default-value="运营" size="large">
                    <a-select-option value="运营">
                      运营
                    </a-select-option>
                    <a-select-option value="注销">
                      注销
                    </a-select-option>
                  </a-select>
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
                  <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col> -->
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
                    <a-button type="primary" style="height:40px">查询</a-button>
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
            <a-button
              v-permission="{ active: 'harmadd' }"
              type="primary"
              style="height:40px"
              icon="plus"
              @click="showModal()"
            >新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- 新增 -->
            <a-modal
              :footer="null"
              title="管理新增"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
            >
              <!-- <p>{{ ModalText }}</p> -->
              <!-----------------------------表单元素----------------------------  -->

              <a-form @submit="handleSubmit" :form="form">
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="厂名称"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 13 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FFcmc', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="5">
                    <a-form-item
                      :labelCol="{ lg: { span: 6 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 17 }, sm: { span: 10 } }"
                    >
                      <!-- <a-input
                        v-decorator="['FSmemo2', { rules: [{ required: true, message: '请输入编号' }] }]"
                        placeholder="请输入编号"
                      /> -->
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="18">
                    <a-form-item
                      label="厂地址"
                      :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                    >
                      <a-select style="width: 120px;margin-right: 10px;" @change="ChangeTown" default-value="青岛市">
                        <a-select-option value="青岛市">
                          青岛市
                        </a-select-option>
                      </a-select>
                      <a-select
                        style="width: 120px;margin-right: 10px;"
                        @change="ChangeRegion"
                        :default-value="regName"
                      >
                        <a-select-option value="请选择" v-if="this.regInfo.length > 1">
                          请选择
                        </a-select-option>
                        <a-select-option v-for="(item, index) in regInfo" :key="index">
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                      <a-select style="width: 120px;" @change="ChangePeo" :default-value="peoName">
                        <a-select-option value="请选择" v-if="this.peoInfo.length > 1">
                          请选择
                        </a-select-option>
                        <a-select-option v-for="(item, index) in peoInfo" :key="index">
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="14">
                    <a-form-item
                      label="经纬度:"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                    >
                      <a-input
                        style="width:143.33px"
                        v-decorator="['FFlongitude']"
                        name="FFlongitude"
                        placeholder="请输入经度"
                      />

                      <a-input
                        style="width:143.33px"
                        v-decorator="['FFlatitude', { rules: [{ required: true, message: '请输入纬度' }] }]"
                        name="FFlatitude"
                        placeholder="请输入纬度"
                      />
                      <a-button @click="mapatlas" style="position: absolute; margin: 3px 10px">
                        选择
                      </a-button>
                    </a-form-item>
                  </a-col>
                  <a-col :span="10">
                    <a-form-item
                      label="负责人"
                      :labelCol="{ lg: { span: 5 }, sm: { span: 5 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                    >
                      <a-input v-decorator="['FFfzr', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="联系电话"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="[
                          'FFlxdh',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^1\d{10}$/, message: '手机号格式错误' }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="处理方式"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-select
                        v-decorator="['FFclfs', { rules: [{ required: true, message: '请选择' }] }]"
                        placeholder="处理方式"
                        @change="handleSelectChange"
                      >
                        <a-select-option value="焚烧">
                          焚烧
                        </a-select-option>
                        <a-select-option value="化制">
                          化制
                        </a-select-option>
                        <a-select-option value="地埋">
                          地埋
                        </a-select-option>
                        <a-select-option value="其他">
                          其他
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="日处理能力"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FFclnl', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="end">
                  <a-col>
                    <a-button type="primary" html-type="submit">
                      新增
                    </a-button>
                  </a-col>
                </a-row>
              </a-form>
            </a-modal>

            <!-- -------------------------查看弹窗-------------------------- -->
            <!-- 查看 -->
            <a-modal
              :footer="null"
              title="查看"
              :visible="fintinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
            >
              <!-- <p>{{ ModalText }}</p> -->
              <!-----------------------------表单元素----------------------------  -->

              <a-form @submit="handleSubmit" :form="form">
                <a-row>
                  <a-col :span="9">
                    <a-form-item
                      label="厂名称"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 14 }, sm: { span: 10 } }"
                    >
                      <a-input
                        disabled
                        v-decorator="['FFcmc', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="请输入厂名称"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="5">
                    <a-form-item
                      :labelCol="{ lg: { span: 0 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 17 }, sm: { span: 10 } }"
                    >
                      <a-input disabled v-decorator="['FSmemo2']" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="9">
                    <a-form-item
                      label="厂地址"
                      :labelCol="{ lg: { span: 6 }, sm: { span: 5 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 12 } }"
                    >
                      <a-input disabled v-decorator="['FFArea']">
                        <!-- <a-cascader disabled :options="
                        options"
                        placeholder="所在地"
                        @change="onChanges"> </a-cascader> -->
                      </a-input>
                    </a-form-item></a-col
                  >
                </a-row>
                <a-row>
                  <a-col :span="13">
                    <a-form-item
                      label="经纬度:"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                    >
                      <a-input
                        disabled
                        style="width:143.33px"
                        v-decorator="['FFlongitude']"
                        name="FFlongitude"
                        placeholder="请输入经度"
                      />

                      <a-input
                        disabled
                        style="width:143.33px"
                        v-decorator="['FFlatitude', { rules: [{ required: true, message: '请输入纬度' }] }]"
                        name="FFlatitude"
                        placeholder="请输入纬度"
                      />
                      <!-- <a-button disabled @click="mapatlas" style="position: absolute; margin: 3px 10px">
                        选择
                      </a-button> -->
                    </a-form-item>
                  </a-col>
                  <a-col :span="11">
                    <a-form-item
                      label="负责人"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 5 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 11 } }"
                    >
                      <a-input disabled v-decorator="['FFfzr', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="13">
                    <a-form-item
                      label="联系电话"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        disabled
                        v-decorator="[
                          'FFlxdh',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^1\d{10}$/, message: '手机号格式错误' }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="11">
                    <a-form-item
                      label="处理方式"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 10 } }"
                    >
                      <a-select
                        disabled
                        v-decorator="['FFclfs', { rules: [{ required: true, message: '请选择' }] }]"
                        placeholder="处理方式"
                        @change="handleSelectChange"
                      >
                        <a-select-option value="焚烧">
                          焚烧
                        </a-select-option>
                        <a-select-option value="化制">
                          化制
                        </a-select-option>
                        <a-select-option value="地埋">
                          地埋
                        </a-select-option>
                        <a-select-option value="其他">
                          其他
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="13">
                    <a-form-item
                      label="日处理能力"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input disabled v-decorator="['FFclnl', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
            </a-modal>

            <!-- --------------------------修改弹窗-------------------------- -->

            <a-modal
              :footer="null"
              title="修改"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
            >
              <!-- <p>{{ ModalText }}</p> -->
              <a-form @submit="handleSubmit" :form="form">
                <a-row style="display: none;">
                  <a-col :span="12">
                    <a-form-item
                      v-show="false"
                      label="id"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FStId']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="9">
                    <a-form-item
                      label="厂名称"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 13 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FFcmc', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="5">
                    <a-form-item
                      :labelCol="{ lg: { span: 0 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 17 }, sm: { span: 10 } }"
                    >
                      <a-input disabled v-decorator="['FSmemo2']" />
                    </a-form-item>
                  </a-col>
                  <!-- <a-col :span="16">
                    <a-form-item
                      label=""
                      :labelCol="{ lg: { span: 6 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 10 } }"
                    > -->
                  <!-- <a-cascader v-decorator="['FFArea']" :options="options" placeholder="所在地" @change="onChanges"></a-cascader> -->
                  <a-col :span="18">
                    <a-form-item
                      label="厂地址"
                      :labelCol="{ lg: { span: 5 }, sm: { span: 6 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                    >
                      <a-select style="width: 120px;margin-right: 10px;" @change="ChangeTown" default-value="青岛市">
                        <a-select-option value="青岛市">
                          青岛市
                        </a-select-option>
                      </a-select>
                      <a-select
                        style="width: 120px;margin-right: 10px;"
                        @change="ChangeRegion"
                        :default-value="regName"
                      >
                        <a-select-option value="请选择" v-if="this.regInfo.length > 1">
                          请选择
                        </a-select-option>
                        <a-select-option v-for="(item, index) in regInfo" :key="index">
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                      <a-select style="width: 120px;" @change="ChangePeo" :default-value="peoName">
                        <a-select-option value="请选择" v-if="this.peoInfo.length > 1">
                          请选择
                        </a-select-option>
                        <a-select-option v-for="(item, index) in peoInfo" :key="index">
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="13">
                    <a-form-item
                      label="经纬度:"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                    >
                      <a-input
                        style="width:143.33px"
                        v-decorator="['FFlongitude']"
                        name="FFlongitude"
                        placeholder="请输入经度"
                      />

                      <a-input
                        style="width:143.33px"
                        v-decorator="['FFlatitude', { rules: [{ required: true, message: '请输入纬度' }] }]"
                        name="FFlatitude"
                        placeholder="请输入纬度"
                      />
                      <a-button @click="mapatlas" style="position: absolute; margin: 3px 10px">
                        选择
                      </a-button>
                    </a-form-item>
                  </a-col>
                  <a-col :span="10">
                    <a-form-item
                      label="负责人"
                      :labelCol="{ lg: { span: 5 }, sm: { span: 5 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                    >
                      <a-input v-decorator="['FFfzr', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="13">
                    <a-form-item
                      label="联系电话"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 10 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="[
                          'FFlxdh',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^1\d{10}$/, message: '手机号格式错误' }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="10">
                    <a-form-item
                      label="处理方式"
                      :labelCol="{ lg: { span: 5 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-select
                        v-decorator="['FFclfs', { rules: [{ required: true, message: '请选择' }] }]"
                        placeholder="处理方式"
                        @change="handleSelectChange"
                      >
                        <a-select-option value="焚烧">
                          焚烧
                        </a-select-option>
                        <a-select-option value="化制">
                          化制
                        </a-select-option>
                        <a-select-option value="地埋">
                          地埋
                        </a-select-option>
                        <a-select-option value="其他">
                          其他
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="13">
                    <a-form-item
                      label="日处理能力"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FFclnl', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row v-if="this.aaa" type="flex" justify="end">
                  <a-col>
                    <a-button type="primary" html-type="submit">
                      保存
                    </a-button>
                  </a-col>
                </a-row>
              </a-form>
            </a-modal>

            <!-- --------------------------删除弹窗----------------------------- -->

            <a-modal
              okText="确认"
              cancelText="取消"
              title="删除"
              :visible="deletinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk1"
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
            <!-- ----------------------弹窗中的删除弹窗-------------------------------- -->
            <a-modal
              title="删除"
              :visible="deletinfo1"
              :confirm-loading="confirmLoading"
              @ok="DeleteAll"
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
            <!-- --------------------------地图弹窗 --------------------------------------->
            <a-modal
              title="地图"
              :visible="mapShow"
              :confirm-loading="confirmLoadingmap"
              @ok="handleOkmap"
              @cancel="handleCancelmap"
              width="800px"
              :zIndex="10000"
            >
              <!-- <p>{{ ModalTextmap }}</p> -->
              <!-- --------------------地图位置 -->
              <baidu-map
                class="map"
                @ready="handler"
                style="height: 500px;"
                :center="center"
                :zoom="13"
                :map-click="false"
                @click="maplist"
              >
                <div>
                  <!-- 自定义地图标点   :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}" -->
                  <bm-marker :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :position="center" @dragend="dragend">
                  </bm-marker>
                </div>
              </baidu-map>
              <a-form @submit="handleSubmit" :form="form">
                <a-form-item
                  label="经纬度:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    style="width:143.33px"
                    v-decorator="['FFlongitude', { rules: [{ required: true, message: '请输入经度' }] }]"
                    name="FFlongitude"
                    placeholder="请输入经度"
                  />

                  <a-input
                    style="width:143.33px"
                    v-decorator="['FFlatitude', { rules: [{ required: true, message: '请输入纬度' }] }]"
                    name="FFlatitude"
                    placeholder="请输入纬度"
                  />
                  <a-button @click="handleReset" style="position: absolute; margin: 3px 10px">
                    重置
                  </a-button>
                </a-form-item>
              </a-form>
            </a-modal>

            <!-- 启用或禁用 -->
            <a-modal
              :title="this.FSztItem ? '启用' : '禁用'"
              :visible="FSztItemTF"
              :confirm-loading="confirmLoading"
              @ok="GetWHHOFFItem"
              @cancel="handleCancel"
              width="400px"
            >
              <div>
                <a-form @submit="handleSubmit" :form="form">
                  <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
                    是否{{ this.FSztItem ? '启用' : '禁用' }}
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>

            <!-- --------------------------操作按钮--------------------------------------- -->
            <a-button
              v-permission="{ active: 'harmdele' }"
              type="primary"
              style="height:40px"
              @click="delet"
            >批量删除</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;

            <!-- --------------------------地点位置------------------------------------- -->
            <!-- <a-cascader
              style="margin-top: -1px ;width: 250px;float:right;"
              :options="options"
              placeholder="所在地"
              size="large"
              @change="onChange"
            >
              <a-icon
                slot="suffixIcon"
                type="environment"
                class="test"
                :style="{ fontSize: '26px', 'margin-top': '-11px', 'margin-right': '8px' }"
              />
            </a-cascader> -->
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
          <!-- ----------------------------表格内容------------------------------------- -->
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="data"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a slot="action" v-permission="{ active: 'harmsele' }" @click="fint(record)">查看&nbsp;&nbsp;</a>
              <a slot="action" v-permission="{ active: 'harmupd' }" @click="update(record)">修改&nbsp;&nbsp;</a>
              <a
                slot="action"
                v-permission="{ active: 'harmupd' }"
                @click="GetWHHOFFShow(record)"
              >启用或禁用&nbsp;&nbsp;</a
              >
              <!-- <a slot="action" @click="delet(record)">删除</a> -->
            </template>
          </a-table>
          <div>
            <a-pagination
              show-quick-jumper
              :default-current="offset"
              :total="total"
              show-less-items
              @change="onChange"
              :current="offset"
              style="margin: 10px;"
            />
            <span
              style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
            >当前第 {{ this.offset }}/{{ Math.ceil(this.total / 10) }} 页 共 {{ this.total }} 条记录 每页 10 条</span
            >
          </div>
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
import { findAll, AddInfo, UpdateInfo, checkItemInfo, GetWHHOFF } from '@/api/whhcl'
import http from '@/utils/httpapi'
import QS from 'qs'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import replaceAddress from '@/utils/replaceAddress'
import Clfunid from '@/utils/Clfunid'

// 当前页
var yenum = 1
const columns = [
  {
    title: '序号',
    width: 80,
    align: 'center',
    dataIndex: 'FStId',
    key: 'FStId',
    customRender: (t, r, index) => {
      if (yenum === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenum - 1) * 10 + 1
      }
    }
  },

  { title: '厂名称', width: 300, align: 'center', dataIndex: 'FFcmc', key: 'FFcmc' },
  { title: '编号', width: 120, align: 'center', dataIndex: 'FSmemo2', key: 'FSmemo2' },
  {
    title: '厂地址',
    width: 320,
    align: 'center',
    dataIndex: 'FFArea',
    key: 'FFArea',
    customRender: (t, r, index) => {
      return t ? t.split('/').join('') : ''
    }
  },
  { title: '负责人', width: 150, align: 'center', dataIndex: 'FFfzr', key: 'FFfzr' },
  { title: '联系电话', width: 150, align: 'center', dataIndex: 'FFlxdh', key: 'FFlxdh' },
  { title: '处理方式', width: 100, align: 'center', dataIndex: 'FFclfs', key: 'FFclfs' },
  { title: '日处理能力', width: 150, align: 'center', dataIndex: 'FFclnl', key: 'FFclnl' },
  { title: '经营状态', width: 150, align: 'center', dataIndex: 'UnitCloseStatus', key: 'UnitCloseStatus' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 250,
    scopedSlots: { customRender: 'action' }
  }
]

const data = []
// 表中表
const columns1 = [
  { title: '序号', width: 80, dataIndex: 'xuhao', key: 'xuhao' },
  { title: '企业名称', width: 200, dataIndex: 'qyname', key: 'qyname' },
  { title: '电话号码', width: 200, dataIndex: 'dhhh', key: 'dhhh' },
  { title: '操作', width: 100, dataIndex: 'cz', key: 'cz', scopedSlots: { customRender: 'action' } }
]
const data1 = [
  {
    xuhao: 1,
    qyname: '11111',
    dhhh: '11111'
  },
  {
    xuhao: 2,
    qyname: '11111',
    dhhh: '11111'
  },
  {
    xuhao: 3,
    qyname: '11111',
    dhhh: '11111'
  }
]

export default {
  inject: ['reload'],
  name: 'BaseForm',
  data () {
    return {
      // 根据行政查出的地址数据
      FsuIdaddress: {},
      // 地图显示隐藏
      mapShow: false,
      ModalTextmap: '请不要输入错误噢~',
      confirmLoadingmap: false,
      center: { FeJd: '120.39629', FFlatitude: '36.30744' },
      addr: '',
      options: [
        {
          value: '青岛',
          label: '青岛',
          children: [
            {
              value: '崂山',
              label: '崂山',
              children: [
                {
                  value: '动监站',
                  label: '动监站'
                }
              ]
            }
          ]
        }
      ],
      value: 1,
      hasSelected: 'true',

      // from 表单
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),

      // 点击 新增弹出框
      // ModalText: '请不要输入错误噢~',
      visible: false,
      fintinfo: false,
      updateinfo: false,
      deletinfo: false,
      deletinfo1: false,
      confirmLoading: false,
      aaa: true,
      data,
      columns,
      data1,
      columns1,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],
      loading: false,
      number: 0,
      // 每页条数
      limit: 10,
      // 当前页
      offset: 1,
      // 总条数
      total: 0,
      // 所在地
      // 所在地索引
      site: '',
      // 所在地文字
      siteText: '',
      formData: '',
      allFStid: [],
      idList: '',
      FSunitUstrId: sessionStorage.getItem('FSunitUstrId'),
      UserId: sessionStorage.getItem('FStId'),
      FFcmc: '',
      // 区，动监站选择
      regionTF: true,
      regInfo: [],
      peoTF: false,
      peoInfo: [],
      // 区名称
      regName: '请选择',
      // 动监站名称
      peoName: '请选择',
      // 查看时地址回显
      addressUp: '',
      FSztInfo: '运营',
      tzcoffTF: false,
      FSztItem: false,
      FSztItemTF: false,
      FStIdTF: ''
    }
  },
  created () {
    yenum = 1
    getAdminAddress()
      .then(res => {
        // this.options = JSON.parse(res)
        this.options = res
        this.regInfo = res[0].children
        this.FsuIdaddress = Clfunid(this.options)
      })
      .catch(err => {
        console.log(err)
      })
    var that = this
    var p = {
      limit: that.limit,
      offset: that.offset,
      FSunitUstrId: this.FSunitUstrId,
      FFcmc: this.FFcmc,
      UserId: this.UserId,
      FSzt: this.FSztInfo
    }
    findAll(p).then(res => {
      console.log(JSON.parse(res.Data).rows)
      that.data = JSON.parse(res.Data).rows
      that.total = JSON.parse(res.Data).total
    })
  },
  methods: {
    // 启用或禁用
    GetWHHOFFShow (v) {
      console.log(v)
      this.FSztItemTF = true
      if (v.UnitCloseStatus === '运营') {
        this.FSztItem = false
      } else {
        this.FSztItem = true
      }
      this.FStIdTF = v.FStId
    },
    GetWHHOFFItem (v) {
      GetWHHOFF(this.FStIdTF, this.UserId).then(res => {
        if (res.Result) {
          if (this.FSztItem) {
            this.$notification.success({
              message: '启用成功'
            })
          } else {
            this.$notification.success({
              message: '禁用成功'
            })
          }
          this.FSztItemTF = false
          this.reload()
        }
      })
    },
    selectShow (v) {
      console.log(v)

      this.FSztInfo = v
      var that = this
      var p = {
        limit: that.limit,
        offset: that.offset,
        FSunitUstrId: this.FSunitUstrId,
        FFcmc: this.FFcmc,
        UserId: this.UserId,
        FSzt: this.FSztInfo
      }
      findAll(p).then(res => {
        console.log(JSON.parse(res.Data).rows)
        that.data = JSON.parse(res.Data).rows
        that.total = JSON.parse(res.Data).total
      })
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
    // 模糊查询
    mocheck (checkedValues, e) {
      console.log(checkedValues, e, this.queryParam.id)
      if (!checkedValues.length && this.queryParam.id === '') {
        this.reload()
      }
      if (!e) {
        if (!this.queryParam.id) this.reload()
        this.FFcmc = this.queryParam.id
      } else if (e.length) {
        this.options.forEach(item => {
          if (item.label === e[0]) {
            this.FSunitUstrId = item.key
          } else {
            item.children.forEach(itemCh => {
              if (itemCh.label === e[0]) {
                this.FSunitUstrId = itemCh.key
              } else {
                itemCh.children.forEach(itemS => {
                  if (itemS.label === e[0]) {
                    this.FSunitUstrId = itemS.key
                  }
                })
              }
            })
          }
        })
        // for (var i = 0; i < e.length; i++) {
        //   this.FSunitUstrId = e[e.length - 1].key
        // }
      }
      yenum = 1
      this.limit = 10
      this.offset = 1
      var that = this
      var p = {
        limit: that.limit,
        offset: that.offset,
        FFcmc: this.FFcmc,
        FSunitUstrId: this.FSunitUstrId,
        UserId: this.UserId,
        FSzt: this.FSztInfo
      }
      findAll(p).then(res => {
        console.log(JSON.parse(res.Data))
        that.data = JSON.parse(res.Data).rows
        that.total = JSON.parse(res.Data).total
      })
    },
    handleReset () {
      this.form.resetFields()
    },
    handler: function ({ BMap, map }) {
      map.enableScrollWheelZoom(true)
      map.centerAndZoom('青岛市', 13)
      // const hide = this.$message.loading('正在获取当前省市请稍候..', 0)
      const _this = this
      const geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(
        function (r) {
          // setTimeout(hide, 10)
          console.log(r)
          _this.center = { FFlongitude: '120.39629', FFlatitude: '36.30744' } // 设置center属性值
          // _this.autoLocationPoint = { lng: r.longitude, lat: r.latitude }        // 自定义覆盖物
          _this.initLocation = true
        },
        { enableHighAccuracy: true }
      )

      // 获取地理位置

      window.map = map
      // 赋值，方便调用，本节被用到
      this.BMap = BMap
      this.map = map
    },
    // 拖动结束后
    dragend (e) {
      console.log(e.point)
      console.log(e)
      const gc = new this.BMap.Geocoder()
      gc.getLocation(e.point, function (rs) {
        // alert(JSON.stringify(rs.address) + '7777')
        // var addComp = rs.addressComponents
        //  this.addr = addComp.province + ', ' + addComp.city + ', ' + addComp.district + ', ' + addComp.street + ', ' + addComp.streetNumber

        this.form.setFieldsValue({
          addr: rs.address,

          FFlongitude: rs.point.lng,
          FFlatitude: rs.point.lat
        })
      })
    },
    maplist (e) {
      console.log(e.point.lng + ',' + e.point.lat)
      this.center.FFlongitude = e.point.lng
      this.center.FFlatitude = e.point.lat

      this.form.setFieldsValue({
        FFlongitude: e.point.lng,
        FFlatitude: e.point.lat
      })
    },
    // 地图弹窗
    mapatlas (mapName) {
      this.mapShow = true
      console.log('地图')
    },
    normFile (e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    // 批量删除
    DeleteAll () {
      if (this.selectedRowKeys.length > 0) {
        var p = {
          FStId: this.idList
        }
        this.$axios({
          method: 'post',
          url: http + '/HarmlessProcess/DelCTPG?FStId=' + p.FStId
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
      }
    },
    // data 表格删除
    delet (v) {
      console.log('删除')
      console.log(v.FStId)
      this.deletinfo = true
      this.number = v.FStId
      console.log(this.number)
    },

    fint (v) {
      console.log(v)
      this.fintinfo = true
      checkItemInfo(v.FStId).then(res => {
        console.log(res)
        var Clres = JSON.parse(res.Data)
        console.log(Clres)
        var item = Clres[0]
        this.$nextTick(() => {
          this.form.setFieldsValue({
            FStId: item.FStId,
            FFcmc: item.FFcmc,
            FSmemo2: item.FSmemo2,
            FFlxdh: item.FFlxdh,
            FFfzr: item.FFfzr,
            FFclfs: item.FFclfs,
            FFclnl: item.FFclnl,
            FFArea: item.FFArea.replace(/\//g, ''),
            // 经纬度
            FFlongitude: item.FFlongitude,
            FFlatitude: item.FFlatitude

            // FFArea: v.FFArea.split('/')
          })
        })
      })
    },
    // 修改
    update (v) {
      console.log('修改')
      this.updateinfo = true
      checkItemInfo(v.FStId).then(res => {
        console.log(res)
        var Clres = JSON.parse(res.Data)
        var item = Clres[0]
        var AddresCl = replaceAddress(Clres[0].FFArea.replace(/\//g, ''), this.options) || []
        if (AddresCl.length === 1) {
          this.f = true
          this.regionTF = true
          this.peoTF = false
        } else if (AddresCl.length === 2) {
          this.regionTF = false
          setTimeout(() => {
            this.f = true
            this.regionTF = true
            this.regName = AddresCl[1]
            this.peoTF = false
          }, 0)
        } else if (AddresCl.length === 3) {
          this.regionTF = false
          this.peoTF = false
          this.f = true
          setTimeout(() => {
            this.regionTF = true
            this.regName = AddresCl[1]
            this.regInfo.forEach(item => {
              if (item.label === this.regName) {
                this.peoInfo = item.children
              }
              this.peoTF = true
              this.peoName = AddresCl[2]
            })
          }, 0)
        }
        this.regInfo = this.FsuIdaddress.regInfo
        this.peoInfo = this.FsuIdaddress.peoInfo

        this.$nextTick(() => {
          this.form.setFieldsValue({
            FStId: item.FStId,
            FFcmc: item.FFcmc,
            FSmemo2: item.FSmemo2,
            FFlxdh: item.FFlxdh,
            FFfzr: item.FFfzr,
            FFclfs: item.FFclfs,
            FFclnl: item.FFclnl,
            // 经纬度
            FFlongitude: item.FFlongitude,
            FFlatitude: item.FFlatitude

            // FFArea: v.FFArea.split('/')
          })
        })
      })
      this.formData = 'update'
      // 给对应的表单元素赋值v
      // this.$nextTick(() => {
      //   this.form.setFieldsValue({
      //     FStId: v.FStId,
      //     FFcmc: v.FFcmc,
      //     FSmemo2: v.FSmemo2,
      //     FFlxdh: v.FFlxdh,
      //     FFfzr: v.FFfzr,
      //     FFclfs: v.FFclfs,
      //     FFclnl: v.FFclnl,

      //     FFlatitude: v.FFlatitude,
      //     FFlongitude: v.FFlongitude

      //   })
      // })
    },

    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    // 选择所在地  方法调用已注释
    onChanges (checkedValues, v) {
      console.log('checked = ', checkedValues, v)
      console.log(checkedValues)
      checkedValues.forEach((item, index) => {
        console.log(item)
        this.siteText = this.siteText + '/' + v[index].label
        this.site = this.site + '/' + item
      })
      console.log('site' + this.site)
    },
    // 分页
    onChange (checkedValues) {
      this.selectedRowKeys = []
      console.log('checked = ', checkedValues)
      console.log(this.value)
      yenum = checkedValues
      var that = this
      that.offset = checkedValues
      var p = {
        limit: that.limit,
        offset: that.offset,
        FSunitUstrId: this.FSunitUstrId,
        FFcmc: this.FFcmc,
        UserId: this.UserId,
        FSzt: this.FSztInfo
      }
      findAll(p).then(res => {
        that.data = JSON.parse(res.Data).rows
        that.total = JSON.parse(res.Data).total
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
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

    // 新增弹窗
    showModal (formName) {
      this.visible = true
      this.formData = 'add'
      this.regInfo = this.FsuIdaddress.regInfo
      this.peoInfo = this.FsuIdaddress.peoInfo
      this.regName = this.FsuIdaddress.regName
      this.peoName = this.FsuIdaddress.peoName
      // this.update(formName)
    },
    // 公用关闭按钮方法
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.updateinfo = false
        this.deletinfo = false
        this.confirmLoading = false
        this.form.resetFields()
      }, 1000)
    },
    // data 表格删除关闭按钮方法
    handleOk1 () {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      var p = {
        FStId: this.number
      }
      this.$axios({
        method: 'post',
        url: http + '/HarmlessProcess/DelCTPG?FStId=' + p.FStId
      }).then(res => {
        setTimeout(() => {
          this.$notification.success({
            message: '删除成功'
          })
        }, 100)
        this.reload()
      })
      setTimeout(() => {
        this.data = this.data.filter(item => parseInt(item.FStId) !== this.number)
        this.deletinfo = false
        this.confirmLoading = false
        this.form.resetFields()
      }, 100)
    },
    // data1 表格删除关闭按钮方法
    handleOk2 () {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        // this.data1 = this.data1.filter(item => parseInt(item.xuhao) !== this.number)
        this.deletinfo1 = false
        this.confirmLoading = false
        this.form.resetFields()
      }, 100)
    },
    // 公用取消按钮方法
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.deletinfo = false
      this.updateinfo = false
      this.fintinfo = false
      this.FSztItemTF = false
      this.form.resetFields()
    },
    // 地图关闭按钮方法
    handleOkmap (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoadingmap = true
      setTimeout(() => {
        this.mapShow = false
        this.confirmLoadingmap = false
      }, 100)

      this.form.setFieldsValue({
        FeJd: this.center.FeJd,
        FeWd: this.center.FeWd
      })
    },
    // 地图 取消按钮方法
    handleCancelmap (e) {
      console.log('点击了取消')
      this.mapShow = false
    },

    //  from表单验证
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(this.regName, this.peoName)
        if (!err) {
          var that = this
          var addressInfo = '青岛市'
          if (this.regName === '请选择') {
            addressInfo = '青岛市'
          } else if (this.peoName === '请选择') {
            addressInfo = addressInfo + this.regName
          } else {
            addressInfo = addressInfo + this.regName + this.peoName
          }
          if (that.formData === 'add') {
            var p = {
              FFcmc: values.FFcmc,
              FFArea: addressInfo,
              FFlxdh: values.FFlxdh,
              FFlongitude: values.FFlongitude,
              FFlatitude: values.FFlatitude,
              FFfzr: values.FFfzr,
              FFclfs: values.FFclfs,
              FFclnl: values.FFclnl
            }
            AddInfo(p, this.UserId).then(res => {
              console.log(res)
              if (res.Msg === '已存在该手机号,请重新输入') {
                this.$notification.error({
                  message: '已存在该手机号,请重新输入'
                })
              } else {
                setTimeout(() => {
                  this.$notification.success({
                    message: '新增成功'
                  })
                }, 1)
                this.visible = false
                this.reload()
              }
            })
          } else if (that.formData === 'update') {
            var pp = {
              FStId: values.FStId,
              FSmemo2: values.FSmemo2,
              FFcmc: values.FFcmc,
              FFArea: addressInfo,
              FFlxdh: values.FFlxdh,
              FFlongitude: values.FFlongitude,
              FFlatitude: values.FFlatitude,
              FFfzr: values.FFfzr,
              FFclfs: values.FFclfs,
              FFclnl: values.FFclnl
            }
            UpdateInfo(QS.stringify(pp)).then(res => {
              console.log(res)
              setTimeout(() => {
                this.$notification.success({
                  message: '修改成功'
                })
              }, 100)
              this.reload()
              this.visible = false
            })
          }
          // that.form.resetFields()
          console.log('Received values of form: ', values)
        } else {
          this.$notification.error({
            message: '请检查输入信息'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.all {
  border-top: 1px solid black;
  font-size: 30px;
}
.btn[data-v-731c4c8a] {
  width: 129% !important;
}
.div {
  background-color: white;
  height: 80px;
}
.div1 {
  background-color: white;
  margin: 20px;
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
