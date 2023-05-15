import React, { useEffect, useRef, useState } from "react";
import { DatePicker } from "react-responsive-datepicker";
import * as moment from "moment";

const MembershipForm = ({
  onSubmitInfo,
  formData,
  formErrors,
  dateOfRegistration,
  setDateOfRegistration,
  dob,
  setDob,
  onChange,
  onChangeFile,
  handleFileChange,
  handleUpload,
}) => {
  const dataFetchedRef = useRef(false);
  const hiddenFileInput = useRef(null);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (dataFetchedRef.current) return;

    dataFetchedRef.current = true;

    if (typeof window == "undefined") return;

    const dropbox = document.querySelector(".dropbox");

    const handleFiles = (files) => {
      if (
        dropbox.firstChild &&
        dropbox.firstChild.classList.contains("dropbox-description-container")
      ) {
        while (dropbox.firstChild) {
          dropbox.removeChild(dropbox.firstChild);
        }
      }

      const file = files[0];

      if (!file.type.startsWith("image")) {
        alert(
          `${file.name} is not supported because it is of type ${file.type}.`
        );
      }
      const imgElement = document.createElement("img");
      imgElement.file = file;
      imgElement.className = "h-24 m-2 inline rounded-md hover:opacity-80";
      dropbox.appendChild(imgElement);

      let reader = new FileReader();

      reader.onload = (function (aImg) {
        return function (e) {
          aImg.src = e.target.result;
        };
      })(imgElement);

      reader.readAsDataURL(file);
    };

    dropbox.addEventListener("dragenter", (event) => {
      event.target.classList.add("border-indigo-500");
    });
    dropbox.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    dropbox.addEventListener("dragleave", (event) => {
      event.target.classList.remove("border-indigo-500");
    });
    dropbox.addEventListener("drop", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const files = event.dataTransfer.files;
      handleFiles(files);
    });

    const fileUpload = document.querySelector("#photo");

    fileUpload.addEventListener("change", (event) => {
      const files = event.target.files;
      handleFiles(files);
    });
  }, []);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  
  const currentDate = new Date();
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg sm:mx-7 mt-7 font-medium leading-6 text-gray-900">
              Register Member
            </h3>
            <p className="mt-1 sm:mx-7 text-sm text-gray-600">
              Or click{" "}
              <span
                onClick={handleClick}
                className="text-blue-800 underline cursor-pointer"
              >
                here
              </span>{" "}
              to upload data in bulk (upload xlsx format file)
            </p>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={(e) => {
                if (e.target.files[0]) setFileName(e.target.files[0].name);
                else setFileName("");
                handleFileChange(e);
              }}
              className="hidden"
            />
            <p
              className={`${fileName ? "" : "hidden"
                } flex flex-col mt-1 sm:mx-7 mt-2 text-sm text-green-600`}
            >
              File Name: {fileName}
              <button
                onClick={handleUpload}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-fit mt-2 px-4 rounded"
              >
                Upload
              </button>
            </p>
          </div>
        </div>
        <div className="mb-5 sm:mr-5 md:col-span-2">
          <div>
            <div className="shadow-md rounded-t-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="mt-1 grid sm:grid-cols-2 gap-3 sm:gap-6">
                  <div className="mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="memberFirstName"
                      className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-pink-500"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="memberFirstName"
                      value={formData.memberFirstName}
                      onChange={onChange}
                      placeholder="Enter First Name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    // required
                    />
                    <p className="mt-2 ml-[2px] text-red-500 text-sm">
                      {formErrors.memberFirstName}
                    </p>
                  </div>

                  <div className="mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="memberLastName"
                      className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-pink-500"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="memberLastName"
                      value={formData.memberLastName}
                      onChange={onChange}
                      placeholder="Enter Last Name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    // required
                    />
                    <p className="mt-2 ml-[2px] text-red-500 text-sm">
                      {formErrors.memberLastName}
                    </p>
                  </div>
                </div>

                <div className="mt-1 grid sm:grid-cols-2 gap-3 sm:gap-6">
                  <div className="sm:mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="fatherName"
                      className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-pink-500"
                    >
                      Father’s Name
                    </label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={onChange}
                      placeholder="Father’s Name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    // required
                    />
                    <p className="mt-2 ml-[2px] text-red-500 text-sm">
                      {formErrors.fatherName}
                    </p>
                  </div>

                  <div className="mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="years"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Birth Date / Age
                    </label>
                    <span
                      onClick={() => setIsOpen1(true)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {dob
                        ? moment(dob).format("DD/MM/YYYY")
                        : "Click here to select"}
                    </span>
                    <DatePicker
                      isOpen={isOpen1}
                      onClose={() => setIsOpen1(false)}
                      maxDate={new Date()}
                      headerFormat="DD, MM dd"
                      defaultValue={currentDate}
                      onChange={(date) => setDob(date)}
                    />
                  </div>
                </div>

                <div className="mt-1 grid sm:grid-cols-2 gap-3 sm:gap-6">
                  <div className="sm:mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="native"
                      className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-pink-500"
                    >
                      Native
                    </label>
                    <select
                      name="native"
                      value={formData.native}
                      onChange={onChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    // required
                    >
                      <option value="none" defaultValue>
                        Select Native
                      </option>
                      <option>AJEET</option>
                      <option>ASADA</option>
                      <option>ASOTRA</option>
                      <option>BALOTRA</option>
                      <option>BARMER</option>
                      <option>BARMER C/O RAMSAR</option>
                      <option>BHALRO KA WADA</option>
                      <option>BHORDA</option>
                      <option>BHORANDA</option>
                      <option>BURIWADA</option>
                      <option>BISHALA</option>
                      <option>CHOHATAN</option>
                      <option>DHUNDHADA</option>
                      <option>DHORIMNA</option>
                      <option>DHORMIYA</option>
                      <option>JASOL</option>
                      <option>KANANA</option>
                      <option>KALYANPUR</option>
                      <option>KARMAWAS</option>
                      <option>KHANDAP</option>
                      <option>KOTDI</option>
                      <option>KORNA</option>
                      <option>MAJAL</option>
                      <option>MITHODA</option>
                      <option>MOKALSAR</option>
                      <option>PACHPADARA</option>
                      <option>PADRU</option>
                      <option>PARLU</option>
                      <option>PATODI</option>
                      <option>RAKHI</option>
                      <option>RAMANIYA</option>
                      <option>SALAWAS</option>
                      <option>SAMDHARI</option>
                      <option>SIWANA</option>
                      <option>SOIENTRA</option>
                      <option>TAPRA</option>
                      <option>THOB</option>
                    </select>
                    <p className="mt-2 ml-[2px] text-red-500 text-sm">
                      {formErrors.native}
                    </p>
                  </div>

                  <div className="sm:mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="business"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Business
                    </label>
                    <input
                      type="text"
                      name="business"
                      value={formData.business}
                      onChange={onChange}
                      placeholder="Business"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="officeAddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Office Address
                  </label>
                  <div className="mt-1">
                    <textarea
                      name="officeAddress"
                      value={formData.officeAddress}
                      onChange={onChange}
                      rows={4}
                      className="py-2 px-3 placeholder-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder=""
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="homeAddress"
                    className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-pink-500"
                  >
                    Home Address
                  </label>
                  <div className="mt-1">
                    <textarea
                      name="homeAddress"
                      value={formData.homeAddress}
                      onChange={onChange}
                      rows={4}
                      className="py-2 px-3 placeholder-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder=""
                    // required
                    />
                    <p className="mt-2 ml-[2px] text-red-500 text-sm">
                      {formErrors.homeAddress}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="area"
                    className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-pink-500"
                  >
                    Area
                  </label>
                  <div className="mt-1">
                    <textarea
                      name="area"
                      value={formData.area}
                      onChange={onChange}
                      rows={1}
                      className="py-2 px-3 placeholder-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Enter Area"
                    // required
                    />
                    <p className="mt-2 ml-[2px] text-red-500 text-sm">
                      {formErrors.area}
                    </p>
                  </div>
                </div>

                <div className="mt-1 grid sm:grid-cols-2 gap-3 sm:gap-6">
                  <div className="mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="mobileNo"
                      className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-pink-500"
                    >
                      Mobile Number
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center py-2 px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        +91
                      </span>
                      <input
                        type="text"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={onChange}
                        className="focus:ring-indigo-500 border focus:border-indigo-500 px-3 flex-1 block w-1 rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="XXXXXXXXXX"
                      // required
                      />
                    </div>
                    <p className="mt-2 ml-[2px] text-red-500 text-sm">
                      {formErrors.mobileNo}
                    </p>
                  </div>

                  <div className="sm:mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="emailID"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="emailID"
                      value={formData.emailID}
                      onChange={onChange}
                      placeholder="abc@xyz.com"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <p className="mt-2 ml-[2px] text-red-500 text-sm">
                      {formErrors.emailID}
                    </p>
                  </div>
                </div>

                <div className="mt-1 grid sm:grid-cols-1 gap-3 sm:gap-6">
                  <div className="mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="chequeNo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cheque Number
                    </label>
                    <input
                      type="text"
                      name="chequeNo"
                      value={formData.chequeNo}
                      onChange={onChange}
                      placeholder="Enter Cheque No"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Photo
                  </label>
                  <div className="dropbox my-2 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="dropbox-description-container space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="text-sm max-w-full text-gray-600">
                        <label
                          htmlFor="photo"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload photo</span>
                          <input
                            name="photo"
                            id="photo"
                            onChange={onChangeFile}
                            type="file"
                            className="sr-only"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-1 grid sm:grid-cols-2 gap-3 sm:gap-6">
                  <div className="mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="representative1_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Representative Name 1
                    </label>
                    <input
                      type="text"
                      name="representative1_name"
                      value={formData.representative1_name}
                      onChange={onChange}
                      placeholder="Enter Representative Name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="representative1_mobileNo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mobile Number
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center py-2 px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        +91
                      </span>
                      <input
                        type="text"
                        name="representative1_mobileNo"
                        value={formData.representative1_mobileNo}
                        onChange={onChange}
                        className="focus:ring-indigo-500 border focus:border-indigo-500 px-3 flex-1 block w-1 rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="XXXXXXXXXX"
                      />
                    </div>
                    <p className="mt-2 ml-[2px] text-red-500 text-sm">
                      {formErrors.representative1_mobileNo}
                    </p>
                  </div>
                </div>

                <div className="mt-1 grid sm:grid-cols-2 gap-3 sm:gap-6">
                  <div className="mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="representative2_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Representative Name 2
                    </label>
                    <input
                      type="text"
                      name="representative2_name"
                      value={formData.representative2_name}
                      onChange={onChange}
                      placeholder="Enter Representative Name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="representative2_mobileNo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mobile Number
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center py-2 px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        +91
                      </span>
                      <input
                        type="text"
                        name="representative2_mobileNo"
                        value={formData.representative2_mobileNo}
                        onChange={onChange}
                        className="focus:ring-indigo-500 border focus:border-indigo-500 px-3 flex-1 block w-1 rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="XXXXXXXXXX"
                      />
                    </div>
                    <p className="mt-2 ml-[2px] text-red-500 text-sm">
                      {formErrors.representative2_mobileNo}
                    </p>
                  </div>
                </div>
                <div className="mt-1 grid sm:grid-cols-2 gap-3 sm:gap-6">
                  <div className="mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="referredByBoardMember"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Referred by Board Member
                    </label>
                    <input
                      type="text"
                      name="referredByBoardMember"
                      value={formData.referredByBoardMember}
                      onChange={onChange}
                      placeholder="Enter referred by Board Member"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="applicationType"
                      className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-pink-500"
                    >
                      Membership Type
                    </label>
                    <select
                      name="applicationType"
                      value={formData.applicationType}
                      onChange={onChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="none" defaultValue>
                        Select Membership Type
                      </option>
                      <option>Trusty</option>
                      <option>Sanrakshak</option>
                      <option>Sthai</option>
                      <option>Vishesh</option>
                      <option>Sadharan</option>
                    </select>
                    <p className="mt-2 ml-[2px] text-red-500 text-sm">
                      {formErrors.applicationType}
                    </p>
                  </div>
                </div>
                <div className="mt-1 grid grid-cols-2 gap-6">
                  <div className="mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="membershipFee"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Membership Fee
                    </label>
                    <input
                      type="text"
                      name="membershipFee"
                      value={formData.membershipFee}
                      onChange={onChange}
                      placeholder="Enter Membership Fee"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="membershipno"
                      className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-pink-500"
                    >
                      Membership No.
                    </label>
                    <input
                      type="text"
                      name="membershipno"
                      value={formData.membershipno}
                      onChange={onChange}
                      placeholder="Enter Membership No."
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                     <p className="mt-2 ml-[2px] text-red-500 text-sm">
                      {formErrors.membershipno}
                    </p>
                  </div>
                </div>

                <div className="mt-1 grid grid-cols-1 gap-6">
                  <div className="sm:mb-2 max-w-full sm:col-span-1">
                    <label
                      htmlFor="dateOfRegistration"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date of Registration
                    </label>
                    <span
                      onClick={() => setIsOpen2(true)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {dateOfRegistration
                        ? moment(dateOfRegistration).format("DD/MM/YYYY")
                        : "Click here to select"}
                    </span>
                    <DatePicker
                      isOpen={isOpen2}
                      selected={currentDate}
                      onClose={() => setIsOpen2(false)}
                      maxDate={new Date()}
                      headerFormat="DD, MM dd"
                      defaultValue={currentDate}
                      onChange={(date) => setDateOfRegistration(date)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-5 bg-gray-50 border rounded-b-xl text-right sm:px-6">
              <button
                type="submit"
                onClick={onSubmitInfo}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
