import styles from "./page.module.css";
import CilentComponent from "../../components/client-component";
import ServerComponent from "../../components/server-component";

export default function Home() {
  return (
    <div className={styles.page}>
      인덱스 페이지
      <CilentComponent>
        <ServerComponent />
      </CilentComponent>
    </div>
  );
}
