//app.js
const Fly = require("./lib/fly/wx.js")
const fly = new Fly
fly.config.baseURL = "https://api.zhuishushenqi.com"
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null,
    fly: fly
  }
})