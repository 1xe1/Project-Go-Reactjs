import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import "animate.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [editingUser, setEditingUser] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false); // New state to handle delete confirmation
  const [newUserData, setNewUserData] = useState({ name: "", email: "" });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditedName(user.Name);
    setEditedEmail(user.Email);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditedName("");
    setEditedEmail("");
  };

  const handleSaveEdit = async () => {
    if (editingUser) {
      const updatedUser = {
        ...editingUser,
        Name: editedName,
        Email: editedEmail,
      };
      try {
        const response = await fetch(
          `http://localhost:5000/users/${updatedUser.ID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update user");
        }
        const updatedUserData = await response.json();
        const updatedUsers = users.map((user) =>
          user.ID === updatedUserData.ID ? updatedUserData : user
        );
        setUsers(updatedUsers);
        setEditingUser(null);
        setEditedName("");
        setEditedEmail("");
        toast.success("การแก้ไขข้อมูลเสร็จสมบูรณ์");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (userId) => {
    if (isConfirmingDelete) {
      try {
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        const deletedUserId = userId;
        const updatedUsers = users.filter((user) => user.ID !== deletedUserId);
        setUsers(updatedUsers);
        setIsConfirmingDelete(false);
        toast.success("ลบข้อมูลผู้ใช้เรียบร้อยแล้ว");
      } catch (error) {
        console.error(error);
      }
    } else {
      // If not confirming delete, set the flag to true to show confirmation
      setIsConfirmingDelete(true);
    }
  };
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      });
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      const userData = await response.json();
      setUsers([...users, userData]);
      setNewUserData({ name: "", email: "" });
      toast.success("เพิ่มข้อมูลผู้ใช้เรียบร้อยแล้ว");
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Sriracha&display=swap"
        rel="stylesheet"
      />

      <h1 className=" text-3xl font-semibold mb-4 animate__animated animate__zoomInDown text-center">
        User List
      </h1>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg w-4/5 mx-auto">
        <div className=" flex justify-evenly">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={openModal}
          >
            เพิ่ม
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((row) => (
              <tr key={row.ID} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser === row ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="border-gray-300 rounded-md w-full"
                    />
                  ) : (
                    row.Name
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser === row ? (
                    <input
                      type="text"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="border-gray-300 rounded-md w-full"
                    />
                  ) : (
                    row.Email
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser === row ? (
                    <>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={handleSaveEdit}
                      >
                        บันทึก
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={handleCancelEdit}
                      >
                        ยกเลิก
                      </button>
                    </>
                  ) : (
                    <>
                      {isConfirmingDelete ? null : (
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => handleEdit(row)}
                        >
                          แก้ไข
                        </button>
                      )}
                      {isConfirmingDelete ? (
                        <>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 "
                            onClick={() => handleDelete(row.ID)}
                          >
                            ยืนยัน
                          </button>
                          <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setIsConfirmingDelete(false)}
                          >
                            ยกเลิก
                          </button>
                        </>
                      ) : (
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 "
                          onClick={() => handleDelete(row.ID)}
                        >
                          ลบ
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="เพิ่มข้อมูล"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50"
      >
        <h2 className="text-2xl font-semibold mb-4">เพิ่มข้อมูล</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              value={newUserData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={newUserData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            เพิ่ม
          </button>
        </form>
      </Modal>

      <div className="mt-4">
        <ul className="flex justify-center">
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
            (_, index) => (
              <li key={index}>
                <button
                  className="bg-blue-500 hover:bg-blue-800 text-gray-800 font-semibold py-2 px-4 mx-1 rounded"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default User;
