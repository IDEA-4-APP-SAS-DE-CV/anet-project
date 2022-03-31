import { useState } from "react";
import Image from "next/image";
import { Input, Grid, Button, Avatar, Link } from "@nextui-org/react";
import { useRouter } from "next/router";

//contextProfile
import { useAppContext } from "../context/profileContext";

//Styles
import styles from "@/styles/Header.module.css";

//Icons
import { BiMenu } from "react-icons/bi";
import {
  IoAirplaneSharp,
  IoHammer,
  IoCash,
  IoChevronForward,
} from "react-icons/io5";

import { MdMoreVert } from "react-icons/md";

export default function Header({ setViewMenu }) {
  const [valueSearch, setValueSearch] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const { variableState, setVariableState } = useAppContext();

  const router = useRouter();

  if (!variableState) {
    if (typeof window !== "undefined") {
      const profile = localStorage?.logedUser;
      if (profile) {
        setVariableState(JSON.parse(profile));
      } else {
        router.push("/login");
      }
    }
  }

  const { gender, mail, name, nickname, phone, photo, typeUser, _id } =
    variableState;

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <div onClick={() => setViewMenu(true)}>
          <BiMenu size="30px" />
        </div>
        <Image
          src="/images/logo-amiif-border.png"
          width={90}
          height={35}
          alt="Amiif"
        />
      </div>
      <div className={styles.search}>
        <div className={styles.containerInputSearch}>
          <Input
            size="sm"
            label=""
            placeholder="¿Buscas algo?"
            rounded
            css={{ minWidth: "400px" }}
            value={valueSearch}
            onChange={(e) => setValueSearch(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.directAccess}>
        <Grid.Container gap={2}>
          <Grid>
            <Button color="primary" auto size="sm">
              <IoCash size="22px" />
            </Button>
          </Grid>
          <Grid>
            <Button color="primary" auto size="sm">
              <IoHammer size="22px" />
            </Button>
          </Grid>
          <Grid>
            <Button color="primary" auto size="sm">
              <IoAirplaneSharp size="22px" />
            </Button>
          </Grid>
        </Grid.Container>
      </div>
      <div className={styles.controls}>
        <div
          className={styles.roundButton}
          onClick={() => setViewModal(!viewModal)}
        >
          <MdMoreVert size="24px" />
          {viewModal && (
            <div className={styles.modalMenu}>
              <div className={styles.profile}>
                <div className={styles.avatar}>
                  <Avatar size="lg" src={photo} color="gradient" bordered />
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>{name}</p>
                  <p className={styles.link}>
                    <Link href={`/profile/${_id}`}>
                      <a className={styles.link}>Ver perfil</a>
                    </Link>
                  </p>
                </div>
              </div>
              <div className={styles.options}>
                <div className={styles.option}>
                  <Link href="/help-center">
                    <a>Ayuda y soporte técnico</a>
                  </Link>
                  <IoChevronForward size="22px" />
                </div>
                <div className={styles.option}>
                  <Link href="/accesibilidad">
                    <a>Pantalla y accesibilidad</a>
                  </Link>
                  <IoChevronForward size="22px" />
                </div>
                <div className={styles.option}>
                  <Link
                    href="/login"
                    onClick={() => {
                      localStorage.setItem("logedUser", null);
                    }}
                  >
                    <a>Cerrar sesión</a>
                  </Link>
                  <IoChevronForward size="22px" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
