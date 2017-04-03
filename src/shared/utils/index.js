import { html2pdf as html2pdfFunc } from './html2pdf'
export { forEach } from './async-foreach'
export const html2pdf = (html, pdf) => new Promise(resolve => {
  const callback = pdf => resolve(pdf)
  html2pdfFunc(html, pdf, callback)
})
export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
