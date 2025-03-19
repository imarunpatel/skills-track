export interface IPost {
    id: string;
    title: string;
    content: string;
    slug: string;
    cover_image_url: string;
    updated_at: string;
    users: {
        name: string;
        image: string;
    }
}