// 随机测试模块

/**
 * 生成更合理的随机答案，使结果分布在各个级别
 * @returns {Array} 随机答案数组
 */
function generateRandomAnswers() {
  // 随机选择一个心理健康水平
  const levels = [
    { name: 'normal', minTotal: 90, maxTotal: 159, min: 1, max: 2 },     // 正常范围 (总分90-159)
    { name: 'mild', minTotal: 160, maxTotal: 224, min: 1, max: 3 },      // 轻度异常 (总分160-224)
    { name: 'moderate', minTotal: 225, maxTotal: 314, min: 2, max: 4 },  // 中度异常 (总分225-314)
    { name: 'severe', minTotal: 315, maxTotal: 450, min: 3, max: 5 }     // 重度异常 (总分315-450)
  ];
  
  // 随机选择一个级别
  const randomIndex = Math.floor(Math.random() * levels.length);
  const selectedLevel = levels[randomIndex];
  
  // 生成符合该级别总分范围的随机答案
  let answers = [];
  let total = 0;
  
  // 先为所有题目生成该级别范围内的随机数
  for (let i = 0; i < 90; i++) {
    const answer = Math.floor(Math.random() * (selectedLevel.max - selectedLevel.min + 1)) + selectedLevel.min;
    answers.push(answer);
    total += answer;
  }
  
  // 调整总分到目标范围内
  const targetMin = selectedLevel.minTotal;
  const targetMax = selectedLevel.maxTotal;
  
  if (total < targetMin) {
    // 如果总分太低，随机增加一些分数
    let diff = targetMin - total;
    while (diff > 0) {
      const index = Math.floor(Math.random() * 90);
      if (answers[index] < 5) {
        const increment = Math.min(5 - answers[index], diff);
        answers[index] += increment;
        diff -= increment;
      }
    }
  } else if (total > targetMax) {
    // 如果总分太高，随机减少一些分数
    let diff = total - targetMax;
    while (diff > 0) {
      const index = Math.floor(Math.random() * 90);
      if (answers[index] > 1) {
        const decrement = Math.min(answers[index] - 1, diff);
        answers[index] -= decrement;
        diff -= decrement;
      }
    }
  }
  
  return answers;
}

module.exports = {
  generateRandomAnswers
};