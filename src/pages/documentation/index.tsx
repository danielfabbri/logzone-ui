import MainLayout from "../../components/layout/MainLayout";
import CTASection from "../../components/home/CTASection";

export default function Documentation() {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900">📚 Logzone SDK Documentation</h1>

        {/* Intro */}
        <p className="text-lg text-gray-700">
          The <strong>Logzone SDK</strong> allows you to send structured logs
          from your Node.js projects to the Leadzone platform. Log errors, warnings, info messages, and include additional context.
        </p>

        {/* Installation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">💾 Installation</h2>
          <p className="text-gray-700">Install the SDK from npm:</p>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-gray-900">npm install logzone-sdk</code>
          </pre>
          <p className="text-gray-700">Or clone it from GitHub:</p>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-gray-900">git clone https://github.com/danielfabbri/logzone-sdk</code>
          </pre>
        </section>

        {/* Usage */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">🚀 Usage</h2>
          <p className="text-gray-700">Import and initialize the SDK:</p>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-gray-900">
{`// CommonJS
const LogZoneSDK = require('logzone-sdk');
const sdk = new LogZoneSDK();

// ESM
import LogZoneSDK from 'logzone-sdk';
const sdk = new LogZoneSDK();`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-800">Creating a log</h3>
          <p className="text-gray-700">Use the <code className="bg-gray-200 px-1 rounded">createLog</code> method:</p>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-gray-900">
{`async function main() {
  try {
    await sdk.createLog({
      apiKey: 'YOUR_API_TOKEN',   // required
      project: 'YOUR_PROJECT_ID', // required
      level: 'error',             // required
      message: 'Failed to authenticate user', // required
      context: {                  // optional
        route: '/login',
        userId: 123
      }
    });
    console.log('Log successfully sent!');
  } catch (err) {
    console.error('Error sending log:', err.message);
  }
}

main();`}
            </code>
          </pre>
        </section>

        {/* Parameters */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">📚 Parameters</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700 font-medium">Field</th>
                  <th className="px-4 py-2 text-left text-gray-700 font-medium">Type</th>
                  <th className="px-4 py-2 text-left text-gray-700 font-medium">Required</th>
                  <th className="px-4 py-2 text-left text-gray-700 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2">apiKey</td>
                  <td className="px-4 py-2">string</td>
                  <td className="px-4 py-2">✅</td>
                  <td className="px-4 py-2">Your Leadzone API token</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">project</td>
                  <td className="px-4 py-2">string</td>
                  <td className="px-4 py-2">✅</td>
                  <td className="px-4 py-2">Target project ID</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">level</td>
                  <td className="px-4 py-2">string</td>
                  <td className="px-4 py-2">✅</td>
                  <td className="px-4 py-2">Log level: 'info', 'warn', 'error', etc.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">message</td>
                  <td className="px-4 py-2">string</td>
                  <td className="px-4 py-2">✅</td>
                  <td className="px-4 py-2">Main log message</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">context</td>
                  <td className="px-4 py-2">object|string</td>
                  <td className="px-4 py-2">❌</td>
                  <td className="px-4 py-2">Optional additional data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">📌 Tips</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Always wrap <code className="bg-gray-200 px-1 rounded">createLog</code> in try/catch to handle errors.</li>
            <li>You can generate multiple API tokens from your Logzone UI project page.</li>
            <li>Use async/await or promise chaining to handle logs asynchronously.</li>
          </ul>
        </section>
      </div>

      <CTASection />
    </MainLayout>
  );
}
