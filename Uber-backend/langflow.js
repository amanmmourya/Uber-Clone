// Replace **<YOUR_APPLICATION_TOKEN>** with your actual Application token
class LangflowClient {
    constructor(baseURL, applicationToken) {
        this.baseURL = baseURL;
        this.applicationToken = applicationToken;
    }

    async post(endpoint, body) {
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.applicationToken}`
                },
                body: JSON.stringify(body)
            });

            const jsonResponse = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(jsonResponse)}`);
            }
            return jsonResponse;
        } catch (error) {
            console.error('API Request Error:', error.message);
            throw error;
        }
    }

    async runFlow(flowId, langflowId, inputValue) {
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}`;
        return this.post(endpoint, { input_value: inputValue, input_type: 'chat', output_type: 'chat' });
    }
}

async function main() {
    const flowId = 'uber_project'; // Replace with your actual flow ID or name
    const langflowId = '3e740dbf-e02f-4a3f-a60d-aba398f21b08'; // Replace with your actual LangFlow ID
    const applicationToken = 'AstraCS:bjMoQZxJbtgwdShAhxRqrWdW:538c855d2c2d04b5684d22367e98e275f496d554d677c51f5906a665489fdb4f'; // Replace with your actual token
    const inputValue = "best places to visit in ahmedabad"; // Write your input message here
    const client = new LangflowClient('https://api.langflow.astra.datastax.com', applicationToken);

    try {
        const response = await client.runFlow(flowId, langflowId, inputValue);
        if (response && response.outputs) {
            const output = response.outputs[0].outputs[0].outputs.message.message.text;
            console.log("Output:", output);
        } else {
            console.log("No valid response received from API.");
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
