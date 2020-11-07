<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="申报点名称">
                    <a-input v-decorator="['xx']" size="large" style="width: 150%" />
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
                      :defaultValue="moment(getCurrentData(), 'YYYY-MM-DD')"
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
                    <a-button type="primary" html-type="submit" style="height:40px">查询</a-button>
                  </span>
                </a-col>
              </div>
            </a-row>
          </a-form>
          <div style="margin-top:35px;">
            <!-- 新增-->
            <a-button type="primary" style="height:40px" icon="plus" @click="showModal()">新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" @click="dellAll" style="height:40px">批量删除</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-modal
              :footer="null"
              title="屠宰检疫申报"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
              :destroyOnClose="true"
            >
              <a-form @submit="handleSubmit" :form="form">
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="申报单编号"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 14 } }"
                    >
                      <a-input
                        disabled
                        v-decorator="['QCPNumber', { rules: [{ required: true, message: '请输入' }] }]"
                        name="QCPNumber"
                      />
                    </a-form-item>
                  </a-col>

                  <a-col :span="12">
                    <a-form-item
                      label="报检时间"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 16 } }"
                    >
                      <a-date-picker v-decorator="['DateQF', { rules: [{ required: true, message: '请输入' }] }]" style="width: 100%" placeholder="请输入更新日期" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="申报人名称"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        :disabled="this.addTF"
                        v-decorator="['SBRMC', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FfzrName"
                      />
                    </a-form-item>
                  </a-col>

                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="报检员姓名"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        :disabled="this.addTF"
                        v-decorator="['QCPCargoOwner', { rules: [{ required: true, message: '请输入' }] }]"
                        name="QCPCargoOwner"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="联系电话"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        :disabled="this.addTF"
                        v-decorator="['QCPPhone', { rules: [{ required: true, message: '请输入' }] }]"
                        name="QCPPhone"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="动物种类"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-select
                        v-decorator="['QCProduct', { rules: [{ required: true, message: '请选择' }] }]"
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

                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="数量及单位"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        :disabled="this.addTF"
                        v-decorator="['QCPQuantity', { rules: [{ required: true, message: '请输入' }] }]"
                        name="QCPQuantity"
                      />
                      <a-select

                        v-decorator="['FeLx', { rules: [{ required: true, message: '请选择' }] }]"
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
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-form-item
                      label="待宰动物检疫证明编号"
                      :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                    >
                      <a-input
                        :disabled="this.addTF"
                        v-decorator="['QNoNumber', { rules: [{ required: true, message: '请输入' }] }]"
                        name="QNoNumber"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="临床健康情况"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-select
                        v-decorator="['LCJKQK', { rules: [{ required: true, message: '请选择' }] }]"
                      >
                        <a-select-option value="正常">正常</a-select-option>
                        <a-select-option value="异常">异常</a-select-option>
                      </a-select>
                      <!-- <a-input
                        :disabled="this.addTF"
                        v-decorator="['LCJKQK', { rules: [{ required: true, message: '请输入' }] }]"
                        name="LCJKQK"
                      /> -->
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="瘦肉精检测情况	"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-select
                        v-decorator="['SRJJC', { rules: [{ required: true, message: '请选择' }] }]"
                      >
                        <a-select-option value="正常">正常</a-select-option>
                        <a-select-option value="异常">异常</a-select-option>
                      </a-select>
                      <!-- <a-input
                        :disabled="this.addTF"
                        v-decorator="['SRJJC', { rules: [{ required: true, message: '请输入' }] }]"
                        name="SRJJC"
                     /> -->
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="预计屠宰时间"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-date-picker v-decorator="['DateQy', { rules: [{ required: true, message: '请输入' }] }]" style="width: 100%" placeholder="请输入更新日期" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="备注	"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        :disabled="this.addTF"
                        v-decorator="['Remarkss']"
                        name="FfzrTel"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <p>申报人依照《中华人民共和国动物防疫法》、《动物检疫管理办法》有关规定，特申报检疫。并对所填信息的真实性、完整性负责，如与事实不符，官方兽医有权终止检疫，由此导致的后果由申报人自行负责。</p>
                </a-row>
                <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                  <a-button v-if="!this.addTF" type="primary" html-type="submit" style="width:315px; height: 40px;">
                    添加
                  </a-button>
                </a-form-item>
              </a-form>
            </a-modal>
            <!-- 修改弹窗 查看弹窗 -->
            <a-modal
              :footer="null"
              title="动物屠宰检疫申报单"
              :visible="visibleUp"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
              :destroyOnClose="true"
            >
              <a-form @submit="handleSubmit" :form="UPform">
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="申报单编号"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 16 } }"
                    >
                      <a-input
                        disabled
                        v-decorator="['QCPNumber', { rules: [{ required: true, message: '请输入' }] }]"
                        name="QCPNumber"
                      />
                    </a-form-item>
                  </a-col>

                  <a-col :span="12">
                    <a-form-item
                      label="报检时间"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 16 } }"
                    >
                      <a-date-picker :disabled="!this.f" v-decorator="['DateQF', { rules: [{ required: true, message: '请输入' }] }]" style="width: 100%" placeholder="请输入更新日期" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="申报人名称"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        :disabled="!this.f"
                        v-decorator="['SBRMC', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FfzrName"
                      />
                    </a-form-item>
                  </a-col>

                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="报检员姓名"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        :disabled="!this.f"
                        v-decorator="['QCPCargoOwner', { rules: [{ required: true, message: '请输入' }] }]"
                        name="QCPCargoOwner"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="联系电话"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        :disabled="!this.f"
                        v-decorator="['QCPPhone', { rules: [{ required: true, message: '请输入' }] }]"
                        name="QCPPhone"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="动物种类"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-select
                        :disabled="!this.f"
                        v-decorator="['QCProduct', { rules: [{ required: true, message: '请选择' }] }]"
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

                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="数量及单位"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        :disabled="!this.f"
                        v-decorator="['QCPQuantity', { rules: [{ required: true, message: '请输入' }] }]"
                        name="QCPQuantity"
                      />
                      <a-select
                        :disabled="!this.f"
                        v-decorator="['QCPDanWei', { rules: [{ required: true, message: '请选择' }] }]"
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
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-form-item
                      label="待宰动物检疫证明编号"
                      :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                    >
                      <a-input
                        :disabled="!this.f"
                        v-decorator="['QNoNumber', { rules: [{ required: true, message: '请输入' }] }]"
                        name="QNoNumber"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="临床健康情况"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        disabled
                        v-if="!this.f"
                        v-decorator="['LCJKQK', { rules: [{ required: true, message: '请输入' }] }]"
                        name="LCJKQK"
                      />
                      <a-select
                        v-if="this.f"
                        v-decorator="['LCJKQK', { rules: [{ required: true, message: '请选择' }] }]"
                      >
                        <a-select-option value="正常">正常</a-select-option>
                        <a-select-option value="异常">异常</a-select-option>
                      </a-select>

                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="瘦肉精检测情况	"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        disabled
                        v-if="!this.f"
                        v-decorator="['SRJJC', { rules: [{ required: true, message: '请输入' }] }]"
                        name="SRJJC"
                      />
                      <a-select
                        v-if="this.f"
                        v-decorator="['SRJJC', { rules: [{ required: true, message: '请选择' }] }]"
                      >
                        <a-select-option value="正常">正常</a-select-option>
                        <a-select-option value="异常">异常</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="预计屠宰时间"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-date-picker :disabled="!this.f" v-decorator="['DateQy', { rules: [{ required: true, message: '请输入' }] }]" style="width: 100%" placeholder="请输入更新日期" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="备注	"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        :disabled="!this.f"
                        v-decorator="['Remarkss']"
                        name="Remarkss"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <p>申报人依照《中华人民共和国动物防疫法》、《动物检疫管理办法》有关规定，特申报检疫。并对所填信息的真实性、完整性负责，如与事实不符，官方兽医有权终止检疫，由此导致的后果由申报人自行负责。</p>
                </a-row>
                <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                  <a-button v-if="this.f" type="primary" html-type="submit" style="width:315px; height: 40px;">
                    添加
                  </a-button>
                </a-form-item>
              </a-form>
            </a-modal>
            <!-- 删除弹框 -->
            <a-modal
              :title="'删除'"
              :visible="Delinfo"
              :confirm-loading="confirmLoading"
              @ok="DelOk"
              @cancel="DelNo"
              width="400px"
              :destroyOnClose="true"
            >
              是否删除
            </a-modal>
          </div>
          <!-- 页面表格 -->
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="SBDInfosGetListInfo"
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
  </div>
</template>
<script>
// 接口请求调用
import {
  getQuarantineDeclarationTZList,
  getQuarantineDeclarationCPInsert,
  getQuarantineDeclarationCPXQ,
  getQuarantineDeclarationCPUpdate,
  getQuarantineDeclarationCPDel

} from '@/api/tzjyEb/tzjysb'
import formatTime from '@/utils/public'

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
  { title: '申报单编号', width: 200, align: 'center', dataIndex: 'QCPNumber', key: 'QCPNumber' },
  { title: '状态', width: 200, align: 'center', dataIndex: 'IsPrant', key: 'IsPrant' },
  { title: '申报受理结果', width: 200, align: 'center', dataIndex: 'QCPAccepted', key: 'QCPAccepted' },
  { title: '报检时间',
width: 220,
align: 'center',
dataIndex: 'DateQF',
key: 'DateQF',
customRender: (t, r, index) => {
    return formatTime(t, 'yyyy-MM-dd hh:mm:ss')
  } },
  { title: '申报人名称', width: 220, align: 'center', dataIndex: 'SBRMC', key: 'SBRMC' },
  { title: '报检员姓名', width: 220, align: 'center', dataIndex: 'QCPCargoOwner', key: 'QCPCargoOwner' },
  { title: '联系电话', width: 220, align: 'center', dataIndex: 'QCPPhone', key: 'QCPPhone' },
  { title: '动物种类', width: 220, align: 'center', dataIndex: 'QCProduct', key: 'QCProduct' },
  { title: '数量', width: 220, align: 'center', dataIndex: 'QCPQuantity', key: 'QCPQuantity' },
  { title: '单位', width: 220, align: 'center', dataIndex: 'QCPDanWei', key: 'QCPDanWei' },
  { title: '"瘦肉精"检测情况', width: 220, align: 'center', dataIndex: 'SRJJC', key: 'SRJJC' },
  { title: '预计屠宰时间', width: 220, align: 'center', dataIndex: 'sj1', key: 'sj1' },
  { title: '临床健康情况', width: 220, align: 'center', dataIndex: 'LCJKQK', key: 'LCJKQK' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 250,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  inject: ['reload'],
  data () {
    return {
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
      FsbdName: '',
      selectwhere: '',
      // 申报点查询
      FhLegal: '',
      // 官方兽医查询
      FuName: '',
      UserId: sessionStorage.getItem('FStId'),
      queryParam: { status: 0, status1: 0 },
      fromdata: '',
      columns,

      SBDInfosGetListInfo: [],

      SBDInfo: [],
      GFInfo: [],
      // from 表单
      form: this.$form.createForm(this),
      UPform: this.$form.createForm(this),
      SBDform: this.$form.createForm(this),
      SBDformUp: this.$form.createForm(this),
      GFform: this.$form.createForm(this),
      GFformUp: this.$form.createForm(this),
      // 点击 弹出框
      visible: false,
      visibleUp: false,
      SBmodalTF: false,
      GFmodalTF: false,
      Delinfo: false,
      delAlln: false,
      f: true,
      updateinfo: false,
      confirmLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],

      loading: false,
      FStIditem: 0,
      delAllInfo: [],
      GFaddInfo: [],
      addTF: false,
      itemInfo: {}

    }
  },
  created () {
    yenum1 = 1
    this.getQuarantineDeclarationTZList()
  },
  methods: {
    // 列表查询
    getQuarantineDeclarationTZList () {
      var p = {
        limit: this.limit,
        offset: this.offset,
        UserId: this.UserId,
        selectwhere: this.selectwhere
      }
      getQuarantineDeclarationTZList(p)
        .then(res => {
          console.log(res)
          if (res.Result) {
            var Clres = JSON.parse(res.Data)
            console.log(Clres)
            this.totalnum = parseInt(Clres.total)
            this.SBDInfosGetListInfo = Clres.rows
          }
        })
        .then(rol => {
          console.log(rol)
        })
    },
    // 获取申报单号
    getSbdInfo () {
      const AllInfo = JSON.parse(localStorage.getItem('AllInfo'))
      this.$axios({
        methods: 'get',
        url: 'http://www.miliotech.com:8886/QDZSAPP/HtmlAshxQua/SetSBDBH.ashx?FSunitUstrId=' + AllInfo.FSunitUstrId + '&lx=sb&FSunitId=' + AllInfo.FSunitId + '&FSunitName=' + AllInfo.FSunitName + '&uid=' + AllInfo.FSunitUstrId
      }).then(res => {
        console.log(res)
        if (!res.data.errorCode) {
          if (this.fromdata === 'add') {
            var Clres = res.data.data
            if (!res.data.errorCode) {
               console.log(Clres)
             this.visible = true
            this.$nextTick(() => {
              this.form.setFieldsValue({
               QCPNumber: Clres.result

              })
            })
            }
          } else {
            var Clress = res.data.data
             this.visibleUp = true
            this.$nextTick(() => {
              this.UPform.setFieldsValue({
               QCPNumber: Clress.result

              })
            })
          }
        } else {
          this.$notification.error({
            message: '暂未查询到申报单编号'
          })
        }
      }).catch(rol => {
        console.log(rol)
      })
    },
    // 单项查询
    getQuarantineDeclarationCPXQInfo () {
      var p = {
        FStId: this.FStIditem,
        UserId: this.UserId
      }
      getQuarantineDeclarationCPXQ(p).then(res => {
        console.log(res)
        if (res.Result) {
           var Clres = res.Data[0]
           this.itemInfo = Clres
           if (this.fromdata === 'add') {
             console.log('执行了')
             console.log(res)
             this.visible = true
             this.$nextTick(() => {
               this.form.setFieldsValue(Clres)
             })
           } else {
             this.visibleUp = true
             this.$nextTick(() => {
               this.UPform.setFieldsValue(Clres)
             })
           }
        }
      }).catch(rol => {
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
      this.getQuarantineDeclarationTZList()
    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.delAllInfo = selectedRows
      console.log(selectedRowKeys, selectedRows)
    },
//  getSBDInfosGetListInfo () {
//       var p = {
//         limit: this.limit,
//         offset: this.offset,
//         UserId: this.UserId,
//         FsbdName: this.FsbdName
//       }
//       getQuarantineDeclarationTZList(p)
//         .then(res => {
//           console.log(res)
//           if (res.Result) {
//             var Clres = JSON.parse(res.Data)
//             console.log(Clres)
//             this.totalnum = parseInt(Clres.total)
//             this.SBDInfosGetListInfo = Clres.rows
//           }
//         })
//         .then(rol => {
//           console.log(rol)
//         })
//     },
    // 弹窗控制方法
    showModal (formName) {
      this.fromdata = 'add'
      this.getSbdInfo()
    },

    find (v) {
      this.fromdata = 'find'
      this.f = false

      this.FStIditem = v.FStId
      this.getQuarantineDeclarationCPXQInfo()
      this.getSbdInfo()
    },
    update (v) {
      this.fromdata = 'update'
      this.f = true
       this.FStIditem = v.FStId
       this.getQuarantineDeclarationCPXQInfo()
      this.getSbdInfo()

      console.log('修改' + v.FStId)
    },
    // 删除弹窗控制
    delet (v) {
      console.log(v)
      this.FStIditem = v.FStId
      this.Delinfo = true
      this.delAlln = true
    },

    DelOk () {
      if (!this.delAllInfo.length && this.delAlln === true) {
        getQuarantineDeclarationCPDel(this.FStIditem).then(res => {
          console.log(res)
          if (res.Result) {
            this.$notification.success({
              message: '删除成功'
            })
            this.Delinfo = false
            this.reload()
          } else {
            this.$notification.error({
              message: '删除失败，请联系管理人员'
            })
          }
        }).catch(rol => {
          console.log(rol)
        })
      } else {
        var p = []
        this.delAllInfo.forEach(item => {
          p.push(item.FStId)
        })
        getQuarantineDeclarationCPDel(p.join(',')).then(res => {
          console.log(res)
          if (res.Result) {
            this.$notification.success({
              message: '删除成功'
            })
            this.Delinfo = false
            this.reload()
          } else {
            this.$notification.error({
              message: '删除失败，请联系管理人员'
            })
          }
        }).catch(rol => {
          console.log(rol)
        })
      }
    },
    DelNo () {
      this.Delinfo = false
      this.delAllInfo = []
      this.selectedRowKeys = []
    },
    dellAll () {
      if (!this.delAllInfo.length) {
        this.$notification.error({
          message: '请选择一条数据'
        })
      } else {
        this.Delinfo = true
      }
    },

    handleSubmit (e) {
      e.preventDefault()
      if (this.fromdata === 'update') {
        this.UPform.validateFields((err, val) => {
          if (!err) {
            var formInfo = this.UPform.getFieldsValue()
            this.itemInfo.QCPNumber = formInfo.QCPNumber
            this.itemInfo.DateQF = formInfo.DateQF
            this.itemInfo.SBRMC = formInfo.SBRMC
            this.itemInfo.QCPCargoOwner = formInfo.QCPCargoOwner
            this.itemInfo.QCPPhone = formInfo.QCPPhone
            this.itemInfo.QCProduct = formInfo.QCProduct
            this.itemInfo.QCPQuantity = formInfo.QCPQuantity
            this.itemInfo.QCPDanWei = formInfo.QCPDanWei
            this.itemInfo.QNoNumber = formInfo.QNoNumber
            this.itemInfo.LCJKQK = formInfo.LCJKQK
            this.itemInfo.SRJJC = formInfo.SRJJC
            this.itemInfo.DateQy = formInfo.DateQy
            this.itemInfo.Remarkss = formInfo.Remarkss
            getQuarantineDeclarationCPUpdate(this.itemInfo, this.UserId).then(res => {
              console.log('执行了修改')
              if (res.Result) {
                this.$notification.success({
                  message: '修改成功'
                })
                this.visible = false
                this.reload()
              }
            }).catch(rol => {
              console.log(rol)
            })
          }
        })
      } else if (this.fromdata === 'add') {
        this.form.validateFields((err, val) => {
          if (!err) {
            val.DateJL = new Date()
            getQuarantineDeclarationCPInsert(val, this.UserId).then(res => {
              console.log(res)
              if (res.Result) {
                this.$notification.success({
                  message: '新增成功'
                })
                this.visible = false
                this.reload()
              }
            }).catch(rol => {
              console.log(rol)
            })
          } else {
            this.$notification.error({
              message: '请检查输入信息'
            })
          }
        })
      }
    },
    // 弹窗关闭
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      this.SBmodalTF = false
      setTimeout(() => {
        this.visible = false
        this.updateinfo = false
        this.confirmLoading = false
        this.form.resetFields()
      }, 100)
    },

    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.visibleUp = false
      this.updateinfo = false
      this.jinyong = false

      if (this.GFaddInfo.length) {
        this.reload()
      }
      this.GFaddInfo = []
      this.GFInfo = []

      this.f = false
      this.addTF = false
      // 给对应的表单元素赋值

      this.form.resetFields()
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
