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
    companyName: "Astra Zeneca",
    logo: "/images/astra-zeneca.png",
    contactName: "Nancy Botello",
    role: "Project Manager",
    team: "Management",
    status: "active",
    age: "38",
    email: "nancyy2@gmail.com",
    phone: "5638378290",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    companyName: "Astra Zeneca",
    logo: "/images/astra-zeneca.png",
    contactName: "Paulina Monrroy",
    role: "Project Leader",
    team: "Management",
    status: "active",
    age: "32",
    email: "paulina.monroy@mercadolibre.com",
    phone: "5638378290",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    companyName: "Astra Zeneca",
    logo: "/images/astra-zeneca.png",
    contactName: "Jonathan Villordo",
    role: "Infraestrcutura",
    team: "Management",
    status: "active",
    age: "38",
    email: "jan.merol@gmail.com",
    phone: "5638378290",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },
  {
    id: 1,
    companyName: "Astra Zeneca",
    logo: "/images/astra-zeneca.png",
    contactName: "Fernando Robles Rivera",
    role: "Software developer",
    team: "Management",
    status: "paused",
    age: "29",
    email: "fernando.robles@mercadolibre.com",
    phone: "5638378290",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },
  {
    id: 1,
    companyName: "Astra Zeneca",
    logo: "/images/astra-zeneca.png",
    contactName: "Nancy Botello",
    role: "Project Manager",
    team: "Management",
    status: "active",
    age: "38",
    email: "nancyy2@gmail.com",
    phone: "5638378290",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    companyName: "Astra Zeneca",
    logo: "/images/astra-zeneca.png",
    contactName: "Paulina Monrroy",
    role: "Project Leader",
    team: "Management",
    status: "active",
    age: "32",
    email: "paulina.monroy@mercadolibre.com",
    phone: "5638378290",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    companyName: "Astra Zeneca",
    logo: "/images/astra-zeneca.png",
    contactName: "Jonathan Villordo",
    role: "Infraestrcutura",
    team: "Management",
    status: "active",
    age: "38",
    email: "jan.merol@gmail.com",
    phone: "5638378290",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },
  {
    id: 1,
    companyName: "Astra Zeneca",
    logo: "/images/astra-zeneca.png",
    contactName: "Fernando Robles Rivera",
    role: "Software developer",
    team: "Management",
    status: "paused",
    age: "29",
    email: "fernando.robles@mercadolibre.com",
    phone: "5638378290",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },
  {
    id: 1,
    companyName: "Astra Zeneca",
    logo: "/images/astra-zeneca.png",
    contactName: "Nancy Botello",
    role: "Project Manager",
    team: "Management",
    status: "active",
    age: "38",
    email: "nancyy2@gmail.com",
    phone: "5638378290",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    companyName: "Astra Zeneca",
    logo: "/images/astra-zeneca.png",
    contactName: "Paulina Monrroy",
    role: "Project Leader",
    team: "Management",
    status: "active",
    age: "32",
    email: "paulina.monroy@mercadolibre.com",
    phone: "5638378290",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    companyName: "Astra Zeneca",
    logo: "/images/astra-zeneca.png",
    contactName: "Jonathan Villordo",
    role: "Infraestrcutura",
    team: "Management",
    status: "active",
    age: "38",
    email: "jan.merol@gmail.com",
    phone: "5638378290",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },
  {
    id: 1,
    companyName: "Astra Zeneca",
    logo: "/images/astra-zeneca.png",
    contactName: "Fernando Robles Rivera",
    role: "Software developer",
    team: "Management",
    status: "paused",
    age: "29",
    email: "fernando.robles@mercadolibre.com",
    phone: "5638378290",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },
  {
    id: 1,
    companyName: "Astra Zeneca",
    logo: "/images/astra-zeneca.png",
    contactName: "Nancy Botello",
    role: "Project Manager",
    team: "Management",
    status: "active",
    age: "38",
    email: "nancyy2@gmail.com",
    phone: "5638378290",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    companyName: "Astra Zeneca",
    logo: "/images/astra-zeneca.png",
    contactName: "Paulina Monrroy",
    role: "Project Leader",
    team: "Management",
    status: "active",
    age: "32",
    email: "paulina.monroy@mercadolibre.com",
    phone: "5638378290",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },{
    id: 1,
    companyName: "Astra Zeneca",
    logo: "/images/astra-zeneca.png",
    contactName: "Jonathan Villordo",
    role: "Infraestrcutura",
    team: "Management",
    status: "active",
    age: "38",
    email: "jan.merol@gmail.com",
    phone: "5638378290",
    description: "Persona en cargada de llevar el desarrollo de productos de tecnologia a nivel empresarial, tanto internamente como servicios dee 3ros"
  },
]

export default function Proveedores() {
  const columns = [
    { name: "Compañia", uid: "company" },
    { name: "Descripción", uid: "role" },
    { name: "Estatus", uid: "data" },
    { name: "Acciones", uid: "actions" },
  ];
  const [valueSearch, setValueSearch] = useState("");
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "company":
        return (
          <User squared src={user.logo} name={cellValue} css={{ p: 0 }}>
            {user.companyName}
          </User>
        );
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
      case "data":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {user?.contactName}
              </Text>
            </Row>
            <Row>
              <Text size={12} css={{ tt: "capitalize", color: "$accents7" }}>
                {user.email}
              </Text>
            </Row>
            <Row>
              <Text size={12} css={{ tt: "capitalize", color: "$accents7" }}>
                {user.phone}
              </Text>
            </Row>
          </Col>
        );

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
