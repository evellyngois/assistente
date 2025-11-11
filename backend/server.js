// ============================
// BACKEND ASSISTENTE - GEMINI ONLINE + BASE FUTURA
// ============================

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config(); // 👈 Precisa vir antes de acessar a API Key

// Inicializa Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

// Configurações base
const require = createRequire(import.meta.url);
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// FUTURA BASE DE CONHECIMENTO (DESATIVADA)
// ============================

// import pdfParse from "pdf-parse";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const knowledgePath = path.join(__dirname, "knowledge");
// let baseConhecimento = "";

// async function carregarKnowledge() {
//   try {
//     const arquivos = fs.readdirSync(knowledgePath);
//     for (const arquivo of arquivos) {
//       if (arquivo.endsWith(".pdf")) {
//         const dataBuffer = fs.readFileSync(path.join(knowledgePath, arquivo));
//         const data = await pdfParse(dataBuffer);
//         baseConhecimento += `\n\n📘 [${arquivo}]\n${data.text}`;
//       }
//     }
//     console.log(`✅ Base de conhecimento pronta (${arquivos.length} PDFs).`);
//   } catch (error) {
//     console.error("❌ Erro ao carregar PDFs:", error);
//   }
// }

// ============================
// ROTA /chat — GEMINI ONLINE
// ============================
app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;
    console.log("📩 Mensagem recebida no backend:", question);

    if (!question || question.trim() === "") {
      return res.json({ answer: "Por favor, digite uma pergunta." });
    }

    // Prompt básico
    const prompt = `
Você é um assistente virtual profissional.
Responda de forma clara e objetiva, ajudando o usuário com dúvidas gerais.
Se não tiver certeza sobre algo, diga apenas "não tenho informações suficientes para responder com precisão".
Pergunta: ${question}
`;

    const response = await model.generateContent(prompt);
    const answer = response.response.text().trim();

    res.json({
      success: true,
      answer: `💬 ${answer}`,
    });
  } catch (error) {
    console.error("❌ Erro no /chat:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================
// INICIALIZAÇÃO DO SERVIDOR
// ============================
app.listen(port, async () => {
  console.log(`🚀 Servidor do Assistente rodando na porta ${port}`);
  console.log("📚 Base de conhecimento futura: pasta /knowledge (opcional)");

  // Ativar no futuro:
  // await carregarKnowledge();
});
