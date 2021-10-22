import React from 'react';
import cx from 'classnames';
import Dialog from 'rc-dialog';
import { canUseDocElement } from './utils';

let mousePosition: { x: number; y: number } | null;
// ref: https://github.com/ant-design/ant-design/issues/15795
const getClickPosition = (e: MouseEvent) => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY,
  };
  // 100ms 内发生过点击事件，则从点击位置展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开
  setTimeout(() => {
    mousePosition = null;
  }, 100);
};

if (canUseDocElement()) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}

type GetContainerFunc = () => HTMLElement;

interface Modal1Props {
  visible?: boolean;
  confirmLoading?: boolean;
  title?: React.ReactNode | string;
  /** 是否显示右上角的关闭按钮 */
  closable?: boolean;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调 */
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  afterClose?: VoidFunction;
  /** 是否垂直居中 */
  centered?: boolean;
  width?: string | number;
  footer?: React.ReactNode;
  okText?: React.ReactNode;
  // okType
  cancelText?: React.ReactNode;
  maskClosable?: boolean;
  forceRender?: boolean;
  // okButtonProps
  // cancelButtonProps
  destroyOnClose?: boolean;
  style?: React.CSSProperties;
  wrapClassName?: string;
  maskTransitionName?: string;
  transitionName?: string;
  className?: string;
  getContainer?: string | HTMLElement | GetContainerFunc | false;
  zIndex?: number;
  bodyStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  mask?: boolean;
  keyboard?: boolean;
  wrapProps?: any;
  prefixCls?: string;
  closeIcon?: React.ReactNode;
  modalRender?: (node: React.ReactNode) => React.ReactNode;
  focusTriggerAfterClose?: boolean;
}
const Modal1: React.FC<Modal1Props> = (props) => {
  const {} = props;

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onCancel?.(e);
  };
  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onOk?.(e);
  };

  const renderFooter = () => {
    const { okText, cancelText } = props;
    return (
      <>
        <button onClick={handleCancel}>{cancelText}</button>
        <button onClick={handleOk}>{okText}</button>
      </>
    );
  };

  const {
    prefixCls,
    footer,
    visible,
    wrapClassName,
    centered,
    getContainer,
    closeIcon,
    focusTriggerAfterClose = true,
    ...restProps
  } = props;
  const wrapClassNameExtended = cx(wrapClassName, {
    [`${prefixCls}-centered`]: !!centered,
  });
  return (
    <Dialog
      {...restProps}
      getContainer={getContainer}
      prefixCls={prefixCls}
      wrapClassName={wrapClassNameExtended}
      footer={footer === undefined ? renderFooter() : footer}
      visible={visible}
      mousePosition={mousePosition}
      // onClose={handleCancel}
      onClose={(e: React.SyntheticEvent<Element, Event>) => {}}
      // closeIcon={closeIconToRender}
      focusTriggerAfterClose={focusTriggerAfterClose}
      // transitionName={getTransitionName(
      //   rootPrefixCls,
      //   'zoom',
      //   props.transitionName,
      // )}
      // maskTransitionName={getTransitionName(
      //   rootPrefixCls,
      //   'fade',
      //   props.maskTransitionName,
      // )}
    />
  );
};

Modal1.defaultProps = {
  width: 520,
  confirmLoading: true,
  visible: false,
};

export default Modal1;
