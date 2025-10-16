import { scl90Dimensions } from '../../utils/scl90-data.js'
import { 
  calculateDimensionScores, 
  calculateTotalScore, 
  getMentalHealthLevel, 
  getDimensionEvaluations 
} from '../../utils/calculator.js'
const icons = require('../../utils/icons.js');

Page({
  data: {
    icons: icons,
    totalScore: 0,
    mentalHealthLevel: {},
    dimensionEvaluations: [],
    displayMode: 'list' // 修改默认显示模式为列表模式
  },

  onLoad: function (options) {
    this.calculateResults();
  },

  // 计算测试结果
  calculateResults: function() {
    const app = getApp();
    const answers = app.globalData.testResults;
    
    if (!answers || answers.length !== 90) {
      wx.showToast({
        title: '数据错误',
        icon: 'error'
      });
      return;
    }
    
    // 计算总分
    const totalScore = calculateTotalScore(answers);
    
    // 计算各维度得分
    const dimensionScores = calculateDimensionScores(answers, scl90Dimensions);
    
    // 获取心理健康水平
    const mentalHealthLevel = getMentalHealthLevel(totalScore);
    
    // 获取各维度评价
    const dimensionEvaluations = getDimensionEvaluations(dimensionScores);
    
    this.setData({
      totalScore: totalScore,
      mentalHealthLevel: mentalHealthLevel,
      dimensionEvaluations: dimensionEvaluations
    });
  },

  // 切换显示模式 (恢复原始实现)
  switchDisplayMode: function(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({
      displayMode: mode
    });
  },

  // 重新测试
  restartTest: function() {
    // 清除全局数据
    const app = getApp();
    app.globalData.testResults = null;
    
    // 使用reLaunch彻底重启并跳转到测试页面，确保所有页面都被销毁
    wx.reLaunch({
      url: '/pages/test/test'
    });
  },

  // 分享给朋友
  shareToFriends: function() {
    // 由于使用了open-type="share"，这个函数可以保持空实现或者用于其他逻辑
    // 原生分享功能会自动调用onShareAppMessage
  },

  // 保存结果
  saveResult: function() {
    wx.showModal({
      title: '保存结果',
      content: '表格模式更适合截图保存，是否切换到表格模式？',
      showCancel: true,
      confirmText: '切换表格',
      cancelText: '保持当前',
      success: (res) => {
        if (res.confirm) {
          // 切换到表格模式
          this.setData({
            displayMode: 'table'
          });
          wx.showToast({
            title: '已切换到表格模式，现在可以截图了',
            icon: 'none'
          });
        } else if (res.cancel) {
          // 保持当前模式，但仍提示如何截图
          wx.showToast({
            title: '请使用手机的截图功能保存当前页面',
            icon: 'none'
          });
        }
      }
    });
  },

  // 显示心理健康水平描述
  showMentalHealthDescription: function() {
    wx.showModal({
      title: this.data.mentalHealthLevel.level,
      content: this.data.mentalHealthLevel.description,
      showCancel: false,
      confirmText: '知道了'
    });
  },

  // 获取总分颜色类名
  getScoreColorClass: function(score) {
    if (score < 160) {
      return 'text-success'; // 绿色
    } else if (score < 225) {
      return 'text-warning'; // 橙色
    } else if (score < 315) {
      return 'text-danger'; // 红色
    } else {
      return 'text-danger'; // 深红色
    }
  },
  
  // 获取总分背景颜色
  getScoreBgColor: function(score) {
    if (score < 160) {
      return '#e8f1ec'; // 主色调的浅色版本
    } else if (score < 225) {
      return '#ffb74d'; // 温和的橙色
    } else if (score < 315) {
      return '#e57373'; // 温和的红色
    } else {
      return '#d32f2f'; // 深红色
    }
  },

  // 小程序原生分享功能
  onShareAppMessage: function() {
    return {
      title: 'SCL-90心理健康测评',
      path: '/pages/index/index',
      imageUrl: '' // 可以设置分享图片
    }
  },

  // 朋友圈分享
  onShareTimeline: function() {
    return {
      title: 'SCL-90心理健康测评',
      query: '',
      imageUrl: '' // 可以设置分享图片
    }
  }
})