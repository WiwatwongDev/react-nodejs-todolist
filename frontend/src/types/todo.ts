export interface Todo {
  id: number
  name: string
  date_start: string
  finished: boolean
}

export interface TodoFormData {
  name: string
  date_start: string
}