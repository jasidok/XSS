import { js } from 'js-beautify';
import { Base64 } from 'js-base64';
import { IScriptItem, MenuItemId } from '../types';

/**
 * Plug-in permanent background program
 * background.js will only fire once after opening chrome
 */

// Export all scripts
function exportScripts() {
  chrome.storage.local.get(
    ['scripts'], (result: { scripts?: Array<IScriptItem> }) => {
      const scriptsData = JSON.stringify(result.scripts);
      // Save as file
      const url = `data:application/json;base64,${Base64.encode(scriptsData)}`;
      chrome.downloads.download({
        url,
        filename: 'scripts.json',
      });
    },
  );
}

// Main Menu Settings - When installing plugins
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MenuItemId.ABOUT_XSS,
    title: 'About XSS',
    contexts: ['browser_action'],
  });
  chrome.contextMenus.create({
    id: MenuItemId.EXPORT_SCRIPTS,
    title: 'Export Scripts',
    contexts: ['browser_action'],
  });
  // Plug in presets script example
  const scripts: Array<IScriptItem> = [
    {
      title: 'Inject Jquery',
      autoExecute: false,
      code: js(`
        var script = document.createElement('script');
        document.documentElement.appendChild(script);
        script.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
      `, { indent_size: 2 }),
    }, {
      title: 'Get Cookie',
      autoExecute: false,
      code: js(`
        function getCookie() {
          if (document.cookie.length > 0) {
            const cookies = document.cookie.split(';');
            if (cookies.length > 0) {
              return cookies.reduce((obj, text) => {
                const fragment = text.split('=');
                if (fragment.length > 1) {
                  return Object.assign(obj, {
                    [fragment[0]]: unescape(fragment.splice(1).join('')),
                  });
                }
                return obj;
              }, {});
            }
          }
          return {};
        }
        alert(JSON.stringify(getCookie(), null, 2));
      `, { indent_size: 2 }),
    },
  ];
  chrome.storage.local.get(
    ['scripts'],
    (result: { scripts?: Array<IScriptItem> }) => {
      if (!result.scripts) {
        void chrome.storage.local.set({ scripts });
      }
    },
  );
});

// When you click on the Customize menu
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === MenuItemId.ABOUT_XSS) {
    void chrome.tabs.create({
      url: 'https://github.com/totofish/XSS',
    });
  } else if (info.menuItemId === MenuItemId.EXPORT_SCRIPTS) {
    exportScripts();
  }
});

chrome.runtime.onMessage.addListener((event: { type: MenuItemId; }, sender, sendResponse) => {
  switch (event.type) {
    case MenuItemId.EXPORT_SCRIPTS:
      exportScripts();
      sendResponse('ok');
      break;
    default:
  }
});
