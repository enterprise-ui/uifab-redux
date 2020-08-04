# Библиотека базовых компонент UIkit

## Назначение

Базовые компоненты для бизнес-компонент. Описание компонент доступно в [confluence](https://wiki.x5.ru/pages/viewpage.action?pageId=240138060)  

## Архитектура

[Техническая архитектура использования компонент](https://wiki.x5.ru/display/OMNI/6.1.2.+Frontend).

[Фабрики бизнес-компонент](https://wiki.x5.ru/pages/viewpage.action?pageId=240138902).

## Разработка

Разработка модуля как правило ведется в рамках портала, поэтому отдельная компиляция модуля не требуется.

Запуск порталов описан на странице [Фронтенд: запуск порталов](https://wiki.x5.ru/pages/viewpage.action?pageId=240132726) и в README конкретного портала.

Для локальной компиляции модуля

```
git clone git@scm.x5.ru:omni/ui-workspace.git
cd ui-workspace
git clone git@scm.x5.ru:omni/frontend.git projects/frontend
yarn
cd projects/frontend
yarn build:all
cd uikit
// Компиляция
yarn build
// Линтинг
yarn lint
// Проверка типов
yarn tsc
```
