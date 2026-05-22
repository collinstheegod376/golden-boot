
async function testDex() {
  const mint = "GcDk4k8kcmv9sq5YSFgGT7wwKvgsnAWM4uqEiA1csSzQ";
  try {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${mint}`);
    const data = await response.json();
    console.log("DexScreener Response:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Dex Error:", err);
  }
}
testDex();
