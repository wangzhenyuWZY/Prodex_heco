<template>
<div class="foxdex">
    <div class="fox_box"> 
      <div class="fox_box1"> 
         <div class="fox_p">
            <p class="fox_p1">What is Harvest?</p>
            <div class="foxp">
            <p class="fox_p2">Harvest automatically farms the highest yield available from the newest DeFi protocols, and optimizes the yields that are received using the latest farming techniques.</p>
            </div>
          </div>
          <div class="fox_p">
            <p class="fox_p1">What is FARM?</p>
            <div class="foxp">
            <p class="fox_p2">FARM is a cashflow token for Harvest, one of the largest autonomous hedge funds.</p>
            </div>
          </div>
          <div class="fox_p">
            <p class="fox_p1">What are the token economics for FARM?</p>
            <div class="foxp">
            <p class="fox_p2">·Farm holders receive cashflows from revenues on AUM, ·currently set to 30% profit sharing
                               <br> ·Circulating supply at launch: 0
                               <br> ·FARM has a current circulating supply of 392,293.92
                               <br> ·FARM has a total supply over 4 years of 690,420
                               <br> ·14,850 FARM has been burned in week 3
                               <br> ·5,846.9 FARM has been burned in week 4
                               <br> ·Harvest was completely bootstrapped, with no VCs and no premine</p>
            </div>
          </div>
          <div class="fox_p">
            <p class="fox_p1">What is fDAI, fUSDC, fWBTC?</p>
            <div class="foxp">
            <p class="fox_p2">fDAI, fUSDC, fWBTC are the yield-bearing versions of these assets, which are being automatically farmed by the harvest algorithm. <br>
               These assets are automatically appreciating, and you can redeem them at any time for DAI, USDC, wBTC.</p>
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
.foxdex{
    width: 720px;
    margin: 0 auto;
    padding-top: 120px;
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
    padding-top: 0px;
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

}

</style>