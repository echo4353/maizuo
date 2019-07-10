<template>
  <div class="box" v-gd="vis" dis="210">
    <div class="myheader" v-show="vis.flag">
      <div class="movie">
        <div class="city">
          <span>{{city}}</span>
          <i class="iconfont icon-xiajiantou"></i>
        </div>
        <div class="title">
          <span>电影</span>
        </div>
      </div>
   <div class="nav">
         <h2><router-link to="/home/film/nowplaying">
         正在上映
         </router-link>
         
         </h2>
      <h2><router-link to="/home/film/comingSoon">
      即将上映
      </router-link></h2>
      </div>
    </div>
    <div class="swiper">
      
      <div class="dingwei">
        <router-link to="/city">
        <span>{{city}}</span>
          <i class="iconfont icon-xiajiantou"></i>
           </router-link>
        </div>
     
      <mySwiper />
    </div>
     <div class="nav">
         <h2><router-link to="/home/film/nowplaying">
         正在上映
         </router-link>
         
         </h2>
      <h2><router-link to="/home/film/comingSoon">
      即将上映
      </router-link></h2>
      </div>
      <ul class="list" 
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <li v-for="item in list" :key="item.id" @click="godetail(item.filmId)">
        <div class="pic"><img :src="item.poster" alt=""></div>
        <div class="details">
            <div class="top"><p>{{item.name}}</p><span>{{item.filmType.name}}</span></div>
            <div class="center"><span>观众评分</span><span>{{item.grade}}</span></div>
            <div class="middle"><span>主演：</span>
            <span v-for="item2 in item.actors" :key="item2.id">{{item2.name}}</span>
            </div>
            <div class="bottom" v-if="type==='nowplaying'"><span>{{item.nation}} | {{item.runtime}} 分钟</span></div>
              <div v-else>{{item.premiereAt*1000|formatTime}}</div>
        </div>
        <!-- //router link跳转会影响样式   用编程式导航去跳转 -->
        <!-- <router-link :to="'/detail/'+item.filmId"> -->
         <div class="buy">购票</div>
         <!-- </router-link> -->
        </li>
      
    </ul>
  </div>
</template>
import { Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
<script>
import { Toast } from 'mint-ui';
import mySwiper from "./mySwiper";
export default {
  data() {
    return {
      city:'',
      loading:false, //表示可以发请求    true  表示不可以发请求
      page:1, //当前的页码
      type: "",
      list: [],
      vis: {
        flag: false
      }
    };
  },
  created() {
    this.$router.push("/home/film/nowplaying")
    this.city = sessionStorage.getItem("cityt")||"北京"
  },
  components: {
    mySwiper
  },
  methods: {
    godetail(id){//到详情页面
        this.$router.push('/detail/'+id)//编程式导航方式跳转
    },
    loadMore(){//下拉滚动加载新数据
        this.page++;
        this.getData();
    },
    getData() {//按页获取数据
      if(this.page>3){
             Toast({
  message: '已经到底了',
  position: 'bottom',
  //  iconClass: 'fa fa-spinner fa-spin',
  duration: 2000
})
return;
      }
      var type = this.type === "nowplaying" ? 1 : 2;
     this.loading=true;//表示只能同时发一次请求
      this.$axios
        .get( `/mz/gateway?`,
          {
            params:{
                cityId:110100,
                pageNum:this.page,
                pageSize:10,
                type,
                k:Date.now()
            },
            headers: {
              "X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"154399058310458245367575"}`,
              "X-Host": `mall.film-ticket.film.list`
            }
          }
        )
        .then(res => {
          this.list =this.list.concat(res.data.data.films) ;
         this.loading=false;
        });
    },
    resetList(){
      this.list=[];
      this.loading=false;
      this.page=1;
    }
  },
  watch: {
    $route: {
      handler(newV) {
        if(newV.path==="/home/film"){
          this.$router.push("/home/film/nowplaying")
        }
        else{
          this.type = newV.params.type;
          this.resetList();
          this.getData();
        }
     
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  position: fixed;
  top: 0rem;
  bottom: 0.98rem;
  right: 0;
  left: 0;
  overflow: auto;
}


.swiper {
  width: 100%;
  height: 4.2rem;
  background: #ccc;
  .dingwei{
   position: absolute;
    top: 18*2/100+rem;
    left: 7*2/100+rem;
    color: #fff;
    z-index: 10;
    font-size: 13*2/100+rem;
    background: rgba(0,0,0,.2);
    height: 30*2/100+rem;
    line-height: 30*2/100+rem;
    border-radius: 15*2/100+rem;
    text-align: center;
    padding: 0 5*2/100+rem;
    span{
      color:#fff;
      font-size: 13*2/100+rem;
      line-height: 30*2/100+rem;
      text-align: center;
          
    }
  }
}
.myheader {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  text-align: center;
  background: #fff;
}
.movie {
  height: 0.88rem;
  border-bottom: 0.02rem solid #f8f8f8;
  .city {
    float: left;
    width: 56.25 * 2/100 + rem;
    height: 44 * 2/100 + rem;
    margin-left: 0.3rem;
    text-align: center;
    line-height: 0.88rem;
  }
  .title {
    float: left;
    width: 232.5 * 2/100 + rem;
    height: 44 * 2/100 + rem;
    font-size: 0.34rem;
    color: #191a1b;
    text-align: center;
    line-height: 0.88rem;
  }
}
ul{
        list-style: none;
        width: 100%;
        margin:0;
        padding: 0;
        overflow: hidden;
        background: #fff
}
li{
    width:100%;
    float: left;
    padding:0.3rem;
    border-bottom: 0.02rem solid #f8f8f8;
    }
    a{
        display: block;
        text-decoration: none;
        width: 100%;
        // height: 1.8rem;
        
    }
    .pic{
        width: 1.32rem;
        height: 1.8rem;
        float:left;
    }
    .pic img{
        width: 1.32rem;
        height:1.8rem;
        
    }
    .details{
        font-size: 0.26rem;
        color:#797d82;
        font-weight: 100;
        float:left;
        text-align: left;
        width: 4.2rem;
        margin-left: 0.3rem
    }
    .details div{
        margin-top:0.12rem;
    }
    .details .top p{
        display:inline-block;
        font-weight: 600;
        color:#000;
    }
    .details  .top span{
font-size: 0.18rem;
    color: #fff;
    background-color: #d2d6dc;
    height:0.28rem;
    line-height: 0.28rem;
    padding: 0 0.04rem;
    border-radius: 0.04rem;
    margin-left:0.1rem;
    }
    .details .middle{
        width:100%;
        height:0.34rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .details .center :nth-child(2){
        color:#ffb232;
        margin-left:0.1rem;
        font-size:0.28rem;
        font-weight: 100;
    }
    .buy{
        float:left;
        line-height: 0.5rem;
        height: 0.5rem;
        width: 1rem;
        color: #ff5f16;
        font-size: 0.26rem;
        text-align: center;
        border-radius: 0.04rem;
        border:0.02rem solid #ff5f16;
        border-radius: 0.08rem;
        margin-top: 0.63rem;
    }
    a{
      margin: auto;
      display: block;
      height: 0.98rem;
      width: 1.2rem ;
    }
  a.router-link-exact-active{
      
      display: block;
      color:#ff5f16;
      border-bottom: 0.02rem solid #ff5f16
    }
    .nav {
  display: flex;
  height: 0.98rem;
  border-bottom: 0.02rem solid #f8f8f8;
    h2 {
    flex: 1;
    color: #191a1b;
    font-size: 0.28rem;
    line-height: 0.98rem;
    text-align: center;
    cursor: pointer;
  }
}
</style>
