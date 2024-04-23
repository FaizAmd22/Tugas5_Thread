import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { IUsers } from "../interfaces/UsersInterface";
import { API } from "../libs/axios";
import { setSuggestion } from "../slices/suggestionSlice";

export const useSuggestionHooks = () => {
    const {username} = useParams()
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("id");
    const dispatch = useDispatch();
    console.log("username url :", username);
    
    
    const fetchSuggestion = async () => {
        try {
        const response = await API.get("/search", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const datas = response.data;

        const suggestion = datas
            .filter((user: IUsers) => user.id != userId && user.isFollow == false && user.username != username)
            .slice(0, 7);
        // console.log("suggestion :", suggestion);
        dispatch(setSuggestion(suggestion))
    } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    return {
        fetchSuggestion
    }
}
