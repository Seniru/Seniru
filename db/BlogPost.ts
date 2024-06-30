export interface BlogPost {
	readonly id: number
	readonly title: string
	readonly content: string
	readonly publishedDate: Date
	readonly lastEdittedDate?: Date
}
