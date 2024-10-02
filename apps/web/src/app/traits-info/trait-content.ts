export type Trait = {
  title: string;
  description: string;
  items?: Array<{
    name: string;
    description: string;
  }>;
};

export const traitsContent: Trait[] = [
  {
    title: "Urban Planning Expertise",
    description:
      "This trait represents the Builder's primary area of focus in city development. Each specialization aligns with key aspects of TileVille's gameplay:",
    items: [
      {
        name: "Street Specialist",
        description:
          "Excels in designing efficient road networks, potentially improving connectivity and traffic flow.",
      },
      {
        name: "Green Space Designer",
        description:
          "Masterful in creating parks and green areas, possibly enhancing city aesthetics and resident happiness.",
      },
      {
        name: "Energy Grid Innovator",
        description:
          "Specializes in power infrastructure, potentially boosting energy production and distribution efficiency.",
      },
      {
        name: "Residential Developer",
        description:
          "Expert in housing and community planning, possibly increasing population growth and satisfaction.",
      },
      {
        name: "Agricultural Planner",
        description:
          "Skilled in optimizing farmland and food production, potentially improving resource management.",
      },
    ],
  },
  {
    title: "Environmental Affinity",
    description:
      "This trait indicates the Builder's harmony with specific environmental elements:",
    items: [
      {
        name: "Wind Whisperer",
        description:
          "Has a natural affinity for wind energy, offering potential bonuses with windmills.",
      },
      {
        name: "Tree Hugger",
        description:
          "Deeply connected to green spaces, possibly enhancing the effects of trees and parks.",
      },
      {
        name: "Water Guardian",
        description:
          "Attuned to water resources, potentially improving water-related infrastructure efficiency.",
      },
      {
        name: "Soil Cultivator",
        description:
          "Skilled in maximizing land fertility, offering possible bonuses to farms and agriculture.",
      },
      {
        name: "Eco-Balancer",
        description:
          "Versatile environmental expert, providing small bonuses across all environmental aspects.",
      },
    ],
  },
  {
    title: "Efficiency Level",
    description:
      "This trait represents the Builder's overall productivity and skill level:",
    items: [
      {
        name: "Novice",
        description: "Standard productivity level (100% efficiency).",
      },
      {
        name: "Proficient",
        description: "Slightly enhanced productivity (110% efficiency).",
      },
      {
        name: "Expert",
        description: "Significantly improved productivity (125% efficiency).",
      },
      {
        name: "Master",
        description: "Highly superior productivity (150% efficiency).",
      },
      {
        name: "Legendary",
        description:
          "Exceptional, game-changing productivity (200% efficiency).",
      },
    ],
  },
  {
    title: "Special Ability",
    description: "Each Builder possesses a unique talent that sets them apart:",
    items: [
      {
        name: "Rapid Transit",
        description:
          "Enables faster street connections, potentially speeding up city expansion.",
      },
      {
        name: "Green Thumb",
        description:
          "Accelerates tree and park growth, possibly enhancing city beautification.",
      },
      {
        name: "Power Surge",
        description:
          "Boosts windmill output, potentially increasing energy production.",
      },
      {
        name: "Aqua Boost",
        description:
          "Improves water resource management, possibly enhancing water-related infrastructure.",
      },
      {
        name: "Home Sweet Home",
        description:
          "Optimizes house placement, potentially increasing residential satisfaction and efficiency.",
      },
    ],
  },
  {
    title: "Sustainability Rating",
    description:
      "This trait reflects the Builder's commitment to eco-friendly development:",
    items: [
      {
        name: "Bronze",
        description: "Basic sustainability practices (1-2 star).",
      },
      {
        name: "Silver",
        description: "Good sustainability awareness (3 star).",
      },
      {
        name: "Gold",
        description: "High commitment to sustainable development (4 star).",
      },
      {
        name: "Platinum",
        description: "Exceptional focus on sustainability (5 star).",
      },
      {
        name: "Diamond",
        description:
          "Unparalleled mastery of sustainable city planning (6 star).",
      },
    ],
  },
];
