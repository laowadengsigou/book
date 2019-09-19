const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //接受加入到书架中的数据
    bookShelf:[],//存在Storage里面的书
    flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookShelf: wx.getStorageSync("arry")//定义一个变量bookShelf来等于arry里面存储的值
    })
    console.log(this.data.bookShelf)
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
    this.setData({
      bookShelf: wx.getStorageSync("arry")
    })
    console.log(this.data.bookShelf)
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
  flag(){
    this.setData({
      flag: !this.data.flag
    })
  },
  dele(e){
    console.log(e.target.dataset.index)
    this.data.bookShelf.splice(e.target.dataset.index,1)
    this.setData({
      bookShelf: this.data.bookShelf
    })
    wx.setStorageSync("arry", this.data.bookShelf)
  },
  reading(e){
    console.log(e)
    let read = e.currentTarget.dataset
    wx.navigateTo({
      url: `../read/read?item=${JSON.stringify(read)}`,
    })
  }
})

