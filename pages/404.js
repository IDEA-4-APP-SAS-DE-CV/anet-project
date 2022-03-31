import Link from "next/link";

//Components
import Layout from "@/components/Layout";

//Styles
import styles from "@/styles/404.module.css";

//Icons
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <Layout title="Pagina no encontrada">
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle /> 404
        </h1>
        <p>Sorry, Esta página no existe</p>
        <Link href="/">Volver al inicio</Link>
      </div>
    </Layout>
  );
}
