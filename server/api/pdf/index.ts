const html = '<html><div style="background: gray; padding: 20px; margin: 32px"><p>Name:</p><h3 style="color: #0000ff">Lukas Nemec</h3><img src="https://scontent.fbts1-1.fna.fbcdn.net/v/t39.30808-1/463860759_2833425286820135_1761021627328295127_n.jpg?stp=dst-jpg_s480x480&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=Kgco6QcgiyEQ7kNvgGXfBJx&_nc_zt=24&_nc_ht=scontent.fbts1-1.fna&_nc_gid=AsSb-317HMi3qG0d11j2W8j&oh=00_AYDFlCfShfeHKq76in5lU2EiZqkLXYrp6dUhgnQ50VazJg&oe=6722D5D5"></div></html>'


import { useDb } from "~~/server/utils/db";
import { sql as sqlDrizzle } from "drizzle-orm";
import fs from 'fs'

// import htmlToPdf from 'html-to-pdf'
import htmlPdfNode from 'html-pdf-node'


const getHTML = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile('app/pages/pdf.vue', 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

export default defineEventHandler(async (event) => {
  let options = { 
    format: 'A4',
    printBackground: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };
  

  const content = html
  // const content = await getHTML()

  console.log(content)
  // return content

  // let file = { url: 'http://localhost:3000/pdf' };
  let file = { content: content };
  htmlPdfNode.generatePdf(file, options).then((pdfBuffer: string | NodeJS.ArrayBufferView) => {
    console.log("PDF Buffer:-", pdfBuffer);
    fs.writeFileSync('test.pdf',pdfBuffer)
  });

  
    return html
  });


