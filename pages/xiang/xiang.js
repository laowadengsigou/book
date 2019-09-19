// pages/xiang/xiang.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    name: "",
    list: {},
    active: 0,
    docs: [],
    books: [],
    item: [],
    pass:[],
    //页面加载时，用来存储wx.storage中加入过书架的书籍
    joinedData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let item = JSON.parse(options.item)
    this.setData({
      id: item._id,
      name: item.title,
    })
    if (wx.getStorageSync("arry")){
      this.setData({
        joinedData: wx.getStorageSync("arry")
      })
    }
    console.log(this.data.joinedData)
    console.log(this.data.pass)
    wx.setNavigationBarTitle({
      title: this.data.name,
    })
    console.log(this.data.id)
    app.globalData.fly.get("/book/" + this.data.id).then(res => {
      this.setData({
        list: res.data
      })
      console.log(res.data)
    })
    app.globalData.fly.get(`/post/short-review?book=${this.data.id}&total=true&sortType=newest`).then(res => {
      this.setData({
        docs: res.data.docs
      })
      console.log(res.data.docs)
    }).catch(e => {
      console.log(e)
    })
    app.globalData.fly.get(`/book/${this.data.id}/recommend`).then(res => { //相关书籍接口
      this.setData({
        books: res.data.books
      })
      let testArray = res.data.newHotWords;
      if (!Array.prototype.derangedArray) {
        Array.prototype.derangedArray = function() {
          for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
          return this;
        }; //随机截取
      }
      console.log(res.data.books)
      this.setData({
        item: res.data.books.slice(0, 3) //截取三位数据付给item
      })
      console.log(this.data.item)
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
  click() {
    let testArray = this.data.books;
    if (!Array.prototype.derangedArray) {
      Array.prototype.derangedArray = function() {
        for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
      }; //随机截取
    }
    console.log(testArray.derangedArray()); //结果不唯一
    this.setData({
      item: this.data.books.slice(0, 3) //随机截取付给item
    })
    console.log(this.data.item)
  },
  read(e) {
    console.log(e)
    let read = e.currentTarget.dataset
    wx.navigateTo({
      url: `../read/read?item=${JSON.stringify(read)}`,
    })
  },
  goto(e) {

    console.log(e.currentTarget.dataset.item)
    this.setData({
      pass: e.currentTarget.dataset.item
    })
    if (JSON.stringify(this.data.joinedData).indexOf(this.data.pass._id) === -1){
      // this.setData({
      //   pass: e.currentTarget.dataset.item
      // })
      // let arr = wx.getStorageSync("arry")
      // arr.push(this.data.pass)
      // wx.setStorageSync("arry", arr)
      this.data.joinedData.push(this.data.pass)
      wx.setStorageSync("arry", this.data.joinedData)
      wx.showToast({
        title: '加入书架成功',
      })
      // this.setData({
      //   joinedData: wx.getStorageSync("arry")
      // })
    } else if (JSON.stringify(this.data.joinedData).indexOf(this.data.pass._id) !== -1){
       wx.showToast({
         title: '该书已经加入过书架',
         icon: 'none'
       })    }
    
    
  }
})