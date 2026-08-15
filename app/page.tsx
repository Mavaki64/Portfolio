import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section
        id="Home"
        className="flex min-h-screen w-full flex-col justify-start gap-10 px-4 pt-24 pb-12 min-[425px]:items-center md:h-screen md:flex-row md:items-center md:justify-around md:gap-8 md:px-4 md:pt-0 md:pb-0 lg:px-5"
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
        className="flex min-h-screen w-full flex-col items-start justify-start gap-8 px-4 pt-24 pb-12 md:gap-12 md:px-4 md:py-16 lg:px-5"
      >
        <h2 className="text-left font-title text-2xl font-bold">À propos</h2>

        {/* float-left dès md : le texte entoure l’image puis reprend toute la largeur */}
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

      <section id="Skills" className="w-full px-4 py-16 md:h-screen md:px-0 md:py-0">
        <h2 className="text-center font-title text-4xl font-bold">
          Compétences
        </h2>
        <p className="mt-4 text-center font-text text-lg md:mt-0">
          Je suis un développeur web front-end passionné par la création de
          sites web et d&apos;applications web.
        </p>
      </section>

      <section id="Projects" className="w-full px-4 py-16 md:h-screen md:px-0 md:py-0">
        <h2 className="text-center font-title text-4xl font-bold">Projets</h2>
        <p className="mt-4 text-center font-text text-lg md:mt-0">
          Je suis un développeur web front-end passionné par la création de
          sites web et d&apos;applications web.
        </p>
      </section>

      <section id="Parcours" className="w-full px-4 py-16 md:h-screen md:px-0 md:py-0">
        <h2 className="text-center font-title text-4xl font-bold">Parcours</h2>
        <p className="mt-4 text-center font-text text-lg md:mt-0">
          Je suis un développeur web front-end passionné par la création de
          sites web et d&apos;applications web.
        </p>
      </section>

      <section id="Contact" className="w-full px-4 py-16 md:h-screen md:px-0 md:py-0">
        <h2 className="text-center font-title text-4xl font-bold">Contact</h2>
        <p className="mt-4 text-center font-text text-lg md:mt-0">
          Je suis un développeur web front-end passionné par la création de
          sites web et d&apos;applications web.
        </p>
      </section>
    </>
  );
}
