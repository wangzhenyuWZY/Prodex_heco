<template>
<div class="foxdex">
    <div class="fox_box"> 
      <div class="fox_box1"> 
         <div class="fox_p">
            <p class="fox_p1"> {{$t('fox.foxp1')}} </p>
            <div class="foxp">
            <p class="fox_p2">{{$t('fox.foxp2')}}

               <br> <br>{{$t('fox.foxp3')}}
                <br>{{$t('fox.foxp4')}}
                <br>{{$t('fox.foxp5')}}
                <br>{{$t('fox.foxp6')}}
                <br>{{$t('fox.foxp7')}}
             
            </p>
            </div>
          </div>
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
                 </p>
            </div>
          </div>
          <div class="fox_p">
            <p class="fox_p1">{{$t('fox.fd1')}}</p>
            <div class="foxp">
            <p class="fox_p2">{{$t('fox.fd2')}}
               <br> {{$t('fox.fd3')}}
               <br> {{$t('fox.fd4')}}
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
                    <br>
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

export default {
  
    data() {
        return {
            
        }
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
                    font-size: 18px;
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
                            font-size: 16px;
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