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
  echo "Le dossier out est introuvable."
  echo "Lance d'abord : STATIC_EXPORT=1 npm run build -- --no-lint"
  read -k 1 "?Appuie sur une touche pour fermer."
  exit 1
fi

if command -v python3 >/dev/null 2>&1; then
  PYTHON_BIN="$(command -v python3)"
elif command -v python >/dev/null 2>&1; then
  PYTHON_BIN="$(command -v python)"
else
  echo "Python est introuvable."
  read -k 1 "?Appuie sur une touche pour fermer."
  exit 1
fi

(sleep 5 && open "$URL") &
cd out || exit 1
"$PYTHON_BIN" -m http.server 3001 --bind 127.0.0.1

echo ""
echo "Le serveur s'est arrêté."
read -k 1 "?Appuie sur une touche pour fermer."
