import Head from "next/head";
import { useRouter } from "next/router";
import * as moment from "moment";

import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

import SideBar from "../components/SideBar";
import MembershipForm from "../components/MembershipForm";
import { registerMember } from "../utils/api";
import { bulkUpload } from "../utils/api";

export default function MemberFormPage() {
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

  const [dateOfRegistration, setDateOfRegistration] = useState(null);
  const [dob, setDob] = useState(null);
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [file, setFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [formData, setFormData] = useState({
    memberFirstName: "",
    memberLastName: "",
    fatherName: "",
    native: "",
    business: "",
    officeAddress: "",
    homeAddress: "",
    area: "",
    mobileNo: "",
    emailID: "",
    chequeNo: "",
    dateOfRegistration: "",
    representative1_name: "",
    representative1_mobileNo: "",
    representative2_name: "",
    representative2_mobileNo: "",
    referredByBoardMember: "",
    applicationType: "",
    membershipFee: "",
    membershipno: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    confirm("Do you want to submit the information ?");

    const bulkData = new FormData();
    bulkData.append("file", file);

    try {
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      await toast.promise(bulkUpload(bulkData, headers), {
        pending: {
          render() {
            return "Processing...";
          },
          icon: false,
        },
        success: {
          render({ data }) {
            return `${data.message}`;
          },
          icon: "🟢",
        },
        error: {
          render({ data }) {
            return `${data.response.data.message}`;
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
    setFile(null);
  };

  const {
    memberFirstName,
    memberLastName,
    fatherName,
    native,
    business,
    officeAddress,
    homeAddress,
    area,
    mobileNo,
    emailID,
    chequeNo,
    representative1_name,
    representative1_mobileNo,
    representative2_name,
    representative2_mobileNo,
    referredByBoardMember,
    applicationType,
    membershipFee,
    membershipno,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeFile = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const onSubmitInfo = async (e) => {
    e.preventDefault();

    const is_confirmed = confirm("Do you want to submit the information ?");

    if (is_confirmed) {
      setFormErrors(validate(formData));
      const dateOfBirth = moment(dob).format("DD/MM/YYYY");
      const age = parseInt(moment().diff(moment(dateOfBirth, "DD/MM/YYYY"), "years"), 10);

      const allFormData = new FormData();

      allFormData.append("memberFirstName", memberFirstName);
      allFormData.append("memberLastName", memberLastName);
      allFormData.append("fatherName", fatherName);
      allFormData.append("age", age);
      allFormData.append("native", native);
      allFormData.append("business", business);
      allFormData.append("officeAddress", officeAddress);
      allFormData.append("homeAddress", homeAddress);
      allFormData.append("area", area);
      allFormData.append("mobileNo", mobileNo);
      allFormData.append("emailID", emailID);
      allFormData.append("chequeNo", chequeNo);
      allFormData.append("dateOfRegistration", dateOfRegistration);
      allFormData.append("photo", photoFile);
      allFormData.append("representative1_name", representative1_name);
      allFormData.append("representative1_mobileNo", representative1_mobileNo);
      allFormData.append("representative2_name", representative2_name);
      allFormData.append("representative2_mobileNo", representative2_mobileNo);
      allFormData.append("referredByBoardMember", referredByBoardMember);
      allFormData.append("applicationType", applicationType);
      allFormData.append("membershipFee", membershipFee);
      allFormData.append("membershipno", membershipno);

      try {
        const headers = {
          "Content-Type": "multipart/form-data",
          "x-access-token": localStorage.getItem("token"),
        };

        await toast.promise(registerMember(allFormData, headers), {
          pending: {
            render() {
              return "Processing...";
            },
            icon: false,
          },
          success: {
            render({ data }) {
              return `Member Registration Done Successfully!`;
            },
            icon: "🟢",
          },
          error: {
            render({ data }) {
              return `${data.response.data.message}`;
            },
          },
        });

        setFormData({
          memberFirstName: "",
          memberLastName: "",
          fatherName: "",
          native: "",
          business: "",
          officeAddress: "",
          homeAddress: "",
          area: "",
          mobileNo: "",
          emailID: "",
          chequeNo: "",
          representative1_name: "",
          representative1_mobileNo: "",
          representative2_name: "",
          representative2_mobileNo: "",
          referredByBoardMember: "",
          applicationType: "",
          membershipFee: "",
          membershipno: "",
        });

        const defaultDate = new Date();
        setDateOfRegistration(null);
        setDob(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex_1 =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regex_2 = /^\d+$/;

    if (!values.memberFirstName) {
      errors.memberFirstName = "First name is required!";
    }
    if (!values.memberLastName) {
      errors.memberLastName = "Last name is required!";
    }
    if (!values.fatherName) {
      errors.fatherName = "Father's name is required!";
    }
    if (!values.native) {
      errors.native = "Native is required!";
    }
    if (!values.homeAddress) {
      errors.homeAddress = "Home Address is required!";
    }
    if (!values.area) {
      errors.area = "Area is required!";
    }
    if (!values.membershipno) {
      errors.membershipno = "Membership No. is required!";
    }
    if (!values.mobileNo) {
      errors.mobileNo = "Mobile Number is required!";
    } else if (!regex_2.test(values.mobileNo)) {
      errors.mobileNo = "Invalid Mobile Number!";
    } else if (values.mobileNo.length !== 10) {
      errors.mobileNo = "Mobile Number should be 10 digit!";
    }
    if (values.emailID !== "" && !regex_1.test(values.emailID)) {
      errors.emailID = "Enter a valid Email Id!";
    }
    if (
      values.representative1_mobileNo !== "" &&
      !regex_2.test(values.representative1_mobileNo)
    ) {
      errors.representative1_mobileNo = "Invalid Mobile Number!";
    } else if (
      values.representative1_mobileNo !== "" &&
      values.representative1_mobileNo.length !== 10
    ) {
      errors.representative1_mobileNo = "Mobile Number should be 10 digit!";
    }
    if (
      values.representative2_mobileNo !== "" &&
      !regex_2.test(values.representative2_mobileNo)
    ) {
      errors.representative2_mobileNo = "Invalid Mobile Number!";
    } else if (
      values.representative2_mobileNo !== "" &&
      values.representative2_mobileNo.length !== 10
    ) {
      errors.representative2_mobileNo = "Mobile Number should be 10 digit!";
    }
    if (!values.applicationType) {
      errors.applicationType = "Membership Type is required!";
    }

    return errors;
  };

  return (
    <>
      <Head>
        <title>Registration Form</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <div className="flex">
        <SideBar setSideBarOpen={setSideBarOpen} />
        <div
          className={`h-screen p-7 ${
            sideBarOpen ? "w-[85%] ml-64 sm:ml-72" : "w-[95.85%] ml-20"
          } duration-300`}
        >
          <div className="flex flex-col justify-center items-center">
            <MembershipForm
              onSubmitInfo={onSubmitInfo}
              formData={formData}
              formErrors={formErrors}
              dateOfRegistration={dateOfRegistration}
              setDateOfRegistration={setDateOfRegistration}
              dob={dob}
              setDob={setDob}
              onChange={onChange}
              onChangeFile={onChangeFile}
              handleFileChange={handleFileChange}
              handleUpload={handleUpload}
            />
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}
