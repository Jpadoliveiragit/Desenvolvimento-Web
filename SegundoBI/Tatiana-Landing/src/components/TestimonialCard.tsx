import Star from "../assets/star.svg";
import StarOuter from "../assets/starOuter.svg";

interface ITestimonialCardProps {
    image: string;
    testimony: string;
    rating: number;
    name: string;
    role: string;
}

export default function TestimonialCard({
    image,
    testimony,
    rating,
    name,
    role
}: ITestimonialCardProps) {
    return (
        <div className="carousel-card">
            <img
                src={image}
                alt={`Imagem perfil cliente ${name}`}
            />

            <span className="testimony">
                <p>
                    {testimony}
                </p>
            </span>

            <span className="rating">
                {Array.from({ length: 5 }).map((_, index) => (
                    <img
                        key={index}
                        src={index < rating ? Star : StarOuter}
                        alt={index < rating ? "icone estrela" : "icone estrela sem fundo"}
                        width={22}
                        height={20}
                    />
                ))}
            </span>

            <span className="names">
                <p>{name}</p>
                <p>{role}</p>
            </span>
        </div>
    );
}
