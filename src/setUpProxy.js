import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
    app.use(
        createProxyMiddleware("/GetSupplierMasterDatas", {
            target: "https://dskapi.azurewebsites.net/api/",
            changeOrigin: true
        })
    );

    app.use(
        createProxyMiddleware("/GetSupplierCapturedDataById", {
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
};