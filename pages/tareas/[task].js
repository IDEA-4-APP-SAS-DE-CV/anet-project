import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Link, Button, Grid, Avatar } from "@nextui-org/react";

import styles from "@/styles/tasks.module.css";

//Components
import Layout from "components/Layout";

//Utils
import format from "../../util/format";

export default function Tarea({ data }) {
  const task = data.data[0];

  console.log({ task });
  return (
    <Layout>
      <div className={styles.tasks}>
        <div className={styles.containerDetailTask}>
          <>
            <p className={styles.title}>
              {task?.name} {task?.lastName}
            </p>
            <div className={styles.controls}>
              <span className={styles.smallStrong}>
                Fecha de creación:{" "}
                {format("DD de MM de YYYY", task?.createdAt, true)}
              </span>
              <br />
              <span
                className={
                  (task?.status === "pending" && styles.pending) ||
                  (task?.status === "approved" && styles.success) ||
                  (task?.status === "cancel" && styles.cancel)
                }
                style={{ fontWeight: 600 }}
              >
                Estado:{" "}
                {(task?.status === "pending" && "Pendiente") ||
                  (task?.status === "approved" && "Aprobado") ||
                  (task?.status === "cancel" && "Cancelado")}
              </span>
            </div>
          </>
          <div className={styles.taskDetail}>{task?.description}</div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const taskId = context.query.task;
  const res = await fetch(`/api/tasks?id=${taskId}`);
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
