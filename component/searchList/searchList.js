// component/searchList/searchList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    books:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(e){
      console.log(e)
      wx.navigateTo({
        url: `../../pages/xiang/xiang?item=${JSON.stringify(e.currentTarget.dataset.item)}`//把整个item的值传到书籍详情的页面
      })
    }
  }
})
