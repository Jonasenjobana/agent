import { del, get, post, put, request } from '../request'
import type { RestfulAPIResponse } from '@agent-project-app/shared'

type AssertEqual<T, U> =
  (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U ? 1 : 2)
    ? true
    : false

type Expect<T extends true> = T

interface UserInfo {
  id: number
  name: string
}

type GetResult = Awaited<ReturnType<typeof get<UserInfo>>>
type PostResult = Awaited<ReturnType<typeof post<UserInfo, { name: string }>>>
type PutResult = Awaited<ReturnType<typeof put<UserInfo, { name: string }>>>
type DeleteResult = Awaited<ReturnType<typeof del<UserInfo>>>

type _RequestHasGet = Expect<AssertEqual<typeof request.get, typeof request.get>>
type _GetReturnsRestfulResponse = Expect<
  AssertEqual<GetResult, RestfulAPIResponse<UserInfo>>
>
type _PostReturnsRestfulResponse = Expect<
  AssertEqual<PostResult, RestfulAPIResponse<UserInfo>>
>
type _PutReturnsRestfulResponse = Expect<
  AssertEqual<PutResult, RestfulAPIResponse<UserInfo>>
>
type _DeleteReturnsRestfulResponse = Expect<
  AssertEqual<DeleteResult, RestfulAPIResponse<UserInfo>>
>
