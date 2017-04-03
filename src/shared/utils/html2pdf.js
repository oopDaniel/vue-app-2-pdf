/* eslint-disable */

export function html2pdf(html, pdf, callback) {
  var canvas = pdf.canvas
  if (!canvas) {
    alert('jsPDF canvas plugin not installed')
    return
  }
  canvas.pdf = pdf
  pdf.annotations = {

    _nameMap: [],

    createAnnotation: function (href, bounds) {
      var x = pdf.context2d._wrapX(bounds.left)
      var y = pdf.context2d._wrapY(bounds.top)
      var page = pdf.context2d._page(bounds.top)
      var options
      var index = href.indexOf('#')
      if (index >= 0) {
        options = {
          name: href.substring(index + 1)
        }
      } else {
        options = {
          url: href
        }
      }
      pdf.link(x, y, bounds.right - bounds.left, bounds.bottom - bounds.top, options)
    },

    setName: function (name, bounds) {
      var x = pdf.context2d._wrapX(bounds.left)
      var y = pdf.context2d._wrapY(bounds.top)
      var page = pdf.context2d._page(bounds.top)
      this._nameMap[name] = {
        page: page,
        x: x,
        y: y
      }
    }

  }
  canvas.annotations = pdf.annotations

  pdf.context2d._pageBreakAt = function (y) {
    this.pageBreaks.push(y)
  }

  pdf.context2d._gotoPage = function (pageOneBased) {
    while (pdf.internal.getNumberOfPages() < pageOneBased) {
      pdf.addPage()
    }
    pdf.setPage(pageOneBased)
  }

  if (typeof html === 'string') {
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

    var iframe = document.createElement('iframe')
    document.body.appendChild(iframe)
    var doc
    doc = iframe.contentDocument
    if (doc === undefined || doc === null) {
      doc = iframe.contentWindow.document
    }

    doc.open()
    doc.write(html)
    doc.close()

    var promise = html2canvas(doc.body, {
      canvas: canvas,
      onrendered: function (canvas) {
        if (callback) {
          if (iframe) {
            iframe.parentElement.removeChild(iframe)
          }
          callback(pdf)
        }
      }
    })
  } else {
    var body = html
    var promise = html2canvas(body, {
      canvas: canvas,
      onrendered: function (canvas) {
        if (callback) {
          if (iframe) {
            iframe.parentElement.removeChild(iframe)
          }
          callback(pdf)
        }
      }
    })
  }
}
