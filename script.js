document.addEventListener('DOMContentLoaded', () => {
    // 1. Interactive API Playground Logic
    const endpoints = {
      summarize: {
        latency: '12ms',
        request: `{
    "model": "synapse-turbo-4",
    "input": "Analyze Q3 cloud infrastructure latency metrics.",
    "max_tokens": 128
  }`,
        response: `{
    "id": "req_98a7f6c2",
    "status": "completed",
    "summary": "Global edge latency dropped by 34% across 40 regions.",
    "tokens_used": 42
  }`
      },
      embed: {
        latency: '9ms',
        request: `{
    "model": "synapse-embed-v3",
    "text": "High-throughput vector database indexing",
    "dimensions": 1536
  }`,
        response: `{
    "id": "emb_441b90e1",
    "dimensions": 1536,
    "vector_preview": [0.0184, -0.0421, 0.0912, "..."],
    "index_status": "ready"
  }`
      },
      vision: {
        latency: '18ms',
        request: `{
    "model": "synapse-vision-pro",
    "image_url": "https://synapse.ai",
    "detect": ["defects", "components"]
  }`,
        response: `{
    "id": "vis_772c19d4",
    "objects_detected": 14,
    "anomalies_found": 0,
    "confidence_score": 0.994
  }`
      }
    };
  
    let activeEndpoint = 'summarize';
    const epButtons = document.querySelectorAll('.ep-btn');
    const reqPreview = document.getElementById('requestPreview');
    const resOutput = document.getElementById('responseOutput');
    const statusBadge = document.getElementById('statusBadge');
  
    epButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        epButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
  
        activeEndpoint = btn.dataset.ep;
        reqPreview.textContent = endpoints[activeEndpoint].request;
        resOutput.textContent = '// Click "Run Request" to test endpoint...';
      });
    });
  
    document.getElementById('runApiBtn').addEventListener('click', () => {
      resOutput.textContent = '// Executing edge request...';
      setTimeout(() => {
        const data = endpoints[activeEndpoint];
        statusBadge.textContent = `200 OK • ${data.latency}`;
        resOutput.textContent = data.response;
      }, 250);
    });
  
    // 2. Monthly / Annual Pricing Switcher
    const billingSwitch = document.getElementById('billingSwitch');
    const priceValues = document.querySelectorAll('.price-val');
  
    billingSwitch.addEventListener('change', () => {
      const isAnnual = billingSwitch.checked;
      priceValues.forEach((el) => {
        el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
      });
    });
  
    // 3. Book Demo Modal
    const demoModal = document.getElementById('demoModal');
    const openDemo = () => demoModal.classList.add('open');
    const closeDemo = () => demoModal.classList.remove('open');
  
    document.getElementById('openDemoBtn').addEventListener('click', openDemo);
    document.getElementById('enterpriseBtn').addEventListener('click', openDemo);
    document.getElementById('closeDemoBtn').addEventListener('click', closeDemo);
  
    document.getElementById('demoForm').addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Demo request confirmed! Our engineering team will reach out shortly.');
      closeDemo();
    });
  });
  