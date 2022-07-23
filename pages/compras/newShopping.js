import { useState } from "react";
import { Row, Text, Modal, Button, Input, Textarea } from "@nextui-org/react";
import format from "../../util/format";

//Components
import { es } from "date-fns/locale";
import { Calendar } from "react-date-range";

// Styles
import styles from "@/styles/Tickets.module.css";

// Constants
import { BASE_URL_API } from "../../constants";

export default function newShopping({visibleNewShopping, setVisibleNewShopping, closeNewShopping, getAllShoppings}){
  const [valueDescription, setValueDescription] = useState("");
  const [valueTitle, setValueTitle] = useState("");
  const [ valueDeliveryAt, setValueDeliveryAt] = useState("");

  let nameUser = "";
  let mailUser = "";
  let avatarUser = "";

  if (typeof window !== "undefined") {
    const { name, mail, photo } =  JSON.parse(localStorage.logedUser);
    nameUser = name;
    mailUser = mail;
    avatarUser = photo;

    console.log( JSON.parse(localStorage.logedUser) );
  }

  const newShoppingData = async (deliveryAt, valueDescription) => {
    
    const body = {
      id: `COM-${format("DDMMYYYY", new Date(), false)}`,
      userName: nameUser,
      status: "pendiente",
      avatar: avatarUser,
      email: mailUser,
      description: valueDescription,
      createdAt: format("DD-MM-YYYY", new Date(), false),
      deliveryAt: format("DD-MM-YYYY", deliveryAt, false),
      timeStampCreatedAt: new Date(),
    };
    
    const res = await fetch(`${BASE_URL_API}/shoppings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      getAllShoppings();
    }
  };

  return <Modal
    closeButton
    aria-labelledby="modal-title"
    open={visibleNewShopping}
    onClose={closeNewShopping}
    width="600px"
  >
    <Modal.Header>
      <Text id="modal-title" size={18}>
        Agrega una nueva &nbsp;
        <Text b size={18}>
        Compra
        </Text>
      </Text>
    </Modal.Header>
    <Modal.Body>
    <Row>
        <p>Agrega la descripción de tu compra</p>
      </Row>
      <Row justify="space-between">
        <Textarea label=""
          placeholder="Ej. Se solicita material de oficina, 1 caja de plumas, 4 portafolios de piel y 10 botes de basura para"
          onChange={(e) => setValueDescription(e.target.value) }
          value={valueDescription}
          fullWidth
          bordered
       />
      </Row>
      <Row>
        <p>Selecciona una fecha de entrega (aproximada)</p>
      </Row>
      <Row justify="space-between">
      <Calendar 
            onChange={item => setValueDeliveryAt(item)}
            locale={es} 
            date={valueDeliveryAt} />
      </Row>
     
    </Modal.Body>
    <Modal.Footer>
      <Button auto flat color="error" onClick={closeNewShopping}>
        Cerrar
      </Button>
      <Button auto onClick={() => newShoppingData(valueDeliveryAt, valueDescription)}>
        Aceptar
      </Button>
    </Modal.Footer>
  </Modal>;
}
