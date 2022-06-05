import { useState } from "react";
import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { StyledBadge } from "../../components/StyledBadge";
import { IconButton } from "../../components/IconButton";
import { EyeIcon } from "../../components/EyeIcon";
import { EditIcon } from "../../components/EditIcon";
import { DeleteIcon } from "../../components/DeleteIcon";
import { Input } from "@nextui-org/react";
//import clientPromise from "util/mongodb";

//Components
import Layout from "../../components/Layout";

//Styles
import styles from "@/styles/proveedores.module.css";

// Constants
const PROVIDERS = [
  {
    id: 1,
    name: "Fernando Robles Rivera",
    role: "Software developer",
    team: "Management",
    status: "paused",
    age: "29",
    avatar: "/images/fer.jpeg",
    email: "fernando.robles@mercadolibre.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },
  {
    id: 1,
    name: "Nancy Botello",
    role: "Project Manager",
    team: "Management",
    status: "active",
    age: "38",
    avatar: "/images/nancy.png",
    email: "nancyy2@gmail.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    name: "Paulina Monrroy",
    role: "Project Leader",
    team: "Management",
    status: "active",
    age: "32",
    avatar: "/images/paulina.png",
    email: "paulina.monroy@mercadolibre.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    name: "Jonathan Villordo",
    role: "Infraestrcutura",
    team: "Management",
    status: "active",
    age: "38",
    avatar: "/images/jonathan.png",
    email: "jan.merol@gmail.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },
  {
    id: 1,
    name: "Fernando Robles Rivera",
    role: "Software developer",
    team: "Management",
    status: "paused",
    age: "29",
    avatar: "/images/fer.jpeg",
    email: "fernando.robles@mercadolibre.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },
  {
    id: 1,
    name: "Nancy Botello",
    role: "Project Manager",
    team: "Management",
    status: "active",
    age: "38",
    avatar: "/images/nancy.png",
    email: "nancyy2@gmail.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    name: "Paulina Monrroy",
    role: "Project Leader",
    team: "Management",
    status: "active",
    age: "32",
    avatar: "/images/paulina.png",
    email: "paulina.monroy@mercadolibre.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    name: "Jonathan Villordo",
    role: "Infraestrcutura",
    team: "Management",
    status: "active",
    age: "38",
    avatar: "/images/jonathan.png",
    email: "jan.merol@gmail.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },
  {
    id: 1,
    name: "Fernando Robles Rivera",
    role: "Software developer",
    team: "Management",
    status: "paused",
    age: "29",
    avatar: "/images/fer.jpeg",
    email: "fernando.robles@mercadolibre.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },
  {
    id: 1,
    name: "Nancy Botello",
    role: "Project Manager",
    team: "Management",
    status: "active",
    age: "38",
    avatar: "/images/nancy.png",
    email: "nancyy2@gmail.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    name: "Paulina Monrroy",
    role: "Project Leader",
    team: "Management",
    status: "active",
    age: "32",
    avatar: "/images/paulina.png",
    email: "paulina.monroy@mercadolibre.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    name: "Jonathan Villordo",
    role: "Infraestrcutura",
    team: "Management",
    status: "active",
    age: "38",
    avatar: "/images/jonathan.png",
    email: "jan.merol@gmail.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },
  {
    id: 1,
    name: "Fernando Robles Rivera",
    role: "Software developer",
    team: "Management",
    status: "paused",
    age: "29",
    avatar: "/images/fer.jpeg",
    email: "fernando.robles@mercadolibre.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },
  {
    id: 1,
    name: "Nancy Botello",
    role: "Project Manager",
    team: "Management",
    status: "active",
    age: "38",
    avatar: "/images/nancy.png",
    email: "nancyy2@gmail.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    name: "Paulina Monrroy",
    role: "Project Leader",
    team: "Management",
    status: "active",
    age: "32",
    avatar: "/images/paulina.png",
    email: "paulina.monroy@mercadolibre.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    name: "Jonathan Villordo",
    role: "Infraestrcutura",
    team: "Management",
    status: "active",
    age: "38",
    avatar: "/images/jonathan.png",
    email: "jan.merol@gmail.com",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },
]

export default function Proveedores() {
  const columns = [
    { name: "Nombre", uid: "name" },
    { name: "Rol", uid: "role" },
    { name: "Estatus", uid: "status" },
    { name: "Acciones", uid: "actions" },
  ];
  const [valueSearch, setValueSearch] = useState("");
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User squared src={user.avatar} name={cellValue} css={{ p: 0 }}>
            {user.email}
          </User>
        );
      case "role":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {user.team}
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
              <Tooltip content="Ver detalle">
                <IconButton onClick={() => console.log("Ver detalle", user.id)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Editar Proveedor">
                <IconButton onClick={() => console.log("Editar Proveedor", user.id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Borrar Proveedor"
                color="error"
                onClick={() => console.log("Borrar Proveedor", user.id)}
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
      <div className={styles.providers}>
        <div className={styles.container}>
          <h3>Proveedores</h3>
          <div className={styles.searchProviders}>
            <Input
              rounded
              clearable
              bordered
              placeholder="Filtra por nombre del proveedor"
              color="primary"
              css={{ minWidth: "400px" }}
              value={valueSearch}
              onChange={(e) => setValueSearch(e.target.value)}
            />
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
              <Table.Body items={PROVIDERS}>
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
