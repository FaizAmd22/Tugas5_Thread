import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ThreadInterface } from "../interfaces/ThreadInterface";
import { API } from "../libs/axios";
import { addDetailThread } from "../slices/detailThreadSlice";

export const useDetailThreadHooks = () => {
    let { id } = useParams();
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState<ThreadInterface>({});
  const dispatch = useDispatch();
  
  const fetchDetail = async () => {
      const response = await API.get(`/thread/${id}`);
      
      // console.log("response :", response.data.data);
      dispatch(addDetailThread(response.data.data));
      // setData(response.data.data);
    };
    
    const fetchDetailAuth = async () => {
        const response = await API.get(`/threads/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
        },
    });
    
    console.log("data detailThread :", response.data.data);
    // console.log("response :", response.data.data);
    dispatch(addDetailThread(response.data.data));
    // setData(response.data.data);
    };
    
    return {
        fetchDetail,
        fetchDetailAuth
    }
}