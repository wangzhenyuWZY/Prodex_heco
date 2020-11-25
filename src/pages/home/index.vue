<template>
  <div class="container">
    <div  class="c-top" >
      <samp class="c-mp">FoxDex Protocol Analytics</samp>
      <div class="c-inp">
      <input type="text" placeholder="Search FoxDex pairs and tokens">  
      </div>
      
    </div>
    <div class="c-box1">
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
        </div>
      </div>


    </div>
<div class="c-box2">
  <div class="b2-top">
<samp class="top1">Top Tokens</samp> <div class="top-inp"><input type="text" placeholder="Please enter Top Tokens"></div>
  </div>
  <div class="table">
    <el-table
      :data="tableData"
      header-cell-class-name="adddd"
      header-row-class-name="tabe_tr"
      :header-row-style="{backgroundColor:'#F4F8FB',color:'#606266'}"
      cell-class-name="dddsadsa"
      style="width: 100%" >
    <el-table-column
      prop="address"
      label="name"
      width="200">
    </el-table-column>
    <el-table-column
      prop="assets"
      label="Assets"
      width="200">
    </el-table-column>
    <el-table-column
      prop="swapfee"
      label="Symbol">
    </el-table-column>
    <el-table-column
      prop="markrtcap"
      label="Liquidity">
    </el-table-column>
    <el-table-column
      prop="myliquidity"
      label="Volume(24hrs)">
    </el-table-column>
    <el-table-column
      prop="volume"
      label="Price">
    </el-table-column>
    <el-table-column
      prop="volume"
      label="Price change(24hr)">
    </el-table-column>
    </el-table>
    
      </div>
      <div class="pagin">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
     </el-pagination>
      </div>
 </div>
 <div class="c-box2">
  <div class="b2-top">
<samp class="top1">Top Pairs</samp> <div class="top-inp"><input type="text" placeholder="Please enter Top Tokens"></div>
  </div>

  <div class="table">
      <el-table
        :data="tableData"
        stripe
        header-cell-class-name="adddd"
        header-row-class-name="tabe_tr"
        :header-row-style="{backgroundColor:'#F4F8FB',color:'#606266'}"
        cell-class-name="dddsadsa"
        style="width: 100%" >
        <el-table-column
          prop="address"
          label="name"
          width="200">
        </el-table-column>
    <el-table-column
      prop="assets"
      label="Assets"
      width="200">
    </el-table-column>
    <el-table-column
      prop="swapfee"
      label="Symbol">
    </el-table-column>
    <el-table-column
      prop="markrtcap"
      label="Liquidity">
    </el-table-column>
    <el-table-column
      prop="myliquidity"
      label="Volume(24hrs)">
    </el-table-column>
    <el-table-column
      prop="volume"
      label="Price">
    </el-table-column>
    <el-table-column
      prop="volume"
      label="Price change(24hr)">
    </el-table-column>
    </el-table>
      </div>
      <div class="pagin">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
     </el-pagination>
      </div>
 </div>
 <div class="c-box2" style="margin-bottom: 120px">
  <div class="b2-top">
<samp class="top1">Transactions</samp> <div class="top-inp"><input type="text" placeholder="Please enter Top Tokens"></div>
  </div>

  <div class="table">
    <el-table
      :data="tableData"
      stripe
      header-cell-class-name="adddd"
      header-row-class-name="tabe_tr"
      :header-row-style="{backgroundColor:'#F4F8FB',color:'#606266'}"
      cell-class-name="dddsadsa"
      style="width: 100%" >
    <el-table-column
      prop="address"
      label="name"
      width="200">
    </el-table-column>
    <el-table-column
      prop="assets"
      label="Assets"
      width="200">
    </el-table-column>
    <el-table-column
      prop="swapfee"
      label="Symbol">
    </el-table-column>
    <el-table-column
      prop="markrtcap"
      label="Liquidity">
    </el-table-column>
    <el-table-column
      prop="myliquidity"
      label="Volume(24hrs)">
    </el-table-column>
    <el-table-column
      prop="volume"
      label="Price">
    </el-table-column>
    <el-table-column
      prop="volume"
      label="Price change(24hr)">
    </el-table-column>
    </el-table>
      </div>
      <div class="pagin">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
     </el-pagination>
      </div>
 </div>
 </div>
</template>

<script>
import chart from './chart.vue'
import chart2 from './chart2.vue'

 export default {
  components: { chart, chart2 },
    data() {
      return {
        tableData: [{
          address: '1',
          assets: '50% WETH',
          swapfee: '0.4%',
          markrtcap: '$83M',
          myliquidity: '- -',
          volume: '$1.4M',
        },
        {
          address: '2',
          assets: '50% WETH',
          swapfee: '0.4%',
          markrtcap: '$83M',
          myliquidity: '- -',
          volume: '$1.4M',
        },
        {
          address: '3',
          assets: '50% WETH',
          swapfee: '0.4%',
          markrtcap: '$83M',
          myliquidity: '- -',
          volume: '$1.4M',
        },{
          address: '4',
          assets: '50% WETH',
          swapfee: '0.4%',
          markrtcap: '$83M',
          myliquidity: '- -',
          volume: '$1.4M',
        },{
          address: '5',
          assets: '50% WETH',
          swapfee: '0.4%',
          markrtcap: '$83M',
          myliquidity: '- -',
          volume: '$1.4M',
        },{
          address: '6',
          assets: '50% WETH',
          swapfee: '0.4%',
          markrtcap: '$83M',
          myliquidity: '- -',
          volume: '$1.4M',
        },{
          address: '7',
          assets: '50% WETH',
          swapfee: '0.4%',
          markrtcap: '$83M',
          myliquidity: '- -',
          volume: '$1.4M',
        },
        {
          address: '8',
          assets: '50% WETH',
          swapfee: '0.4%',
          markrtcap: '$83M',
          myliquidity: '- -',
          volume: '$1.4M',
        },{
          address: '9',
          assets: '50% WETH',
          swapfee: '0.4%',
          markrtcap: '$83M',
          myliquidity: '- -',
          volume: '$1.4M',
        },
        {
          address: '10',
          assets: '50% WETH',
          swapfee: '0.4%',
          markrtcap: '$83M',
          myliquidity: '- -',
          volume: '$1.4M',
        }]
        
      }
    }
  }
</script>
<style  lang="scss" scoped>

.c-top{
  margin: 0 auto;
  overflow: hidden;
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.c-mp{
  margin-top: 40px;
  height: 27px;
  font-size: 24px;
  font-family: Arial-BoldItalicMT, Arial;
  font-weight: normal;
  color: #0F1730;
  line-height: 28px;

}
.c-inp{
  margin-top: 16px ;
  width: 800px;
  height: 48px;
  background: #FFFFFF;
  border-radius: 28px; 
  input{
      
      width: 262px;
      height: 20px;
      font-size: 18px;
      font-family: ArialMT;
      color: #A6AEB7;
      line-height: 21px;
      margin-top: 14px;
      margin-left: 280px;
  }
  
}

.c-box1{
width: 1200px;
height: 1004px;
background: #FFFFFF;
border-radius: 16px;
overflow: hidden;
margin: 0 auto;
margin-top: 40px;
.box1-p{
  display: flex;
  justify-content:center;
  border-bottom:1px #FFE5EBF2 solid ;

  .bpa,.bpb,.bpc{
    margin: 32px 24px;
    height: 22px;
    font-size: 20px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #0F1730;
    line-height: 23px;
  }

}
.mian-box1,.mian-box2{
  width: 960px;
  height: 360px;
  border: 1px #FFE5EBF2 solid;
  margin: 44px auto;
}
}
.c-box2{
  width: 1200px;
  margin: 0 auto;
  height: 960px;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 24px;
  background: #FFFFFF;
 
  .b2-top{
    height: 112px;
  .top1{
    margin-top: 53px;
    margin-left: 41px;
    float: left;
    width: 110px;
    height: 22px;
    font-size: 20px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #0F1730;
    line-height: 23px;
  }
  .top-inp{
    width: 583px;
    height: 48px;
    float:right;
    margin-top: 40px ;
    margin-right: 32px;
    background: #FFFFFF;
    border-radius: 28px; 
    border: 1px solid #A6AEB7;
  input{
    border-radius: 28px;
    color: #A6AEB7;
    line-height: 21px;
    margin-left: 207px;
    margin-top: 14px;
    width: 197px;
    height: 20px;
    font-size: 18px;
    font-family: ArialMT;
    } 
  }
  }

  .pagin{
    margin-left: 400px; 
    margin-top: 33px;
  }
.table{
    
    height: 760px;
    background: #ffffff;
 
  .tabe_tr{
    /* background-image: linear-gradient(131deg, #FFA61B 0%, #F3330E 100%) ; */
    height: 40px;
  }
}

.el-table tr{
  background-color: inherit;
  }

}


</style>
<style  scoped>
  >>>.el-table__row.el-table__row--striped{
     background: #000;
   }
  /* >>>.el-table tr{
    background: #ffffff;
  } */
  >>>.adddd{
    background-color: #F4F8FB;
  }
  >>>.el-table__row{
    height: 72px;
    background: #ffffff;
  }
</style>
