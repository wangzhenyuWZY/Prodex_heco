<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="quoContent clearfix">
      <div class="leftNav">
        <p class='active'>Overview</p>
        <p>Tokens</p>
        <p>Pairs</p>
        <p>Accounts</p>
      </div>
      <div class="rightCon">
        <h2 class="quoTitle">Mdex Analytics</h2>
        <div class="searchTokenPut">
          <input placeholder="Search Mdex pairs and tokens…">
          <i class="searchIco"></i>
        </div>
        <h2 class="quoTitle size">HT Price:$17.18  Transations(24H):1,43,284 Pairs:4,343</h2>
        <div class="chartCon clearfix">
          <div class="chartBar fl" ref="chartBars">
            <h2>Liquidity</h2>
            <canvas id="container" :width="styWidth" height="180"></canvas>
          </div>
          <div class="chartBar fr"></div>
        </div>
        <h2 class="quoTitle">Top Tokens<router-link to="#" class="more">See All</router-link></h2>
        <div class="tableCon">
          <el-table
            :data="tableData"
            class='elTable'
            height="250">
            <el-table-column
              fixed
              prop="date"
              label="Name"
              width='150'>
              <template  slot-scope="scope">
                <span class="sortitem">1</span>
                <span class="pairLogo">
                  <img src="../../assets/img/logo/PETH.png" width="20px">
                  <img src="../../assets/img/logo/PETH.png" width="20px">
                </span>
                <span class="pairName">Name</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="Liquidity">
            </el-table-column>
            <el-table-column
              prop="province"
              label="Volume(24hrs)">
            </el-table-column>
            <el-table-column
              prop="city"
              label="Volume(7d)">
            </el-table-column>
            <el-table-column
              prop="address"
              label="Fees(24hr)">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="1y Fees/Liquidity">
            </el-table-column>
          </el-table>
          <div class="pagePabel">
            <i class="prex"></i>
            <span>Page 1 of 20</span>
            <i class="next"></i>
          </div>
        </div>
        <h2 class="quoTitle">Top Pairs<router-link to="#" class="more">See All</router-link></h2>
        <div class="tableCon">
          <el-table
            :data="tableData"
            class='elTable'
            height="250">
            <el-table-column
              fixed
              prop="date"
              label="Name">
              <template  slot-scope="scope">
                <span class="sortitem">1</span>
                <span class="pairLogo">
                  <img src="../../assets/img/logo/PETH.png" width="20px">
                  <img src="../../assets/img/logo/PETH.png" width="20px">
                </span>
                <span class="pairName">Name</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="Liquidity">
            </el-table-column>
            <el-table-column
              prop="province"
              label="Volume(24hrs)">
            </el-table-column>
            <el-table-column
              prop="city"
              label="Volume(7d)">
            </el-table-column>
            <el-table-column
              prop="address"
              label="Fees(24hr)">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="1y Fees/Liquidity">
            </el-table-column>
          </el-table>
          <div class="pagePabel">
            <i class="prex"></i>
            <span>Page 1 of 20</span>
            <i class="next"></i>
          </div>
        </div>
        <h2 class="quoTitle">Transactions</h2>
        <div class="tableCon">
          <el-table
            :data="transData"
            class='elTable'
            height="250">
            <el-table-column
              fixed
              prop="date"
              width="250">
              <template slot="header" slot-scope="scope">
                <div class="thTabs">
                  <span class="active">All</span>
                  <span>Swaps</span>
                  <span>Adds</span>
                  <span>Removers</span>
                </div>
              </template>
              <template  slot-scope="scope">
                <span class="pairName">{{scope.row.date}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="TotalValue">
            </el-table-column>
            <el-table-column
              prop="province"
              label="Token Amount">
            </el-table-column>
            <el-table-column
              prop="city"
              label="Token Amount">
            </el-table-column>
            <el-table-column
              prop="address"
              label="Account">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="Time">
            </el-table-column>
          </el-table>
          <div class="pagePabel">
            <i class="prex"></i>
            <span>Page 1 of 20</span>
            <i class="next"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import F2 from '@antv/f2';
export default {
  components:{
    Navbar
  },
  data() {
    return {
      isConnect:false,
      web3:null,
      styWidth:320,
      tableData:[{
          date: 'HUSD-WHT',
          name: '$2,323,233,434',
          province: '$2,323,233,434',
          city: '$2,323',
          address: '$3,233,434',
          zip: '+31.21%'
        }, {
          date: 'HUSD-WHT',
          name: '$2,323,233,434',
          province: '$2,323,233,434',
          city: '$2,323',
          address: '$3,233,434',
          zip: '+31.21%'
        }
      ],
      transData:[
        {
          date: 'Swap USDT for HBTC',
          name: '$3,442',
          province: '23,233 USDT',
          city: '2,323 HBTC',
          address: '23wesd23dsdfsdf',
          zip: '1 hour ago'
        }, {
          date: 'Swap USDT for HBTC',
          name: '$3,442',
          province: '23,233 USDT',
          city: '2,323 HBTC',
          address: '23wesd23dsdfsdf',
          zip: '1 hour ago'
        }
      ]
    }
  },
  created(){
    this.elWidth()
  },
  mounted() {
      this.$initWeb3().then((web3)=>{
          this.web3 = web3
          this.isConnect = true
          this.initChart()
      })
  },
  methods: {
    initChart(){
      let data = [{
        flow_num:20,
        date:'1/1'
      },{
        flow_num:60,
        date:'2/1'
      },{
        flow_num:30,
        date:'3/1'
      },{
        flow_num:40,
        date:'4/1'
      }]
        const chart = new F2.Chart({
            id: 'container',
            pixelRatio: window.devicePixelRatio,
        });
        chart.source(data, {
            flow_num: {
                tickCount: 5,
                min: 0
            },
            date: {
                range: [ 0, 1 ],
                tickCount: 4
            }
        });
        chart.tooltip({
            custom: true,
            showXTip: true,
            showYTip: true,
            snap: true,
            crosshairsType: 'xy',
            crosshairsStyle: {
                lineDash: [ 2 ]
            }
        });
        chart.legend('gender', {
            position: 'left'
        });
        chart.axis('date', {
            line:null,
            label: function label(text, index, total) {
                const textCfg = {};
                if (index === 0) {
                    textCfg.textAlign = 'left';
                } else if (index === total - 1) {
                    textCfg.textAlign = 'right';
                }
                textCfg.fontSize = 10
                textCfg.color = '#fff'
                return textCfg;
            }
        });
        chart.axis('flow_num', {
            line:null,
            tickLine:null,
            grid:null,
            position:'right',
            label:function label(text, index, total) {
                const textCfg = {};
                textCfg.fontSize = 10
                textCfg.text = text+' BJ'
                return textCfg;
            }
        });
        chart.area().position('date*flow_num').color('l(90) 0:#37CC65 1:#36C963').shape('smooth');
        chart.line().position('date*flow_num').color('l(90) 0:#37CC65 1:#37CC65').shape('smooth');
        chart.render();
    },
    elWidth(){
        let _this= this;
        this.$nextTick(function () {
            _this.styWidth = _this.$refs.chartBars.clientWidth-60;
        })
    }
  }
}  
</script>
<style  lang="less" scoped>
.container{
  height:calc(100vh);
  background: linear-gradient(180deg, #282824 0%, #1A1918 100%);
  .quoContent{
    height:calc(100vh - 72px);
    .leftNav{
      float:left;
      width:230px;
      height:100%;
      padding-top:80px;
      background: linear-gradient(180deg, #171716 0%, #090909 100%);
      p{
        font-size:14px;
        color:#68655E;
        line-height:16px;
        padding-bottom:12px;
        text-align:center;
        &.active{
          color:#fff;
        }
      }
    }
    .rightCon{
      overflow-y:scroll;
      padding:0 30px 40px;
      height: calc(100vh - 80px);
      box-sizing: border-box;
      .quoTitle{
        font-size:16px;
        color:#fff;
        line-height:22px;
        padding-top:30px;
        padding-bottom:20px;
        &.size{
          font-size:12px;
        }
        .more{
          float:right;
          font-size:12px;
          color:#30694B;
        }
      }
      .searchTokenPut{
        width:100%;
        height:50px;
        background: #121111;
        box-sizing: border-box;
        border-radius:12px;
        border:1px solid #333936;
        position:relative;
        input{
          background:none;
          width:100%;
          height:100%;
          line-height:48px;
          text-indent:10px;
          outline: none;
          font-size:14px;
          color:#fff;
          &::-webkit-input-placeholder{
            color:#30694B;
          }
        }
        .searchIco{
          position:absolute;
          top:12px;
          right:12px;
        }
      }
      .chartCon{
        .chartBar{
          position:relative;
          height:250px;
          width:45%;
          background:#171615;
          border:1px solid #2D2C2B;
          border-radius:12px;
          box-sizing: border-box;
          padding-top:40px;
          padding-left:20px;
          &.fl{float:left;}
          &.fr{float:right;}
          h2{
            font-size:16px;
            color:#fff;
            position:absolute;
            top:15px;
            left:15px;
          }
        }
      }
      .tableCon{
        padding:30px 20px;
        background:#171615;
        border:1px solid #2D2C2B;
        border-radius:18px;
        .pagePabel{
          padding-top:18px 0 40px;
          text-align:center;
          i{
            display:inline-block;
            vertical-align: middle;
            width:22px;
            height:22px;
            cursor: pointer;
            &.prex{
              background:url(../../assets/img/icon39.png) no-repeat center;
              background-size:100% 100%;
            }
            &.next{
              background:url(../../assets/img/icon40.png) no-repeat center;
              background-size:100% 100%;
            }
          }
          span{
            font-size:16px;
            color:#fff;
            line-height:22px;
            padding:0 20px;
            vertical-align: middle;
          }
        }
        .elTable{
          .sortitem{
            padding-right:12px;
          }
          .pairLogo{
            padding-right:15px;
            img{
              position:relative;
              &:nth-child(2){
                left:-5px;
              }
            }
          }
          .pairName{
            font-size:14px;
            color:#30694B;
          }
          .thTabs{
            span{
              color:#68655E;
              font-size:12px;
              padding-right:10px;
              cursor: pointer;
              &.active{
                color:#fff;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
    .container .quoContent .leftNav{display:none;}
    .container .quoContent .rightCon .chartCon .chartBar{width:100%;}
}
</style>
<style>
.el-table, .el-table__expanded-cell,.el-table th, .el-table tr,.el-table__body tr.hover-row>td{
  background:none;
  font-size:12px;
  color:#fff;
}
.el-table td, .el-table th.is-leaf,.el-table::before,.el-table__fixed::before{
  background:none;
  border:none;
}
.el-table td, .el-table th{
  padding: 18px 0;
}
.el-table--enable-row-transition .el-table__body td:first-child,.el-table th.is-leaf{
  background:#171615;
}
</style>