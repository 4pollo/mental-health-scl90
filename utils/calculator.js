// 计算SCL-90测试结果的工具函数

/**
 * 计算各维度得分
 * @param {Array} answers 用户答案数组，长度为90，每个元素为1-5的评分
 * @param {Array} dimensions 维度定义数组
 * @returns {Array} 各维度得分数组
 */
function calculateDimensionScores(answers, dimensions) {
  return dimensions.map(dimension => {
    const score = dimension.questions.reduce((sum, qIndex) => {
      // 题目索引从1开始，数组索引从0开始，所以需要减1
      return sum + (answers[qIndex - 1] || 0);
    }, 0);
    
    return {
      name: dimension.name,
      score: score,
      average: (score / dimension.questions.length).toFixed(2),
      maxScore: dimension.questions.length * 5  // 添加该维度的理论满分
    };
  });
}

/**
 * 计算总分
 * @param {Array} answers 用户答案数组
 * @returns {Number} 总分
 */
function calculateTotalScore(answers) {
  return answers.reduce((sum, score) => sum + score, 0);
}

/**
 * 根据总分判断心理健康水平
 * @param {Number} totalScore 总分
 * @returns {Object} 心理健康水平信息
 */
function getMentalHealthLevel(totalScore) {
  if (totalScore < 160) {
    return {
      level: "正常",
      description: "您的心理健康状况良好，继续保持积极的生活态度。",
      color: "green"
    };
  } else if (totalScore >= 160 && totalScore < 225) {
    return {
      level: "轻度",
      description: "您可能存在轻微的心理困扰，建议关注自己的情绪变化，适当放松和调节。",
      color: "orange"
    };
  } else if (totalScore >= 225 && totalScore < 315) {
    return {
      level: "中度",
      description: "您可能存在中等程度的心理问题，建议寻求专业心理咨询师的帮助。",
      color: "red"
    };
  } else {
    return {
      level: "重度",
      description: "您可能存在较严重的心理问题，强烈建议尽快寻求专业心理医生的帮助。",
      color: "darkred"
    };
  }
}

/**
 * 获取各维度的评价
 * @param {Array} dimensionScores 各维度得分数组
 * @returns {Array} 各维度评价数组
 */
function getDimensionEvaluations(dimensionScores) {
  console.log('getDimensionEvaluations called with dimensionScores:', dimensionScores);
  const results = dimensionScores.map(dimension => {
    let evaluation = "";
    let evaluationKey = ""; // 用于CSS类名匹配的英文标识符
    const averageScore = parseFloat(dimension.average);
    
    if (averageScore < 1.5) {
      evaluation = "正常范围";
      evaluationKey = "normal";
    } else if (averageScore >= 1.5 && averageScore < 2.5) {
      evaluation = "轻度异常";
      evaluationKey = "mild";
    } else if (averageScore >= 2.5 && averageScore < 3.5) {
      evaluation = "中度异常";
      evaluationKey = "moderate";
    } else {
      evaluation = "重度异常";
      evaluationKey = "severe";
    }
    
    // 计算进度条百分比（基于该维度的实际满分）
    let progressBarPercentage = (dimension.score / dimension.maxScore * 100);
    // 确保进度条百分比不超过100%
    progressBarPercentage = Math.min(progressBarPercentage, 100);
    
    // 预计算颜色类名
    let colorClass = '';
    let bgClass = '';
    
    switch(evaluationKey) {
      case 'normal':
        colorClass = 'text-success';
        bgClass = 'bg-emerald-500';
        break;
      case 'mild':
        colorClass = 'text-warning';
        bgClass = 'bg-orange-300';
        break;
      case 'moderate':
      case 'severe':
        colorClass = 'text-danger';
        bgClass = 'bg-red-300';
        if (evaluationKey === 'severe') {
          bgClass = 'bg-red-400';
        }
        break;
      default:
        colorClass = 'text-foreground';
        bgClass = 'bg-black';
    }
    
    const result = {
      name: dimension.name,
      score: dimension.score,
      average: dimension.average,
      evaluation: evaluation,
      evaluationKey: evaluationKey, // 添加英文标识符
      progressBarPercentage: progressBarPercentage,
      colorClass: colorClass,  // 预计算的颜色类名
      bgClass: bgClass         // 预计算的背景类名
    };
    
    console.log('Dimension evaluation result:', result);
    return result;
  });
  
  console.log('getDimensionEvaluations returning:', results);
  return results;
}

module.exports = {
  calculateDimensionScores,
  calculateTotalScore,
  getMentalHealthLevel,
  getDimensionEvaluations
};