
interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    creationDate: Date;
    roleId: number;
    statusId: number,
    officeId: number;
}

export default User;