import { useState } from "react";

import {
  Grid,
  Avatar,
  Button,
  Link,
  Modal,
  Text,
  Row,
  Input,
  Spacer,
} from "@nextui-org/react";

//Styles
import styles from "@/styles/tasks.module.css";
import globals from "@/styles/globals.module.css";

//Utils
import format from "../../util/format";

// Contexto
import { useAppContext } from "../../context/profileContext";

//Components
import Layout from "../../components/Layout";

//Icons
import {
  MdMoreHoriz,
  MdOutlineModeEdit,
  MdDeleteForever,
} from "react-icons/md";

function Pop({ visible, closeHandler }) {
  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Llena el formulario para agregar una nueva tarea
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Row justify="space-between">
          <Input
            label="Titulo"
            bordered
            placeholder="Titulo de la tarea"
            width="100%"
          />
        </Row>
        <Row justify="space-between">
          <Input
            bordered
            label="Detalle"
            placeholder="Description de la tarea"
            width="100%"
          />
        </Row>
        <Spacer y={0.5} />
        <Row justify="space-between">
          <select className={styles.drops}>
            <option>Selecciona Un Objetivo</option>
            <option>Objetivo 1</option>
            <option>Objetivo 2</option>
            <option>Objetivo 3</option>
            <option>Otros</option>
          </select>
        </Row>
        <Spacer y={0.5} />
      </Modal.Body>
      <Modal.Footer>
        <Button auto color="error" onClick={closeHandler}>
          Cancelar
        </Button>
        <Button auto color="success" onClick={closeHandler}>
          Crear
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function Tareas({ tasks }) {
  //const { setVariableState } = useAppContext();
  const [visible, setVisible] = useState(false);
  const listTask = tasks.data;
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <Layout>
      <div className={`${styles.tasks}`}>
        {!!visible && <Pop visible={visible} closeHandler={closeHandler} />}
        <div className={styles.tasksHead}>
          <h3>Mis tareas</h3>
          <div className={styles.controls}>
            <Button.Group color="primary">
              <Button onClick={handler}>Nueva tarea</Button>
            </Button.Group>
          </div>
        </div>
        <div className={styles.taskList}>
          <div className={styles.rowTaskHead}>
            <div className={styles.largeField}>Titulo</div>
            <div className={styles.shortField}>Estado</div>
            <div className={styles.shortField}>Fecha de creación</div>
            <div className={styles.shortField}></div>
          </div>
          {listTask &&
            listTask?.map((item, key) => {
              const { _id, title, status, createdAt } = item;
              return (
                <div key={key} className={styles.rowTask}>
                  <div className={styles.largeField}>{title}</div>
                  <div className={styles.shortField}>
                    <Grid>
                      <Avatar
                        text=""
                        size="xs"
                        color={
                          (status === "pending" && "warning") ||
                          (status === "approved" && "success") ||
                          (status === "cancel" && "error")
                        }
                        textColor="white"
                      />
                    </Grid>
                  </div>
                  <div className={styles.shortField}>
                    {format("DD de MM de YYYY", createdAt, true)}
                  </div>
                  <div className={`${styles.shortField} ${styles.controlRow}`}>
                    <div className={styles.viewMore}>
                      <MdDeleteForever size="22px" />
                    </div>
                    <div className={styles.viewMore}>
                      <Link href={`/tareas/${_id}`}>
                        <a className={globals.link}>
                          <MdOutlineModeEdit size="22px" />
                        </a>
                      </Link>
                    </div>
                    <div className={styles.viewMore}>
                      <Link href={`/tareas/${_id}`}>
                        <a className={globals.link}>
                          <MdMoreHoriz size="22px" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`/api/tasks`, {
    method: "GET",
    headers: {
      "Content.Type": "application/json",
    },
  });

  const tasks = await res.json();

  return {
    props: { tasks },
  };
}
