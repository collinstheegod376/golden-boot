
async function testPortal() {
  const mint = "GcDk4k8kcmv9sq5YSFgGT7wwKvgsnAWM4uqEiA1csSzQ";
  try {
    const response = await fetch(`https://pumpportal.fun/api/data/token-info?mint=${mint}`);
    const data = await response.json();
    console.log("Portal Response:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Portal Error:", err);
  }
}
testPortal();
