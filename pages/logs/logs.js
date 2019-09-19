const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    list:{},
    ranking:{},
    rankid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.fly.get("/cats/lv2/statistics").then(res =>{//获取大分类的接口
      this.setData({
        list:res.data
      })
    }),

    app.globalData.fly.get("/ranking/gender").then(res =>{//排名分类的接口
      console.log(res.data)
      this.setData({
        ranking:res.data
      })
    })

    // wx:wx.getStorage({
    //   key: 'arr',
    //   success: function(res) {},
    //   fail: function(res) {
    //     let arr = []
    //     wx:wx.setStorageSync("arry", arr)
    //   },
    // })
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
  details(e){
    console.log(e)
    let item = e.target.dataset
    wx.navigateTo({
      url: `../details/details?item=${JSON.stringify(item)}&type=${item.type}`,
    })
  },
  pai(e) {//跳转排名的点击事件
    console.log(e)
    this.setData({ rankid: e.target.dataset.item._id })//把id存到rankid这个变量里面
    wx.navigateTo({
      url: `../ranking/ranking?item=${this.data.rankid}&title=${e.target.dataset.item.title}`
    })//把id和title传到ranking这个路由里面
  }
})