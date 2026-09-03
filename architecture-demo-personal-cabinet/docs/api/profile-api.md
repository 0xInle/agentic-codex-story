# Контракт API профиля

`GET /profile/settings` возвращает настройку `notificationsEnabled`.
`PATCH /profile/settings` принимает `notificationsEnabled: boolean` и возвращает
обновлённое состояние. Ошибка контракта отображается как ошибка сохранения, а не
скрывается в интерфейсе.
