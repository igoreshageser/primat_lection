import React from 'react';

import './style.scss';
import Mouse from '../../User interface/mouse/mouse';


const PromoPage = () => {
  return (
      <div className="promo">
          <div className="typewriter">
              <Mouse />
              <h3>
                  Не можешь найти лекцию?
                  Поможем!
              </h3>
          </div>
      </div>
  )
};


export default PromoPage;