import Image from "next/image";
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
      </main>
    </div>
  );
}
