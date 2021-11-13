# blog BE

## 기능 명세서

| method | 위치      | body                                                 | res                                                                |
| ------ | --------- | ---------------------------------------------------- | ------------------------------------------------------------------ |
| post   | /login    | { id: string, password: string }                     | 나중에                                                             |
| post   | /register | { id: string, password: string }                     | 나중에                                                             |
| get    | /blog     | None                                                 | [{ id: number, title: string, description: string, data: string }] |
| post   | /blog     | { title: string, description: string, data: string } | Done                                                               |
| put    | /blog/:id | { title: string, description: string, data: string } | { id: number, title: string, description: string, data: string }   |
