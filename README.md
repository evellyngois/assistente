<div align="center">
  <img src="public/docs/banner.png" alt="Assistente com IA Banner" width="800"/>

  <h1>💬 Assistente com IA (React + Node + Gemini)</h1>
  <p>
    Um chatbot inteligente feito com <strong>React</strong> e <strong>Node.js</strong>, 
    integrado à <strong>IA Gemini</strong> do Google.  
    Permite conversas naturais e pode ser expandido para responder com base em <strong>documentos PDF personalizados</strong>.
  </p>

  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue?style=flat-square"/>
  <img src="https://img.shields.io/badge/Versão-1.0.0-blueviolet?style=flat-square"/>
  <img src="https://img.shields.io/badge/React-18.2.0-61dafb?style=flat-square&logo=react"/>
  <img src="https://img.shields.io/badge/Node.js-20.0.0-43853d?style=flat-square&logo=node.js"/>
</div>

---

## 🚀 Funcionalidades
✅ Interface simples e responsiva  
✅ Modo claro/escuro com TailwindCSS  
✅ Comunicação com backend Node.js  
✅ Integração com IA Gemini (Google)  
✅ Suporte a upload e leitura de PDFs  
✅ Pode ser treinado com documentos personalizados  

---

## 🧠 Tecnologias Utilizadas
| Camada | Tecnologias |
|:-------|:-------------|
| **Frontend** | React, TailwindCSS, Axios |
| **Backend** | Node.js, Express, Multer, pdf-parse |
| **IA** | Google Generative AI (Gemini 2.0 Flash) |
| **Controle de Versão** | Git + GitHub |

---
## 🧩 Estrutura de Pastas
<pre><code>/
assistente/
├── backend/ → API Node.js (integração Gemini e leitura de PDFs)
├── src/ → Código React (frontend)
├── public/ → HTML base e ícones
├── .env → Chave privada do Gemini (não enviar ao GitHub)
└── README.md → Documentação
  </code></pre>
---

## ⚙️ Como Rodar Localmente

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/evellyngois/assistente.git
cd assistente
