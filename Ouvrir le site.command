#!/bin/zsh
cd "$(dirname "$0")" || exit 1

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

URL="http://127.0.0.1:3001"

echo "Lancement du site Ivan Carluer..."
echo "Adresse : $URL"
echo ""
echo "Garde cette fenêtre ouverte tant que tu testes le site."
echo ""

if [ ! -d "out" ]; then
  echo "Le dossier statique out est introuvable."
  echo "Ouvre plutôt le Terminal et lance :"
  echo "cd /Users/Rose-Alice/Documents/Codex/2026-07-03/on"
  echo "STATIC_EXPORT=1 npm run build -- --no-lint"
  echo ""
  read -k 1 "?Appuie sur une touche pour fermer."
  exit 1
fi

if command -v python3 >/dev/null 2>&1; then
  PYTHON_BIN="$(command -v python3)"
elif command -v python >/dev/null 2>&1; then
  PYTHON_BIN="$(command -v python)"
else
  echo "Impossible de trouver Python pour ouvrir le site statique."
  read -k 1 "?Appuie sur une touche pour fermer."
  exit 1
fi

(sleep 5 && open "$URL") &
cd out || exit 1
"$PYTHON_BIN" -m http.server 3001 --bind 127.0.0.1

echo ""
echo "Le serveur s'est arrêté."
read -k 1 "?Appuie sur une touche pour fermer."
