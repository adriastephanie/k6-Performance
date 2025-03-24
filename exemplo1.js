import { check, group } from 'k6';
import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


// 1 usuario por 3 segundos
export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        checks: ['rate > 0.99'] 
    }
}

export default function() {
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/';

    const response = http.get(BASE_URL);

    check(response, {
        'status code 200 get all': (r) => r.status === 200
    });
}


export function handleSummary(data) {
    return {
      "teste_k6_exemplo1.html": htmlReport(data),
    };
}