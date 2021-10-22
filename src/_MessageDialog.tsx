import React from 'react';
import Dialog, { DialogProps } from 'rc-dialog';
import cx from 'classnames';

import { MessageFuncProps } from './message';

interface MessageDialogProps extends MessageFuncProps, DialogProps {
  afterClose?: () => void;
  close: (...args: any[]) => void;
  autoFocusButton?: null | 'ok' | 'cancel';
}
const MessageDialog: React.FC<MessageDialogProps> = (props) => {
  const { prefixCls } = props;

  const contentPrefixCls = `${prefixCls}-message`;
  const width = props.width ?? 416;
  const style = props.style ?? {};
  const mask = props.mask === undefined ? true : props.mask;
  const autoFocusButton =
    props.autoFocusButton === null ? false : props.autoFocusButton ?? 'ok';

  const classString = cx(contentPrefixCls, props.className);

  // const cancelButton = okCancel && <button>{cancelText}</button>;
  return <Dialog prefixCls={prefixCls} className={classString}></Dialog>;
};

export default MessageDialog;
