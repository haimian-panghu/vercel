// 获取新闻容器元素
const newsContainer = document.getElementById('news-container');

// 定义新闻接口 URL
const apiUrl = 'https://jx.iqfk.top/60s.php?key=54K55paw6Iqx6Zuo&type=web';

// 发起请求获取新闻数据
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('网络响应不正常');
    }
    return response.json();
  })
  .then(data => {
    if (data.code === '200') {
      // 提取新闻内容，去除开头的日期和结束语
      const newsContent = data.data;
      const newsLines = newsContent.split('<p>').filter(line => line.trim()!== '').slice(2, -1);

      newsLines.forEach(line => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const newsContentElement = document.createElement('div');
        newsContentElement.classList.add('news-content');
        // 去除 </p> 标签并添加到页面
        newsContentElement.textContent = line.replace('</p>', '');

        newsItem.appendChild(newsContentElement);
        newsContainer.appendChild(newsItem);
      });
    } else {
      console.error('获取新闻数据失败:', data.msg);
    }
  })
  .catch(error => {
    console.error('请求出错:', error);
  });