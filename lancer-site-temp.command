#!/bin/zsh
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

cd "$(dirname "$0")" || exit 1

SITE_DIR="$(pwd)/out"
URL="http://127.0.0.1:3001/"

echo "Lancement du site Ivan Carluer depuis :"
echo "$SITE_DIR"
echo ""
echo "Adresse : $URL"
echo ""
echo "Garde cette fenêtre ouverte tant que tu testes le site."
echo ""

if [ ! -f "$SITE_DIR/index.html" ]; then
  echo "Le site statique est introuvable dans $SITE_DIR"
  echo "Demande à Codex de régénérer le site."
  read -k 1 "?Appuie sur une touche pour fermer."
  exit 1
fi

cd "$SITE_DIR" || exit 1

(sleep 3 && open "$URL") &
/usr/bin/python3 -m http.server 3001 --bind 127.0.0.1

echo ""
echo "Le serveur s'est arrêté."
read -k 1 "?Appuie sur une touche pour fermer."
