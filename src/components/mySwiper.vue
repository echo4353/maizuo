<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in list" :key="item.id">
        <img :src="item.imgUrl" alt=""/>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
export default {
  data(){
    return{
        list:[]
    }
  },
  created() {
    this.$axios.get(
      "/mz/gateway?type=2&cityId=110100&k=1701487",
      {
       "headers": {
          "X-Client-Info": ` {"a":"3000","ch":"1002","v":"5.0.4","e":"156198774051539608844"}`,
          "X-Host": ` mall.cfg.common-banner`
        }
      }).then((res)=>{
        this.list = res.data.data
      });
  },
  mounted() {
    
  },
  watch: {
    list(){//保证数据变了    保证dom 准备好了
    //使用nextTick 延迟回调函数
    this.$nextTick(()=>{
         var mySwiper = new Swiper(".swiper-container", {
      loop: true, // 循环模式选项
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination"
      }
    })
    }) ;
    }
  },

};
</script>
<style lang="scss" >
.swiper-container {
  width: 100%;
  height: 100%;
  img{
    width: 100%;
    height: 100%;
  }
}
.swiper-pagination-bullet-active {
   background:#fff !important;

   
}
.swiper-pagination{
  text-align: right;
  
}


</style>