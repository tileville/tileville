export function GET() {
  const data = {
    name: "MinaPolis",
    description: "An on-chain city development arcade game",
  };
  return Response.json(data);
}
