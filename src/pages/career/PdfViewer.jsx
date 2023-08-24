import React, { useEffect, useState } from 'react';
import pdfjs from 'pdfjs-dist/build/pdf';

export default function PdfViewer({ pdfData }) {
  const [pdfInstance, setPdfInstance] = useState(null);

  useEffect(() => {
    const loadingTask = pdfjs.getDocument({ data: atob(pdfData) });

    loadingTask.promise.then((pdf) => {
      setPdfInstance(pdf);
    });
  }, [pdfData]);

  return (
    <div className="pdf-viewer">
      {pdfInstance && (
        <canvas
          className="pdf-canvas"
          ref={(canvas) => {
            if (canvas) {
              pdfInstance.getPage(1).then((page) => {
                const viewport = page.getViewport({ scale: 1 });
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                  canvasContext: context,
                  viewport: viewport,
                };
                page.render(renderContext);
              });
            }
          }}
        />
      )}
    </div>
  );
}
