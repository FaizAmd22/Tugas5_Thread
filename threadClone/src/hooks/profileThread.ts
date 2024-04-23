import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IThreads } from "../interfaces/ThreadInterface";
import { API } from "../libs/axios";
import { selectProfile } from "../slices/profileSlice";
import { addProfileThread } from "../slices/profileThreadSlice";

export const useProfileThreadHooks = () => {
    // const [data, setData] = useState([]);
    const token = sessionStorage.getItem("token");
    const user = useSelector(selectProfile);
    const userId = sessionStorage.getItem("profileId")
    const dispatch = useDispatch()
    const sessionProfile = sessionStorage.getItem("profile")
    const profile = JSON.parse(sessionProfile)

//   console.log("userId di session :", userId);

    // const filteredData = data.filter((item: IThreads) => item.author.id == user.id);
    // console.log("filtered :", filteredData);
    // dispatch(addProfileThread(filteredData))

    const fetchProfileThread = async () => {
        try {
            // dispatch(addProfileThread([]))
            const response = await API.get("/thread");
            console.log("response :", response.data.data);
            //   setData(response.data.data);
            const data = response.data.data 
            const filteredData = data.filter((item: IThreads) => item.author.id == user.id);
            console.log("filtered :", filteredData);
            dispatch(addProfileThread(filteredData))
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchProfileThreadAuth = async () => {
        // dispatch(addProfileThread([]))
        try {
            const response = await API.get(`/threads`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        console.log("response :", response.data.data);
            // setData(response.data.data);
            const data = response.data.data 
            const filteredData = data.filter((item: IThreads) => item.author.id == profile.id);
            console.log("filtered :", filteredData);
            dispatch(addProfileThread(filteredData))
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    return {
        fetchProfileThread,
        fetchProfileThreadAuth
    }
}