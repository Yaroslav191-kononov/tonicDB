import React, { useState, useEffect } from 'react';
import './ContactForm.css';

// Импортируем общий загрузчик данных
import { mockData, fetchMockData } from '../../../data/data.js';

export const ContactForm = (formUIQUE) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    formUIQUE:formUIQUE.formUIQUE || "",
    agree: false
  });

  // Новое: содержимое формы, взятое из data.js (через API)
  const [formContent, setFormContent] = useState(null);

  // Загрузка данных при монтировании
  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const data = await fetchMockData();
        if (mounted) {

          setFormContent(data?.form.pages[0] ?? mockData.form.pages[0] ?? null);
        }
      } catch (e) {
        console.error('Failed to load data', e);
      }
    };
    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/contact-form', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const errorData = await response.json(); 
        console.log(errorData);
                        if(errorData==400){
                                  alert('вы не правильно ввели емаил');
                        }
        setFormData({ name: '', email: '', message: '', agree: false });
        alert('Сообщение успешно отправлено!');

      } else {
        const errorData = await response.json();
        console.error('Form submission failed:', errorData);
 
        if (errorData.errors) {
          alert(errorData.errors.map(err => err.msg).join('\n'));
        } else {
           alert('Произошла ошибка при отправке сообщения.');
        }
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('Произошла ошибка при отправке сообщения.');
    }
  };


  return (
    <section className="ContactForm_section section-light">

      <div className="ContactForm_container container">
        <div className="ContactForm_content">

            <h2 className="ContactForm_title">
              {formContent?.title}
            </h2>

          <p className="ContactForm_description">
            {formContent?.description}
          </p>
        </div>

        <form className="ContactForm_form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={formContent?.placeholder_name}
            value={formData?.name}
            onChange={handleChange}
            className="ContactForm_input"
            required
          />

          <input
            type="email"
            name="email"
            placeholder={formContent?.placeholder_email}
            value={formData.email}
            onChange={handleChange}
            className="ContactForm_input"
            required
          />

          <input
            name="message"
            placeholder={formContent?.placeholder_message}
            value={formData.message}
            onChange={handleChange}
            className="ContactForm_textarea"
            required
          />

          <label className="ContactForm_checkbox">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              required
            />
            <span>{formContent?.checkbox_label}</span>
          </label>

          <button type="submit" className="ContactForm_button">
            {formContent?.button_text}
          </button>
        </form>
      </div>

    </section>
  );
};
