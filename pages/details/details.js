// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mins: [],
    active:0,
    actives:0,
    list:[
      {
        id:'hot',
        name:'热门'
      },
      {
        id:'new',
        name:'新书'
      },
      {
        id:'reputation',
        name:'好评'
      },
      {
        id:'over',
        name:'完结'
      },
      {
        id:'monthly',
        name:'VIP'
      }
    ],
    names:"",//大类
    books:[],
    type:"",
    index:'',//type
    indexs:''//小类的index
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      names: JSON.parse(options.item).item.name,//大类
      type: JSON.parse(options.item).type//性别排行
    })
    console.log(this.data.type)//打印性别
    let detail = JSON.parse(options.item)//把item定义在detail中
    let type = detail.type//type是性别
      wx.setNavigationBarTitle({
        title: JSON.parse(options.item).item.name,
      })
      app.globalData.fly.get('/cats/lv2').then(response => {
        let res = response.data
        console.log(res)//男生女生所有数据
        let arr = res[type]//男生的所有类别
        console.log(arr)
        arr.map(item => {
          if (item.major === detail.item.name) {
            item.mins.unshift("全部")
            this.setData({
              mins: item.mins,
            })
          }
        })
      })
    console.log(options.type)
    console.log(this.data.list[0].id)
    console.log(this.data.names)
    let id = this.data.list[0].id
    app.globalData.fly.get("book/by-categories",{
      gender: options.type,
      type:id,
      major:this.data.names,
      start:0,
      limit:20
    }).then(res=>{
      this.setData({
        books:res.data.books
      })
      console.log(res.data.books)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  click(e){
    console.log(e)
    console.log(e)
   this.setData({
     index: e.detail.index
   })
    let id = this.data.list[this.data.index].id
    app.globalData.fly.get("book/by-categories", {
      gender: this.data.type,
      type: id,
      major: this.data.names,
      start: 0,
      limit: 20
    }).then(res => {
      this.setData({
        books: res.data.books
      })
      console.log(res.data.books)
    })
  },
click1(e){
  this.setData({
    indexs: e.detail.index
  })
  let id = this.data.list[this.data.index].id
if(this.data.indexs > 0){
  app.globalData.fly.get("book/by-categories", {
    gender: this.data.type,
    type:id,
    major: this.data.names,
    minor:this.data.mins[this.data.indexs],
    start: 0,
    limit: 20
  }).then(res => {
    this.setData({
      books: res.data.books
    })
})
}else{
  app.globalData.fly.get("book/by-categories", {
    gender: this.data.type,
    type: this.data.list[this.data.index].id,
    major: this.data.names,
    start: 0,
    limit: 20
  }).then(res => {
    this.setData({
      books: res.data.books
    })
  })
}
},
  clicks(e) {//点击书籍跳转到书籍详情
    console.log(e.currentTarget.dataset.item)
    this.setData({
      item: e.currentTarget.dataset.item//定义一个名为item的变量来存储e.currentTarget.dataset.item里面的值
    })
    wx.navigateTo({
      url: `../xiang/xiang?item=${JSON.stringify(this.data.item)}`//把整个item的值传到书籍详情的页面
    })
  }
})