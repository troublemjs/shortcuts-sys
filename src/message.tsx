import React from 'react';
import ReactDOM from 'react-dom';
import destroyFns from './destroyFns';
import Modal1 from './Modal1';

export interface MessageFuncProps {
  onCancel?: (...args: any[]) => void;
}

type ConfigUpdate =
  | MessageFuncProps
  | ((prevConfig: MessageFuncProps) => MessageFuncProps);

export type MessageFunc = (props: MessageFuncProps) => {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
};

export default function message(config: MessageFuncProps) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let curConfig = { ...config, close, visible: true };

  function destroy(...args: any[]) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args.some((param) => param && param.triggerCancel);
    if (triggerCancel) {
      config?.onCancel(...args);
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function render({
    okText,
    cancelText,
    prefixClx: customizePrefixClx,
    ...props
  }: any) {
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     *
     * Sync render blocks React event. Let's make this async.
     */
    setTimeout(() => {
      ReactDOM.render(
        <Modal1 {...props} prefixCls={customizePrefixClx} />,
        div,
      );
    });
  }

  function close(...args: any[]) {
    curConfig = {
      ...curConfig,
      visible: false,
      afterClose: () => {
        if (typeof config.afterClose === 'function') {
          config.afterClose();
        }
        destroy.apply(this, args);
      },
    };
    render(curConfig);
  }

  function update(configUpdate: ConfigUpdate) {
    if (typeof configUpdate === 'function') {
      curConfig = configUpdate(curConfig);
    } else {
      curConfig = {
        ...curConfig,
        ...configUpdate,
      };
    }
    render(curConfig);
  }

  render(curConfig);

  destroyFns.push(close);

  return {
    destroy: close,
    update,
  };
}
