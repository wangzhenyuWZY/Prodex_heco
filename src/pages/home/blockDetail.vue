<template>
    <div class="blockDetail">
        <Navbar></Navbar>
        <div class="homeContainer">
            <SearchBar :address='address'></SearchBar>
            <div class="blockCon">
                <div class="blockTitle">
                    <h2>{{$t('lang2')}}</h2>
                    <p>{{$t('lang2')}}#{{blockDetail.blockNumber}}</p>
                </div>
                <div class="blockContainer">
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">{{$t('lang14')}}：</span>
                        <div class="infoval green" v-show="blockDetail.status==2"><i class="true"></i>{{$t('lang16')}}</div>
                        <div class="infoval green" v-show="blockDetail.status==1"><i class="false"></i>{{$t('lang17')}}</div>
                        <div class="infoval green" v-show="blockDetail.status==3"><i class="false"></i>{{$t('lang18')}}</div>
                    </div>
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">{{$t('lang19')}}：</span>
                        <div class="infoval">{{blockDetail.blockNumber}}</div>
                    </div>
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">{{$t('lang20')}}：</span>
                        <div class="infoval">{{blockDetail.timestamp}}</div>
                    </div>
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">{{$t('lang21')}}：</span>
                        <div class="infoval green">{{blockDetail.hash}}</div>
                    </div>
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">{{$t('lang22')}}：</span>
                        <div class="infoval">{{blockDetail.transactionNumber}}</div>
                    </div>
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">{{$t('lang23')}}：</span>
                        <div class="infoval green">{{blockDetail.verifyHash}}</div>
                    </div>
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">{{$t('lang24')}}：</span>
                        <div class="infoval">{{blockDetail.dotcAmount/Math.pow(10,6)}} DOTC</div>
                    </div>
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">{{$t('lang25')}}：</span>
                        <div class="infoval green">{{blockDetail.hash}}</div>
                    </div>
                </div>
            </div>
        </div>  
        <Btm></Btm>  
    </div>
</template>
<script>
import Navbar from '../../components/Navbar'
import SearchBar from '../../components/SearchBar'
import Btm from '../../components/Btm'
import {blockGetByHash} from '../../api/user'
import {formartTimeStamp,plusXing} from '../../config/utils'
export default {
  components:{
    Navbar,
    SearchBar,
    Btm
  },
  data(){
      return {
          blockDetail:{},
          address:this.$route.query.searchval
      }
  },
  created(){
      this.getblockByHash()
  },
  methods:{
      getblockByHash(){
          let that = this
          blockGetByHash({hash:this.address}).then(res=>{
              if(res.data.statusCode==200){
                  res.data.data.timestamp  = formartTimeStamp(res.data.data.timestamp)
                  that.blockDetail = res.data.data
              }
          })
      }
  }
}
</script>
<style lang='less' scoped>
.blockCon{
    background:#1C1C1C;
    margin-top:30px;    
    border-radius: 10px;
    box-shadow: 0px 2px 2px 0px rgba(46, 49, 56, 0.7), 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
    .blockTitle{
        padding:0 20px;
        height:70px;
        border-bottom:1px solid #121212;
        h2{
            font-size:16px;
            color:#fff;
            line-height:18px;
            padding-top:16px;
            padding-bottom:10px;
        }
        p{
            font-size:12px;
            color:#B7B7B7;
            line-height:100%;
        }
    }
    .blockContainer{
        padding:20px;
        .blockInfoItem{
            height:50px;
            background:#181818;
            margin-bottom:10px;
            padding:0 20px;
            .infokey{
                float:left;
                width:15%;
                font-size:14px;
                color:#B7B7B7;
                line-height:50px;
            }
            .infoval{
                float:left;
                font-size:14px;
                color:#fff;
                line-height:50px;
                &.green{
                    color:#25C83B;
                }
                i{
                    display:inline-block;
                    vertical-align:middle;
                    width:18px;
                    height:18px;
                    background:url(../../assets/img/config.png) no-repeat center;
                    background-size:100% 100%;
                    margin-right:8px;
                    &.false{
                        background:url(../../assets/img/holder.png) no-repeat center;
                        background-size:100% 100%;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 750px) {
    .blockCon .blockContainer .blockInfoItem{height:auto;padding:15px;}
    .blockCon .blockContainer .blockInfoItem .infokey{float: inherit;width:auto;display:block;line-height:18px;padding-bottom:10px;}
    .blockCon .blockContainer .blockInfoItem .infoval{line-height:20px;}
    .blockCon .blockContainer .blockInfoItem .dataput{width:100%;}
}
</style>