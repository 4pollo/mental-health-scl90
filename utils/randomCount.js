// 随机计数模块

/**
 * 生成1000-5000之间的随机数并格式化为千分位
 * @returns {string} 格式化后的随机数字符串
 */
function generateRandomCount() {
  // 生成1000-5000之间的随机数
  const randomCount = generateRandomCountInRange(1000, 5000);
  // 格式化为千分位
  const formattedCount = parseInt(randomCount).toLocaleString();
  return formattedCount;
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
 * 生成递增的随机计数（根据本地存储的值决定生成逻辑）
 * @returns {string} 格式化后的递增随机数字符串
 */
function generateIncrementalRandomCount() {
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
  const formattedCount = newCount.toLocaleString();
  return formattedCount;
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
  resetIncrementalRandomCount
};