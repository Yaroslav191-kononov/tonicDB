// src/components/RevenueChart/RevenueChart.jsx
import React, { useState, useEffect } from 'react';
import './RevenueChart.css';

const RevenueChart = () => {
  const [deviceType, setDeviceType] = useState('desktop');
  const [remoteData, setRemoteData] = useState(null); // новые данные из API

  // Данные для разных устройств
  const chartData = {
    desktop: {
      income: [
        { month: 'Мар.', value: 20 },
        { month: 'Апр.', value: 18 },
        { month: 'Май', value: 25 },
        { month: 'Июн.', value: 5 },
        { month: 'Июл.', value: 17 }
      ],
      views: [
        { month: 'Мар.', value: 10 },
        { month: 'Апр.', value: 10 },
        { month: 'Май', value: 15 },
        { month: 'Июн.', value: 12 },
        { month: 'Июл.', value: 28 }
      ]
    },
    tablet: {
      income: [
        { month: 'Фев.', value: 15 },
        { month: 'Мар.', value: 20 },
        { month: 'Апр.', value: 18 },
        { month: 'Май', value: 25 },
        { month: 'Июн.', value: 5 },
        { month: 'Июл.', value: 17 },
        { month: 'Авг.', value: 22 }
      ],
      views: [
        { month: 'Фев.', value: 8 },
        { month: 'Мар.', value: 10 },
        { month: 'Апр.', value: 10 },
        { month: 'Май', value: 15 },
        { month: 'Июн.', value: 12 },
        { month: 'Июл.', value: 28 },
        { month: 'Авг.', value: 30 }
      ]
    },
    mobile: {
      income: [
        { month: 'Июн.', value: 5 },
        { month: 'Июл.', value: 17 },
        { month: 'Авг.', value: 22 }
      ],
      views: [
        { month: 'Июн.', value: 12 },
        { month: 'Июл.', value: 28 },
        { month: 'Авг.', value: 30 }
      ]
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 767) {
        setDeviceType('mobile');
      } else if (width <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Новые данные из API (минимальное изменение)
  useEffect(() => {
    fetch('http://localhost:3000/api/grapfic')
      .then((res) => res.json())
      .then((payload) => {
        const items = payload?.data ?? payload ?? [];
        // Сортировка по месяцам для стабильности графика
        items.sort((a, b) => (a.year_month || '').localeCompare(b.year_month || ''));
        setRemoteData(items);
      })
      .catch(() => {
        // игнорируем ошибку, чтобы не ломать локальные данные
      });
  }, []);

  // Берем данные либо из API, либо из локальных значений (минимум изменений)
  const incomeData = remoteData?.length
    ? remoteData.map((d) => ({
        month: d.year_month,
        value: Number(d.total_quantity ?? 0),
      }))
    : chartData[deviceType].income;

  const viewsData = remoteData?.length
    ? remoteData.map((d) => ({
        month: d.year_month,
        value: Number(d.total_views ?? 0),
      }))
    : chartData[deviceType].views;

  // Месяцы для оси X
  const months = remoteData?.length
    ? remoteData.map((d) => d.year_month)
    : incomeData.map((d) => d.month);

  const maxValue = Math.max(
    1,
    ...incomeData.map((p) => Number(p.value)),
    ...viewsData.map((p) => Number(p.value))
  );
  const toPointsFromData = (dataArray) =>
    dataArray
      .map((pt, index) => {
        const x = (index / (dataArray.length - 1 || 1)) * 500;
        const y = 200 - (Number(pt.value) / maxValue) * 200;
        return `${x},${y}`;
      })
      .join(' ');

  return (
    <div className="RevenueChart">
      <div className="RevenueChart_header">
        <h3 className="RevenueChart_title">Доход/просмотры</h3>

        <div className="RevenueChart_tabs">
          <div className="RevenueChart_tab">
            <span className="RevenueChart_tab_indicator income"></span>
            Доход
          </div>
          <div className="RevenueChart_tab">
            <span className="RevenueChart_tab_indicator views"></span>
            Просмотры
          </div>
        </div>
      </div>

      <div className="RevenueChart_graph">
        <div className="RevenueChart_y_axis">
          {[0, Math.floor(maxValue/3), Math.floor(2*maxValue/3),Math.floor(3*maxValue/4),maxValue].slice(0, 5).reverse().map((value) => (
            <span key={value} className="RevenueChart_y_label">
              {value}
            </span>
          ))}
        </div>

        <div className="RevenueChart_plot">
          <svg
            className="RevenueChart_svg"
            viewBox="0 0 500 200"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="incomeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(205, 255, 255, 0.1)" />
                <stop offset="100%" stopColor="rgba(205, 255, 255, 0)" />
              </linearGradient>
              <linearGradient id="viewsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(38, 0, 255, 0.1)" />
                <stop offset="100%" stopColor="rgba(38, 0, 255, 0)" />
              </linearGradient>
            </defs>

            {/* Горизонтальные линии сетки */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 50}
                x2="500"
                y2={i * 50}
                stroke="rgba(255, 255, 255, 1)"
                strokeWidth="1"
              />
            ))}

            {/* Вертикальные линии сетки */}
            {incomeData.map((_, index) => {
              const x = (index / (incomeData.length - 1)) * 500;
              return (
                <line
                  key={`v-${index}`}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2="200"
                  stroke="rgba(255, 255, 255, 1)"
                  strokeWidth="1"
                />
              );
            })}

            {/* График Доходов (бирюзовая линия) */}
            <polyline
              points={toPointsFromData(incomeData)}
              fill="none"
              stroke="rgba(205, 255, 255, 1)"
              strokeWidth="2"
            />

            {/* Точки для Доходов */}
            {incomeData.map((point, index) => {
              const x = (index / (incomeData.length - 1 || 1)) * 500;
              const y = 200 - (Number(point.value) / maxValue) * 200;
              return (
                <circle
                  key={`income-${index}`}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="rgba(205, 255, 255, 1)"
                  stroke="none"
                />
              );
            })}

            {/* График Просмотров (синяя линия) */}
            <polyline
              points={toPointsFromData(viewsData)}
              fill="none"
              stroke="#2600ff"
              strokeWidth="2"
            />

            {viewsData.map((point, index) => {
              const x = (index / (viewsData.length - 1 || 1)) * 500;
              const y = 200 - (Number(point.value) / maxValue) * 200;
              return (
                <circle
                  key={`views-${index}`}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#2600ff"
                  stroke="none"
                />
              );
            })}
          </svg>

          <div className="RevenueChart_x_axis">
            {months.map((m, index) => (
              <span key={index} className="RevenueChart_x_label">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Простая загрузка/ошибка не добавлял в минимальном виде, можно расширить по необходимости */}
    </div>
  );
};

export default RevenueChart;