import React from 'react';
import ReactDOM from 'react-dom';
import InteractionModal from './InteractionModal';
import getContainerDOM from './getContainerDOM';
import { isFunction } from './utils';

export default function confirm(message, modalConfig) {
  return new Promise(resolve => {
    ReactDOM.render(
      <InteractionModal
        key={Date.now()}
        canCancelOnLoading={!!modalConfig?.onCancel}
        {...modalConfig}
        onOk={async () => {
          let result;
          if (modalConfig && isFunction(modalConfig.onOk)) {
            try {
              result = await modalConfig.onOk();
            } catch (e) {
              result = false;
            }
          }
          resolve(true);

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
          resolve(false);
        }}
      >
        {message}
      </InteractionModal>,
      getContainerDOM()
    );
  });
}
