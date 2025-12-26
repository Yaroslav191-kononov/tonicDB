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
            body('surname').trim().notEmpty().withMessage('Фамилия обязательна для заполнения'),
            body('phone').trim().notEmpty().withMessage('Телефон обязателен для заполнения'),
            body('email').trim().isEmail().withMessage('Необходимо ввести корректный email'),
            body('address').trim().notEmpty().withMessage('Адрес обязателен для заполнения'),
            body('delivery').trim().notEmpty().withMessage('Способ доставки обязателен для выбора'),
            body('cartItems').isArray().notEmpty().withMessage('Корзина не должна быть пустой'),
            body('cartItems.*.id').isInt().withMessage('ID товара должен быть числом'),
            body('cartItems.*.name').trim().notEmpty().withMessage('Название товара обязательно'),
            body('cartItems.*.quantity').isInt({ min: 1 }).withMessage('Количество должно быть больше 0'),
            body('cartItems.*.price').isNumeric().withMessage('Цена должна быть числом'), // Добавлена валидация цены
            body('agreedToTerms').isBoolean().withMessage('Необходимо принять условия соглашения'),
        ],
        endpoint(async (req) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return { errors: errors.array() }, 400;
            }
            const { name, surname, phone, email, address, delivery, cartItems, agreedToTerms } = req.body;
            try {
                const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
                const orderResult = await query(
                    `
                    INSERT INTO orders (name, surname, phone, email, address, delivery, total_price, agreed_to_terms)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `,
                    [name, surname, phone, email, address, delivery, totalPrice, agreedToTerms]
                );
                const orderId = orderResult.insertId;
                for (const item of cartItems) {
                    await query(
                        `
                        UPDATE products
                        SET quantity = quantity - ?
                        WHERE id = ? AND quantity >= ?
                    `,
                        [item.quantity, item.id, item.quantity]
                    );
                    await query(
                        `
                        INSERT INTO order_items (order_id, product_id, product_name, quantity, price, date)
                        VALUES (?, ?, ?, ?, ?, NOW())
                    `,
                        [orderId, item.id, item.name, item.quantity, item.price]
                    );
                    await query(
                        `
                        UPDATE products
                        SET quantity = quantity + ?
                        WHERE id = ?
                    `,
                        [item.quantity, item.id] 
                    );
                }
                return { message: 'Заказ успешно оформлен' }, 201;
            } catch (error) {
                console.error('Ошибка при оформлении заказа:', error);
                return { message: 'Произошла ошибка при оформлении заказа'+error }, 500;
            }
        })
    );
    return r;
};