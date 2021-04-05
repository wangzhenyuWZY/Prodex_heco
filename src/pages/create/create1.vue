<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="exchangeBar">
        <h2 class="createTitle">token {{$t('lang19')}}</h2>
        <p class="selType" @click="hasToken = false;popshow=!popshow;popshow2=false"><i :class="!hasToken?'active':''"></i><span>{{$t('lang20')}}</span></p>
        <div class="hasToken" v-show="!hasToken && popshow">
          <input :placeholder="$t('lang21')" v-model="tokenName">
          <input :placeholder="$t('lang22')" v-model="symbol">
          <input :placeholder="$t('lang23')" v-model="totalsupply">
          <input :placeholder="$t('lang24')" v-model="tokenToAddress">
          <p class='tokenlogo'>Token Logo</p>
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-change="handleAvatarChange"
            :before-upload="beforeAvatarUpload"
            accept="image/gif,image/jpeg,image/jpg,image/png"
            >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <p class="selType" @click="hasToken = true;popshow2=!popshow2;popshow=false"><i :class="hasToken?'active':''"></i><span>{{$t('lang25')}}</span></p>
        <div class="hasToken" v-show="hasToken && popshow2">
          <input :placeholder="$t('lang26')" v-model="contractAddress" >
          <p class='tokenlogo'>Token Logo</p>
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-change="handleAvatarChange"
            :before-upload="beforeAvatarUpload"
            accept="image/gif,image/jpeg,image/jpg,image/png"
            >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>  
        <el-button class="btn" :disabled='false' @click="createNext">{{$t('lang27')}}</el-button>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import {uploadPicture} from '../../api/user'
export default {
  components:{
    Navbar
  },
  data() {
    return {
      isConnect:false,
      web3:null,
      hasToken:false,
      tokenName:'',
      symbol:'',
      totalsupply:'',
      contractAddress:'',
      tokenToAddress:'',
      popshow:true,
      popshow2:false,
      imageUrl: ''
    }
  },
  mounted() {
      this.$initWeb3().then((web3)=>{
          this.web3 = web3
          this.isConnect = true
      })
  },
  methods: {
    handleAvatarChange(item){
      var form = new FormData();
      form.append("file",item.raw);
      uploadPicture(form).then(res=>{
        if(res.data.status==200){
          this.imageUrl = URL.createObjectURL(item.raw);
          this.iconUrl = res.data.data
        }
      })
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error('上传Logo图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    createNext(){
      let tokenInfo = {
          tokenName:this.tokenName,
          symbol:this.symbol,
          totalsupply:this.totalsupply,
          hasToken:this.hasToken,
          contractAddress:this.contractAddress,
          tokenToAddress:this.tokenToAddress,
          imageUrl:this.iconUrl
      }
      if(this.hasToken){
        if(this.contractAddress==''){
          this.$message.error(this.$t('lang102'))
          return
        }
        if(!this.web3.utils.isAddress(this.contractAddress)){
          this.$message.error(this.$t('lang103'))
          return
        }
        this.$router.push({
          path: '/createConfirm',
          query: {
            tokenInfo: JSON.stringify(tokenInfo)
          }
        })
      }else{
        if(this.tokenName==''){
          this.$message.error(this.$t('lang104'))
          return
        }
        if(this.symbol==''){
          this.$message.error(this.$t('lang105'))
          return
        }
        if(this.totalsupply==''){
          this.$message.error(this.$t('lang106'))
          return
        }
        this.$router.push({
          path: '/createConfirm',
          query: {
            tokenInfo: JSON.stringify(tokenInfo)
          }
        })
      }
      
    }
  }
}
</script>
<style  lang="less" scoped>
.exchangeBar{
    width: 345px;
    min-height:400px;
    background: #232221;
    box-shadow:inset 3px 3px 3px 0px rgb(0 0 0 / 20%);
    border-radius: 18px;
    border: 1px solid #232221;
    box-sizing: border-box;
    padding:20px 18px;
    margin:40px auto;
    position:relative;
    .createTitle{
      font-size:16px;
      color:#C4C2BE;
      line-height:22px;
      text-align:center;
      padding-bottom:26px;
    }
    .selType{
      font-size:14px;
      color:#C4C2BE;
      line-height:14px;
      padding-bottom:20px;
      cursor: pointer;
      i{
        display:inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        border-radius: 2px;
        border: 1px solid #38393B;
        margin-right:10px;
        &.active{
          background:url('../../assets/img/icon35.png') no-repeat center;
          background-size:100% 100%;
        }
      }
      span{
        display: inline-block;
        vertical-align: top;
        width: 85%;
        line-height: 23px;
      }
    }
    .tokenlogo{
      font-size:14px;
      color:#837F76;
      padding-bottom:10px;
    }
    .hasToken{
      input{
        width:100%;
        height: 60px;
        box-shadow: 2px 2px 3px 0px rgba(19, 19, 19, 0.5);
        border-radius: 12px;
        border: 1px solid #38393B;
        text-indent: 10px;
        font-size:14px;
        color:#fff;
        line-height:60px;
        background:none;
        margin-bottom:20px;
        box-sizing: border-box;
        &::-webkit-input-placeholder{
          color:#837F76;
        }
      }
    }
}
</style>
<style>
.avatar-uploader{margin-bottom:20px;}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>