const icons = require('../../utils/icons.js');
const { generateRandomAnswers } = require('../../utils/randomTest.js');
const { generateIncrementalRandomCount, formatNumber } = require('../../utils/randomCount.js');

Page({
  data: {
    icons: icons,
    randomTestLoading: false, // 添加随机测试按钮的loading状态
    serverCount: 0 // 服务器端计数
  },

  onLoad: function (options) {
    // 页面加载时生成递增的随机计数
    const count = generateIncrementalRandomCount();
    this.setData({
      serverCount: count
    });
  },

  onShow: function() {
    // 页面显示时不再进行计数操作，只显示当前计数
    // 从本地存储获取当前计数并显示
    const currentCount = wx.getStorageSync('incrementalRandomCount') || 0;
    this.setData({
      serverCount: formatNumber(currentCount)
    });
  },

  startTest: function() {
    // 直接跳转到测试页面
    wx.navigateTo({
      url: '/pages/test/test'
    });
  },

  randomTest: function() {
    // 如果正在加载中，则不处理重复点击
    if (this.data.randomTestLoading) {
      return;
    }
    
    // 设置loading状态
    this.setData({
      randomTestLoading: true
    });
    
    // 生成随机测试结果
    const app = getApp();
    
    // 生成更合理的随机测试答案，使结果分布在各个级别
    const randomAnswers = generateRandomAnswers();
    
    // 将随机答案存储到全局数据中
    app.globalData.testResults = randomAnswers;
    
    // 延迟跳转以确保计数更新完成
    setTimeout(() => {
      // 跳转到结果页面
      wx.navigateTo({
        url: '/pages/result/result',
        complete: () => {
          // 无论成功还是失败，都要重置loading状态
          this.setData({
            randomTestLoading: false
          });
        }
      })
    }, 500);
  }
})