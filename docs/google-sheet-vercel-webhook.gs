const VERCEL_DEPLOY_HOOK_URL = 'COLLER_ICI_URL_DEPLOY_HOOK_VERCEL';

const WATCHED_SHEET_NAMES = [
  'Messages',
  'messages',
  'Séries',
  'Series',
  'Vidéos Séries',
  'Videos Séries',
  'Vidéos Series',
  'Videos Series'
];

const REDEPLOY_DELAY_MS = 2 * 60 * 1000;
const SIGNATURE_KEY = 'ivanCarluerWatchedSheetsSignature';
const PENDING_SOURCE_KEY = 'ivanCarluerPendingRedeploySource';
const PENDING_AT_KEY = 'ivanCarluerPendingRedeployAt';
const PENDING_TRIGGER_HANDLER = 'runPendingIvanCarluerRedeploy';

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Ivan Carluer')
    .addItem('Activer la synchronisation automatique', 'installIvanCarluerAutoRedeploy')
    .addItem('Redéployer le site', 'redeployIvanCarluerSite')
    .addToUi();
}

function installIvanCarluerAutoRedeploy() {
  const spreadsheet = SpreadsheetApp.getActive();
  const hasTrigger = ScriptApp.getProjectTriggers().some((trigger) => (
    trigger.getHandlerFunction() === 'handleIvanCarluerSheetChange'
  ));

  if (!hasTrigger) {
    ScriptApp.newTrigger('handleIvanCarluerSheetChange')
      .forSpreadsheet(spreadsheet)
      .onChange()
      .create();
  }

  PropertiesService.getDocumentProperties().setProperty(
    SIGNATURE_KEY,
    buildWatchedSheetsSignature_()
  );

  SpreadsheetApp.getUi().alert(
    'Synchronisation automatique activée. Quand une feuille suivie change, un redeploy Vercel sera déclenché après un court délai.'
  );
}

function handleIvanCarluerSheetChange() {
  const signature = buildWatchedSheetsSignature_();
  const properties = PropertiesService.getDocumentProperties();
  const previousSignature = properties.getProperty(SIGNATURE_KEY);

  if (signature === previousSignature) {
    return;
  }

  properties.setProperty(SIGNATURE_KEY, signature);
  queueIvanCarluerRedeploy_('Modification détectée dans le Google Sheet');
}

function redeployAfterSheetWrite(source) {
  queueIvanCarluerRedeploy_(source || 'Écriture terminée dans le Google Sheet');
}

function redeployIvanCarluerSite() {
  const result = callVercelDeployHook_('Redéploiement manuel depuis Google Sheet');
  SpreadsheetApp.getUi().alert(result.message);
}

function runPendingIvanCarluerRedeploy() {
  const properties = PropertiesService.getDocumentProperties();
  const source = properties.getProperty(PENDING_SOURCE_KEY) || 'Synchronisation automatique Google Sheet';

  clearPendingRedeployTriggers_();
  properties.deleteProperty(PENDING_SOURCE_KEY);
  properties.deleteProperty(PENDING_AT_KEY);

  callVercelDeployHook_(source);
}

function queueIvanCarluerRedeploy_(source) {
  assertDeployHookConfigured_();

  const lock = LockService.getDocumentLock();
  lock.waitLock(10000);

  try {
    const properties = PropertiesService.getDocumentProperties();
    properties.setProperty(PENDING_SOURCE_KEY, source);
    properties.setProperty(PENDING_AT_KEY, new Date().toISOString());

    clearPendingRedeployTriggers_();

    ScriptApp.newTrigger(PENDING_TRIGGER_HANDLER)
      .timeBased()
      .after(REDEPLOY_DELAY_MS)
      .create();
  } finally {
    lock.releaseLock();
  }
}

function callVercelDeployHook_(source) {
  assertDeployHookConfigured_();

  const response = UrlFetchApp.fetch(VERCEL_DEPLOY_HOOK_URL, {
    method: 'post',
    muteHttpExceptions: true,
    payload: JSON.stringify({ source }),
    contentType: 'application/json'
  });

  const code = response.getResponseCode();
  const ok = code >= 200 && code < 300;

  return {
    ok,
    code,
    message: ok
      ? 'Redeploy Vercel déclenché. Les données seront mises à jour après le build.'
      : `Vercel a répondu avec le code ${code}. Vérifie l’URL du Deploy Hook.`
  };
}

function buildWatchedSheetsSignature_() {
  const spreadsheet = SpreadsheetApp.getActive();

  return spreadsheet.getSheets()
    .filter((sheet) => WATCHED_SHEET_NAMES.includes(sheet.getName()))
    .map((sheet) => {
      const lastRow = sheet.getLastRow();
      const lastColumn = sheet.getLastColumn();
      const lastRowValues = lastRow > 0 && lastColumn > 0
        ? sheet.getRange(lastRow, 1, 1, lastColumn).getDisplayValues()[0].join('|')
        : '';

      return [
        sheet.getSheetId(),
        sheet.getName(),
        lastRow,
        lastColumn,
        lastRowValues
      ].join('::');
    })
    .join('\n');
}

function clearPendingRedeployTriggers_() {
  ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === PENDING_TRIGGER_HANDLER)
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));
}

function assertDeployHookConfigured_() {
  if (!VERCEL_DEPLOY_HOOK_URL || VERCEL_DEPLOY_HOOK_URL.includes('COLLER_ICI')) {
    throw new Error('Ajoute d’abord l’URL du Deploy Hook Vercel dans VERCEL_DEPLOY_HOOK_URL.');
  }
}
