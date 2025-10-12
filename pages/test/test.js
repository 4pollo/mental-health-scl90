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
    radioCheckedColor: '#000000' // 默认黑色
  },

  onLoad: function (options) {
    // 获取当前主题颜色
    const themeColors = getCurrentThemeColors();
    this.setData({
      radioCheckedColor: themeColors.radioCheckedColor
    });
    
    this.loadQuestion();
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

  // 选项改变事件
  onOptionChange: function(e) {
    const selectedValue = e.detail.value;
    this.updateOptions(selectedValue);
    
    // 保存答案
    const answers = this.data.answers;
    answers[this.data.currentQuestion - 1] = parseInt(selectedValue);
    this.setData({
      answers: answers
    });
  },

  // 上一题
  prevQuestion: function() {
    if (this.data.currentQuestion > 1) {
      this.setData({
        currentQuestion: this.data.currentQuestion - 1
      });
      this.loadQuestion();
    }
  },

  // 下一题
  nextQuestion: function() {
    if (this.data.selectedValue && this.data.currentQuestion < 90) {
      this.setData({
        currentQuestion: this.data.currentQuestion + 1
      });
      this.loadQuestion();
    }
  },

  // 提交测试
  submitTest: function() {
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
        }
      });
    } else {
      this.goToResult();
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
  }
})