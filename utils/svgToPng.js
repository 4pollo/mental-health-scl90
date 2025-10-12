const fs = require('fs');
const path = require('path');

/**
 * SVG转PNG工具
 * 用于将SVG代码保存为PNG图片文件
 * 注意：这个工具将SVG代码保存为文件，实际转换需要使用外部工具或在线服务
 */

// 确保images目录存在
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// 图标定义
const icons = {
  brain: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 16v6a2 2 0 0 0 0-4c-1.1 0-3-.9-3-3 0-1.1 1.9-2 3-2 1.1 0 3 .9 3 2 0 1.1-1.9 2-3 2"/>
    <path d="M12 3c-1.1 0-3 .9-3 3-1.1 0-3 .9-3 3 0 1.1.9 2 2 2 1.1 0 2-.9 2-2 0-1.1-.9-2-2-2"/>
    <path d="M21 12c0 1.1-.9 2-2 2-1.1 0-2-.9-2-2 0-1.1.9-2 2-2 1.1 0 2 .9 2 2"/>
    <path d="M5 12c0 1.1-.9 2.2-2 2.2-1.1 0-2-.9-2-2 0-1.1.9-2 2-2 1.1 0 2-.9 2-2"/>
  </svg>`,
  
  clipboard: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    <path d="M16 22h-8c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8"/>
    <path d="M4 6h16c1.1 0 2-.9 2-2v"/>
  </svg>`,
  
  timer: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6"/>
    <path d="M16 12h-4"/>
    <path d="M7 3.34a20 20 0 1 0 10 0"/>
  </svg>`,
  
  chart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21v2m0 0c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z"/>
    <path d="M12 21a10 10 0 0 0 10-10"/>
    <path d="M12 21a5 5 0 0 1-5-5"/>
  </svg>`,
  
  lightbulb: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 21c0 1.105-.895 2-2 2s-2-.895-2-2"/>
    <path d="M10 11h-4c-1.99 0-2-1.001-2-3v-3h2v3.5"/>
    <path d="M14 11h4v-3c0-2.001-.01-3-2-3h-4"/>
    <path d="M14 11v-3c0-1.099-.905-2.004-2.016-2.004C10.895 6 9.995 6.901 9.995 8v3.004"/>
    <path d="M14 11H9"/>
    <path d="M12 11v10"/>
  </svg>`,
  
  question: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16v2"/>
    <path d="M12 8h.01"/>
    <path d="M9.5 12h1c1.66 0 3-1.34 3-3s-1.34-3-3-3h-1.5"/>
  </svg>`,
  
  leftArrow: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12l-9 9-9-9"/>
  </svg>`,
  
  rightArrow: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 12l9 9 9-9"/>
  </svg>`,
  
  checkmark: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`,
  
  loop: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8l5 5-5 5"/>
    <path d="M16 13h-5v-5"/>
    <path d="M6 16c-1.072 0-2.083-.343-2.879-.911A4.41 4.41 0 0 1 2 13.5C2 11.029 4.029 9 6 9c1.304 0 2.523.578 3.377 1.527"/>
  </svg>`
};

/**
 * 保存SVG到文件
 */
function saveSvgToFile() {
  Object.keys(icons).forEach(iconName => {
    const svgCode = icons[iconName];
    const outputPath = path.join(imagesDir, `${iconName}.svg`);
    fs.writeFileSync(outputPath, svgCode, 'utf8');
    console.log(`已保存SVG文件: ${outputPath}`);
  });
  
  console.log('所有SVG图标已保存完成！');
  console.log('请使用外部工具或在线服务将SVG转换为PNG格式');
  console.log('推荐在线转换工具:');
  console.log('1. https://convertio.co/svg-png/');
  console.log('2. https://online-converter.com/svg_to_png');
  console.log('3. https://cloudconvert.com/svg-to-png');
}

// 如果直接运行此脚本，则执行保存SVG
if (require.main === module) {
  saveSvgToFile();
}

module.exports = {
  icons,
  saveSvgToFile
};