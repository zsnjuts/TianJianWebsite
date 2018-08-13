# 技术部部门介绍

> 要能够运行，首先需要执行命令`npm install`

本地测试
-------
```
npm run dev
```

然后访问：
```
http://localhost:8080/
```

部署
-------

执行运行`build.sh`，或者

```
npm run build
```

然后复制目录build下的
```
- bundle.js
```
到项目目录js中去，并更名为

```
- techdept-bundle.js
```

即可