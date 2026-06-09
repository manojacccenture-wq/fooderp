const axios = require('axios');

async function test() {
  try {
    const loginPayload = new URLSearchParams();
    loginPayload.append('grant_type', 'password');
    loginPayload.append('username', 'ADMIN');
    loginPayload.append('password', 'ADMIN@257');

    const loginRes = await axios.post('http://localhost:2832/token', loginPayload, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const token = loginRes.data.access_token;

    const menuRes = await axios.get('http://localhost:2832/api/Franchisee/GetFranchiseeMenus', {
      headers: { 
        'Authorization': 'Bearer ' + token,
        // 'Tenant-Id': 'A0000001-0000-0000-0000-000000000001'
      }
    });

    console.log(JSON.stringify(menuRes.data).substring(0, 500));
  } catch (err) {
    console.error(err.message);
    if(err.response) console.error(err.response.data);
  }
}
test();

