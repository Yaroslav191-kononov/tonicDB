import React, { useState, useEffect } from 'react';
import StatCard from '../../components/StatCard/StatCard';
import RevenueChart from '../../components/RevenueChart/RevenueChart';
import CategoryPieChart from '../../components/CategoryPieChart/CategoryPieChart';
import TopProductsTable from '../../components/TopProductsTable/TopProductsTable';
import './DashboardPage.css';

const DashboardPage = () => {
    const [statsData, setStatsData] = useState([
        {
            id: 1,
            title: 'Общий объем продаж',
            value: 'Загрузка...', // Начальное значение
            change: '+5%',
            isPositive: true,
            description: 'по сравнению с предыдущим месяцем'
        },
        {
            id: 2,
            title: 'Общий объем выручки',
            value: 'Загрузка...', // Начальное значение
            change: '-7%',
            isPositive: false,
            description: 'по сравнению с предыдущим месяцем'
        },
        {
            id: 3,
            title: 'Общий объем заказов',
            value: 'Загрузка...', // Начальное значение
            change: '+5%',
            isPositive: true,
            description: 'по сравнению с предыдущим месяцем'
        },
        {
            id: 4,
            title: 'Общее количество посетителей',
            value: 'Загрузка...', // Начальное значение
            change: '+5%',
            isPositive: true,
            description: 'по сравнению с предыдущим месяцем'
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/dashBoard');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                setStatsData([
                    { ...statsData[0], value: `${data.current.totalRevenue} ₽`,change:`${data.changes.revenuePct}%`,isPositive:data.changes.revenuePct>0 }, 
                    { ...statsData[1], value: `${data.current.totalRevenue} ₽`,change:`${data.changes.revenuePct}%`,isPositive:data.changes.revenuePct>0 },
                    { ...statsData[2], value: `${data.current.totalQuantity} шт.`,change:`${data.changes.quantityPct}%`,isPositive:data.changes.quantityPct>0 }, 
                    { ...statsData[3], value: data.current.totalViews,change:`${data.changes.viewsPct}%`,isPositive:data.changes.viewsPct>0  }, 
                ]);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);

                setStatsData([
                    { ...statsData[0], value: 'Ошибка' },
                    { ...statsData[1], value: 'Ошибка' },
                    { ...statsData[2], value: 'Ошибка' },
                    { ...statsData[3], value: 'Ошибка' },
                ]);
            }
        };

        fetchData();
    }, []);  // Пустой массив зависимостей означает, что useEffect выполнится только один раз при монтировании компонента

    return (
        <>
            {/* ДЕСКТОП ВЕРСИЯ */}
            <div className="Dashboard Dashboard_desktop">
                <div className="Dashboard_main">
                    <div className="Dashboard_row">
                        <RevenueChart />
                        <CategoryPieChart />
                    </div>

                    <div className="Dashboard_table">
                        <TopProductsTable />
                    </div>
                </div>

                <div className="Dashboard_sidebar">
                    {statsData.map((stat) => (
                        <StatCard
                            key={stat.id}
                            title={stat.title}
                            value={stat.value}
                            change={stat.change}
                            isPositive={stat.isPositive}
                            description={stat.description}
                        />
                    ))}
                </div>
            </div>

            {/* ПЛАНШЕТ/МОБИЛКА ВЕРСИЯ */}
            <div className="Dashboard Dashboard_tablet">
                {/* 1. График доход/просмотры - ПЕРВЫЙ */}
                <div className="Dashboard_tablet_revenue">
                    <RevenueChart />
                </div>

                {/* 2. Блок с графиком категорий и карточками */}
                <div className="Dashboard_tablet_middle">
                    {/* ЛЕВАЯ КОЛОНКА - График категорий + Общий объем заказов */}
                    <div className="Dashboard_tablet_left">
                        <div className="Dashboard_tablet_category">
                            <CategoryPieChart />
                        </div>
                        <div className="Dashboard_tablet_orders">
                            <StatCard
                                title={statsData[2].title}
                                value={statsData[2].value}
                                change={statsData[2].change}
                                isPositive={statsData[2].isPositive}
                                description={statsData[2].description}
                            />
                        </div>
                    </div>

                    {/* ПРАВАЯ КОЛОНКА - 3 карточки в столбик */}
                    <div className="Dashboard_tablet_right">
                        {/* Общий объем продаж */}
                        <StatCard
                            title={statsData[0].title}
                            value={statsData[0].value}
                            change={statsData[0].change}
                            isPositive={statsData[0].isPositive}
                            description={statsData[0].description}
                        />
                        {/* Общий объем выручки */}
                        <StatCard
                            title={statsData[1].title}
                            value={statsData[1].value}
                            change={statsData[1].change}
                            isPositive={statsData[1].isPositive}
                            description={statsData[1].description}
                        />
                        {/* Общее количество посетителей */}
                        <StatCard
                            title={statsData[3].title}
                            value={statsData[3].value}
                            change={statsData[3].change}
                            isPositive={statsData[3].isPositive}
                            description={statsData[3].description}
                        />
                    </div>
                </div>

                <div className="Dashboard_tablet_table">
                    <TopProductsTable />
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
