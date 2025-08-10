export interface BlogPostReply {
    readonly nickname: string
    readonly replyContent: string
}

export interface BlogPost {
    readonly id: number
    readonly title: string
    readonly content?: string
    readonly publishedDate: Date
    readonly lastEdittedDate?: Date
    readonly replyCount?: number
    readonly replies?: BlogPostReply[]
}
