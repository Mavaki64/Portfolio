import Link from "next/link";
import Image from "next/image";
import Skill, { SoftSkill } from "@/components/Skill";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import CareerCard from "@/components/CareerCard";

type CareerItem = {
  id: number;
  type: "Formation" | "Expérience";
  title: string;
  description: string | null;
  date: string;
  location: string;
};

const career: CareerItem[] = [
  {
    id: 1,
    type: "Expérience",
    title: "Fondateur & Développeur web",
    description: null,
    date: "2025 - aujourd’hui",
    location: "Insaity",
  },
  {
    id: 2,
    type: "Formation",
    title: "Bac +3 - Titre RNCP38038",
    description: "Développeur concepteur logiciel",
    date: "A venir",
    location: "OpenClassrooms",
  },
  {
    id: 3,
    type: "Expérience",
    title: "Magasinier/Cariste",
    description: null,
    date: "2021 - aujourd’hui",
    location: "Sokoa",
  },
  {
    id: 4,
    type: "Formation",
    title: "Bac +2 - Titre RNCP38145",
    description: "Intégrateur web",
    date: "2025 - 2026",
    location: "OpenClassRooms",
  },
  {
    id: 5,
    type: "Expérience",
    title: "Agent de production",
    description: null,
    date: "2017 - 2021",
    location: "Epta France",
  },
  {
    id: 6,
    type: "Formation",
    title: "Bac pro SEN",
    description: "Systèmes électroniques et numériques",
    date: "2013 - 2016",
    location: "Lycée Ramirro Arrue",
  },
];

const projects: Project[] = [
  {
    id: 1,
    name: "Argent Bank",
    full_name: "ArgentBank - Application Bancaire",
    short_description:
      "ArgentBank est une application bancaire dont le front-end devait être intégré en React, avec une gestion sécurisée des utilisateurs et de leurs données.",
    mockup: "/projects/argentbank/Mockup.png",
    stack_logos: [
      "/projects/argentbank/js.png",
      "/projects/argentbank/react.png",
      "/projects/argentbank/redux.png",
      "/projects/argentbank/npm.png",
    ],
    description_full:
      "ArgentBank est une application bancaire dont le front-end devait être intégré en React, avec une gestion sécurisée des utilisateurs et de leurs données. L’objectif était de permettre à l’utilisateur de se connecter, d’accéder aux pages protégées et de modifier son pseudonyme grâce à des appels API. Le projet comprenait également la conception d’une documentation Swagger proposant de futures routes dédiées à la gestion des transactions. Ce projet m’a permis de distinguer la gestion des données partagées avec Redux de celle des états d’interface locaux avec React. J’ai également renforcé mes compétences en authentification, protection des routes et la gestion des erreurs côté client L’application livrée propose une interface responsive, une authentification fonctionnelle et une gestion centralisée des informations utilisateur. L’intégration respecte aussi les principes du green code afin de limiter les traitements et chargements inutiles. Le projet pourrait être enrichi par l’implémentation complète des transactions, des tests automatisés et une amélioration de l’accessibilité et des performances.",
    github_link: "https://github.com/Mavaki64/ArgentBank-Frontend/",
  },
  {
    id: 2,
    name: "724 Event",
    full_name: "724Event – Débug du site d'un client",
    short_description:
      "724events est un site événementiel développé en React dont plusieurs dysfonctionnements affectaient l’expérience utilisateur et la fiabilité générale.",
    mockup: "/projects/724event/mockup.png",
    stack_logos: [
      "/projects/724event/js.png",
      "/projects/724event/react.png",
      "/projects/724event/testing-library.svg",
      "/projects/724event/yarn.png",
    ],
    description_full:
      "724events est un site événementiel développé en React dont plusieurs dysfonctionnements affectaient l’expérience utilisateur et la fiabilité générale. Le projet visait à identifier puis corriger les anomalies à partir d’un code existant, tout en respectant les besoins du client. Il fallait également vérifier l’ensemble des fonctionnalités et prévenir l’apparition de nouvelles régressions. Ce projet m’a permis d’adopter une méthode de débogage structurée, fondée sur l’analyse de la console, l’exécution des tests et l’inspection du code. J’ai également renforcé mes compétences dans la rédaction de scénarios de recette et la création de tests unitaires pertinents. Les anomalies identifiées ont été corrigées jusqu’à l’obtention d’une application fonctionnelle conforme aux attentes du client. Un cahier de recette et une suite de tests unitaires ont été livrés afin de valider les principales fonctionnalités et de limiter les risques de régression. La qualité du projet pourrait être renforcée par davantage de tests d’intégration, l’automatisation des contrôles dans une chaîne d’intégration continue et un meilleur suivi des erreurs en production.",
    github_link: "https://github.com/Mavaki64/724Events",
  },
];

export default function Home() {
  return (
    <>
      <section
        id="Home"
        className="max-w-5xl flex min-h-screen w-full flex-col justify-start gap-10 px-4 pt-24 pb-12 min-[425px]:items-center md:h-screen md:flex-row md:items-center md:justify-around md:gap-8 md:px-4 md:pt-0 md:pb-0 lg:px-5"
      >
        <div className="flex flex-col items-start gap-5 min-[425px]:items-center md:items-start md:gap-8">
          <div className="flex flex-col items-start gap-2 min-[425px]:items-center md:items-start">
            <h1 className="font-title text-4xl font-bold text-center min-[375px]:text-5xl xl:text-7xl">
              Killian GAYEZ
            </h1>
            <h2 className="font-title text-center text-lg font-semibold min-[375px]:text-xl lg:text-xl xl:text-3xl after:mt-1 after:block after:h-[4px] after:w-20 after:bg-primary after:content-[''] min-[425px]:after:mx-auto md:after:mx-0 xl:after:w-30">
              Développeur Front-end Junior
            </h2>
          </div>

          <p className="max-w-sm text-left font-text text-base text-balance min-[375px]:text-xl min-[425px]:text-center md:text-left">
            Je crée des interfaces web simples, accessibles et centrées
            utilisateur.
          </p>

          <div className="flex flex-row flex-wrap items-start justify-start gap-3 min-[425px]:justify-center md:justify-start md:gap-4">
            <Link
              href="#Projects"
              className="border border-primary bg-primary/20 px-4 py-2 text-center font-text text-foreground"
            >
              Voir mes projets
            </Link>
            <Link
              href="#Contact"
              className="border border-foreground px-4 py-2 text-center font-text text-foreground"
            >
              Me contacter
            </Link>
          </div>

          <div className="mt-2 flex w-full justify-center md:hidden">
            <Image
              src="/home.jpg"
              alt="Killian GAYEZ"
              width={400}
              height={400}
              className="size-58 rounded-full object-cover min-[375px]:size-72"
              priority
            />
          </div>
        </div>

        <div className="hidden shrink-0 md:block">
          <Image
            src="/home.jpg"
            alt="Killian GAYEZ"
            className="rounded-full object-cover size-76 xl:size-88 2xl:size-96"
            width={400}
            height={400}
            priority
          />
        </div>
      </section>

      <section
        id="About"
        className="max-w-5xl flex min-h-screen w-full flex-col items-start justify-start gap-8 px-4 pt-24 pb-12 md:gap-12 lg:px-5"
      >
        <h2 className="text-left font-title text-2xl font-bold">À propos</h2>

        <div className="w-full font-text text-base leading-relaxed md:text-lg">
          <Image
            src="/about.jpeg"
            alt="Killian GAYEZ"
            width={380}
            height={380}
            className="mx-auto mb-8 block size-[280px] object-cover object-[0%_25%] min-[425px]:size-[320px] md:float-left md:mx-0 md:mb-4 md:mr-10 md:size-[380px]"
          />
          <div className="space-y-4 text-left">
            <p>
              Bonjour, je suis Killian Gayez, développeur Front-End, passionné
              par la conception d’applications robustes, fiables et rapides,
              avec une attention particulière portée aux performances, à la
              qualité du code et à la sécurité.
            </p>
            <p>
              Passionné par l’informatique depuis l’enfance, j’ai développé mes
              premiers sites et applications à l’âge de 14 ans, puis continué à
              apprendre et à expérimenter en autonomie. Après dix années dans
              l’industrie comme cariste et agent de production, j’ai décidé de
              professionnaliser cette passion en suivant une formation
              d’intégrateur web préparant au titre RNCP38145 de Développeur
              informatique. Cette reconversion me permet d’associer plusieurs
              années de pratique personnelle à la rigueur et au sens des
              priorités acquis dans l’industrie.
            </p>
            <p>
              Je développe principalement avec HTML/CSS, JavaScript, React, Next
              et Tailwind CSS, en m’appuyant sur Git pour versionner mes projets.
              Je possède également des compétences en développement Back-End
              avec PHP, Laravel et SQL, ce qui me permet de mieux comprendre le
              fonctionnement global d’une application. Mes principaux domaines
              de compétence sont l’intégration de maquettes, la création de
              composants React, la gestion des états et la communication avec
              des API.
            </p>
            <p>
              Face à un problème, je commence par effectuer des recherches, puis
              je le décompose sur papier et utilise, si nécessaire, des schémas
              simples pour visualiser les étapes de résolution. J’aborde les
              défis techniques avec calme, patience et méthode, dans une logique
              d’amélioration continue. Autonome mais attaché à l’entraide,
              j’apprécie particulièrement le travail en binôme ou au sein d’une
              petite équipe dynamique.
            </p>
            <p>
              Mon objectif est de me lancer en freelance afin d’accompagner les
              professionnels dans la création d’applications web et, à terme,
              mobiles, notamment pour répondre à leurs besoins métier. Je
              souhaite poursuivre ma spécialisation avec une formation
              professionnalisante en développement Back-End avec Symfony, puis
              évoluer progressivement vers l’architecture logicielle. Mon
              ambition est de proposer des solutions durables, performantes et
              réellement adaptées aux problématiques de mes clients.
            </p>
          </div>
        </div>
      </section>

      <section id="Skills" className="max-w-5xl w-full px-4 py-16 md:h-screen lg:px-5">
        <h2 className="text-left font-title text-2xl font-bold">Compétences</h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-12 md:flex-row md:items-start md:gap-8 md:gap-8">
          <div className="flex w-full flex-col items-center gap-4 md:flex-1">
            <h3 className="font-title text-lg font-semibold">Stack technique</h3>
            <div className="mx-auto grid grid-cols-2 justify-items-center gap-2 min-[425px]:grid-cols-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
              <Skill title="HTML5" logo="/skills/html.svg" alt="HTML" />
              <Skill title="CSS3" logo="/skills/css.svg" alt="CSS" />
              <Skill
                title="JavaScript"
                logo="/skills/javascript.svg"
                alt="JavaScript"
              />
              <Skill
                title="TypeScript"
                logo="/skills/typescript.svg"
                alt="TypeScript"
              />
              <Skill title="React" logo="/skills/react.svg" alt="React" />
              <Skill title="Next.js" logo="/skills/next.svg" alt="Next.js" />
              <Skill title="Sass" logo="/skills/sass.svg" alt="Sass" />
              <Skill title="Git" logo="/skills/git.svg" alt="Git" />
              <Skill title="PHP" logo="/skills/php.svg" alt="PHP" />
              <Skill title="Laravel" logo="/skills/laravel.svg" alt="Laravel" />
              <Skill title="SQL" logo="/skills/sql.svg" alt="SQL" />
              <Skill title="Python" logo="/skills/python.svg" alt="Python" />
            </div>
          </div>
          <div
            aria-hidden
            className="hidden w-px self-stretch bg-foreground/10 md:block"
          />
          <div className="hidden w-full flex-col items-center gap-4 min-[425px]:flex md:flex-1">
            <h3 className="font-title text-lg font-semibold">Soft skills</h3>
            <div className="mx-auto grid grid-cols-2 justify-items-center gap-2 min-[425px]:grid-cols-3 sm:gap-4">
              <SoftSkill title="Rigueur" />
              <SoftSkill title="Autonomie" />
              <SoftSkill title="Adaptabilité" />
              <SoftSkill title="Persévérance" />
              <SoftSkill title="Organisation" />
              <SoftSkill title="Curiosité" />
              <SoftSkill title="Fiabilité" />
              <SoftSkill title="Pédagogie" />
              <SoftSkill title="Résilience" />
            </div>
          </div>
        </div>
      </section>

      <section id="Projects" className="max-w-5xl w-full px-4 py-16 md:h-screen lg:px-5">
        <h2 className="text-left font-title text-2xl font-bold">Projets</h2>
        <div className="mt-8 grid grid-cols-1 justify-items-center gap-6 md:grid-cols-3 md:justify-items-stretch md:gap-4 lg:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section id="Parcours" className="max-w-5xl w-full px-4 py-16 lg:px-5">
        <h2 className="text-left font-title text-2xl font-bold">Parcours</h2>

        <div className="relative mt-8">
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[5px] w-px bg-foreground/10 md:left-1/2 md:-translate-x-1/2"
          />
          <ol className="flex flex-col gap-8 md:gap-12">
            {career.map((item) => {
              const isLeft = item.type === "Formation";
              return (
                <li
                  key={item.id}
                  className="md:grid md:grid-cols-2"
                >
                  <div
                    className={
                      isLeft
                        ? "md:col-start-1 md:-mr-1.5"
                        : "md:col-start-2 md:-ml-1.5"
                    }
                  >
                    <CareerCard
                      type={item.type}
                      title={item.title}
                      description={item.description}
                      date={item.date}
                      location={item.location}
                      orientation={isLeft ? "left" : "right"}
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section id="Contact" className="max-w-5xl w-full px-4 py-16 md:h-screen lg:px-5">
      <h2 className="text-left font-title text-2xl font-bold">Contact</h2>
      </section>
    </>
  );
}
