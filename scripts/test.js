import { check, group } from 'k6';
import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export const options = {
    vus: 10,
    duration: '30s',
    thresholds: {
        checks: ['rate > 0.95'] 
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
       "index.html": htmlReport(data),
    };
}