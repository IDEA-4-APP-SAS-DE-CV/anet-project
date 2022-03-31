import { useState } from "react";
import Image from "next/image";
import {
  Button,
  Grid,
  Modal,
  Row,
  Checkbox,
  Text,
  Textarea,
  Spacer,
} from "@nextui-org/react";
import { useRouter } from "next/router";

import styles from "@/styles/autorizacion.module.css";

//Components
import Layout from "../../components/Layout";

//contextProfile
import { useAppContext } from "../../context/profileContext";

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

export default function Autorizacion({ data }) {
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState("");
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    document.body.style.overflow = "unset";
  };
  const router = useRouter();
  const file = data?.data[0].file[data?.data[0]?.file?.length - 1].url;

  const contract = data.data[0];
  const { variableState } = useAppContext();
  const { mail, name, photo, _id } = variableState;

  function approveContract(type) {
    for (var i = 0; i <= contract.approvals.length - 1; i++) {
      if (contract?.approvals[i]?.idUser === variableState?._id) {
        contract.approvals[i].approved = type;
      }
    }
    fetch("http://localhost:3000/api/contracts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contract),
    }).then((res) => {
      console.log({ res });
      router.push("/contratos");
      //sendMessage();
    });
  }

  function addComment() {
    const date = new Date();
    const comment = {
      createdAt: date,
      text: comments,
      name,
      photo,
      mail,
      _id,
    };

    contract.comments.push(comment);

    const updateComments = {
      comments: contract.comments,
      idContract: contract._id,
    };

    console.log({ updateComments });

    fetch("http://localhost:3000/api/contracts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateComments),
    })
      .then(
        (res) => res.json()
        //router.push("/contratos");
        //sendMessage();
      )
      .then((r) => console.log({ r }));
  }

  return (
    <Layout>
      {!!visible && (
        <Pop
          setComments={setComments}
          comments={comments}
          visible={visible}
          closeHandler={closeHandler}
          addComment={addComment}
        />
      )}
      <div className={styles.headerAutorizacion}>
        <div className={styles.logo}></div>
        <div className={styles.buttons}>
          <Grid.Container gap={2}>
            <Grid>
              <Button
                color="success"
                auto
                size="md"
                onClick={() => approveContract(true)}
              >
                Autorizar
              </Button>
            </Grid>
            <Grid>
              <Button color="primary" auto size="md" onClick={handler}>
                Comentarios
              </Button>
            </Grid>
          </Grid.Container>
        </div>
      </div>
      <div className={styles.autorizacion}>
        <div className={styles.preheader}>
          <h2>Autorización de contrato</h2>
          <p>
            Es requerida la revisión de este documento antes de ser firmado y
            autorizado, una vez autorizado. las personas autorizadas para ver y
            revisar este documento veran tu autorización dentro del sistema.
          </p>
        </div>
        <iframe src={file} width="1000" height="900"></iframe>
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
