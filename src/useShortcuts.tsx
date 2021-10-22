import React, { useEffect, useRef } from 'react';
import keyboardJS from 'keyboardjs';
import Dialog, { DialogProps } from 'rc-dialog';
// import KeyboardJS from 'keyboardjs';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

// keyboardJS.watch(window, document.body);

/**
 * 条件包裹器，支持全局配置黑名单列表
 * @description 判断是 输入框 等不执行
 */
const conditionWrap = (event: keyboardJS.KeyEvent, func: Function) => {
  // console.log(event.currentTarget);
  const el = event.target as HTMLElement;
  console.log(document.activeElement);

  const tagName = el.tagName; // tagName nodeName
  const role = el.getAttribute('role');
  const type = el.getAttribute('type');
  console.log(tagName, role, type);
  if (role === 'dialog') return;

  func();
};

// `shift+/` equal to `?`
keyboardJS.on('shift+/', (e) => {
  conditionWrap(e, () => {
    console.log('eeee');
  });
});

const globalIds: Record<string, any> = {};

interface ShortcutKey {
  combo: string;
  handler: keyboardJS.Callback;
}
const useShortcuts = (identifier: string, opts: ShortcutKey[]) => {
  useEffect(() => {
    console.log('mounted');
    keyboardJS.setContext(identifier);
    // const had = Reflect.has(globalIds, identifier);
    // console.log(had);
    // console.log(keyboardJS.)

    // if (had) return;
    // globalIds[identifier] = 1;
    // const id = keyboardJS.getContext();

    keyboardJS.withContext(identifier, () => {
      opts?.forEach((opt) => {
        keyboardJS.on(opt.combo, (e) => {
          conditionWrap(e, () => opt.handler(e));
          // if (e.target === document?.body) {
          //   opt.handler(e);
          // }
        });
      });
    });
    return () => {
      console.log('unmounted');
      keyboardJS.reset();
      // keyboardJS.stop();
      // opts.forEach(opt => {
      //   keyboardJS.unbind(opt.combo);
      // })
    };
  }, []);
};

export default useShortcuts;
