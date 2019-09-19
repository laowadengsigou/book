// pages/read/read.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    name:"",
    list:[],
    chapters:[],
    link:"",
    chapter:{},
    num:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(options.item).item
    // console.log(item)
    this.setData({
      id: item._id,
      name:item.title
    })
    wx.setNavigationBarTitle({
      title: this.data.name,
    }), 
    this.getData()
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
  getData(){
    app.globalData.fly.get(`/mix-atoc/${this.data.id}?view=chapters`).then(res => {
      this.setData({
        list: res.data.mixToc.chapters,
        chapters: res.data.mixToc.chapters[this.data.num],
        link: res.data.mixToc.chapters.link
      })
      console.log(res.data.mixToc.chapters)
      app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(this.data.chapters.link)}`).then(res => {
        this.setData({
          chapter: res.data.chapter
        })
        console.log(res)
      })
    }) 
  },
  up(){
    this.setData({
      num:this.data.num-1
    })
    if(this.data.num<0){
      wx.showToast({
        title: '已经是第一章了',
        icon:'none',
        duration:2000
      })
    }else{
      this.getData()
    }
  },
  down(){
    this.setData({
      num:this.data.num+1
    })
    // console.log(this.data.list.length)
    if (this.data.num > this.data.list.length){
      wx.showToast({
        title: '已经是最后一章了',
        icon:'none',
        duration:2000
      })
    }else{
      this.getData()
    }
  }
})