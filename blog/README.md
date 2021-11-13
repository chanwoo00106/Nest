# blog BE

## 기능 명세서

| method | 위치      | body                                                               | res                                                                              |
| ------ | --------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| post   | /login    | { username: string, password: string }                             | 나중에                                                                           |
| post   | /register | { username: string, password: string }                             | 나중에                                                                           |
| get    | /blog     | None                                                               | [{ id: number, title: string, description: string, data: string, user: string }] |
| post   | /blog     | { title: string, description: string, data: string, user: string } | Done                                                                             |
| put    | /blog/:id | { title: string, description: string, data: string, user: string } | { id: number, title: string, description: string, data: string, user: string }   |
