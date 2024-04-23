import { useDispatch } from "react-redux"
import { API } from "../libs/axios"
import { addThread } from "../slices/threadSlice"


export const useThreadsHooks = () => {
    const token = sessionStorage.getItem('token')
    const dispatch = useDispatch()
    
    const fetchThread = async () => {
        try {
            const response = await API.get("/thread")
            console.log("response di hooks :", response.data);
            const data = response.data.data
            dispatch(addThread(data))
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    
    const fetchThreadAuth = async () => {
        try {
            const response = await API.get(`/threads`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            console.log("response di hooks :", response.data.data);
            const data = response.data.data
            dispatch(addThread(data))
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return {
        fetchThread,
        fetchThreadAuth
    }
}