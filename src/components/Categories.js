import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/categories.css';

const Categories = () => {
  const categories = [
    {
      name: 'Tablets',
      icon: '💊',
      link: '/listing?category=Tablet',
    },
    {
      name: 'Syrups',
      icon: '🥤',
      link: '/listing?category=Syrup',
    },
    {
      name: 'Injections',
      icon: '💉',
      link: '/listing?category=Injection',
    },
    {
      name: 'Ayurveda',
      icon: '🌿',
      link: '/listing?category=Ayurveda',
    },
    {
      name: 'Homeopathy',
      icon: '✨',
      link: '/listing?category=Homeopathy',
    },
    {
      name: 'Equipment',
      icon: '🏥',
      link: '/listing?category=Equipment',
    },
  ];

  return (
    <section className="categories-section">
      <h2>Shop by Category</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <Link key={category.name} to={category.link} className="category-card">
            <div className="category-icon">{category.icon}</div>
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
