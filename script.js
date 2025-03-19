document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const fontSizeSlider = document.getElementById('font-size');
    const fontSizeValue = document.getElementById('font-size-value');
    const lineHeightSlider = document.getElementById('line-height');
    const lineHeightValue = document.getElementById('line-height-value');
    const letterSpacingSlider = document.getElementById('letter-spacing');
    const letterSpacingValue = document.getElementById('letter-spacing-value');
    const themeSelector = document.getElementById('theme');
    const layoutStyleSelector = document.getElementById('layout-style');
    const fontFamilySelector = document.getElementById('font-family');
    const inputText = document.getElementById('input-text');
    const convertBtn = document.getElementById('convert-btn');
    const clearBtn = document.getElementById('clear-btn');
    const verticalContent = document.getElementById('vertical-content');
    
    // 背景图片相关元素 - 确保只声明一次
    const backgroundImageInput = document.getElementById('background-image');
    const removeBgBtn = document.getElementById('remove-bg-btn');
    const adjustOpacityBtn = document.getElementById('adjust-opacity-btn');
    const bgOpacitySlider = document.getElementById('bg-opacity');
    const bgOpacityValue = document.getElementById('bg-opacity-value');
    const bgOverlay = document.getElementById('bg-overlay');
    
    // 应用设置函数
    function applySettings() {
        verticalContent.style.fontSize = fontSizeSlider.value + 'px';
        verticalContent.style.lineHeight = lineHeightSlider.value;
        verticalContent.style.letterSpacing = letterSpacingSlider.value + 'px';
        verticalContent.style.fontFamily = fontFamilySelector.value;
    }
    
    // 应用主题函数
    function applyTheme(theme) {
        // 移除所有主题类
        document.body.classList.remove('light', 'sepia', 'dark', 'ancient');
        // 添加选中的主题类
        document.body.classList.add(theme);
        
        // 保存用户偏好
        localStorage.setItem('theme', theme);
        
        // 如果当前使用古典排版样式，更新装饰元素颜色
        if (verticalContent.classList.contains('classical')) {
            updateClassicalDecorations();
        }
        
        console.log('应用主题:', theme);
    }
    
    // 应用排版样式函数
    function applyLayoutStyle(style) {
        // 移除所有样式类
        verticalContent.classList.remove('default', 'classical');
        
        // 移除古典样式的装饰元素
        removeClassicalDecorations();
        
        // 应用选择的样式
        verticalContent.classList.add(style);
        
        // 如果是古典样式，添加装饰元素
        if (style === 'classical') {
            addClassicalDecorations();
        } else {
            // 非古典样式，移除可能设置的内联背景色和边框颜色
            verticalContent.style.backgroundColor = '';
            verticalContent.style.borderColor = '';
        }
        
        // 保存用户偏好
        localStorage.setItem('layoutStyle', style);
        
        console.log('应用排版样式:', style);
    }
    
    // 添加classical样式的装饰元素
    function addClassicalDecorations() {
        // 移除可能存在的旧装饰
        removeClassicalDecorations();
        
        // 添加四个角的装饰
        const cornerBL = document.createElement('div');
        cornerBL.className = 'classical-corner-bl';
        verticalContent.appendChild(cornerBL);
        
        const cornerTR = document.createElement('div');
        cornerTR.className = 'classical-corner-tr';
        verticalContent.appendChild(cornerTR);
        
        const cornerBR = document.createElement('div');
        cornerBR.className = 'classical-corner-br';
        verticalContent.appendChild(cornerBR);
        
        const cornerTL = document.createElement('div');
        cornerTL.className = 'classical-corner-tl';
        verticalContent.appendChild(cornerTL);
        
        // 确保没有竖线
        const verticalLines = document.querySelectorAll('.vertical-line, .classical-divider');
        verticalLines.forEach(line => line.remove());
        
        // 立即更新边框颜色
        setTimeout(updateClassicalDecorations, 0);
    }
    
    // 更新古典装饰元素颜色（根据当前主题）
    function updateClassicalDecorations() {
        // 获取当前主题
        const currentTheme = document.body.classList.contains('ancient') ? 'ancient' : 
                         document.body.classList.contains('sepia') ? 'sepia' : 
                         document.body.classList.contains('dark') ? 'dark' : 'light';
        
        // 获取所有装饰元素
        const cornerBL = document.querySelector('.classical-corner-bl');
        const cornerTR = document.querySelector('.classical-corner-tr');
        const cornerBR = document.querySelector('.classical-corner-br');
        const cornerTL = document.querySelector('.classical-corner-tl');
        
        let borderColor;
        
        // 根据主题确定边框颜色
        if (currentTheme === 'ancient') {
            borderColor = '#8a7654';
            verticalContent.style.backgroundColor = '#F3E9D2';
        } else if (currentTheme === 'sepia') {
            borderColor = '#4a7a4d';
            verticalContent.style.backgroundColor = '#D8E8D9';
        } else if (currentTheme === 'dark') {
            borderColor = '#8a3232';
            verticalContent.style.backgroundColor = '#1a1a1a';
        } else {
            // 浅色模式
            borderColor = '#8a6464';
            verticalContent.style.backgroundColor = '#fff';
        }
        
        // 统一设置边框颜色 - 使用!important确保覆盖任何CSS规则
        verticalContent.style.setProperty('border-color', borderColor, 'important');
        
        // 确保所有角装饰的边框颜色一致
        if (cornerBL) cornerBL.style.setProperty('border-color', borderColor, 'important');
        if (cornerTR) cornerTR.style.setProperty('border-color', borderColor, 'important');
        if (cornerBR) cornerBR.style.setProperty('border-color', borderColor, 'important');
        if (cornerTL) cornerTL.style.setProperty('border-color', borderColor, 'important');
        
        console.log('更新古典样式边框颜色为:', borderColor, '当前主题:', currentTheme);
    }
    
    // 移除classical样式的装饰元素
    function removeClassicalDecorations() {
        const decorations = document.querySelectorAll('.classical-corner-bl, .classical-corner-tr, .classical-corner-br, .classical-corner-tl');
        decorations.forEach(el => el.remove());
    }
    
    // 监听字体大小变化
    fontSizeSlider.addEventListener('input', function() {
        fontSizeValue.textContent = this.value + 'px';
        applySettings();
    });
    
    // 监听行间距变化
    lineHeightSlider.addEventListener('input', function() {
        lineHeightValue.textContent = this.value;
        applySettings();
    });
    
    // 监听字间距变化
    letterSpacingSlider.addEventListener('input', function() {
        letterSpacingValue.textContent = this.value + 'px';
        applySettings();
    });
    
    // 监听字体变化
    fontFamilySelector.addEventListener('change', applySettings);
    
    // 监听主题变化
    themeSelector.addEventListener('change', function() {
        applyTheme(this.value);
    });
    
    // 监听排版样式变化
    layoutStyleSelector.addEventListener('change', function() {
        applyLayoutStyle(this.value);
    });
    
    // 转换按钮点击事件
    convertBtn.addEventListener('click', function() {
        const text = inputText.value;
        if (text) {
            processText(text);
            // 应用当前选择的排版样式
            if (layoutStyleSelector) {
                applyLayoutStyle(layoutStyleSelector.value);
            }
        } else {
            alert('请先输入或粘贴文本');
        }
    });
    
    // 清空按钮点击事件
    clearBtn.addEventListener('click', function() {
        inputText.value = '';
        verticalContent.textContent = '';
    });
    
    // 背景图片相关功能
    // IMPORTANT: Look through the rest of your file and remove any duplicate declarations like:
    // const backgroundImageInput = document.getElementById('background-image');
    // const removeBgBtn = document.getElementById('remove-bg-btn');
    // const adjustOpacityBtn = document.getElementById('adjust-opacity-btn');
    // const bgOpacitySlider = document.getElementById('bg-opacity');
    // const bgOpacityValue = document.getElementById('bg-opacity-value');
    // const bgOverlay = document.getElementById('bg-overlay');
    
    // 处理背景图片上传
    backgroundImageInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // 设置背景图片
                bgOverlay.style.backgroundImage = `url(${e.target.result})`;
                bgOverlay.style.display = 'block';
                bgOverlay.style.opacity = bgOpacitySlider.value;
                
                // 保存背景图片到本地存储
                try {
                    localStorage.setItem('backgroundImage', e.target.result);
                    localStorage.setItem('bgOpacity', bgOpacitySlider.value);
                    console.log('背景图片已保存');
                } catch (error) {
                    console.error('保存背景图片失败:', error);
                    // 如果图片太大无法保存到localStorage，至少显示当前会话
                }
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // 移除背景图片
    removeBgBtn.addEventListener('click', function() {
        bgOverlay.style.backgroundImage = 'none';
        bgOverlay.style.display = 'none';
        backgroundImageInput.value = '';
        localStorage.removeItem('backgroundImage');
        localStorage.removeItem('bgOpacity');
    });
    
    // 调整背景透明度
    adjustOpacityBtn.addEventListener('click', function() {
        if (bgOpacitySlider.style.display === 'none') {
            bgOpacitySlider.style.display = 'block';
            bgOpacityValue.style.display = 'block';
        } else {
            bgOpacitySlider.style.display = 'none';
            bgOpacityValue.style.display = 'none';
        }
    });
    
    // 监听透明度变化
    bgOpacitySlider.addEventListener('input', function() {
        bgOpacityValue.textContent = this.value;
        bgOverlay.style.opacity = this.value;
        
        // 如果有背景图片，保存当前透明度
        if (bgOverlay.style.backgroundImage !== 'none' && bgOverlay.style.backgroundImage !== '') {
            localStorage.setItem('bgOpacity', this.value);
        }
    });
    
    // 在页面加载时恢复背景图片
    document.addEventListener('DOMContentLoaded', function() {
        // 恢复背景图片
        const savedBgImage = localStorage.getItem('backgroundImage');
        const savedBgOpacity = localStorage.getItem('bgOpacity') || 0.2;
        
        if (savedBgImage) {
            bgOverlay.style.backgroundImage = `url(${savedBgImage})`;
            bgOverlay.style.display = 'block';
            bgOverlay.style.opacity = savedBgOpacity;
            bgOpacitySlider.value = savedBgOpacity;
            bgOpacityValue.textContent = savedBgOpacity;
        }
    });
    
    // 处理文本
    // 处理文本函数
    function processText(text) {
        if (!text) return;
        
        // 处理文本，去除多余空行，保留段落结构
        text = text.replace(/\r\n/g, '\n');
        text = text.replace(/\n{3,}/g, '\n\n');
        
        // 如果是古典模式，移除「」符号
        if (layoutStyleSelector && layoutStyleSelector.value === 'classical') {
            text = text.replace(/[「」]/g, '');
        }
        
        // 清空内容
        verticalContent.innerHTML = '';
        
        // 创建一个容器元素
        const container = document.createElement('div');
        container.style.height = '100%';
        container.style.width = '100%';
        container.style.writingMode = 'vertical-rl';
        container.style.webkitWritingMode = 'vertical-rl';
        container.style.msWritingMode = 'tb-rl';
        container.style.textOrientation = 'upright';
        
        // 将文本分成段落
        const paragraphs = text.split(/\n\n+/);
        
        // 创建列容器
        const columnContainer = document.createElement('div');
        columnContainer.style.display = 'flex';
        columnContainer.style.flexDirection = 'row-reverse'; // 从右到左排列
        columnContainer.style.height = '100%';
        
        // 当前列
        let currentColumn = document.createElement('div');
        currentColumn.className = 'text-column';
        currentColumn.style.height = '100%';
        currentColumn.style.marginLeft = '2em';
        
        paragraphs.forEach((paragraph, index) => {
            // 创建段落元素
            const p = document.createElement('div');
            p.className = 'vertical-paragraph';
            p.style.borderRight = 'none'; // 确保没有右边框
            
            // 处理特殊模式，如[数字]
            let processedText = '';
            let i = 0;
            
            while (i < paragraph.length) {
                // 检查是否是[数字]模式
                if (paragraph[i] === '[' && /\d/.test(paragraph[i+1])) {
                    let j = i + 1;
                    while (j < paragraph.length && paragraph[j] !== ']') j++;
                    
                    if (j < paragraph.length && paragraph[j] === ']') {
                        // 找到完整的[数字]
                        const bracketContent = paragraph.substring(i, j+1);
                        processedText += bracketContent;
                        i = j + 1;
                    } else {
                        // 没有找到匹配的]
                        processedText += paragraph[i];
                        i++;
                    }
                } else {
                    processedText += paragraph[i];
                    i++;
                }
            }
            
            p.textContent = processedText;
            currentColumn.appendChild(p);
        });
        
        columnContainer.appendChild(currentColumn);
        container.appendChild(columnContainer);
        verticalContent.appendChild(container);
        
        // 确保没有竖线
        removeAllVerticalLines();
        
        // 应用当前设置
        applySettings();
        
        // 如果是古典模式，添加装饰元素
        if (layoutStyleSelector && layoutStyleSelector.value === 'classical') {
            applyLayoutStyle('classical');
        }
    }
    
    // 添加一个新函数来移除所有竖线
    function removeAllVerticalLines() {
        // 移除所有可能的竖线元素
        const verticalLines = document.querySelectorAll('.vertical-line, .classical-divider');
        verticalLines.forEach(line => line.remove());
        
        // 移除所有段落和列的边框
        const paragraphs = document.querySelectorAll('.vertical-paragraph');
        paragraphs.forEach(p => {
            p.style.border = 'none';
            p.style.borderRight = 'none';
            p.style.borderLeft = 'none';
        });
        
        const columns = document.querySelectorAll('.text-column');
        columns.forEach(col => {
            col.style.border = 'none';
            col.style.borderRight = 'none';
            col.style.borderLeft = 'none';
        });
    }
    
    // 修改应用排版样式函数
    function applyLayoutStyle(style) {
        // 移除所有样式类
        verticalContent.classList.remove('default', 'classical');
        
        // 移除古典样式的装饰元素
        removeClassicalDecorations();
        
        // 应用选择的样式
        verticalContent.classList.add(style);
        
        // 如果是古典样式，添加装饰元素
        if (style === 'classical') {
            addClassicalDecorations();
        } else {
            // 非古典样式，恢复原始内容
            verticalContent.innerHTML = currentContent;
            
            // 移除可能设置的内联背景色和边框颜色
            verticalContent.style.backgroundColor = '';
            verticalContent.style.borderColor = '';
        }
        
        // 保存用户偏好
        localStorage.setItem('layoutStyle', style);
    }
    
    // 确保在DOM加载完成后执行初始化
    document.addEventListener('DOMContentLoaded', function() {
        // 加载保存的主题和排版样式
        const savedTheme = localStorage.getItem('theme');
        const savedLayoutStyle = localStorage.getItem('layoutStyle');
        
        // 应用保存的主题
        if (savedTheme && ['light', 'sepia', 'dark', 'ancient'].includes(savedTheme)) {
            themeSelector.value = savedTheme;
            applyTheme(savedTheme);
        }
        
        // 应用保存的排版样式
        if (savedLayoutStyle && ['default', 'classical'].includes(savedLayoutStyle)) {
            layoutStyleSelector.value = savedLayoutStyle;
            applyLayoutStyle(savedLayoutStyle);
        } else {
            // 默认使用默认排版样式
            applyLayoutStyle('default');
        }
        
        // 如果当前是古典样式，确保边框颜色统一
        if (verticalContent.classList.contains('classical')) {
            // 延迟执行以确保DOM已完全更新
            setTimeout(updateClassicalDecorations, 100);
        }
    });
    
    // 监听主题变化
    themeSelector.addEventListener('change', function() {
        applyTheme(this.value);
    });
    
    // 监听排版样式变化
    layoutStyleSelector.addEventListener('change', function() {
        applyLayoutStyle(this.value);
    });
});

// 转换为竖排函数中，确保在古典模式下不添加竖线
function convertToVertical() {
    // 获取输入文本
    const text = inputText.value.trim();
    
    // 如果没有文本，则不执行操作
    if (!text) return;
    
    // 清空现有内容
    verticalContent.innerHTML = '';
    
    // 检查当前是否为古典模式
    const isClassicalMode = verticalContent.classList.contains('classical');
    
    // 按行分割文本
    const lines = text.split('\n');
    
    // 处理每一行
    lines.forEach((line, index) => {
        if (line.trim() === '') {
            // 空行处理
            const emptyLine = document.createElement('div');
            emptyLine.className = 'vertical-line empty';
            verticalContent.appendChild(emptyLine);
        } else {
            // 创建竖排行
            const verticalLine = document.createElement('div');
            verticalLine.className = 'vertical-line';
            
            // 处理每个字符
            Array.from(line).forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                
                // 特殊字符处理
                if (/[，。、；：？！""''（）【】《》「」『』—…·]/.test(char)) {
                    charSpan.className = 'punctuation';
                }
                
                verticalLine.appendChild(charSpan);
            });
            
            // 只有在非古典模式下才添加竖线
            if (!isClassicalMode) {
                verticalContent.appendChild(verticalLine);
            } else {
                // 在古典模式下，创建不带竖线样式的内容
                const classicalText = document.createElement('div');
                classicalText.className = 'classical-text';
                classicalText.innerHTML = verticalLine.innerHTML;
                verticalContent.appendChild(classicalText);
            }
        }
    });
    
    // 如果是古典模式，确保应用classical样式
    if (isClassicalMode) {
        // 移除所有可能的竖线
        const verticalLines = document.querySelectorAll('.vertical-line');
        verticalLines.forEach(line => line.remove());
        
        // 重新应用古典装饰
        addClassicalDecorations();
    }
    
    // 应用当前设置
    applySettings();
}

// 应用排版样式函数
function applyLayoutStyle(style) {
    // 保存当前内容
    const currentContent = verticalContent.innerHTML;
    
    // 移除所有样式类
    verticalContent.classList.remove('default', 'classical');
    
    // 移除古典样式的装饰元素
    removeClassicalDecorations();
    
    // 应用选择的样式
    verticalContent.classList.add(style);
    
    // 如果是古典样式，添加装饰元素并移除竖线
    if (style === 'classical') {
        // 清空内容，以便重新格式化
        const tempContent = verticalContent.innerHTML;
        verticalContent.innerHTML = '';
        
        // 添加古典装饰
        addClassicalDecorations();
        
        // 重新添加内容，但不使用竖线
        const textNodes = Array.from(new DOMParser().parseFromString(tempContent, 'text/html').querySelectorAll('.vertical-line'));
        textNodes.forEach(node => {
            const classicalText = document.createElement('div');
            classicalText.className = 'classical-text';
            classicalText.innerHTML = node.innerHTML;
            verticalContent.appendChild(classicalText);
        });
        
        // 确保移除所有竖线
        const verticalLines = document.querySelectorAll('.vertical-line');
        verticalLines.forEach(line => line.remove());
    } else {
        // 非古典样式，恢复原始内容
        verticalContent.innerHTML = currentContent;
        
        // 移除可能设置的内联背景色和边框颜色
        verticalContent.style.backgroundColor = '';
        verticalContent.style.borderColor = '';
    }
    
    // 保存用户偏好
    localStorage.setItem('layoutStyle', style);
}

/* 移除以下代码 */
/*
// 添加侧边栏折叠功能
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const contentWrapper = document.querySelector('.content-wrapper');

sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
    contentWrapper.classList.toggle('expanded');
    
    // 保存侧边栏状态到本地存储
    const isCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed);
    
    // 更新折叠按钮图标
    const toggleIcon = this.querySelector('.toggle-icon');
    toggleIcon.textContent = isCollapsed ? '≡' : '×';
});

// 在DOMContentLoaded事件中的相关代码
// 恢复侧边栏状态
const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
if (sidebarCollapsed) {
    sidebar.classList.add('collapsed');
    contentWrapper.classList.add('expanded');
    sidebarToggle.querySelector('.toggle-icon').textContent = '≡';
}
*/
document.addEventListener('DOMContentLoaded', function() {
    // ... 现有的DOMContentLoaded代码 ...
    
    // 恢复侧边栏状态
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
        contentWrapper.classList.add('expanded');
        sidebarToggle.querySelector('.toggle-icon').textContent = '≡';
    }
});