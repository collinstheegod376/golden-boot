
async function testME() {
  const mint = "GcDk4k8kcmv9sq5YSFgGT7wwKvgsnAWM4uqEiA1csSzQ";
  try {
    const response = await fetch(`https://api-mainnet.magiceden.dev/v2/tokens/${mint}`);
    const data = await response.json();
    console.log("ME Response:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("ME Error:", err);
  }
}
testME();
