<template>
<div class="foxdex"> 
   <div class="fbox">
        <div class="fbox1">
          <div class="title title1">
         BEE
        </div>
        <div class="left1">
          <div class="leff">

            <div class="le-box">
              <div class="le1">
                <span>总量</span>
                <span>0</span>
              </div>
              <div class="le1">
                <span>已锁定</span>
                <span>0</span>
              </div>
              <div class="le1">
                <span>待锁定</span>
                <span>{{'trxBalance'}}</span>
              </div>
              <div class="le_but">
                <el-button class="from_botton item_button" @click="alsert = true">销毁</el-button>
              </div>
            </div>
          </div>
        </div>
       </div>
       <div class="fbox1">
          <div class="title ">
         BEE
        </div>
        <div class="left1">
          <div class="leff">
            <div class="le-box">
              <div class="le1">
                <span>总量</span>
                <span>0</span>
              </div>
              <div class="le1">
                <span>待销毁</span>
                <span>0</span>
              </div>
              <div class="le1">
                <span>已销毁</span>
                <span>0</span>
              </div>
              <div class="le_but">
                <el-button class="from_botton item_button" @click="alsert = true">清除</el-button>
              </div>
            </div>
          </div>
        </div>
       </div>
        
      </div>
    <div class="fox_box"> 
    
      <div class="fox_box1"> 
        
          <div class="fox_p">
            <p class="fox_p1">{{$t('fox.fb1')}}</p>
            <div class="foxp">
            <p class="fox_p2">{{$t('fox.fb2')}}</p>
            </div>
          </div>
          <div class="fox_p">
            <p class="fox_p1">{{$t('fox.fc1')}}</p>
            <div class="foxp">
            <p class="fox_p2">{{$t('fox.fc2')}}
                    <br> {{$t('fox.fc3')}}
                    <br> {{$t('fox.fd1')}}
                    <br> {{$t('fox.fd2')}}
                    <br> {{$t('fox.fd3')}}
                 </p>
            </div>
          </div>
          <div class="fox_p">
            <p class="fox_p1">{{$t('fox.fdd')}}</p>
            <div class="foxp">
            <p class="fox_p2">                  
                    {{$t('fox.fd4')}}
               <br> {{$t('fox.fd5')}}
               <br> {{$t('fox.fd6')}}
            </p>
            </div>
          </div>
           <div class="fox_p">
            <p class="fox_p1">{{$t('fox.fe1')}}</p>
            <div class="foxp">
            <p class="fox_p2">{{$t('fox.fe2')}} </p>
            </div>
          </div>
           <div class="fox_p">
            <p class="fox_p1">{{$t('fox.fe3')}}</p>
            <div class="foxp">
            <p class="fox_p2">{{$t('fox.fe4')}}</p>
            </div>
          </div>
           <div class="fox_p">
            <p class="fox_p1">{{$t('fox.ff1')}}</p>
            <div class="foxp">
            <p class="fox_p2">{{$t('fox.ff2')}}
            <br> {{$t('fox.ff3')}}
            <br> {{$t('fox.ff4')}}
             </p>
            </div>
          </div>  
          <div class="fox_box2">
              <ul class="foxul">
                  <li> <img src="../../assets/img/foxdex/icon_脸书.svg" alt="">  </li>                  
                  <li> <img src="../../assets/img/foxdex/icon_推特.svg" alt=""> </li>
                  <li> <img src="../../assets/img/foxdex/icon_telegram.svg" alt=""> </li>
                  <li> <img src="../../assets/img/foxdex/icon_discord.svg" alt=""> </li>
                  <li> <img src="../../assets/img/foxdex/icon_medium.svg" alt=""> </li>
                  <li> <img src="../../assets/img/foxdex/icon_reddit.svg" alt=""> </li>                
              </ul>
          </div>
      </div>

    </div>
</div>

</template> 

<script>
import ipConfig from '../../config/ipconfig.bak'
import { approved, allowance,getConfirmedTransaction } from '../../utils/tronwebFn'

export default {
  
    data() {
        return {
         inputdisabled1: true,
         inputdisabled2: true,
         trxBalance: 0,
         wtrxBalance: 0,
            
        }
    },
    created(){
      this.init();

    },
    methods: {
   

        
    },
}
</script>

<style lang="scss" scoped>
@function rem($size, $miall: 75) {
  @return $size/ $miall + rem;
}
@function rem1($size, $miall: 75) {
  @return $size + px;
}
.foxdex{
    width: 720px;
    
    margin: 0 auto;
    padding-top: 120px;
    height: 100%;
    padding-bottom: 100px;
     overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;

  }
.fbox{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .fbox1{
    width: 345px;
    background: #fff;
    border-radius: 20px;
    .title {
        text-align: center;
        padding-top: 20px;
        font-size: 18px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
      }
     .left1 {
        
        background: #ffffff;
        border-radius: 15px;
        .leff {
          padding: 20px 15px;

          .le-box {
            background: #f9faff;
            border-radius: 10px;
            box-sizing: border-box;

            .le1 {
              margin: 0 15px;
              display: flex;
              justify-content: space-between;
              padding-top: 20px;
              font-size: 17px;
              font-family: Roboto-Medium, Roboto;
              font-weight: 400;
              color: #878b97;
              line-height: 25px;
            }
            .le11 {
              padding: 30px 0;
            }
            .inputs {
              padding: 30px 0;

              margin: 0 15px;

              align-items: center;
              display: flex;
              .add_input {
                height: rem1(63);
                border-radius: 10px;
                flex: 1;
                width: 80%;
                background: none;
                font-size: rem1(18);
                font-family: Roboto-Medium, Roboto;
                font-weight: 500;
                color: #0f0d14;
                background: #ffffff;
              }
            }
            .le_but {
              margin-top: 20px;
              padding-bottom: 25px;
              padding-left: 15px;
              padding-right: 15px;
              .from_botton {
                font-size: 18px;
                font-family: Roboto-Medium, Roboto;
                font-weight: 500;
                color:  #05C98E;
                background: #ffffff;
                border-radius: 15px;
                border: 1px solid  #05C98E;
              }
            }
          }
          .le-box2 {
            padding-top: 25px;
            .lbx {
              margin-left: 18px;
            }
            .linput {
              padding-top: 10px;
              .inputs {
                height: rem1(61);
                background: #f9faff;
                border-radius: 10px;
                align-items: center;
                display: flex;

                .add_input {
                  flex: 1;
                  width: 80%;
                  background: none;
                  font-size: rem1(17);
                  font-family: Roboto-Medium, Roboto;
                  font-weight: 400;
                  color: #878b97;
                  padding-left: 15px;
                }
               
              }
            }
          }
         
        }
      }
    
  }
  
  }
    
    .fox_box{
        border-radius: 20px;
        background-color: #fff;
        height: auto; 
        .fox_box1{
            padding: 40px 0;
            margin: 0 24px;
            .fox_p{
                margin-bottom: 32px;
                .fox_p1{  
                    margin-left: 16px; 
                    font-size: 20px;
                    font-family: Roboto-Medium, Roboto;
                    font-weight: 500;
                    color: #0F1730;
                    margin-bottom: 12px;                  
                    line-height: 21px;
                    }
                    .foxp{                        
                            background: #F6F7FB;
                            border-radius: 12px;
                      .fox_p2{
                           padding: 16px 16px;
                            font-size: 17px;
                            font-family: Roboto-Regular, Roboto;
                            font-weight: 400;
                            color: #5D606A;
                            line-height: 22px;

                       }
                    }

                
            }           

        }
        .fox_box2{
            margin: 0 88px;
            .foxul{
                display: flex;
                justify-content: space-around;

            }
        }

              
    }
    
}
@media screen and (max-width:750px) {
  .foxdex{
    width: 92%;
    margin: 0 auto;
    padding-top: 10px;
 .fbox{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  }


    .fox_box{
        border-radius: rem(38 );
        background-color: #fff;
        height: auto; 
        .fox_box1{
            padding: rem(45 ) 0;
            margin: 0 rem(38);
            .fox_p{
                margin-bottom: 32px;
                .fox_p1{  
                    margin-left: 16px; 
                    font-size: rem(34 );
                    font-family: Roboto-Medium, Roboto;
                    font-weight: 500;
                    color: #0F1730;
                    margin-bottom: 12px;                  
                    line-height: 21px;
                    }
                    .foxp{                        
                            background: #F6F7FB;
                            border-radius: 12px;
                      .fox_p2{
                           padding: 16px 16px;
                            font-size: rem(30 );
                            font-family: Roboto-Regular, Roboto;
                            font-weight: 400;
                            color: #5D606A;
                            line-height: 22px;

                       }
                    }
                   }           
                  }
    .fox_box2{
      margin: 0 rem(40 );
      .foxul{
        display: flex;
        justify-content: space-around;
            }
        }

              
    }
    
}

}

</style>