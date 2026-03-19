// 获取软件列表的父元素
const softwareList = document.querySelector('.software-list');

// 获取所有的软件列表项
const softwareItems = Array.from(document.querySelectorAll('.software-list-item'));

// 定义一个函数来随机调整顺序
function shuffleItems() {
    // 使用 Fisher-Yates 算法随机打乱数组
    for (let i = softwareItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [softwareItems[i], softwareItems[j]] = [softwareItems[j], softwareItems[i]];
    }

    // 清空父元素
    softwareList.innerHTML = '';

    // 将打乱顺序后的元素重新插入父元素 
    softwareItems.forEach(item => {
        softwareList.appendChild(item);
    });
}

// 每隔一段时间调用 shuffleItems 函数
setInterval(shuffleItems, 5000); // 每隔 3 秒调整一次顺序
