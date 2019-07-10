<template>
	<div>
      <div>
          <img :src="filmn.poster" class="imgfilm" />
		   	<p @click="go" class="iconfont icon-zuojiantou">  </p>
      </div>
      <!-- {{filmn.name}} -->
         <div class="details">
            <!-- <div class="top"><p>{{filmn.name}}</p> -->
            </div>
            <div class="center"><span>观众评分</span><span>{{filmn.grade}}</span></div>
            <div class="middle"><span>主演：</span>
            <span v-for="item2 in filmn.actors" :key="item2.id">{{item2.name}}</span>
            </div>
            <div class="bottom"><span>{{filmn.nation}} | {{filmn.runtime}} 分钟</span></div>
             
        </div>
    </div>
</template>
<script>
export default {
	 data(){
	 	return {
	 		filmn:{}
	 	}
	 },
	 created(){
	 	this.$axios.get("/mz/gateway",{
	 		params:{
	 			filmId:this.$route.params.id,
	 			k:Date.now()
	 		},
	 		headers:{
	 			"X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"154399058310458245367575"}`,
				"X-Host": "mall.film-ticket.film.info"
	 		}
	 	}).then((res)=>{
       this.filmn = res.data.data.film
       console.log(res.data.data.film)
	 	})
	 },
	 methods:{
	 	go(){
	 		this.$router.go(-1);
	 	}
	 }
}
</script>
<style scoped>
	p{
		background: #ccc;
		opacity: 0.7;
		border-radius: 50%;
		width: 0.5rem;
		height: 0.5rem;
		text-align: center;
		line-height: 0.5rem;
		z-index:5;
		position: fixed;
		top:0.3rem;
		left:0.1rem;
	}
	.imgfilm{
		width:100%;
	}
  .film-detail{
        padding: 15*2/100+rem;
        padding-top: 12*2/100+rem;
        background-color: #fff;
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
</style>
