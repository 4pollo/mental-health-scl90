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
    dimensionEvaluations: []
  },

  // 测试函数 - 用于调试
  testEvaluationClasses: function() {
    console.log('Testing evaluation classes:');
    console.log('normal:', this.getEvaluationColorClass('normal'), this.getEvaluationBgClass('normal'));
    console.log('mild:', this.getEvaluationColorClass('mild'), this.getEvaluationBgClass('mild'));
    console.log('moderate:', this.getEvaluationColorClass('moderate'), this.getEvaluationBgClass('moderate'));
    console.log('severe:', this.getEvaluationColorClass('severe'), this.getEvaluationBgClass('severe'));
  },

  onLoad: function (options) {
    this.calculateResults();
  },

  // 计算测试结果
  calculateResults: function() {
    const app = getApp();
    const answers = app.globalData.testResults;
    
    console.log('calculateResults called with answers:', answers);
    
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
    console.log('dimensionScores:', dimensionScores);
    
    // 获取心理健康水平
    const mentalHealthLevel = getMentalHealthLevel(totalScore);
    
    // 获取各维度评价
    const dimensionEvaluations = getDimensionEvaluations(dimensionScores);
    console.log('dimensionEvaluations:', dimensionEvaluations);
    
    this.setData({
      totalScore: totalScore,
      mentalHealthLevel: mentalHealthLevel,
      dimensionEvaluations: dimensionEvaluations
    });
    
    console.log('setData completed with dimensionEvaluations:', dimensionEvaluations);
  },

  // 重新测试
  restartTest: function() {
    wx.redirectTo({
      url: '/pages/test/test'
    });
  },

  // 分享给朋友
  shareToFriends: function() {
    wx.showModal({
      title: '提示',
      content: '点击右上角菜单选择分享给朋友',
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  // 保存结果
  saveResult: function() {
    wx.showModal({
      title: '保存结果',
      content: '请使用手机的截图功能保存当前页面。截图时建议包含整个结果卡片区域。',
      showCancel: true,
      confirmText: '知道了',
      cancelText: '稍后截图',
      success: function(res) {
        if (res.confirm) {
          // 可以添加进一步的引导说明
          wx.showToast({
            title: '可以开始截图了',
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
  }
})