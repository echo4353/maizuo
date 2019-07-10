<template>
  <div>
    <h1>影院</h1>
    <p class="mydl">
      我的段落
      <a href="#">aaa</a>
      <span>
        asdf
        <a href="#">aaa</a>
      </span>

    </p>
    <mt-button type="primary" @click="show">primary</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  methods:{
    show(){
        Toast({
  // message: '可可',
  position: 'middle',
   iconClass: 'fa fa-spinner fa-spin',
  duration: 2000
});
    }
  }
}
</script>
<style lang="scss">
@mixin yj($r: 20px) {
  border-radius: $r;
}
$a: red;
.bold {
  font-weight: 600;
}
.mydl {
  background: $a;
  width: 80 * 2/100 + rem;
  height: 2rem;
  @include yj(30px);
  @extend .bold;
  & > a {
    color: yellow;
  }
  span {
    color: blue;
  }
}
</style>