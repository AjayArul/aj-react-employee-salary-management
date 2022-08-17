import {memo, useState} from 'react'
import Button from '@material-ui/core/Button';
import { DropzoneDialog } from "material-ui-dropzone";

const UploadCSV = ({handleOnSubmit}) => {
    
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className='upload' style={{ textAlign: "right" }}>
                <Button data-testid='uploadButton' variant="contained" color="primary" onClick={()=> setOpen(true)}>
                    Upload Employees
                </Button>
                <DropzoneDialog 
                    as="upload"
                    open={open}
                    filesLimit={1} 
                    acceptedFiles={["text/csv"]} 
                    maxFileSize={2048} 
                    onClose={() => setOpen(false)}
                    onSave={(files) => {
                        handleOnSubmit(files);
                        setOpen(false);
                    }}
                    showFileNamesInPreview={true}
                    dialogTitle="Upload Employees Details"
                    dropzoneText='Drag and drop a CSV file here or click'
                />
            </div>
        </>
    )
}

export default memo(UploadCSV);