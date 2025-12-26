const { Router } = require('express');
const { endpoint } = require('../utils/endpoint');
const { body, validationResult } = require('express-validator');

module.exports = (query) => {
  const r = Router();

  r.post(
    '/',
    // Валидация данных
    [
      body('name').trim().notEmpty().withMessage('Имя обязательно для заполнения'),
      body('email').trim().isEmail().withMessage('Необходимо ввести корректный email'),
      body('message').trim().notEmpty().withMessage('Сообщение обязательно для заполнения'),
      body('agree').isBoolean().withMessage('Необходимо принять условия соглашения'),
    ],
    endpoint(async (req) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array())
        return { message: 'Вы неправильно ввели данные', errors: errors.array() }, 400;
      }
        try {
      const { name, email, message, agree } = req.body;
      const ipAddress = req.ip;
      const userAgent = req.headers['user-agent'];
        await query(
          `
          INSERT INTO contact_form_submissions (name, email, message, consent_given, ip_address, user_agent)
          VALUES (?, ?, ?, ?, ?, ?)
        `,
          [name, email, message, agree, ipAddress, userAgent]
        );

        return { message: 'Сообщение успешно отправлено' }, 201;
      } catch (error) {
        console.error('Ошибка при добавлении данных в БД:', error);
        return { message: 'Произошла ошибка при сохранении данных' }, 500;
      }
    })
  );

  return r;
};
