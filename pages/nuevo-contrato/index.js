import { useState } from "react";
import { useRouter } from "next/router";
import { Input, Button, Spacer, Modal, Row } from "@nextui-org/react";
import { app } from "../../util/firebaseConfig";
import { getStorage, ref, uploadBytes } from "firebase/storage";

//Components
import Layout from "../../components/Layout";
import Overlay from "../../hoc/Overlay";
import ApprovedUsers from "../../components/ApprovedUsers";

//Styles
import styles from "@/styles/newContract.module.css";

//contextProfile
import { useAppContext } from "../../context/profileContext";

//Constants
const CONTRACT_TEMPLATE = {
  name: "",
  status: "pending",
  createdAt: new Date(),
  idUser: "",
  approvals: [],
  comments: [],
  file: [],
};

export default function NuevoContrato() {
  const router = useRouter();
  const [viewApproved, setViewApproved] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [nameContract, setNameContract] = useState("");
  const { variableState, setVariableState } = useAppContext();

  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");

  if (!variableState) {
    if (typeof window !== "undefined") {
      const profile = localStorage?.logedUser;
      setVariableState(JSON.parse(profile));
    }
  }

  const { _id, mail, name } = variableState;
  CONTRACT_TEMPLATE.name = nameContract;
  CONTRACT_TEMPLATE.idUser = _id;

  function handleFile(e) {
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log({ snapshot });
      const url = `https://firebasestorage.googleapis.com/v0/b/requisitions-contracts.appspot.com/o/${snapshot?.metadata?.name}?alt=media&token=d8d1b5df-786e-4f07-8d77-5462f4bd5276`;
      const semVersion = CONTRACT_TEMPLATE.file.length + 1;
      CONTRACT_TEMPLATE.file.push({
        url,
        typeFile: snapshot?.metadata?.contentType.split("/")[1],
        version: `${semVersion}.0`,
        modifiedAt: new Date(),
        idUser: _id,
      });
      console.log("FILE");
      console.log(CONTRACT_TEMPLATE.file);
    });
  }

  function saveContract() {
    if (
      CONTRACT_TEMPLATE.approvals.length > 0 &&
      CONTRACT_TEMPLATE.file.length > 0 &&
      CONTRACT_TEMPLATE.name
    ) {
      fetch("http://localhost:3000/api/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(CONTRACT_TEMPLATE),
      }).then((res) => {
        sendMessage();
        router.push("/contratos");
      });
    } else if (!CONTRACT_TEMPLATE.approvals.length) {
      console.log("no tiene approvals");
      setMessage(
        "Debes agregar por lo menos un aprobador para autorizar el contrato"
      );
      setModal(true);
    } else if (!CONTRACT_TEMPLATE.file.length) {
      console.log(CONTRACT_TEMPLATE.file);
      setMessage("Es requrido cargar un archivo");
      setModal(true);
    } else if (!CONTRACT_TEMPLATE.name) {
      setMessage("Especifica el nombre del contrato");
      setModal(true);
    }
  }

  console.log({ CONTRACT_TEMPLATE });

  function sendMessage() {
    console.log();
    fetch("http://localhost:3000/api/mailTransactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: CONTRACT_TEMPLATE.name,
        mail,
        name,
        idContract: CONTRACT_TEMPLATE._id,
        type: "NEW_CONTRACT",
      }),
    }).then((res) => {
      console.log(res.json());
    });
  }

  console.log({ modal });

  return (
    <Layout>
      {modal && (
        <div>
          <Modal blur aria-labelledby="modal-title" open={modal}>
            <Modal.Header></Modal.Header>
            <Modal.Body>
              {message}
              <Row justify="space-between"></Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                auto
                flat
                color="error"
                onClick={() => {
                  setModal(false);
                  document.body.style.overflow = "unset";
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
      {viewApproved && (
        <Overlay>
          <ApprovedUsers
            setViewApproveds={setViewApproved}
            setSelectedList={setSelectedList}
            selectedList={selectedList}
            CONTRACT_TEMPLATE={CONTRACT_TEMPLATE}
          />
        </Overlay>
      )}
      <div className={styles.wrapperForm}>
        <div className={styles.newContract}>
          <h3>Nuevo contrato</h3>
          <p className={styles.disclaimer}>
            Para crear un nuevo contrato deberas llenar todos los datos
            requeridos y asignar por lo menos un aprobador que firmara la
            autorización del mismo.{" "}
          </p>
          <Spacer y={1} />
          <div className={styles.wrapperRowInput}>
            <div className={styles.middleInput}>
              <Input
                clearable
                bordered
                labelPlaceholder="Nombre del contrato"
                initialValue=""
                width="100%"
                onChange={(e) => setNameContract(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.wrapperRowFile}>
            <input
              type="file"
              onChange={handleFile}
              className={styles.fileInput}
            />
          </div>
          <div className={styles.wrapperRowInput}>
            <div className={styles.middleText}>
              <p className={styles.text}></p>* Es necesario elegir por lo menos
              un approvador.{" "}
              <Button
                className={styles.btn_approvers}
                onClick={() => setViewApproved(true)}
              >
                Agregar Aprobadores
              </Button>
            </div>
          </div>
          <div className={styles.wrapperRowInputSuccess}>
            <div className={styles.middleText}>
              <Button
                className={styles.btn_approvers}
                onClick={saveContract}
                color="success"
              >
                Crear contrato
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
