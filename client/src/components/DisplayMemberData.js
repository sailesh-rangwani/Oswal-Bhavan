import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { DatePicker } from "react-responsive-datepicker";
import * as moment from "moment";

const DisplayMemberData = ({
  member,
  key,
  handleDeleteMember,
  handleSaveEdit,
}) => {
  const [editingMember, setEditingMember] = useState(null);
  const [isOpen1, setIsOpen1] = useState(true);

  const [memberFirstName, setMemberFirstName] = useState("");
  const [memberLastName, setMemberLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [years, setYears] = useState("");
  const [native, setNative] = useState("");
  const [business, setBusiness] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [area, setArea] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [emailID, setEmailID] = useState("");
  const [chequeNo, setChequeNo] = useState("");
  const [dateOfRegistration, setDateOfRegistration] = useState("");
  const [representative1_name, setRepresentative1_name] = useState("");
  const [representative1_mobileNo, setRepresentative1_mobileNo] = useState("");
  const [representative2_name, setRepresentative2_name] = useState("");
  const [representative2_mobileNo, setRepresentative2_mobileNo] = useState("");
  const [referredByBoardMember, setReferredByBoardMember] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [membershipFee, setMembershipFee] = useState("");
  const [membershipno, setMembershipno] = useState("");

  const handleEditClick = (member) => {
    setEditingMember(member);
    setMemberFirstName(member.memberFirstName);
    setMemberLastName(member.memberLastName);
    setFatherName(member.fatherName);
    setYears(member.age);
    setNative(member.native);
    setBusiness(member.business);
    setOfficeAddress(member.officeAddress);
    setHomeAddress(member.homeAddress);
    setArea(member.area);
    setMobileNo(member.mobileNo);
    setEmailID(member.emailID);
    setChequeNo(member.chequeNo);
    setRepresentative1_name(member.representative1_name);
    setRepresentative1_mobileNo(member.representative1_mobileNo);
    setRepresentative2_name(member.representative2_name);
    setRepresentative2_mobileNo(member.representative2_mobileNo);
    setReferredByBoardMember(member.referredByBoardMember);
    setApplicationType(member.applicationType);
    setMembershipFee(member.membershipFee);
    setMembershipno(member.membershipno);
    setDateOfRegistration(member.dateOfRegistration);
  };

  const handleCancelEdit = () => {
    setEditingMember(null);
    setMemberFirstName("");
    setMemberLastName("");
    setFatherName("");
    setYears("");
    setNative("");
    setBusiness("");
    setOfficeAddress("");
    setHomeAddress("");
    setArea("");
    setMobileNo("");
    setEmailID("");
    setChequeNo("");
    setRepresentative1_name("");
    setRepresentative1_mobileNo("");
    setRepresentative2_name("");
    setRepresentative2_mobileNo("");
    setReferredByBoardMember("");
    setApplicationType("");
    setMembershipFee("");
    setMembershipno("");
    setDateOfRegistration("");
  };

  return (
    <>
      <tr key={key}>
        {editingMember && editingMember._id === member._id ? (
          <>
            <td className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10">
                  <img
                    className="w-10 h-10 rounded-full border border"
                    src={`${member.photo
                        ? `data:image/png;base64,${member.photo}`
                        : "/no-photo.png"
                      }`}
                    alt="No img"
                  />
                </div>

                <div className="ml-4">
                  <div className="leading-5">
                    <input
                      type="text"
                      name="memberFirstName"
                      value={memberFirstName}
                      onChange={(e) => setMemberFirstName(e.target.value)}
                      placeholder="First Name"
                      className="mt-1 block w-max py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="ml-4">
                  <div className="leading-5">
                    <input
                      type="text"
                      name="memberLastName"
                      value={memberLastName}
                      onChange={(e) => setMemberLastName(e.target.value)}
                      placeholder="Last Name"
                      className="mt-1 block w-max py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <input
                  type="text"
                  name="fatherName"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  placeholder="Father’s Name"
                  className="mt-1 block w-max py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <input
                  type="text"
                  name="years"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="dd-mm-yyyy / Age"
                  className="mt-1 block w-max py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <select
                  name="native"
                  value={native}
                  onChange={(e) => setNative(e.target.value)}
                  className="mt-1 block w-max py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
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
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <input
                  type="text"
                  name="business"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder="Business"
                  className="mt-1 block w-max py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200 whitespace-normal">
              <div className="leading-5">
                <textarea
                  name="officeAddress"
                  value={officeAddress}
                  onChange={(e) => setOfficeAddress(e.target.value)}
                  rows={4}
                  className="py-2 px-3 w-max placeholder-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder=""
                  required
                />
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200 whitespace-normal">
              <div className="leading-5">
                <textarea
                  name="homeAddress"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  rows={4}
                  className="py-2 px-3 w-max placeholder-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder=""
                  required
                />
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200 whitespace-normal">
              <div className="leading-5">
                <textarea
                  name="area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  rows={1}
                  className="py-2 px-3 w-max placeholder-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder=""
                  required
                />
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center py-2 px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <input
                    type="text"
                    name="mobileNo"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    className="focus:ring-indigo-500 w-max border focus:border-indigo-500 px-3 flex-1 block w-1 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="000-000-0000"
                    required
                  />
                </div>
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <input
                  type="text"
                  name="emailID"
                  value={emailID}
                  onChange={(e) => setEmailID(e.target.value)}
                  placeholder="abc@xyz.com"
                  className="mt-1 block w-max py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <input
                  type="text"
                  name="chequeNo"
                  value={chequeNo}
                  onChange={(e) => setChequeNo(e.target.value)}
                  placeholder=""
                  className="mt-1 block w-max py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </td>

            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <input
                  type="text"
                  name="representative1_name"
                  value={representative1_name}
                  onChange={(e) => setRepresentative1_name(e.target.value)}
                  placeholder="Representative Name"
                  className="mt-1 block w-max py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center py-2 px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <input
                    type="text"
                    name="representative2_mobileNo"
                    value={representative1_mobileNo}
                    onChange={(e) =>
                      setRepresentative1_mobileNo(e.target.value)
                    }
                    className="focus:ring-indigo-500 border focus:border-indigo-500 px-3 flex-1 block w-1 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="000-000-0000"
                    required
                  />
                </div>
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <input
                  type="text"
                  name="representative2_name"
                  value={representative2_name}
                  onChange={(e) => setRepresentative2_name(e.target.value)}
                  placeholder="Representative Name"
                  className="mt-1 block w-max py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center py-2 px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <input
                    type="text"
                    name="representative2_mobileNo"
                    value={representative2_mobileNo}
                    onChange={(e) =>
                      setRepresentative2_mobileNo(e.target.value)
                    }
                    className="focus:ring-indigo-500 border focus:border-indigo-500 px-3 flex-1 block w-1 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="000-000-0000"
                    required
                  />
                </div>
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <input
                  type="text"
                  name="referredByBoardMember"
                  value={referredByBoardMember}
                  onChange={(e) => setReferredByBoardMember(e.target.value)}
                  placeholder="Referred by Board Member"
                  className="mt-1 block w-max py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <select
                  name="applicationType"
                  value={applicationType}
                  onChange={(e) => setApplicationType(e.target.value)}
                  className="mt-1 block w-max py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Trusty</option>
                  <option>Sanrakshak</option>
                  <option>Sthai</option>
                  <option>Vishesh</option>
                  <option>Sadharan</option>
                </select>
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <input
                  type="text"
                  name="membershipFee"
                  value={membershipFee}
                  onChange={(e) => setMembershipFee(e.target.value)}
                  placeholder="Membership Fee"
                  className="mt-1 block w-max py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <input
                  type="text"
                  name="membershipno"
                  value={membershipno}
                  onChange={(e) => setMembershipno(e.target.value)}
                  placeholder="Membership no"
                  className="mt-1 block w-max py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                {/* set datepicker here */}
                <input
                  type="text"
                  name="dateOfRegistration"
                  value={dateOfRegistration}
                  onChange={(e) => setDateOfRegistration(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="mt-1 block w-max py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <button
                  onClick={handleCancelEdit}
                  className="border rounded-lg p-2 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  className="border p-2 rounded-lg ml-3 hover:bg-gray-300"
                  onClick={() => {
                    handleSaveEdit(member._id, {
                      memberFirstName,
                      memberLastName,
                      fatherName,
                      years,
                      native,
                      business,
                      officeAddress,
                      homeAddress,
                      area,
                      mobileNo,
                      emailID,
                      chequeNo,
                      dateOfRegistration,
                      representative1_name,
                      representative1_mobileNo,
                      representative2_name,
                      representative2_mobileNo,
                      referredByBoardMember,
                      applicationType,
                      membershipFee,
                      membershipno,
                    });
                    setEditingMember(null);
                    setMemberFirstName("");
                    setMemberLastName("");
                    setFatherName("");
                    setYears("");
                    setNative("");
                    setBusiness("");
                    setOfficeAddress("");
                    setHomeAddress("");
                    setArea("");
                    setMobileNo("");
                    setEmailID("");
                    setChequeNo("");
                    setDateOfRegistration("");
                    setRepresentative1_name("");
                    setRepresentative1_mobileNo("");
                    setRepresentative2_name("");
                    setRepresentative2_mobileNo("");
                    setReferredByBoardMember("");
                    setApplicationType("");
                    setMembershipFee("");
                    setMembershipno("");
                  }}
                >
                  Save
                </button>
              </div>
            </td>
          </>
        ) : (
          <>
            <td className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10">
                  <img
                    className="w-10 h-10 rounded-full border border"
                    src={`${member.photo
                        ? `data:image/png;base64,${member.photo}`
                        : "/no-photo.png"
                      }`}
                    alt="No img"
                  />
                </div>

                <div className="ml-4">
                  <div className="leading-5">
                    {member.memberFirstName} {member.memberLastName}
                  </div>
                </div>
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">{member.fatherName}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                {isNaN(member.age) ? "" : member.age}
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">{member.native}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">{member.business}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200 whitespace-normal">
              <div className="leading-5">{member.officeAddress}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200 whitespace-normal">
              <div className="leading-5">{member.homeAddress}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200 whitespace-normal">
              <div className="leading-5">{member.area}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">{member.mobileNo}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">{member.emailID}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">{member.chequeNo}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">{member.representative1_name}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">{member.representative1_mobileNo}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">{member.representative2_name}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">{member.representative2_mobileNo}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">{member.referredByBoardMember}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">{member.applicationType}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">{member.membershipFee}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">{member.membershipno}</div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                {moment(member.dateOfRegistration).format("DD/MM/YYYY")}
              </div>
            </td>
            <td className="border px-6 py-4 border-b border-gray-200">
              <div className="leading-5">
                <button
                  onClick={() => handleEditClick(member)}
                  className="text-xl"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDeleteMember(member._id)}
                  className="text-lg ml-3"
                >
                  <AiFillDelete />
                </button>
              </div>
            </td>
          </>
        )}
      </tr>
    </>
  );
};

export default DisplayMemberData;
