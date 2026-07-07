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

## Automatisation principale

Le bouton manuel reste disponible comme solution de secours, mais le flux recommande est automatique :

1. Le script de veille detecte une nouvelle video.
2. Il analyse, trie et categorise la video.
3. Il ecrit les donnees dans les feuilles Google Sheet concernees :
   - `Messages`
   - `Séries`
   - `Vidéos Séries`
4. Le script Apps Script declenche automatiquement le Deploy Hook Vercel.
5. Vercel lance `npm run fetch:all && npm run build`.

Le fichier `docs/google-sheet-vercel-webhook.gs` contient maintenant :

- un bouton manuel `Redéployer le site`, conserve comme secours ;
- une action `Activer la synchronisation automatique`, a lancer une seule fois dans Google Sheet ;
- un declencheur automatique qui surveille les feuilles suivies ;
- un delai de deux minutes avant redeploiement, pour eviter de lancer plusieurs builds pendant que le script ecrit dans les trois feuilles.

Si le script qui detecte et analyse les videos est aussi dans Apps Script, ajoute simplement cette ligne a la toute fin, apres l'ecriture des trois feuilles :

```js
redeployAfterSheetWrite('Nouvelles videos ajoutees au Google Sheet');
```

Cette approche est la plus fiable, car elle attend que l'analyse et l'ecriture soient terminees avant de lancer Vercel.

Si les donnees sont modifiees directement dans le Google Sheet, le declencheur automatique installe via `Activer la synchronisation automatique` prendra le relais.
