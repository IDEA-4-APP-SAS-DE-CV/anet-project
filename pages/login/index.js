import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Input, Grid, Spacer, Link } from "@nextui-org/react";

// Components
import { useAppContext } from "../../context/profileContext";

// Styles
import styles from "@/styles/registro.module.css";

export default function Login() {
  const { variableState, setVariableState } = useAppContext();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      username: userName,
      password: password,
    };
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const logedUser = await res.json();
      setVariableState(logedUser);
      window.localStorage.setItem("logedUser", JSON.stringify(logedUser));
      if (logedUser) router.push("/");
    }
  }

  function handleName(e) {
    setUserName(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className={`${styles.registro} ${styles.backForm}`}>
      <form onSubmit={onSubmit}>
        <div className={`${styles.formLogin}`}>
          <div className={styles.left}>
            <h2>Hola!</h2>
            <p>inicia sesión en tu cuenta</p>
            <div className={styles.controls}>
              <Grid>
                <Input
                  clearable
                  color="primary"
                  initialValue=""
                  helperText=""
                  type="test"
                  label="Usuario"
                  placeholder="Ingresa tu usuario"
                  css={{ width: "90%" }}
                  onChange={handleName}
                />
              </Grid>
              <Spacer y={1.5} />
              <Grid>
                <Input.Password
                  clearable
                  color="primary"
                  initialValue=""
                  // helperText={
                  //   state?.error &&
                  //   "El usuario o password incorrectos, verificalos"
                  // }
                  type="password"
                  label="Password"
                  placeholder="Ingresa tu contraseña"
                  css={{ width: "90%" }}
                  onChange={handlePassword}
                />
              </Grid>
              <Spacer y={2} />
              <Grid>
                {/* <Button auto color="primary" rounded css={{ width: "90%" }}>
                  Iniciar sesión
                </Button> */}
                <input type="submit" className={styles.submit} />
                <Spacer y={1} />
                <div className={styles.disclaimer}>
                  ¿No tienes una cuenta?,{" "}
                  <Link href="/registro">Registrate</Link>
                </div>
              </Grid>
            </div>
          </div>
          <div className={styles.right}>
            <h2>Bienvenido!</h2>
            <p className={styles.disclaimer}>
              de nuevo al centro de operaciones internas de AMIIF
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
      </form>
    </div>
  );
}
