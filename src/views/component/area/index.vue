<template>
  <div>
    <a-col :span="5">
      <a-select v-model="provinceCode" placeholder="请选择">
        <a-select-option
          v-for="(item,index) in provinceList"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
    </a-col>
    <a-col :span="5">
      <a-select v-model="cityCode" placeholder="请选择">
        <a-select-option
          v-for="(item,index) in cityList"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
    </a-col>
    <a-col :span="5">
      <a-select v-model="areaCode" placeholder="请选择">
        <a-select-option
          v-for="(item,index) in areaList"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
    </a-col></div>
</template>

<script>
import citydata from '@/assets/citydata'
export default {
    props: {
        // eslint-disable-next-line vue/require-default-prop
        province: {
            type: String,
            required: false,
            deafult: () => null
        },
        // eslint-disable-next-line vue/require-default-prop
        city: {
            type: String,
            required: false,
            deafult: () => null
        },
        // eslint-disable-next-line vue/require-default-prop
        area: {
            type: String,
            required: false,
            deafult: () => null
        }
    },
    watch: {
        provinceCode (val) {
            this.$emit('update:province', val)
        },
        province (val) {
            this.provinceCode = val
            if (val) {
                this.getCityList(val)
            }
        },
        cityCode (val) {
            this.$emit('update:city', val)
        },
        city (val) {
            this.cityCode = val
            if (val) {
                this.getAreaList(val)
            }
        },
        areaCode (val) {
            this.$emit('update:area', val)
        },
        area (val) {
            this.areaCode = val
        }
    },
    data () {
        return {
            provinceList: [],
            cityList: [],
            areaList: [],
            provinceCode: this.province,
            cityCode: this.city,
            areaCode: this.area,
            tt: ''
        }
    },
    mounted () {
        this.getProvince()
    },
    methods: {
        fucx (val) {
            console.log('4444', val)
            this.tt = val
        },
        getProvince () {
            this.provinceList = citydata
            // console.log(this.provinceList)
            if (this.provinceCode) {
                this.getCityList(this.provinceCode)
            }
        },
        getCityList (val) {
            const arr = this.provinceList
            for (const item of arr) {
                if (item.value === val) {
                    this.cityList = item.children
                }
            }
            if (this.cityCode) {
                // this.cityCode = this.cityList[0].value
                this.getAreaList(this.cityCode)
            }
        },
        getAreaList (val) {
            const arr = this.cityList
            for (const item of arr) {
                if (item.value === val) {
                    this.areaList = item.children
                }
            }
            // if(this.areaCode){
            //     this.areaCode = this.areaList[0].value
            // }
        }
    }
}
</script>

<style>
</style>
