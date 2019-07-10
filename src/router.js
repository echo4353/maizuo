import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Shop from './views/Shop.vue'
import List from './components/List.vue'
import My from './views/My.vue'
import Film from './views/Index.vue'
import Cinema from './views/Cinema.vue'
import City from './components/city.vue'
import Detail from './components/detail.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:{name:"home"}
    },
    {
      path:'/detail/:id',
       name:'detail',
       component:Detail,
    },
    {
       path:'/home',
       name:'home',
       component:Home,
       redirect:{'name':'film'},
       children:[
          {
            path:'/home/film',
            name:'film',
            component:Film,
            redirect:{'name':'filmlist'},
            children:[
              {
                path:"/home/film/:type?",
                name:'filmlist',
                component:List
              }
            ]
          },
          {
            path:'/home/cinema',
            name:'cinema',
            component:Cinema
          },
          {
             path:'/home/shop',
            name:'shop',
            component:Shop
          },
          {
             path:'/home/my',
            name:'my',
            component:My
          }
       ]
    },
    {
      path:'/city',
      name:'city',
      component:City
    }
  
  ]
})
