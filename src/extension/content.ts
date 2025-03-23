import { IScriptItem, UiEvent } from '../types';

function execute(code: string) {
  const script = document.createElement('script');
  document.documentElement.appendChild(script);
  // Use Promise to delay execution and ensure that script.remove(); is executed first, so that the script itself will not be read when reading the content of document.body
  script.innerHTML = `
    (new Promise((resolve, reject) => {
      resolve()
    })).then(() => {
      ${code}
    })
  `;
  script.remove();
}

chrome.storage.local.get(
  ['scripts'],
  (result: { scripts?: Array<IScriptItem> }) => {
    if (result.scripts) {
      result.scripts.forEach((scriptItem) => {
        if (scriptItem.autoExecute && scriptItem.code) {
          execute(scriptItem.code);
        }
      });
    }
  },
);

chrome.runtime.onMessage.addListener((
  event: { type: UiEvent; code: string; },
  sender,
  sendResponse,
) => {
  switch (event.type) {
    case UiEvent.EMIT_CODE:
      // Execute custom script
      execute(event.code);
      sendResponse('ok');
      break;
    default:
  }
});
