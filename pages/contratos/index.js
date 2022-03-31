import { useState } from "react";
import {
  Button,
  Grid,
  Avatar,
  Modal,
  Checkbox,
  Text,
  Row,
} from "@nextui-org/react";

import Link from "next/link";

//Components
import Layout from "../../components/Layout";

//Styles
import styles from "@/styles/contratos.module.css";

//Utils
import format from "../../util/format";

//Icons
import {
  MdMoreHoriz,
  MdOutlineModeEdit,
  MdDeleteForever,
} from "react-icons/md";

function deleteContract(_id) {
  console.log({ idContract });
}

function Pop({ visible, closeHandler, idContract }) {
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
          ¿Estas seguro de querer borrar este contrato?
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Row justify="space-between"></Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={closeHandler}>
          Cancelar
        </Button>
        <Button
          auto
          onClick={() => {
            //closeHandler()
            deleteContract(idContract);
          }}
        >
          Borrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function Contracts({ contracts }) {
  const [visible, setVisible] = useState(false);
  const contrato = contracts.data;
  console.log({ contracts });
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <Layout>
      <div className={styles.contracts}>
        {!!visible && (
          <Pop
            visible={visible}
            closeHandler={closeHandler}
            idContract={contrato._id}
          />
        )}
        <div className={styles.headContracts}>
          <p className={styles.title}>Mis contratos</p>
          <div className={styles.controls}>
            <Button.Group color="primary" ghost>
              <Link href="/nuevo-contrato">
                <a>
                  <Button>Nuevo contrato</Button>
                </a>
              </Link>
            </Button.Group>
          </div>
        </div>
        <div className={styles.contratosList}>
          <div className={styles.rowContractHead}>
            <div className={styles.largeField}>Titulo</div>
            <div className={styles.shortField}>Estado</div>
            <div className={styles.shortField}>Fecha de creación</div>
            <div className={styles.shortField}></div>
          </div>
          {contracts &&
            contracts?.data?.map((item, key) => {
              console.log({ item });
              const { _id, name, status, createdAt } = item;
              return (
                <div key={key} className={styles.rowContract}>
                  <div className={styles.largeField}>{name}</div>
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
                    <div
                      className={styles.viewMore}
                      onClick={() => deleteContract(_id)}
                    >
                      <MdDeleteForever size="22px" />
                    </div>
                    <div className={styles.viewMore}>
                      <Link href={`/contratos/edicion/${_id}`}>
                        <a>
                          <MdOutlineModeEdit size="22px" />
                        </a>
                      </Link>
                    </div>
                    <div className={styles.viewMore}>
                      <Link href={`/contratos/${_id}`}>
                        <a>
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
  const res = await fetch("http://localhost:3000/api/contracts", {
    method: "GET",
    headers: {
      "Content.Type": "application/json",
    },
  });

  const contracts = await res.json();

  return {
    props: { contracts },
  };
}
