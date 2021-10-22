/**
 * title: 基础 Modal
 * desc: 演示 Modal 组件的基础示例
 */

import React, { useState } from 'react';
import { Modal1 } from 'shortcuts-sys';

import '../../assets/index.less';
import './basic.less';

export default () => {
  const [visible, tgl] = useState(false);
  return (
    <>
      use keyboard<code>?</code>open dialog <br />
      ro click <button onClick={() => tgl(true)}>btn</button> open dialog
      <Modal1
        title="Keyboard shortcuts"
        visible={visible}
        destroyOnClose={true}
        onClose={() => tgl(false)}
      >
        basic
      </Modal1>
    </>
  );
};
