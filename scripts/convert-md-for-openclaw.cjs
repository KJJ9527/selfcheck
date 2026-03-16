// scripts/convert-md-for-openclaw.js
const fs = require('fs');
const path = require('path');

// 配置路径（请根据你的实际情况修改）
const PROBLEMS_JSON_PATH = './src/data/problems.json';        // problems.json 路径
const SRC_MD_DIR = './public/problems';                     // 原始 .md 文件目录
const DEST_MD_DIR = './openclaw-md';                        // 输出目录（用于 OpenClaw）

// 确保输出目录存在
if (!fs.existsSync(DEST_MD_DIR)) {
  fs.mkdirSync(DEST_MD_DIR, { recursive: true });
}

// 读取 problems.json
const problemsData = JSON.parse(fs.readFileSync(PROBLEMS_JSON_PATH, 'utf8'));
const problemMap = new Map(problemsData.map(p => [p.id, p]));

// 读取源目录下所有 .md 文件
const files = fs.readdirSync(SRC_MD_DIR).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const id = path.basename(file, '.md'); // 去掉扩展名得到 id
  const problem = problemMap.get(id);
  if (!problem) {
    console.warn(`⚠️ 未找到 id 为 "${id}" 的问题，跳过文件 ${file}`);
    return;
  }

  const srcPath = path.join(SRC_MD_DIR, file);
  let content = fs.readFileSync(srcPath, 'utf8');

  // 构建要插入的标题和描述部分
  const titleLine = `## ${problem.title}\n\n`;
  const descLine = `${problem.description}\n\n`;

  // 将新内容插入到文件最前面（不检查重复，直接覆盖）
  const newContent = titleLine + descLine + content;

  const destPath = path.join(DEST_MD_DIR, file);
  fs.writeFileSync(destPath, newContent, 'utf8');
  console.log(`✅ 已生成文件 ${destPath}`);
});

console.log('🎉 所有文件转换完成！');