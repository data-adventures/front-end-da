import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

interface UploadExcelPayload {
  file: File;
  sheetName: string;
  name: string;
  description: string;
}


const uploadExcel = async ({file, sheetName, name, description}: UploadExcelPayload) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sheetName', sheetName);
    formData.append('name', name);
    formData.append('description', description);

    const { data } = await axiosInstance.post('/excel/dynamic/upload',formData, {
        headers : {
            'Content-Type' : 'multipart/form-data',
        },
    })
    return data
}

export const useUploadExcel = () => {
    return useMutation({
        mutationFn:uploadExcel,
    })
}





