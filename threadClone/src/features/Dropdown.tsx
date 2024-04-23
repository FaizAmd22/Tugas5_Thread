import {
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  IconButton,
} from "@chakra-ui/react";
import { API } from "../libs/axios";
import * as Swal from "sweetalert2";
import { MdEdit } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import AlertDelete from "./AlertDelete";

const Dropdown = (data: any) => {
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("id");
//   console.log("data dropdown :", data);

  const handleShare = () => {
    const currentUrl = window.location.href
    let getUrl = currentUrl;

    if (!currentUrl.includes("details")) {
      getUrl = `${currentUrl}details/${data.id}`;
    //   console.log("getUrl :", getUrl);
    }
    if (currentUrl.includes("profile")) {
      getUrl = `http://localhost:5173/details/${data.id}`;
    //   console.log("getUrl :", getUrl);
    }

    navigator.clipboard.writeText(getUrl).then(
      function () {
        console.log("Copied!");
        alert("Copied!");
      },
      function () {
        console.log("Copy error");
        alert("Copy error!");
      }
    );
  };

  //   const handleDelete = () => {
  //     // console.log("id :", id.id);
  //     Swal.fire({
  //       title: "Are you sure wanna delete?",
  //       background: "#2b2b2b",
  //       color: "white",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes",
  //       reverseButtons: true,
  //     }).then(async (result: any) => {
  //       if (result.isConfirmed) {
  //         try {
  //           if (data.type == "threads") {
  //             await API.delete(`/thread/${data.id}`, {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             });
  //           } else {
  //             await API.delete(`/reply/${data.id}`, {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             });
  //           }
  //           Swal.fire({
  //             icon: "success",
  //             title: "Deleted!",
  //             background: "#2b2b2b",
  //             color: "white",
  //             showConfirmButton: false,
  //           });
  //           // console.log("response :", response);

  //           setTimeout(() => {
  //             window.location.reload();
  //           }, 1000);
  //         } catch (error) {
  //           // console.log(error.response.data.message)
  //           Swal.fire({
  //             icon: "error",
  //             title: "Cannot delete!",
  //             background: "#2b2b2b",
  //             color: "white",
  //             showConfirmButton: false,
  //           });
  //         }
  //       }
  //     });
  //   };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BsThreeDotsVertical />}
        variant="none"
        borderColor="#1D1D1D"
      />
      <MenuList bg="#1D1D1D">
        <MenuItem icon={<IoMdShare />} bg="#1D1D1D" onClick={handleShare}>
          Share
        </MenuItem>
        {data.userId == userId && (
          <>
            <MenuItem icon={<MdEdit />} bg="#1D1D1D" isDisabled>
              Edit
            </MenuItem>

            <MenuItem
              // icon={<MdEdit />}
              bg="#1D1D1D"
              // onClick={handleDelete}
            >
              {AlertDelete(data)}
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default Dropdown;
