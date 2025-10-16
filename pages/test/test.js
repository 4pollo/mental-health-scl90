import { scl90Questions } from '../../utils/scl90-data.js'
const icons = require('../../utils/icons.js');
const { getCurrentThemeColors } = require('../../utils/colorConfig.js');

Page({
  data: {
    icons: icons,
    currentQuestion: 1,
    progress: 0,
    question: '',
    options: [
      { value: '1', label: '没有', checked: false },
      { value: '2', label: '很轻', checked: false },
      { value: '3', label: '中等', checked: false },
      { value: '4', label: '偏重', checked: false },
      { value: '5', label: '严重', checked: false }
    ],
    selectedValue: '',
    answers: new Array(90).fill(0), // 存储用户答案，初始化为0
    radioCheckedColor: '#000000', // 默认黑色
    isProcessing: false // 防重复点击标志
  },

  onLoad: function (options) {
    // 重置测试数据
    this.resetTestData();
    
    // 获取当前主题颜色
    const themeColors = getCurrentThemeColors();
    this.setData({
      radioCheckedColor: themeColors.radioCheckedColor
    });
    
    this.loadQuestion();
  },

  // 重置测试数据
  resetTestData: function() {
    // 重置当前题目
    // 重置答案数组
    const resetAnswers = new Array(90).fill(0);
    // 重置选项状态
    const resetOptions = this.data.options.map(option => {
      return {
        ...option,
        checked: false
      };
    });
    
    this.setData({
      currentQuestion: 1,
      progress: 0,
      selectedValue: '',
      answers: resetAnswers,
      options: resetOptions,
      isProcessing: false
    });
  },

  // 加载当前题目
  loadQuestion: function() {
    const currentQuestion = this.data.currentQuestion;
    this.setData({
      question: scl90Questions[currentQuestion - 1],
      progress: Math.round((currentQuestion / 90) * 100)
    });
    
    // 恢复已选答案
    const savedAnswer = this.data.answers[currentQuestion - 1];
    if (savedAnswer > 0) {
      this.updateOptions(savedAnswer.toString());
    } else {
      this.updateOptions('');
    }
  },

  // 更新选项状态
  updateOptions: function(selectedValue) {
    const options = this.data.options.map(option => {
      return {
        ...option,
        checked: option.value === selectedValue
      };
    });
    
    this.setData({
      options: options,
      selectedValue: selectedValue
    });
  },

  // label点击事件 - 处理选项选择
  onLabelTap: function(e) {
    // 防重复点击校验
    if (this.data.isProcessing) {
      return;
    }
    
    const selectedValue = e.currentTarget.dataset.value;
    
    // 设置处理状态，防止重复点击
    this.setData({
      isProcessing: true
    });
    
    // 更新选项状态
    this.updateOptions(selectedValue);
    
    // 保存答案
    const answers = this.data.answers;
    answers[this.data.currentQuestion - 1] = parseInt(selectedValue);
    this.setData({
      answers: answers
    });
    
    // 无论点击哪个选项都跳转到下一题（如果不是最后一题）
    if (this.data.currentQuestion < 90) {
      // 延迟一小段时间再跳转，确保用户能看到选择反馈
      setTimeout(() => {
        this.setData({
          currentQuestion: this.data.currentQuestion + 1
        });
        this.loadQuestion();
        // 重置处理状态
        this.setData({
          isProcessing: false
        });
      }, 300);
    } else {
      // 重置处理状态
      this.setData({
        isProcessing: false
      });
    }
  },

  // 上一题
  prevQuestion: function() {
    // 防重复点击校验
    if (this.data.isProcessing) {
      return;
    }
    
    if (this.data.currentQuestion > 1) {
      // 设置处理状态，防止重复点击
      this.setData({
        isProcessing: true
      });
      
      this.setData({
        currentQuestion: this.data.currentQuestion - 1
      });
      this.loadQuestion();
      
      // 重置处理状态
      this.setData({
        isProcessing: false
      });
    }
  },

  // 下一题（现在主要用于手动跳转）
  nextQuestion: function() {
    // 防重复点击校验
    if (this.data.isProcessing) {
      return;
    }
    
    if (this.data.selectedValue && this.data.currentQuestion < 90) {
      // 设置处理状态，防止重复点击
      this.setData({
        isProcessing: true
      });
      
      this.setData({
        currentQuestion: this.data.currentQuestion + 1
      });
      this.loadQuestion();
      
      // 重置处理状态
      this.setData({
        isProcessing: false
      });
    }
  },

  // 提交测试
  submitTest: function() {
    // 防重复点击校验
    if (this.data.isProcessing) {
      return;
    }
    
    // 设置处理状态，防止重复点击
    this.setData({
      isProcessing: true
    });
    
    // 检查是否所有题目都已回答
    const unanswered = this.data.answers.filter(answer => answer === 0);
    
    if (unanswered.length > 0) {
      wx.showModal({
        title: '提示',
        content: `您还有${unanswered.length}题未回答，确定要提交吗？`,
        success: (res) => {
          if (res.confirm) {
            this.goToResult();
          }
          // 重置处理状态
          this.setData({
            isProcessing: false
          });
        }
      });
    } else {
      this.goToResult();
      // 重置处理状态
      this.setData({
        isProcessing: false
      });
    }
  },

  // 跳转到结果页面
  goToResult: function() {
    // 将答案存储到全局数据中
    const app = getApp();
    app.globalData.testResults = this.data.answers;
    
    wx.navigateTo({
      url: '/pages/result/result'
    });
  },

  // 小程序原生分享功能
  onShareAppMessage: function() {
    return {
      title: 'SCL-90心理健康测评',
      path: '/pages/test/test',
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