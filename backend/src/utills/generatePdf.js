import PDFDocument from "pdfkit";
import * as fs from "node:fs";

export const generatePdf = (bookingDetails) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const filename = `booking_${bookingDetails?._id}.pdf`;
      const stream = fs.createWriteStream(filename);

      doc.pipe(stream);
      doc.fontSize(18).text("Booking Information", { align: "center" });
      doc.moveDown();
      doc
        .fontSize(12)
        .text(`Name: ${bookingDetails?.guest?.name}`, { align: "center" });
      doc.text(`Nights: ${bookingDetails?.nightsNum} `);
      doc.text(`Cabin Price: ${bookingDetails?.cabinPrice} `);
      doc.text(`Breakfast: ${bookingDetails?.extraPrice} `);
      doc.text(`Amount: ${bookingDetails?.totalPrice} `);
      doc.end();

      // fs.stat(filename, (err, stats) => {
      //   if (err) {
      //     console.log(err);
      //     return;
      //   }

      //   if (stats.size > 0) {
      //     console.log("Exist");
      //   } else {
      //     console.log("Empty");
      //   }
      // });

    

      stream.on("finish", () => resolve(filename));
      stream.on("error", reject);
    } catch (error) {
      console.log(error);
    }
  });
};
