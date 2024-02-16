export interface IBook {
    _id: string;
    title: string;
    author: string;
    publication: string;
    publicationYear: string;
    category: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    summary: string;
}
