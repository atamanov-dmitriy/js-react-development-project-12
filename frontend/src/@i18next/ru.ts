const ru = {
  translation: {
    "main-layout": {
      logoutButton: "Выйти",
    },
    "page-index": {
      headingChannelAdd: "Каналы",
      messagesQty: {
        count_zero: "{{count}} сообщений",
        count_one: "{{count}} сообщение",
        count_few: "{{count}} сообщения",
        count_many: "{{count}} сообщений",
      },
      channelsItemMenu: "Управление каналом",
      channelsItemDelete: "Удалить",
      channelsItemRename: "Переименовать",

      messageAriaLabel: "Новое сообщение",
      messagePlaceholder: "Введите сообщение...",
      messageSubmit: "Отправить",

      errorChannelNotFound: "Канал не найден",
      errorUserNotFound: "Пользователь не найден",
      errorNetwork: "Ошибка сети",

      addForm: {
        heading: "Добавить канал",
        label: "Имя канала",

        required: "Обязательное поле",
        minMax: "От {{min}} до {{max}} символов",
        notOneOf: "Должно быть уникальным",

        errorNetwork: "Ошибка сети",
        success: "Канал создан",

        submitButton: "Отправить",
        resetButton: "Отменить",
      },
      renameForm: {
        heading: "Переименовать канал",
        label: "Имя канала",

        required: "Обязательное поле",
        minMax: "От {{min}} до {{max}} символов",
        notOneOf: "Должно быть уникальным",

        errorChannelNotFound: "Канал не найден",
        errorNetwork: "Ошибка сети",
        success: "Канал переименован",

        submitButton: "Отправить",
        resetButton: "Отменить",
      },
      deleteForm: {
        heading: "Удалить канал",
        lead: "Уверены?",

        errorIdNotFound: "Неверный id канала",
        errorNetwork: "Ошибка сети",
        success: "Канал удалён",

        submitButton: "Удалить",
        resetButton: "Отменить",
      },
    },
    "page-singup": {
      usernameLabel: "Имя пользователя",
      usernameMinMax: "От {{min}} до {{max}} символов",
      usernameMatches:
        "Имя пльзователя может содержать только буквы, цифры и подчеркивание",

      passwordLabel: "Пароль",
      passwordMinMax: "Не менее {{min}} символов",

      confirmLabel: "Подтвердите пароль",
      confirmOneOf: "Пароли должны совпадать",

      error409: "Такой пользователь уже существует",
      errorNetwork: "Ошибка сети",

      heading: "Регистрация",
      submitButton: "Зарегистрироваться",
    },
    "page-login": {
      usernameLabel: "Ваш ник",
      usernameMinMax: "От {{min}} до {{max}} символов",
      usernameMatches:
        "Имя пльзователя может содержать только буквы, цифры и подчеркивание",

      passwordLabel: "Пароль",
      passwordMinMax: "Не менее {{min}} символов",

      error401: "Неверные имя пользователя или пароль",
      errorNetwork: "Ошибка сети",

      heading: "Войти",
      submitButton: "Войти",
      footerSpan: "Нет аккаунта?",
      footerLink: "Регистрация",
    },
    "page-not-found": {
      heading: "Страница не найдена",
      paragraph: "Но вы можете перейти",
      link: "на главную страницу",
    },
  },
};

export { ru };
