import { Card, CardHeader, CardTitle, CardContent } from "./ui/card.js";
import { FileText, Download } from "lucide-react";
import {generatePDF} from '../../lib/pdf-generator'

export default function invoicePrwview({ formData }) {
  const { invoice, additionalInfo } = formData;
  const buttonClass =
    " inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 border border-gray-200 text-sm font-medium hover:bg-blue-600 ring-offset-background disabled:pointer-events-none disabled:opacity-50";

  const handleDownload = async () => {
    try {
      await generatePDF(formData)
    } catch (error) {
      console.log("Error generating PDF",error);
      
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {    
      year: "numeric", 
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-6 mb-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Invoice Preview
            </CardTitle>
            <div
              className={`${buttonClass} bg-blue-500 cursor-pointer text-white font-bold gap-2`}
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
              <button>Download PDF</button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
            <div className="text-sm text-gray-600 mb-6">
              <p>Invoice #{invoice.number}</p>
              <p>Date: {formatDate(invoice.date)}</p>
              <p>Due Date: {formatDate(invoice.dueDate)}</p>
            </div>
          </div>
          <div className="shrink-0 bg-gray-200 h-[1px] w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-6">
            {/* Seperator */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">From:</h3>
              <div className="text-sm text-gray-700 space-y-1">
                {formData.business.name && (
                  <p className="font-medium">{formData.business.name}</p>
                )}
                {formData.business.address && (
                  <p>{formData.business.address}</p>
                )}
                {(formData.business.city ||
                  formData.business.state ||
                  formData.business.zipCode) && (
                  <p>
                    {formData.business.city}
                    {formData.business.city && formData.business.state && ", "}
                    {formData.business.state} {formData.business.zipCode}
                  </p>
                )}
                {formData.business.email && <p>{formData.business.email}</p>}
                {formData.business.phone && <p>{formData.business.phone}</p>}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">To:</h3>
              <div className="text-sm text-gray-700 space-y-1">
                {formData.client.name && (
                  <p className="font-medium">{formData.client.name}</p>
                )}
                {formData.client.address && <p>{formData.client.address}</p>}
                {(formData.client.city ||
                  formData.client.state ||
                  formData.client.zipCode) && (
                  <p>
                    {formData.client.city}
                    {formData.client.city && formData.client.state && ", "}
                    {formData.client.state} {formData.client.zipCode}
                  </p>
                )}
                {formData.client.email && <p>{formData.client.email}</p>}
                {formData.client.phone && <p>{formData.client.phone}</p>}
              </div>
            </div>
          </div>
          <div className="shrink-0 bg-gray-200 h-[1px] w-full" />{" "}
          {/* Seperator */}
          {/* Items Table */}
          <div>
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-semibold text-gray-900">
                      Description
                    </th>
                    <th className="text-center py-2 font-semibold text-gray-900">
                      Qty
                    </th>
                    <th className="text-right py-2 font-semibold text-gray-900">
                      Rate
                    </th>
                    <th className="text-right py-2 font-semibold text-gray-900">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.invoiceItem.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-3 text-gray-700">
                        {item.description || "Item description"}
                      </td>
                      <td className="py-3 text-center text-gray-700">
                        {item.quantity}
                      </td>
                      <td className="py-3 text-right text-gray-700">
                        ₹{Number(item.rate).toFixed(2)}
                      </td>
                      <td className="py-3 text-right text-gray-700">
                        ₹{Number(item.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Totals */}
          <div className="space-y-2 mt-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-900">
                ₹{Number(formData.subtotal).toFixed(2)}
              </span>
            </div>
            {additionalInfo.taxRate > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Tax ({formData.additionalInfo.taxRate}%):
                </span>
                <span className="text-gray-900">
                  ₹{Number(formData.taxAmount).toFixed(2)}
                </span>
              </div>
            )}
            <div className="shrink-0 bg-gray-200 h-[1px] w-full" />{" "}
            {/* Seperator */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" />{" "}
            {/* Seperator */}
            <div className="flex justify-between text-lg font-semibold mb-5">
              <span className="text-gray-900">Total:</span>
              <span className="text-gray-900">
                ₹{Number(formData.total).toFixed(2)}
              </span>
            </div>
          </div>
          {/* Notes */}
          {additionalInfo.notes && (
            <>
              <div className="shrink-0 bg-gray-200 h-[1px] w-full" />{" "}
              {/* Seperator */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5" />{" "}
              {/* Seperator */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Notes:</h3>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {additionalInfo.notes}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
