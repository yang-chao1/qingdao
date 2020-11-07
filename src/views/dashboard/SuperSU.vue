<template>
  <div class="superSU">
    <page-header-wrapper>
      <div class="quanxian">
        <div>
          <a-form class="phones">
            <a-form-item
              label="选择角色"
              width="350"
              :labelCol="{ lg: { span: 5 }, sm: { span: 6 } }"
              :wrapper-col="{ span: 17, offset: 0 }"
            >
              <!-- input下拉列表 -->
              <a-select
                v-decorator="['gender', { rules: [{ required: true, message: '请选择' }] }]"
                placeholder="选择角色"
                @change="handleSelectChange"
                style="width:240px;"
                size="large"
              >
                <a-select-option v-for="item in superUser" :key="item.FStId">{{ item.FrName }}</a-select-option>
                <!-- <a-select-option value="male">
                  male
                </a-select-option>
                <a-select-option value="female">
                  female
                </a-select-option> -->
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                @click="Baocun"
                style="width:100px; height: 40px; margin-left:60px"
              >
                保存
              </a-button>
            </a-form-item>
          </a-form>
          <a-table
            :row-selection="rowSelections"
            :columns="columns"
            :data-source="PCArrydata"
            :defaultExpandAllRows="true"
            :defaultExpandedRowKeys="[1]"
            :scroll="{ y: 500 }"
            style="width:680px;height: 600px;position: absolute;top: 200px;"
            :pagination="false"
          >
            <template slot="add" slot-scope="text, record">
              <a-checkbox
                :checked="selectedRowKeys.indexOf(text) === -1 ? false : true"
                @click="add(record)"
              ></a-checkbox>
            </template>
            <template slot="update" slot-scope="text, record">
              <a-checkbox
                :checked="selectedRowKeys.indexOf(text) === -1 ? false : true"
                @click="update(record)"
              ></a-checkbox>
            </template>
            <template slot="delet" slot-scope="text, record">
              <a-checkbox
                :checked="selectedRowKeys.indexOf(text) === -1 ? false : true"
                @click="delet(record)"
              ></a-checkbox>
            </template>
            <template slot="fint" slot-scope="text, record">
              <a-checkbox
                :checked="selectedRowKeys.indexOf(text) === -1 ? false : true"
                @click="fint(record)"
              ></a-checkbox>
            </template>
          </a-table>
        </div>
        <div class="phone" style="position: absolute;top: 150px;left: 680px;height: 600px;">
          <div class="titlename">
            手机APP用户权限
          </div>
          <!-- <div>
            <a-checkbox-group @change="onChange">
              <a-row>
                <a-col :span="6">
                  <a-checkbox value="1">
                    安全生产
                  </a-checkbox>
                </a-col>
                <a-col :span="6">
                  <a-checkbox value="2">
                    GSP检查
                  </a-checkbox>
                </a-col>
                <a-col :span="6">
                  <a-checkbox value="3">
                    监管兽医
                  </a-checkbox>
                </a-col>
                <a-col :span="6">
                  <a-checkbox value="4">
                    收集人员
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox value="5">
                    驻厂兽医
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </div> -->
          <div class="checkbox">
            <a-checkbox-group @change="onChange" :options="checkboxdata" :value="showApppermise" />
            <!-- <a-row>
                <a-col :span="12"  >
                  <a-checkbox :value="item.index" :checked="item.checked">
                    {{ item.title }}
                  </a-checkbox>
                </a-col>
              </a-row> -->
            <!-- </a-checkbox-group> -->
          </div>
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>

<script>
import http from '@/utils/httpapi'
import { GetToken } from '@/api/getToken'
import superInfo from '@/utils/super'

const columns = [
  {
    title: '栏目标题',
    dataIndex: 'title',
    key: 'title',
    width: 320
  },
  {
    title: '新增',
    dataIndex: 'add',
    key: 'add',
    width: 70,
    scopedSlots: { customRender: 'add' }
  },
  {
    title: '修改',
    dataIndex: 'upd',
    width: 70,
    key: 'update',
    scopedSlots: { customRender: 'update' }
  },
  {
    title: '删除',
    dataIndex: 'dele',
    width: 70,
    key: 'delet',
    scopedSlots: { customRender: 'delet' }
  },
  {
    title: '查看',
    dataIndex: 'sele',
    width: 70,
    key: 'fint',
    scopedSlots: { customRender: 'fint' }
  }
]

const PCArrydata = [
  {
    key: 'System',
    title: '系统管理',
    add: 'Systemadd',
    dele: 'Systemdele',
    upd: 'Systemupd',
    sele: 'Systemsele',
    checked: false,
    defaultChecked: false,
    children: [
      {
        key: 'notice',
        title: '通知管理',
        add: 'nceadd',
        dele: 'ncedele',
        upd: 'nceupd',
        sele: 'ncesele',
        checked: false
      },
      {
        key: 'classify',
        title: '分类参数',
        add: 'claadd',
        dele: 'cladele',
        upd: 'claupd',
        sele: 'clasele',
        checked: false
      },
      {
        key: 'Area',
        title: '区划管理',
        add: 'Areadd',
        dele: 'Aredele',
        upd: 'Areupd',
        sele: 'Aresele',
        checked: false
      },
      {
        key: 'admin',
        title: '行政单位管理',
        add: 'admadd',
        dele: 'admdele',
        upd: 'admupd',
        sele: 'admsele',
        checked: false
      },
      {
        key: 'manage',
        title: '用户管理',
        add: 'manadd',
        dele: 'mandele',
        upd: 'manupd',
        sele: 'mansele',
        checked: false
      },
      {
        key: 'role',
        title: '角色管理',
        add: 'roleadd',
        dele: 'roledele',
        upd: 'roleupd',
        sele: 'rolesele',
        checked: false
      },
      {
        key: 'perm',
        title: '权限管理',
        add: 'peradd',
        dele: 'perdele',
        upd: 'perupd',
        sele: 'persele',
        checked: false
      },
      {
        key: 'password',
        title: '密码修改',
        add: 'passadd',
        dele: 'passdele',
        upd: 'passupd',
        sele: 'passele',
        checked: false
      },
      {
        key: 'scatte',
        title: '散养户及企业管理权限分配',
        add: 'scaadd',
        dele: 'scadele',
        upd: 'scaupd',
        sele: 'scasele',
        checked: false
      }
    ]
  },
  {
    key: 'After',
    title: '先打后补',
    add: 'Afteradd',
    dele: 'Afterdele',
    upd: 'Afterupd',
    sele: 'Aftersele',
    checked: true,
    children: [
      {
        key: 'first',
        title: '养殖场强制免疫疫苗申请',
        add: 'firadd',
        dele: 'firdele',
        upd: 'firupd',
        sele: 'firsele',
        checked: false
      },
      {
        key: 'EEtjudge',
        title: '基层动监站审核',
        add: 'EEtjudgeadd',
        dele: 'EEtjudgedele',
        upd: 'EEtjudgeupd',
        sele: 'EEtjudgesele',
        checked: false,
        children: [
          {
            key: 'BasicToaudit',
            title: '待审核',
            add: 'btsadd',
            dele: 'btsdele',
            upd: 'btsupd',
            sele: 'btssele',
            checked: false
          },
          {
            key: 'Audited',
            title: '已审核',
            add: 'cheadd',
            dele: 'chedele',
            upd: 'cheupd',
            sele: 'chesele',
            checked: false
          }
        ]
      },
      {
        key: 'Districtcity',
        title: '区市畜牧主管部门审核',
        checked: false,
        add: 'Districtcityadd',
        dele: 'Districtcitydele',
        upd: 'Districtcityupd',
        sele: 'Districtcitysele',

        children: [
          {
            key: 'zoneaudit',
            title: '待审核',
            add: 'zoneadd',
            dele: 'zonedele',
            upd: 'zonupd',
            sele: 'zonsele',
            checked: false
          },
          {
            key: 'zoneked',
            title: '已审核',
            add: 'zonkadd',
            dele: 'zonkdele',
            upd: 'zonkupd',
            sele: 'zonkele',
            checked: false
          }
        ]
      },
      {
        key: 'SHcity',
        title: '市级畜牧主管部门审核',
        checked: false,
        add: 'SHcityadd',
        dele: 'SHcitydele',
        upd: 'SHcityupd',
        sele: 'SHcitysele',
        children: [
          {
            key: 'municudit',
            title: '待审核',
            add: 'municadd',
            dele: 'mundele',
            upd: 'munupd',
            sele: 'munsele',
            checked: false
          },
          {
            key: 'munked',
            title: '已审核',
            add: 'munkadd',
            dele: 'munkdele',
            upd: 'munkupd',
            sele: 'munksele',
            checked: false
          }
        ]
      }
    ]
  },
  {
    key: 'Basicdata',
    title: '基础数据',
    add: 'Basicdataadd',
    dele: 'Basicdatadele',
    upd: 'Basicdataupd',
    sele: 'Basicdatasele',
    checked: false,
    children: [
      {
        key: 'HEfield',
        title: '养殖场户信息审核',
        add: 'HEfieldadd',
        dele: 'HEfielddele',
        upd: 'HEfieldupd',
        sele: 'HEfieldsele',
        checked: false,
        children: [
          {
            key: 'register',
            title: '注册信息审核',
            add: 'regadd',
            dele: 'regdele',
            upd: 'regupd',
            sele: 'regsele',
            checked: false
          }
        ]
      },
      {
        key: 'HEchang',
        title: '养殖场',
        add: 'farmeradd',
        dele: 'farmerdele',
        upd: 'farmerupd',
        sele: 'farmersele',
        checked: false,
        children: [
          {
            key: 'farmer',
            title: '养殖场户',
            add: 'faradd',
            dele: 'fardele',
            upd: 'farupd',
            sele: 'farsele',
            checked: false
          }
        ]
      },
      {
        key: 'TZchang',
        title: '屠宰场',
        add: 'TZchangadd',
        dele: 'TZchangdele',
        upd: 'TZchangupd',
        sele: 'TZchangsele',
        checked: false,
        children: [
          {
            key: 'slaughter',
            title: '畜禽屠宰企业信用档案',
            add: 'slaugadd',
            dele: 'sladele',
            upd: 'slaupd',
            sele: 'slasele',
            checked: false
          }
        ]
      },
      {
        key: 'HarmlessAll',
        title: '无害化处理厂',
        add: 'HarmlessAlladd',
        dele: 'HarmlessAlldele',
        upd: 'HarmlessAllupd',
        sele: 'HarmlessAllsele',
        checked: false,
        children: [
          {
            key: 'harmless',
            title: '无害化处理厂',
            add: 'harmadd',
            dele: 'harmdele',
            upd: 'harmupd',
            sele: 'harmsele',
            checked: false
          }
        ]
      },
      {
        key: 'assistantAll',
        title: '协管员',
        add: 'assistantAlladd',
        dele: 'assistantAlldele',
        upd: 'assistantAllupd',
        sele: 'assistantAllsele',
        checked: false
      }

    ]
  },
  {
    key: 'disposal',
    title: '无害化处理',
    add: 'disposaladd',
    dele: 'disposaldele',
    upd: 'disposalupd',
    sele: 'disposalsele',
    checked: false,
    children: [
      {
        key: 'HarmlessCP',
        title: '无害化集中处理任务',
        add: 'HarmlessCPadd',
        dele: 'HarmlessCPdele',
        upd: 'HarmlessCPupd',
        sele: 'HarmlessCPsele',
        checked: false,
        children: [
          {
            key: 'conce',
            title: '无害化处理厂集中任务处理',
            add: 'conadd',
            dele: 'condele',
            upd: 'conupd',
            sele: 'consele',
            checked: false
          }
        ]
      },
      {
        key: 'EREiCondition',
        title: '无害化申报处理情况',
        add: 'EREiConditionadd',
        dele: 'EREiConditiondele',
        upd: 'EREiConditionupd',
        sele: 'EREiConditionsele',
        checked: false,
        children: [
          {
            key: 'declare',
            title: '无害化申报记录',
            add: 'decadd',
            dele: 'decdele',
            upd: 'decupd',
            sele: 'decsele',
            checked: false
          }
        ]
      }
    ]
  },
  {
    key: 'DPAControl',
    title: '疫病防控',
    add: 'DPAControladd',
    dele: 'DPAControldele',
    upd: 'DPAControlupd',
    sele: 'DPAControlsele',
    checked: false,
    children: [
      {
        key: 'EPSupplies',
        title: '防疫物资',
        add: 'EPSuppliesadd',
        dele: 'EPSuppliesdele',
        upd: 'EPSuppliesupd',
        sele: 'EPSuppliessele',
        checked: false,
        children: [
          {
            key: 'WRegistration',
            title: '入库登记',
            add: 'WRegistrationadd',
            dele: 'WRegistrationdele',
            upd: 'WRegistrationupd',
            sele: 'WRegistrationsele',
            checked: false
          },
          {
            key: 'ORegistration',
            title: '出库登记',
            add: 'ORegistrationadd',
            dele: 'ORegistrationdele',
            upd: 'ORegistrationupd',
            sele: 'ORegistrationele',
            checked: false
          },
          {
            key: 'ISLETags',
            title: '本人畜牧耳标库存',
            add: 'ISLETagsadd',
            dele: 'ISLETagsdele',
            upd: 'ISLETagsupd',
            sele: 'ISLETagssele',
            checked: false
          },
          {
            key: 'AIRecycling',
            title: '动物标识回收',
            add: 'AIRecyclingadd',
            dele: 'AIRecyclingdele',
            upd: 'AIRecyclingupd',
            sele: 'AIRecyclingsele',
            checked: false
          }
        ]
      },
      {
        key: 'Animalprevention',
        title: '动物防疫',
        add: 'Animalpreventionadd',
        dele: 'Animalpreventiondele',
        upd: 'Animalpreventionupd',
        sele: 'Animalpreventionsele',
        checked: false
        }
    ]
  },
  {
    key: 'SManagement',
    title: '屠宰管理',
    add: 'SManagementadd',
    dele: 'SManagementdele',
    upd: 'SManagementupd',
    sele: 'SManagementsele',
    checked: false,
    children: [
      {
        key: 'TEExamination',
        title: '入场查验',
        add: 'TEExaminationadd',
        dele: 'TEExaminationdele',
        upd: 'TEExaminationupd',
        sele: 'TEExaminationsele',
        checked: false
      },
      {
        key: 'CTesting',
        title: '瘦肉精检测',
        add: 'CTestingadd',
        dele: 'CTestingdele',
        upd: 'CTestingupd',
        sele: 'CTestingsele',
        checked: false
      },
      {
        key: 'MQQReporte',
        title: '肉品品质合格报告单',
        add: 'MQQReporteadd',
        dele: 'MQQReportedele',
        upd: 'MQQReporteupd',
        sele: 'MQQReportesele',
        checked: false
      }
    ]
  },
  {
    key: 'QSupervisionk',
    title: '检疫监管',
    add: 'QSupervisionkadd',
    dele: 'QSupervisionkdele',
    upd: 'QSupervisionkupd',
    sele: 'QSupervisionksele',
    checked: false,
    children: [
      {
        key: 'OQProvincek',
        title: '产地检疫（省里数据）',
        add: 'OQProvincekadd',
        dele: 'OQProvincekdele',
        upd: 'OQProvincekupd',
        sele: 'OQProvinceksele',
        checked: false,
        children: [
          {
            key: 'EOQDeclaration',
            title: '产地检疫申报',
            add: 'EOQDeclarationadd',
            dele: 'EOQDeclarationdele',
            upd: 'EOQDeclarationupd',
            sele: 'EOQDeclarationsele',
            checked: false
          },
          {
            key: 'OQWorkrecord',
            title: '产地检疫工作记录',
            add: 'OQWorkrecordadd',
            dele: 'OQWorkrecorddele',
            upd: 'OQWorkrecordupd',
            sele: 'OQWorkrecordsele',
            checked: false
          },
          {
            key: 'QuarantineHis',
            title: '检疫出证',
            add: 'QuarantineHisadd',
            dele: 'QuarantineHisdele',
            upd: 'QuarantineHisupd',
            sele: 'QuarantineHissele',
            checked: false,
            children: [
              {
                key: 'AnimalhiskA',
                title: '动物A出证',
                add: 'AnimalhiskAadd',
                dele: 'AnimalhiskAdele',
                upd: 'AnimalhiskAupd',
                sele: 'AnimalhiskAsele',
                checked: false
              },
              {
                key: 'AnimalhiskB',
                title: '动物B出证',
                add: 'AnimalhiskBadd',
                dele: 'AnimalhiskBdele',
                upd: 'AnimalhiskBupd',
                sele: 'AnimalhiskBsele',
                checked: false
              }
            ]
          }
        ]
      },
      {
        key: 'EOQuarantineeartag',
        title: '产地检疫（耳标）',
        add: 'EOQuarantineeartagadd',
        dele: 'EOQuarantineeartagdele',
        upd: 'EOQuarantineeartagupd',
        sele: 'EOQuarantineeartagsele',
        checked: false,
        children: [
          {
            key: 'OQDeclarationforme',
            title: '产地检疫申报单',
            add: 'OQDeclarationformeadd',
            dele: 'OQDeclarationformedele',
            upd: 'OQDeclarationformeupd',
            sele: 'OQDeclarationformesele',
            checked: false
          },
          {
            key: 'OQDFProcessing',
            title: '产地检疫申报单处理',
            add: 'OQDFProcessingadd',
            dele: 'OQDFProcessingdele',
            upd: 'OQDFProcessingupd',
            sele: 'OQDFProcessingsele',
            checked: false
          },
          {
            key: 'QWRSheetEofAOrigin',
            title: '动物产地检疫工作记录单',
            add: 'QWRSheetEofAOriginadd',
            dele: 'QWRSheetEofAOrigindele',
            upd: 'QWRSheetEofAOriginupd',
            sele: 'QWRSheetEofAOriginsele',
            checked: false
          },
          {
            key: 'QWRSEforMandS',
            title: '乳用、种用动物检疫工作记录单',
            add: 'QWRSEforMandSadd',
            dele: 'QWRSEforMandSdele',
            upd: 'QWRSEforMandSupd',
            sele: 'QWRSEforMandSsele',
            checked: false
          },
          {
            key: 'QRofeggSandsemena',
            title: '种蛋、胚胎、精液检疫工作记录单',
            add: 'QRofeggSandsemenaadd',
            dele: 'QRofeggSandsemenadele',
            upd: 'QRofeggSandsemenaupd',
            sele: 'QRofeggSandsemenasele',
            checked: false
          },
          {
            key: 'AQCAanimals',
            title: '动物检疫证明（动物A）',
            add: 'AQCAanimalsadd',
            dele: 'AQCAanimalsdele',
            upd: 'AQCAanimalsupd',
            sele: 'AQCAanimalssele',
            checked: false
          },
          {
            key: 'AQCBanimals',
            title: '动物检疫证明（动物B）',
            add: 'AQCBanimalsadd',
            dele: 'AQCBanimalsdele',
            upd: 'AQCBanimalsupd',
            sele: 'AQCBanimalssele',
            checked: false
          }
        ]
      },
      {
        key: 'SQTheprovincedatae',
        title: '屠宰检疫（省里数据）',
        add: 'SQTheprovincedataeadd',
        dele: 'SQTheprovincedataedele',
        upd: 'SQTheprovincedataeupd',
        sele: 'SQTheprovincedataesele',
        checked: false,
        children: [
          {
            key: 'TSQDeclarationbligh',
            title: '屠宰检疫申报',
            add: 'TSQDeclarationblighadd',
            dele: 'TSQDeclarationblighdele',
            upd: 'TSQDeclarationblighupd',
            sele: 'TSQDeclarationblighsele',
            checked: false
          },
          {
            key: 'SQuarantinerecordsK',
            title: '屠宰检疫记录',
            add: 'SQuarantinerecordsKadd',
            dele: 'SQuarantinerecordsKdele',
            upd: 'SQuarantinerecordsKupd',
            sele: 'SQuarantinerecordsKsele',
            checked: false
          },
          {
            key: 'Quarantinehise',
            title: '检疫出证',
            add: 'Quarantinehiseadd',
            dele: 'Quarantinehisedele',
            upd: 'Quarantinehiseupd',
            sele: 'Quarantinehisesele',
            checked: false,
            children: [
              {
                key: 'ProductAtoe',
                title: '产品A出证',
                add: 'ProductAtoeadd',
                dele: 'ProductAtoedele',
                upd: 'ProductAtoeupd',
                sele: 'ProductAtoesele',
                checked: false
              },
              {
                key: 'ProductBtoe',
                title: '产品B出证',
                add: 'ProductBtoeadd',
                dele: 'ProductBtoedele',
                upd: 'ProductBtoeupd',
                sele: 'ProductBtoesele',
                checked: false
              }
            ]
          }
        ]
      },
      {
        key: 'SQEartage',
        title: '屠宰检疫（耳标）',
        add: 'SQEartageadd',
        dele: 'SQEartagedele',
        upd: 'SQEartageupd',
        sele: 'SQEartagesele',
        checked: false,
        children: [
          {
            key: 'DPointeturate',
            title: '屠宰申报点',
            add: 'DPointeturateadd',
            dele: 'DPointeturatedele',
            upd: 'DPointeturateupd',
            sele: 'DPointeturatesele',
            checked: false
          },
          // {
          //   key: 'SQdeclaration',
          //   title: '屠宰检疫申报单',
          //   add: 'SQdeclarationadd',
          //   dele: 'SQdeclarationdele',
          //   upd: 'SQdeclarationupd',
          //   sele: 'SQdeclarationsele',
          //   checked: false
          // },
          // {
          //   key: 'SQdeclarationCl',
          //   title: '屠宰检疫申报单处理',
          //   add: 'SQdeclarationCladd',
          //   dele: 'SQdeclarationCldele',
          //   upd: 'SQdeclarationClupd',
          //   sele: 'SQdeclarationClsele',
          //   checked: false
          // },
          {
            key: 'UNESlaughter',
            title: '急宰通知单',
            add: 'UNESlaughteradd',
            dele: 'UNESlaughterdele',
            upd: 'UNESlaughterupd',
            sele: 'UNESlaughtersele',
            checked: false
          },
          {
            key: 'MNESlaughter',
            title: '准宰通知单',
            add: 'MNESlaughteradd',
            dele: 'MNESlaughterdele',
            upd: 'MNESlaughterupd',
            sele: 'MNESlaughtersele',
            checked: false
          },
          {
            key: 'AQCProductA',
            title: '动物检疫证明（产品A）',
            add: 'AQCProductAadd',
            dele: 'AQCProductAdele',
            upd: 'AQCProductAupd',
            sele: 'AQCProductAsele',
            checked: false
          },
          {
            key: 'AQCProductB',
            title: '动物检疫证明（产品B）',
            add: 'AQCProductBadd',
            dele: 'AQCProductBdele',
            upd: 'AQCProductBupd',
            sele: 'AQCProductBsele',
            checked: false
          }
        ]
      },
      {
        key: 'BManagement',
        title: '证章管理',
        add: 'BManagementadd',
        dele: 'BManagementdele',
        upd: 'BManagementupd',
        sele: 'BManagementsele',
        checked: false,
        children: [
          {
            key: 'IStocke',
            title: '本人库存',
            add: 'IStockeadd',
            dele: 'IStockedele',
            upd: 'IStockeupd',
            sele: 'IStockesele',
            checked: false
          },
          {
            key: 'BWarehousinge',
            title: '证章入库',
            add: 'BWarehousingeadd',
            dele: 'BWarehousingedele',
            upd: 'BWarehousingeupd',
            sele: 'BWarehousingesele',
            checked: false
          }
        ]
      }
    ]
  }
]

const checkboxdata = [
  { label: '安全生产', value: '1', checked: false },
  { label: 'GSP检查', value: '2', checked: false },
  { label: '监管兽医', value: '3', checked: false },
  { label: '收集人员', value: '4', checked: false },
  { label: '驻厂兽医', value: '5', checked: false },
  { label: '养殖场/畜主死亡动物申报', value: '6', checked: false },
  { label: '屠宰监督检查', value: '7', checked: false },
  { label: '屠宰检疫监督', value: '8', checked: false },
  { label: '养殖监督检查', value: '9', checked: false },
  { label: '养殖检疫监督', value: '10', checked: false },
  { label: '饲料现场检查', value: '11', checked: false },
  { label: '饲料安全检查', value: '12', checked: false },
  { label: '兽药现场检查', value: '13', checked: false },
  { label: '兽药安全检查', value: '14', checked: false },
  { label: '动物诊疗机构', value: '15', checked: false },
  { label: '规模养殖场采样', value: '16', checked: false },
  { label: '散养户采样', value: '17', checked: false },
  { label: '屠宰场采样', value: '18', checked: false },
  { label: '牛（羊）市场采样', value: '19', checked: false },
  { label: '活禽市场采样', value: '20', checked: false },
  { label: '野鸟栖息地采样', value: '21', checked: false },
  { label: '保险勘察人员', value: '22', checked: false },
  { label: '签到', value: '23', checked: false },
  { label: '屠宰环节无害化处理', value: '24', checked: false },
  { label: '先打后补', value: '25', checked: false },
  { label: '兽药抽样监督检查', value: '26', checked: false },
  { label: '饲料抽样监督检查', value: '27', checked: false },
  { label: '畜禽抽样监督检查', value: '28', checked: false },
  { label: '生鲜乳抽样监督检查', value: '29', checked: false },
  { label: '活禽经营市场监督检查', value: '30', checked: false },
  { label: '畜禽养殖场监督检查', value: '31', checked: false },
  { label: '疫苗物资发放', value: '33', checked: false },
  { label: '疫苗物资使用', value: '34', checked: false },
  { label: '畜禽养殖场兽药饲料审核', value: '35', checked: false },
  { label: '市繁育推广中心管理员', value: '36', checked: false },
  { label: '区市繁育推广中心管理员', value: '37', checked: false },
  { label: '配种员', value: '38', checked: false },
  { label: '散养户', value: '39', checked: false },
  { label: '动监站站长', value: '40', checked: false },
  { label: '贩运经纪人', value: '41', checked: false },
  { label: '开证人员', value: '42', checked: false },
  { label: '养蜂场企业', value: '43', checked: false },
  { label: '种蜂场企业', value: '44', checked: false },
  { label: '蜂产品企业', value: '45', checked: false },
  { label: '合作社企业', value: '46', checked: false },
  { label: '养殖户监管', value: '47', checked: false },
  { label: '蜂产品企业加工监管', value: '48', checked: false },
  { label: '巡查监管', value: '49', checked: false },
  { label: '驻场车辆核查', value: '50', checked: false },
  { label: '使用以车为单位', value: '51', checked: false },
  { label: '检疫申报', value: '200', checked: false },
  { label: '检疫处理', value: '201', checked: false },
  { label: '开证', value: '207', checked: false },
  { label: '标识使用', value: '202', checked: false },
  { label: '标识回收', value: '203', checked: false },
  { label: '标识发放', value: '204', checked: false },
  { label: '入场查验', value: '205', checked: false },
  { label: '耳标签收', value: '206', checked: false }
]

// 选择是否显示系统目录
var checkAllPermise = []
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log('3' + `selectedRowKeys: ` + selectedRowKeys, 'selectedRows: ', selectedRows)
    console.log(selectedRowKeys)
    checkAllPermise = selectedRowKeys
    console.log(checkAllPermise)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
    checkAllPermise = selectedRows
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log('3' + selected, selectedRows, changeRows)
  }
}
export default {
  inject: ['reload'],
  data () {
    return {
      checkboxdata,
      PCArrydata,
      columns,
      rowSelection,
      selectedRowKeys: [],
      superUser: [],
      FStIdUser: '',
      // 选择web权限  增，删，修
      checkePermise: [],
      // 选择App权限
      checkApppermise: [],
      // App权限回显
      showApppermise: []
    }
  },
  computed: {
    rowSelections () {
      const { selectedRowKeys } = this
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true
      }
    }
  },

  created () {
    // 权限回显
    // "["harmsele","harmdele","harmupd","harmadd","conadd ","conupd","condele","consele","decadd","decupd","decdele","decsele","HarmlessAll","harmless","disposal","HarmlessCP","conce","declare","EREiCondition"]"

    checkAllPermise = []
    var timestamp = new Date().valueOf()
    GetToken()
      .then(res => {
        console.log(res)
        this.$axios({
          method: 'get',
          url: http + '/User/GetRole?AccessToken=' + res.access_token + '&timestamp=' + timestamp
        })
          .then(res => {
            console.log(res)
            if (res.data.Result) {
              this.superUser = [...res.data.Data]
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
    var Clres = JSON.parse(JSON.parse(localStorage.getItem('AllInfo')))
    console.log(Clres)
  },

  methods: {
    Baocun () {
      this.checkePermise = []
      if (!this.FStIdUser) {
        this.$notification.error({
          message: '请选择角色'
        })
        return
      }
      console.log(this.selectedRowKeys)
      if (this.selectedRowKeys.length) {
        this.checkePermise.push(...this.selectedRowKeys)
      }
      console.log(this.checkePermise, this.checkApppermise)
      // if (this.checkePermise) return
      this.$axios({
        method: 'post',
        url: http + '/Management/MenuPopedom',
        data: {
          RoleId: this.FStIdUser,
          PCArray: JSON.stringify(this.checkePermise),
          APPArray: this.showApppermise.join(',')
        }
      })
        .then(res => {
          if (res.data.Result) {
            console.log(res)
            this.$notification.success({
              message: '设置权限分配成功'
            })
            // localStorage.setItem('permissionList', this.checkePermise)
            this.selectedRowKeys = []
            this.checkApppermise = []
            this.showApppermise = []
            this.reload()
          } else {
            this.$notification.error({
              message: '设置权限分配失败，请联系管理人员'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    add (v) {
      console.log(superInfo(v, 'add', PCArrydata, this.selectedRowKeys))
      this.selectedRowKeys = superInfo(v, 'add', PCArrydata, this.selectedRowKeys)
    },
    update (v) {
      this.selectedRowKeys = superInfo(v, 'upd', PCArrydata, this.selectedRowKeys)
    },
    delet (v) {
      this.selectedRowKeys = superInfo(v, 'dele', PCArrydata, this.selectedRowKeys)
    },
    fint (v) {
      this.selectedRowKeys = superInfo(v, 'sele', PCArrydata, this.selectedRowKeys)
    },

    handleSelectChange (value) {
      this.selectedRowKeys = []
      this.showApppermise = []
      console.log(value)
      this.FStIdUser = value
      if (this.FStIdUser) {
        this.$axios({
          method: 'get',
          url: http + '/Management/RolePermissions?RoleId=' + this.FStIdUser
        }).then(res => {
          console.log(res)
          if (!res.data.Data) {
            this.$notification.error({
              message: '该角色暂未分配权限，请勾选权限'
            })
          } else {
            var ClPCArray = JSON.parse(res.data.Data[0].PCArray)
            console.log(ClPCArray)
            console.log(res.data.Data[0].APPArray)
            if (res.data.Data[0].APPArray) {
              this.showApppermise = res.data.Data[0].APPArray.split(',')
            }
            // if (!JSON.parse(res.data.Data[0].APPArray)) {
            //   this.showApppermise = JSON.parse(res.data.Data[0].APPArray).split(',')
            // }
            this.selectedRowKeys = ClPCArray
            if (ClPCArray.length) {
              ClPCArray.forEach((item, index) => {
                // console.log(item)
                PCArrydata.forEach(items => {
                  if (item === items.key) {
                    console.log(items)
                    items.checked = true
                    items.defaultChecked = true
                  }
                })
              })
            }
          }
        })
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows)
      this.selectedRowKeys = selectedRowKeys
    },
    onChange (checkedValues) {
      this.showApppermise = [...checkedValues]
      this.checkApppermise = [...checkedValues]
      console.log(this.checkApppermise)
    },

    // web权限选择
    onChangeSelect (selectedRowKeys) {
      console.log(selectedRowKeys)
    }
  }
}
</script>

<style lang="less" scoped>
.superSU {
  height: 1000px;
}
.quanxian > div {
  display: block;
  height: 100%;
}
.phones {
  width: 500px;
  display: flex;
  justify-content: space-around;
}
.phone {
  /* position: absolute; */
  margin-left: 60px;
  width: 500px;
  height: 100%;
}
.titlename {
  font-size: 30px;
  height: 60px;
  border-bottom: 1px solid #000;
  margin-bottom: 10px;
}
/deep/.ant-checkbox-group-item {
  width: 40%;
}
</style>
