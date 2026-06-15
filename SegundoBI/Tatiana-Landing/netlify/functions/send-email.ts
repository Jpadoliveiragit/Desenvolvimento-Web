import type { Handler, HandlerEvent } from "@netlify/functions";
import nodemailer from "nodemailer";

interface ContactPayload {
    email: string;
    message: string;
}

const requiredEnv = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "CONTACT_EMAIL"] as const;

function getCorsHeaders(origin: string) {
    return {
        "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || origin || "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
    };
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

const handler: Handler = async (event: HandlerEvent) => {
    const headers = getCorsHeaders(event.headers.origin || "");

    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 204,
            headers,
            body: "",
        };
    }

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ message: "Metodo nao permitido." }),
        };
    }

    try {
        const missingEnv = requiredEnv.filter((key) => !process.env[key]);

        if (missingEnv.length > 0) {
            console.error(`Variaveis ausentes: ${missingEnv.join(", ")}`);

            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ message: "Configuracao de e-mail incompleta." }),
            };
        }

        const { email, message } = JSON.parse(event.body || "{}") as ContactPayload;
        const cleanEmail = email?.trim();
        const cleanMessage = message?.trim();

        if (!cleanEmail || !cleanMessage) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ message: "Preencha o e-mail e a mensagem." }),
            };
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const safeEmail = escapeHtml(cleanEmail);
        const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br>");

        await transporter.sendMail({
            from: `Tatiana Landing <${process.env.SMTP_USER}>`,
            replyTo: cleanEmail,
            to: process.env.CONTACT_EMAIL,
            subject: "Nova mensagem da landing page Tatiana Quecone",
            text: `E-mail: ${cleanEmail}\n\nMensagem:\n${cleanMessage}`,
            html: `
                <h2>Nova mensagem da landing page</h2>
                <p><strong>E-mail:</strong> ${safeEmail}</p>
                <p><strong>Mensagem:</strong></p>
                <p>${safeMessage}</p>
            `,
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: "Mensagem enviada com sucesso." }),
        };
    } catch (error) {
        console.error(error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: "Nao foi possivel enviar a mensagem." }),
        };
    }
};

export { handler };
