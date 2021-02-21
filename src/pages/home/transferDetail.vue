<template>
    <div class="blockDetail">
        <Navbar></Navbar>
        <div class="homeContainer">
            <SearchBar :address='address'></SearchBar>
            <div class="blockCon">
                <div class="blockTitle">
                    <h2>交易明细</h2>
                </div>
                <div class="blockContainer">
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">状态：</span>
                        <div class="infoval green" v-show="transDetail.status==2"><i class="true"></i>已确定</div>
                        <div class="infoval green" v-show="transDetail.status==1"><i class="false"></i>待确定</div>
                        <div class="infoval green" v-show="transDetail.status==3"><i class="false"></i>失败</div>
                    </div>
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">区块高度：</span>
                        <div class="infoval">{{transDetail.blockNumber}}</div>
                    </div>
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">时间戳：</span>
                        <div class="infoval">{{transDetail.timestamp}}</div>
                    </div>
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">哈希值：</span>
                        <div class="infoval green tag-read" @click="copyAddress" :data-clipboard-text="transDetail.hash">{{transDetail.hash}} <i class="add"></i></div>
                    </div>
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">发送方：</span>
                        <div class="infoval green tag-read" @click="copyAddress" :data-clipboard-text="transDetail.from">{{transDetail.from}} <i class="add"></i></div>
                    </div>
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">接收方：</span>
                        <div class="infoval green tag-read" @click="copyAddress" :data-clipboard-text="transDetail.to">{{transDetail.to}} <i class="add"></i></div>
                    </div>
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">交易量：</span>
                        <div class="infoval">{{transDetail.dotcAmount}} DOTC</div>
                    </div>
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">交易费用：</span>
                        <div class="infoval green">{{transDetail.gas}} DOTC</div>
                    </div>
                    <div class="blockInfoItem clearfix">
                        <span class="infokey">数据输入：</span>
                        <div class="dataput" v-html="transDetail.data">
                            <!-- &nbsp;{{transDetail.data}} -->
                        </div>
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
import {listByHash} from '../../api/user'
import {formartTimeStamp,plusXing} from '../../config/utils'
import Clipboard from 'clipboard'; 
export default {
  components:{
    Navbar,
    SearchBar,
    Btm
  },
  data(){
      return {
          transDetail:{},
          address:this.$route.query.searchval
      }
  },
  created(){
      this.getListByHash()
  },
  methods:{
      copyAddress(){
            let that = this
            var clipboard = new Clipboard('.tag-read')  
            clipboard.on('success', e => {  
                that.$message.success('复制成功');
            // 释放内存  
            clipboard.destroy()  
            })  
            clipboard.on('error', e => {  
            // 不支持复制  
            console.log('该浏览器不支持自动复制')  
            // 释放内存  
            clipboard.destroy()  
            })
        },
      getListByHash(){
          let that = this
          listByHash({hash:this.address}).then(res=>{
              if(res.data.statusCode==200){
                //   res.data.data.hash = plusXing(res.data.data.hash,5,5)
                //   res.data.data.from = plusXing(res.data.data.from,5,5)
                //   res.data.data.to = plusXing(res.data.data.to,5,5)
                  res.data.data.timestamp  = formartTimeStamp(res.data.data.timestamp)
                  that.transDetail = res.data.data
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
            background:#181818;
            margin-bottom:10px;
            padding:20px;
            .dataput{
                float:left;             
                height: 120px;
                background: #252525;
                box-shadow: 2px 4px 8px 0px #151515, -2px -2px 4px 0px #1E1E1E;
                border-radius: 3px;
                border: 1px solid #323232;
                padding:15px 20px;
                width:85%;
                font-size:14px;
                color:#585858;
                line-height: 20px;
            }
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
                i.add{
                    display:inline-block;
                    vertical-align:middle;
                    width:16px;
                    height:16px;
                    background:url(../../assets/img/addIco.png) no-repeat center;
                    background-size:100% 100%;
                    margin-left:20px;
                }
                &.green{
                    color:#25C83B;
                }
                i{
                    display:inline-block;
                    vertical-align:middle;
                    width:18px;
                    height:18px;
                    margin-right:8px;
                }
                i.true{
                    background:url(../../assets/img/config.png) no-repeat center;
                    background-size:100% 100%;
                }
                i.false{
                    background:url(../../assets/img/holder.png) no-repeat center;
                    background-size:100% 100%;
                }
            }
        }
    }
}
@media screen and (max-width: 750px) {
    .blockCon .blockContainer .blockInfoItem .infokey{float: inherit;width:auto;display:block;line-height:18px;padding-bottom:10px;}
    .blockCon .blockContainer .blockInfoItem .infoval{line-height:20px;}
    .blockCon .blockContainer .blockInfoItem .dataput{width:100%;}
}
</style>