"use client";

import { useState, useRef, useEffect } from "react";
import handleSubmission from "@/lib/handleSubmission";
import { SubmitButton } from "./SubmitButton";
import Link from "next/link";

interface FormData {
  alias: string;
  privateInput?: number | "";
}

interface Props {
  sessionID: string;
  party: number;
  valueName: string;
  unit: string;
  interval: number;
}

export default function PrivateInputForm({
  sessionID,
  party,
  valueName,
  unit,
  interval,
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

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
          <p className="flex items-center justify-center">
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
            <span
              className="relative flex items-center"
              onBlur={() => setIsOpen(false)}
              tabIndex={-1}
            >
              <button
                className={`w-6 h-6 flex items-center justify-center rounded-full border-2 border-sine-blue hover:bg-sine-blue ${
                  isOpen && "bg-sine-blue"
                }`}
                onMouseEnter={() => {
                  setIsOpen(true);
                }}
              >
                ?
              </button>
              {isOpen && (
                <span
                  className="absolute left-8 top-0 bg-white border-4 border-sine-blue text-sm p-2 rounded-xl shadow-md min-w-48 z-10"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  Your input will remain private and encrypted but all
                  participants learn if it is above, below, or within the{" "}
                  {interval}% range of the average.{" "}
                  <Link
                    href={"/about"}
                    className="underline decoration-sine-purple decoration-4"
                    target="_blank"
                  >
                    Click here
                  </Link>{" "}
                  to learn more about how MPC makes this possible.
                </span>
              )}
            </span>
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
