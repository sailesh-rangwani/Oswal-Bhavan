import React from "react";

const FilterrMember = ({ filterr, handleFilterrChange }) => {
  return (
    <div>
      <select
        className="form-select w-32 mr-4 py-2"
        name="field"
        value={filterr.field}
        onChange={handleFilterrChange}
      >
        <option value="">Choose Field 2</option>
        <option value="memberFirstName">First Name</option>
        <option value="memberLastName">Last Name</option>
        <option value="fatherName">Father's Name</option>
        <option value="age">Age</option>
        <option value="native">Native</option>
        <option value="business">Business</option>
        <option value="officeAddress">Office Address</option>
        <option value="homeAddress">Home Address</option>
        <option value="area">Area</option>
        <option value="mobileNo">Mobile Number</option>
        <option value="emailID">Email ID</option>
        <option value="chequeNo">Membership Number</option>
        <option value="dateOfRegistration">Date Of Registration</option>
        <option value="representative1_name">Representative1_name</option>
        <option value="representative1_mobileNo">
          Representative1_mobileNo
        </option>
        <option value="representative2_name">Representative2_name</option>
        <option value="representative2_mobileNo">
          Representative2_mobileNo
        </option>
        <option value="referredByBoardMember">Referred by Board Member</option>
        <option value="applicationType">Membership Type</option>
        <option value="membershipFee">Membership Fee</option>
        <option value="membershipno">Membership No</option>
      </select>
      <input
        className="form-input w-64 pb-[5.5px] text-lg border-b-2 border-gray-200 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        type="text"
        name="value"
        value={filterr.value}
        onChange={handleFilterrChange}
        placeholder="Filter Value"
      />
    </div>
  );
};

export default FilterrMember;
