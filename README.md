# ChatGPT Export to Markdown

[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://www.openai.com)
[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-FF4500?style=for-the-badge&logo=Tampermonkey&logoColor=white)](https://www.tampermonkey.net)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)](https://daringfireball.net/projects/markdown/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com)

基于油猴脚本与`turndown`的一键导出与chatgpt的“一问一答”完整对话形式

[简体中文](README.md) | [English](README_en.md)

## 特性

- **一键导出**：轻松将与ChatGPT的完整问答对话导出为Markdown文件。
- **油猴脚本**：利用Tampermonkey扩展，实现与浏览器的无缝集成。
- **Markdown格式**：以结构化的Markdown格式导出对话，便于阅读和分享。



## 安装

### 前提条件

- 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展。



### 步骤

1. **安装Tampermonkey**：如果尚未安装，请在浏览器中安装Tampermonkey扩展。
2. [点击安装此插件](https://github.com/phquathi/chatgpt-export-to-markdown/raw/master/chatgpt-export.user.js)



## 使用方法

1. **打开ChatGPT**：在浏览器中导航到ChatGPT界面。
2. **开始对话**：像往常一样与ChatGPT进行问答对话。
3. **导出**：点击右下角的“export”按钮。
4. **下载**：完整对话将以Markdown文件格式下载。



## 示例

下面是导出的Markdown文件示例：

```markdown
# Title

## Q: 
What is the capital of France?

## A: 
The capital of France is Paris.

## Q: 
Can you explain the theory of relativity?

## A: 
Sure! The theory of relativity, developed by Albert Einstein, includes both the Special and General theories of relativity. The Special Theory of Relativity, published in 1905, addresses the relationship between space and time in the absence of gravity...

...
```



## 许可证

该项目根据MIT许可证授权。有关详细信息，请参阅 [LICENSE](https://github.com/phquathi/chatgpt-export-to-markdown/blob/master/LICENSE) 文件。



## 支持

如果您遇到任何问题或有任何疑问，请在 [GitHub仓库](https://github.com/phquathi/chatgpt-export-to-markdown/issues) 上打开一个issue。

---

该脚本提供了一种简便且高效的方式将您的ChatGPT对话导出为Markdown格式，提高您的工作效率，并让您能保留良好的互动记录。

**请享受无缝导出的体验！**

**注意**：由于OpenAI更新速度较快，请及时提交issue以匹配新的元素。

---

## 更新日志

### 1.2.1 (2024-06-22):

- 匹配了最新的元素


### 大更新 1.2.0 (2024-06-21):

- 引入`turndown`库来支持更多的md语法！`turndown`库仓库链接：[点击访问](https://github.com/mixmark-io/turndown)
- 支持大部分md语法
- 支持latex表达式


### 1.0.1 (2024-06-20): 

- 匹配了最新的元素
