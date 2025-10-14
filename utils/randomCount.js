// 随机计数模块

/**
 * 格式化数字为千分位字符串
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
function formatNumber(num) {
  // 确保输入是数字
  num = Number(num);
  if (isNaN(num)) {
    return '0';
  }
  
  // 使用字符串操作实现千分位格式化，确保在所有平台上一致
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

/**
 * 生成1000-5000之间的随机数并格式化为千分位
 * @returns {string} 格式化后的随机数字符串
 */
function generateRandomCount() {
  // 生成1000-5000之间的随机数
  const randomCount = generateRandomCountInRange(1000, 5000);
  // 格式化为千分位
  return formatNumber(randomCount);
}

/**
 * 生成指定范围内的随机数（不进行千分位格式化，用于内部调用）
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 随机数
 */
function generateRandomCountInRange(min, max) {
  // 生成指定范围内的随机数
  const randomCount = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomCount;
}

/**
 * 检查是否需要重置计数（每日清空）
 * @returns {boolean} 是否需要重置
 */
function shouldResetCount() {
  // 获取今天日期字符串 (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];
  // 从本地存储获取上次计数日期
  const lastCountDate = wx.getStorageSync('lastCountDate');
  
  // 如果日期不匹配，说明需要重置
  return lastCountDate !== today;
}

/**
 * 重置每日计数
 */
function resetDailyCount() {
  // 清空计数
  wx.removeStorageSync('incrementalRandomCount');
  // 更新日期记录
  const today = new Date().toISOString().split('T')[0];
  wx.setStorageSync('lastCountDate', today);
}

/**
 * 生成递增的随机计数（根据本地存储的值决定生成逻辑）
 * 每日自动清空计数
 * @returns {string} 格式化后的递增随机数字符串
 */
function generateIncrementalRandomCount() {
  // 检查是否需要重置计数
  if (shouldResetCount()) {
    resetDailyCount();
  }
  
  // 从本地存储获取当前计数
  let currentCount = wx.getStorageSync('incrementalRandomCount') || 0;
  
  let newCount;
  if (currentCount < 100) {
    // 如果当前计数小于100，生成1000~3000的随机数
    newCount = generateRandomCountInRange(1000, 3000);
  } else {
    // 如果当前计数大于等于100，生成100~200的随机数，再与本地存储的计数相加
    const randomIncrement = generateRandomCountInRange(100, 200);
    newCount = currentCount + randomIncrement;
  }
  
  // 保存到本地存储
  wx.setStorageSync('incrementalRandomCount', newCount);
  
  // 格式化为千分位
  return formatNumber(newCount);
}

/**
 * 重置递增随机计数
 */
function resetIncrementalRandomCount() {
  wx.removeStorageSync('incrementalRandomCount');
}

module.exports = {
  generateRandomCount,
  generateRandomCountInRange,
  generateIncrementalRandomCount,
  resetIncrementalRandomCount,
  formatNumber
};