let _ = require('lodash');

let scenarios = {
  0: {
    successAnswer: {
      type: 'quickReply',
      text: (message, first) => {
        if (first === true) {
          return 'Привет! Меня зовут Хошемин Бульба! Я финансовый консультант компании ZuherNaher. Нужны деньги? Это ко мне. Скажи, пожалуйста, сколько бы ты хотел занять денег?';
        }
        return 'Давай заново: сколько бы ты хотел занять денег?';
      },
      replies: [{
        content_type: 'text',
        title: '2 млн денег',
        payload: 2
      }, {
        content_type: 'text',
        title: '3 млн денег',
        payload: 3
      }, {
        content_type: 'text',
        title: '4 млн денег',
        payload: 4
      }, {
        content_type: 'text',
        title: '5 млн денег',
        payload: 5
      }, {
        content_type: 'text',
        title: '6 млн денег',
        payload: 6
      }]
    },
    errorAnswer: {
      type: 'text',
      text: () => ''
    },
    successClause: (message) => {
      let messageText = _.get(message, 'text');
      return _.isString(messageText);
    },
    successEvent: (user) => {
      return;
    },
    nextSuccess: 1,
    nextError: 0
  },
  1: {
    successAnswer: {
      type: 'quickReply',
      text: (message, first) => {
        return 'Отлично! А через сколько дней вернешь?';
      },
      replies: [{
        content_type: 'text',
        title: '15 дней',
        payload: '15 дней'
      }, {
        content_type: 'text',
        title: '21 день',
        payload: '21 день'
      }, {
        content_type: 'text',
        title: '30 дней',
        payload: '30 дней'
      }]
    },
    errorAnswer: {
      type: 'quickReply',
      text: (message, first) => {
        return 'Нужно выбрать один из вариантов! Сколько бы ты хотел занять денег?';
      },
      replies: [{
        content_type: 'text',
        title: '2 млн денег',
        payload: '2 млн денег'
      }, {
        content_type: 'text',
        title: '3 млн денег',
        payload: '3 млн денег'
      }, {
        content_type: 'text',
        title: '4 млн денег',
        payload: '4 млн денег'
      }, {
        content_type: 'text',
        title: '5 млн денег',
        payload: '5 млн денег'
      }, {
        content_type: 'text',
        title: '6 млн денег',
        payload: '6 млн денег'
      }]
    },
    successClause: (message) => {
      let quickReply = message.quick_reply;
      return quickReply !== undefined;
    },
    successEvent: (user, message) => {
      user.credit = message.quick_reply.payload;
    },
    nextSuccess: 2,
    nextError: 1
  },
  2: {
    successAnswer: {
      type: 'text',
      text: (message, first) => {
        return 'А какое твое полное имя?';
      }
    },
    errorAnswer: {
      type: 'quickReply',
      text: (message, first) => {
        return 'Нужно выбрать один из вариантов! Через сколько дней вернешь?';
      },
      replies: [{
        content_type: 'text',
        title: '15 дней',
        payload: '15 дней'
      }, {
        content_type: 'text',
        title: '21 день',
        payload: '21 день'
      }, {
        content_type: 'text',
        title: '30 дней',
        payload: '30 дней'
      }]
    },
    successClause: (message) => {
      let quickReply = message.quick_reply;
      return quickReply !== undefined;
    },
    successEvent: (user, message) => {
      user.term = message.quick_reply.payload;
    },
    nextSuccess: 3,
    nextError: 2
  },
  3: {
    successAnswer: {
      type: 'text',
      text: (message, first) => {
        return 'Напиши пожалуйста свой номер телефона.';
      }
    },
    errorAnswer: {
      type: 'text',
      text: (message, first) => {
        return 'Что это? Напиши, пожалуйста, свое полное имя';
      }
    },
    successClause: (message) => {
      let messageText = _.get(message, 'text');
      return _.isString(messageText);
    },
    successEvent: (user, message) => {
      user.name = message.text;
    },
    nextSuccess: 4,
    nextError: 3
  },
  4: {
    successAnswer: {
      type: 'text',
      text: (message, first) => {
        return 'Замечательно! Мне для договора нужен твой СНИЛС. Напиши его, пожалуйста';
      }
    },
    errorAnswer: {
      type: 'text',
      text: (message, first) => {
        return 'Неправильный телефон. Введи заново (напр. 987-654-32-10).';
      }
    },
    successClause: (message) => {
      let messageText = _.get(message, 'text');
      return /^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/.test(messageText);
    },
    successEvent: (user, message) => {
      user.phone = message.text;
    },
    nextSuccess: 5,
    nextError: 4
  },
  5: {
    successAnswer: {
      type: 'text',
      text: (message, first) => {
        return 'Введи свою дату рождения';
      }
    },
    errorAnswer: {
      type: 'text',
      text: (message, first) => {
        return 'Неверный снилс. Введи заново (9 цифр)';
      }
    },
    successClause: (message) => {
      let messageText = _.get(message, 'text');
      return /^[0-9]{9}$/.test(messageText);
    },
    successEvent: (user, message) => {
      user.snils = message.text;
    },
    nextSuccess: 6,
    nextError: 5
  },
  6: {
    successAnswer: {
      type: 'quickReply',
      text: (message, first) => {
        return 'Какой твой пол';
      },
      replies: [{
        content_type: 'text',
        title: 'мужской',
        payload: 'мужской'
      }, {
        content_type: 'text',
        title: 'женский',
        payload: 'женский'
      }]
    },
    errorAnswer: {
      type: 'text',
      text: (message, first) => {
        return 'Неверная дата рождения. Введи заново. Вот пример : 12.09.1982';
      }
    },
    successClause: (message) => {
      let messageText = _.get(message, 'text');
      return /^(\d{4}[^\d]\d{2}[^\d]\d{2})|(\d{2}[^\d]\d{2}[^\d]\d{4})$/.test(messageText);
    },
    successEvent: (user, message) => {
      user.bd = message.text;
    },
    nextSuccess: 7,
    nextError: 6
  },
  7: {
    successAnswer: {
      type: 'quickReply',
      text: (message, first) => {
        return 'а в каком городе ты живешь?';
      },
      replies: [{
        content_type: 'text',
        title: 'Москва',
        payload: 'Москва'
      }, {
        content_type: 'text',
        title: 'Казань',
        payload: 'Казань'
      }, {
        content_type: 'text',
        title: 'Новгород',
        payload: 'Новгород'
      }, {
        content_type: 'text',
        title: 'Владивосток 2000',
        payload: 'Владивосток 2000'
      }, {
        content_type: 'text',
        title: 'Магадан',
        payload: 'Магадан'
      }]
    },
    errorAnswer: {
      type: 'quickReply',
      text: (message, first) => {
        return 'Нужно выбрать один из вариантов! Какой твой пол?';
      },
      replies: [{
        content_type: 'text',
        title: 'мужской',
        payload: 'мужской'
      }, {
        content_type: 'text',
        title: 'женский',
        payload: 'женский'
      }]
    },
    successClause: (message) => {
      let quickReply = message.quick_reply;
      return quickReply !== undefined;
    },
    successEvent: (user, message) => {
      user.sex = message.quick_reply.payload;
    },
    nextSuccess: 8,
    nextError: 7
  },
  8: {
    successAnswer: {
      type: 'text',
      text: (message, first) => {
        return 'Напиши улицу';
      }
    },
    errorAnswer: {
      type: 'quickReply',
      text: (message, first) => {
        return 'Нужно выбрать один из вариантов. Где ты живешь?';
      },
      replies: [{
        content_type: 'text',
        title: 'Москва',
        payload: 'Москва'
      }, {
        content_type: 'text',
        title: 'Казань',
        payload: 'Казань'
      }, {
        content_type: 'text',
        title: 'Новгород',
        payload: 'Новгород'
      }, {
        content_type: 'text',
        title: 'Владивосток 2000',
        payload: 'Владивосток 2000'
      }, {
        content_type: 'text',
        title: 'Магадан',
        payload: 'Магадан'
      }]
    },
    successClause: (message) => {
      let quickReply = message.quick_reply;
      return quickReply !== undefined;
    },
    successEvent: (user, message) => {
      user.city = message.quick_reply.payload;
    },
    nextSuccess: 9,
    nextError: 8
  },
  9: {
    successAnswer: {
      type: 'text',
      text: (message, first) => {
        return 'Введи код, который мы тебе выслали на смс';
      }
    },
    errorAnswer: {
      type: 'text',
      text: (message, first) => {
        return 'Не похоже на улицу. Попробуй ещё';
      }
    },
    successClause: (message) => {
      let messageText = _.get(message, 'text');
      return _.isString(messageText);
    },
    successEvent: (user, message) => {
      user.street = message.text;
    },
    nextSuccess: 10,
    nextError: 9
  },
  10: {
    successAnswer: {
      type: 'text',
      text: (message, first) => {
        // return `Отлично! Скоро мы сообщим тебе решение. ${JSON.stringify(message)}`;
        return `Отлично! Скоро мы сообщим тебе решение`;
      }
    },
    errorAnswer: {
      type: 'quickReply',
      text: (message, first) => {
        return `Ты что-то не то ввел. Это твой номер? ${_.get(message, 'phone')}`;
        // return `Ты что-то не то ввел. Это твой номер? `;
      },
      replies: [{
        content_type: 'text',
        title: 'Да',
        payload: '1'
      }, {
        content_type: 'text',
        title: 'Нет',
        payload: '0'
      }]
    },
    successClause: (message) => {
      let messageText = _.get(message, 'text');
      return messageText == '3234';
    },
    successEvent: (user, message) => {
      return true;
    },
    nextSuccess: 0,
    nextError: 11
  },
  11: {
    successAnswer: {
      type: 'text',
      text: (message, first) => {
        return 'Мы еще раз отправили смс. Введи номер';
      }
    },
    errorAnswer: {
      type: 'text',
      text: (message, first) => {
        return 'Тогда тебе придется пройти все заново';
      }
    },
    successClause: (message) => {
      let payload = _.get(message, 'quick_reply.payload');
      return payload == '1';
    },
    successEvent: (user, message) => {
      ;
    },
    nextSuccess: 12,
    nextError: 0
  },
  12: {
    successAnswer: {
      type: 'text',
      text: (message, first) => {
        // return `Отлично! Скоро мы сообщим тебе решение. ${JSON.stringify(message)}`;
        return `Отлично! Скоро мы сообщим тебе решение`;
      }
    },
    errorAnswer: {
      type: 'text',
      text: (message, first) => {
        return 'Сорри! Но ты тупой. Я не смогу тебе выдать кредит';
      }
    },
    successClause: (message) => {
      let messageText = _.get(message, 'text');
      return messageText == '3234';
    },
    successEvent: (user, message) => {
      return true;
    },
    nextSuccess: 0,
    nextError: 0
  },
};

module.exports = scenarios;
