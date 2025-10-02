<nav class="sidebar" aria-label="Главная навигация">
    <span class="sidebar__section">Обзор</span>
    <a class="sidebar__link sidebar__link--active" href="#">
        <span aria-hidden="true">📊</span>
        Дашборд
    </a>

    <span class="sidebar__section">Управление</span>
    <a class="sidebar__link" href="#">
        <span aria-hidden="true">💸</span>
        Транзакции
    </a>
    <a class="sidebar__link" href="#">
        <span aria-hidden="true">⚙️</span>
        Настройки
    </a>

    <span class="sidebar__section">Импорт</span>
    <a class="sidebar__link" href="#">
        <span aria-hidden="true">🧾</span>
        Импорт чеков
    </a>
</nav>

<style>
    .sidebar {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        width: 15.5rem;
        padding: 1.5rem 1.25rem;
        background-color: var(--surface-50);
        border-right: 1px solid var(--border-color);
        color: var(--text-700);
    }

    .sidebar__section {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-500);
        margin-top: 0.5rem;
    }

    .sidebar__link {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem 0.75rem;
        border-radius: 0.75rem;
        color: inherit;
        text-decoration: none;
        transition:
            background-color 120ms ease,
            color 120ms ease;
    }

    .sidebar__link:hover {
        background-color: var(--surface-200);
        color: var(--text-900);
    }

    .sidebar__link--active {
        background-color: var(--accent-100);
        color: var(--accent-700);
        font-weight: 600;
    }
</style>
