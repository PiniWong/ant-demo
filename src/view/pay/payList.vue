<template>
  <div class="userListBox">
    <div class="topBox">
      <a-form style="margin: 20px" layout="inline" @submit="onSearch" :form="form">
       <!-- <a-form-item>
          <a-select  v-decorator="searchRules.userId"  allowClear class="input" placeholder="请选择人物">
                <a-select-option v-for="(item,index) in userList" :key="index" :value='item.userId'>
                  {{item.name}}
                </a-select-option>
            </a-select>
              <a-tooltip placement="top">
                <template slot="title">
                  <span>添加人员</span>
                </template>
                    <a-icon type="plus-circle" @click="addUser" class="icon" />

              </a-tooltip>
        </a-form-item>  -->
      <span style="margin-right: 20px">用户：{{userName}}</span>

        <a-form-item>
            <a-select  v-decorator="searchRules.payOrIncome"  allowClear class="input"  placeholder="支付/收入">
                <a-select-option  :value='0'>
                  支出
                </a-select-option>
                <a-select-option  :value='1'>
                  收入
                </a-select-option>
            </a-select>
        </a-form-item>  
        <a-form-item>
            <a-select  v-decorator="searchRules.pay_type"  allowClear class="input"  placeholder="支付方式">
                <a-select-option v-for="(item,index) in paytypeList" :key="index" :value='item.pay_type'>
                  {{item.info}}
                </a-select-option>
            </a-select>
            <a-tooltip placement="top">
                <template slot="title">
                  <span>添加支付方式</span>
                </template>
                    <a-icon type="plus-circle" @click="addPayType" class="icon" />
            </a-tooltip>
        </a-form-item>
        <a-form-item label='支付/收入类型'>
          
            <span v-if="selectedTag" >
              <template v-for="(item,index) in beuseList" >
                <a-tag class="tag" closable @close="()=>{selectedTag=null}" v-if="selectedTag==item.beuse"  :color="item.color" :key="index"  :value='item.beuse'>
                  <span>{{item.beType}}</span>
                </a-tag>
              </template> 
            </span>
          <a-tooltip v-else  placement="top">
            <template slot="title">
              <span>选择支付/收入类型</span>
            </template>
                    <a-icon type="plus-circle" @click="addBeuse" class="icon" />
          </a-tooltip>

        </a-form-item>
         <a-form-item v-show="showDateMonth">
              <a-month-picker  @change="changeMonth"  placeholder="选择月份查询列表" class="input"  :locale='locale'  v-decorator="searchRules.month"/>
        </a-form-item>
        <a-form-item v-show="!showDateMonth">
              <a-date-picker @change="changeDate" :locale='locale' class="input"   placeholder="选择日期查询列表"   v-decorator="searchRules.date" />
        </a-form-item>
        <a-tooltip placement="top">
          <template slot="title">
            <span>切换日期搜索格式</span>
          </template>
          <a-icon   type="swap" @click="changeDateMonth" style="line-height:40px;margin-left:-10px;;margin-right:10px" class="icon" />
        </a-tooltip>
        <a-form-item>
          <a-button type="primary" htmlType="submit" icon="search">搜索</a-button>
        </a-form-item>
      </a-form>
      <div class="rightbut">
        <a-button class="but" style="margin-right: 20px" @click="changeChartPage"><a-icon type="swap"  />切换到图表</a-button>
         <a-button type='primary' class="but" @click="addPay">新增记录</a-button>
      </div>
    </div>
    <!-- 列表--- -->
    <a-table
      :loading="loading"
      table-layout="fixed"
      :pagination="antdPagination"
      :rowKey="el => (el.id+','+el.name)"
      :columns="columns"
      :data-source="dataSource"
       @change="onPageChange"
    >
      <span slot="pay" slot-scope="text">
        <span  v-for="(item,index) in paytypeList" :key="index" :value='item.pay_type'>
          <span v-if='text.pay_type==item.pay_type'>{{item.info}}</span>
        </span>
      </span>
      <span slot="beType" slot-scope="text">
              <template v-for="(item,index) in beuseList" >
                <a-tag class="tag" v-if="text==item.beType"  :color="item.color" :key="index"  :value='item.beuse'>
                  <span>{{text}}</span>
                </a-tag>
              </template>
      </span>
      <span slot="payOrIncome" slot-scope="text">
        <span v-if="text.payOrIncome==0">支出</span>
        <span v-else>收入</span>
      </span>
      

      <span slot="action" slot-scope="text">
        <a href="#" @click="showDeleteConfirm(text)" style="color: red"
          >删除</a
        >
        <a-divider type="vertical" />
        <a href="#" @click="showEdit(text)" style="color: green">编辑信息</a>
        <a-divider type="vertical" />
      </span>
    </a-table>

    <!-- 弹窗--- -->
    
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
                        <a-icon type="plus-circle" @click="addBeuse(1)" class="icon" />
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
        <template  v-for="(item,index) in showUesdList">
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
    
    <a-modal  destroyOnClose  :title="'添加支付方式类型'" ok-text='确认' cancel-text='取消' :visible="showPayType" @ok="addPayTypeOk" @cancel="showPayType = false" :width='400' >
      <a-form :form="addPayTypeForm"  :label-col="{ span: 7 }" >
                    <a-form-item label="支付方式">
                      <a-input class="input" placeholder="请填写" v-decorator="addPayTypeRules.pay" />
                    </a-form-item>
      </a-form>
    </a-modal>
    

              <!-- <colorPicker v-model="color" /> -->

  </div>
</template>

<script>
const columns = [
  {
    dataIndex: "name",
    key: "name",
    title: "用户",
  },
   {
    title: "支出/收入",
    key: "payOrIncome",
    scopedSlots: { customRender: "payOrIncome" },
  },
  {
    title: "支付方式",
    key: "pay",
    scopedSlots: { customRender: "pay" },
  },
  {
    title: "支出类型",
    key: "beType",
    dataIndex: "beType",
    scopedSlots: { customRender: "beType" },

  },
  {
    title: "支付金额",
    key: "money",
    dataIndex: "money",
  },
  {
    title:'时间',
    key:'date',
    dataIndex:'date'
  },
  {
    title: "备注",
    key: "remark",
    dataIndex: "remark",
  },
  {
    title:'操作',
     key: "action",
    scopedSlots: { customRender: "action" },
  }
];
const payRules = {
  userId:['userId',{ rules: [{ required: true, message: '请选择人物' }] }],
  payOrIncome:['payOrIncome',{ rules: [{ required: true, message: '请选择支付方式' }] }],
  pay_type:['pay_type',{ rules: [{ required: true, message: '请选择支付方式' }] }],
  date:['date' ,{ rules: [{ required: true, message: '请选择时间' }] }],
  money:['money', { rules: [{ required: true, message: '请选择输入金额' },validator.number] }],
  remark:['remark',{ rules: [{ required: true, message: '请输入订单备注' }] }],
}
const searchRules = {
  payOrIncome:['payOrIncome'],
  pay_type:['pay_type'],
  date:['date'],
  month:['month']
}
const addUserRules = {
  name:['name', { rules: [{ required: true, message: '请选择输入人员名字' }] }],
}
const addPayTypeRules = {
  pay:['pay', { rules: [{ required: true, message: '请选择输入新增的支付方式' }] }],
}
import axios from '@/utils/axios'
import moment from 'moment'
import { validator } from '@/utils/index'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'

export default {
  data() {
    return {
      dataSource: [],
      columns,
      // 删除
      deleteMsg: "",
      // 权限
      // visiblePop1: false,
      // authMsg: "",
      // authTagDel: [],
      // showAuthadd: false,

      //编辑
      visibleAuth: false,
      editMsg: "",
      //表格
      loading: false,
      form1: this.$form.createForm(this, { name: "edit" }),
      antdPagination: {
        defaultPageSize: 10,
         showSizeChanger:true,
        pageSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],

      },
      searchInput: "",

      //新增
      form:this.$form.createForm(this, { name: "form" }),
      searchRules,
      pagination:{
        size: 10,
        page: 1
      },
      addPayForm:this.$form.createForm(this, { name: "addPayForm" }),
      listId:null,
      showpayAdd: false,
      payRules,
      locale,
      
      //date 
      showDateMonth:false,

      //
      userList:null,
      

      //新增人员
      userName:null,
      

      //新增方式类型
      showPayType:false,
      paytypeList:null,
      addPayTypeForm:this.$form.createForm(this, { name: "addPayTypeForm" }),
      addPayTypeRules,

      //新增类型类型
      beuseList:null,
      showUesdList:[],
      showBeuse:false,
      showBeuseKey:null,
      clickTag:null,
      selectedTag:null,
      selectedTag1:null,

      //颜色
      color: '#ff0000',
      

    };
  },
  watch:{
    showBeuse(newVal){
      if(newVal){
        this.getBeuseList(1)
      }
    }
  },

  
  computed: {
    total() {
      return this.data.length;
    },
  },

  methods: {
    //列表
    onPageChange(antdPagination, filters, sorter){
      this.pagination.size = antdPagination.pageSize
      this.pagination.page = antdPagination.current
      this.getPayList()
    },
    getPayList(){
      axios.post('/admin/paylist',this.pagination,{useJSONContentType:true}).then((res)=>{
      // console.log(res.data.list)
      const object = res.data
      if(object.state.success){
        const data = object.list
        data.forEach(el => {
          el.date = moment(el.date).format('YYYY-MM-DD')
        });
        this.dataSource=data
         this.antdPagination = {
            total: object.count, // 总条数
            showTotal: total => {
              return `总共 ${total} 项`
            }
          }
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
    //修改
    showEdit(text) {
      this.showpayAdd = true;
      this.listId = text.id
      this.$nextTick(()=>{  
        this.addPayForm.setFieldsValue({
          payOrIncome:text.payOrIncome,
          pay_type:text.pay_type,
          date:text.date,
          money: text.money,
          remark:text.remark,
        })
      })
      this.selectedTag1=text.beuse
    },
    showpayOK(){
      console.log('ok')
      this.addPayForm.validateFields((err,values)=>{
        if(!err){
          if(values.date){
            values.date=moment(values.date).format('YYYY-MM-DD')
          }
          if(!this.selectedTag1){
            this.$message.warning('请选择支付类型')
          }
          console.log(this.pagination.userId)
          const params = {
            ...values,
            userId:this.pagination.userId,
            id:this.listId,
            beuse:this.selectedTag1 

          }
          console.log(params)
          
          axios.post('/admin/addPay',params,{useJSONContentType:true}).then((res)=>{
            console.log(res)
            if(res.data.state.success){
              this.$message.success('添加/修改成功')
              this.showpayAdd = false;
               this.getPayList()

            }else{
              this.$message.success('添加/修改失败')
            }
          })
        }
      })
    },

    //点击搜索时
    onSearch(e) {
           e.preventDefault()
      this.form.validateFields((err,values)=>{
        if(!err){
          this.pagination.size = 10
          this.pagination.page = 1
          this.pagination.payOrIncome = values.payOrIncome
          this.pagination.pay_type = values.pay_type
          this.pagination.beuse = this.selectedTag
          this.pagination.date=null
          this.pagination.month=null
          if(values.date){
            this.pagination.date = moment(values.date).format('YYYY-MM-DD')
          }
          if(values.month){
            this.pagination.month = moment(values.month).format('YYYY-MM-DD')
          }
          this.getPayList()
        }
      })
    },

    //删除
    showDeleteConfirm(text) {
      this.$confirm({
        title: '删除',
        content: `是否删除该条“${text.remark}”记录`,
        onOk:()=>{
          // console.log(text.id);
          axios.post('admin/deletePay',{id:text.id}).then((res)=>{
            if(res.data.state.success){
              this.$message.success('删除成功')
               this.getPayList()

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

    
    // editOk() {
    //   console.log("修改数据");
    // },
    // editCancel() {
    //   this.visiblePop1 = false;
    // },

    //日期
    changeDate(value){
      console.log(value)
      if(value){
        this.form.setFieldsValue({
          month:null
        })
      }
    },
    changeMonth(value){
      if(value){
        this.form.setFieldsValue({
          date:null
        })
      }
    },
    changeDateMonth(){
      this.showDateMonth= !this.showDateMonth
    },


    getUserList(){
      axios.post('/admin/userInfo').then((res)=>{
        console.log(res)
        const object = res.data
      if(object.state.success){
        const data = object.list
        this.userList = data
      }

      })
    },
    //新增人物
    // addUser(){
    //   // this.showUserAdd=true
    //   this.showpayAdd = false;
    //   this.$router.push({
    //     name:'userList'
    //   })
    // },
   

    //获取支付方式列表
    addPayType(){
      this.showPayType=true
    },
    addPayTypeOk(){
       this.addPayTypeForm.validateFields((err,values)=>{
        if(!err){
          const params = {
            ...values,
          }
          
          axios.post('/admin/addPayType',params,{useJSONContentType:true}).then((res)=>{
            console.log(res)
            if(res.data.state.success){
              this.$message.success('添加/修改成功')
              this.showPayType = false;
               this.getpayTypeList()
            }else{
              this.$message.success('添加/修改失败')
            }
          })
        }
      })
    },
    getpayTypeList(s){
      axios.post('/admin/paytypeList').then((res)=>{
        console.log(res)
        const object = res.data
      if(object.state.success){
        const data = object.list
          this.paytypeList = data
      }

      })
    },

    //获取类型方式列表
    getBeuseList(s){
      axios.post('/admin/beuseList',{state:s}).then((res)=>{
        const object = res.data
      if(object.state.success){
        const data = object.list
        if(s){
          this.showUesdList = data
        }else{
          this.beuseList = data
        }
      }

      })
    },
    addBeuse(i){
      this.showBeuse=true

      if(i==1){
        this.showBeuseKey = i
        this.clickTag=null
      }else{
        this.showBeuseKey = null
        this.clickTag=null

      }
    },
    addBeuseOk(){
      this.showBeuse=false
      if(this.showBeuseKey){
        this.selectedTag1=this.clickTag
      }else{
        this.selectedTag=this.clickTag
      }
      console.log(this.selectedTag1)


    },
    clickBeuseTag(id){
      // console.log(id)
      if(this.clickTag==id){
        this.clickTag=null
        return
      }
      this.clickTag=id
    },

    //切换图标
    changeChartPage(){
      this.$router.push({
        name:'payChart',
        query:{
          userId:this.pagination.userId,
          userName:this.userName,
        }
      })
    }



  },
  mounted(){
        
  },
  created() {
    // this.form.setFieldsValue({
    //         userId:this.pagination.userId,
    //       }) 
    this.getUserList()
    const userId= this.$route.query.userId
    const userName= this.$route.query.userName
    this.pagination.userId = userId
    this.userName = userName
    
    this.getBeuseList()
    this.getPayList()
    this.getpayTypeList()
    // axios.post('/admin/monthPayList',{
    //   name:'东东',
    //   date:'2021-12-10',
    // },{useJSONContentType:true}).then((res)=>{
    //   console.log(res)
    // })
  },
};
</script>

<style lang="less" scoped>
.userListBox {
}
.searchBox {
  width: 400px;
  float: left;
  margin: 20px 0px 10px 10px;
  z-index: 999;
  
}
.authMsgBox {
  .addTags {
    cursor: pointer;
  }
}
.input {
  width: 200px;
}
.topBox {
  width: 100%;
  justify-content: space-between;
  align-items: center;
    display: flex;
 .but{
   width: 150px;
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
