<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="homeContainer">
      <SearchBar></SearchBar>
      <div class="blockInfo">
        <div class="blockInfoItem">
          <p class="val">{{homeInfo.maxNum/Math.pow(10,6)}}</p>
          <p class="name">{{$t('lang28')}}</p>
        </div>
        <div class="blockInfoItem">
          <p class="val">{{homeInfo.useNum/Math.pow(10,6)}}</p>
          <p class="name">{{$t('lang29')}}</p>
        </div>
        <div class="blockInfoItem">
          <p class="val">{{homeInfo.waitNum/Math.pow(10,6)}}</p>
          <p class="name">{{$t('lang30')}}</p>
        </div>
        <div class="blockInfoItem">
          <p class="val">{{homeInfo.yestodayNum/Math.pow(10,6)}}</p>
          <p class="name">{{$t('lang31')}}</p>
        </div>
        <div class="blockInfoItem">
          <p class="val">{{homeInfo.accountNum}}</p>
          <p class="name">{{$t('lang32')}}</p>
        </div>
        <div class="blockInfoItem">
          <p class="val">{{homeInfo.yestodayTransNum/Math.pow(10,6)}}</p>
          <p class="name">{{$t('lang33')}}</p>
        </div>
        <div class="blockInfoItem">
          <p class="val">{{homeInfo.superPeer}}</p>
          <p class="name">{{$t('lang34')}}</p>
        </div>
      </div>
      <div class="blockDetail clearfix">
        <div class="detailWrap fl hei241">
          <div class="detailTitle">
            <h2>{{$t('lang35')}}</h2>
            <p class="checkMore" @click="checkAllBlock">{{$t('lang36')}}<i></i></p>
          </div>
          <div class="detailCon">
            <ul class="translist">
              <li v-for="(item,index) in blockList" v-show="index<8" :key="index">
                <p>{{item.blockNumber}}<span class="time">{{item.timestamp}}</span></p>
                <p>{{item.transactionNumber?item.transactionNumber:0}} {{$t('lang3')}}</p>
                <p>{{item.dotcAmount?item.dotcAmount/Math.pow(10,6):0}}  DOTC</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="detailWrap fr hei241">
          <div class="detailTitle">
            <h2>{{$t('lang37')}}</h2>
            <p class="checkMore" @click="checkAllTrans">{{$t('lang38')}}<i></i></p>
          </div>
          <div class="detailCon">
            <ul class="transblock">
              <li v-for="(item,index) in transList" v-show="index<4" :key="index">
                <div class="top">
                  <span class="hash">{{item.hash}}</span>
                  <span class="num">{{item.dotcAmount/Math.pow(10,6)}}  DOTC</span>
                </div>
                <div class="btm clearfix">
                  <p class="transdt">{{$t('lang39')}}<span>{{item.from}}</span></p>
                  <p class="transdt">{{$t('lang40')}}<span>{{item.to}}</span></p>
                  <span class="times">{{item.timestamp}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="detailWrap fl hei270">
          <div class="detailTitle">
            <h2>{{$t('lang41')}} <span></span>(dotc)</h2>
          </div>
          <div class="detailCon nolrpad">
            <canvas class="container" id="container" height='270px' width="100%"></canvas>
          </div>
        </div>
        <div class="detailWrap fr hei270">
          <div class="detailTitle">
            <h2>{{$t('lang42')}}</h2>
          </div>
          <div class="detailCon nolrpad">
            <canvas class="container" id="container1" height='270px' width="100%"></canvas>
          </div>
        </div>
      </div>
    </div>
    <Btm></Btm>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
export default {
  components:{
    Navbar,
  },
  watch: {
    
  },
  data() {
    return {
      homeInfo:{},
      chartData:[],
      pageNum:0,
      pageNum1:0,
      blockList:[],
      transList:[],
      over:null
    }
  },
  mounted() {
    
  },
  methods: {
    
  }
}
</script>
<style  lang="less" scoped>
.homeContainer{
  
}
</style>
