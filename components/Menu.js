import { useState } from "react";
import { Card, Text, Avatar, Grid, Button, Spacer } from "@nextui-org/react";
import Link from "next/link";
//Styles
import styles from "@/styles/menu.module.css";

//contextProfile
import { useAppContext } from "../context/profileContext";

//Icons
import { FaBoxes } from "react-icons/fa";

import { FcDocument } from "react-icons/fc";

import {
  IoCalendarNumberSharp,
  IoCarSportSharp,
  IoAirplaneSharp,
  IoHelpBuoySharp,
  IoHammer,
  IoWalletSharp,
  IoCartSharp,
  IoCash,
} from "react-icons/io5";

export default function Menu({ viewMenu, setViewMenu }) {
  const { variableState } = useAppContext();

  const {
    gender,
    mail,
    name,
    nickname,
    phone,
    photo,
    typeUser,
    _id,
    enterprise,
  } = variableState;

  function clickFn() {
    alert("Click");
  }

  return (
    <div
      onMouseLeave={() => setViewMenu(false)}
      className={`${styles.menu} ${viewMenu && styles.active}`}
    >
      <Card color="gradient" css={{ w: "100%", alignItems: "center" }}>
        <Avatar size="xl" src={photo} color="gradient" bordered />
        <div>&nbsp;</div>
        <Text
          css={{ fontWeight: "$bold", color: "$white" }}
          transform="capitalize"
        >
          {name}
        </Text>
        <Text
          css={{ fontSize: "12px", fontWeight: "$ligth", color: "$white" }}
          span
        >
          {enterprise}
        </Text>
        <Text
          css={{ fontSize: "12px", fontWeight: "$ligth", color: "$white" }}
          span
        >
          Consultores
        </Text>
      </Card>

      <div className={styles.containerMenu}>
        <Grid.Container gap={0}>
          <Grid>
            <Link href={"/contratos"} passHref>
              <Button
                icon={<FcDocument fill="white" size="22px" />}
                color="success"
                rounded
              >
                Contratos
              </Button>
            </Link>
            <Spacer y={0.5} />
            <Link href={"/proveedores"} passHref>
              <Button
                icon={<FaBoxes fill="white" size="22px" />}
                color="success"
                rounded
              >
                Proveedores
              </Button>
            </Link>
            <Spacer y={0.5} />
            <Link href={"/gastos"} passHref>
              <Button
                icon={<IoCash fill="white" size="22px" />}
                color="primary"
                rounded
              >
                Gastos
              </Button>
            </Link>
            <Spacer y={0.5} />
            <Button
              icon={<IoCarSportSharp fill="white" size="22px" />}
              color="primary"
              rounded
            >
              Activos
            </Button>
            <Spacer y={0.5} />
            <Link href={"/compras"} passHref>
              <Button
                icon={<IoCartSharp fill="white" size="22px" />}
                color="success"
                rounded
              >
                Compras
              </Button>
            </Link>
            <Spacer y={0.5} />
            <Button
              icon={<IoWalletSharp fill="white" size="22px" />}
              color="primary"
              rounded
            >
              Nomina
            </Button>
            <Spacer y={0.5} />
            <Button
              icon={<IoHammer fill="white" size="22px" />}
              color="primary"
              rounded
            >
              Capacitación
            </Button>
            <Spacer y={0.5} />
            <Link href={"/viajes"} passHref>
              <Button
                icon={<IoAirplaneSharp fill="white" size="22px" />}
                color="success"
                rounded
              >
                Viajes
              </Button>
            </Link>
            <Spacer y={0.5} />
            <Button
              icon={<IoCalendarNumberSharp fill="white" size="22px" />}
              color="primary"
              rounded
            >
              Eventos
            </Button>
            <Spacer y={0.5} />
            <Link href={"/soporte"} passHref>
              <Button
                icon={<IoHelpBuoySharp fill="white" size="22px" />}
                color="success"
                rounded
              >
                Soporte
              </Button>
            </Link>
            <Spacer y={0.5} />
          </Grid>
        </Grid.Container>
      </div>
    </div>
  );
}
