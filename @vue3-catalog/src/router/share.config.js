import {get_product_details,get_news_details} from "../api";

const sharePath = {
  route:['/'],
  share:{
    //首页
    '/':{
      per : {
        title: "",
        desc: "",
        link : "",
        imgUrl : '',
      },
      pen : {
        title: "",
        desc: "",
        link : "",
        imgUrl : '',
      }
    },
    //猜价
    '/Guest':{
      per : {
        title: "",
        desc: "",
        link : "",
        imgUrl : '',
      },
      pen : {
        title: "",
        desc: "",
        link : "",
        imgUrl : '',
      }
    },
    //分类
    '/Category':{
      per : {
        title: "",
        desc: "",
        link : "",
        imgUrl : '',
      },
      pen : {
        title: "",
        desc: "",
        link : "",
        imgUrl : '',
      }
    },
    //商品详情
    '/Product':{//需要调用接口
      per : {
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
      },
      pen : {
        title: '',
        desc: '',
        link : '',
        imgUrl : '',
      },
      getData: ( root,id,link ) => {
        return new Promise((resolve)=>{
          get_product_details({ spuProId:id }).then(function (response) {
            
            
            return resolve(true)
          })
        })
      }
    },
    //新闻
    '/News':{
      per : {
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
      },
      pen : {
        title: '',
        desc: '',
        link : '',
        imgUrl : '',
      },
      getData: ( root,url,id,link ) => {
        return new Promise((resolve)=>{
          get_news_details({ id: id, memberid: window.localStorage.userid }).then(function (response) {
            
            
            return resolve(true)
          })
        })
      }
    }
  }
}

export default sharePath