<template>
    <div class="blockDetail">
        <Navbar></Navbar>
        <div class="homeContainer clearfix">
            <SearchBar :address="address"></SearchBar>
            <div class="blockCon">
                <div class="blockTitle">
                    <h2>{{$t('lang2')}}</h2>
                    <p>{{$t('lang2')}}#{{blockList[0].blockNumber}}{{$t('lang48')}}{{blockList[9].blockNumber}} 总共{{pageTotal}}个区块</p>
                </div>
                <div class="blockTable">
                    <table>
                        <thead>
                            <tr>
                                <th>{{$t('lang10')}}</th>
                                <th>{{$t('lang11')}}</th>
                                <th>{{$t('lang22')}}</th>
                                <th>{{$t('lang23')}}</th>
                                <th>{{$t('lang14')}}</th>
                                <th>{{$t('lang15')}}(DOTC)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in blockList" :key="index">
                                <td class="green">{{item.blockNumber}}</td>
                                <td>{{item.timestamp}}</td>
                                <td class="green">{{item.transactionNumber}}</td>
                                <td class="green">{{item.verifyHash}}</td>
                                <td class="true" v-show="item.status==2"><i></i>{{$t('lang16')}}</td>
                                <td class="false" v-show="item.status==1"><i></i>{{$t('lang17')}}</td>
                                <td class="false" v-show="item.status==3"><i></i>{{$t('lang18')}}</td>
                                <td>{{item.dotcAmount/Math.pow(10,6)}}</td>
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
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="pageTotal">
            </el-pagination>  
        </div> 
        <Btm></Btm>
    </div>
</template>
<script>
import Navbar from '../../components/Navbar'
import SearchBar from '../../components/SearchBar'
import Btm from '../../components/Btm'
import {getBlockList} from '../../api/user'
import {formartTimeStamp,plusXing} from '../../config/utils'
export default {
  components:{
    Navbar,
    SearchBar,
    Btm
  },
  data() {
    return {
        pageNum:0,
        pageSize:10,
        pageTotal:0,
        blockList:[],
        address:''
    };
  },
  created(){
      this.queryBlockList()
  },
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        this.pageNum = val
        this.queryBlockList()
    },
    queryBlockList(){
      let that = this
      getBlockList({pageNum:this.pageNum}).then(res=>{
        if(res.data.statusCode==200){
          res.data.data.forEach(item=>{
            item.timestamp  = formartTimeStamp(item.timestamp)
            item.verifyHash = plusXing(item.verifyHash,5,5)
          })
          that.blockList = res.data.data
          that.pageSize = res.data.pageSize
          that.pageTotal = res.data.total
        }
      })
    },
  },
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
        table{width:600px;}
    }
}
</style>