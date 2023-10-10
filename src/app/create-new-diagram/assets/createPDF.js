const PDFDocument = require("./pdfkit")
const blobStream = require("./blob-stream")
const SVGtoPDF = require("./svg2PDF")

 var createPdf = () => {
    let doc = new PDFDocument({
        compress: false
    });
    let svgXML = document.getElementById('svg-code');
    if (svgXML.innerHTML) {
            SVGtoPDF(doc, svgXML.innerHTML, 0, 0,{
              preserveAspectRatio:"xMidYMid meet"
            });
        }
    
    let stream = doc.pipe(blobStream());
    stream.on('finish', function() {
        let blob = stream.toBlob('application/pdf');
        let fileName = "BPMN_Diagram.pdf";
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        
    });
    doc.end();
}

module.exports = createPdf