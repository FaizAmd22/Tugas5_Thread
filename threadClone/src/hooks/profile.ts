import { API } from "../libs/axios";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setProfile } from "../slices/profileSlice";

export const useProfileHooks = () => {
    let { username } = useParams();
    const sessionProfile = sessionStorage.getItem("profile")
    const profile = JSON.parse(sessionProfile)
    const token = sessionStorage.getItem("token")
    const test = ''
    // console.log("profile di profile hooks :", profile.username);
    
    // console.log("username :", username);
    
    const dispatch = useDispatch();
    
    const fetchProfile = async () => {
        if (token) {
            const response = await API.get(`/users/${profile.username}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            dispatch(setProfile(response.data.data));
        } else {
            const response = await API.get(`/user/${profile.username}`);
            dispatch(setProfile(response.data.data));
        }
        // console.log("userID :", response.data.data.id);
        
        // console.log("fetchProfile :", response.data.data);
    };

    // const fetchLikeProfile

    return {
        fetchProfile,
    }
}
