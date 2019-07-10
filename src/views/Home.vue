<template>
  <div class="home">
 
    <router-view class="home_box"/>
      <ul class="footer">
        <li class="item">
          <router-link to="/home/film">
            <span class="iconfont icon-dianying"></span>
            <span>电影</span> 
         </router-link>
        </li>
        <li>
          <router-link to="/home/cinema">
            <span class="iconfont icon-yingyuana"></span>
            <span>影院</span> 
      </router-link>
        </li>
      <li>  
        <router-link to="/home/shop" >
          <span class="iconfont icon-youhui"></span>
          <span>特惠</span>
       </router-link>
      </li>
      <li>
        <router-link to="/home/my">
          <span class="iconfont icon-wodexinxi" ></span>
          <span>我的</span>
      </router-link>
      </li>
   </ul>
  </div>
</template>

<script>


export default {
  name: 'home',
  components: {
  
  }
}
</script>
<style lang="scss" scoped>
    .footer{
    width: 100%;
    height:0.98rem;
    background: #ffffff;
    position: fixed;
    bottom: 0rem;
    display: flex;
    border-top:0.02rem solid #d3d3d3
    }
    .footer li{
      flex:1;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
   
        
    }
    .iconfont{
    font-size: 0.46rem;
    // color: #797d82;
    margin-bottom: 0.05rem;
}
    .footer li a{
      height: 0.98rem;
      margin-top: 0.05rem;
      display: flex;
      text-align: center;
      flex-direction: column;
    }
  
  .home_box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0.98rem;
  }
   .router-link-active{
      color:#ff5f16 !important
    }
</style>