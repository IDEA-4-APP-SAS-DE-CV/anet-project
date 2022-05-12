import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Link, Button, Grid, Avatar } from "@nextui-org/react";

import styles from "@/styles/contratos.module.css";

//Components
import Layout from "components/Layout";

//Utils
import format from "../../util/format";

import { FcApproval, FcBookmark } from "react-icons/fc";
import { ImFilePdf } from "react-icons/im";
import { BiXCircle } from "react-icons/bi";

export default function Contrato({ data }) {
  const [contrato, setContrato] = useState(data?.data[0]);
  const [viewContract, setViewContract] = useState(false);

  const file = contrato.file[contrato?.file.length - 1].url;
  console.log(file);

  function sendReminder(mail, name, type, title, idContract) {
    console.log();
    fetch("api/mailReminder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        mail,
        name,
        idContract,
        type,
      }),
    }).then((res) => {
      console.log(res.json());
    });
  }

  return (
    <Layout>
      {viewContract && (
        <div className={styles.popContract}>
          <div
            className={styles.closeIcon}
            onClick={() => setViewContract(false)}
          >
            <BiXCircle size={30} />
          </div>
          <div className={styles.filePdf}>
            <iframe width="100%" height="100%" src={file}></iframe>
          </div>
        </div>
      )}
      <div className={styles.contracts}>
        <div className={styles.headContracts}>
          <p className={styles.title}>{contrato?.name}</p>
          <div className={styles.controls}>
            <span className={styles.smallStrong}>
              Fecha de creación:{" "}
              {format("DD de MM de YYYY", contrato?.createdAt, true)}
            </span>
            <br />
            <span
              className={
                (contrato?.status === "pending" && styles.pending) ||
                (contrato?.status === "approved" && styles.success) ||
                (contrato?.status === "cancel" && styles.cancel)
              }
              style={{ fontWeight: 600 }}
            >
              Estado:{" "}
              {(contrato?.status === "pending" && "Pendiente") ||
                (contrato?.status === "approved" && "Aprobado") ||
                (contrato?.status === "cancel" && "Cancelado")}
            </span>
          </div>
        </div>

        <div className={styles.wrapperText}>
          <span>
            <span className={`${styles.stronger} ${styles.success}`}>
              NOTA:
            </span>{" "}
            Es necesario que todos los aprobadores puedan firmar el contrato
            asignado para activar la aprobacion general del mismo
          </span>
        </div>
        <div className={styles.contratosDetail}>
          <div className={styles.approvals}>
            {contrato.approvals.map((approval, key) => {
              const { approved, title, idUser, mail, name, photo } = approval;
              return (
                <div className={styles.card} key={key}>
                  <div className={styles.photo}>
                    <Grid.Container gap={2}>
                      <Grid>
                        <Avatar
                          size="xl"
                          src={photo}
                          color={(approved && "success") || "primary"}
                          bordered
                          squared
                        />
                      </Grid>
                    </Grid.Container>
                  </div>
                  <div className={styles.info}>
                    <div className={styles.dataApproval}>
                      <p className={styles.nameCard}>{name}</p>
                      <p className={styles.statusCard}>
                        <span className={styles.labelStatus}>
                          {(approved && "Aprobado") || "Pendiente"}:{" "}
                        </span>
                        {(approved && <FcApproval size={20} />) || (
                          <FcBookmark size={20} />
                        )}
                      </p>
                      <p className={styles.statusCardMail}>{mail}</p>
                    </div>
                    <div className={styles.wrapperButton}>
                      {(!approved && (
                        <Button
                          size="sm"
                          onClick={() => {
                            sendReminder(
                              mail,
                              name,
                              "REMINDER_CONTRACT",
                              title,
                              contrato._id
                            );
                          }}
                        >
                          Enviar recordatorio
                        </Button>
                      )) || (
                        <Button color="success" size="sm">
                          Firmado
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className={styles.disclaimerStatus}>
            <span>
              Es necesario que todos los aprobadores puedan firmar el contrato
              asignado para activar la aprobacion general del mismo
            </span>
          </div> */}
        </div>

        <div className={styles.contratoslistVersions}>
          <h4>Versión de contratos</h4>
          <div className={styles.versions}>
            {contrato.file.map((file, key) => {
              return (
                <div className={styles.file} key={key}>
                  <div className={styles.dataFile}>
                    <span>
                      <Link href={`${file.url}`}>Url del contrato ~ </Link>
                    </span>
                    &nbsp;&nbsp;
                    <span>
                      Ultima modificación{": "}
                      {format("DD de MM de YYYY", file.modifiedAt, true)}
                    </span>
                    &nbsp;&nbsp;
                    <span> ~ Versión {file.version}</span>
                    <span className={styles.iconDoc}>
                      {" "}
                      <ImFilePdf />
                    </span>
                  </div>
                  <div>
                    <Button size="sm" onClick={() => setViewContract(true)}>
                      ver contrato
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.contratosComments}>
          <h4>Comentarios</h4>
          {contrato.comments.map((comment, key) => {
            return (
              <div key={key} className={styles.comment}>
                <div className={styles.headComment}>
                  <Grid>
                    <Avatar
                      size="lg"
                      src={comment.photo}
                      color="gradient"
                      bordered
                    />
                  </Grid>
                  <h5>
                    {comment.name} {comment?.lastname}
                  </h5>
                  <span>
                    {format("DD de MM de YYYY", comment.createdAt, true)}
                  </span>
                </div>
                <div className={styles.textComment}>{comment.text}</div>
              </div>
            );
          })}
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
