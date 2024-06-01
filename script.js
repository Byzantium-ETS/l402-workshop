function xorStringToHex(input, key) {
    let result = '';
    for (let i = 0; i < input.length; i++) {
        result += (input.charCodeAt(i) ^ key).toString(16).padStart(2, '0');
    }
    return result;
}

document.getElementById('payButton').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8080/', {
            method: 'GET',
            headers: {
                'Authorization': '',
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });

        if (response.status === 402) {
            const authHeader = response.headers.get('www-authenticate');
            if (authHeader) {
                const macaroonMatch = authHeader.match(/macaroon="([^"]+)"/);
                const invoiceMatch = authHeader.match(/invoice="([^"]+)"/);

                if (macaroonMatch && invoiceMatch) {
                    const macaroon = macaroonMatch[1];
                    const invoice = invoiceMatch[1];
                    const decodedInvoice = atob(invoice);
                    const invoiceJSON = JSON.parse(decodedInvoice);
                    const rawInvoice = invoiceJSON.raw_invoice;

                    const decodedMacaroon = atob(macaroon);
                    const macaroonJSON = JSON.parse(decodedMacaroon);
                    const userId = macaroonJSON.user_id || 'anonymous';

                    document.getElementById('userIdDisplay').textContent = userId;
                    document.getElementById('invoiceDisplay').textContent = rawInvoice;
                    document.getElementById('macaroonDisplay').textContent = JSON.stringify(macaroonJSON, null, 2);
                } else {
                    alert('Macaroon or invoice not found in the response');
                }
            } else {
                alert('No WWW-Authenticate header found in the response');
            }
        } else {
            alert('Unexpected response');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('accessButton').addEventListener('click', async () => {
    try {
        const macaroonDisplay = document.getElementById('macaroonDisplay').textContent;
        const invoiceDisplay = document.getElementById('invoiceDisplay').textContent;
        
        if (!macaroonDisplay || !invoiceDisplay) {
            alert('No macaroon or preimage available. Please pay first.');
            return;
        }

        const preimage = xorStringToHex(atob(invoiceDisplay), 255);
        const token = `${btoa(macaroonDisplay)}:${preimage}`;
        const response = await fetch('http://localhost:8080/', {
            method: 'GET',
            headers: {
                'Authorization': `L402 ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });

        if (response.ok) {
            alert('Access to the service succeeded!');
            window.location.href = response.url;
        } else {
            alert('Access denied');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
