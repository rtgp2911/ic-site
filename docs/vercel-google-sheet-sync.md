# Synchronisation Google Sheet vers Vercel

Le site lit les donnees du Google Sheet pendant le build Vercel.

La commande de build Vercel est :

```bash
npm run fetch:all && npm run build
```

`fetch:all` recupere :

- les messages depuis la feuille principale `gid=1834025931`
- les series depuis la feuille `Séries` `gid=469438470`
- les episodes de series depuis la feuille `Vidéos Séries` `gid=487514081`

## Declencher un redeploy depuis Google Sheet

1. Dans Vercel, ouvrir le projet.
2. Aller dans `Settings` > `Git` > `Deploy Hooks`.
3. Creer un hook, par exemple `Google Sheet sync`, branche `main`.
4. Copier l'URL du hook.
5. Dans Google Sheet, aller dans `Extensions` > `Apps Script`.
6. Coller le contenu de `docs/google-sheet-vercel-webhook.gs`.
7. Remplacer `COLLER_ICI_URL_DEPLOY_HOOK_VERCEL` par l'URL du hook Vercel.
8. Enregistrer, puis recharger le Google Sheet.
9. Un menu `Ivan Carluer` apparaitra dans le Sheet avec l'action `Redéployer le site`.

Quand le redeploy est lance, Vercel recharge le Google Sheet, regenere les fichiers JSON, reconstruit le site, puis Dorik affiche la version a jour via l'iframe.

