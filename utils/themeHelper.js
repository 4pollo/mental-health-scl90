// 主题助手函数
// 提供在小程序中使用主题颜色的便捷方法

/**
 * 获取当前主题的背景色类
 * @param {string} type - 背景类型 (primary, secondary, tertiary, quaternary, dark)
 * @returns {string} WXSS类名
 */
function getBackgroundClass(type) {
  const classMap = {
    primary: 'bg-white',      // 白色
    secondary: 'bg-gray-100', // 浅灰色
    tertiary: 'bg-gray-200',  // 中等浅灰色
    quaternary: 'bg-gray-300',// 中等灰色
    dark: 'bg-black'          // 黑色
  };
  return classMap[type] || classMap.primary;
}

/**
 * 获取当前主题的文字色类
 * @param {string} type - 文字类型 (primary, secondary, white, white90)
 * @returns {string} WXSS类名
 */
function getTextClass(type) {
  const classMap = {
    primary: 'text-black',     // 黑色
    secondary: 'text-gray-500',// 中等灰色
    white: 'text-white',       // 白色
    white90: 'text-white-90'   // 90%透明度白色
  };
  return classMap[type] || classMap.primary;
}

/**
 * 获取当前主题的边框色类
 * @param {string} type - 边框类型 (primary, secondary, tertiary, quaternary)
 * @returns {string} WXSS类名
 */
function getBorderClass(type) {
  const classMap = {
    primary: 'border-black',   // 黑色边框
    secondary: 'border-gray-300',// 中等灰色边框
    tertiary: 'border-gray-200',// 中等浅灰色边框
    quaternary: 'border-gray-100'// 浅灰色边框
  };
  return classMap[type] || classMap.primary;
}

/**
 * 获取当前主题的悬停效果类
 * @param {string} type - 悬停类型 (background, border)
 * @returns {string} WXSS类名
 */
function getHoverClass(type) {
  const classMap = {
    background: 'hover-bg-black', // 黑色背景悬停
    border: 'hover-border-black'  // 黑色边框悬停
  };
  return classMap[type] || classMap.background;
}

/**
 * 获取特殊颜色类（用于结果页面等）
 * @param {string} type - 特殊颜色类型 (success, warning, danger, info)
 * @returns {string} WXSS类名
 */
function getSpecialColorClass(type) {
  // 在黑白灰主题中，所有特殊颜色都使用黑色
  return 'text-black';
}

module.exports = {
  getBackgroundClass,
  getTextClass,
  getBorderClass,
  getHoverClass,
  getSpecialColorClass
};