import Head from "next/head";
import { useRouter } from "next/router";

import { useState, useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { utils, writeFile } from "xlsx";
import * as moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

import SideBar from "../components/SideBar";
import FilterMemberList from "../components/FilterMemberList";
import FilterrMember from "../components/Filterrmember";
import ExportMemberList from "../components/ExportMemberList";
import DisplayMemberList from "../components/DisplayMemberList";
import Pagination from "../components/Pagination";
import { getMembers, deleteMember, editMember, sendSms } from "../utils/api";
import SendSms from "../components/SendSms";

export default function MemberListPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
      } else {
        injectStyle();
      }
    } catch (err) {
      router.push("/login");
    }
  }, []);

  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [allMemberDetails, setAllMemberDetails] = useState([]);
  const [filter, setFilter] = useState({ field: "", value: "" });
  const [filterr, setFilterr] = useState({ field: "", value: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage, setMembersPerPage] = useState(10);

  function exportToPdf(filteredData) {
    const doc = new jsPDF({ orientation: "landscape" });

    const table = [];

    filteredData.forEach((member) => {
      const memberData = [
        `${member.memberFirstName}  ${member.memberLastName}`,
        member.fatherName,
        member.native,
        member.homeAddress,
        member.area,
        member.mobileNo,
        member.chequeNo,
        member.dateOfRegistration,
        member.referredByBoardMember,
        member.applicationType,
        member.membershipFee
      ];
      table.push(memberData);
    });

    const headers = [
      [
        "Member Name",
        "Father's Name",
        "Native",
        "Home Address",
        "Area",
        "Mobile No.",
        "Cheque No.",
        "Date of Registeration",
        "Referred By Board Member",
        "Application Type",
        "Membership Form"
      ],
    ];

    let content = {
      head: headers,
      body: table,
      styles: {
        cellPadding: 1,
      },
    };

    doc.autoTable(content);

    doc.save("filtered-members.pdf");
  }

  function exportToXls(filteredData) {
    const workbook = utils.book_new();
    var finalFilteredData = filteredData.map(
      ({
        memberFirstName,
        memberLastName,
        fatherName,
        age,
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
      }) => ({
        memberFirstName,
        memberLastName,
        fatherName,
        age,
        native,
        business,
        officeAddress,
        homeAddress,
        area,
        mobileNo,
        emailID,
        chequeNo,
        dateOfRegistration: moment(dateOfRegistration).format("DD/MM/YYYY"),
        representative1_name,
        representative1_mobileNo,
        representative2_name,
        representative2_mobileNo,
        referredByBoardMember,
        applicationType,
        membershipFee,
      })
    );
    const worksheet = utils.json_to_sheet(finalFilteredData);
    utils.book_append_sheet(workbook, worksheet, "Filtered Members");
    writeFile(workbook, "filtered-members.xlsx");
  }

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  async function fetchData(is_under_action) {
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    let result;

    if (is_under_action) {
      result = await getMembers(config);
    } else {
      result = await toast.promise(getMembers(config), {
        pending: {
          render() {
            return "Loading data...";
          },
          icon: false,
        },
        success: {
          render({ data }) {
            return `Done`;
          },
          icon: "🟢",
        },
        error: {
          render({ data }) {
            return `Could not find data`;
          },
        },
      });
    }

    const finResult = result.map((resultData) =>
      resultData.photo
        ? { ...resultData, photo: arrayBufferToBase64(resultData.photo.data) }
        : resultData
    );
    setAllMemberDetails(finResult);
  }

  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;

    dataFetchedRef.current = true;

    if (typeof window == "undefined") return;

    fetchData(false);
  });

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterrChange = (e) => { //change
    setFilterr({
      ...filterr,
      [e.target.name]: e.target.value,
    });
  };

  const filteredMembers = allMemberDetails.filter((member) => {
    if (!filter.field || !filter.value) {
      return true;
    }

    return member[filter.field]
      .toLowerCase()
      .includes(filter.value.toLowerCase());
  });

  //changes start from here
  
  let finalFilteredMembers = filteredMembers.filter((member) => {
    if (!filterr.field || !filterr.value) {
      return true;
    }

    return member[filterr.field]
      .toLowerCase()
      .includes(filterr.value.toLowerCase());
  });

  const handleDeleteMember = async (id) => {
    const is_confirmed = confirm("Do you want to delete the information ?");

    if (is_confirmed) {
      const config = {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      };

      await toast.promise(deleteMember(id, config), {
        pending: {
          render() {
            return "Deleting member...";
          },
          icon: false,
        },
        success: {
          render() {
            setAllMemberDetails(
              finalFilteredMembers.filter((member) => member._id !== id)
            );
            fetchData(true);

            return `Done`;
          },
          icon: "🟢",
        },
        error: {
          render() {
            setAllMemberDetails(
              finalFilteredMembers.filter((member) => member._id !== id)
            );
            return `Could not delete member`;
          },
        },
      });
    }
  };
//till here

  const handleSaveEdit = async (id, updates) => {
    const is_confirmed = confirm("Do you want to edit the information ?");

    if (is_confirmed) {
      const is_date = moment(updates.years, "DD-MM-YYYY", true).isValid();

      let convert_date = moment(updates.years, "DD-MM-YYYY");
      let age_num;

      if (is_date) {
        age_num = moment().diff(convert_date, "years");
      } else {
        age_num = updates.years;
      }

      const age = age_num.toString();

      updates = { ...updates, age };

      const result = await toast.promise(editMember(id, updates), {
        pending: {
          render() {
            return "Saving...";
          },
          icon: false,
        },
        success: {
          render(data) {
            finalFilteredMembers = filteredMembers.map((member) =>
              member._id === id ? { ...member, ...data } : { member }
            );
            fetchData(true);

            return `Saving...`;
          },
          icon: "🟢",
        },
        error: {
          render() {
            return `Could not edit member`;
          },
        },
      });
    }
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = finalFilteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSendSms = () => {
    // Code for sending sms through api
  };

  return (
    <>
      <Head>
        <title>Admin Website Demo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <div className="flex">
        <SideBar setSideBarOpen={setSideBarOpen} />
        <div
          className={`h-screen px-12 py-7 ${sideBarOpen ? "w-[83%] ml-64 sm:ml-72" : "w-[95.85%] ml-20"
            } duration-300`}
        >
          <div className="flex justify-center items-center py-6 mb-6">
            <div className="mx-4">
              <FilterMemberList
                filter={filter}
                handleFilterChange={handleFilterChange}
              />
            </div>
            <div className="mx-4">
              <FilterrMember
                filterr={filterr}
                handleFilterrChange={handleFilterrChange}
              />
            </div>
          </div>
          <div className="flex justify-center items-center py-6 mb-6">
            <div className="mx-4">
              <SendSms handleSendSms={handleSendSms} />
            </div>
            <div className="mx-4">
              <ExportMemberList
                exportToPdf={exportToPdf}
                exportToXls={exportToXls}
                filteredMembers={filteredMembers}
              />
            </div>
          </div>
          <DisplayMemberList
            filteredMembers={currentMembers}
            handleDeleteMember={handleDeleteMember}
            handleSaveEdit={handleSaveEdit}
          />
          <Pagination
            totalMembers={filteredMembers.length}
            membersPerPage={membersPerPage}
            paginate={paginate}
          />
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
