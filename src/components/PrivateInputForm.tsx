"use client";

import { useState, useRef } from "react";
import handleSubmission from "@/lib/handleSubmission";
import { SubmitButton } from "./SubmitButton";

interface FormData {
  alias: string;
  privateInput?: number | "";
}

interface Props {
  sessionID: string;
  party: number;
  valueName: string;
  unit: string;
}

export default function PrivateInputForm({
  sessionID,
  party,
  valueName,
  unit,
}: Props) {
  const [formData, setFormData] = useState<FormData>({
    alias: "",
    privateInput: "",
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

    if (formData.privateInput) {
      sessionStorage.setItem("privateInput", formData.privateInput.toString());
    }
    const submissionData: FormData = { ...formData };
    delete submissionData.privateInput;

    handleSubmission(submissionData.alias, sessionID, party);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="leading-8">
        <div className="mb-10">
          <p className="text-xl font-bold mb-10">Give it a try!</p>
          <p>
            Your Name:{" "}
            <input
              type="text"
              name="alias"
              className="border-4 rounded-xl px-2 mx-1.5 my-0.5 border-sine-green"
              value={formData.alias}
              onChange={handleInputChange}
              required
            />
          </p>
          <p>
            Your name is used to identify you and will be visible to the other
            participants.{" "}
          </p>
        </div>
        <div className="mb-10">
          <p>
            Your Input:{" "}
            <input
              type="number"
              name="privateInput"
              className="border-4 rounded-xl px-2 mx-1.5 my-0.5 border-sine-blue text-right"
              value={formData.privateInput}
              onChange={handleInputChange}
              placeholder={`${valueName} in ${unit}`}
              required
            />
          </p>
          <p>
            Your input is never revealed to the other participants and will
            remain encrypted.{" "}
          </p>
        </div>
      </div>
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
}
