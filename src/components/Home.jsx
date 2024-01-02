import axios from "axios";
import { user_API } from "../Apis/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineRemoveRedEye,
  MdOutlineEdit,
  MdOutlineDelete,
} from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";

const Home = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  // GET All USERS
  const getUsers = async () => {
    await axios.get(user_API).then((res) => {
      setUsers(res.data);
    });
  };

  // DELETE USER SWAL
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  // DELETE USER
  const deleteUser = async (userId) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`${user_API}/${userId}`);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: `User ${userId} deleted successfully`,
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: `User ${userId} Safe :)`,
            icon: "error",
          });
        }
      })
      .then(getUsers);
  };

  return (
    <>
      <div className='container'>
        <div className='common-header'>
          <p className='text-center h3'>User Database</p>
          <p className='text-center'>Total Users : {users.length}</p>
          <button
            className='btn btn-primary'
            type='button'
            onClick={() => {
              navigate("/user/add");
            }}
          >
            Add User {""}
            <IoPersonAddOutline />
          </button>
        </div>
        <hr />
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>User ID</th>
              <th scope='col'>First Name</th>
              <th scope='col'>Last Name</th>
              <th scope='col'>Age</th>
              {/* <th scope='col'>E-mail</th> */}
              {/* <th scope='col'>Phone Number</th> */}
              <th scope='col'>Gender</th>
              {/* <th scope='col'>Address</th> */}
              {/* <th scope='col'>Pincode</th> */}
              <th scope='col'>View</th>
              <th scope='col'>Edit</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          {users.length > 0 &&
            users.map((user) => (
              <tbody key={user._id}>
                <tr>
                  <td>{user.user_id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.age}</td>
                  {/* <td>{user.email}</td> */}
                  {/* <td>{user.phoneNumber}</td> */}
                  <td>{user.gender}</td>
                  {/* <td>{user.address}</td> */}
                  {/* <td>{user.pinCode}</td> */}
                  <td>
                    <button
                      type='button'
                      className='btn btn-info'
                      onClick={() => {
                        navigate(`/${user.user_id}`);
                      }}
                    >
                      <MdOutlineRemoveRedEye />
                    </button>
                  </td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-warning'
                      data-bs-toggle='tooltip'
                      data-bs-placement='top'
                      data-bs-title='Edit'
                      onClick={() => {
                        navigate(`/user/edit/${user.user_id}`);
                      }}
                    >
                      <MdOutlineEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-danger'
                      onClick={() => deleteUser(user.user_id)}
                    >
                      <MdOutlineDelete />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
        <p className='text-center'>Total Users {users.length}</p>
      </div>
    </>
  );
};

export default Home;
