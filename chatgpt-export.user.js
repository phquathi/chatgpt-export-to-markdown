// ==UserScript==
// @name        chatgpt export to markdown
// @namespace   phquathi
// @version     1.2.1
// @description Based on Tampermonkey script, one-click export of complete Q&A conversations with ChatGPT.
// @author      phquathi
// @match       *://chatgpt.com/*
// @grant       none
// @require     https://cdn.jsdelivr.net/npm/turndown/dist/turndown.min.js
// @require     https://cdn.jsdelivr.net/npm/turndown-plugin-gfm/dist/turndown-plugin-gfm.js
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', () => {
        const exportButton = document.createElement('button');
        exportButton.innerText = 'Export';
        exportButton.style.position = 'fixed';
        exportButton.style.bottom = '50px';
        exportButton.style.right = '20px';
        exportButton.style.zIndex = '1000';
        exportButton.style.padding = '10px';
        exportButton.style.backgroundColor = 'rgb(74, 74, 74)';
        exportButton.style.color = 'white';
        exportButton.style.border = 'none';
        exportButton.style.borderRadius = '5px';
        exportButton.style.cursor = 'pointer';
        document.body.appendChild(exportButton);

        exportButton.addEventListener('click', () => {
            console.log('Export button clicked');

            // 获取侧边栏对话标题
            const childElement = document.querySelector('.relative.grow.overflow-hidden.whitespace-nowrap > [class*="absolute"][class*="bottom-0"][class*="right-0"][class*="top-0"][class*="bg-gradient-to-l"][class*="to-transparent"][class*="from-token-sidebar-surface-secondary"][class*="w-20"][class*="from-60%"][class*="juice:w-10"]');
            const titleElement = childElement ? childElement.closest('.relative.grow.overflow-hidden.whitespace-nowrap') : null;
            const title = titleElement ? titleElement.innerText : 'Title not found!';

            // 获取对话内容
            const chatContainer = document.querySelector('[class*="flex"][class*="h-full"][class*="flex-col"][class*="focus-visible:outline-0"]');
            if (chatContainer) {
                const chatItems = chatContainer.querySelectorAll('[class*="w-full text-token-text-primary"]');
                let markdownContent = `# ${title}\n\n`;

                const turndownService = new TurndownService({
                    headingStyle: 'atx',
                    codeBlockStyle: 'fenced'
                });

                turndownService.use(turndownPluginGfm.gfm);

                turndownService.addRule('removeUnwantedParts', {
                    filter: ['div', 'span'],
                    replacement: (content, node) => {
                        if (node.classList.contains('bg-token-main-surface-secondary') || node.textContent.includes('复制代码')) {
                            return '';
                        }
                        return content;
                    }
                });

                turndownService.addRule('formatCodeBlocks', {
                    filter: (node) => {
                        return node.nodeName === 'PRE' && node.querySelector('code');
                    },
                    replacement: (content, node) => {
                        const codeNode = node.querySelector('code');
                        let language = '';
                        const languageElement = node.querySelector('.bg-token-main-surface-secondary span');
                        if (languageElement) {
                            language = languageElement.textContent;
                        }
                        return `\n\`\`\`${language}\n${codeNode.textContent}\`\`\`\n`;
                    }
                });

                turndownService.addRule('blockLaTeX', {
                    filter: (node) => {
                        return node.classList.contains('katex-display');
                    },
                    replacement: (content, node) => {
                        const latexContent = node.querySelector('annotation[encoding="application/x-tex"]').textContent;
                        console.log(latexContent);
                        return `\n$$\n${latexContent}\n$$\n`;
                    },
                });


                chatItems.forEach((item) => {
                    const userMessage = item.querySelector('[data-message-author-role="user"] [class*="relative"][class*="max-w-[70%]"][class*="rounded-3xl"][class*="bg-[#f4f4f4]"][class*="px-5"][class*="py-2.5"][class*="dark:bg-token-main-surface-secondary"]');
                    //relative max-w-[70%] rounded-3xl bg-[#f4f4f4] px-5 py-2.5 dark:bg-token-main-surface-secondary
                    const chatgptMessage = item.querySelector('[data-message-author-role="assistant"] .markdown.prose.w-full.break-words');

                    if (userMessage) {
                        const userMarkdown = turndownService.turndown(userMessage.innerHTML);
                        markdownContent += `## Q: \n${userMarkdown}\n\n`;
                    }

                    if (chatgptMessage) {
                        const chatgptMarkdown = turndownService.turndown(chatgptMessage.innerHTML);
                        markdownContent += `## A: \n${chatgptMarkdown}\n\n`;
                    }
                });

                //console.log('Markdown Content:', markdownContent);

                const blob = new Blob([markdownContent], { type: 'text/markdown' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${title}.md`;
                a.click();
                URL.revokeObjectURL(url);
            } else {
                console.error('Chat container not found');
            }
        });
    });
})();
