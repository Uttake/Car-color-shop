import React from "react";
import styles from "./AboutBlock.module.css";
const AboutBlock = () => {
  return (
    <div className={styles["custom-block"]}>
      <p>Добро пожаловать на сайт «Toncolor»!</p>
      <p>
        Компания «Toncolor» — это широкий ассортимент высококачественных
        автоэмалей, лакокрасочных материалов и аксессуаров для вашего
        автомобиля. Мы предлагаем продукцию известных брендов, которая
        гарантирует долговечность и стойкость покрытия.
      </p>
      <p>
        Сеть магазинов «Toncolor» более 15 лет занимается продажей автоэмалей,
        красок и расходных материалов. Мы зарекомендовали себя как надежный
        партнер, предлагающий товары для самых требовательных клиентов. Наши
        специалисты всегда готовы предоставить консультации по выбору эмали для
        любого типа автомобиля и предложат оптимальные решения для любых задач
        по восстановлению и улучшению внешнего вида вашего автомобиля.
      </p>
      <p>
        Мы гордимся своей репутацией и предоставляем гарантию на весь
        ассортимент, представленный на нашем сайте!
      </p>
      <p>Убедитесь в этом сами!</p>
    </div>
  );
};

export default AboutBlock;
