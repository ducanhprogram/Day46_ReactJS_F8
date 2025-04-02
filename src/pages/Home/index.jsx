import Button from "@/components/Button";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./Home.module.scss";
import config from "@/config";
const Home = () => {
    return (
        <>
            <div>
                <h1>Home Page</h1>
                <Button icon={faChevronCircleRight} href={config.routes.users}>
                    Click me 1
                </Button>
                <Button
                    icon={faYoutube}
                    primary
                    rounded
                    className={styles.btnHome}
                    disabled
                    onClick={() => alert("Hello")}
                    loading
                >
                    Click me 2
                </Button>
                <Button icon={faYoutube} secondary to={config.routes.users}>
                    Click me 3
                </Button>
                <Button icon={faYoutube} rounded>
                    Click me 4
                </Button>
            </div>
        </>
    );
};

export default Home;
