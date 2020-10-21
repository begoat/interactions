import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'rsuite';
import InteractionModal from './InteractionModal';
import getContainerDOM from './getContainerDOM';
import { isFunction } from './utils';

function PromptModal({ message, defaultResult = '', onOk, ...props }) {

  const [result, setResult] = useState(defaultResult);

  const handleOk = useCallback(() => onOk(result), [onOk, result]);

  return (
    <InteractionModal
      {...props}
      onOk={handleOk}
    >
      {message}
      <Input
        autoFocus
        value={result}
        onChange={value => setResult(value)}
        style={{ marginTop: 10 }}
      />
    </InteractionModal>
  );
}

export default function prompt(message, _default, modalConfig) {
  return new Promise(resolve => {
    ReactDOM.render(
      <PromptModal
        key={Date.now()}
        message={message}
        defaultResult={_default}
        canCancelOnLoading={!!modalConfig?.onCancel}
        {...modalConfig}
        onOk={async (...args) => {
          let result;
          if (modalConfig && isFunction(modalConfig.onOk)) {
            try {
              result = await modalConfig.onOk(...args);
            } catch (e) {
              result = false;
            }
          }
          resolve(...args);

          return result;
        }}
        onCancel={async isSubmitLoading => {
          if (modalConfig && isFunction(modalConfig.onCancel)) {
            try {
              await modalConfig.onCancel(isSubmitLoading);
            } catch (e) {
              console.log('e', e);
            }
          }
          resolve(null);
        }}
      />,
      getContainerDOM()
    );
  });
}
