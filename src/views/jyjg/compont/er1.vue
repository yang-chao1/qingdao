<template>
  <div>
    <div class="mm kua">
      <a-checkbox-group
        name="checkboxgroup"
        :options="zong"
        @change="onChange"
      />

    </div>
    <div class="an">
      已输入耳标数量：{{ arr }}/{{ num }}
      <a-button @click="deletearr">删除</a-button>
      <a-button @click="qq">确定</a-button>
    </div>
    <div class="mm a">
      <a-row :gutter="[24,24]">
        <a-col :span="10">耳标号前7位	</a-col>
        <a-col :span="12"><a-input :maxLength="7" v-model="seven" @input="inputChange"></a-input></a-col>
      </a-row>
      <a-row :gutter="[24,24]">
        <a-col :span="10">耳标号中间5位	</a-col>
        <a-col :span="12"><a-input :maxLength="5" @input="inputChange" v-model="fix"></a-input></a-col>
      </a-row>
      <a-row :gutter="[24,24]">
        <a-col :span="10">耳标号输入方式	</a-col>
        <a-col :span="12">
          <a-select default-value="单号输入" style="width: 120px" @change="handleChange">
            <a-select-option value="1">
              单号输入
            </a-select-option>
            <a-select-option value="2">
              阶段连号输入
            </a-select-option>
            <a-select-option value="3">
              全连号输入
            </a-select-option>

          </a-select>
        </a-col>
      </a-row>
      <a-row :gutter="[24,24]" v-if="shi ===1 || shi ===2">
        <a-col :span="10">耳标号后3位	</a-col>
        <a-col :span="10"><a-input :maxLength="3" @input="inputChange" v-model="three"></a-input></a-col>
        <a-col :span="2"><a-button v-if="shi ===1" @click="addEr">添加</a-button></a-col>
      </a-row>
      <a-row :gutter="[24,24]" v-if="shi ===2">
        <a-col :span="10">后3位终止位	</a-col>
        <a-col :span="10"><a-input :maxLength="3" @input="inputChange" v-model="three1"></a-input></a-col>
        <a-col :span="2"><a-button @click="addEr">添加</a-button></a-col>
      </a-row>
      <a-row :gutter="[24,24]" v-if="shi ===3">
        <a-col :span="8">后3位开始	</a-col>
        <a-col :span="10"><a-input :maxLength="3" @input="inputChange" v-model="three2"></a-input></a-col>
        <a-col :span="2"><a-button @click="addEr">添加</a-button></a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { eartag, leixin } from '@/assets/eartag'
export default {

props: {
  // eslint-disable-next-line vue/require-default-prop
  num: {
    type: Number
  },
  // eslint-disable-next-line vue/require-default-prop
  anmainType: {
    type: String
  }
},
data () {
  return {
    arr: 0,
    seven: '',
    fix: '',
    shi: 1,
    three: '',
     three1: '',
     three2: '',
     plainOptions: [],
     plainOptions1: [],
     plainOptions2: [],
     shuzu: [],
     zong: [],
     tt: []
  }
},
mounted () {
  this.getEr()
},
 methods: {
   getEr () {
      const allinfo = JSON.parse(localStorage.getItem('AllInfo'))
       const w = leixin(this.anmainType)
       const q = eartag(allinfo.FSunitUstrId)
        this.seven = w + '' + q
   },
   inputChange () {
   this.seven = this.seven.replace(/[^\d]/g, '')
  },
   qq () {
    //  const zz = this.fenArr()
    const zz = this.zong
     this.zong = []
     this.$emit('hander-fa', zz.join(','))
   },
   deletearr () {
     this.arr = 0
     this.zong = this.getArrDifference(this.shuzu, this.zong)
      console.log(this.shuzu)
     console.log(this.zong)
     if (this.zong.length !== 0) {
      this.zong.forEach((item, index) => {
        if (item.indexOf('-') !== -1) {
          console.log(this.arr)
          const arr = item.split('-')
         const q = parseInt(arr[0].substring(arr[0].length - 3))
         const h = parseInt(arr[1])
         this.arr = this.arr + (h - q + 1)
          console.log(this.arr)
        } else {
          this.arr++
        }
      })
     } else {
       this.arr = 0
     }
   },
    handleChange (value) {
      this.shi = parseInt(value)
        console.log(this.shi)
    },
    onChange (checkedValues) {
      console.log('checked = ', checkedValues)
      this.shuzu = checkedValues
    },
    addEr () {
       if (this.seven.length !== 7 && this.fix.length !== 5 && this.three.length !== 3) {
        alert('请输入正确的位数')
        return
      } else if (this.seven.length !== 7 && this.fix.length !== 5 && this.three1.length !== 3) {
         alert('请输入正确的位数')
        return
      } else if (this.seven.length !== 7 && this.fix.length !== 5 && this.three2.length !== 3) {
         alert('请输入正确的位数')
        return
      }
     // eslint-disable-next-line no-unused-vars
     const zuoarr = this.fenArr()

     if (this.arr < parseInt(this.num)) {
      if (this.shi === 1) {
          const s = this.seven.toString() + this.fix.toString() + this.three.toString()
         const you = this.getArr3(s)
          if (this.bi(you, zuoarr)) {
          alert('有相同耳标号')
          return false
        }
        this.arr++
         this.zong.push(this.seven.toString() + this.fix.toString() + this.three.toString())
      } else if (this.shi === 2) {
        if (this.three1 <= this.three) {
          alert('开始号不能大于结束号！')
          return false
        }

        const s = this.seven.toString() + this.fix.toString() + this.three.toString() + '-' + this.three1.toString()
         const you = this.getArr2(s)
         console.log(you, zuoarr)
        if (this.bi(you, zuoarr)) {
          alert('有相同耳标号')
          return false
        } else {
            if (this.three1 - this.three + 1 > this.num - this.arr) {
              alert('耳标数量超出范围')
              return false
            }
          this.arr = this.arr + (this.three1 - this.three + 1)
          this.zong.push(s)
        }

         // eslint-disable-next-line no-unused-vars
      } else {
        this.arr = parseInt(this.num)
         this.zong = []
         const shu = parseInt(this.three2) + parseInt(this.num) - 1
         const str = this.seven.toString() + this.fix.toString() + this.three2.toString()
         this.zong.push(str + '-' + shu)
      }
     } else {
       alert('失败')
     }
    },

    getArr2 (str) {
       const arr = str.split('-')
       const qi = arr[0].substring(0, 12)
         const q = parseInt(arr[0].substring(arr[0].length - 3))
         const h = parseInt(arr[1])
         var arr1 = []
         for (let a = 0; a <= h - q; a++) {
           arr1.push(qi + '' + (q + a))
         }
         return arr1
    },
      getArr3 (str) {
         var arr1 = []

           arr1.push(str)

         return arr1
    },

    fenArr () {
        var arr = []
         this.zong.forEach((item, index) => {
        if (item.indexOf('-') !== -1) {
          arr = arr.concat(this.ff(item))
          console.log(arr)
        } else {
          arr.push(item)
        }
      })
     return arr
    },
    ff (item) {
      var tt = []
        const arr = item.split('-')
          const w = arr[0].substring(0, 12)
         const q = parseInt(arr[0].substring(arr[0].length - 3))
         const h = parseInt(arr[1])
         console.log(w, q, h)
         for (let a = 0; a <= h - q; a++) {
          tt.push(w + '' + (q + a))
         }
         return tt
    },

     bi (a1, a2) {
    var exists = false
    if (a1 instanceof Array && a2 instanceof Array) {
        for (var i = 0, iLen = a1.length; i < iLen; i++) {
            for (var j = 0, jLen = a2.length; j < jLen; j++) {
                if (a1[i] === a2[j]) {
                    return true
                }
            }
        }
    }
    return exists
},

     getArrDifference (arr1, arr2) {
        return arr1.concat(arr2).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v)
        })
        },

        getArrEqual (arr1, arr2) {
          const newArr = []
          for (let i = 0; i < arr2.length; i++) {
          for (let j = 0; j < arr1.length; j++) {
          if (arr1[j] === arr2[i]) {
          newArr.push(arr1[j])
          }
          }
          }
          return newArr
        }
    }
}
</script>

<style scoped lang="less">
.mm{
  display: inline-block;
  width: 40%;
  height: 380px;
  margin-bottom: 40px;
  position: relative;
}
.an {
  position: absolute;
  bottom: 20px;
}
.kua {
  border: 1px solid #ccc;
}
.a {
  margin-left: 20px;
  width: 40%;
  float: right;
  margin-right: 40px;
}
/deep/ .ant-checkbox-group-item {
    display: inline-block;
    margin-right: 8px;
    width: 100%;
}

</style>
