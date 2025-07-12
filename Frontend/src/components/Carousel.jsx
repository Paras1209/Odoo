import React, { useEffect, useRef } from 'react';
import '../styles/Carousel.css';

const featuredItems = [
    { id: 1, title: 'Hoodie', image: 'https://image.hm.com/assets/hm/82/72/8272a84db83592448ab37910e608e882fa502677.jpg?imwidth=1260' },
    { id: 2, title: 'Floral Dress', image: 'https://www.mytheresa.com/media/1094/1238/100/79/P01009486.jpg' },
    { id: 3, title: 'Denim Jacket', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS8EbPh_XVKD7NyMk61NUF7X0L5kj6wNr2kY-WXEhbHnL-NsR3YGsl-ckjVlqmXUDjnCHbydlpubSD1m5P6nQgnFH7QAyAyj--OgFQdl-vPR0-3FHFBGsDu-eQPUXGqKzL38q29IWc&usqp=CAc' },
    { id: 4, title: 'Sport Shoes', image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/aa0bd45abac541d29ff40b492e15cfa4_9366/Runfalcon_5_Running_Shoes_Black_IH7758_HM1.jpg' },
    { id: 5, title: 'Kids Wear', image: 'https://www.kiggle.shop/cdn/shop/files/23811_da751567-b650-4ce5-b36c-078d41604889.jpg?v=1749730365&width=1445' },
    { id: 6, title: 'T-Shirt', image: 'https://image.hm.com/assets/hm/6e/92/6e925ba26a4a87cbdc8b4f456675a2850a02464e.jpg?imwidth=2160' },
];

export default function FeaturedCarousel() {
    const carouselRef = useRef(null);

    useEffect(() => {
        const carousel = carouselRef.current;
        let animationFrame;
        let scrollAmount = 0;
        const speed = 0.5; // pixels per frame

        function smoothScroll() {
            if (!carousel) return;
            scrollAmount += speed;
            if (scrollAmount + carousel.offsetWidth >= carousel.scrollWidth) {
                scrollAmount = 0;
                carousel.scrollTo({ left: 0, behavior: 'auto' });
            } else {
                carousel.scrollTo({ left: scrollAmount, behavior: 'auto' });
            }
            animationFrame = requestAnimationFrame(smoothScroll);
        }

        animationFrame = requestAnimationFrame(smoothScroll);

        return () => cancelAnimationFrame(animationFrame);
    }, []);

    return (
        <div className="carousel-container">
            <h2 className="carousel-title">✨ Featured Items</h2>
            <div className="carousel" ref={carouselRef}>
                {[...featuredItems, ...featuredItems].map((item, idx) => (
                    <div key={item.id + '-' + idx} className="carousel-card glass">
                        <img src={item.image} alt={item.title} className="carousel-img" />
                        <h3>{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
