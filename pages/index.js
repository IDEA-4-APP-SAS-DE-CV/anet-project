//Components
import Layout from "@/components/Layout";

//Styles
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <div className={styles.home}>
        <h1>Pantalla de inicio (Dashboard)</h1>
        <main>Esta secición muestra el contenido de cada categoría</main>
      </div>
    </Layout>
  );
}
