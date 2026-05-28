import Image from "next/image";
import IFrame from "@/components/IFrame";
import styles from "./page.module.css";

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
            <a
              href="https://nsan.dev"
              rel="noopener noreferrer"
            >
              click here
            </a>
          </p>
        </div>

        <section className={styles.previewSection}>
          <h2>Sagitario Alpha</h2>
          <IFrame
            title="Sagitar.io single player"
            src="/bundles/sagitario/index.html"
            height={380}
          />
        </section>

        <hr />
        
        <section className={styles.previewSection}>
          <h2>Sagitar.io single-player bundle</h2>
          <p>
            Version estatica para portfolio: funciona sin backend y se puede
            desplegar directo en Vercel.
          </p>
          <IFrame
            title="Sagitar.io single player"
            src="/bundles/sagitar-io/index.html"
            height={440}
          />
        </section>

        <hr />

        <section className={styles.previewSection}>
          <h2>Astrohooks</h2>
          <IFrame
            title="Astrohooks home"
            src="/bundles/astrohooks/index.html"
            height={520}
          />
        </section>
      </main>
    </div>
  );
}
