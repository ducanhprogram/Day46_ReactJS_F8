import { useContext } from "react";
import { UserContent } from "@/contexts/UserContent";

function useUser() {
    const data = useContext(UserContent);

    return data.user?.data;
}

export default useUser;
