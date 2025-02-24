"use client";
import { useState, useRef } from "react";
import handleSubmission from "@/lib/handleSubmission";

interface FormData {
  alias: string;
  privateInput?: number;
}

interface Props {
  session_id: string;
  party: string;
}

export default function PrivateInputForm({ session_id, party }: Props) {
  const [formData, setFormData] = useState({
    alias: "",
    privateInput: 0,
  });
  const formRef = useRef(null);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    sessionStorage.setItem("privateInput", formData.privateInput.toString());

    const submissionData: FormData = { ...formData };
    delete submissionData.privateInput;

    handleSubmission(submissionData.alias, session_id, party);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input
        type="text"
        name="alias"
        value={formData.alias}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="privateInput"
        value={formData.privateInput}
        onChange={handleInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
