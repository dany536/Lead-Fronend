import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';



import React from 'react'

function Excelexport({excelData, fileName}) {

    const fileType = 'application/vnd.opernxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
    <div>
        <Tooltip title="Excel Export">
            <Button variant="container" className="text-black text-xl"
            onClick={(e) => exportToExcel(fileName)} color="primary" style={{cursor: "pointer", fontSize:14}}>
                Excel Export
            </Button>

        </Tooltip>
    </div>
  )
}

export default Excelexport