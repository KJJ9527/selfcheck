## 当前页面的URL未注册

我在发起支付请求时，收到"当前页面的URL未注册"错误


## 可能原因
- 未配置支付授权目录

## 解决方案
1. 请@扫呗运营同事协助配置
2. 自助操作流程：登录[管理后台](https://manage.saobei.cn/)，找到商户管理--商户列表--查询商户--查看--商户详情--通道配置--当前通道--微信支付(关注配置)--支付授权目录配置，目录配置到最后一个斜杠(包含最后一个斜杠)
例如地址 [http://](http://www.baidu.com/test/index.html)wxpay.lcsw.cn/test/pay_sdk.html，授权目录就为 [http://](http://www.baidu.com/test/index.html)wxpay.lcsw.cn/test/
3. 已配置支付目录，但是还是报错，检查商户有配置商户集吗，商户集有没有配置对应的支付目录