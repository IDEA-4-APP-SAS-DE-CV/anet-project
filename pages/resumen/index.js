import { useState } from "react";

//Styles
import styles from "@/styles/resumen.module.css";

//Utils
import format from "../../util/format";

// Contexto
import { useAppContext } from "../../context/profileContext";

//Components
import Layout from "../../components/Layout";

export default function Tareas({ tasks }) {
  //const { setVariableState } = useAppContext();
  return (
    <Layout>
      <div className={`${styles.tasks}`}>REsumen</div>
    </Layout>
  );
}
