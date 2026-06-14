import { useEffect, useState } from "react";

import Logo from "../assets/logo2.svg";
import Menu from "../assets/menu.svg";
import Close from "../assets/Close.svg";

import Champion from "../assets/champion.svg";
import ProfileImageOne from "../assets/profileOne.svg";
import ProfileImageTwo from "../assets/profileTwo.svg";
import ProfileImageThree from "../assets/profileThree.svg";
import Check from "../assets/check.svg";
import VolumeBrasileiroOne from "../assets/procedimentos/volume-brasileiro-1.jpg";
import VolumeBrasileiroTwo from "../assets/procedimentos/volume-brasileiro-2.jpg";
import VolumeEgipcioOne from "../assets/procedimentos/volume-egipcio-1.jpg";
import VolumeEgipcioTwo from "../assets/procedimentos/volume-egipcio-2.jpg";
import VolumeLuxoOne from "../assets/procedimentos/volume-luxo-1.jpg";
import VolumeLuxoTwo from "../assets/procedimentos/volume-luxo-2.jpg";
import VolumeGlamOne from "../assets/procedimentos/volume-glam-1.jpg";
import VolumeGlamTwo from "../assets/procedimentos/volume-glam-2.jpg";
import Sobrancelha from "../assets/procedimentos/sobrancelha.png";
import EpilacaoEgipcia from "../assets/procedimentos/epilacao-egipcia.jpg";
import Buco from "../assets/procedimentos/buco.jpg";
import BrowLamination from "../assets/procedimentos/brow-lamination.jpg";

import Button from "../components/Button.tsx";
import TestimonialCard from "../components/TestimonialCard.tsx";

import "../styles/header.css";
import "../styles/utility.css";
import "../styles/hero.css";
import "../styles/solution.css";
import "../styles/testimonials.css";
import "../styles/pricing.css";
import "../styles/contact.css";
import "../styles/footer.css";

// Dados usados nos cards de depoimentos
const testimonials = [
    {
        image: ProfileImageOne,
        testimony: "Amei o resultado! Meus cilios ficaram leves, naturais e com um acabamento muito bonito. O atendimento tambem foi super cuidadoso.",
        rating: 5,
        name: "Mariana Souza",
        role: "Cliente"
    },
    {
        image: ProfileImageTwo,
        testimony: "Foi a primeira vez que fiz alongamento e me senti muito segura. A Tatiana explicou tudo e o resultado valorizou muito meu olhar.",
        rating: 5,
        name: "Camila Rocha",
        role: "Cliente"
    },
    {
        image: ProfileImageThree,
        testimony: "Os cilios duraram muito e ficaram exatamente do jeito que eu queria: delicados, confortaveis e elegantes para o dia a dia.",
        rating: 4,
        name: "Beatriz Lima",
        role: "Cliente"
    }
];

// Links usados nos botões de contato
const whatsappLink = "https://wa.me/554497662589?text=Ola%2C%20gostaria%20de%20agendar%20um%20procedimento.";

const mapsLink = "https://www.google.com/maps/place/24%C2%B032'47.7%22S+52%C2%B059'26.0%22W/@-24.5465784,-52.9931305,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-24.5465833!4d-52.9905556?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D";

// Informações dos procedimentos principais
const procedures = [
    {
        name: "Volume Brasileiro",
        description: "Personalizável em tamanho e quantidade de fios, podendo ficar mais cheio ou mais natural.",
        price: "R$ 160,00",
        duration: "1h30",
        bonus: "Disponível em preto e marrom",
        images: [VolumeBrasileiroOne, VolumeBrasileiroTwo],
        features: [
            "Manutenção até 7 dias: R$ 60,00",
            "Manutenção até 15 dias: R$ 70,00",
            "Manutenção até 20 dias: R$ 85,00",
            "Após 20 dias: R$ 120,00"
        ]
    },
    {
        name: "Volume Egípcio",
        description: "Volume personalizável para realçar o olhar com acabamento marcante e confortável.",
        price: "R$ 170,00",
        duration: "1h30",
        bonus: "Mais escolhido",
        images: [VolumeEgipcioOne, VolumeEgipcioTwo],
        features: [
            "Manutenção até 7 dias: R$ 80,00",
            "Manutenção até 15 dias: R$ 90,00",
            "Manutenção até 20 dias: R$ 105,00",
            "Após 20 dias: R$ 130,00"
        ]
    },
    {
        name: "Volume Luxo",
        description: "Técnica para quem busca um resultado mais preenchido, elegante e com presença.",
        price: "R$ 190,00",
        duration: "1h30",
        images: [VolumeLuxoOne, VolumeLuxoTwo],
        features: [
            "Manutenção até 7 dias: R$ 80,00",
            "Manutenção até 15 dias: R$ 90,00",
            "Manutenção até 20 dias: R$ 110,00",
            "Após 20 dias: R$ 130,00"
        ]
    },
    {
        name: "Volume Glam",
        description: "Opção prática para quem deseja durabilidade superior a 40 dias sem manutenções recorrentes.",
        price: "R$ 220,00",
        duration: "2h30",
        bonus: "Disponível em preto e marrom",
        images: [VolumeGlamOne, VolumeGlamTwo],
        features: [
            "Não possui manutenção",
            "Disponível nos volumes Brasileiro e Egípcio",
            "Durabilidade superior a 40 dias"
        ]
    }
];

// Serviços extras que aparecem depois dos volumes
const extraServices = [
    {
        name: "Design de Sobrancelhas",
        description: "Design personalizado para valorizar o formato natural do seu rosto.",
        price: "R$ 25,00",
        image: Sobrancelha
    },
    {
        name: "Epilação Egípcia",
        description: "Epilação facial completa feita com linha para acabamento delicado.",
        price: "R$ 70,00",
        image: EpilacaoEgipcia
    },
    {
        name: "Buço",
        description: "Remoção delicada dos fios do buço com atenção ao conforto da pele.",
        price: "R$ 15,00",
        image: Buco
    },
    {
        name: "Brow Lamination",
        description: "Procedimento para alinhar, modelar e destacar os fios das sobrancelhas.",
        price: "R$ 120,00",
        image: BrowLamination
    }
];

export default function Home() {

    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {

        const html = document.querySelector("html");

        if (html) {
            html.style.overflow = showMobileMenu ? "hidden" : "auto";
        }

    }, [showMobileMenu]);

    return (
        <>
            {/* HEADER */}

            <header className="container py-sm">

                <nav className="flex items-center justify-between">

                    <img
                        src={Logo}
                        alt="Logo Tatiana"
                        width={240}
                        height={80}
                    />

                    <div className="desktop-only">

                        <ul className="flex gap-1">

                            <li>
                                <a href="#">
                                    Home
                                </a>
                            </li>

                            <li>
                                <a href="#solution">
                                    Soluções
                                </a>
                            </li>

                            <li>
                                <a href="#testimonials">
                                    Depoimentos
                                </a>
                            </li>

                            <li>
                                <a href="#pricing">
                                    Preços
                                </a>
                            </li>

                            <li>
                                <a href="#contact">
                                    Contato
                                </a>
                            </li>

                        </ul>

                    </div>

                    <div className="desktop-only">

                        <div className="flex items-center">

                            <a
                                className="reverse-color ml-lg"
                                href="#pricing"
                            >
                                Catálogo
                            </a>

                            <a
                                className="btn-primary"
                                href={whatsappLink}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Agendar horário
                            </a>

                        </div>

                    </div>

                    {/* MOBILE MENU */}

                    <div className="mobile-menu">

                        {showMobileMenu ? (

                            <div className="mobile-menu-content">

                                <div className="container flex">

                                    <ul>

                                        <li>
                                            <a
                                                onClick={() => setShowMobileMenu(false)}
                                                href="#"
                                            >
                                                Home
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                onClick={() => setShowMobileMenu(false)}
                                                href="#solution"
                                            >
                                                Soluções
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                onClick={() => setShowMobileMenu(false)}
                                                href="#testimonials"
                                            >
                                                Depoimentos
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                onClick={() => setShowMobileMenu(false)}
                                                href="#pricing"
                                            >
                                                Preços
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                onClick={() => setShowMobileMenu(false)}
                                                href="#contact"
                                            >
                                                Contato
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                onClick={() => setShowMobileMenu(false)}
                                                className="reverse-color"
                                                href={whatsappLink}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Agendar
                                            </a>
                                        </li>

                                    </ul>

                                    <span
                                        onClick={() => setShowMobileMenu(false)}
                                        className="btn-wrapper menu-toggle"
                                    >

                                        <img
                                            src={Close}
                                            alt="ícone fechar menu"
                                            width={24}
                                            height={24}
                                        />

                                    </span>

                                </div>

                            </div>

                        ) : (

                            <span
                                onClick={() => setShowMobileMenu(true)}
                                className="btn-wrapper menu-toggle"
                            >

                                <img
                                    src={Menu}
                                    alt="ícone menu"
                                    width={24}
                                    height={24}
                                />

                            </span>

                        )}

                    </div>

                </nav>

            </header>

            {/* HERO */}

            <section id="hero">

                <div className="container content">

                    <p className="desktop-only">
                        Especialista em cílios
                    </p>

                    <h1>
                        Cílios perfeitos para
                        <span> realçar </span>
                        ainda mais sua beleza!
                    </h1>

                    <p>
                        Alongamento de cílios com acabamento natural,
                        confortável e sofisticado para você se sentir
                        linda todos os dias.
                    </p>

                    <div className="flex gap-1">

                        <span>

                            <Button text="Agende agora" />

                        </span>

                        <span className="desktop-only">

                            <Button
                                text="Veja mais"
                                secondary
                            />

                        </span>

                    </div>

                </div>

            </section>

            {/* SOLUTION */}

            <section
                className="container"
                id="solution"
            >

                <header>

                    <span>

                        <h2>
                            Soluções
                        </h2>

                        <span className="desktop-only">

                            <h2>
                                Sob medida para você
                            </h2>

                        </span>

                    </span>

                    <p>
                        Inovação é com a gente! A <strong>Tatiana</strong>
                        já conquistou diversas clientes, seja você mais uma delas,
                        veja tudo que pode ganhar com nossos serviços.
                    </p>

                </header>

                <section className="even-columns">

                    {/* CARD 1 */}

                    <div className="card">

                        <span>

                            <img
                                src={Champion}
                                alt="ícone campeão"
                                width={64}
                                height={64}
                            />

                        </span>

                        <div>

                            <h3>
                                Atendimento Premium
                            </h3>

                            <p>
                                Atendimento personalizado,
                                confortável e pensado
                                para valorizar sua autoestima
                                e sua beleza.
                            </p>

                            <hr />

                        </div>

                    </div>

                    {/* CARD 2 */}

                    <div className="card">

                        <span>

                            <img
                                src={Champion}
                                alt="ícone campeão"
                                width={64}
                                height={64}
                            />

                        </span>

                        <div>

                            <h3>
                                Cílios Naturais
                            </h3>

                            <p>
                                Técnicas modernas que garantem
                                um resultado elegante, natural
                                e duradouro para o seu olhar.
                            </p>

                            <hr />

                        </div>

                    </div>

                    {/* CARD 3 */}

                    <div className="card">

                        <span>

                            <img
                                src={Champion}
                                alt="ícone campeão"
                                width={64}
                                height={64}
                            />

                        </span>

                        <div>

                            <h3>
                                Resultado Incrível
                            </h3>

                            <p>
                                Realce sua beleza com aplicações
                                feitas com qualidade, cuidado
                                e muito profissionalismo.
                            </p>

                            <hr />

                        </div>

                    </div>

                </section>

            </section>

            {/* TESTIMONIALS */}

            <section id="testimonials">

                <header>

                    <span>

                        <p className="desktop-only">
                            Conselho de quem conhece
                        </p>

                        <h2>
                            Cada cliente importa!
                        </h2>

                    </span>

                    <p>
                        Quem ja fez sabe da qualidade do atendimento, estamos mostrando que
                        alongamento de cilios pode ser bonito, confortavel e natural.
                        Acompanhe abaixo os testemunhos de quem ja agendou e aprovou.
                    </p>

                </header>

                <section className="carousel">

                    <div className="carousel-content">

                        {testimonials.map((testimonial) => (
                            <TestimonialCard
                                key={testimonial.name}
                                image={testimonial.image}
                                testimony={testimonial.testimony}
                                rating={testimonial.rating}
                                name={testimonial.name}
                                role={testimonial.role}
                            />
                        ))}

                    </div>

                    <div className="carousel-content">

                        {testimonials.map((testimonial) => (
                            <TestimonialCard
                                key={`${testimonial.name}-copy`}
                                image={testimonial.image}
                                testimony={testimonial.testimony}
                                rating={testimonial.rating}
                                name={testimonial.name}
                                role={testimonial.role}
                            />
                        ))}

                    </div>

                </section>

            </section>

            {/* PRICING */}

            <section id="pricing" className="container">

                <header>
                    <p className="desktop-only">
                        Catálogo 2026
                    </p>

                    <h2>
                        Procedimentos e valores
                    </h2>

                    <p>
                        Escolha a técnica que combina com o seu estilo. Todos os valores
                        seguem o catálogo atualizado de procedimentos.
                    </p>
                </header>

                <section className="even-columns gap-1.5 pricing-grid">

                    {/* Cards criados a partir da lista de procedimentos */}

                    {procedures.map((procedure, index) => (
                        <div
                            className={index === 1 ? "pricing-card premium" : "pricing-card"}
                            key={procedure.name}
                        >
                            {procedure.bonus && (
                                <span className="bonus">
                                    <p>{procedure.bonus}</p>
                                </span>
                            )}

                            <div className="procedure-gallery">
                                {procedure.images.map((image) => (
                                    <img
                                        key={image}
                                        src={image}
                                        alt={`Resultado ${procedure.name}`}
                                    />
                                ))}
                            </div>

                            <span className="plan">
                                <h3>{procedure.name}</h3>
                                <p>{procedure.description}</p>
                            </span>

                            <span className="price">
                                <h2>{procedure.price}</h2>
                                <p>/aplicação</p>
                            </span>

                            <span className="features">
                                <img src={Check} alt="ícone check" width={24} height={24} />
                                <p>Tempo de aplicação: {procedure.duration}</p>
                            </span>

                            <span className="hr" />

                            {procedure.features.map((feature) => (
                                <span className="features" key={feature}>
                                    <img src={Check} alt="ícone check" width={24} height={24} />
                                    <p>{feature}</p>
                                </span>
                            ))}

                            <a
                                className={index === 1 ? "btn-primary" : "btn-secondary"}
                                href={whatsappLink}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Agendar agora
                            </a>
                        </div>
                    ))}

                </section>

                <section className="extra-services">
                    <header>
                        <p className="desktop-only">
                            Serviços extras
                        </p>

                        <h2>
                            Complementos de beleza
                        </h2>
                    </header>

                    <div className="even-columns gap-1.5 pricing-grid compact-grid">
                        {extraServices.map((service) => (
                            <div className="pricing-card compact-card" key={service.name}>
                                <img
                                    className="service-image"
                                    src={service.image}
                                    alt={service.name}
                                />

                                <span className="plan">
                                    <h3>{service.name}</h3>
                                    <p>{service.description}</p>
                                </span>

                                <h2>{service.price}</h2>

                                <a
                                    className="btn-secondary"
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Agendar agora
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="pricing-notes">
                    {/* Regras importantes do catálogo */}
                    <div>
                        <h3>Manutenção</h3>
                        <p>
                            Se passar de 30 dias ou perder mais de 40% dos fios, será cobrado
                            o valor inicial da aplicação. O ideal é fazer a manutenção entre
                            15 e 20 dias.
                        </p>
                    </div>

                    <div>
                        <h3>Remoção</h3>
                        <p>Troca de técnica: grátis.</p>
                        <p>Remoção para nova aplicação: R$ 40,00.</p>
                        <p>Somente remoção: R$ 50,00.</p>
                    </div>

                    <div>
                        <h3>Pagamento</h3>
                        <p>
                            Aceitamos dinheiro, Pix e cartão. As extensões podem ser parceladas
                            em até 2 vezes com acréscimo da maquininha.
                        </p>
                    </div>
                </section>

            </section>

            {/* CONTACT */}

            <section id="contact" className="container">
                <header>
                    <p className="desktop-only">
                        Envie sua dúvida
                    </p>

                    <h2>
                        Entre em contato
                    </h2>

                    <p>
                        Entre em contato, estamos dispostos a tirar qualquer dúvida,
                        seja sobre agendamento, manutenção ou escolha da melhor técnica.
                    </p>
                </header>

                <form onSubmit={(event) => event.preventDefault()}>
                    <input
                        type="email"
                        placeholder="Seu melhor Email"
                    />

                    <input
                        type="text"
                        placeholder="Motivo do contato. Ex: Gostei muito do resultado, poderia me enviar um orçamento?"
                    />

                    <Button text="Enviar" />
                </form>

                <div className="contact-actions">
                    <a
                        className="btn-primary"
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Chamar no WhatsApp
                    </a>

                    <a
                        className="btn-secondary"
                        href={mapsLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Ver endereço
                    </a>
                </div>
            </section>

            {/* FOOTER */}

            <footer>
                <section className="container footer-content">
                    <div>
                        <h3>LogoMarca</h3>

                        <span className="social-links">
                            <a href={whatsappLink} aria-label="WhatsApp" target="_blank" rel="noreferrer">
                                <svg>
                                    <use href="/icons.svg#whatsapp-icon" />
                                </svg>
                            </a>
                        </span>
                    </div>

                    <div>
                        <h3>Empresa</h3>

                        <ul>
                            <li><a href="#solution">Sobre nós</a></li>
                            <li><a href="#testimonials">Depoimentos</a></li>
                            <li><a href="#contact">Contato</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3>Funcionalidades</h3>

                        <ul>
                            <li><a href="#solution">Atendimento</a></li>
                            <li><a href="#pricing">Procedimentos</a></li>
                            <li><a href="#contact">Agendamento</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3>Recursos</h3>

                        <ul>
                            <li><a href="#pricing">Valores</a></li>
                            <li><a href="#contact">Orçamento</a></li>
                            <li><a href="#testimonials">Clientes</a></li>
                        </ul>
                    </div>
                </section>

                <p className="copy">
                    Feito com amor na aula de Programação Web ©2026 Tatiana Cílios - Todos os direitos reservados.
                </p>
            </footer>

        </>
    );
}




