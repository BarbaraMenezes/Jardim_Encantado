import "./card.css";

interface CardProps {
    title: string,
    price: number,
    image: string,
    onClick?: () => void;
}

export function Card({ title, price, image, onClick } : CardProps){
    return(
        <div className="card" onClick={onClick}>
            <img src={image}/>
            <h2>{title}</h2>
            <p><b>Valor: R$ </b>{price}</p>
        </div>
    )
}