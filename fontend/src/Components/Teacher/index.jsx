import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import "animate.css";

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage] = useState(5);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedAge, setEditedAge] = useState(0);
  const [editedSalary, setEditedSalary] = useState(0);
  const [newTeacherData, setNewTeacherData] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    salary: 0,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmingRow, setConfirmingRow] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch("http://localhost:5000/teachers");
      if (!response.ok) {
        throw new Error("Failed to fetch teachers");
      }
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = teachers.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setEditedFirstName(teacher.FirstName);
    setEditedLastName(teacher.LastName);
    setEditedAge(teacher.Age);
    setEditedSalary(teacher.Salary);
  };

  const handleCancelEdit = () => {
    setEditingTeacher(null);
    setEditedFirstName("");
    setEditedLastName("");
    setEditedAge(0);
    setEditedSalary(0);
  };

  const handleSaveEdit = async () => {
    if (editingTeacher) {
      const updatedTeacher = {
        ...editingTeacher,
        FirstName: editedFirstName,
        LastName: editedLastName,
        Age: editedAge,
        Salary: editedSalary,
      };
      try {
        // ตรวจสอบว่า age และ salary เป็นจำนวนเต็มบวกหรือไม่
        if (editedAge >= 0 && editedSalary >= 0) {
          const response = await fetch(
            `http://localhost:5000/teachers/${updatedTeacher.ID}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedTeacher),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to update teacher");
          }
          const updatedTeacherData = await response.json();
          const updatedTeachers = teachers.map((teacher) =>
            teacher.ID === updatedTeacherData.ID ? updatedTeacherData : teacher
          );
          setTeachers(updatedTeachers);
          setEditingTeacher(null);
          setEditedFirstName("");
          setEditedLastName("");
          setEditedAge(0);
          setEditedSalary(0);
          toast.success("Update Teacher Success");
        } else {
          toast.error("Should Be Number");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (row) => {
    if (confirmingRow === row) {
      try {
        const response = await fetch(
          `http://localhost:5000/teachers/${row.ID}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete teacher");
        }
        const deletedTeacherId = row.ID;
        const updatedTeachers = teachers.filter(
          (teacher) => teacher.ID !== deletedTeacherId
        );
        setTeachers(updatedTeachers);
        setConfirmingRow(null);
        toast.success("Delete teacher successfully");
      } catch (error) {
        console.error(error);
      }
    } else {
      setConfirmingRow(row);
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
    // ตรวจสอบว่าค่าที่รับมาเป็นจำนวนเต็มบวกหรือไม่
    if (name === "age" || name === "salary") {
      const intValue = parseInt(value);
      if (!isNaN(intValue) && intValue >= 0) {
        setNewTeacherData({ ...newTeacherData, [name]: intValue });
      }
    } else {
      setNewTeacherData({ ...newTeacherData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ตรวจสอบว่า age และ salary เป็นจำนวนเต็มบวกหรือไม่
      if (newTeacherData.age >= 0 && newTeacherData.salary >= 0) {
        const response = await fetch("http://localhost:5000/teachers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTeacherData),
        });
        if (!response.ok) {
          throw new Error("Failed to add teacher");
        }
        const teacherData = await response.json();
        setTeachers([...teachers, teacherData]);
        setNewTeacherData({ firstName: "", lastName: "", age: 0, salary: 0 });
        toast.success("Add Teacher Success");
        closeModal();
      } else {
        toast.error("Should Be Number");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4 animate__animated animate__zoomInUp text-center custom-text-shadow pt-5">
        TeaCher
      </h1>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg w-4/5 mx-auto ">
        <div className=" flex justify-evenly ">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2 "
            onClick={openModal}
          >
            Add
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-300 custom-text-shadow">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                First Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Age
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Salary
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {currentTeachers.map((row) => (
              <tr key={row.ID} className="hover:bg-gray-100">
                <td className="cusTd px-6 py-4 whitespace-nowrap">
                  {editingTeacher === row ? (
                    <input
                      type="text"
                      value={editedFirstName}
                      onChange={(e) => setEditedFirstName(e.target.value)}
                      className="border-gray-300 rounded-md w-full focus:p-3 focus:text-xl"
                    />
                  ) : (
                    row.FirstName
                  )}
                </td>
                <td className="cusTd px-6 py-4 whitespace-nowrap">
                  {editingTeacher === row ? (
                    <input
                      type="text"
                      value={editedLastName}
                      onChange={(e) => setEditedLastName(e.target.value)}
                      className="border-gray-300 rounded-md w-full focus:p-3 focus:text-xl"
                    />
                  ) : (
                    row.LastName
                  )}
                </td>
                <td className="cusTd px-6 py-4 whitespace-nowrap">
                  {editingTeacher === row ? (
                    <input
                      type="number"
                      value={editedAge}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 0) {
                          setEditedAge(value);
                        }
                      }}
                      className="border-gray-300 rounded-md w-full focus:p-3 focus:text-xl"
                    />
                  ) : (
                    row.Age
                  )}
                </td>
                <td className="cusTd px-6 py-4 whitespace-nowrap">
                  {editingTeacher === row ? (
                    <input
                      type="number"
                      value={editedSalary}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 0) {
                          setEditedSalary(value);
                        }
                      }}
                      className="border-gray-300 rounded-md w-full focus:p-3 focus:text-xl"
                    />
                  ) : (
                    row.Salary
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {confirmingRow === row ? (
                    <>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleDelete(row)}
                      >
                        Confirm
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setConfirmingRow(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {editingTeacher === row ? (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={handleSaveEdit}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => handleEdit(row)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setConfirmingRow(row)}
                          >
                            Del
                          </button>
                        </>
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
        <h2 className="text-2xl font-semibold mb-4">Add</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              first Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Your FirstName"
              value={newTeacherData.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Your LastName"
              value={newTeacherData.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="age" className="text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Age"
              value={newTeacherData.age}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 0) {
                  setNewTeacherData({ ...newTeacherData, age: value });
                }
              }}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="salary"
              className="text-sm font-medium text-gray-700"
            >
              Salary
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              placeholder="Salary"
              value={newTeacherData.salary}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 0) {
                  setNewTeacherData({ ...newTeacherData, salary: value });
                }
              }}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </form>
      </Modal>

      <div className="mt-4">
        <ul className="flex justify-center">
          {Array.from({
            length: Math.ceil(teachers.length / teachersPerPage),
          }).map((_, index) => (
            <li key={index}>
              <button
                className="bg-blue-500 hover:bg-blue-800 text-gray-800 font-semibold py-2 px-4 mx-1 rounded"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Teacher;
