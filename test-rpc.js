
async function testRpc() {
  const mint = "GcDk4k8kcmv9sq5YSFgGT7wwKvgsnAWM4uqEiA1csSzQ";
  try {
    const response = await fetch("https://solana-rpc.publicnode.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getAsset",
        params: { id: mint },
      }),
    });
    const data = await response.json();
    console.log("RPC Response:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("RPC Error:", err);
  }
}

testRpc();
