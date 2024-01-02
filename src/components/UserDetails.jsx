import axios from "axios";
import { useEffect, useState } from "react";
import { user_API } from "../Apis/api";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import Swal from "sweetalert2";

const UserDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${user_API}/${id}`).then((res) => {
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setAge(res.data.age);
      setEmail(res.data.email);
      setPhoneNumber(res.data.phoneNumber);
      setGender(res.data.gender);
      setAddress(res.data.address);
      setPinCode(res.data.pinCode);
    });
  }, [id]);

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
          swalWithBootstrapButtons
            .fire({
              title: "Deleted!",
              text: `User ${userId} deleted successfully`,
              icon: "success",
            })
            .then(navigate("/"));
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
      .then(id);
  };

  return (
    <>
      <div className='container'>
        <div className='common-header'>
          <p className='text-center h3'>User Details </p>
          <button
            className='btn btn-primary'
            type='button'
            onClick={() => {
              navigate("/");
            }}
          >
            <AiOutlineHome />
          </button>
        </div>
        <hr />
        <form>
          <div className='form-floating mb-3'>
            <input type='text' className='form-control' disabled value={id} />
            <label htmlFor='floatingInput'>User ID</label>
          </div>
          <div className='row g-2'>
            <div className='col-md mb-3'>
              <div className='form-floating'>
                <input
                  type='text'
                  className='form-control'
                  disabled
                  value={firstName}
                />
                <label htmlFor='floatingInput'>First Name</label>
              </div>
            </div>
            <div className='col-md'>
              <div className='form-floating'>
                <input
                  type='text'
                  className='form-control'
                  disabled
                  value={lastName}
                />
                <label htmlFor='floatingInput'>Last Name</label>
              </div>
            </div>
          </div>
          <div className='row g-2'>
            <div className='col-md mb-3 '>
              <div className='form-floating'>
                <input
                  type='number'
                  className='form-control'
                  disabled
                  value={age}
                />
                <label htmlFor='floatingInput'>Age</label>
              </div>
            </div>
            <div className='col-md'>
              <div className='form-floating'>
                <select
                  className='form-select'
                  id='floatingSelect'
                  aria-label='Floating label select example'
                  disabled
                  value={gender}
                >
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Other'>Other</option>
                </select>
                <label htmlFor='floatingSelect'>Gender</label>
              </div>
            </div>
          </div>
          <div className='row g-2'>
            <div className='col-md mb-3'>
              <div className='form-floating'>
                <input
                  type='email'
                  className='form-control'
                  disabled
                  value={email}
                />
                <label htmlFor='floatingInput'>Email address</label>
              </div>
            </div>
            <div className='col-md'>
              <div className='form-floating'>
                <input
                  type='text'
                  className='form-control'
                  disabled
                  value={phoneNumber}
                />
                <label htmlFor='floatingInput'>Phone Number</label>
              </div>
            </div>
          </div>
          <div className='row g-2'>
            <div className='col-md mb-3'>
              <div className='form-floating'>
                <textarea
                  className='form-control'
                  id='floatingTextarea'
                  disabled
                  value={address}
                ></textarea>
                <label htmlFor='floatingTextarea'>Address</label>
              </div>
            </div>
            <div className='col-md'>
              <div className='form-floating'>
                <input
                  type='number'
                  className='form-control'
                  disabled
                  value={pinCode}
                />
                <label htmlFor='floatingInput'>Pin Code</label>
              </div>
            </div>
          </div>
        </form>

        <div className='d-grid gap-2'>
          <button
            type='submit'
            className='btn btn-outline-success'
            onClick={() => {
              navigate(`/user/edit/${id}`);
            }}
          >
            Edit User
          </button>
          <button
            type='submit'
            className='btn btn-outline-danger'
            onClick={() => deleteUser(id)}
          >
            Delete User
          </button>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
