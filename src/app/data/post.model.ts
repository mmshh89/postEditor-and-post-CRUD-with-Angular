export class Post {
    id: number;
    postInnerHtml: string;
    direction: string;

    clear() {
        this.postInnerHtml = '';
        this.direction = '';
    }
}

export class ThePost {
    postInnerHtml: string;
    direction: string;
}