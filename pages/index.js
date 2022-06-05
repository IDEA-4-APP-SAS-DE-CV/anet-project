//Components
import Layout from "@/components/Layout";
import Blog from "@/components/Blog";

//Styles
import styles from "../styles/Home.module.css";


export default function Home() {
  return (
    <Layout>
      <div className={styles.home}>
        <Blog />
      </div>
    </Layout>
  );
}
