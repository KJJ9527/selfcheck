
## 可能原因
- 接口pay_trace、pay_time、out_trade_no、out_refund_no字段传参错误
- pay_time必须是原流水号terminal_time请求时间

## 解决方案
1. 检查以上字段是否传参错误
2. 检查pay_time和原流水号terminal_time请求时间是否一致