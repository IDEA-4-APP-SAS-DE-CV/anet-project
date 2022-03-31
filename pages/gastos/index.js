//import clientPromise from "util/mongodb";

//Components
import Layout from "../../components/Layout";

//Styles
import styles from "@/styles/gastos.module.css";

export default function Gastos() {
  return (
    <Layout>
      <div className={styles.gastos}>
        <h1>Gastos</h1>
        <h4>Lista de gastos</h4>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  return {
    props: {},
  };
}
