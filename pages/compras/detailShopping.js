import { Row, Text, Modal, Button } from "@nextui-org/react";

export default function DetailShopping({visibleDetail, handleCloseDetail, currentShopping}){
  console.log({ currentShopping });
  return <Modal
    closeButton
    aria-labelledby="modal-title"
    open={visibleDetail}
    onClose={handleCloseDetail}
    width="600px"
  >
    <Modal.Header>
      <Text id="modal-title" size={18}>
        Compra {currentShopping.id} - {currentShopping?.status}
      </Text>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <Text><b>Nombre:</b> {currentShopping?.userName}</Text>
      </Row>
      <Row>
        <Text><b>Correo:</b> {currentShopping?.email}</Text>
      </Row>
      <Row>
        <Text><b>Descripción: </b>{currentShopping?.description}</Text>
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button auto flat color="error" onClick={handleCloseDetail}>
        Cerrar
      </Button>
      <Button auto onClick={handleCloseDetail}>
        Aceptar
      </Button>
    </Modal.Footer>
  </Modal>;
}
