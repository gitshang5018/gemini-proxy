const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const port = process.env.PORT || 3000;
const googleApiKey = process.env.GOOGLE_API_KEY;

const apiProxy = createProxyMiddleware({ // 注意：这里没有路径前缀了
  target: 'https://generativelanguage.googleapis.com',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('x-goog-api-key', googleApiKey);
    proxyReq.setHeader('Content-Type', 'application/json'); // 根据需要设置
  },
});

app.use(apiProxy);

app.listen(port, () => {
  console.log(`反向代理服务器运行在 http://localhost:${port}`);
});
