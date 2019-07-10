<template>
  <div >
   <header>
     <i class="iconfont icon-cuohao" @click="goo" ></i>
     <span>当前城市 -</span>
     <mt-search placeholder="输入城市名或拼音"></mt-search>
     </header> 
     <div class="gprs-city ">
        <p>GPS定位你所在城市</p>
        <p>定位失败</p>
     </div>
     <div class="gprs-city2 ">
        <p>热门城市</p>
        <p>北京</p>
        <p>上海</p>
        <p>广州</p>
        <p>深圳</p>
     </div>
    <ul class="city">
      <li v-for="(city,index) in cities" :key="city.id" >
         <h3 v-if="index===0 || index!==0 && city.letter !== cities[index-1].letter" :ref="city.letter">{{city.letter}}</h3>
         <p @click="changeCity(city.name)">{{city.name}}</p>
         </li>
    </ul>
   <ol class="letters">
     <li v-for="item in letters" :key="item.id" @click="go(item)">{{item}}</li>
   </ol>
  </div>
</template>
<script>
import { Search } from 'mint-ui';
export default {
  
    data() {
    return {
      cities:[],
      letters:""
    };
  },
  created() {
     this.getData();
     this.getLetters();
  },
  methods: {
    changeCity(name2){
        sessionStorage.setItem("cityt",name2);
        this.$router.go(-1);
    },
    //获取数据
         getData() {
               this.$axios.get( `/mz/gateway?k=7238119`,
               {
                 params:{
                    k:Date.now()
                 },
               headers: {
                    "X-Client-Info":`{"a":"3000","ch":"1002","v":"5.0.4","e":"156198774051539608844"}`,
                    "X-Host":`mall.film-ticket.city.list`
               }
            }).then(res => {
         var arr = res.data.data.cities.sort((a,b)=>{
           return a.pinyin.localeCompare(b.pinyin)
         }).map((item)=>{
           return {
             'letter':item.pinyin[0].toUpperCase(),
             'name':item.name
           }
         })
         this.cities = arr;
        });
    },
    //获取26个英文字母
    getLetters(){
      var str="";
      for(var i=65;i<91;i++){
        if(String.fromCharCode(i)==='U' || String.fromCharCode(i)==='V' ||
         String.fromCharCode(i)==='I' || String.fromCharCode(i)==='O')
         {
          continue;
        }
        str+= String.fromCharCode(i);
      }
      this.letters=str;

    },
     goo(){
      this.$router.go(-1);
    },
    go(letter){
		 	var top = this.$refs[letter][0].offsetTop;
		 	document.documentElement.scrollTop=top;
		 }
  }
 
}
</script>
<style lang="scss" scoped>
    header{
      z-index: 9;
      width: 100%;
      height: 93*2/100+rem;
      background: rgb(255, 255, 255);
      position: fixed;
      top: 0 ;
      color: #191a1b;
      text-align: center;
      line-height: 0.88rem;
      span{
        font-size: 17*2/100+rem;
      }
   i{
     float: left;
     margin-left: 0.05rem;
   }
    }
   .city{

      //  margin-top:5rem;
       h3{
      background-color: #f4f4f4;
    color: #797d82;
    padding: 0 0 0 15*2/100+rem;
    height: 30*2/100+rem;
    line-height: 30*2/100+rem;
     }
     p{
       border-bottom: 0.02rem solid #ededed;
           background-color: #fff;
    height: 100%;
    line-height: 48*2/100+rem;
    font-size: 14*2/100+rem;
     padding: 0 0 0 15*2/100+rem;
}
     
  }
     .letters{
        //  margin-top:1.88rem;
        z-index: 999;
        position:fixed;
        top:50%;
        right:0;
        width:0.34rem;
        text-align: center;
        background-color: #fff;
       transform: translateY(-50%);
     }
     .mint-search{
       width: 100%;
       height: 1.3rem;
     }
 .gprs-city {
    margin-top: 2.3rem;
     p{
       font-size: 0.26rem;
    color: #797d82;
    margin-bottom: 0.2rem;
     margin-left: 0.5rem
     }
     p:nth-of-type(2){
       height: 0.6rem;
       width: 99*2/100+rem;
       text-align: center;
       line-height: 0.6rem;
       background: #f4f4f4;
       color: #191a1b;
       margin-left: 0.5rem
     }
 }
  .gprs-city2 {
    height: 2.5rem;
    position: relative;
     p{
       font-size: 0.26rem;
    color: #797d82;
    margin-bottom: 0.2rem;
     margin-left: 0.5rem
     }
     p:nth-of-type(2){
       height: 0.6rem;
       width: 99*2/100+rem;
       text-align: center;
       line-height: 0.6rem;
       background: #f4f4f4;
       color: #191a1b;
       margin-left: 0.5rem
     }
       p:nth-of-type(3){
       height: 0.6rem;
       width: 99*2/100+rem;
       text-align: center;
       line-height: 0.6rem;
       background: #f4f4f4;
       color: #191a1b;
       top:0.52rem;
       left:2.2rem;
      position: absolute;
     }
         p:nth-of-type(4){
       height: 0.6rem;
       width: 99*2/100+rem;
       text-align: center;
       line-height: 0.6rem;
       background: #f4f4f4;
       color: #191a1b;
       top:0.52rem;
       left:4.5rem;
      position: absolute;
     }
           p:nth-of-type(5){
       height: 0.6rem;
       width: 99*2/100+rem;
       text-align: center;
       line-height: 0.6rem;
       background: #f4f4f4;
       color: #191a1b;
       top:1.52rem;
       left:0rem;
      position: absolute;
     }
 }
 .mint-searchbar-core{
     color:  #2c3e50
 }
 
</style>
