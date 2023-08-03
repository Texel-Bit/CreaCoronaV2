export interface dataResponse{
    status: boolean,
	isTmpPassword: boolean,
	user: dataUserREsponse
	token: string
}

export interface dataUserREsponse {
    idsysuser: number,
    userName: string,
    lastName: string,
    email: string,
    phone: number,
    creationDate: string,
    userRole_iduserRole: number,
    userStatus_iduserStatus: number,
    office_idoffice: number,
    office: any
}