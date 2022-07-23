import { useState } from "react";
import { Row, Text, Modal, Button, Input, Textarea } from "@nextui-org/react";

// Styles
import styles from "@/styles/Tickets.module.css";

export default function NewSupport({visible, closeHandler}){
  const [valueDescription, setValueDescription] = useState("");
  const [valueTitle, setValueTitle] = useState("");

  if (typeof window !== "undefined") {
    const { name, mail, typeUser, phone, photo, enterprise } =  JSON.parse(localStorage.logedUser)
  }

  const newTicket = () => {
    
    const body = {
      name: name || '',
      email: mail,
      createdAt: new Date(),
      status: 'pendiente',
      typeUser: typeUser,
      title: valueTitle,
      description: valueDescription,
    }

    console.log({ body });
  }

  

  return <Modal
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
        <select className={styles.section} onChange={(e) => setValueTitle(e.target.value)}>
          <option>Seleciona Una seccion</option>
          <option value="Red">Red</option>
          <option value="VPN">VPN</option>
          <option value="Sistema Operativo">Sistema Operativo</option>
          <option value="Applecaciones">Applecaciones</option>
          <option value="Correo">Correo</option>
        </select>
      </Row>
      <Row justify="space-between">
        <Textarea
          rounded
          clearable
          bordered
          placeholder="Descripción para soporte"
          color="primary"
          css={{ minWidth: "100%" }}
          value={valueDescription}
          onChange={(e) => setValueDescription(e.target.value)}
        />
      </Row>
     
    </Modal.Body>
    <Modal.Footer>
      <Button auto flat color="error" onClick={closeHandler}>
        Cerrar
      </Button>
      <Button auto onClick={newTicket}>
        Aceptar
      </Button>
    </Modal.Footer>
  </Modal>
}
