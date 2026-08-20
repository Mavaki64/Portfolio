# Portfolio — Killian GAYEZ

Portfolio personnel de **Killian Gayez**, développeur front-end junior.  
Site one-page présentant mon profil, mes compétences, mes projets, mon parcours et un formulaire de contact fonctionnel.

**Démo en ligne :** [https://killian-gayez.insaity.fr](https://killian-gayez.insaity.fr)

---

## Aperçu

Ce projet a été conçu comme une vitrine professionnelle claire et soignée, avec une attention particulière portée à :

- l’**accessibilité** (navigation clavier, focus trap, labels, messages d’état),
- les **performances** (images optimisées, chargement différé, cache),
- le **SEO** (métadonnées, Open Graph, Twitter Card, sitemap),
- la **qualité du code** (TypeScript, tests unitaires et d’intégration).

---

## Fonctionnalités

### Sections

- **Accueil** — Présentation, photo et appels à l’action
- **À propos** — Présentation détaillée du profil
- **Compétences** — Stack technique et soft skills
- **Projets** — Carousel autoplay avec modale détaillée
- **Parcours** — Timeline formations et expériences
- **Contact** — Formulaire + liens sociaux

### Expérience utilisateur

- Navigation sidebar desktop / menu plein écran mobile
- Suivi de la section active au scroll (`IntersectionObserver`)
- Animations Motion avec respect de `prefers-reduced-motion`
- Modale projet avec focus trap et retour du focus à la fermeture
- Carousel projets avec autoplay, pause au survol et navigation manuelle

### Formulaire de contact

- Envoi via **Mailgun** (API EU)
- Validation côté client et serveur
- Rate limiting (3 envois / 15 min / IP)
- Honeypot anti-spam
- Messages de succès et d’erreur lisibles

---

## Stack technique

| Catégorie        | Technologies                          |
| ---------------- | ------------------------------------- |
| Framework        | [Next.js 16](https://nextjs.org/)     |
| UI               | [React 19](https://react.dev/)        |
| Langage          | [TypeScript](https://www.typescriptlang.org/) |
| Styles           | [Tailwind CSS 4](https://tailwindcss.com/) |
| Animations       | [Motion](https://motion.dev/)         |
| Icônes           | [Lucide React](https://lucide.dev/)   |
| Emails           | [Mailgun.js](https://www.mailgun.com/) |
| Tests            | Jest, React Testing Library           |
| Déploiement      | Docker, Coolify, Cloudflare           |

---

## Structure du projet

```
portfolio/
├── app/
│   ├── api/contact/     # Route API du formulaire de contact
│   ├── layout.tsx       # Layout global + métadonnées SEO
│   ├── page.tsx         # Page principale (sections)
│   ├── globals.css      # Styles globaux et tokens
│   ├── sitemap.ts       # Sitemap XML
│   └── manifest.ts      # Web App Manifest
├── components/          # Composants React (Nav, Hero, Carousel…)
├── lib/                 # Utilitaires serveur (rate-limit, mailgun)
├── public/              # Assets statiques (images, logos, icônes)
├── Dockerfile           # Image Docker de production
├── jest.config.ts       # Configuration Jest
└── next.config.ts       # Configuration Next.js
```

---

## Prérequis

- **Node.js** 20+
- **pnpm** 10+ (recommandé)

---

## Installation

```bash
git clone https://github.com/Mavaki64/portfolio.git
cd portfolio
pnpm install
```

---

## Variables d'environnement

Créer un fichier `.env` à la racine :

```env
# Public
NEXT_PUBLIC_APP_NAME=Portfolio - Killian GAYEZ
NEXT_PUBLIC_APP_URL=https://killian-gayez.insaity.fr

# Privé — Mailgun (endpoint EU)
NEXT_PRIVATE_MAILGUN_API_KEY=votre_cle_api
NEXT_PRIVATE_MAILGUN_DOMAIN=votre-domaine.mailgun.org
NEXT_PRIVATE_MAILGUN_URL=https://api.eu.mailgun.net
NEXT_PRIVATE_CONTACT_TO=votre@email.com
```

> Les variables préfixées par `NEXT_PRIVATE_` ne sont accessibles que côté serveur.

---

## Scripts disponibles

```bash
pnpm dev          # Serveur de développement (http://localhost:3000)
pnpm build        # Build de production
pnpm start        # Démarrer le serveur de production
pnpm lint         # Vérification ESLint
pnpm test         # Lancer les tests
pnpm test:watch   # Tests en mode watch
```

---

## Tests

Le projet inclut **31 tests** répartis en tests unitaires (lib, API, hooks) et tests d'intégration (composants).

### Lib & API

| Fichier | Type | Ce qui est testé |
| --- | --- | --- |
| `lib/rate-limit.test.ts` | Unitaire | Limitation de requêtes (3 max / 15 min) |
| `app/api/contact/route.test.ts` | Unitaire | Validation, honeypot, envoi Mailgun, erreurs 400/502/429 |

### Hooks

| Fichier | Type | Ce qui est testé |
| --- | --- | --- |
| `components/useFocusTrap.test.tsx` | Unitaire | Touche Escape, activation/désactivation du piège |

### Composants

| Fichier | Type | Ce qui est testé |
| --- | --- | --- |
| `components/Hero.test.tsx` | Intégration | Titre, liens d'action |
| `components/Nav.test.tsx` | Intégration | Navigation principale desktop |
| `components/CareerCard.test.tsx` | Intégration | Affichage type, titre, lieu, description |
| `components/Skill.test.tsx` | Intégration | Compétences techniques et soft skills |
| `components/ContactLink.test.tsx` | Intégration | Liens externes et fallback texte |
| `components/ProjectCard.test.tsx` | Intégration | Affichage projet, clic « Voir le projet » |
| `components/ProjectModal.test.tsx` | Intégration | Détails projet, fermeture, état fermé |
| `components/ProjectsCarousel.test.tsx` | Intégration | Affichage carousel et navigation |
| `components/SectionReveal.test.tsx` | Intégration | Rendu du contenu enfant |
| `components/ContactForm.test.tsx` | Intégration | Labels, succès et erreurs API |
| `components/LazyContactForm.test.tsx` | Intégration | Chargement différé du formulaire |
| `components/LazyProjectsCarousel.test.tsx` | Intégration | Chargement différé du carousel |

### Lancer les tests

```bash
pnpm test          # Exécution unique
pnpm test:watch    # Mode watch
```

---

## Déploiement Docker

Le projet inclut un `Dockerfile` multi-étapes prêt pour la production :

```bash
docker build -t portfolio .
docker run -p 3000:3000 --env-file .env portfolio
```

L’application écoute sur le port **3000**.

---

## Accessibilité & performance

Quelques choix techniques mis en place :

- Focus trap sur la modale projet et le menu mobile
- Sections focusables pour une navigation clavier cohérente
- Images servies en AVIF/WebP via `next/image`
- Chargement différé des sections lourdes (carousel, formulaire)
- Respect de `prefers-reduced-motion` pour les animations CSS et Motion
- Métadonnées SEO, Open Graph et Twitter Card configurées

---

## Projets présentés

- **ArgentBank** — Application bancaire React / Redux
- **724Event** — Débogage et tests d’un site événementiel React

Chaque projet dispose d’une modale détaillée avec mockup, stack et lien GitHub.

---

## Auteur

**Killian GAYEZ** — Développeur front-end junior

- Portfolio : [killian-gayez.insaity.fr](https://killian-gayez.insaity.fr)
- GitHub : [@Mavaki64](https://github.com/Mavaki64)
- LinkedIn : [Killian Gayez](https://www.linkedin.com/in/killian-gayez-9a1198287)
- Email : killiangayez@gmail.com

---

## Licence

Projet personnel — tous droits réservés.
