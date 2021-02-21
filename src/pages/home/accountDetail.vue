<template>
    <div class="blockDetail">
        <Navbar></Navbar>
        <div class="homeContainer clearfix">
            <SearchBar :address='address' @change="change"></SearchBar>
            <div class="accdetailCon">
                <div class="accdetail tag-read" @click="copyAddress" :data-clipboard-text="accountInfo.address">地址：<span class="green">{{accountInfo.plusaddress}}</span><i></i></div>
                <div class="accdetail">余额：<span>{{accountInfo.amount}} DOCT</span></div>
            </div>
            <div class="blockCon">
                
                <div class="blockTitle">
                    <h2>交易</h2>
                </div>
                <div class="blockTable">
                    <table>
                        <thead>
                            <tr>
                                <th>交易哈希</th>
                                <th>区块</th>
                                <th>时间</th>
                                <th>发送人</th>
                                <th>接收人</th>
                                <th>状态</th>
                                <th>交易量(DOTC)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in transList" :key="index">
                                <td class="green">{{item.hash}}</td>
                                <td class="green">{{item.blockNumber}}</td>
                                <td class="green">{{item.blockNumber}}</td>
                                <td class="green">{{item.from}}</td>
                                <td class="green">{{item.to}}</td>
                                <td :class="item.status==2?'true':'false'">
                                    <div v-show="item.status==2"><i class="true"></i>已确定</div>
                                    <div v-show="item.status==1"><i class="false"></i>待确定</div>
                                    <div v-show="item.status==3"><i class="false"></i>失败</div>
                                </td>
                                <td>{{item.dotcAmount}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <el-pagination
                class="pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pageNum"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000">
            </el-pagination>  
        </div> 
        <Btm></Btm>
    </div>
</template>
<script>
import Navbar from '../../components/Navbar'
import SearchBar from '../../components/SearchBar'
import Btm from '../../components/Btm'
import {getAddressInfo,listByAddress} from '../../api/user'
import {formartTimeStamp,plusXing} from '../../config/utils'
import Clipboard from 'clipboard'; 
export default {
  components:{
    Navbar,
    SearchBar,
    Btm
  },
  data() {
    return {
        accountInfo:{},
        transList:[],
        pageNum:0,
        address:this.$route.query.searchval
    };
  },
  created(){
      this.queryAddressInfo()
      this.querylistByAddress()
  },
  methods: {
    handleSizeChange(val) {
    console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        this.pageNum = val
        this.querylistByAddress()
    },
    change(address){
        this.pageNum = 0
        this.address = address
        this.queryAddressInfo()
        this.querylistByAddress()
    },
    queryAddressInfo(){
        let that = this
        getAddressInfo({address:this.address}).then(res=>{
            if(res.data.statusCode==200){
                res.data.data.plusaddress = plusXing(res.data.data.address,5,5)
                that.accountInfo = res.data.data
            }
        })
    },
    querylistByAddress(){
        let that = this
        listByAddress({pageNum:this.pageNum,address:this.address}).then(res=>{
            if(res.data.statusCode==200){
                res.data.data.forEach(item=>{
                    item.from = plusXing(item.from,5,5)
                    item.to = plusXing(item.to,5,5)
                    item.timestamp  = formartTimeStamp(item.timestamp)
                })
                that.transList = res.data.data
            }
        })
    },
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
  },
}
</script>
<style lang='less' scoped>
.accdetailCon{
        margin-top:30px;
        height: 110px;
        background: #1C1C1C;
        box-shadow: 0px 2px 2px 0px rgba(46, 49, 56, 0.7), 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        border: 1px solid #1C1C1C;
        .accdetail{
            font-size:14px;
            color:#B7B7B7;
            line-height:18px;
            padding-top:20px;
            padding-left:20px;
            span{
                font-size:14px;
                color:#fff;
                line-height:18px;
                padding-left:6px;
                &.green{
                    color:#25C83B;
                }
            }
            i{
                display:inline-block;
                vertical-align:middle;
                width:16px;
                height:16px;
                background:url(../../assets/img/addIco.png) no-repeat center;
                background-size:100% 100%;
                margin-left:20px;
                cursor: pointer;
            }
        }
    }
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
    .blockTable{
        padding:20px;
        table{
            width:100%;
            th{
                font-size:14px;
                color:#B7B7B7;
                line-height:18px;
                text-align:center;
                &:first-child{
                    text-align:left;
                }
                &:last-child{
                    text-align:right;
                }
            }
            td{
                padding:10px 0;
                font-size:14px;
                color:#B7B7B7;
                line-height:18px;
                text-align:center;
                &.green{
                    color:#25C83B;
                }
                &.true{
                    color:#25C83B;
                    i{
                        display:inline-block;
                        vertical-align: middle;
                        width:18px;
                        height:18px;
                        background: url(../../assets/img/config.png) no-repeat center;
                        background-size:100% 100%;
                        margin-right:8px;
                    }
                }
                &.false{
                    color:#fff;
                    i{
                        display:inline-block;
                        vertical-align: middle;
                        width:18px;
                        height:18px;
                        background: url(../../assets/img/holder.png) no-repeat center;
                        background-size:100% 100%;
                        margin-right:8px;
                    }
                }
                &:first-child{
                    text-align:left;
                }
                &:last-child{
                    text-align:right;
                }
            }
        }
    }
}
@media screen and (max-width: 750px) {
    .blockCon .blockTable{
        overflow-x: scroll;
        table{width:1100px;}
    }
}
</style>