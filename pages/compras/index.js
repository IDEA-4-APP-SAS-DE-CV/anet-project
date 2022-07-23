import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Table, Row, Col, Tooltip, Text, Modal, Button, Input } from "@nextui-org/react";
import { StyledBadge } from "../../components/StyledBadge";
import { IconButton } from "../../components/IconButton";
import { EyeIcon } from "../../components/EyeIcon";
import { EditIcon } from "../../components/EditIcon";
import { DeleteIcon } from "../../components/DeleteIcon";
import { Calendar } from "react-date-range";
import { addDays } from "date-fns";
import { es } from "date-fns/locale";
//import clientPromise from "util/mongodb";

//Components
import DetailShopping from "./detailShopping";
import NewShopping from "./newShopping";

//Styles
import styles from "@/styles/Compras.module.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

// Constants
// Constants
import { BASE_URL_API } from "../../constants";

export default function Compras({shoppings}) {

  let typeUserLevel = "null";

  if (typeof window !== "undefined") {
    const { typeUser } =  JSON.parse(localStorage.logedUser);
    typeUserLevel = typeUser;
  }

  const { data } = shoppings;

  const columns = [
    { name: "Orden (ID)", uid: "id" },
    { name: "Fecha de entrega", uid: "deliveryAt" },
    { name: "Nombre", uid: "userName" },
    { name: "Estatus", uid: "status" },
    { name: "Acciones", uid: "actions" },
  ];

  const [valueSearch, setValueSearch] = useState("");
  const [listData, setListData] = useState(data);
  const [currentShopping, setCurrentShopping] = useState("");

  //Pop Detalle de compra
  const [visibleDetail, setVisibleDetail] = useState(false);

  //Pop Nueva compra
  const [visibleNewShopping, setVisibleNewShopping] = useState(false);

  function handleSelect(data){
    
  }
  
  const handleDetail = (data) => {
    setCurrentShopping(data);
    setVisibleDetail(true);
  };
  const handleCloseDetail = () => setVisibleDetail(false);

  const handleNewShopping = () => setVisibleNewShopping(true);
  const closeNewShopping = () => setVisibleNewShopping(false);

  const getAllShoppings = async () => {
    const res = await fetch(`${BASE_URL_API}/shoppings`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) {
      const listShoppings = await res.json();
      const { data } = listShoppings;
      setListData(data);
      closeNewShopping();
    }
  };

  const findShopping = (search) => {
    window.setTimeout(() => {
      const res = fetch(`${BASE_URL_API}/shoppings?search=${search}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      
      if(res.status === 200){
        const searchShopping = res.json();
        const { data } = searchShopping;
        console.log({ data });
      }
    }, 2000);
  };

  useEffect(() => {
    findShopping(valueSearch);
  }, [valueSearch]);

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "id":
        return (
          <Col>
            <Row>
              <Text b size={13} css={{ tt: "capitalize" }}>
                {user.id}
              </Text>
            </Row>
          </Col>
        );
      case "deliveryAt":
        return (
          <Col>
            <Row>
              <Text size={13} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
        case "userName":
          return (
            <Col>
              <Row>
                <Text b size={13} css={{ tt: "capitalize" }}>
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
              <Tooltip content="Ver detalle">
                <IconButton onClick={() => handleDetail(user)}>
                  <EyeIcon size={20} fill="#979797" />
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
      <DetailShopping visibleDetail={visibleDetail} setVisibleDetail={setVisibleDetail} handleCloseDetail={handleCloseDetail} currentShopping={currentShopping}  />
      <NewShopping setVisibleNewShopping={setVisibleNewShopping} visibleNewShopping={visibleNewShopping} closeNewShopping={closeNewShopping} getAllShoppings={getAllShoppings} />
      <div className={styles.compras}>
        <div className={styles.container}>
          <h3>Compras</h3>
          <div className={styles.searchTravels}>
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
              <Button color="primary" auto onClick={handleNewShopping}>
                Agregar nueva compra
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
              <Table.Body items={listData}>
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

export async function getServerSideProps(context) {
  const res = await fetch(`${BASE_URL_API}/shoppings`, {
    method: "GET",
    headers: {
      "Content.Type": "application/json",
    },
  });

  const shoppings = await res.json();

  return {
    props: { shoppings },
  };
}
