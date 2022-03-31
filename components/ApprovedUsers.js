import { useState, useEffect } from "react";

//Components
import { VscChromeClose } from "react-icons/vsc";
import { Input, Card, Grid, Avatar, Button, Spacer } from "@nextui-org/react";

import styles from "@/styles/approvedList.module.css";

//Constantes

export default function ApprovedUsers({
  setViewApproveds,
  selectedList,
  setSelectedList,
  CONTRACT_TEMPLATE,
}) {
  const [aggregated, setAgregated] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedList, setSearchedList] = useState([]);

  function buildList(user) {
    const filter = selectedList.find((usr) => usr?.mail === user?.mail);
    if (filter) {
    } else if (!filter || selectedList.length < 2) {
      const approved = {
        idUser: user._id,
        mail: user.mail,
        name: user.name,
        approved: false,
        photo: user.photo,
      };
      setSelectedList([...selectedList, approved]);
    }
  }

  function removeList(user) {
    setSelectedList(selectedList.filter((usr) => usr.mail !== user.mail));
  }

  function cancelApprover() {
    setSelectedList([]);
    setViewApproveds(false);
  }

  function addApprovers() {
    setViewApproveds(false);
    CONTRACT_TEMPLATE.approvals = selectedList;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:3000/api/search?name=${search}`, {})
        .then((res) => res.json())
        .then((res) => setSearchedList(res.data));
    }, 1000);
  }, [search]);

  console.log({ selectedList });

  return (
    <div className={styles.userLists}>
      <div className={styles.closer} onClick={() => setViewApproveds(false)}>
        <VscChromeClose size="28" />
      </div>
      <div className={styles.containerUsers}>
        <h3 className={styles.title3}>Lista de usuarios aprobadores</h3>
        <p className={styles.title3}>
          Agrega a los usuarios necesarios para aprobar tu contrato, puedes
          agregar un maximos de 3 aprobadores del listado de usuarios, filtra
          por nombre o correo electrónico
        </p>
        <div className={styles.search}>
          <Input
            placeholder="Busca usuarios por nombre o correo"
            width="100%"
            onChange={(e) => setSearch(e.target.value)}
            bordered
            clearable
          />
        </div>
        <Spacer y={1} />
        {!!selectedList.length && (
          <div className={styles.selecteds}>
            <h5 className={styles.title3}>Usuarios Agregados</h5>
            <div className={styles.list}>
              {selectedList?.map((selected, key) => {
                return (
                  <div key={key} className={styles.wrapperCard}>
                    <div
                      className={styles.removeUsr}
                      onClick={() => removeList(selected)}
                    >
                      <VscChromeClose size="14" />
                    </div>
                    <Card clickable="true" bordered css={{ mw: "400px" }}>
                      <div className={styles.contentCard}>
                        <Grid size="xl">
                          <Avatar
                            size="md"
                            src={selected.photo}
                            color="gradient"
                            bordered
                          />
                        </Grid>
                        <p>
                          {selected.name} {selected.lastname}
                        </p>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className={styles.users}>
          <h5 className={styles.title3}>Listado de usuarios</h5>
          <div className={styles.floatedUsers}>
            {searchedList.map((usr, key) => {
              const { name, lastname, photo } = usr;
              return (
                <div
                  key={key}
                  className={styles.wrapperCard}
                  onClick={() => buildList(usr)}
                >
                  <Card clickable="true" bordered css={{ mw: "400px" }}>
                    <div className={styles.contentCard}>
                      <Grid size="xl">
                        <Avatar
                          size="md"
                          src={photo}
                          color="gradient"
                          bordered
                        />
                      </Grid>
                      <p>
                        {name} {lastname}
                      </p>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.cta}>
          <Grid>
            <Button color="error" auto onClick={cancelApprover}>
              Cancelar
            </Button>
          </Grid>
          <Spacer y={1} />
          <Grid>
            <Button color="success" auto onClick={addApprovers}>
              Agregar
            </Button>
          </Grid>
        </div>
      </div>
    </div>
  );
}
