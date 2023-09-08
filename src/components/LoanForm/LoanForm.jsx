import React, { useState } from "react";
import "./LoanForm.css";
import Modal from "../Modal/Modal";

function LoanForm() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    isEmployee: false,
    salary: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const salaryOptions = [
    "Less than $25,000",
    "$25,000 - $50,000",
    "More than $50,000",
  ];

  const isFormValid = () => {
    return (
      formData.name !== "" &&
      formData.phoneNumber !== "" &&
      formData.age !== "" &&
      formData.salary !== ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.age < 18 || formData.age > 65 || isNaN(formData.age)) {
      newErrors.age = "Age must be between 18 and 65";
    }

    if (formData.phoneNumber.length !== 10 || isNaN(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (newErrors.age || newErrors.phoneNumber) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setSuccess(true);
    }
  };

  const closeModal = () => {
    setSuccess(false);
    setErrors({});
  };

  return (
    <div className="container">
      <h1>Requesting a Loan</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(event) => {
            setFormData({ ...formData, name: event.target.value });
          }}
        />
        <br />
        <label htmlFor="phoneNumber">Phone Number: </label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={(event) => {
            setFormData({ ...formData, phoneNumber: event.target.value });
          }}
        />
        <br />

        <label htmlFor="age"> Age: </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={(event) => {
            setFormData({ ...formData, age: event.target.value });
          }}
        />
        <br />
        <label htmlFor="employee"> Are you an employee? </label>
        <br />
        <div className="checkBox">
          <input
            type="checkbox"
            name="isEmployee"
            checked={formData.isEmployee}
            onChange={(event) => {
              setFormData({ ...formData, isEmployee: event.target.checked });
            }}
          />
          Yes
        </div>
        <br />
        <label htmlFor="salary">Salary: </label>
        <select
          name="salary"
          value={formData.salary}
          onChange={(event) => {
            setFormData({ ...formData, salary: event.target.value });
          }}
        >
          {salaryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <br />
        <button type="submit" value="Submit" disabled={!isFormValid()}>
          Submit
        </button>
      </form>

      {success && (
        <Modal message="Form submitted successfully!" onClose={closeModal} />
      )}

      {(errors.age || errors.phoneNumber) && (
        <Modal
          message={errors.age || errors.phoneNumber}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default LoanForm;
