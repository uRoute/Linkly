export interface IReply {
  _id: string
  content: string
  image: string
  commentCreator: CommentCreator
  post: string
  parentComment: string
  likes: any[]
  createdAt: string
  likesCount: number
  isReply: boolean
  id: string
}

export interface CommentCreator {
  _id: string
  name: string
  username: string
  photo: string
  followersCount: number
  followingCount: number
  bookmarksCount: number
  id: string
}
