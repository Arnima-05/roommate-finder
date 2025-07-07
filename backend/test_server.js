const fetch = require('node-fetch');

async function testServer() {
  try {
    console.log('Testing server endpoints...');
    
    // Test if server is running
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'test', email: 'test@test.com', password: 'test' })
    });
    
    console.log('Server response status:', response.status);
    const data = await response.text();
    console.log('Server response:', data);
    
  } catch (error) {
    console.error('Error testing server:', error.message);
  }
}

testServer(); 