import React, { useState, useMemo, useRef, memo } from 'react';

import { pdfjs, Document, Page } from 'react-pdf';
import { Box } from '@mui/material';
import { VariableSizeList as List } from 'react-window';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const pageHeight = 523;

function PdfViewer({ file, token }) {

    const [pdfPages, setPdfPages] = useState(null);
    const [loading, setLoading] = useState(true);
    const docRef = useRef();
    const [docWidth, setDocWidth] = useState(0);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setPdfPages(numPages);
        setLoading(false);

        const rect = docRef.current?.getBoundingClientRect();
        if (rect) {
            setDocWidth(rect.width);
        }
    };



    const memFile = useMemo(() => file, [file]); // memoized pdf file

    return (
        <Box
            ref={docRef}
            height={pageHeight}
            bgcolor={loading ? 'grey.50' : '#fff'}
            sx={{
                display: 'grid',
                placeContent: 'center',
                '& .react-pdf__Document': {
                    height: '100%',

                },
            }}
        >
            <Document
                options={{
                    cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
                    cMapPacked: true,
                }}
                file={{
                    url: memFile,
                    method: 'GET',
                    httpHeaders: {
                        "Content-Type": 'application/pdf',
                        Accept: 'application/pdf',
                        "x_app_key": `${process.env.REACT_APP_X_APP_KEY}`,
                        authorization: `Bearer ${token}`,
                    }
                }}
                loading=""
                onLoadSuccess={onDocumentLoadSuccess}
                renderMode="canvas"
                externalLinkRe="_blank"
                externalLinkTarget="_blank"
            >
                {!loading && (
                    <List
                        width={docWidth}
                        height={pageHeight}
                        itemCount={pdfPages}
                        estimatedItemSize={pageHeight}
                        itemSize={() => pageHeight}
                    >
                        {({ style, index }) => (
                            <div style={style}>
                                <Page pageNumber={index + 1} width={docWidth} />
                            </div>
                        )}
                    </List>
                )}
            </Document>
        </Box>
    );
}
export default memo(PdfViewer);