<template>
  <div>
        <a-divider>连续签到配置</a-divider>
    <div class="topBox">
        <span class="line">
        </span>
        <div class="poin_box">
            
            <div class="poin_item" v-for="(item,index) in continuousDay" :key="index" >
                <span>{{item.yaya}}鸭鸭币</span>
                <a-tooltip placement="top">
                    <template slot="title">
                        <span>点击设置</span>
                    </template>
                        <img  @click="clickContinuousDay(item,index)" src="@/assets/duck.png" class="icon"/>
                </a-tooltip>
                <span>{{item.day}}天</span>
                 
            </div>

            
        </div>

    </div>
    <a-modal  destroyOnClose  :title="'修改签到配置'" ok-text='确认' cancel-text='取消' :visible="showEditCon" @ok="addConDayOk" @cancel="showEditCon = false" :width='400' >
      <a-form  :form="editConForm"  :label-col="{ span: 7 }">
         <a-row :gutter="24" >
          <a-col :span="24">
                    <a-form-item label="鸭鸭币">
                      <a-input class="input" placeholder="请填写" v-decorator="editConRules.yaya" />
                    </a-form-item>
            </a-col>
         </a-row>
         <a-row :gutter="24" >
            <a-col :span="24">
                    <a-form-item label="签到天数">
                      <a-input class="input" placeholder="请填写" v-decorator="editConRules.day" />
                    </a-form-item>
            </a-col>
         </a-row>
      </a-form>
    </a-modal>
  </div>
</template> 
<script>
import {validator} from '@/utils'
import axios from '@/utils/axios'
const editConRules = {
  yaya:['yaya', { rules: [{ required: true, message: '请输入用户名称' }] }],
  day:['day', { rules: [{ required: true},validator.number] }],
}

export default {
  data() {
    return {
        continuousDay:null,
        ConId:null,

        editConRules,
        showEditCon:false,
        editConForm:this.$form.createForm(this, { name: "editConForm" }),
    };
  },
  methods: {
      getSignInSetDay(){
          axios.post('admin/signInSetDayList').then(res=>{
              const object = res.data
            if(object.state.success){
                this.continuousDay = object.list
            }
          })
      },
      clickContinuousDay(item,index){
        this.showEditCon=true
        this.ConId = item.id
        this.$nextTick(()=>{  
        this.editConForm.setFieldsValue({
            yaya:item.yaya,
            day:item.day,
          })
      })
      },
      addConDayOk(){
      this.editConForm.validateFields((err,values)=>{
        if(!err){
            values.day = Number(values.day)
          const params = {
            ...values,
            id:this.ConId
          }
          axios.post('/admin/signInSetDay',params,{useJSONContentType:true}).then((res)=>{
            console.log(res)
            if(res.data.state.success){
              this.$message.success('添加/修改成功')
              this.showEditCon = false;
              this.getSignInSetDay()
            }else{
              this.$message.success('添加/修改失败')
            }
          })
        }
      })
    },
  },
  created(){
      this.getSignInSetDay()
  }
};
</script>


<style lang='less' scoped >

 .topBox {
  width: 100%;
  justify-content: center;
  align-items: center;
    display: flex;
    margin-bottom: 10px;
    height: 80px;
    
    .line{
        width: 95%;
        height: 15px;
        border-radius: 7px;
        background-color:  rgba(229, 230, 235, 0.747);
    }
    .poin_box{
        width: 80%;
        position: absolute;
        height: 80px;
        justify-content: space-between;
        align-items: center;
        display: flex;
        .poin_item{
             justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            display: flex;
            img{
                    width: 35px;
                    height: 35px;
                    border-radius: 15px;
                    cursor: pointer;
                }
            span{
                width: 100%;
                text-align: center;
                height: 30%;
                
                
            }
        }
    }
 }
 .input{
    width: 200px;
  }
</style>