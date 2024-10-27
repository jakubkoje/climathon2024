import fs from 'fs'
import htmlPdfNode from 'html-pdf-node'

const getHTML = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile('server/pdf.html', 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}


export const generatePDF = async (formData: any, imageUrl: string) => {
    let options = { 
        format: 'A4',
        printBackground: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    };
      
    
      // const content = html
    let content: string = await getHTML()
    
    content = content.replace('%{administrator.name}', formData.step1.firstName + ' ' + formData.step1.lastName)
    content = content.replace('%{administrator.address1}', formData.step1.address)
    content = content.replace('%{administrator.address2}', formData.step1.city + ', ' + formData.step1.postalCode)
    content = content.replace('%{administrator.email}', formData.step1.email)
    content = content.replace('%{administrator.phone_number}', formData.step1.phone)
    content = content.replace('%{building.address1}', formData.step2.address.place_name)
    content = content.replace('%{container.path}', imageUrl)

    // return content

    let buff
    // let file = { url: 'http://localhost:3000/pdf' };
    let file = { content: content };
        htmlPdfNode.generatePdf(file, options).then((pdfBuffer: string | NodeJS.ArrayBufferView) => {
        // console.log("PDF Buffer:-", pdfBuffer);
        fs.writeFileSync('test.pdf',pdfBuffer)
        buff = pdfBuffer
    });
    
      
    return buff
}