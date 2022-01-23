const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware("/GetSupplierMasterDatas",  {
            target: "https://dskapi.azurewebsites.net/api/",
            changeOrigin: true
        })
    );

    app.use(
        createProxyMiddleware("/GetSupplierCapturedData", {
            target: "https://dskapi.azurewebsites.net/api/",
            changeOrigin: true
        })
    );
    
    app.use(
        createProxyMiddleware("/GetContractMasterDatas", {
            target: "https://dskapi.azurewebsites.net/api/",
            changeOrigin: true
        })
    );
    
    app.use(
        createProxyMiddleware("/GetContractCapturedDataById", {
            target: "https://dskapi.azurewebsites.net/api/",
            changeOrigin: true
        })
    );

    app.use(
        createProxyMiddleware("/PutSupplierCapturedData", {
            target: "https://dskapi.azurewebsites.net/api/",
            changeOrigin: true
        })
    );

    app.use(
        createProxyMiddleware("/PutContractCaputredData", {
            target: "https://dskapi.azurewebsites.net/api/",
            changeOrigin: true
        })
    );
};