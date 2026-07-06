export const themeDescriptions = {
  "Église":
    "L'Église est bien plus qu'un bâtiment ou une organisation : elle est une famille appelée à vivre l'Évangile ensemble. Découvrez les messages d'Ivan Carluer consacrés à sa mission, son unité et son rôle dans le monde.",
  "Épreuves":
    "Les épreuves font partie du chemin de la foi et peuvent devenir des lieux de croissance. Retrouvez des enseignements pour traverser les saisons difficiles avec espérance et confiance en Dieu.",
  "Famille":
    "La famille est l'un des premiers lieux où s'expriment l'amour, le pardon et la transmission. Explorez des messages sur les relations familiales à la lumière de la Bible.",
  "Foi":
    "La foi transforme notre manière de voir Dieu, les autres et notre propre vie. Retrouvez des enseignements pour grandir dans une confiance toujours plus profonde en Jésus-Christ.",
  "Grâce":
    "La grâce est au cœur de l'Évangile : un amour offert, immérité et transformateur. Découvrez des messages qui révèlent la profondeur de la grâce de Dieu dans notre quotidien.",
  "Identité":
    "Notre identité ne se construit pas sur nos performances mais sur ce que Dieu dit de nous. Explorez des enseignements pour mieux comprendre qui vous êtes en Christ.",
  "Leadership":
    "Le leadership biblique est avant tout une manière de servir et d'inspirer les autres. Retrouvez des messages sur la responsabilité, l'humilité et l'influence selon l'Évangile.",
  "Mission":
    "Chaque croyant est appelé à participer à la mission de Dieu dans le monde. Découvrez des enseignements qui encouragent à vivre sa foi avec courage et intention.",
  "Prière":
    "La prière est une relation vivante avec Dieu, bien plus qu'une simple pratique. Retrouvez des messages pour approfondir votre vie de prière et apprendre à écouter Dieu.",
  "Relations":
    "Nos relations façonnent profondément notre vie et notre témoignage. Explorez des enseignements sur l'amour, le pardon, l'amitié, le couple et la vie en communauté.",
  "Saint-Esprit":
    "Le Saint-Esprit accompagne, transforme et équipe chaque croyant au quotidien. Découvrez des messages pour mieux comprendre son œuvre et apprendre à marcher avec lui.",
  "Transformation":
    "Dieu ne nous laisse jamais là où il nous trouve : il nous transforme progressivement à l'image de Jésus. Retrouvez des enseignements sur le changement intérieur, la croissance spirituelle et la nouvelle vie en Christ.",
  "Autre":
    "Cette catégorie rassemble les messages qui ne relèvent pas d'un thème spécifique ou qui abordent plusieurs sujets à la fois. Vous y trouverez des enseignements variés qui complètent l'ensemble des ressources proposées sur le site."
} as const;

export type ThemeName = keyof typeof themeDescriptions;

const themeImageByName: Record<ThemeName, string> = {
  "Église": "eglise.png",
  "Épreuves": "epreuves.png",
  "Famille": "famille.png",
  "Foi": "foi.png",
  "Grâce": "grace.png",
  "Identité": "identite.png",
  "Leadership": "leadership.jpg",
  "Mission": "mission.png",
  "Prière": "priere.png",
  "Relations": "relations.png",
  "Saint-Esprit": "saint-esprit.png",
  "Transformation": "transformation.png",
  "Autre": "autre.png"
};

export function slugifyTheme(theme: string) {
  return theme
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const themeEntries = Object.entries(themeDescriptions).map(([name, description]) => ({
  name: name as ThemeName,
  description,
  slug: slugifyTheme(name),
  image: `/images/themes/${themeImageByName[name as ThemeName]}`
}));

export function getThemeBySlug(slug: string) {
  return themeEntries.find((theme) => theme.slug === slug);
}
