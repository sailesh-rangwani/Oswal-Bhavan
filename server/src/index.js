const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const xlsx = require("xlsx");

const Admin = require("models/Admin");
const Member = require("models/Member");

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log(error));

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const alreadyAdmin = await Admin.findOne({ email });
    if (alreadyAdmin) {
      return res.status(200).send({
        message: "Admin already exists",
        bg: "red-100",
        text: "red-900",
      });
    }
    const admin = new Admin({ email, password });
    await admin.save();
    return res.status(200).send({
      message: "Successfully registered admin",
      bg: "teal-100",
      text: "teal-900",
    });
  } catch (err) {
    res.status(500).send({
      message: "Error registering admin",
      bg: "red-100",
      text: "red-900",
    });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(200).send({ user: false, message: "Admin not found" });
    }

    const isValidPassword = await admin.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(200).send({
        user: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { email: admin.email, password: admin.password },
      process.env.JWT_SECRET
    );

    return res.status(200).send({
      user: token,
      message: "Successful login",
    });
  } catch (err) {
    res.status(500).send({
      user: false,
      message: "Error logging in admin",
    });
  }
});

const upload_photo = multer();

app.post("/api", upload_photo.single("photo"), async (req, res) => {
  const {
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
    membershipno,
  } = req.body;

  let photo;
  if (req.file) {
    photo = req.file.buffer;
  }

  try {
    const member = new Member({
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
      photo,
      representative1_name,
      representative1_mobileNo,
      representative2_name,
      representative2_mobileNo,
      referredByBoardMember,
      applicationType,
      membershipFee,
      membershipno,
    });
    await member.save();

    return res.status(200).send({
      message: "Successfully registered member",
      bg: "teal-100",
      text: "teal-900",
    });
  } catch (err) {
    return res.status(400).send({
      message: "Error registering member",
      bg: "red-100",
      text: "red-900",
    });
  }
});

app.get("/api/members", async (req, res) => {
  try {
    const members = await Member.find();
    res.send(members);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/api/members/:id", async (req, res) => {
  const {
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
    membershipno,
  } = req.body;

  try {
    const id = req.params.id;
    const member = await Member.findById(id);
    if (!member) {
      res.status(404).send({ message: "Member not found" });
    }
    member.memberFirstName = memberFirstName;
    member.memberLastName = memberLastName;
    member.fatherName = fatherName;
    member.age = age;
    member.native = native;
    member.business = business;
    member.officeAddress = officeAddress;
    member.homeAddress = homeAddress;
    member.area = area;
    member.mobileNo = mobileNo;
    member.emailID = emailID;
    member.chequeNo = chequeNo;
    member.dateOfRegistration = dateOfRegistration;
    member.representative1_name = representative1_name;
    member.representative1_mobileNo = representative1_mobileNo;
    member.representative2_name = representative2_name;
    member.representative2_mobileNo = representative2_mobileNo;
    member.referredByBoardMember = referredByBoardMember;
    member.applicationType = applicationType;
    member.membershipFee = membershipFee;
    member.membershipno = membershipno;

    await member.save();

    return res.status(200).send({ message: "Successfully updated member" });
  } catch (err) {
    return res.status(400).send({
      message: "Error registering member",
    });
  }
});

app.delete("/api/members/:id", async (req, res) => {
  try {
    const id = req.params.id.toString().trim();
    const member = await Member.findByIdAndRemove(id);
    if (!member) return res.status(404).send({ message: "Member not found" });
    return res.status(200).send({ message: "Member deleted successfully" });
  } catch (err) {
    return res.status(400).send(err);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/indianik/oswalbhavan/uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/bulk-upload", upload.single("file"), async (req, res) => {
  try {
    const file = xlsx.readFile(req.file.path);
    const sheet = file.Sheets[file.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (const item of data) {
      const member = new Member({
        memberFirstName: item.memberFirstName,
        memberLastName: item.memberLastName,
        fatherName: item.fatherName,
        age: item.age,
        native: item.native,
        business: item.business,
        officeAddress: item.officeAddress,
        homeAddress: item.homeAddress,
        area: item.area,
        mobileNo: item.mobileNo,
        emailID: item.emailID,
        chequeNo: item.chequeNo,
        dateOfRegistration: item.dateOfRegistration,
        representative1_name: item.representative1_name,
        representative1_mobileNo: item.representative1_mobileNo,
        representative2_name: item.representative2_name,
        representative2_mobileNo: item.representative2_mobileNo,
        referredByBoardMember: item.referredByBoardMember,
        applicationType: item.applicationType,
        membershipFee: item.membershipFee,
        membershipno: item.membershipno,
      });
      await member.save();
    }

    return res.status(200).send({
      message: "Successfully registered members",
      bg: "teal-100",
      text: "teal-900",
    });
  } catch (err) {
    res.status(400).send({
      message: "Error registering members",
      bg: "red-100",
      text: "red-900",
    });
  }
});

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
