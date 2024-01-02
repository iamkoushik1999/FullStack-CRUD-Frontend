import axios from "axios";
import { useEffect, useState } from "react";
import { user_API } from "../Apis/api";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const EditUsers = () => {
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

  // EDIT USERS
  const editUsers = async (e) => {
    e.preventDefault();
    await axios
      .put(`${user_API}/${id}`, {
        firstName,
        lastName,
        age,
        email,
        phoneNumber,
        gender,
        address,
        pinCode,
      })
      .then((res) => {
        Swal.fire({
          title: "Good job!",
          text: res.data.message,
          icon: "success",
        });
        navigate(`/${id}`);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
      });
  };

  return (
    <>
      <div className='container'>
        <div className='common-header'>
          <p className='text-center h3'>Edit User</p>
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
        <form onSubmit={editUsers}>
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
                  id='floatingInput'
                  placeholder='First Name'
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor='floatingInput'>First Name</label>
              </div>
            </div>
            <div className='col-md'>
              <div className='form-floating'>
                <input
                  type='text'
                  className='form-control'
                  id='floatingInput'
                  placeholder='Last Name'
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                  id='floatingInput'
                  placeholder='Age'
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
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
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
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
                  id='floatingInput'
                  placeholder='name@example.com'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='floatingInput'>Email address</label>
              </div>
            </div>
            <div className='col-md'>
              <div className='form-floating'>
                <input
                  type='text'
                  className='form-control'
                  id='floatingInput'
                  placeholder='Phone Number'
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                  placeholder='Address'
                  id='floatingTextarea'
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
                <label htmlFor='floatingTextarea'>Address</label>
              </div>
            </div>
            <div className='col-md'>
              <div className='form-floating'>
                <input
                  type='number'
                  className='form-control'
                  id='floatingInput'
                  placeholder='Pin Code'
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
                <label htmlFor='floatingInput'>Pin Code</label>
              </div>
            </div>
          </div>

          <div className='d-grid gap-2'>
            <button type='submit' className='btn btn-outline-success'>
              Update User
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUsers;
