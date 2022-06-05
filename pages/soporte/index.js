import { useState } from "react";
import Layout from "../../components/Layout";
import { Table, Row, Col, Tooltip, User, Text, Modal, Button, Input, Checkbox, Mail, Password } from "@nextui-org/react";
import { StyledBadge } from "../../components/StyledBadge";
import { IconButton } from "../../components/IconButton";
import { EyeIcon } from "../../components/EyeIcon";
import { EditIcon } from "../../components/EditIcon";
import { DeleteIcon } from "../../components/DeleteIcon";
import { Calendar } from 'react-date-range';
import { addDays } from 'date-fns';
import { es } from 'date-fns/locale'
//import clientPromise from "util/mongodb";

//Components

//Styles
import styles from "@/styles/Viajes.module.css";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

// Constants
const SUPPORT = [
  {
    id: 1,
    name: "Paulina Monrroy",
    role: "Project Leader",
    team: "Management",
    status: "pendiente",
    age: "29",
    avatar: "/images/paulina.png",
    email: "paulina.monroy@mercadolibre.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros",
    startDate: "04/Julio/2022",
    endDate: "08/Julio/2022"
  },
  {
    id: 1,
    name: "Jonathan Villordo",
    role: "Project Leader",
    team: "Management",
    status: "cancelado",
    age: "29",
    avatar: "/images/jonathan.png",
    email: "jonathan.villordo@amiif.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros",
    startDate: "04/Julio/2022",
    endDate: "08/Julio/2022"
  },{
    id: 1,
    name: "Fernando Robles",
    role: "Project Manager",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "/images/fer.jpeg",
    email: "fernando.robles@mercadolibre.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros",
    startDate: "04/Julio/2022",
    endDate: "08/Julio/2022"
  },{
    id: 1,
    name: "Nancy Botello",
    role: "Software Developer",
    team: "Management",
    status: "active",
    age: "39",
    avatar: "/images/nancy.png",
    email: "nancy.botello@gmail.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros",
    startDate: "04/Julio/2022",
    endDate: "08/Julio/2022"
  },
  {
    id: 1,
    name: "Paulina Monrroy",
    role: "Project Leader",
    team: "Management",
    status: "paused",
    age: "29",
    avatar: "/images/paulina.png",
    email: "paulina.monroy@mercadolibre.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros",
    startDate: "04/Julio/2022",
    endDate: "08/Julio/2022"
  },
  {
    id: 1,
    name: "Jonathan Villordo",
    role: "Project Leader",
    team: "Management",
    status: "pendiente",
    age: "29",
    avatar: "/images/jonathan.png",
    email: "jonathan.villordo@amiif.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros",
    startDate: "04/Julio/2022",
    endDate: "08/Julio/2022"
  },{
    id: 1,
    name: "Fernando Robles",
    role: "Project Manager",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "/images/fer.jpeg",
    email: "fernando.robles@mercadolibre.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros",
    startDate: "04/Julio/2022",
    endDate: "08/Julio/2022"
  },{
    id: 1,
    name: "Nancy Botello",
    role: "Software Developer",
    team: "Management",
    status: "active",
    age: "39",
    avatar: "/images/nancy.png",
    email: "nancy.botello@gmail.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros",
    startDate: "04/Julio/2022",
    endDate: "08/Julio/2022"
  },
  {
    id: 1,
    name: "Paulina Monrroy",
    role: "Project Leader",
    team: "Management",
    status: "paused",
    age: "29",
    avatar: "/images/paulina.png",
    email: "paulina.monroy@mercadolibre.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros",
    startDate: "04/Julio/2022",
    endDate: "08/Julio/2022"
  },
  {
    id: 1,
    name: "Jonathan Villordo",
    role: "Project Leader",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "/images/jonathan.png",
    email: "jonathan.villordo@amiif.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros",
    startDate: "04/Julio/2022",
    endDate: "08/Julio/2022"
  },{
    id: 1,
    name: "Fernando Robles",
    role: "Project Manager",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "/images/fer.jpeg",
    email: "fernando.robles@mercadolibre.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros",
    startDate: "04/Julio/2022",
    endDate: "08/Julio/2022"
  },{
    id: 1,
    name: "Nancy Botello",
    role: "Software Developer",
    team: "Management",
    status: "active",
    age: "39",
    avatar: "/images/nancy.png",
    email: "nancy.botello@gmail.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros",
    startDate: "04/Julio/2022",
    endDate: "08/Julio/2022"
  },
]

export default function Soporte() {
  const columns = [
    { name: "Nombre", uid: "name" },
    { name: "Creado", uid: "startDate" },
    { name: "Resuelto", uid: "endDate" },
    { name: "Estatus", uid: "status" },
    { name: "Acciones", uid: "actions" },
  ];
  const [valueSearch, setValueSearch] = useState("");
  const [valueDescription, setValueDescription] = useState("");
  const [priority, setProority] = useState("");
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);

  function handleSelect(data){
    
  }
  
  const handler = () => setVisible(true);
  const closeHandler = () => setVisible(false);

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User squared src={user.avatar} name={cellValue} css={{ p: 0 }}>
            {user.email}
          </User>
        );
      case "startDate":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
        case "endDate":
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
        return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Ver detalle del ticket">
                <IconButton onClick={() => console.log("Ver detalle del ticket", user.id)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Editar Ticket">
                <IconButton onClick={() => console.log("Editar Ticket", user.id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Borrar Ticket"
                color="error"
                onClick={() => console.log("Borrar Ticket", user.id)}
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
            Agrega un nuevo &nbsp;
            <Text b size={18}>
            Ticket
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Row justify="space-between">
            <Input
              rounded
              clearable
              bordered
              placeholder="Descripción para soporte"
              color="primary"
              css={{ minWidth: "400px" }}
              value={valueDescription}
              onChange={(e) => setValueDescription(e.target.value)}
            />
          </Row>
          <Row justify="space-between">
            <select className={styles.priority}>
              <option>Seleciona la prioridad del ticket</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
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
      <div className={styles.viajes}>
        <div className={styles.container}>
          <h3>Tickets de soporte</h3>
          <div className={styles.searchTravels}>
            <Input
              rounded
              clearable
              bordered
              placeholder="Filtra por nombre o correeo"
              color="primary"
              css={{ minWidth: "400px" }}
              value={valueSearch}
              onChange={(e) => setValueSearch(e.target.value)}
            />
            <div className={styles.newTravel}>
              <Button color="primary" auto onClick={handler}>
                Agregar nuevo ticket
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
              <Table.Body items={SUPPORT}>
                {(item) => (
                  <Table.Row>
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
}

export async function getServerSideProps({ req, res }) {
  return {
    props: {},
  };
}
