import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const sms_api_key = process.env.SMS_API_KEY;

export const registerAdmin = async (data, config) => {
  const result = await axios.post(`${baseURL}/register`, data, config);
  return result.data;
};

export const loginAdmin = async (data, config) => {
  const result = await axios.post(`${baseURL}/login`, data, config);
  return result.data;
};

export const registerMember = async (data, config) => {
  const result = await axios.post(`${baseURL}`, data, config);
  return result.data;
};

export const getMembers = async (config) => {
  const result = await axios.get(`${baseURL}/members`, config);
  return result.data;
};

export const editMember = async (id, updates) => {
  const result = await axios.put(`${baseURL}/members/${id}`, updates);
  return result.data;
};

export const deleteMember = async (id, config) => {
  const result = await axios.delete(`${baseURL}/members/${id}`, config);
  return result.data;
};

export const bulkUpload = async (formData, headers) => {
  const result = await axios.post(`${baseURL}/bulk-upload`, formData, headers);
  return result.data;
};

export const sendSms = async (options) => {
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
