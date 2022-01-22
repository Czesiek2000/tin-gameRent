const formMode = {
    NEW: 'NEW',
    EDIT: 'EDIT'
}

export const formValidationKeys = {
    required: 'required',
    2_60: '2_60',
    3_300: 'len_3_300',
    "9_number": "",
    isEmail: 'isEmail',
}

export function getValidationErrorKeys(error){
    return `validation.${error}`;
}

export default formMode;