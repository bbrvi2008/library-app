import Http from 'app/Http'

enum Urls {
  Root = 'api/books'
}

class BooksService {
  public static getBooks() {
    return Http.get<BookDto[]>(`${Urls.Root}`)
  }

  public static getUserBooks() {
    return Http.get<BookDto[]>(`${Urls.Root}/user`)
  }

  public static getBookById(id: number) {
    return Http.get<BookDto>(`${Urls.Root}/${id}`)
  }

  public static createBook(book: BookCreateDto) {
    return Http.post<BookDto>(`${Urls.Root}`, book)
  }

  public static updateBook(book: BookDto) {
    const { id } = book

    return Http.put<BookDto>(`${Urls.Root}/${id}`, book)
  }

  public static deleteBook(id: number) {
    return Http.delete<BookDto>(`${Urls.Root}/${id}`)
  }
}

export type BookDto = {
  id: number
  title: string
  year: number
  genre: string
  author: string
  ownerId?: number
}

export type BookCreateDto = {
  title: string
  year: number
  genre: string
  author: string
}

export default BooksService
