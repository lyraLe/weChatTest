// components/idot/idot.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
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
    onTap(event) {
      const detail = this.properties.item;
      // 自定义事件
      this.triggerEvent("myEvent", detail);
    }
  }
})
