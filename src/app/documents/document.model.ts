export class Document{

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public fileUrl: string,
        public children: Document[]
    ){}
}