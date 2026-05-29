import Image from "next/image";
import styles from "./page.module.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SectionTabs from "@/components/SectionTabs";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.langCorner}>
        <LanguageSwitcher />
      </div>

      <main className={styles.main}>
        <div className={styles.intro}>
          <Image src="/favicon.ico" alt="logo" width={150} height={150} />
          <h1>{" S. M. Nicolás | n'sande | Nikos90"}</h1>
        </div>

        <SectionTabs />

      </main>
    </div>
  );
}
