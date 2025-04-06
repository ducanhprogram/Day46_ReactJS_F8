import useTheme from "@/hooks/useTheme";
import styles from "./Home.module.scss";
import useDebounce from "@/hooks/useDebounce";
import useUser from "@/hooks/useUser";
import clsx from "clsx";
import { useEffect, useState } from "react";

const Home = () => {
    const [searchValue, setSearchValue] = useState("");
    const debounceValue = useDebounce(searchValue, 800);
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    const [count, setCount] = useState(0);

    const user = useUser();

    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        document.body.classList.add(
            theme === "dark" ? "dark-mode" : "light-mode"
        );

        return () => {
            document.body.classList.remove("dark-mode", "light-mode");
        };
    }, [theme]);

    useEffect(() => {
        const handler = () => {
            setCount(count + 1);
        };

        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        };
    }, [count]);

    useEffect(() => {
        if (debounceValue) {
            console.log("Search value:", searchValue);
            // console.log("Call API");
        }
    }, [debounceValue, searchValue]);

    const handleChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formValue = {
            avatar,
        };
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(preview);
        };
    }, [preview]);

    return (
        <div
            className={clsx(
                styles.app,
                styles[`${theme === "light" ? "light-mode" : "dark-mode"}`]
            )}
        >
            <h1>Search</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />

                <label>
                    <img width={200} src={preview} alt="" />
                    <input type="file" onChange={handleChange} />
                </label>
            </form>

            <button onClick={toggleTheme}>
                Chuyển sang {theme === "light" ? "dark" : "light"}
            </button>
        </div>
    );
};

export default Home;
