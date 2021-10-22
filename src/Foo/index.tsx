import React, { useState } from 'react';
import Modal1 from '../Modal1';
// import Modal1 from '@/Modal1';

export default ({ title }: { title: string }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Modal1 visible={visible}>1111</Modal1>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        toggle
      </button>
      <h1>{title}</h1>
    </>
  );
};
