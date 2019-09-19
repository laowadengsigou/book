// pages/ranking/ranking.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    books:[],
    item:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   console.log(options)
   this.setData({id:options.item})//在logs路由里面传过来的值用id接收
   wx.setNavigationBarTitle({
     title: options.title, //在logs路由里面传过来的值用title接收
   })
  //  console.log(this.data.id)
    app.globalData.fly.get(`/ranking/${this.data.id}`).then(res => {//排名详情的接口
      this.setData({
        books:res.data.ranking.books
      })
      console.log(res.data.ranking.books)
    }).catch(e=>{
      console.log(e)
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  click(e){//点击书籍跳转到书籍详情
    console.log(e.currentTarget.dataset.item)
    this.setData({
      item: e.currentTarget.dataset.item//定义一个名为item的变量来存储e.currentTarget.dataset.item里面的值
    })
    wx.navigateTo({
      url: `../xiang/xiang?item=${JSON.stringify(this.data.item)}`//把整个item的值传到书籍详情的页面
    })
  }
})