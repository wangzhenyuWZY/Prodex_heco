<template>
  <div class="container">
      <div class="table">
          <el-table
    :data="tableData"
    stripe
    header-cell-class-name="adddd"
    header-row-class-name="tabe_tr"
    :header-row-style="{background:'linear-gradient(131deg, #FFA61B 0%, #F3330E 100%) ',color:'#606266'}"
    cell-class-name="dddsadsa"
    style="width: 100%">
    <el-table-column
      prop="address"
      label="Pool address"
      width="180">
    </el-table-column>
    <el-table-column
      prop="assets"
      label="Assets"
      width="180">
    </el-table-column>
    <el-table-column
      prop="swapfee"
      label="Swap fee">
    </el-table-column>
    <el-table-column
      prop="markrtcap"
      label="Markrt cap">
    </el-table-column>
    <el-table-column
      prop="myliquidity"
      label="My liquidity">
    </el-table-column>
    <el-table-column
      prop="volume"
      label="Volume(24h)">
    </el-table-column>
  </el-table>
      </div>
  </div>
</template>

<script>
 export default {
    data() {
      return {
        tableData: [{
          address: '0xleff…a3d5',
          assets: '50% WETH',
          swapfee: '0.4%',
          markrtcap: '$83M',
          myliquidity: '- -',
          volume: '$1.4M',
        }
        ]
      }
    }
  }
</script>

<style  >
.table{
  width: 1200px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
 
 
}
 .tabe_tr{
    /* background-image: linear-gradient(131deg, #FFA61B 0%, #F3330E 100%) ; */

    height: 40px;
  }
.el-table tr{
    background-color: inherit;
  }
</style>