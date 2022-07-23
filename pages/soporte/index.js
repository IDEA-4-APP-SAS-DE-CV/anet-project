import { useState, useEffect} from "react";
import Layout from "../../components/Layout";
import { Table, Row, Col, Tooltip, User, Text, Modal, Button, Input, Checkbox, Mail, Password } from "@nextui-org/react";
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
import DetailSupport from "./detailSupport";
import NewSupport from "./newSupport";

//Styles
import styles from "@/styles/Viajes.module.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

// Constants
import { BASE_URL_API } from "../../constants";

export default function Soporte({tickets}) {

  const { data } = tickets;



  const columns = [
    { name: "Ticket (ID)", uid: "_id" },
    { name: "Creado", uid: "createAt" },
    { name: "Resuelto", uid: "endDate" },
    { name: "Estatus", uid: "status" },
    { name: "Acciones", uid: "actions" },
  ];
  const [valueSearch, setValueSearch] = useState("");
  const [currentTicket, setCurrentTicket] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [date, setDate] = useState(null);
  const [datos, setDatos] = useState(data);

  function handleSelect(data){
    
  }
  
  const handler = () => setVisible(true);
  const closeHandler = () => setVisible(false);


  const closeHandlerDetail = () =>  setVisibleDetail(false);
  const handlerDetail = (ticket) => {
    setCurrentTicket(ticket);
    setVisibleDetail(true);
  };

  const deleteTicket = async (id) => {

    const res = await fetch(`${BASE_URL_API}/tickets?_id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) {
      const deletedTicket = await res.json();
      console.log(deletedTicket.data);
      getTickets();
    } else {
      console.log("Error al borrar");
    }
  };

  const getTickets = async () => {
    const res = await fetch(`${BASE_URL_API}/tickets`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if(res.status === 200){
      const ticketsList = await res.json();
      setDatos(ticketsList.data);
    }
  };

  const renderCell = (ticket, columnKey) => {
    const cellValue = ticket[columnKey];
    switch (columnKey) {
      case "_id":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {ticket._id}
              </Text>
            </Row>
          </Col>
        );
      case "createAt":
        return (
          <Col>
            <Row>
              <Text size={13} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
        case "endDate":
          return (
            <Col>
              <Row>
                <Text size={13} css={{ tt: "capitalize" }}>
                  {cellValue}
                </Text>
              </Row>
            </Col>
          );
      case "status":
        return <StyledBadge type={ticket.status}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Ver detalle del ticket">
                <IconButton onClick={() => handlerDetail(ticket)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Editar Ticket">
                <IconButton onClick={() => console.log("Editar Ticket", ticket._id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Borrar Ticket"
                color="error"
                onClick={() => deleteTicket(ticket._id)}
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
      <NewSupport visible={visible} closeHandler={closeHandler} />
      <DetailSupport visibleDetail={visibleDetail} closeHandlerDetail={closeHandlerDetail} currentTicket={currentTicket} />

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
              <Table.Body items={datos}>
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
}

export async function getServerSideProps(context) {
  const res = await fetch(`${BASE_URL_API}/tickets`, {
    method: "GET",
    headers: {
      "Content.Type": "application/json",
    },
  });

  console.log({res});

  const tickets = await res.json();

  return {
    props: { tickets },
  };
}
