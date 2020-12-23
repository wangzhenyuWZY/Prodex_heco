<template>
  <div class="container">
    <!-- <div class="c-top"> -->
    <!-- <samp class="c-mp">FoxDex Protocol Analytics</samp> -->
    <!-- <div class="c-inp">
      <input type="text" placeholder="Search FoxDex pairs and tokens">  
      </div> -->

    <!-- </div> -->
    <!-- <div class="c-box1">
      <div class="box1-p">
        <span class="bpa">ETH Price:<samp class="bpa1">{{ 389.98 }}</samp></span>
        <span class="bpb">Transactions (24H): <samp class="bpb2">{{173.444}}</samp></span>
        <span class="bpc">Pairs:<samp class="bpc3">{{ 19.162}}</samp></span>
      </div>
      <div class="c-mian">
        <div class="mian-box1">
          <chart/>
        </div>
        <div class="mian-box2">

         <chart2 /> 
         <circular />
        </div>
      </div>

    </div> -->
    <div class="c-box2">
      <div class="b2-top">
        <samp class="top1">{{$t('home.TopPairs')}}</samp>

        <!-- <template slot-scope="scope">
              <div>   
                <img :src="requierImg(scope.row.token1.name,1)"
                   alt="" /> 
                   <img :src="requierImg(scope.row.token1.name,0)"
                   alt="" />
              </div>
            </template> -->

      </div>
      
      <div class="table">
        <el-table v-if="mobile"
                  :data="pairList"
                  header-cell-class-name="adddd"
                  header-row-class-name="tabe_tr"
                  :header-row-style="{backgroundColor:'#F4F8FB',color:'#606266'}"
                  cell-class-name="dddsadsa"
                  style="width: 100%">
          <el-table-column prop="full_name"
                           :label= "$t('home.Name')" >
                <template slot-scope="scope">
                  <div class="reqimg">   
                    <img :src="requierImg(scope.row.trade_token_name,0)"
                      alt="" /> 
                      <img :src="requierImg(scope.row.base_token_name,0)"
                      alt="" />
                      {{scope.row.trade_token_name}}/ 
                        {{scope.row.base_token_name}}
                </div>
          </template>   
        </el-table-column>
          <el-table-column prop="trade_token_liquidity"
                           :label= "$t('home.Assets')">
            <template slot-scope="scope">
              <div>   
                {{scope.row.trade_token_liquidity ?scope.row.trade_token_liquidity :"--"  }}
                {{scope.row.trade_token_name}} 
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="base_token_liquidity"
                           :label= "$t('home.Assets')">
            <template slot-scope="scope">
              <div>
                {{scope.row.base_token_liquidity ?scope.row.base_token_liquidity :"--"  }}
                {{scope.row.base_token_name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="pair_quantity"
                           :label= "$t('home.Liquidity')">
            <template slot-scope="scope">
              <div>
                {{scope.row.pair_quantity ? scope.row.pair_quantity  : "--"}}
              </div>
            </template>
            <span></span>
          </el-table-column>
          <el-table-column prop="trade_price"
                           :label= "$t('home.price')">
            <template slot-scope="scope">
              <div>
                {{scope.row.trade_price ? scope.row.trade_price  : "--"}}
              </div>
            </template>
            <span></span>
          </el-table-column>
          <el-table-column prop="base_quantity_24"
                           :label= "$t('home.Volume')">
            <template slot-scope="scope">
              <div>
                {{scope.row.base_quantity_24 ? scope.row.base_quantity_24  : "--"}}
              </div>
            </template>
            <span></span>
          </el-table-column>
          <el-table-column prop="Change"
                           :label= "$t('home.Change')">
            <template slot-scope="scope">
              <div>
                {{scope.row.price_change_24 ? (scope.row.price_change_24*100).toFixed(2)  : "--"}}%
              </div>
            </template>
            <span></span>
          </el-table-column>
          <el-table-column label= "operation">
            <template slot-scope="scope">
              <router-link :to="{ path: '/exchange', query: { pairAddress:scope.row.contract_address }}" style="padding-bottom:10px;">
                <el-button size="mini" round width="100px">Exchange</el-button>
              </router-link>
              <router-link :to="{ path: '/pool/connectpool', query: { pairAddress:scope.row.contract_address }}"><el-button size="mini" round>AddLiquidity</el-button></router-link>
            </template>
            <span></span>
          </el-table-column>
        </el-table>
        <el-table v-if="!mobile"
                  :data="pairList"
                  header-cell-class-name="adddd"
                  header-row-class-name="tabe_tr"
                  :header-row-style="{backgroundColor:'#F4F8FB',color:'#606266'}"
                  cell-class-name="dddsadsa"
                  style="width: 100%">
          <el-table-column prop="full_name"
                             width="110px"
                           label="name">
            <template slot-scope="scope">
              <div class="table_size">
               
                {{scope.$index+1}} 
                <!-- <img :src="requierImg(scope.row.trade_token_name,0)"
                   alt="" /> 
                   <img :src="requierImg(scope.row.base_token_name,0)"
                   alt="" /> -->
                     {{scope.row.trade_token_name}}-{{scope.row.base_token_name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="trade_token_name"
                           label="Assets">
            <template slot-scope="scope">
                <div class="table_size">
                <p>
                  <span style="color:#05C98E">{{scope.row.trade_token_liquidity ? scope.row.trade_token_liquidity : '--'}}</span>
                   {{scope.row.trade_token_name}}
                </p>
                <p>
                   <span style="color:#05C98E">{{scope.row.base_token_liquidity ? scope.row.base_token_liquidity: '--'}}</span>
                       {{scope.row.base_token_name}}
                </p>
               
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="pair_quantity"
                           label="liquidity">
            <template slot-scope="scope">
              <div class="table_size">
                {{scope.row.pair_quantity ? scope.row.pair_quantity  : "--"}}
              </div>
            </template>
            <span></span>
          </el-table-column>

        </el-table>

      </div>
      <div class="pagin">
        <el-pagination background
                       v-if="pairList && pairList.length>=10"
                       layout="prev, pager, next"
                       :total="pairList?pairList.length:0">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import {api} from '../../api/api'
import chart from './chart.vue'
import chart2 from './chart2.vue'
import circular from './circular'
// import {TokenData,PairData} from '../../utils/index'
import { IsPc } from '../../utils/index'
import { getBalanceInPool, getMyBalanceInPool, getLpBalanceInPool,getTokenDenormalizedWeight } from "../../utils/tronwebFn"
export default {
  components: { chart, chart2, circular },
  // computed: {
  //   ...mapState(['pairData'])
  // },
  watch:{
    // pairData(list){
    //   let that = this
    //   this.pairList = JSON.parse(JSON.stringify(list)) 
    //   if(this.pairList.length>0){
    //     this.$initTronWeb().then(function (tronWeb) {
    //       that.init();
    //       that.getVolPrice24()
    //     })
    //   }
    // }
  },
  data () {
    return {
      pairList:[],
      mobile: IsPc()
    }
  },
  mounted () {
    let that = this
    this.$initTronWeb().then(function (tronWeb) {
      // that.init();
      that.getVolPrice24()
    })
  },
  methods: {
     requierImg (name,number) {
      let str;
      // debugger
      if (name) {
        try {
           if (number != undefined) {
              str = name.split('/');
              return require('@/assets/img/currency/'+str[number]+'.png')
              
           }
            return require('@/assets/img/currency/'+name+'.png')
        } catch (error) {
            return require('@/assets/img/currency/avitve.png')
        }
      } else {
           return require('@/assets/img/currency/avitve.png')
      }
    },
    async init () {
      let that = this
      let pairList = []
      for (let index = 0; index < this.pairList.length; index++) {
        const el = this.pairList[index];
        // getTokenDenormalizedWeight(el.token1.address,el.address).then((response) => {
        //   el.token1.widget = parseInt(response,16)/Math.pow(10,el.decimals)
        // })  
        // getTokenDenormalizedWeight(el.token2.address,el.address).then((response) => {
        //   el.token2.widget = parseInt(response,16)/Math.pow(10,el.decimals)
        // })   
        debugger 
        let res = await getBalanceInPool(el, el.token1);
        let res1 = await getBalanceInPool(el, el.token2);
        // let res2 = await getLpBalanceInPool(el);
        // if(el.token1.name=='USDT'){
        //   let bil = 1+parseFloat(el.token2.widget/el.token1.widget)
        //   el.liquidity = (bil*parseFloat(res1)).toFixed(4)
        // }else if(el.token2.name=='USDT'){
        //   let bil = 1+parseFloat(el.token1.widget/el.token2.widget)
        //   el.liquidity = (bil*parseFloat(res1)).toFixed(4)
        // }
        el.token1Balance = res.toFixed(4);
        el.token2Balance = res1.toFixed(4);
        // pairList.push(el)

        this.$set(this.pairList,index,el)
      }
      // this.pairList = pairList
    },
    async getVolPrice24 () {//获取24小时量和价格
      let res = await api.get24HourTradingVolume()
      if(res.data.code==0){
        this.pairList = res.data.data
        // this.pairList.forEach((rsp)=>{
        //   data.forEach((rsp2)=>{
        //     if(rsp.pair.toUpperCase() == rsp2.full_name.toUpperCase()){
        //       rsp.pair_quantity = rsp2.pair_quantity
        //       rsp.base_quantity_24 = rsp2.base_quantity_24.toFixed(4)
        //       rsp.trade_price = rsp2.trade_price.toFixed(4)
        //       rsp.price_change_24 = rsp2.price_change_24.toFixed(4)
        //     }
        //   })
        // })
      }
    }
  },
}
</script>
<style  lang="scss" scoped>
.reqimg{
  white-space: nowrap;
  img{
    width: 25px;
    height: 25px;
  }

  img:nth-child(2) {
      transform: translateX(-12px);
    }
}
.container {
  padding-top: 120px;
}
.t-img {
  width: 22px;
  height: 22px;
  margin-left: 207px;
}

// .c-top {
//   margin: 0 auto;
//   overflow: hidden;
//   width: 800px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// }
// .c-mp {
//   margin-top: 40px;
//   height: 27px;
//   font-size: 24px;
//   font-family: Roboto-Medium, Roboto;
//   font-weight: normal;
//   color: #0f1730;
//   line-height: 28px;
// }
.c-inp {
  margin-top: 16px;
  width: 800px;
  height: 48px;
  background: #ffffff;
  border-radius: 28px;
  input {
    width: 262px;
    height: 20px;
    font-size: 18px;
    font-family: roboto-mediumitalic;
    color: #a6aeb7;
    line-height: 21px;
    margin-top: 14px;
    margin-left: 280px;
  }
}
.c-box1 {
  width: 1200px;
  height: 1004px;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 40px;
  .box1-p {
    display: flex;
    justify-content: center;
    border-bottom: 1px #ffe5ebf2 solid;

    .bpa,
    .bpb,
    .bpc {
      margin: 32px 24px;
      height: 22px;
      font-size: 20px;
      font-family: roboto-mediumitalic;
      font-weight: normal;
      color: #0f1730;
      line-height: 23px;
    }
  }
  .mian-box1,
  .mian-box2 {
    width: 960px;
    height: 360px;
    border: 1px #ffe5ebf2 solid;
    margin: 44px auto;
  }
}
.c-box2 {
  // margin-top: 120px;
  width: 1200px;
  margin: 0 auto;
  height: 960px;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;

  .b2-top {
    height: 112px;
    .top1 {
      margin-top: 54px;
      margin-left: 41px;
      float: left;
      height: 22px;
      font-size: 20px;
      font-family: roboto-mediumitalice;
      font-weight: 500;
      color: #0f1730;
      line-height: 23px;
    }
    .top-inp {
      width: 583px;
      height: 48px;
      float: right;
      margin-top: 40px;
      margin-right: 32px;
      background: #ffffff;
      border-radius: 28px;
      border: 1px solid #a6aeb7;
      input {
        border-radius: 28px;
        color: #a6aeb7;
        line-height: 21px;
        // margin-left: 207px;
        margin-top: 12px;
        width: 197px;
        height: 20px;
        font-size: 18px;
        font-family: roboto-mediumitalic;
      }
    }
  }

  .pagin {
    margin-left: 400px;
    margin-top: 33px;
  }
  .table {
    height: 760px;
    background: #ffffff;

    .tabe_tr {
      /* background-image: linear-gradient(131deg, #FFA61B 0%, #F3330E 100%) ; */
      height: 40px;
    }
  }

  .el-table tr {
    background-color: inherit;
  }
}

::v-deep {
  .el-pagination.is-background .el-pager li:not(.disabled) {
    background-color: #f4f5fa; // 进行修改未选中背景和字体
    color: #878b97;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #0f1730; // 进行修改选中项背景和字体
    color: #fff;
  }
}
</style>
<style  scoped>
>>> .cell {
  margin-left: 30px;
}
>>> .adddd {
  background-color: #f4f8fb;
  margin-left: 20px;
}
>>> .el-table__row {
  height: 72px;
  background: #ffffff;
}

@media screen and (max-width: 750px) {
  .container{
    padding-top: 50px;
  }
  .c-box2 {
    width: 100%;
    height: auto;
  
  }
  .c-box2 .table{
      height: auto;
  }
   .c-box2  .b2-top{
    height: 40px;
    line-height: 40px;
  }
  .c-box2  .b2-top .top1{
        margin-top: 0;
         line-height: 40px;
  }
  
  >>> .cell {
  margin-left: 0;
  font-size:0.3rem !important;
} 
}
</style>
