import { Row, Text, Modal, Button } from "@nextui-org/react";

export default function DetailSupport({visibleDetail, closeHandlerDetail, currentTicket}){
  return <Modal
    closeButton
    aria-labelledby="modal-title"
    open={visibleDetail}
    onClose={closeHandlerDetail}
    width="600px"
  >
    <Modal.Header>
      <Text id="modal-title" size={18}>
        Detalle de ticket{" - "}
        <Text b size={18}>
        {currentTicket?._id} - {currentTicket?.status}
        </Text>
      </Text>
    </Modal.Header>
    <Modal.Body>
      <Row justify="space-between">
        <Text><b>{currentTicket?.title}</b></Text>
      </Row>
      <Row>
        <Text><b>Nombre:</b> {currentTicket?.name} - <b>Rol:</b> {currentTicket?.role}</Text>
      </Row>
      <Row>
        <Text><b>Correo:</b> {currentTicket?.email}</Text>
      </Row>
      <Row>
        <Text><b>Descripción: </b>{currentTicket?.description}</Text>
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button auto flat color="error" onClick={closeHandlerDetail}>
        Cerrar
      </Button>
      <Button auto onClick={closeHandlerDetail}>
        Aceptar
      </Button>
    </Modal.Footer>
  </Modal>;
}
