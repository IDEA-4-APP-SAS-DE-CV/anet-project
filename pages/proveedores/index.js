//import clientPromise from "util/mongodb";

//Components
import Layout from "../../components/Layout";

//Styles
import styles from "@/styles/proveedores.module.css";

export default function Proveedores() {
  return (
    <Layout>
      <div className={styles.providers}>
        <h1>Proveedores</h1>
        <h4>Lista de proveedores</h4>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  return {
    props: {},
  };
}
