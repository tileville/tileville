export async function getSignClient(){
  const { default: Client } = await import('mina-signer')
  const  client = new Client({ network: "mainnet" });
  return client
}



export async function signMessagePayment(privateKey: string, message: string){
  let signedResult
  try {
      const signClient = await getSignClient()
      signedResult = signClient.signMessage(message, privateKey)
  } catch (error) {
      signedResult = { error: { message} }
  }
  return signedResult
}




export async function verifyMessage(publicKey: string,signature: {field: string, scalar: string},verifyMessage: string) { 
  let verifyResult
  try {
      const nextSignature = typeof signature === "string" ? JSON.parse(signature):signature
      const signClient = await getSignClient()
      const verifyBody = {
          data:verifyMessage,
          publicKey:publicKey,
          signature:nextSignature
      }
      verifyResult = signClient.verifyMessage(verifyBody)
  } catch (error) {
      verifyResult = { message: "verification failed"} 
  }
  return verifyResult
}