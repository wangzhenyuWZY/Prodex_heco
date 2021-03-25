<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="poolContainer">
        <h2 class="prodexInfo" style="padding-top:40px;">{{$t('lang109')}}</h2>
        <div class="prodexDate">
            <span>
                <img src="../../assets/img/icon2.png">
            </span>
            <p>September 16th, 2020</p>
        </div>
        <div class="prodextip" v-show="lang=='zh'">
            	<p>ProDEX是一款基于自动化做市商（AMM）的的去中心化交易所产品，采用了目前市面上最流行的基于火币生态链的DEX模型，融合了火币生态链交易费低廉、交易速度快和以太坊生态圈强大网络的优势，支持流动性挖矿、交易挖矿的“双重挖矿机制”。</p>
                <p>ProDEX致力于打造火币生态链Heco上的集DEX、DAO（社区自治）为一体的DeFi平台，为用户提供更加安全可信、资产选择和配置更多样化、预期投资回报率更高的去中心化代币兑换服务。未来ProDEX还将打通火币生态链Heco、币安智能链BSC、OKEX生态链OKExChain，形成多链共通，多链互联的全新生态，成为一个全面综合的去中心化交易所DEX。ProDEX认为，更大的交易活跃度才能为用户创造更多的价值，同时带来用户的群聚效应和生态的繁荣。</p>
                <p>ProDEX以去中心化交易所业务为起点，未来将在借贷、保险、资管等区块链去中心化金融领域，发挥DeFi的无限潜力。
ProDEX是一个集合了目前市面上DEX的优势，并结合中心化交易所平台币等特点的极具革新意识的DeFi项目，并且基于正在快速发展和生态逐渐繁荣的火币生态链，具有极大的想象空间和成长空间。</p>
        </div>
        <div class="prodextip" v-show="lang=='jr'">
            	<p>ProDEXは、自動マーケットメーカー（AMM）をベースにした分散型交換商品で、Huobiエコチェーンをベースにした市場で最も人気のあるDEXモデルを採用し、Huobiエコチェーンの低取引手数料と取引速度を統合しています。 Kuaihe Ethereumエコシステムの強力なネットワークの利点は、流動性マイニングとトランザクションマイニングの「デュアルマイニングメカニズム」をサポートします。</p>
                <p>ProDEXは、HuobiエコロジカルチェーンHeco上でDEXとDAO（コミュニティの自律性）を統合するDeFiプラットフォームの構築に取り組んでおり、ユーザーに、より安全で信頼性の高い資産、より多様な資産の選択と構成、およびより高い期待収益率を提供します。一元化されたトークン交換サービス。将来的には、ProDEXはHuobiエコロジカルチェーンHeco、Binance Smart Chain BSC、およびOKEXエコロジカルチェーンOKExChainも開き、マルチチェーン共通およびマルチチェーン相互接続の新しいエコシステムを形成し、包括的な分散型交換DEXになります。 ProDEXは、より大きな取引活動がユーザーにとってより多くの価値を生み出すと同時に、ユーザーのクラスタリング効果と生態学的繁栄をもたらすことができると信じています。</p>
                <p>ProDEXは、分散型取引所ビジネスを出発点としており、将来的には、貸付、保険、資産管理などのブロックチェーン分散型金融分野におけるDeFiの無限の可能性を解き放ちます。
                <p>ProDEXは、市場に出回っている現在のDEXの利点と、一元化された交換プラットフォーム通貨の特性を組み合わせた、非常に革新的なDeFiプロジェクトです。Huobiエコロジカルチェーンの急速な発展と生態学的繁栄に基づいて、素晴らしいスペースと成長を想像してください。スペース。</p>
        </div>
        <div class="prodextip" v-show="lang=='kr'">
            <p>ProDEX는 AMM (Automated Market Maker)을 기반으로 한 탈 중앙화 거래소 상품으로, 시장에서 Huobi Eco-Chain을 기반으로 가장 인기있는 DEX 모델을 채택하고, Huobi Eco-Chain의 낮은 거래 수수료와 거래 속도를 통합했습니다. Kuaihe Ethereum 생태계의 강력한 네트워크의 장점은 유동성 마이닝 및 트랜잭션 마이닝의 "이중 마이닝 메커니즘"을 지원합니다.</p>
            <p>ProDEX는 Huobi 생태계 체인 Heco에 DEX와 DAO (커뮤니티 자율성)를 통합하는 DeFi 플랫폼을 구축하여 사용자에게보다 안전하고 신뢰할 수있는 자산,보다 다양한 자산 선택 및 구성, 높은 투자 수익률을 제공하기 위해 최선을 다하고 있습니다. 중앙 집중식 토큰 교환 서비스 . 앞으로 ProDEX는 또한 후 오비 생태계 체인 Heco, 바이 낸스 스마트 체인 BSC, OKEX 생태계 체인 OKExChain을 열어 다중 체인 공통 및 다중 체인 상호 연결의 새로운 생태계를 형성하고 포괄적 인 분산 형 거래소 DEX가 될 것입니다. ProDEX는 더 큰 거래 활동이 사용자에게 더 많은 가치를 창출하는 동시에 사용자 클러스터링 효과와 생태적 번영을 가져올 수 있다고 믿습니다.</p>
            <p>ProDEX는 탈 중앙화 거래소 사업을 출발점으로 삼고, 향후 대출, 보험, 자산 관리 등 블록 체인 탈 중앙화 금융 분야에서 DeFi의 무한한 잠재력을 발휘할 것입니다.
            <p>ProDEX는 시장에서 현재 DEX의 장점을 결합하고 중앙 집중식 거래소 플랫폼 통화의 특성을 결합한 매우 혁신적인 DeFi 프로젝트입니다 .Huobi 생태 체인의 빠른 발전과 생태 번영을 기반으로 큰 Imagine 공간과 성장을 가지고 있습니다. 우주.</p>
        </div>
        <div class="prodextip" v-show="lang=='en'">
            <p>ProDEX is a decentralized exchange product based on an automated market maker (AMM). It adopts the most popular DEX model based on the Huobi Eco-Chain currently on the market, and integrates the low transaction fees and transaction speed of the Huobi Eco-Chain. The advantages of the powerful network of Kuaihe Ethereum ecosystem support the "dual mining mechanism" of liquidity mining and transaction mining.</p>
            <p>ProDEX is committed to building a DeFi platform integrating DEX and DAO (community autonomy) on the Huobi ecological chain Heco, providing users with more secure and reliable assets, more diversified asset selection and configuration, and higher expected return on investment. Centralized token exchange service. In the future, ProDEX will also open up the Huobi ecological chain Heco, Binance Smart Chain BSC, and OKEX ecological chain OKExChain to form a new ecosystem of multi-chain common and multi-chain interconnection, and become a comprehensive decentralized exchange DEX. ProDEX believes that greater trading activity can create more value for users, and at the same time bring user clustering effects and ecological prosperity.</p>
            <p>ProDEX takes the decentralized exchange business as its starting point. In the future, it will unleash the unlimited potential of DeFi in the field of blockchain decentralized finance such as lending, insurance, and asset management.
            <p>ProDEX is a highly innovative DeFi project that combines the advantages of the current DEX on the market and combines the characteristics of the centralized exchange platform currency. Based on the rapid development and ecological prosperity of the Huobi ecological chain, it has great Imagine space and growth space.</p>
        </div>
    </div>
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
  computed: {
    lang (){
        return this.$i18n.locale
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    
  },
  methods: {
    
  }
}
</script>
<style  lang="less" scoped>
.poolContainer{
    text-align:center;
  .poolRewards{
      width: 600px;
        height: 140px;
        background: linear-gradient(270deg, #232221 0%, #373330 100%);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
        border-radius: 12px;
        padding:15px;
        box-sizing: border-box;
        margin:100px auto 0;
        text-align:left;
        background-image: url(../../assets/img/icon12.png);
        background-repeat: no-repeat;
        background-position: right 20px top 13px;
        background-size:88px 114px;
      h2{
          font-size:16px;
          color:#fff;
          line-height:15px;
          padding-bottom:10px;
      }  
      p{
          font-size:13px;
          color:#C4C2BE;
          line-height:17px;
          padding-bottom:10px;
      }
      a{
          font-size:14px;
          color:#C4C2BE;
          line-height:18px;
          text-decoration: underline;
          cursor: pointer;
      }
  }
  .partic{
      padding-top:28px;
      width:600px;
      margin:0 auto;
      span.fl{
          float:left;
          font-size:16px;
          color:#C4C2BE;
          line-height:22px;
      }
      span.fr{
          float:right;
          font-size:16px;
          color:#837F76;
          line-height:20px;
      }
      input{
          width: 100%;
            height: 60px;
            box-shadow: 2px 2px 3px 0px rgba(19, 19, 19, 0.5);
            border-radius: 12px;
            border: 1px solid #38393B;
            font-size:14px;
            text-indent: 26px;
            margin-top:20px;
            background:none;
            color:#fff;
            &::-webkit-input-placeholder{color:#837F76;}
      }
  }
}
.prodexInfo{
        font-size:80px;
        color:#fff;
        text-align:center;
        padding-bottom:7px;
    }
    .prodexDate{
        text-align:center;
        padding-top:40px;
        span{
            display:block;
            width:20px;
            margin:0 auto;
            padding-bottom:8px;
            border-bottom:1px solid #6A6A6A;
            img{width:19px;}
        }
        p{
            font-size:16px;
            color:#837F76;
            line-height:22px;
            padding-top:10px;
        }
    }
    .prodextip{
        font-size:18px;
        color:#C4C2BE;
        line-height:24px;
        text-align:center;
        width:600px;
        margin:50px auto;
        text-indent:40px;
    }
@media screen and (max-width: 750px) {
    .poolContainer{
       .poolRewards{
           margin-top:40px;
           width:345px;
           height:140px;
           background-size:124px 161px;
           h2{
               line-height:22px;
           }
           p{
               padding-bottom:20px;
           }
       } 
       .partic{
           padding:20px 15px;
           width:auto;
           text-align:left;
           span.fl{
               float:inherit;
               display:block;
           }
           span.fr{
               float:inherit;
               display:block;
           }
       }
    }
    .prodexInfo{
        font-size:50px;
    }
    .navcontainer .navigation .navlist{
        display:none;
    }
    .prodextip{
        font-size:13px;
        text-align:left;
        padding:0 15px;
        width:auto;
    }
}
</style>
