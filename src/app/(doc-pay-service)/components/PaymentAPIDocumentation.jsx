import React from "react";
import { Copy } from "lucide-react";
import Image from "next/image";

const ApiDocumentation = () => {
  const requestData = {
    transaction_amount: 0,
    transaction_currency: "XAF",
    transaction_method: "MOBILE",
    transaction_reference: "string",
    payer_reference: "string",
    payer_name: "string",
    payer_phone_number: "string",
    payer_lang: "string",
    payer_email: "string",
    service_reference: "string",
    service_name: "string",
    service_description: "string",
    service_quantity: 0,
  };

  const exampleResponse = {
    status: "SUCCESS",
    message: "Paiement demandé avec succès.",
    data: {
      message: "Paiement enregistré.",
      status_code: 0,
      transaction_code: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      transaction_status: "CREATED",
    },
    errors: null,
    ok: true,
  };

  const requestDataStatus = {
    transaction_code: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Exemple d'UUID
  };

  const exampleResponseStatus = {
    status: "SUCCESS",
    message: "Statut récupéré avec succès.",
    data: {
      transaction_ref: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      payee_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      payee_name: "string",
      transaction_amount: 1000,
      transaction_fees: 50,
      transaction_currency: "XAF",
      payer_reference: "payer123",
      payer_name: "Jean Dupont",
      payer_email: "jean.dupont@example.com",
      payer_phone: "+237612345678",
      transaction_method: "MOBILE",
      app_transaction_reference: "ref123",
      status: "COMPLETED",
    },
    errors: null,
    ok: true,
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Contenu copié dans le presse-papiers !");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
    <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg">
      
      {/* Header */}
      <header className="bg-green-600 text-white px-6 py-4 rounded-t-lg">
        <h1 className="text-3xl font-bold">Documentation de l'API</h1>
        <p className="text-sm mt-1">Service de gestion des utilisateurs et des autorisations</p>
      </header>

      <div className="p-6">
        
        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
          <p className="text-gray-700 mt-2">
            Ce service permet de gérer les utilisateurs, les rôles et les permissions de manière centralisée. 
            Il assure une authentification robuste et une gestion dynamique des accès.
          </p>
        </section>

        {/* Objectifs */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Objectifs</h2>
          <ul className="list-disc ml-6 text-gray-700 mt-2">
            <li>Créer, gérer et supprimer des utilisateurs</li>
            <li>Assigner des rôles et gérer leurs permissions</li>
            <li>Offrir une API sécurisée pour la validation des accès</li>
            <li>S'intégrer facilement avec Keycloak ou d'autres IAM</li>
          </ul>
        </section>

        {/* Architecture du Système */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Architecture du Système</h2>
          <p className="text-gray-700 mt-2">
            L'application est basée sur une architecture **microservices**, communiquant via une API Gateway.
          </p>
          <div className="mt-6 text-center flex flex-row justify-center">
            <Image src="/img/architecture.png" width={700} height={400} alt="Architecture du système" />
          </div>
        </section>

        {/* Installation et Déploiement */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Installation et Déploiement</h2>
          <p className="text-gray-700 mt-2"><b>Prérequis :</b> Node.js, Docker, Keycloak</p>
          <pre className="bg-gray-200 p-4 rounded-md mt-2">
            {`git clone https://github.com/user-service.git
cd user-service
npm install
npm run dev`}
          </pre>
        </section>

        {/* API Endpoints */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Endpoints de l'API</h2>

          {/* Authentification */}
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">🔐 Authentification</h3>
            <p className="text-gray-700">Permet aux utilisateurs de se connecter et d'obtenir un token JWT.</p>
            <pre className="bg-gray-200 p-4 rounded-md mt-2">
              {`POST /auth/login
{
"email": "user@example.com",
"password": "password123"
}`}
            </pre>
          </div>

          {/* Gestion des utilisateurs */}
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">👤 Gestion des utilisateurs</h3>
            <p className="text-gray-700">Créer et gérer des utilisateurs.</p>
            <pre className="bg-gray-200 p-4 rounded-md mt-2">
              {`GET /users/{id}
{
"id": 1,
"name": "John Doe",
"email": "john@example.com",
"role": "admin"
}`}
            </pre>
          </div>
        </section>

        {/* Sécurité et Authentification */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Sécurité et Authentification</h2>
          <p className="text-gray-700 mt-2">
            Ce service utilise **JWT (JSON Web Tokens)** et s'intègre avec Keycloak pour la gestion des identités.
          </p>
        </section>

        {/* Tests et Monitoring */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Tests et Monitoring</h2>
          <ul className="list-disc ml-6 text-gray-700 mt-2">
            <li>Tests unitaires avec Jest</li>
            <li>CI/CD avec GitHub Actions</li>
            <li>Monitoring avec Prometheus et Grafana</li>
          </ul>
        </section>

        {/* Codes de statut HTTP */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Codes de statut HTTP</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>200 : Succès</li>
            <li>400 : Erreur de requête</li>
            <li>401 : Non autorisé</li>
            <li>403 : Accès interdit</li>
            <li>500 : Erreur serveur</li>
          </ul>
        </section>

        {/* Support */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Support</h2>
          <p className="text-gray-700 mt-2">
            Contactez notre équipe technique à :{" "}
            <a href="mailto:support@example.com" className="text-blue-600 underline">
              mandarahades@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  </div>
  );
};

export default ApiDocumentation;