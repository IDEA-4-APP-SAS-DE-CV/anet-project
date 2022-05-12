import { useState } from "react";
import { useRouter } from "next/router";
import { Input, Grid, Spacer, Button, Link } from "@nextui-org/react";
import Image from "next/image";
//Styles
import styles from "@/styles/registro.module.css";

// Components
import { useAppContext } from "../../context/profileContext";

// Constants
import { BASE_URL_API } from '../../constants';

export default function Registro() {
  const router = useRouter();
  const { setVariableState } = useAppContext();

  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickName] = useState("");

  async function handleRegister() {
    const userRegister = {
      nickname,
      name,
      lastname,
      birhtDate: "",
      mail,
      gender: "",
      typeUser: "standard",
      phone: "",
      photo: "",
      password,
      enterprise: "",
    };

    const register = await fetch(`${BASE_URL_API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userRegister),
    });

    if (register.status === 200) {
      const logedUser = await register.json();
      setVariableState(logedUser);
      window.localStorage.setItem("logedUser", JSON.stringify(logedUser));
      if (logedUser) router.push("/");
    }
  }

  return (
    <div className={`${styles.registro} ${styles.backForm}`}>
      <div className={`${styles.form}`}>
        <div className={styles.left}>
          <h2>Hola!</h2>
          <p>Crea tu cuenta</p>
          <div className={styles.controls}>
            <div className={styles.row}>
              <Grid>
                <Input
                  clearable
                  color="primary"
                  initialValue=""
                  helperText=""
                  type="test"
                  label="Nombre"
                  placeholder="Ingresa tu nombre"
                  css={{ width: "90%" }}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid>
                <Input
                  clearable
                  color="primary"
                  initialValue=""
                  helperText=""
                  type="test"
                  label="Apellidos"
                  placeholder="Ingresa tus apellidos"
                  css={{ width: "90%" }}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
            </div>
            <Spacer y={0.75} />
            <Grid>
              <Input
                clearable
                color="primary"
                initialValue=""
                helperText=""
                type="text"
                label="Nickname"
                placeholder="Ingresa tu Nickname"
                css={{ width: "90%" }}
                onChange={(e) => setNickName(e.target.value)}
              />
            </Grid>
            <Spacer y={0.75} />
            <Grid>
              <Input
                clearable
                color="primary"
                initialValue=""
                helperText=""
                type="mail"
                label="Mail"
                required
                placeholder="Ingresa tu email"
                css={{ width: "90%" }}
                onChange={(e) => setMail(e.target.value)}
              />
            </Grid>
            <Spacer y={0.75} />
            <Grid>
              <Input.Password
                clearable
                color="primary"
                initialValue=""
                helperText=""
                type="password"
                label="Password"
                placeholder="Ingresa tu contraseña"
                css={{ width: "90%" }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Spacer y={2} />
            <Grid>
              <Button
                auto
                color="primary"
                rounded
                css={{ width: "90%" }}
                onClick={() => handleRegister()}
              >
                Registrate
              </Button>
              <Spacer y={0.75} />
              <div className={styles.disclaimer}>
                ¿Ya tienes cuenta?, <Link href="/login">Ingresa</Link>
              </div>
            </Grid>
          </div>
        </div>
        <div className={styles.right}>
          <h2>Bienvenido!</h2>
          <p className={styles.disclaimer}>
            Es necesario registrar tus datos para crear una cuenta
          </p>
          <Spacer y={3} />
          <div className={styles.logo}>
            <Image
              src="/images/logo-amiif-border.png"
              width={160}
              height={60}
              alt="Amiif"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
