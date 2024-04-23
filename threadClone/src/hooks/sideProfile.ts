import { useDispatch } from "react-redux";
import { API } from "../libs/axios";
import { setUser } from "../slices/userSlice";

export const useSideProfileHooks = () => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("id");
    const dispatch = useDispatch();
    
    const fetchCurrentUser = async () => {
        try {
            const response = await API.get(`/user/current/${userId}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            const datas = response.data.data;
            // console.log("datas sideProfile:", datas);
            // sessionStorage.setItem("profile", JSON.stringify(datas))
            dispatch(setUser(datas));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return {
        fetchCurrentUser,
    }
}
