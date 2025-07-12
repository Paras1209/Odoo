import '../styles/Carousel.css'; // Assuming you have a CSS file for styling the Carousel

const featuredItems = [
    { id: 1, title: 'Hoodie', image: 'https://image.hm.com/assets/hm/82/72/8272a84db83592448ab37910e608e882fa502677.jpg?imwidth=1260' },
    { id: 2, title: 'Floral Dress', image: 'https://www.mytheresa.com/media/1094/1238/100/79/P01009486.jpg' },
    { id: 3, title: 'Denim Jacket', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS8EbPh_XVKD7NyMk61NUF7X0L5kj6wNr2kY-WXEhbHnL-NsR3YGsl-ckjVlqmXUDjnCHbydlpubSD1m5P6nQgnFH7QAyAyj--OgFQdl-vPR0-3FHFBGsDu-eQPUXGqKzL38q29IWc&usqp=CAc' },
];

export default function FeaturedCarousel() {
    return (
        <div className="carousel-container">
            <h2 className="carousel-title">✨ Featured Items</h2>
            <div className="carousel">
                {featuredItems.map(item => (
                    <div key={item.id} className="carousel-card glass">
                        <img src={item.image} alt={item.title} className="carousel-img" />
                        <h3>{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
