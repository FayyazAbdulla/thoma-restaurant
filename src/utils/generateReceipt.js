import jsPDF from "jspdf"

export const generateReceipt = (orderDetails) => {
  const { orderId, customerDetails, items, totalAmount, createdAt } = orderDetails

  // Create new PDF document
  const doc = new jsPDF({
    format: "a4",
    unit: "mm",
  })

  // Set colors
  const primaryColor = "#FF0000" // Red
  const textColor = "#000000"

  // Add header with restaurant branding
  doc.setFillColor(primaryColor)
  doc.rect(0, 0, 210, 25, "F")

  doc.setTextColor(255, 255, 255) // White text
  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.text("THOMA RESTAURANT", 105, 15, { align: "center" })

  // Reset text color to black
  doc.setTextColor(textColor)

  // Add order info
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("TAKEAWAY ORDER", 105, 35, { align: "center" })

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`Order #: ${orderId}`, 15, 45)
  doc.text(`Date: ${new Date(createdAt).toLocaleDateString()}`, 15, 50)
  doc.text(`Time: ${new Date(createdAt).toLocaleTimeString()}`, 15, 55)

  // Add customer details
  doc.setFontSize(11)
  doc.setFont("helvetica", "bold")
  doc.text("Customer Details:", 15, 65)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text(`Name: ${customerDetails.name}`, 15, 72)
  doc.text(`Phone: ${customerDetails.phone}`, 15, 77)

  // Add items table header
  doc.setFillColor(primaryColor)
  doc.rect(15, 85, 180, 7, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.text("Item", 20, 90)
  doc.text("Qty", 120, 90)
  doc.text("Price", 140, 90)
  doc.text("Total", 170, 90)

  // Reset text color for items
  doc.setTextColor(textColor)
  doc.setFont("helvetica", "normal")

  // Add items
  let yPos = 100
  items.forEach((item) => {
    doc.text(item.title, 20, yPos)
    doc.text(item.quantity.toString(), 120, yPos)
    doc.text(`$${item.price.toFixed(2)}`, 140, yPos)
    doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 170, yPos)
    yPos += 8
  })

  // Add total
  doc.setDrawColor(primaryColor)
  doc.line(15, yPos, 195, yPos)
  yPos += 7

  doc.setFont("helvetica", "bold")
  doc.text("Total Amount:", 140, yPos)
  doc.text(`$${totalAmount.toFixed(2)}`, 170, yPos)

  // Add collection instructions
  yPos += 15
  doc.setFillColor(primaryColor)
  doc.rect(15, yPos, 180, 25, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.text("COLLECTION INSTRUCTIONS", 105, yPos + 7, { align: "center" })
  doc.setFont("helvetica", "normal")
  doc.text("Please keep this receipt and present it at the counter to collect your order.", 105, yPos + 17, {
    align: "center",
  })

  // Add footer
  doc.setTextColor(textColor)
  doc.setFontSize(8)
  doc.text("Thank you for dining with THOMA RESTAURANT!", 105, yPos + 35, { align: "center" })

  // Save the PDF
  doc.save(`THOMA_order_${orderId}.pdf`)
}

