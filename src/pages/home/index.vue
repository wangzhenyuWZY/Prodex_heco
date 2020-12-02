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
        <samp class="top1">Top Pairs</samp>
       
      </div>
      <div class="table">
        <el-table :data="pairList"
                  header-cell-class-name="adddd"
                  header-row-class-name="tabe_tr"
                  :header-row-style="{backgroundColor:'#F4F8FB',color:'#606266'}"
                  cell-class-name="dddsadsa"
                  style="width: 100%">
          <el-table-column prop="pair"
                           label="name"
                           >
          </el-table-column>
          <el-table-column prop="token1.name"
                           label="Assets"
                           >
                             <template slot-scope="scope">
                             <div>
                               {{scope.row.token1Balance ?scope.row.token1Balance :""  }}
                               {{scope.row.token1.name}}
                             </div>
                           </template>
          </el-table-column>
          <el-table-column prop="token2.name"
                           label="Symbol">
                            <template slot-scope="scope">
                             <div>
                               {{scope.row.token2Balance ?scope.row.token2Balance :""  }}
                               {{scope.row.token2.name}}
                             </div>
                           </template>
          </el-table-column>
          <el-table-column prop="Liquidity"
                           label="Liquidity" >
                           <template slot-scope="scope">
                             <div>
                               {{scope.row.Liquidity ? scope.row.Liquidity  : "--"}}
                             </div>
                           </template>
                           <span ></span>
          </el-table-column>

        </el-table>

      </div>
      <div class="pagin">
        <el-pagination background
          v-if="pairList.length>=10"
                       layout="prev, pager, next"
                       :total="pairList.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

import chart from './chart.vue'
import chart2 from './chart2.vue'
import circular from './circular'
import {pairList} from '../../utils/token'
import {getBalanceInPool,getMyBalanceInPool,getLpBalanceInPool} from "../../utils/tronwebFn"
export default {
  components: { chart, chart2, circular },
  data () {
    return {
        pairList:pairList,
    }
  },
  mounted() {
    this.init();
    let arry = localStorage.getItem('pairList');
     if (arry) {
      this.poopairListlList = JSON.parse(arry);
    }
  },
  methods: {
       async init () {
         let arr = [];
         for (let index = 0; index < this.pairList.length; index++) {
           const el = this.pairList[index];
              let res =   await  getBalanceInPool(el,el.token1);
              let res1 =   await  getBalanceInPool(el,el.token2);
              let res2=   await getLpBalanceInPool(el);
              el.token1Balance = res;
              el.token2Balance = res1;
              el.Liquidity = res2;
              arr.push(el);
         }
          localStorage.setItem('pairList',JSON.stringify(arr));
         this.pairList = arr;
      }
  },
}
</script>
<style  lang="scss" scoped>
.container{
  margin-top: 120px;
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
  margin-top: 24px;
  background: #ffffff;

  .b2-top {
    height: 112px;
    .top1 {
      margin-top: 54px;
      margin-left: 41px;
      float: left;
      height: 22px;
      font-size: 20px;
      font-family:roboto-mediumitalice;
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
  margin-left: 41px;
}
>>> .el-table__row {
  height: 72px;
  background: #ffffff;
}
</style>
