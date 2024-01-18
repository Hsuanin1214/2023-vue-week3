import { createApp } from "vue";
// 產品資料格式
// const products = [
//   {
//     category: "甜甜圈",
//     content: "尺寸：14x14cm",
//     description:
//       "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
//     id: "-L9tH8jxVb2Ka_DYPwng",
//     is_enabled: 1,
//     origin_price: 150,
//     price: 99,
//     title: "草莓莓果夾心圈",
//     unit: "個",
//     num: 10,
//     imageUrl:
//       "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
//     imagesUrl: [
//       "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
//       "https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
//     ],
//   },
// ];
let productModal = null;
let delProductModal = null;

createApp({
  data() {
    return {
      url: "https://ec-course-api.hexschool.io/v2",
      path: "hsuanin-vue2024",
      isNew:false,
      tempProduct:{},
      products: [],
      selectedProduct: [],
      newProduct:{
        title : '',
        category : '',
        unit : '',
        origin_price : '',
        price : '',
        description : '',
        content : '',
        is_enabled : true,
        imageUrl:''
      }
    };
  },
  methods: {
    checkLogin(params) {
      console.log(this.url);
      axios
        .post(`${this.url}/api/user/check`)
        //成功的結果
        .then((res) => {
          console.log(res);
          this.getProduct();
        })
        //失敗結果
        .catch((error) => {
          console.dir(error); //用dir可以展開資訊
          alert("未登入");
          window.location = "login.html";
        });
    },
    openModal(status,item){
      if(status === 'new'){
        this.tempProduct = {};
        this.isNew = true;
        productModal.show();
      }else if(status === 'edit'){
        this.tempProduct = {...item};
        this.isNew = false;
        productModal.show();
      }else if(status === 'delete'){
        this.tempProduct = {...item};
        this.isNew = false;
        // deleteProductModal.show();
      }
    },
    getProduct() {
      axios
        .get(`${this.url}/api/${this.path}/admin/products`)
        .then((res) => {
          console.log(res.data);
          this.products = res.data.products;
          console.log(this.products);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // console.log(token);
    axios.defaults.headers.common["Authorization"] = token;
    this.checkLogin();
    productModal = new bootstrap.Modal(document.getElementById("productModal"),{
      keyboard : false,
      backdrop:'static'
    })
  },
}).mount("#app");
