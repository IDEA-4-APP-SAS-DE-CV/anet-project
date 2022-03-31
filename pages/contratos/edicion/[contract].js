import { useState } from "react";
import Image from "next/image";
import { Button, Modal, Row, Text, Textarea, Spacer } from "@nextui-org/react";

import { app } from "../../../util/firebaseConfig";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";

import styles from "@/styles/editContract.module.css";

//Components
import Layout from "../../../components/Layout";

//contextProfile
import { useAppContext } from "../../../context/profileContext";

function Pop({ visible, closeHandler, setComments, comments, addComment }) {
  return (
    <Modal
      closeButton
      blur
      preventClose
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={20}>
          Agrega un comentario
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Row justify="space-between">
          <Textarea
            label=""
            helperText=""
            placeholder="Introduce aquí tu comentario"
            css={{ width: "100%" }}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </Row>
      </Modal.Body>
      <Spacer y={1} />
      <Modal.Footer>
        <Button
          auto
          color="error"
          onClick={() => {
            setComments("");
          }}
        >
          Borrar
        </Button>
        <Button
          auto
          color="success"
          onClick={() => {
            closeHandler();
            addComment();
          }}
        >
          Enviar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function EditContract({ data }) {
  const { variableState, setVariableState } = useAppContext();
  const CONTRACT = data.data?.[0];
  console.log({ CONTRACT });

  if (!variableState) {
    if (typeof window !== "undefined") {
      const profile = localStorage?.logedUser;
      setVariableState(JSON.parse(profile));
    }
  }

  const { _id, mail, name } = variableState;

  function handleFile(e) {
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log({ snapshot });
      const url = `https://firebasestorage.googleapis.com/v0/b/requisitions-contracts.appspot.com/o/${snapshot?.metadata?.name}?alt=media&token=d8d1b5df-786e-4f07-8d77-5462f4bd5276`;
      const semVersion = CONTRACT.file.length + 1;
      CONTRACT.file.push({
        url,
        typeFile: snapshot?.metadata?.contentType.split("/")[1],
        version: `${semVersion}.0`,
        modifiedAt: new Date(),
        idUser: _id,
      });
      console.log("FILE");
      console.log(CONTRACT.file);
    });
  }

  function handledEditContract() {}

  return (
    <Layout>
      <div className={styles.wrapperForm}>
        <div className={styles.newContract}>
          <h3>Edición de contrato</h3>
          <p className={styles.disclaimer}>
            <span className={styles.title}>NOTA: </span>Para editar un contrato,
            tienes que adjuntar un nuevo archivo de contrato, este no borrara la
            version anterior, solo se actualizara la version del mismo <br />
            con un nuevo archivo Los aprobadores recibiran una nueva
            notificaciòn para que puedan aprobar la nuave actualizacion/edición
            del contrato
          </p>
          <div className={styles.wrapperRowFile}>
            <input
              type="file"
              onChange={handleFile}
              className={styles.fileInput}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const contractId = context.query.contract;
  const res = await fetch(
    `http://localhost:3000/api/contracts?id=${contractId}`
  );
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
