const GlossaryItem = ({ term, definition }: { term: string; definition: string }) => (
  <div className="mb-6">
    <h3 className="text-lg font-bold text-primary mb-1">{term}</h3>
    <p className="text-sm">{definition}</p>
  </div>
);

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-[1200px] p-6 pt-20">
      <h1 className="text-3xl font-extrabold text-primary mb-2">TileVille Glossary</h1>
      <p className="text-lg mb-12">A comprehensive guide to terms used in the TileVille ecosystem</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        <div className="col-span-1">
          <h2 className="text-2xl font-bold text-primary mb-6">Game Mechanics</h2>
          
          <GlossaryItem 
            term="Builder"
            definition="A character NFT with unique abilities and traits that influences city development and gameplay. Each Builder has specific attributes that affect various aspects of city building."
          />
          
          <GlossaryItem 
            term="Sustainability Rating"
            definition="A metric measuring how environmentally friendly your city is. Higher ratings lead to increased citizen happiness and reduced resource consumption."
          />
          
          <GlossaryItem 
            term="Resource Flow"
            definition="The net gain or loss of critical resources (water, energy, food, materials) over time. Positive flow indicates surplus, while negative flow means consumption exceeds production."
          />
          
          <GlossaryItem 
            term="Efficiency Level"
            definition="A percentage-based attribute for Builders that determines how quickly they can complete construction and other tasks. Higher efficiency levels result in faster city development."
          />
          
          <GlossaryItem 
            term="Environmental Affinity"
            definition="A Builder's natural harmony with specific environmental elements, providing bonuses when working with matching terrain types or resources."
          />
          
          <GlossaryItem 
            term="Urban Planning Expertise"
            definition="A Builder's specialized knowledge area that provides bonuses to specific types of buildings or city development strategies."
          />
          
          <GlossaryItem 
            term="Special Ability"
            definition="A unique talent possessed by each Builder that provides distinctive advantages or gameplay mechanics not available to other Builders."
          />
          
          <GlossaryItem 
            term="Zone"
            definition="A designated area of your city dedicated to a specific purpose, such as residential, commercial, industrial, or recreational use."
          />
          
          <GlossaryItem 
            term="Infrastructure Network"
            definition="The interconnected system of roads, pipes, power lines, and other utilities that enables city functionality and growth."
          />
          
          <GlossaryItem 
            term="Citizen Happiness"
            definition="A measure of how satisfied the population is with their city. Affected by factors such as services, amenities, pollution, and employment opportunities."
          />
        </div>
        
        <div className="col-span-1">
          <h2 className="text-2xl font-bold text-primary mb-6">Economy & NFTs</h2>
          
          <GlossaryItem 
            term="MINA"
            definition="The primary cryptocurrency used in the TileVille ecosystem for transactions, participation fees, and competition rewards."
          />
          
          <GlossaryItem 
            term="Mint"
            definition="The process of creating a new NFT by recording it on the blockchain, making it a unique digital asset with verifiable ownership."
          />
          
          <GlossaryItem 
            term="TileVille Builder NFT"
            definition="A non-fungible token representing a unique Builder character with specific attributes and abilities that provides gameplay advantages."
          />
          
          <GlossaryItem 
            term="Collection"
            definition="A themed group of NFTs sharing similar characteristics, traits, or origin. Different collections offer various aesthetics and gameplay benefits."
          />
          
          <GlossaryItem 
            term="Rarity"
            definition="The relative scarcity of an NFT or its attributes, typically categorized as Bronze, Silver, Gold, Platinum, or Diamond, with rarer items offering greater benefits."
          />
          
          <GlossaryItem 
            term="Trait"
            definition="A specific characteristic or attribute of an NFT that affects its appearance, functionality, or value. Builders have multiple traits that influence gameplay."
          />
          
          <h2 className="text-2xl font-bold text-primary mb-6 mt-10">Competitions</h2>
          
          <GlossaryItem 
            term="PVP Challenge"
            definition="Player versus player competitions where individuals compete directly against each other with defined parameters and victory conditions."
          />
          
          <GlossaryItem 
            term="Speed Challenge"
            definition="Time-limited competitions where players must build cities or complete objectives as quickly as possible within a set timeframe."
          />
          
          <GlossaryItem 
            term="Entry Fee"
            definition="The amount of MINA required to participate in a competition, forming part of the prize pool distributed to winners."
          />
          
          <GlossaryItem 
            term="Competition Key"
            definition="A unique identifier for each competition that tracks participation, scores, and results in the TileVille system."
          />
          
          <GlossaryItem 
            term="Leaderboard"
            definition="A real-time ranking system showing participant standings based on their performance in competitions or specific game metrics."
          />
        </div>
      </div>
      
      <div className="bg-primary/20 p-8 rounded-lg mt-12">
        <h2 className="text-2xl font-bold text-primary mb-4">Technical Terms</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          <div className="col-span-1">
            <GlossaryItem 
              term="Blockchain"
              definition="A distributed digital ledger that records transactions across many computers, ensuring data security, transparency, and immutability."
            />
            
            <GlossaryItem 
              term="Smart Contract"
              definition="Self-executing contracts with terms directly written into code that automatically enforce and execute agreements when predetermined conditions are met."
            />
            
            <GlossaryItem 
              term="Wallet"
              definition="A digital tool that allows users to store, manage, and transfer their cryptocurrency and NFT assets securely."
            />
          </div>
          
          <div className="col-span-1">
            <GlossaryItem 
              term="Auro Wallet"
              definition="The recommended wallet for TileVille, specifically designed for the MINA blockchain and optimized for NFT management."
            />
            
            <GlossaryItem 
              term="Transaction Hash"
              definition="A unique identifier assigned to every blockchain transaction, allowing users to track and verify their actions on the network."
            />
            
            <GlossaryItem 
              term="Gas Fee"
              definition="The cost required to perform a transaction or execute a contract on the blockchain, paid to network validators."
            />
          </div>
        </div>
      </div>
    </div>
  );
}