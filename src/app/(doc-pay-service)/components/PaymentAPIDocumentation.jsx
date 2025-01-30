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
        <header className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
          <h1 className="text-3xl font-bold">Documentation de l'API de Paiement</h1>
          <p className="text-sm mt-1">
            Gérez les paiements via deux principales routes : demander un paiement et vérifier le statut du paiement.
          </p>
        </header>

        <div className="p-6">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
            <p className="text-gray-700 mt-2">
              Cette API permet de gérer les paiements de manière rapide, sécurisée et facile à intégrer dans vos applications.
            </p>
          </section>

          {/* Authentification */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Authentification</h2>
            <p className="text-gray-700 mt-2">
              Toutes les requêtes nécessitent une clé API (<code>api_key</code>) incluse dans l'URL. Assurez-vous de protéger
              votre clé API pour éviter tout usage non autorisé.
            </p>
          </section>

          {/* Routes */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Routes</h2>

            {/* Demander un paiement */}
            <section className="mb-10">
              <h3 className="text-xl font-bold text-gray-800">1. Demander un paiement</h3>
              <p className="text-gray-700 mt-2">
                Cette route permet de créer une nouvelle demande de paiement.
              </p>
              <p className="text-gray-700">
                <strong>Méthode :</strong> POST
              </p>
              <p className="text-gray-700">
                <strong>URL :</strong>{" "}
                <code>https://gateway.yowyob.com/payment-service/{`{api_key}`}/payin</code>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Headers requis :</strong>{" "}
                <code>Content-Type: application/json</code>
              </p>

              {/* Diagramme de séquence */}
              <div className="mt-6 ">
                <h4 className="text-lg font-semibold text-gray-800 ">Diagramme de Séquence</h4>
                <div className="mt-6 text-center flex flex-row justify-center">
                  <Image src="/img/yowyob_pay_seq.png" width={700} height={400} alt="Description de l'image" />
                </div>
              </div>

              {/* JSON et exemple */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* Objet JSON pour la requête */}
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <h4 className="text-lg font-semibold mb-2">Objet JSON</h4>
                  <pre className="p-4 rounded-lg overflow-x-auto text-sm bg-gray-50">
                    {JSON.stringify(requestData, null, 2)}
                  </pre>
                  <Copy
                    className="w-6 h-6 text-blue-600 cursor-pointer mt-2"
                    onClick={() => copyToClipboard(JSON.stringify(requestData, null, 2))}
                  />
                </div>

                {/* Exemple de réponse */}
                <div className="bg-gray-900 text-white p-4 rounded-lg shadow">
                  <h4 className="text-lg font-semibold mb-2">Exemple de réponse</h4>
                  <pre className="overflow-x-auto text-sm">
                    {JSON.stringify(exampleResponse, null, 2)}
                  </pre>
                  <Copy
                    className="w-6 h-6 text-gray-300 cursor-pointer mt-2"
                    onClick={() => copyToClipboard(JSON.stringify(exampleResponse, null, 2))}
                  />
                </div>
              </div>
            </section>

            {/* Vérifier le statut d'un paiement */}
            <section className="mb-10">
              <h3 className="text-xl font-bold text-gray-800">2. Vérifier le statut du paiement</h3>
              <p className="text-gray-700 mt-2">
                Cette route permet de vérifier le statut d'une transaction existante.
              </p>
              <p className="text-gray-700">
                <strong>Méthode :</strong> GET
              </p>
              <p className="text-gray-700">
                <strong>URL :</strong>{" "}
                <code>
                  https://gateway.yowyob.com/payment-service/{`{api_key}`}/transactions/{`{transaction_code}`}/status
                </code>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Headers requis :</strong>{" "}
                <code>Authorization: Bearer {`{api_key}`}</code>
              </p>


              {/* JSON et exemple */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* Objet JSON pour la requête */}
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <h4 className="text-lg font-semibold mb-2">Objet JSON</h4>
                  <pre className="p-4 rounded-lg overflow-x-auto text-sm bg-gray-50">
                    {JSON.stringify(requestDataStatus, null, 2)}
                  </pre>
                  <Copy
                    className="w-6 h-6 text-blue-600 cursor-pointer mt-2"
                    onClick={() => copyToClipboard(JSON.stringify(requestDataStatus, null, 2))}
                  />
                </div>

                {/* Exemple de réponse */}
                <div className="bg-gray-900 text-white p-4 rounded-lg shadow">
                  <h4 className="text-lg font-semibold mb-2">Exemple de réponse</h4>
                  <pre className="overflow-x-auto text-sm">
                    {JSON.stringify(exampleResponseStatus, null, 2)}
                  </pre>
                  <Copy
                    className="w-6 h-6 text-gray-300 cursor-pointer mt-2"
                    onClick={() => copyToClipboard(JSON.stringify(exampleResponseStatus, null, 2))}
                  />
                </div>
              </div>
            </section>
          </section>

          {/* Codes de statut HTTP */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Codes de statut HTTP</h2>
            <ul className="list-disc ml-6 text-gray-700">
              <li>200 : Requête traitée avec succès</li>
              <li>400 : Erreur dans les paramètres envoyés</li>
              <li>401 : Clé API invalide ou manquante</li>
              <li>404 : Transaction introuvable</li>
              <li>500 : Erreur interne du serveur</li>
            </ul>
          </section>

          {/* Support */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Support</h2>
            <p className="text-gray-700 mt-2">
              Pour toute assistance, contactez notre équipe technique à :{" "}
              <a
                href="mailto:support@example.com"
                className="text-blue-600 underline"
              >
                info@yowyob.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ApiDocumentation;