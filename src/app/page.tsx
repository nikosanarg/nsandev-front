import Image from "next/image";
import styles from "./page.module.css";
import LandingSection from "@/components/LandingSection";
import HorizontalSeparator from "@/components/HorizontalSeparator";
import SectionTabs from "@/components/SectionTabs";
import VideoEmbed from "@/components/VideoEmbed";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <Image src="/favicon.ico" alt="logo" width={150} height={150} />
          <h1>
            {" S. M. Nicolás' portfolio"}</h1>
          <p>
            If you wanna know how a self-reference works{" "}
            <a href="https://nsan.dev" rel="noopener noreferrer">
              click here
            </a>
          </p>
        </div>

        <HorizontalSeparator />

        <SectionTabs>
          <LandingSection
            title="Dale Aceptar 2013"
            description='Gameplay de "JodaloK", un juego que hice con Alice para Dale Aceptar 2013, concurso de programacion de La Nacion. Gane la categoria individual avanzado en mi ultimo ano de secundaria.'
          >
            <VideoEmbed
              title="Dale Aceptar 2013 - JodaloK gameplay"
              videoId="rAozYkxoGSo"
            />
          </LandingSection>

          <HorizontalSeparator />

          <LandingSection
            title="Charla A/B"
            description="Fue una charla que dimos sobre experimentos A/B para SantanDev, el evento de divulgacion en tecnologia y programacion organizado por Santander en 2022."
          >
            <VideoEmbed
              title="SantanDev 2022 - Charla sobre experimentos A/B"
              videoId="Yxdsu-RWsPc"
            />
          </LandingSection>

          <HorizontalSeparator />

          <LandingSection title="Sagitar.io" />

          <HorizontalSeparator />

          <LandingSection
            title="Astrohooks"
            src="/bundles/astrohooks/index.html"
            height={520}
          />
        </SectionTabs>

      </main>
    </div>
  );
}
