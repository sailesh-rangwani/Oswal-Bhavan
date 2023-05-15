import React from "react";

const SendSms = ({ handleSendSms }) => {
  return (
    <div>
      <button
        className="px-4 py-2 rounded bg-indigo-500 text-white"
        onClick={handleSendSms}
      >
        Send Sms
      </button>
    </div>
  );
};

export default SendSms;
