<style scoped></style>
<template>
  <span>
    <el-autocomplete v-model="queryString"  class="el-winp" :fetch-suggestions="queryStringSearch" @select="selectItem" :placeholder="placeholder">
    </el-autocomplete>
  </span>
</template>

<script>
  export default{
    data(){
      return {
        queryString: '',
        autoValue:'',
        queryList: []
      }
    },
    watch: {
      queryString: function (newVal, oldVal) {
        if(newVal===''){
          this.$emit('communicate',{id:'',value:''})
        }
      },
      empty: function (newVal, oldVal) {
        if(newVal === ''){
          this.queryString = ""
        }else{
          this.queryString = newVal
        }
      },
    },
    props: {
      description: String,
      placeholder: String,
      empty: String
    },
    methods: {
      queryStringSearch(queryString, cb) {
        let queryList = this.queryList
        var results = queryString ? queryList.filter(this.queryFilter(queryString)) : queryList
        cb(results)
      },
      queryFilter(queryString) {
        return (queryList) => {
          return (queryList.value.indexOf(queryString.toLowerCase()) != -1)
        }
      },
      selectItem(item){
        this.queryString = item.value
        this.$emit('communicate',item)
      },
      loadSettlementInfo(){
        var url= merchantPostLink+"/merchant/admin/payeeinfo/findByPayeeComName.htm"
        var postData = {
          payeeCompanyName: '',
          sysId:"T0000017",
          transactionUuid:this.uuid()
        }
        this.$http.post(url, JSON.stringify(postData)).then((response)=>{
          console.log(response)
          if(response.data.code === 'S0A00000'){
            response.data.data.forEach((result) => {
             this.queryList.push({value: result.payeeCompanyName,id: result.accountNo})
           })
          }
        })
      },
      loadPayeeInfo(){
        var url= merchantPostLink+"/merchant/admin/billinfo/getBillBasicInfoList.htm"
        var postData = {
          blCompanyName: '',
          sysId:"T0000017",
          transactionUuid:this.uuid()
        }
        this.$http.post(url, JSON.stringify(postData)).then((response)=>{
          if(response.data.code === 'S0A00000'){
            response.data.data.forEach((result) => {
             this.queryList.push({value: result.blCompanyName,id: result.id})
           })
          }
        })
      },
      loadMerchantInfo(){
        var url= merchantPostLink+"/merchant/admin/merchant/searchMerchantByName.htm"
        var postData = {
          merchantNameZh: '',
          sysId:"T0000017",
          transactionUuid:this.uuid()
        }
        this.$http.post(url, JSON.stringify(postData)).then((response)=>{
          if(response.data.code === 'S0A00000'){
            response.data.data.forEach((result) => {
             this.queryList.push({value: result.merchantNameZh,id: result.merchantCode,key: result.id})
           })
          }
        })
      },
      loadOrgInfo(){
        var url= merchantPostLink+"/merchant/admin/organization/queryByName.htm"
        var postData = {
          orgZhname: '',
          sysId:"T0000017",
          transactionUuid:this.uuid()
      }
      this.$http.post(url, JSON.stringify(postData)).then((response)=>{
          if(response.data.code === 'S0A00000'){
            response.data.data.forEach((result) => {
               this.queryList.push({value: result.orgZhname,id: result.orgCode})
           })
        }
      })
      }
    },
    created(){
      let type = this.description;
      console.log(0)
      if(type === "payee"){
        this.loadPayeeInfo()
      }
      if(type === "settlement"){
        this.loadSettlementInfo()
      }
      if(type === "merchant"){
        this.loadMerchantInfo()
      }
      if(type === "org"){
        this.loadOrgInfo()
      }
    },
  }
</script>
