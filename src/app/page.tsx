"use client";

import Image from "next/image";
import Invoice from "./components/invoice-form.js";
import InvoicePreview from "./components/invoice-preview.js";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    invoice: {
      number: "INV-001",
     date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    business: {
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
    },

    client: {
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
    },

    invoiceItem: [
      {
        id: "1",
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ],
    additionalInfo: {
      taxRate: "",
      notes: "",
    },
    subtotal: 0,
    taxAmount: 0,
    total: 0,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h3 className="text-4xl font-bold mb-2">Invoice Generator</h3>
          <p className="text-gray-600 ">
            Create professional invoices in minutes
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mx-auto max-w-7xl">
        <div className="space-y-6 mb-5">
          <Invoice formData={formData} setFormData={setFormData} />
        </div>
        <div className="xl:sticky xl:top-8 xl:h-fit ">
          <InvoicePreview formData={formData} />
        </div>
      </div>
    </div>
  );
}
