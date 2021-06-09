/**
 * @description Дополнение типа NodeModule, необходимое по той причине,
 *  что typescript не знает о наличии поля hot в этом интерфейсе.
 *  Это поле необходимо для реализации hot-релоадинга.
 */
 declare interface NodeModule {
  hot: {
    accept(path?: string, callback?: () => void): void
  }
}
