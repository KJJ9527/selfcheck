export interface SceneOption {
  label: string;
  value: string;
}

export const SceneOptions: SceneOption[] = [
  { label: '支付', value: 'payment' },
  { label: '分账', value: 'split' },
  { label: '商户', value: 'merchant' },
  { label: '退款', value: 'refund' },
  { label: '账户', value: 'account' },
  { label: '其他', value: 'other' },
];
