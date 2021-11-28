import React from 'react';
import cx from 'classnames';

import Modal, { ModalFuncProps } from './Modal1';

interface ConfirmDialogProps extends ModalFuncProps {
  afterClose?: VoidFunction;
  close: (...args: any[]) => void;
  autoFocusButton?: null | 'ok' | 'cancel';
  rootPrefixCls: string;
  iconPrefixCls?: string;
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    icon,
    onCancel,
    onOk,
    close,
    zIndex,
    afterClose,
    visible,
    keyboard,
    centered,
    getContainer,
    maskStyle,
    okText,
    cancelText,
    prefixCls,
    rootPrefixCls,
    iconPrefixCls,
    bodyStyle,
    closable = false,
    closeIcon,
    modalRender,
    focusTriggerAfterClose,
  } = props;

  const contentPrefixCls = `${prefixCls}-confirm`;
  const okCancel = 'okCancel' in props ? props.okCancel! : true;
  const width = props.width || 416;
  const style = props.style || {};
  const mask = props.mask === undefined ? true : props.mask;
  const maskClosable =
    props.maskClosable === undefined ? false : props.maskClosable;
  const autoFocusButton =
    props.autoFocusButton === null ? false : props.autoFocusButton || 'ok';

  const classString = cx(
    contentPrefixCls,
    `${contentPrefixCls}-${props.type}`,
    // { [`${contentPrefixCls}-rtl`]: direction === 'rtl'},
    props.classname,
  );

  const cancelButton = okCancel && <button>{cancelText}</button>;

  return (
    <Modal
      prefixCls={prefixCls}
      className={classString}
      wrapClassName={cx({ [`${contentPrefixCls}-centered`]: !!props.centered })}
      onCancel={() => close({ triggerCancel: true })}
      visible={visible}
      title=""
      footer=""
      trans
    ></Modal>
  );
};
