//Components
import Layout from "@/components/Layout";

//Styles
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <div className={styles.home}>
        <h1>Home</h1>
        <main>Contenido de Home</main>
      </div>
    </Layout>
  );
}
