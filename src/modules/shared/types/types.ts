export type PageWithSearchParams<T = Record<string, string>> = {
  searchParams: T & Record<string, string>
}
