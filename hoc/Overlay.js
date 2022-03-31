//styles
import styles from "@/styles/overlay.module.css";

export default function Overlay({ children }) {
  return <div className={styles.overlay}>{children}</div>;
}
