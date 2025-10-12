// 主题管理工具
const colorConfig = require('./colorConfig.js');

class ThemeManager {
  constructor() {
    this.currentTheme = colorConfig.getCurrentTheme();
  }

  // 获取当前主题
  getCurrentTheme() {
    return this.currentTheme;
  }

  // 切换主题
  switchTheme(themeName) {
    const newTheme = colorConfig.switchTheme(themeName);
    if (newTheme) {
      this.currentTheme = newTheme;
      // 可以在这里添加主题切换后的回调函数
      this.onThemeChanged && this.onThemeChanged(newTheme);
      return newTheme;
    }
    return null;
  }

  // 获取背景色
  getBackgroundColor(type) {
    return this.currentTheme.backgroundColors[type] || this.currentTheme.backgroundColors.primary;
  }

  // 获取文字颜色
  getTextColor(type) {
    return this.currentTheme.textColors[type] || this.currentTheme.textColors.primary;
  }

  // 获取边框颜色
  getBorderColor(type) {
    return this.currentTheme.borderColors[type] || this.currentTheme.borderColors.primary;
  }

  // 获取悬停颜色
  getHoverColor(type) {
    return this.currentTheme.hoverColors[type] || this.currentTheme.hoverColors.background;
  }

  // 获取特殊颜色
  getSpecialColor(type) {
    return this.currentTheme.specialColors[type] || this.currentTheme.specialColors.primary;
  }

  // 设置主题切换回调
  setThemeChangedCallback(callback) {
    this.onThemeChanged = callback;
  }
}

// 导出单例实例
module.exports = new ThemeManager();