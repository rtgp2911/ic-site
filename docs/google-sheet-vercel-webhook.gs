const VERCEL_DEPLOY_HOOK_URL = 'COLLER_ICI_URL_DEPLOY_HOOK_VERCEL';

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Ivan Carluer')
    .addItem('Redéployer le site', 'redeployIvanCarluerSite')
    .addToUi();
}

function redeployIvanCarluerSite() {
  if (!VERCEL_DEPLOY_HOOK_URL || VERCEL_DEPLOY_HOOK_URL.includes('COLLER_ICI')) {
    SpreadsheetApp.getUi().alert('Ajoute d’abord l’URL du Deploy Hook Vercel dans le script.');
    return;
  }

  const response = UrlFetchApp.fetch(VERCEL_DEPLOY_HOOK_URL, {
    method: 'post',
    muteHttpExceptions: true
  });

  const code = response.getResponseCode();
  const message = code >= 200 && code < 300
    ? 'Redeploy Vercel déclenché. Les données seront mises à jour après le build.'
    : `Vercel a répondu avec le code ${code}. Vérifie l’URL du Deploy Hook.`;

  SpreadsheetApp.getUi().alert(message);
}
