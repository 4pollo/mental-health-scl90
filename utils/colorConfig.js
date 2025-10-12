// 颜色配置文件
// 支持多套配色方案，便于主题切换

const colorConfig = {
  // 默认黑白灰配色方案
  default: {
    radioCheckedColor: '#000000', // 黑色
    primary: '#000000', // 黑色
    secondary: '#666666', // 中等灰色
    background: '#ffffff', // 白色
    lightBackground: '#f5f5f5', // 浅灰色
    border: '#cccccc', // 中等灰色边框
    lightBorder: '#e0e0e0' // 中等浅灰色边框
  },
  
  // 可以添加其他配色方案
  // 例如：绿色主题
  green: {
    radioCheckedColor: '#4b7b5a', // 原来的绿色
    primary: '#4b7b5a',
    secondary: '#666666',
    background: '#ffffff',
    lightBackground: '#f5f5f5',
    border: '#cccccc',
    lightBorder: '#e0e0e0'
  }
};

// 获取当前主题的颜色配置
function getCurrentThemeColors() {
  // 默认使用default主题
  // 后期可以通过全局变量或存储来切换主题
  const currentTheme = 'default'; // 这里可以动态设置
  return colorConfig[currentTheme] || colorConfig.default;
}

module.exports = {
  colorConfig,
  getCurrentThemeColors
};
