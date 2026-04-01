class Profile {
    id: number;
    name: string;
    adjacentList: number[];
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.adjacentList = [];
    }
}

export default Profile;