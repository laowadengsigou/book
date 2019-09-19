// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotwords:[],//搜索热词
    itemObj:[],//截取的6位热词
    colors:[
      {
        color: "#AAAAAA"
      },
      {
        color: "#FF44AA "
      },
      {
        color: "#FF0000 "
      },
      {
        color: "#00DDAA"
      },
      {
        color: "#0066FF "
      },
      {
        color: "#FF3EFF "
      }
    ],
    flag:false,
    value:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.fly.get('/book/hot-word').then(res=>{
      this.setData({
        hotwords: res.data.hotWords
      })
      console.log(res.data.hotWords)
      let testArray = res.data.newHotWords;
      if (!Array.prototype.derangedArray) {
        Array.prototype.derangedArray = function () {
          for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
          return this;
        }; //随机截取
      }
      this.setData({
        itemObj: this.data.hotwords.slice(0, 6) //截取6位数据付给item
      })

      console.log(this.data.itemObj)
    }).catch(e=>[
      console.log(e)
    ])
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
  click(){
    let testArray = this.data.hotwords;
      if (!Array.prototype.derangedArray) {
        Array.prototype.derangedArray = function () {
          for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
          return this;
        }; //随机截取
      }
    console.log(testArray.derangedArray())
      this.setData({
        itemObj: this.data.hotwords.slice(0, 6) //截取6位数据付给item
      })
    console.log(this.data.itemObj)
  },
  bookSearch(){
    app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${this.data.value}`).then(res=>{
      this.setData({
        books: res.data.books
      })
      console.log(res)
    }).catch(e=>{
      console.log(e)
    })
  },
  ju(){
    this.setData({
      flag:true
    })
  },
  onCancel(){
    this.setData({
      flag:false
    })
  },
  change(e){
    this.setData({
      value: e.detail
    })
    console.log(this.data.value)
    this.bookSearch()
  }
})