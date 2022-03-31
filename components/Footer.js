import { useState } from "react";
import { useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
//Styles
import styles from "@/styles/Footer.module.css";

//Icons
import { IoMoon, IoSunny } from "react-icons/io5";

export default function Footer() {
  const [active, setActive] = useState(false);

  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  return (
    <div className={styles.footer}>
      <div className={styles.logo}>
        <Image
          src="/images/logo-amiif-border.png"
          width={60}
          height={23}
          alt="Amiif"
        />
        <span className={styles.disclaimerFooter}>
          AMIIF y sus sitios son marcas registradas de AMIIF™, Inc. © 2021
        </span>
      </div>
      <div className={styles.navfooter}>
        <ul>
          <li>
            <Link href="">
              <a className={styles.link}>Aviso de Privacidad</a>
            </Link>
          </li>
          <li>
            <Link href="">
              <a className={styles.link}>Políticas</a>
            </Link>
          </li>
          <li>
            <Link href="">
              <a className={styles.link}>Formatos</a>
            </Link>
          </li>
          <li>
            <div
              className={styles.switcher}
              onClick={() => {
                setActive(!active);
                setTheme(active ? "dark" : "light");
              }}
            >
              <div
                className={`${styles.disc} ${
                  (isDark && styles.left) || styles.right
                } `}
              ></div>
              <div>
                <IoMoon />
              </div>
              <div>
                <IoSunny />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
