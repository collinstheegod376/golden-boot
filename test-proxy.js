
async function testProxy() {
  const mint = "GcDk4k8kcmv9sq5YSFgGT7wwKvgsnAWM4uqEiA1csSzQ";
  const url = `https://corsproxy.io/?https://frontend-api.pump.fun/coins/${mint}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Proxy Response:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Proxy Error:", err);
  }
}
testProxy();
