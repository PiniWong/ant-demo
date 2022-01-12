<template>
  <div class="userListBox">
    <div class="topBox">
        <div class="topLeft">
            <span>用户：{{userName}}</span>
            <span>
                <a-month-picker  @change="changeMonth"  placeholder="选择月份查询列表" class="input"  v-model="mount"/>
            </span>
            <span>总金额:&nbsp;&nbsp;{{monthMoneny}}元</span>
            <a-button type='primary' class="but" @click="addPay">新增记录</a-button>
            <a-button class="but"  @click="changeListPage"><a-icon type="swap" />切换到列表</a-button>

        </div>
    </div>
    <a-tabs default-active-key="1" @change="tabsChange">
            <a-tab-pane key="1">
            <span slot="tab">
                <a-icon type="money-collect" />
                支出
            </span>
            </a-tab-pane>
            <a-tab-pane key="2">
            <span slot="tab">
                <a-icon type="pay-circle" />
                收入
            </span>
            </a-tab-pane>
    </a-tabs>
    
    <div class="pay_come">
        <div class="payBox" >
            <a-divider class="title" v-if="tabs==1">{{mount}}月的支出图表</a-divider>
            <a-divider class="title" v-else>{{mount}}月的收入图表</a-divider>
            <div id="main" class="main">
            </div>
        </div>
        <div class="payBox" >
            <a-divider class="title" v-if="tabs==1">{{mount}}月的各个支出方式数据</a-divider>
            <a-divider class="title" v-else>{{mount}}月各个收入方式数据</a-divider>
            <div id="paytype_main" class="main">
            </div>
        </div>
    </div>
    <div class="pay_come" >
        <div class="pay-bot"  >
              <a-divider class="title" v-if="tabs==1">{{mount}}月<span v-if="week">第{{week}}周</span>的支出列表</a-divider>
              <a-divider class="title" v-else>{{mount}}月<span v-if="week">第{{week}}周</span>的收入列表</a-divider>
              <div class="pay-card-box">
                  <div class="pay-card">
                        <div class="pay-card-item"  v-for="(item,index) in left1PayCardArr" :key="index">
                          <div class="item-buse"  v-if="item.beType" :style="{backgroundColor:item.color}">
                              {{item.beType}}
                          </div>
                          <div class="item-buse" style="" v-else >
                            <img  src="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"/>
                          </div>
                          <div class="item-info">
                            <p>时间：{{item.date}}</p>
                            <p>支付方式：{{item.pay_type}}&nbsp;&nbsp;&nbsp;<span>支付金额：{{item.money}}元</span></p>
                            <p>备注：{{item.remark}}</p>
                          </div>
                          <div class="edit">    
                              <span @click="editClick(item)"> <a-icon type="setting" theme="filled" /></span>
                              <span @click="delClick(item)"> <a-icon type="delete" /></span>
                          </div>
                      </div>
                  </div>
                  <div class="pay-card">
                      <div class="pay-card-item" v-for="(item,index) in right1PayCardArr" :key="index">
                          <div class="item-buse"  v-if="item.beType" :style="{backgroundColor:item.color}">
                              {{item.beType}}
                          </div>
                          <div class="item-buse" style="" v-else >
                            <img  src="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"/>
                          </div>
                          <div class="item-info">
                            <p>时间：{{item.date}}</p>
                            <p>支付方式：{{item.pay_type}}&nbsp;&nbsp;&nbsp;<span>支付金额：{{item.money}}元</span></p>
                            <p>备注：{{item.remark}}</p>
                          </div>
                          <div class="edit">    
                              <span @click="editClick(item)"> <a-icon type="setting" theme="filled" /></span>
                              <span @click="delClick(item)"> <a-icon type="delete" /></span>
                          </div>
                      </div>
                  </div>
                  <div class="pay-card">
                      <div class="pay-card-item" v-for="(item,index) in left2PayCardArr" :key="index">
                          <div class="item-buse"  v-if="item.beType" :style="{backgroundColor:item.color}">
                              {{item.beType}}
                          </div>
                          <div class="item-buse" style="" v-else >
                            <img  src="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"/>
                          </div>
                          <div class="item-info">
                            <p>时间：{{item.date}}</p>
                            <p>支付方式：{{item.pay_type}}&nbsp;&nbsp;&nbsp;<span>支付金额：{{item.money}}元</span></p>
                            <p>备注：{{item.remark}}</p>
                          </div>
                          <div class="edit">    
                              <span @click="editClick(item)"> <a-icon type="setting" theme="filled" /></span>
                              <span @click="delClick(item)"> <a-icon type="delete" /></span>
                          </div>
                      </div>
                  </div>
                  <div class="pay-card">
                      <div class="pay-card-item" v-for="(item,index) in right2PayCardArr" :key="index">
                          <div class="item-buse"  v-if="item.beType" :style="{backgroundColor:item.color}">
                              {{item.beType}}
                          </div>
                          <div class="item-buse" style="" v-else >
                            <img  src="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"/>
                          </div>
                          <div class="item-info">
                            <p>时间：{{item.date}}</p>
                            <p>支付方式：{{item.pay_type}}&nbsp;&nbsp;&nbsp;<span>支付金额：{{item.money}}元</span></p>
                            <p>备注：{{item.remark}}</p>
                          </div>
                          <div class="edit">    
                              <span @click="editClick(item)"> <a-icon type="setting" theme="filled" /></span>
                              <span @click="delClick(item)"> <a-icon type="delete" /></span>
                          </div>
                      </div>
                  </div>
              </div>
        </div>
    </div>

    <!-- //弹窗 -->
    <a-modal  :zIndex='10' destroyOnClose  ok-text='确认' cancel-text='取消' :title="'新增记录'" :visible="showpayAdd" @ok="showpayOK" @cancel="()=>{showpayAdd = false}" :width="750">
      <a-form :form="addPayForm" >
      <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item  label="人物">

              <!-- <a-select   v-decorator="payRules.userId"  allowClear class="input"  placeholder="请选择人物">
                <a-select-option v-for="(item,index) in userList" :key="index" :value='item.userId'>
                  {{item.name}}
                </a-select-option>
              </a-select>
              <a-icon type="plus-circle" @click='addUser' class="icon" /> -->
              <!-- <a-input></a-input> -->
              <span>
                {{userName}}
              </span>

            </a-form-item>

            </a-col>
          <a-col :span="12" >
            <a-form-item  label="支付/收入">
            <a-select  v-decorator="payRules.payOrIncome"  allowClear class="input" placeholder="请选择">
                <a-select-option  :value='0'>
                  支出
                </a-select-option>
                <a-select-option  :value='1'>
                  收入
                </a-select-option>
            </a-select>
            </a-form-item>
         </a-col>
      </a-row>
    <a-row :gutter="24">
          <a-col :span="12" >
            <a-form-item  label="支付方式">
            <a-select  v-decorator="payRules.pay_type"  allowClear class="input"  placeholder="请选择支付方式">
                <a-select-option v-for="(item,index) in paytypeList" :key="index" :value='item.pay_type'>
                  {{item.info}}
                </a-select-option>
            </a-select>
            </a-form-item>
          </a-col>
      
        <a-col :span="12">
            <a-form-item label="支付金额">
              <a-input class="input" placeholder="请填写" v-decorator="payRules.money" />
            </a-form-item>
          </a-col>
    </a-row>
<a-row :gutter="24">
        <a-col :span="12">
            <a-form-item label="日期" >
              <a-date-picker class="input" placeholder="请填写日期" v-decorator="payRules.date" />
            </a-form-item>
        </a-col>
    
        <a-col :span="12">
            <a-form-item label="支付类型">
              <span v-if="selectedTag1" >
                <template v-for="(item,index) in beuseList" >
                  <a-tag class="tag" closable @close="()=>{selectedTag1=null}" v-if="selectedTag1==item.beuse"  :color="item.color" :key="index"  :value='item.beuse'>
                    <span>{{item.beType}}</span>
                  </a-tag>
                </template>
              </span>
              <a-tooltip v-else  placement="top">
                <template slot="title">
                  <span>选择支付类型</span>
                </template>
                        <a-icon type="plus-circle" @click="addBeuse" class="icon" />
              </a-tooltip>
            </a-form-item>
          </a-col>
    </a-row>
    <a-row :gutter="24">
        <a-col :span="24">
            <a-form-item label="订单备注">
              <a-textarea name="" id="" rows="10" v-decorator="payRules.remark"></a-textarea>
            </a-form-item>
          </a-col>
    </a-row>
    </a-form>
    </a-modal>
    <a-modal :zIndex='666'  destroyOnClose   :title="'选择支付类型'" ok-text='确认' cancel-text='取消' :visible="showBeuse" @ok="addBeuseOk" @cancel="showBeuse = false" >
      <div class="model">
        <template  v-for="(item,index) in beuseList">
          <a-tag :class="[ clickTag==item.beuse ? 'tagChange': '','tag']"  @close="()=>{selectedTag1=null}"  @click="clickBeuseTag(item.beuse)" :color="item.color" :key="index"  :value='item.beuse'>
            <span>{{item.beType}}</span>
            <!-- <span class="icon"> -->
              <!-- <a-icon type="check-circle"  v-if="clickTag==item.beuse" /> -->
              <!-- <a-icon type="close-circle" v-else /> -->
            <!-- </span> -->
          </a-tag>

        </template>
      </div>
      
      
    </a-modal>
    

  </div>
</template>

<script>
     




import axios from '@/utils/axios'
import moment from 'moment'
import { validator } from '@/utils/index'
// import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import * as echarts from 'echarts';

const payRules = {
  userId:['userId',{ rules: [{ required: true, message: '请选择人物' }] }],
  payOrIncome:['payOrIncome',{ rules: [{ required: true, message: '请选择支付方式' }] }],
  pay_type:['pay_type',{ rules: [{ required: true, message: '请选择支付方式' }] }],
  date:['date' ,{ rules: [{ required: true, message: '请选择时间' }] }],
  money:['money', { rules: [{ required: true, message: '请选择输入金额' },validator.number] }],
  remark:['remark',{ rules: [{ required: true, message: '请输入订单备注' }] }],
}

export default {
  data() {
    return {
        mount:null,
        userId:null,
        userName:null,
        //总金额
        monthMoneny:null,
        //图一
        weekPayList:[],
        weekPay:[],
        xAxisPayArr:[],
        //图二
        payTypeParams:[],

        //卡片
        left1PayCardArr:[],
        left2PayCardArr:[],
        right1PayCardArr:[],
        right2PayCardArr:[],
        
        //默认展示第几周
        week:1,

        xAxisComeArr:[],
        weekComeList:[],
        tabs:1,
        dataIndex:0,

        //新增
        addPayForm:this.$form.createForm(this, { name: "addPayForm" }),
        listId:null,
        showpayAdd: false,
        payRules,
        //新增类型类型
        beuseList:null,
        showUesdList:[],
        showBeuse:false,
        clickTag:null,
        selectedTag1:null,

        


        //支付列表
        paytypeList:[],
        payTypeDim:[],
        payTypeSource:[]
      

    };
  },
  watch:{
    showBeuse(newVal){
      if(newVal){
        this.getBeuseList()
      }
    }
  },

  
  computed: {
    total() {
      return this.data.length;
    },
  },

  methods: {
    changeMonth(value){
      this.mount = moment(value).format('YYYY-MM')
      this.getWeekPayData(this.tabs)
    },
    tabsChange(value){
        this.tabs = value
        this.getWeekPayData(value)
    },
    createPayEchart(){
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        var option;
        option = {
            //移入显示数据
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: {
            type: 'category',
            data: this.xAxisPayArr
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: this.weekPay,
            type: 'line',
            smooth: true
            }
        ]
        };
        myChart.off('click');
        myChart.on('click', this.getWeekDetail);

        option && myChart.setOption(option);
    },
    createPayTypeEchart(){
        let chartDom = document.getElementById('paytype_main');
        let myChart = echarts.init(chartDom);
        let option;
        option = {
        legend: {},
        tooltip: {},
        dataset: {
            dimensions: this.payTypeDim,
            source: this.payTypeSource
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
        };
        myChart.off('click');
        myChart.on('click', this.getWeekDetail);
        option && myChart.setOption(option);
    },
    getWeekDetail(params){
                console.log(params)
                console.log(this.payTypeDim)
        let payType = null
                this.payTypeDim.forEach((el,key)=>{
                    if(params.seriesName==el){
                        payType = key 
                    }
                })
        let date = this.weekPayList[params.dataIndex].base
        this.week = params.dataIndex+1
        this.dataIndex= params.dataIndex

        this.getPayType()
        axios.post('/admin/checkAWeek',{
            userId:this.userId,
            date:date,
            payType:payType,
            payOrIncome:Number(this.tabs-1)
        },{useJSONContentType:true}).then( (res)=>{
            const object = res.data
            if(object.state.success){
                const data = object.list
                // console.log(data)
                let changeleft1Arr = []
                let changeright1Arr = []
                data.forEach((el,i) => {
                    el.pay_type=this.paytypeList[el.pay_type-1]?.info|| '暂无'
                    el.date=moment(el.date).format('YYYY-MM-DD')
                    if(i%2==0){
                        changeleft1Arr.push(el)
                    }else{
                        changeright1Arr.push(el)
                    }
                });
                let arrLeft1 = []
                let arright1 = []
                let arrLeft2 = []
                let arright2 = []
                changeleft1Arr.forEach((el,i)=>{
                    if(i%2==0){
                        arrLeft1.push(el)
                    }else{
                        arrLeft2.push(el)
                    }
                })
                changeright1Arr.forEach((el,i)=>{
                    if(i%2==0){
                        arright1.push(el)
                    }else{
                        arright2.push(el)
                    }
                })
                this.left1PayCardArr=arrLeft1
                this.left2PayCardArr=arrLeft2
                this.right1PayCardArr=arright1
                this.right2PayCardArr=arright2 
            }
        })
    },
    getWeekPayData(value){
        let url = ''
        if(value==1){
            url = '/admin/monthPayChart'
        }else{
            url = '/admin/monthComeChart'
        }
        this.left1PayCardArr=[],
        this.left2PayCardArr=[],
        this.right1PayCardArr=[],
        this.right2PayCardArr=[],
        axios.post(url,{
            userId:this.userId,
            date:this.mount,
        },{useJSONContentType:true}).then((res)=>{
        
            const object = res.data
            if(object.state.success){
                const data = object.list
                this.weekPayList = data
                this.xAxisPayArr=[]
                this.weekPay=[]
                this.payTypeParams=[]
                let monthTatol = 0

                data.forEach((el,i) => {
                    if(el.total==null) data[i].total = 0
                    monthTatol +=Number(data[i].total)
                    this.xAxisPayArr.push(`第${i+1}周`)
                    this.payTypeParams.push(data[i].base)
                    this.weekPay.push(data[i].total)
                });
                this.monthMoneny=monthTatol.toFixed('2')
                 this.createPayEchart()
                 this.getWeekDetail({dataIndex:this.dataIndex})
                 this.getWeekPayTypeDate(this.tabs)
            }
        })
    },
    getWeekPayTypeDate(payOrIncome){
        let payOc = 0
        if(payOrIncome){
            payOc = payOrIncome - 1
        }
        const params = {
            week:this.payTypeParams,
            userId:this.userId,
            payOrIncome:payOc
        }
        this.getPayType()
        axios.post('admin/monthPayTypeChart',params,{useJSONContentType:true}).then((res)=>{
            const object = res.data
            if(object.state.success){
                const data = object.list
               let list=[]
                data.forEach((el,i) => {
                    let arr = {}
                    el.forEach(el2=>{
                        arr.product=`第${i+1}周`
                        if(el2.info){
                            arr[el2.info]=el2.money
                        }
                        
                    })
                    list.push(arr)
                });
                this.payTypeSource = list
                console.log(list)
                this.createPayTypeEchart()    

            }
        })

    },


    getPayType(){
      axios.post('/admin/paytypeList').then((res)=>{
        console.log(res)
        const object = res.data
      if(object.state.success){
        const data = object.list
          this.paytypeList = data
          this.payTypeDim=[]
          this.payTypeDim[0]='product'
          data.forEach(el => {
              this.payTypeDim.push(el.info)
          });

      }

      })
    },

    //新增
    addPay() {
      this.showpayAdd = true;
      this.listId=null;
      this.selectedTag1=null;
      // const userId = this.pagination.userId
    },
    showpayOK(){
      this.addPayForm.validateFields((err,values)=>{
        if(!err){
          console.log(values)
          if(values.date){
            values.date=moment(values.date).format('YYYY-MM-DD')
          }
          if(!this.selectedTag1){
            this.$message.warning('请选择支付类型')
          }
          const params = {
            ...values,
            userId:this.userId,
            id:this.listId,
            beuse:this.selectedTag1 

          }
          console.log(params)
          
          axios.post('/admin/addPay',params,{useJSONContentType:true}).then((res)=>{
            console.log(res)
            if(res.data.state.success){
              this.$message.success('添加/修改成功')
              this.showpayAdd = false;
               this.getWeekPayData(this.tabs)

            }else{
              this.$message.success('添加/修改失败')
            }
          })
        }
      })
    },
    //获取类型方式列表
    getBeuseList(){
      axios.post('/admin/beuseList').then((res)=>{
        const object = res.data
      if(object.state.success){
        const data = object.list
          this.beuseList = data
      }

      })
    },
    addBeuse(i){
      this.showBeuse=true
        this.clickTag=null
      
    },
    addBeuseOk(){
      this.showBeuse=false
      this.selectedTag1=this.clickTag
    },
    clickBeuseTag(id){
      // console.log(id)
      if(this.clickTag==id){
        this.clickTag=null
        return
      }
      this.clickTag=id
    },
    //编辑
    editClick(text){
    this.showpayAdd = true;
      this.listId = text.id
      let pay_type = null
     this.getBeuseList()
               this.paytypeList.forEach((el,index) => {
                  if(el.info==text.pay_type){
                    pay_type=index+1
                  }
               });
      this.$nextTick(()=>{  
        this.addPayForm.setFieldsValue({
          payOrIncome:text.payOrIncome,
          pay_type:pay_type,
          date:text.date,
          money: text.money,
          remark:text.remark,
        })
      })
      this.selectedTag1=text.beuse
    },
    delClick(text){
         this.$confirm({
        title: '删除',
        content: `是否删除该条“${text.remark}”记录`,
        onOk:()=>{
          // console.log(text.id);
          axios.post('admin/deletePay',{id:text.id}).then((res)=>{
            if(res.data.state.success){
              this.$message.success('删除成功')
               this.getWeekPayData()
            }else{
              this.$message.success('删除失败')
            }
          })
          

        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    },

    //切换列表
    changeListPage(){
      this.$router.push({
        name:'payList',
        query:{
          userId:this.userId,
          userName:this.userName,
        }
      })
    }
    

  },
  mounted(){
    // this.createEchart()
    // this.createPayTypeEchart()    

  },

  created() {
    const userId= this.$route.query.userId
    const userName= this.$route.query.userName
    this.userId = userId
    this.userName = userName
    this.mount = moment().format('YYYY-MM')
    this.getWeekPayData(1)
  },
};
</script>

<style lang="less" scoped>

.topBox {
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin-bottom: 20px;
.topLeft{
    span{
        margin-left: 20px;
    }
}
 .but{
   width: 150px;
   margin-left: 30px;
 }
 .input{
    width: 160px;
  }
 
}
.rightbut{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .but{
    margin-top: 5px;
  }
}
.pay_come{
    width: 100%;
    display: flex;
    justify-content: space-around;
   
    .payBox{
    width: 49%;
        .title{
            display: flex;
        justify-content: space-around;
        }
        .main,.come{
            width: 100%;
            height: 300px;
        }
        
    }
    .pay-bot{
         width: 100%;
    }

}
.pay-card-box{
    display: flex;
    justify-content: space-around;
    .pay-card{
        width: 23%;
        .pay-card-item{
            width: 100%;
            padding: 15px 15px  15px 12px;
            display: flex;
            justify-content: flex-start;
            margin-top: 12px;
            border-radius: 13px;
            box-shadow: 2px 2px 10px rgba(64, 169, 255, 0.603);
            .item-buse{
                width: 60px;
                height: 60px;
                text-align: center;
                line-height: 55px;
                color: white;
                font-size: 20px;
                border-radius: 10px;
                img{
                    height:80%;
                    width:100%
                }
              
            }
            .item-info{
                margin-left: 10px;
                font-size: 8px;
                line-height: 12px;
                margin-top: 2px;
                width: 70%;
                span{
                    color: red;
                }
                p:nth-child(3){
                    line-height:15px;
                }
            }
            .edit{
                    font-size: 10px;
                    position: relative;
                    left: 10px;
                span{
                    align-items: center;
                    display: block;
                    text-align: center;
                    cursor: pointer;
                    margin-top: 5px;
                    font-size: 13px;
                    border-radius:3px 0px 0px 3px;
                    margin-bottom: 5px;

                    &:nth-child(1){
                        width: 30px;
                        color: rgba(16, 142, 233);
                    }
                    &:nth-child(2){
                        width: 30px;
                        color: rgb(255, 92, 92);
                    }
                }
                
            }
        }
    }
}

.input {
  width: 200px;
}
.icon{
   font-size: 20px;
   margin-left: 5px;
   color: rgba(24, 144, 255);
   cursor: pointer;
   margin-right: 8px
 }
 .model{
   .tag{
     margin:8px;
     width:80px;
     height:50px;
     margin-right: 30px;
     .icon{
      font-size:18px;
      color: rgb(98, 179, 63);
    }
    
   }
   .tagChange{
            box-shadow: 0px 4px  rgb(66, 201, 255);
            border: 4px solid rgb(255, 255, 255);
        }
   
 }



</style>
