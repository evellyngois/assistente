import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./index.css";
import botAvatar from "./assets/bot-avatar.png";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState("");

  // Mensagem inicial
  useEffect(() => {
    setTimeout(() => {
      setMessages([
        { sender: "bot", text: "Olá! 👋 Sou o seu Assistente." },
      ]);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Antes de começarmos, como posso te chamar?" },
        ]);
      }, 1200);
    }, 800);
  }, []);

  // Enviar mensagem
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    if (!userName) {
      setUserName(input);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `Prazer em te conhecer, ${input}! 😊` },
        ]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "Posso te ajudar com qualquer dúvida. O que você gostaria de saber hoje?",
            },
          ]);
        }, 1000);
      }, 800);
    } else {
      try {
        console.log("📤 Enviando pergunta para o backend:", input);

        const res = await axios.post("http://localhost:5000/chat", {
          question: input,
        });

        console.log("✅ Resposta recebida:", res.data);

        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: res.data.answer || "Sem resposta." },
        ]);
      } catch (error) {
        console.error("❌ Erro ao se comunicar com o backend:", error);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "❌ Erro ao se comunicar com o servidor." },
        ]);
      }
    }

    setInput("");
  };

  return (
    <div
      className={`flex h-screen font-sans transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* SIDEBAR */}
      <aside
        className={`w-64 flex flex-col p-6 shadow-lg transition-colors duration-500 ${
          darkMode ? "bg-blue-950 text-blue-100" : "bg-blue-900 text-white"
        }`}
      >
        <div className="flex items-center space-x-3 mb-8">
          <img
            src={logo}
            alt="Assistente Logo"
            className="w-10 h-10 animate-pulse drop-shadow-lg"
          />
          <h1 className="text-2xl font-bold tracking-wide">Assistente</h1>
        </div>

        <nav className="flex flex-col space-y-4">
          <button className="hover:bg-blue-800 p-2 rounded text-left transition">
            🏠 Início
          </button>
          <button className="hover:bg-blue-800 p-2 rounded text-left transition">
            💬 Chat
          </button>
          <button className="hover:bg-blue-800 p-2 rounded text-left transition">
            📊 Relatórios
          </button>
        </nav>

        <div className="mt-auto text-sm text-blue-300">Assistente © 2025</div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col">
        {/* CABEÇALHO */}
        <header
          className={`p-4 flex justify-between items-center shadow transition-colors duration-500 ${
            darkMode ? "bg-gray-800 text-blue-100" : "bg-white text-blue-900"
          }`}
        >
          <h2 className="text-xl font-semibold">Assistente</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm opacity-80">
              {userName ? `Bem-vindo, ${userName}!` : "Conectado ✅"}
            </span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-1 rounded-md border transition ${
                darkMode
                  ? "border-blue-300 hover:bg-blue-800"
                  : "border-blue-800 hover:bg-blue-100"
              }`}
            >
              {darkMode ? "🌞 Modo Claro" : "🌙 Modo Escuro"}
            </button>
          </div>
        </header>

        {/* AVISO SOBRE IA */}
        <div
          className={`p-3 text-sm text-center ${
            darkMode
              ? "bg-gray-700 text-gray-200"
              : "bg-blue-50 text-blue-900"
          }`}
        >
          💡 Este assistente usa inteligência artificial (Gemini)
          e pode ser alimentado por documentos personalizados.
        </div>

        {/* CHAT */}
        <div
          className={`flex-1 p-6 overflow-y-auto flex flex-col space-y-3 transition-colors duration-500 ${
            darkMode ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end space-x-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <img
                  src={botAvatar}
                  alt="Bot Avatar"
                  className="w-8 h-8 rounded-full border border-blue-400 animate-pulse"
                />
              )}
              <div
                className={`p-3 rounded-lg max-w-lg transition-all whitespace-pre-line ${
                  msg.sender === "bot"
                    ? darkMode
                      ? "bg-blue-900 text-blue-100"
                      : "bg-blue-100 text-blue-900"
                    : darkMode
                    ? "bg-gray-700 text-gray-100"
                    : "bg-white shadow text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <form
          onSubmit={handleSend}
          className={`p-4 flex border-t transition-colors duration-500 ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
          }`}
        >
          <input
            type="text"
            className={`flex-1 rounded-lg p-2 border focus:outline-none focus:ring-2 transition ${
              darkMode
                ? "bg-gray-700 text-gray-100 border-gray-600 focus:ring-blue-400"
                : "bg-white text-gray-800 border-gray-300 focus:ring-blue-400"
            }`}
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            type="submit"
            className={`ml-3 px-4 py-2 rounded-lg font-medium transition ${
              darkMode
                ? "bg-blue-700 hover:bg-blue-600 text-white"
                : "bg-blue-900 hover:bg-blue-800 text-white"
            }`}
          >
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
}
