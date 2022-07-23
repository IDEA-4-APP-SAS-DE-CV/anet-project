import { useState } from "react";
import {
  Button,
  Modal,
  Tooltip,
  Text,
  Row,
  Table,
  Col,
  Input
} from "@nextui-org/react";
import { es } from "date-fns/locale";
import { StyledBadge } from "../../components/StyledBadge";
import { IconButton } from "../../components/IconButton";
import { EyeIcon } from "../../components/EyeIcon";
import { EditIcon } from "../../components/EditIcon";
import { DeleteIcon } from "../../components/DeleteIcon";
import { Calendar } from "react-date-range";

// import { Table, Row, Col, Tooltip, User, Text, Modal, Button, Input, Checkbox, Mail, Password } from "@nextui-org/react";

import Link from "next/link";

//Components
import Layout from "../../components/Layout";

//Styles
import styles from "@/styles/contratos.module.css";

//Utils
import format from "../../util/format";

// Constants
import { BASE_URL_API } from "../../constants";

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

  const columns = [
    { name: "Orden (ID)", uid: "_id" },
    { name: "Titulo", uid: "name" },
    { name: "Fecha de creación", uid: "createdAt" },
    { name: "Estatus", uid: "status" },
    { name: "Acciones", uid: "actions" },
  ];

  const [valueSearch, setValueSearch] = useState("");
  const [detail, setDetail] = useState("");
  const [visible, setVisible] = useState(false);
  const [valueAmount, setValueAmount] = useState("");
  const [date, setDate] = useState(null);

  const handler = () => setVisible(true);
  const closeHandler = () => setVisible(false);

  const renderCell = (contract, columnKey) => {
    const cellValue = contract[columnKey];
    switch (columnKey) {
      case "id":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {contract._id}
              </Text>
            </Row>
          </Col>
        );
      case "dateOfDelivery":
        return (
          <Col>
            <Row>
              <Text size={13} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
        case "amount":
          return (
            <Col>
              <Row>
                <Text b size={14} css={{ tt: "capitalize" }}>
                  {cellValue}
                </Text>
              </Row>
            </Col>
          );
      case "status":
        return <StyledBadge type={contract.status}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Ver detalle">
                <IconButton onClick={() => console.log("Ver detalle", contract._id)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Editar Compra">
                <IconButton onClick={() => console.log("Editar Compra", contract._id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Borrar Compra"
                color="error"
                onClick={() => console.log("Borrar Compra", contract._id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Layout>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="600px"
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Agrega una nueva&nbsp;
            <Text b size={18}>
            compra
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Row justify="space-between">
            <Input
              rounded
              clearable
              bordered
              placeholder="Monto de la compra ($)"
              color="primary"
              css={{ minWidth: "400px" }}
              value={valueAmount}
              onChange={(e) => setValueAmount(e.target.value)}
            />
          </Row>
          <Row justify="space-between">
            <Input
              rounded
              clearable
              bordered
              placeholder="Detalle de la compra"
              color="primary"
              css={{ minWidth: "400px" }}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </Row>
          <Row justify="space-between">
            <p>Selecciona una fecha de compra</p>
          </Row>
          <Row justify="space-between">
          <Calendar 
            onChange={item => setDate(item)}
            locale={es} 
            date={date} />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Cerrar
          </Button>
          <Button auto onClick={closeHandler}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.contracts}>
        <div className={styles.container}>
          <h3>Contratos</h3>
          <div className={styles.searchBar}>
            <Input
              rounded
              clearable
              bordered
              placeholder="Filtra por usuario o por correo"
              color="primary"
              css={{ minWidth: "400px" }}
              value={valueSearch}
              onChange={(e) => setValueSearch(e.target.value)}
            />
            <div className={styles.newTravel}>
              <Button color="primary" auto onClick={handler}>
                Agregar nuevo contrato
              </Button>
            </div>
          </div>
          <div>
            <Table
              aria-label="Example table with custom cells"
              css={{
                height: "auto",
                minWidth: "100%",
              }}
              selectionMode="none"
            >
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column
                    key={column.uid}
                    hideHeader={column.uid === "actions"}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </Table.Column>
                )}
              </Table.Header>
              <Table.Body items={contracts.data}>
                {(item) => (
                  <Table.Row key={item._id}>
                    {(columnKey) => (
                      <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                    )}
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );

  /*
  const [visible, setVisible] = useState(false);
  const contrato = contracts.data;
  console.log({ contracts });
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  */

  /*
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
  */
}

export async function getServerSideProps(context) {
  const res = await fetch(`${BASE_URL_API}/contracts`, {
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
