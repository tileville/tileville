export function GET() {
  const data = {
    name: "TileVille",
    description: "An on-chain city development arcade game",
  };
  return Response.json(data);
}
