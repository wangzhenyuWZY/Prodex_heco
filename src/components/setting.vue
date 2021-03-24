<template>
    <div class="popmask">
        <div class="setContainer">
            <h2>{{$t('lang14')}}</h2>
            <div class="setItem">
                <p class="setTitle">{{$t('lang15')}}</p>
                <div class="setTolerance clearfix">
                    <span @click='setTolerance(0.1,0)' :class="curryToler==0?'active':''">0.1%</span>
                    <span @click='setTolerance(0.5,1)' :class="curryToler==1?'active':''">0.5%</span>
                    <span @click='setTolerance(1,2)' :class="curryToler==2?'active':''">1%</span>
                    <div class="setPut">
                        <input v-model='toler' @input='personToler'>
                        <a>%</a>
                    </div>
                </div>
            </div>
            <div class="setItem">
                <p class="setTitle">{{$t('lang16')}}</p>
                <div class="setDeadline">
                    <span><input value="20"></span>
                    {{$t('lang17')}}
                </div>
            </div>
            <div class="setItem clearfix" v-show='false'>
                <p class="setTitle fl">Toggle Expert Mode</p>
                <div class="swichBar clearfix">
                    <span class="active">On</span>
                    <span>Off</span>
                </div>
            </div>
            <div class="setItem">
                <p class="setTitle">{{$t('lang101')}}</p>
                <div class="langlist clearfix">
                    <span @click="changeLang('zh')" :class="lang=='zh'?'active':''">简体中文</span>
                    <span @click="changeLang('en')" :class="lang=='en'?'active':''">English</span>
                    <span @click="changeLang('jr')" :class="lang=='jr'?'active':''">日本語</span>
                    <span @click="changeLang('kr')" :class="lang=='kr'?'active':''">한국어</span>
                </div>
            </div>
        </div>
    </div>  
</template>
<script>
export default {
  data(){
    return {
        curryToler:0,
        toler:'',
        lang:this.$i18n.locale
    };
  },
  created(){
  },
  methods:{
      changeLang(ln){
          this.$i18n.locale = ln
          this.lang = ln
          localStorage.setItem('lang', this.$i18n.locale)
      },
      close(){
          this.$emit('close')
      },
      setTolerance(num,cur){
          this.curryToler = cur
          this.$store.commit('SET_TOLERANCE', num)
      },
      personToler(){
            this.curryToler = 3
          this.$store.commit('SET_TOLERANCE', this.toler)   
      }
  }
}
</script>
<style lang='less' scoped>
.setContainer{
    position:fixed;
    top:70px;
    left:0;
    right:0;
    padding:0 15px;
    background:#1A1918;
    border-radius: 0px 0px 20px 20px;
    z-index:99;
    h2{
        font-size:14px;
        color:#C4C2BE;
        line-height:20px;
        padding-top:17px;
    }
    .setItem{
        padding-top:14px;
        .setTitle{
            font-size:12px;
            color:#837F76;
            line-height:17px;
            &.fl{
                float:left;
                line-height:30px;
            }
        }
        .setTolerance{
            padding-top:10px;
            span{
                min-width: 66px;
                height: 28px;
                background: #121111;
                border-radius: 15px;
                border: 1px solid #3D3B39;
                text-align:center;
                line-height:28px;
                font-size:13px;
                color:#C4C2BE;
                float:left;
                margin-right:10px;
                box-sizing: border-box;
                cursor: pointer;
                &.active{
                    border:none;
                    background:#30694B;
                    color:#fff;
                }
            }
            .setPut{
                position:relative;
                overflow: hidden;
                height: 28px;
                background: #121111;
                border-radius: 15px;
                border: 1px solid #3D3B39;
                input{
                    background:none;
                    width:100%;
                    line-height:28px;
                    outline: none;
                    padding-right:40px;
                    text-align:right;
                    box-sizing: border-box;
                    color:#fff;
                }
                a{
                    position:absolute;
                    right:20px;
                    top:0;
                    line-height:28px;
                    font-size:13px;
                    color:#C4C2BE;
                }
            }
        }
        .setDeadline{
            padding-top:10px;
            font-size:12px;
            color:#C4C2BE;
            line-height:28px;
            span{
                display:inline-block;
                vertical-align: middle;
                width: 70px;
                height: 28px;
                background: #121111;
                border-radius: 15px;
                border: 1px solid #3D3B39;
                margin-right:15px;
                box-sizing: border-box;
                input{
                    width:100%;
                    line-height:28px;
                    background:none;
                    border:none;
                    outline:none;
                    color:#fff;
                    font-size:14px;
                    text-align:center;
                }
            }
        }
        .swichBar{
            float:right;
            width: 80px;
            height: 30px;
            background: #3A3937;
            border-radius: 6px;
            span{
                float:left;
                width:50%;
                height:30px;
                text-align:center;
                font-size:14px;
                color:#C4C2BE;
                line-height:30px;
                border-radius:6px;
                cursor: pointer;
                &.active{
                    background:#6A6A6A;
                }
            }
        }
        .langlist{
            padding-top:10px;
            padding-bottom:24px;
            span{
                width: 80px;
                height: 28px;
                background: #121111;
                border-radius: 15px;
                border: 1px solid #3D3B39;
                text-align:center;
                line-height:28px;
                font-size:13px;
                color:#C4C2BE;
                float:left;
                margin-right:8px;
                box-sizing: border-box;
                cursor: pointer;
                &.active{
                    border:none;
                    background:#30694B;
                    color:#fff;
                }
                &:last-child{
                    margin-right:0;
                }
            }
        }
    }
}
.popMask{
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background:rgba(0,0,0,0.2);
    z-index:9;
}
@media screen and (max-width: 750px) {
    .setContainer{
        top:auto;
        bottom:76px;
        border-radius:20px 20px 0px 0px;
    }
}
</style>