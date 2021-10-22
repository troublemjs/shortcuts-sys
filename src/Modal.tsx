import * as React from 'react';
import Dialog, { DialogProps } from 'rc-dialog';
import 'rc-dialog/assets/index.css';
import keyboardJS from 'keyboardjs';
import List from './List';
import CloseIcon from './CloseIcon';

new PerformanceObserver((entryList) => {
  entryList.getEntries().forEach((item) => {
    console.log(item);
  });
}).observe({ entryTypes: ['resource'] });

/**
 * 条件包裹器
 * @description 判断是 输入框 等不执行
 */
const shouldRun = (event: keyboardJS.KeyEvent, fn: Function) => {
  // console.log(event.currentTarget);
  const el = event.target as HTMLElement;
  console.log(document.activeElement);

  const tagName = el.tagName; // tagName nodeName
  const role = el.getAttribute('role');
  const type = el.getAttribute('type');
  console.log(tagName, role, type);
  if (role === 'dialog') return;

  fn();
};

// shift+/ = ?
keyboardJS.on('shift+/', (e) => {
  shouldRun(e, () => {
    console.log(e);
  });
});

interface ModalProps extends DialogProps {}
const Modal: React.FC<ModalProps> = (props) => {
  return (
    <Dialog closeIcon={<CloseIcon />} {...props}>
      <p>basic modal</p>
      <List title="aaabbb"></List>
      <List title="aaabbb"></List>
    </Dialog>
  );
};

export default Modal;

// Bits 权限系统
const curPermission = 0b1000; // 当前用户权限
const D = 0b0010; // 删
const U = 0b0100; // 改
const DandU = 0b0110; // 删、改 都有
const allowDelete = (p: number) => (p & D) === D;
const allowUpdate = (p: number) => (p & U) === U;
const allowDeleteAndUpdate = (p: number) => (p & DandU) === DandU;

const COLUMNS = [
  {
    title: 'operation',
    dataIndex: 'operation',
    render: () => (
      <>
        {allowUpdate(curPermission) && <button>Edit</button>}
        {allowDelete(curPermission) && <button>Delete</button>}
      </>
    ),
  },
];
const retColumns = COLUMNS.filter((x) => {
  if (x.dataIndex === 'operation') {
    return allowDeleteAndUpdate(curPermission);
  }
  return true;
});
