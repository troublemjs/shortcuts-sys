/**
 * title: 基础 ShortcutsSys
 * desc: 演示 ShortcutsSys 组件的基础示例
 */

import React, { useState } from 'react';
import { Modal } from 'shortcuts-sys';

import '../../assets/index.less';
import './basic.less';

export default () => {
  const [visible, tgl] = useState(false);
  return (
    <>
      use keyboard<code>?</code>open dialog <br />
      ro click <button onClick={() => tgl(true)}>btn</button> open dialog
      <Modal
        title="Keyboard shortcuts"
        visible={visible}
        destroyOnClose={true}
        onClose={() => tgl(false)}
      >
        basic
      </Modal>
    </>
  );
};
