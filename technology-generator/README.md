# 技术部动态页面生成工具

> 参考Github项目：https://github.com/Foveluy/React-awesome-resume

此目录用于生成[技术部动态页面](../Department-Technology.html)所需要的JavaScript文件，即`../js/techdept-bundle.js`。

如何在本地测试？
-------

```shell
npm install
npm run dev
```

然后访问
```
http://127.0.0.1:8080/
```

如何更新到网站？
-------

更新`app/src`下的txt文件，然后用以下命令生成目标JavaScript文件

```shell
npm install
npm run build
```

然后用`build/bundle.js`替换掉`../js/techdept-bundle.js`

