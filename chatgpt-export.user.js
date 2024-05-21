// ==UserScript==
// @name        chatgpt export to markdown
// @namespace   phquathi
// @version     1.0
// @description Based on Tampermonkey script, one-click export of complete Q&A conversations with ChatGPT.
// @author      phquathi
// @match       *://chatgpt.com/*
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', () => {
        const exportButton = document.createElement('button');
        exportButton.innerText = 'export';
        exportButton.style.position = 'fixed';
        exportButton.style.bottom = '50px';
        exportButton.style.right = '20px';
        exportButton.style.zIndex = '1000';
        exportButton.style.padding = '10px';
        exportButton.style.backgroundColor = '#4CAF50';
        exportButton.style.color = 'white';
        exportButton.style.border = 'none';
        exportButton.style.borderRadius = '5px';
        exportButton.style.cursor = 'pointer';
        document.body.appendChild(exportButton);

        exportButton.addEventListener('click', () => {
            // 获取侧边栏对话标题
            const childElement = document.querySelector('.relative.grow.overflow-hidden.whitespace-nowrap > [class*="absolute"][class*="bottom-0"][class*="right-0"][class*="top-0"][class*="bg-gradient-to-l"][class*="to-transparent"][class*="from-token-sidebar-surface-secondary"][class*="w-20"][class*="from-60%"][class*="juice:w-10"]');
            const titleElement = childElement.closest('.relative.grow.overflow-hidden.whitespace-nowrap');
            const title = titleElement ? titleElement.innerText : '对话标题未找到';

            // 获取对话内容
            const chatContainer = document.querySelector('.flex.flex-col.text-sm.pb-9');
            if (chatContainer) {
                const chatItems = chatContainer.querySelectorAll(':scope > div');
                let markdownContent = `# ${title}\n\n`;

                chatItems.forEach((item) => {
                    const userMessage = item.querySelector('[class*="relative"][class*="max-w-"][class*="rounded-3xl"]');
                    const chatgptMessage = item.querySelector('.markdown.prose.w-full.break-words');

                    if (userMessage) {
                        markdownContent += `## Q: \n${userMessage.innerText.trim()}\n\n`;
                    }
                    if (chatgptMessage) {
                        let messageText = chatgptMessage.innerHTML;
                        messageText = messageText.replace(/<div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>(.*?)<\/span>.*?<\/div>/g, (match, p1) => {
                            return `\n\`\`\`\`${p1}\n`;
                        });
                        messageText = messageText.replace(/<\/div><\/div><div class="overflow-y-auto p-4 text-left undefined" dir="ltr">/g, "");
                        messageText = messageText.replace(/<\/div><\/div><\/pre>/g, "\`\`\`\n");

                        messageText = messageText.replace(/<.*?>/g, '');
                        markdownContent += `## A: \n${messageText.trim()}\n\n`;
                    }
                });


                const blob = new Blob([markdownContent], { type: 'text/markdown' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${title}.md`;
                a.click();
                URL.revokeObjectURL(url);
            }
        });
    });
})();