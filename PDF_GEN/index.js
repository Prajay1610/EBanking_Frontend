const express = require("express");
const { jsPDF } = require("jspdf");
const cors = require("cors");
require("jspdf-autotable");


const app = express();

app.use(cors());
const port = 3001;

app.use(express.json());

// Function to generate PDF from JSON data
function generatePDF(accountStatement) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "A4" });

  // Add a title
  doc.setFontSize(22);
  doc.setTextColor(41, 128, 185); // A shade of blue
  doc.text("Account Statement", 40, 40);
  doc.text("Account Number: " + accountStatement.accountNumber, 40, 60);  

  // Table headers
  const headers = [["Transaction ID", "Transaction Type", "Amount (Rs)", "Transaction Time"]];

  // Prepare data for the table
  let data = accountStatement.transactions.map((txn) => [
    txn.transactionId,
    txn.type,
    `Rs ${txn.amount.toFixed(2)}`,
    new Date(txn.transactionTime).toLocaleString(), // Convert timestamp to readable date
  ]);

  doc.autoTable({
    head: headers,
    body: data,
    startY: 60,
    theme: "striped",
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },
    bodyStyles: {
      halign: "left",
      cellPadding: 8,
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
    styles: {
      fontSize: 12,
    },
    margin: { left: 40, right: 40 },
    didDrawPage: (dataArg) => {
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      doc.setFontSize(10);
      doc.text(
        `Page ${doc.internal.getNumberOfPages()}`,
        dataArg.settings.margin.left,
        pageHeight - 10
      );
    },
  });

  return doc.output("arraybuffer");
}


// Endpoint to generate PDF
app.post("/generate-pdf", async (req, res) => {
  try {
    const accountData = req.body;
    console.log("inside microservice : ",accountData);
    // Validate payload
    if (!accountData || typeof accountData.accountNumber !== "string") {
      return res.status(400).send("Invalid input: 'accountNumber' must be a string.");
    }

    if (!Array.isArray(accountData.transactions)) {
      return res.status(400).send("Invalid input: 'transactions' must be an array.");
    }


    // Generate PDF
    const pdfBuffer = generatePDF(accountData);

    // Send PDF as a response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=account_statement.pdf");
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Node.js microservice running on http://localhost:${port}`);
});