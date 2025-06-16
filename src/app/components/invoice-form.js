"use client";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card.js";

import { Building, User, Plus, Trash2 } from "lucide-react";

export default function invoiceForm({ formData, setFormData }) {
  console.log("invoiceItem is:", formData.invoiceItem);
  console.log("Type is:", typeof formData.invoiceItem);

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    const section = dataset.section;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  const updateItem = (id, field, value) => {
    const newItems = formData.invoiceItem.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === "quantity" || field === "rate") {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    });
    updateItems(newItems);
  };

  const updateItems = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = subtotal * (formData.additionalInfo.taxRate / 100);
    const total = subtotal + taxAmount;

    setFormData((prev) => ({
      ...prev, // ← keep invoice, business, client, additionalInfo, etc.
      invoiceItem: items, // ← overwrite just the items array
      subtotal, // ← new top‑level subtotal
      taxAmount, // ← new top‑level taxAmount
      total, // ← new top‑level total
    }));
  };

  const updateTaxRate = (taxRate) => {
    const subtotal = formData.invoiceItem.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount;

    setFormData((prev) => ({
      ...prev, // ← keep invoice, business, client, additionalInfo, etc.
      additionalInfo: {
        ...prev.additionalInfo,
        taxRate, // ← overwrite just the items array
      },
      subtotal, // ← new top‑level subtotal
      taxAmount, // ← new top‑level taxAmount
      total, // ← new top‑level total
    }));
  };

  const addItem = () => {
    console.log("Button cliecked");

    const newItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    };

    const newItems = [...formData.invoiceItem, newItem];
    updateItems(newItems);
  };

  const removeItem = (id) => {
    const newItems = formData.invoiceItem.filter(item => item.id !== id);
    updateItems(newItems);
  };

  const labelClass =
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";
  const inputClass =
    "flex h-10 w-full rounded-md border-input bg-background px-3 py-2 border border-gray-200 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const buttonClass =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 border border-gray-200 text-sm font-medium hover:bg-gray-100 ring-offset-background disabled:pointer-events-none disabled:opacity-50";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Invoice details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass} htmlFor="invoice-number">
                Invoice Number
              </label>
              <input
                className={inputClass}
                type="text"
                name="number"
                placeholder="INV-001"
                data-section="invoice"
                value={formData.invoice.number}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="invoice-date">
                Date
              </label>
              <input
                className={inputClass}
                type="date"
                name="date"
                id="date"
                data-section="invoice"
                value={formData.invoice.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="due-date">Due Date</label>
              <input
                className={inputClass}
                type="date"
                name="dueDate"
                id="dueDate"
                data-section="invoice"
                value={formData.invoice.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 ">
            <Building className="w-5 h-5" />
            Your Business Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="business-name">
                Business Name
              </label>
              <input
                className={inputClass}
                type="text"
                name="name"
                placeholder="Your Company Name"
                data-section="business"
                value={formData.business.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="email">
                Email
              </label>
              <input
                className={inputClass}
                type="Email"
                name="email"
                id="email"
                placeholder="company@example.com"
                data-section="business"
                value={formData.business.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="address" className={labelClass}>
              Address
            </label>
            <input
              className={inputClass}
              type="text"
              name="address"
              id="address"
              placeholder="123 Business St"
              data-section="business"
              value={formData.business.address}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="City" className={labelClass}>
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                className={inputClass}
                data-section="business"
                value={formData.business.city}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="" className={labelClass}>
                State
              </label>
              <input
                type="text"
                name="state"
                id="state"
                className={inputClass}
                placeholder="State"
                data-section="business"
                value={formData.business.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="" className={labelClass}>
                ZIP Code
              </label>
              <input
                type="number"
                name="zipCode"
                id="zipCode"
                className={inputClass}
                placeholder="12345"
                data-section="business"
                value={formData.business.zipCode}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="" className={labelClass}>
                Phone
              </label>
              <input
                type="Number"
                name="phone"
                id="phone"
                className={inputClass}
                placeholder="Phone"
                data-section="business"
                value={formData.business.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Client Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="" className={labelClass}>
                Client Name
              </label>
              <input
                type="text"
                name="name"
                id="client-name"
                className={inputClass}
                placeholder="Name"
                data-section="client"
                value={formData.client.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="" className={labelClass}>
                Email
              </label>
              <input
                type="email"
                name="email"
                id="client-email"
                className={inputClass}
                placeholder="client@example.com"
                data-section="client"
                value={formData.client.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="address" className={labelClass}>
              Address
            </label>
            <input
              className={inputClass}
              type="text"
              name="address"
              id="client-address"
              placeholder="123 Business St"
              data-section="client"
              value={formData.client.address}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="City" className={labelClass}>
                City
              </label>
              <input
                type="text"
                name="city"
                id="client-city"
                placeholder="City"
                className={inputClass}
                data-section="client"
                value={formData.client.city}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="" className={labelClass}>
                State
              </label>
              <input
                type="text"
                name="state"
                id="client-state"
                className={inputClass}
                placeholder="State"
                data-section="client"
                value={formData.client.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="" className={labelClass}>
                ZIP Code
              </label>
              <input
                type="number"
                name="zipCode"
                id="client-zip-code"
                className={inputClass}
                placeholder="12345"
                data-section="client"
                value={formData.client.zipCode}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="" className={labelClass}>
                Phone
              </label>
              <input
                type="number"
                name="phone"
                id="client-phone"
                className={inputClass}
                placeholder="Phone"
                data-section="client"
                value={formData.client.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.invoiceItem.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
            >
              <div className="md:col-span-5">
                <label htmlFor="" className={labelClass}>
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="invoice-description"
                  className={inputClass}
                  placeholder="Item description"
                  data-section="invoiceItem"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(item.id, "description", e.target.value)
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="" className={labelClass}>
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="invoice-quantity"
                  className={inputClass}
                  placeholder="1"
                  data-section="invoiceItem"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(item.id, "quantity", e.target.value)
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="" className={labelClass}>
                  Rate
                </label>
                <input
                  type="number"
                  name="rate"
                  id="invoice-rate"
                  className={inputClass}
                  placeholder="0"
                  data-section="invoiceItem"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, "rate", e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="" className={labelClass}>
                  Amount
                </label>
                <div className="text-lg font-semibold py-2">
                  ₹{item.amount.toFixed(2)}
                </div>
              </div>
              <div className="md:col-span-1 place-items-center">
                {formData.invoiceItem.length > 1 && (
                  <button className=" border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 px-3 py-2"
                  onClick={()=>removeItem(item.id)}
                  >
                    <Trash2 className="text-red-500 w-4 h-4 " />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div onClick={addItem} className={`${buttonClass} w-full `}>
            <Plus className="w-5 h-5 mr-2" />
            <button> Add Item</button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="" className={labelClass}>
                Tax Rate (%)
              </label>
              <input
                type="number"
                name="taxRate"
                id="taxRate"
                className={inputClass}
                placeholder="0"
                data-section="additionalInfo"
                value={formData.additionalInfo.taxRate}
                onChange={(e) => updateTaxRate(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label htmlFor="" className={labelClass}>
                Notes
              </label>
              <textarea
                name="notes"
                id="notes"
                placeholder="Additional notes or payment terms..."
                className={`${inputClass} h-[6rem]`}
                data-section="additionalInfo"
                value={formData.additionalInfo.notes}
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
