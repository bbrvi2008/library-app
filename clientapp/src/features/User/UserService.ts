import Http from 'app/Http'

enum Urls {
  Root = 'api/users'
}

class UserService {
  public static registration(user: UserCredentialsDto) {
    return Http.post<UserDto>(`${Urls.Root}`, user)
  }

  public static login(user: UserCredentialsDto) {
    return Http.post<UserLogginedDto>(`${Urls.Root}/login`, user)
  }
}

export type UserDto = {
  id: number
  username: string
  password: number
}

export type UserCredentialsDto = {
  username: string
  password: number
}

export type UserLogginedDto = {
  username: string
  token: string
}

export default UserService
