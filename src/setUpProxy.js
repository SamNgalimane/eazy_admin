const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy("/GetSupplierMasterDatas", {
            target: "https://dskapi.azurewebsites.net/api/",
            changeOrigin: true
        })
    );
    
    app.use(
        proxy("/GetSupplierCapturedData", {
            target: "https://dskapi.azurewebsites.net/api/",
            changeOrigin: true
        })
    );
};