import axios from 'axios';
import { Indicator } from 'mint-ui';
axios.interceptors.request.use((config)=>{
  Indicator.open({
    text: '定位中...',
    spinnerType: 'fading-circle'
  });
  return config;
})
axios.interceptors.response.use((res)=>{
  Indicator.close({
    text: '定位中...',
    spinnerType: 'fading-circle'
  });
  return res;
})