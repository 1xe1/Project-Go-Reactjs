import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import "animate.css";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedAge, setEditedAge] = useState(0); // Changed to int
  const [editedGrade, setEditedGrade] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false); 
  const [newStudentData, setNewStudentData] = useState({ firstName: "", lastName: "", age: 0, grade: "" });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmingRow, setConfirmingRow] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(""); // Added for grade dropdown

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/students");
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (student) => {
    setEditingStudent(student);
    setEditedFirstName(student.FirstName);
    setEditedLastName(student.LastName);
    setEditedAge(parseInt(student.Age)); // Parse to int
    setEditedGrade(student.Grade);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setEditedFirstName("");
    setEditedLastName("");
    setEditedAge(0);
    setEditedGrade("");
  };

  const handleSaveEdit = async () => {
    if (editingStudent) {
      const updatedStudent = {
        ...editingStudent,
        FirstName: editedFirstName,
        LastName: editedLastName,
        Age: editedAge,
        Grade: editedGrade,
      };
      try {
        const response = await fetch(
          `http://localhost:5000/students/${updatedStudent.ID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedStudent),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update student");
        }
        const updatedStudentData = await response.json();
        const updatedStudents = students.map((student) =>
          student.ID === updatedStudentData.ID ? updatedStudentData : student
        );
        setStudents(updatedStudents);
        setEditingStudent(null);
        setEditedFirstName("");
        setEditedLastName("");
        setEditedAge(0);
        setEditedGrade("");
        toast.success("การแก้ไขข้อมูลเสร็จสมบูรณ์");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (row) => {
    if (confirmingRow === row) {
      try {
        const response = await fetch(`http://localhost:5000/students/${row.ID}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete student");
        }
        const deletedStudentId = row.ID;
        const updatedStudents = students.filter((student) => student.ID !== deletedStudentId);
        setStudents(updatedStudents);
        setConfirmingRow(null);
        toast.success("ลบข้อมูลนักเรียนเรียบร้อยแล้ว");
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
    if (name === "age") {
      setNewStudentData({ ...newStudentData, [name]: Math.max(0, parseInt(value)) });
    } else {
      setNewStudentData({ ...newStudentData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudentData),
      });
      if (!response.ok) {
        throw new Error("Failed to add student");
      }
      const studentData = await response.json();
      setStudents([...students, studentData]);
      setNewStudentData({ firstName: "", lastName: "", age: 0, grade: "" });
      toast.success("เพิ่มข้อมูลนักเรียนเรียบร้อยแล้ว");
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4 animate__animated animate__zoomInUp text-center custom-text-shadow pt-5">
        นักเรียน
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
            เพิ่ม
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-300 custom-text-shadow">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ชื่อ
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                นามสกุล
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                อายุ
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                เกรด
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                การกระทำ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {currentStudents.map((row) => (
              <tr key={row.ID} className="hover:bg-gray-100">
                <td className=" cusTd px-6 py-4 whitespace-nowrap">
                  {editingStudent === row ? (
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
                  {editingStudent === row ? (
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
                  {editingStudent === row ? (
                    <input
                      type="number"
                      value={editedAge}
                      onChange={(e) => setEditedAge(Math.max(0, parseInt(e.target.value)))}
                      className="border-gray-300 rounded-md w-full focus:p-3 focus:text-xl"
                    />
                  ) : (
                    row.Age
                  )}
                </td>
                <td className="cusTd px-6 py-4 whitespace-nowrap">
                  {editingStudent === row ? (
                    <select
                      value={editedGrade}
                      onChange={(e) => setEditedGrade(e.target.value)}
                      className="border-gray-300 rounded-md w-full focus:p-3 focus:text-xl"
                    >
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                      <option value="0">0</option>
                    </select>
                  ) : (
                    row.Grade
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {confirmingRow === row ? (
                    <>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleDelete(row)}
                      >
                        ยืนยัน
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setConfirmingRow(null)}
                      >
                        ยกเลิก
                      </button>
                    </>
                  ) : (
                    <>
                      {editingStudent === row ? (
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
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => handleEdit(row)}
                          >
                            แก้ไข
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setConfirmingRow(row)}
                          >
                            ลบ
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
        <h2 className="text-2xl font-semibold mb-4">เพิ่มข้อมูล</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
              ชื่อ
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="กรอกชื่อ"
              value={newStudentData.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              นามสกุล
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="กรอกนามสกุล"
              value={newStudentData.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="age"
              className="text-sm font-medium text-gray-700"
            >
              อายุ
            </label>
            <input
              type="number"
              id="age"  
              name="age"
              placeholder="กรอกอายุ"
              value={newStudentData.age}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="grade"
              className="text-sm font-medium text-gray-700"
            >
              เกรด
            </label>
            <select
              id="grade"
              name="grade"
              value={newStudentData.grade}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
              <option value="0">0</option>
            </select>
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
          {Array.from({ length: Math.ceil(students.length / studentsPerPage) }).map(
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

export default Student;
