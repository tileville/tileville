"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Tabs } from "@radix-ui/themes";

export default function GameGuidePage() {
  const [activeTab, setActiveTab] = useState("basics");

  return (
    <div className="p-4 pb-20 pt-16 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-primary md:text-5xl">
            TileVille Game Guide
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-700">
            Learn how to play TileVille, master strategies, and become a
            champion builder in our definitive guide.
          </p>
        </div>

        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <Tabs.List className="mb-8 flex flex-wrap justify-center gap-2">
            <Tabs.Trigger value="basics" className="px-4 py-2">
              Game Basics
            </Tabs.Trigger>
            <Tabs.Trigger value="rules" className="px-4 py-2">
              Rules & Mechanics
            </Tabs.Trigger>
            <Tabs.Trigger value="strategies" className="px-4 py-2">
              Strategies
            </Tabs.Trigger>
            <Tabs.Trigger value="pvp" className="px-4 py-2">
              PVP Challenges
            </Tabs.Trigger>
            <Tabs.Trigger value="competitions" className="px-4 py-2">
              Competitions
            </Tabs.Trigger>
            <Tabs.Trigger value="rewards" className="px-4 py-2">
              Rewards & NFTs
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="basics">
            <div className="mb-8 rounded-xl bg-primary/10 p-6">
              <h2 className="mb-4 text-2xl font-bold text-primary">
                Game Basics
              </h2>

              <div className="mb-8 grid items-center gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    What is TileVille?
                  </h3>
                  <p className="mb-4">
                    TileVille is a strategic tile-placement game where you build
                    roads, neighborhoods, and landscapes to create the Mina
                    blockchain, adding competitive gameplay, rewards, and
                    digital ownership.
                  </p>
                  <p>
                    tiles to place on the board. Your goal is to create
                    connected areas and optimize your city layout for maximum
                    points.
                  </p>
                </div>
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary/20 to-primary/10">
                    <div className="text-center">
                      <div className="mb-2 text-4xl font-bold">TileVille</div>
                      <div className="text-lg">Strategic City Building</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="mb-3 text-xl font-semibold">Getting Started</h3>
                <ol className="list-decimal space-y-3 pl-5">
                  <li>
                    <span className="font-medium">Connect your wallet:</span>{" "}
                    Use Auro wallet to connect to the TileVille platform.
                  </li>
                  <li>
                    <span className="font-medium">Create a profile:</span> Set
                    up your username and profile information to track your
                    progress.
                  </li>
                  <li>
                    <span className="font-medium">Start with a demo game:</span>{" "}
                    Practice with our free demo version to learn the mechanics.
                  </li>
                  <li>
                    <span className="font-medium">Join competitions:</span>{" "}
                    Enter competitions with entry fees to compete for prize
                    pools.
                  </li>
                  <li>
                    <span className="font-medium">Create PVP challenges:</span>{" "}
                    Challenge friends or other players directly.
                  </li>
                </ol>
              </div>

              <div className="rounded-lg bg-white/70 p-6">
                <h3 className="mb-3 text-xl font-semibold">Game Controls</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-medium">Desktop Controls:</h4>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">Mouse:</span> Click to
                        place tiles
                      </li>
                      <li>
                        <span className="font-medium">Space Bar:</span> Rotate
                        the current tile
                      </li>
                      <li>
                        <span className="font-medium">R Key:</span> Reset the
                        board (practice mode only)
                      </li>
                      <li>
                        <span className="font-medium">Escape:</span> Access
                        menu/pause
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">Mobile Controls:</h4>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">Tap:</span> Place the
                        current tile
                      </li>
                      <li>
                        <span className="font-medium">Swipe:</span> Pan around
                        the board
                      </li>
                      <li>
                        <span className="font-medium">Rotation Button:</span>{" "}
                        Rotate the current tile
                      </li>
                      <li>
                        <span className="font-medium">Menu Button:</span> Access
                        game options
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/competitions/demo-game"
                className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/80"
              >
                Try Demo Game Now
              </Link>
            </div>
          </Tabs.Content>

          <Tabs.Content value="rules">
            <div className="rounded-xl bg-primary/10 p-6">
              <h2 className="mb-4 text-2xl font-bold text-primary">
                Rules & Mechanics
              </h2>

              <div className="mb-8">
                <h3 className="mb-3 text-xl font-semibold">Basic Rules</h3>
                <ul className="space-y-3">
                  <li>
                    <span className="font-medium">Tile Placement:</span> Each
                    turn, you must place the current tile on an empty space on
                    the board.
                  </li>
                  <li>
                    <span className="font-medium">Valid Placement:</span> Tiles
                    must be placed adjacent to at least one existing tile
                    (except for the first tile).
                  </li>
                  <li>
                    <span className="font-medium">Rotation:</span> You can
                    rotate a tile before placing it to find the optimal
                    position.
                  </li>
                  <li>
                    <span className="font-medium">Game End:</span> The game ends
                    when all tiles have been placed or when no valid moves
                    remain.
                  </li>
                </ul>
              </div>

              <div className="mb-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">Tile Types</h3>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-white/60 p-3">
                      <h4 className="font-medium">Road Tiles</h4>
                      <p>
                        Connect roads to form networks. Longer networks score
                        more points!
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/60 p-3">
                      <h4 className="font-medium">Residential Areas</h4>
                      <p>
                        Houses and buildings score based on size and
                        connections.
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/60 p-3">
                      <h4 className="font-medium">Commercial Zones</h4>
                      <p>
                        Shops and businesses score more when near residential
                        areas.
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/60 p-3">
                      <h4 className="font-medium">Natural Features</h4>
                      <p>
                        Parks, lakes, and trees provide bonuses to adjacent
                        tiles.
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/60 p-3">
                      <h4 className="font-medium">Special Tiles</h4>
                      <p>
                        Monuments and landmarks provide unique scoring
                        opportunities.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Scoring System</h3>
                  <div className="rounded-lg bg-white/80 p-4">
                    <h4 className="mb-2 font-medium">
                      Points are awarded for:
                    </h4>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">Road Networks:</span> 1
                        point per connected road segment
                      </li>
                      <li>
                        <span className="font-medium">
                          Complete Neighborhoods:
                        </span>{" "}
                        5 points per closed residential area
                      </li>
                      <li>
                        <span className="font-medium">
                          Commercial Districts:
                        </span>{" "}
                        3 points per commercial tile adjacent to residential
                      </li>
                      <li>
                        <span className="font-medium">Parks & Nature:</span> 2
                        points per park tile, bonus for connected parks
                      </li>
                      <li>
                        <span className="font-medium">City Centers:</span> 10
                        points for fully surrounding a commercial center
                      </li>
                      <li>
                        <span className="font-medium">Matching Edges:</span> 1
                        point for each perfectly matched edge between tiles
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 rounded-lg bg-primary/20 p-4">
                    <h4 className="mb-2 font-medium">Bonus Points:</h4>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">Complete Board:</span> 20
                        bonus points for using all available tiles
                      </li>
                      <li>
                        <span className="font-medium">Perfect Placement:</span>{" "}
                        10 bonus points if all tile edges match correctly
                      </li>
                      <li>
                        <span className="font-medium">Speed Bonus:</span> Up to
                        15 bonus points based on completion time (speed
                        challenges only)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white/70 p-6">
                <h3 className="mb-3 text-xl font-semibold">Game Variations</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-medium">Standard Game:</h4>
                    <p>
                      Place all tiles to create the highest-scoring city
                      possible. No time limit.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">Speed Challenge:</h4>
                    <p>
                      Complete your city within a limited time frame (typically
                      3 minutes).
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">Competition Mode:</h4>
                    <p>
                      Compete against other players with the same tile sequence.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">PVP Challenge:</h4>
                    <p>
                      Direct competition with entry fees and rewards for the
                      winner.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="strategies">
            <div className="rounded-xl bg-primary/10 p-6">
              <h2 className="mb-4 text-2xl font-bold text-primary">
                Winning Strategies
              </h2>

              <div className="mb-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    Beginner Strategies
                  </h3>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-white/60 p-4">
                      <h4 className="mb-2 font-medium">
                        Focus on Road Networks
                      </h4>
                      <p>
                        Build long, connected road networks for reliable points.
                        Try to create loops rather than dead ends.
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/60 p-4">
                      <h4 className="mb-2 font-medium">Group Similar Tiles</h4>
                      <p>
                        Keep residential areas together and place commercial
                        zones nearby to maximize scoring.
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/60 p-4">
                      <h4 className="mb-2 font-medium">
                        Plan Several Moves Ahead
                      </h4>
                      <p>
                        Look at your upcoming tiles and plan where each will go
                        for optimal placement.
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/60 p-4">
                      <p>
                        Try to avoid creating isolated spaces that will be
                        difficult to fill later.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    Advanced Techniques
                  </h3>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-white/60 p-4">
                      <h4 className="mb-2 font-medium">
                        Edge Matching Mastery
                      </h4>
                      <p>
                        Prioritize perfect edge matches - they add up quickly
                        and can make a significant difference to your score.
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/60 p-4">
                      <h4 className="mb-2 font-medium">Strategic Sacrifice</h4>
                      <p>
                        Sometimes Worth sacrificing a smaller score now to set
                        up a much larger scoring opportunity later.
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/60 p-4">
                      <h4 className="mb-2 font-medium">Board Management</h4>
                      <p>
                        Keep the perimeter of your city flexible with multiple
                        placement options for difficult tiles.
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/60 p-4">
                      <h4 className="mb-2 font-medium">
                        Special Tile Optimization
                      </h4>
                      <p>
                        Save spaces for special landmark tiles that can provide
                        massive scoring bonuses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 rounded-lg bg-white/70 p-6">
                <h3 className="mb-3 text-xl font-semibold">
                  Pro Tips & Tricks
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <h4 className="mb-2 font-medium">First Move Matters</h4>
                    <p>
                      Place your first tile centrally to give yourself the most
                      options for future expansion.
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3">
                    <h4 className="mb-2 font-medium">Border Management</h4>
                    <p>
                      Create a consistent border pattern to make edge matching
                      easier as you expand.
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3">
                    <h4 className="mb-2 font-medium">Speed vs. Optimization</h4>
                    <p>
                      In speed challenges, focus on quick, good-enough
                      placements rather than perfect optimization.
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3">
                    <h4 className="mb-2 font-medium">Defensive Placement</h4>
                    <p>
                      In competitive modes, consider making moves that would
                      benefit you while limiting options for opponents.
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3">
                    <h4 className="mb-2 font-medium">Save Complex Tiles</h4>
                    <p>
                      When possible, place simpler tiles first and save complex
                      ones for when you have more context.
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3">
                    <h4 className="mb-2 font-medium">Balance is Key</h4>
                    <p>
                      Dont focus too much on one scoring strategy - a balanced
                      approach typically yields higher total scores.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-primary bg-white/40 p-6">
                <h3 className="mb-3 text-xl font-semibold">
                  Common Mistakes to Avoid
                </h3>
                <ul className="space-y-2">
                  <li>
                    <span className="font-medium">Ignoring Edge Matching:</span>{" "}
                    This can cost you significant points over the course of a
                    game.
                  </li>
                  <li>
                    <span className="font-medium">
                      Creating Impossible Spaces:
                    </span>{" "}
                    Leaving small, oddly-shaped gaps that no tile can fill.
                  </li>
                  <li>
                    <span className="font-medium">Over-focusing on Roads:</span>{" "}
                    While important, roads alone wont win against balanced
                    strategies.
                  </li>
                  <li>
                    <span className="font-medium">Rushing Placement:</span> Take
                    time to consider all rotation options before committing.
                  </li>
                  <li>
                    <span className="font-medium">
                      Neglecting Special Tiles:
                    </span>{" "}
                    Landmarks and monuments can provide massive scoring bonuses
                    if placed optimally.
                  </li>
                </ul>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="pvp">
            <div className="rounded-xl bg-primary/10 p-6">
              <h2 className="mb-4 text-2xl font-bold text-primary">
                PVP Challenges
              </h2>

              <div className="mb-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">How PVP Works</h3>
                  <p className="mb-4">
                    PVP (Player vs Player) challenges allow you to directly
                    compete against other TileVille players for MINA rewards.
                    Create or join challenges, place your entry fee, and the
                    highest-scoring player wins the pot!
                  </p>
                  <div className="rounded-lg bg-white/60 p-4">
                    <h4 className="mb-2 font-medium">Challenge Types:</h4>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">Standard Challenge:</span>{" "}
                        No time limit - focus on maximizing your score.
                      </li>
                      <li>
                        <span className="font-medium">Speed Challenge:</span>{" "}
                        Complete your city within a time limit (typically 180
                        seconds).
                      </li>
                      <li>
                        <span className="font-medium">Public Challenges:</span>{" "}
                        Open to all TileVille players.
                      </li>
                      <li>
                        <span className="font-medium">Private Challenges:</span>{" "}
                        Invite-only matches with friends or selected opponents.
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    Creating a Challenge
                  </h3>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-white/60 p-4">
                      <h4 className="mb-2 font-medium">
                        Steps to Create a Challenge:
                      </h4>
                      <ol className="list-decimal space-y-2 pl-5">
                        <li>Navigate to the PVP section in TileVille</li>
                        <li>Click Create Challenge button</li>
                        <li>
                          Set challenge parameters (name, entry fee, max
                          participants, end time)
                        </li>
                        <li>Toggle Speed Challenge option if desired</li>
                        <li>Choose public or private visibility</li>
                        <li>Pay the creation fee (1 MINA)</li>
                        <li>Share the challenge invite link with friends</li>
                      </ol>
                    </div>
                    <div className="rounded-lg bg-white/60 p-4">
                      <h4 className="mb-2 font-medium">Challenge Settings:</h4>
                      <ul className="space-y-2">
                        <li>
                          <span className="font-medium">Entry Fee:</span>{" "}
                          Minimum 1 MINA, can set higher
                        </li>
                        <li>
                          <span className="font-medium">Max Participants:</span>{" "}
                          2-10 players
                        </li>
                        <li>
                          <span className="font-medium">End Time:</span> 1 hour
                          to 72 hours
                        </li>
                        <li>
                          <span className="font-medium">Prize Pool:</span> Total
                          entry fees minus 1 MINA platform fee
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="mb-3 text-xl font-semibold">
                  Joining and Playing Challenges
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-white/70 p-4">
                    <h4 className="mb-2 font-medium">Joining a Challenge:</h4>
                    <ol className="list-decimal space-y-2 pl-5">
                      <li>Browse available challenges in the PVP section</li>
                      <li>Click on a challenge to view details</li>
                      <li>Click Join Now and pay the entry fee</li>
                      <li>Wait for transaction confirmation</li>
                      <li>Once confirmed, you can play immediately</li>
                    </ol>
                  </div>
                  <div className="rounded-lg bg-white/70 p-4">
                    <h4 className="mb-2 font-medium">Playing a Challenge:</h4>
                    <ol className="list-decimal space-y-2 pl-5">
                      <li>After joining, click Play to start your game</li>
                      <li>
                        Complete your city with the highest possible score
                      </li>
                      <li>
                        For speed challenges, complete within the time limit
                      </li>
                      <li>
                        Your final score is recorded and cannot be changed
                      </li>
                      <li>View the leaderboard to track challenge progress</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="mb-8 rounded-lg bg-primary/20 p-6">
                <h3 className="mb-3 text-xl font-semibold">
                  Winning & Rewards
                </h3>
                <div className="space-y-4">
                  <p>
                    When a challenge ends, the player with the highest score is
                    declared the winner and receives the prize pool (total entry
                    fees minus the 1 MINA platform fee).
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-white/60 p-4">
                      <h4 className="mb-2 font-medium">
                        Determining the Winner:
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          Challenge ends when time expires or all players have
                          completed
                        </li>
                        <li>Player with the highest total score wins</li>
                        <li>
                          In case of a tie, the player who completed first wins
                        </li>
                        <li>
                          Players who dont participate forfeit their entry fee
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-white/60 p-4">
                      <h4 className="mb-2 font-medium">Claiming Rewards:</h4>
                      <ul className="space-y-2">
                        <li>
                          Winner can claim rewards directly in the challenge
                          details
                        </li>
                        <li>
                          Rewards are sent automatically via smart contract
                        </li>
                        <li>
                          Transaction details are available in your profile
                        </li>
                        <li>Notification sent via Telegram (if connected)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-primary bg-white/40 p-4">
                <h3 className="mb-3 text-xl font-semibold">
                  PVP Strategy Tips
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h4 className="mb-2 font-medium">Creating Challenges</h4>
                    <ul className="space-y-1">
                      <li>
                        Set reasonable time limits for maximum participation
                      </li>
                      <li>Higher entry fees attract more serious players</li>
                      <li>
                        Share your challenge in the TileVille Telegram group
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">Joining Challenges</h4>
                    <ul className="space-y-1">
                      <li>Check how many players have already joined</li>
                      <li>
                        Look at end times to ensure you can play before
                        expiration
                      </li>
                      <li>Balance risk/reward when selecting entry fees</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">Playing to Win</h4>
                    <ul className="space-y-1">
                      <li>Take your time if theres no speed limit</li>
                      <li>
                        For speed challenges, focus on efficient placements
                      </li>
                      <li>
                        Dont rush to be first - score matters more than
                        completion time
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="competitions">
            <div className="rounded-xl bg-primary/10 p-6">
              <h2 className="mb-4 text-2xl font-bold text-primary">
                Competitions
              </h2>

              <div className="mb-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    Competition Overview
                  </h3>
                  <p className="mb-4">
                    TileVille competitions are platform-organized events with
                    larger prize pools and more participants than regular PVP
                    challenges. Competitions run for set periods and offer
                    opportunities to win significant MINA rewards.
                  </p>
                  <div className="rounded-lg bg-white/60 p-4">
                    <h4 className="mb-2 font-medium">Competition Types:</h4>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">
                          Standard Competitions:
                        </span>{" "}
                        Focus on highest overall score.
                      </li>
                      <li>
                        <span className="font-medium">Speed Competitions:</span>{" "}
                        Complete your city within a time limit for best score.
                      </li>
                      <li>
                        <span className="font-medium">Weekly Tournaments:</span>{" "}
                        Ongoing competitions with weekly resets and
                        leaderboards.
                      </li>
                      <li>
                        <span className="font-medium">Special Events:</span>{" "}
                        Limited-time competitions with unique rules and larger
                        prizes.
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    How to Participate
                  </h3>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-white/60 p-4">
                      <h4 className="mb-2 font-medium">
                        Joining a Competition:
                      </h4>
                      <ol className="list-decimal space-y-2 pl-5">
                        <li>
                          Browse active competitions in the Competitions tab
                        </li>
                        <li>Select a competition that interests you</li>
                        <li>Pay the required entry fee using your wallet</li>
                        <li>
                          Once the transaction is confirmed, you can play
                          immediately
                        </li>
                        <li>
                          Complete your game to record your score on the
                          leaderboard
                        </li>
                      </ol>
                    </div>
                    <div className="rounded-lg bg-white/60 p-4">
                      <h4 className="mb-2 font-medium">Participation Fees:</h4>
                      <p>
                        Competitions have varying entry fees based on the prize
                        pool. Fees typically range from 0.1 to 3 MINA, with
                        higher fees corresponding to larger prize pools.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 rounded-lg bg-white/70 p-6">
                <h3 className="mb-3 text-xl font-semibold">
                  Competition Structure & Rewards
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-medium">Competition Duration:</h4>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">Short Competitions:</span>{" "}
                        1-8 hours
                      </li>
                      <li>
                        <span className="font-medium">
                          Standard Competitions:
                        </span>{" "}
                        24-48 hours
                      </li>
                      <li>
                        <span className="font-medium">
                          Extended Competitions:
                        </span>{" "}
                        3-7 days
                      </li>
                      <li>
                        <span className="font-medium">Weekly Tournaments:</span>{" "}
                        Reset every Sunday
                      </li>
                    </ul>

                    <h4 className="mb-2 mt-4 font-medium">
                      Prize Distribution:
                    </h4>
                    <p>
                      Prize pools are distributed among top performers,
                      typically following this structure:
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li>
                        <span className="font-medium">1st Place:</span> 50% of
                        the prize pool
                      </li>
                      <li>
                        <span className="font-medium">2nd Place:</span> 25% of
                        the prize pool
                      </li>
                      <li>
                        <span className="font-medium">3rd Place:</span> 15% of
                        the prize pool
                      </li>
                      <li>
                        <span className="font-medium">4th-10th Place:</span>{" "}
                        Remaining 10% distributed equally
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium">Leaderboards:</h4>
                    <p className="mb-3">
                      Each competition has its own leaderboard showing all
                      participants scores. Leaderboards update in real-time as
                      players complete their games.
                    </p>
                    <p>Leaderboards display:</p>
                    <ul className="space-y-1">
                      <li>Player username/wallet address</li>
                      <li>Final score</li>
                      <li>Game ID</li>
                      <li>Completion time</li>
                      <li>Current ranking</li>
                    </ul>

                    <h4 className="mb-2 mt-4 font-medium">
                      Rewards Distribution:
                    </h4>
                    <p>
                      At the end of a competition, rewards are automatically
                      distributed to winners wallets. You can view your
                      competition history and rewards in your profile section.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6 rounded-lg bg-primary/20 p-6">
                <h3 className="mb-3 text-xl font-semibold">
                  Competition Strategies
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg bg-white/60 p-3">
                    <h4 className="mb-2 font-medium">Timing Your Entry</h4>
                    <p>
                      Consider when to participate in a competition. Early
                      entries give you more time to play, but later entries let
                      you see the scores to beat.
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/60 p-3">
                    <h4 className="mb-2 font-medium">Multiple Attempts</h4>
                    <p>
                      Some competitions allow multiple entries with separate
                      fees. This gives you additional chances to improve your
                      score.
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/60 p-3">
                    <h4 className="mb-2 font-medium">Risk Management</h4>
                    <p>
                      Balance entry fees against potential rewards and your
                      skill level. Start with lower-entry competitions to build
                      experience.
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/60 p-3">
                    <h4 className="mb-2 font-medium">Stay Informed</h4>
                    <p>
                      Follow TileVilles Telegram and X/Twitter for announcements
                      about upcoming competitions with special prizes.
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/60 p-3">
                    <h4 className="mb-2 font-medium">Watch Top Players</h4>
                    <p>
                      Study the strategies of consistent winners by checking
                      their profiles and past performance.
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/60 p-3">
                    <h4 className="mb-2 font-medium">Practice Makes Perfect</h4>
                    <p>
                      Use the demo game to refine your skills before
                      participating in high-stakes competitions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/competitions"
                  className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/80"
                >
                  Browse Active Competitions
                </Link>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="rewards">
            <div className="rounded-xl bg-primary/10 p-6">
              <h2 className="mb-4 text-2xl font-bold text-primary">
                Rewards & NFTs
              </h2>

              <div className="mb-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    MINA Token Rewards
                  </h3>
                  <p className="mb-4">
                    TileVille rewards skilled players with MINA tokens through
                    various game modes and competitions. These rewards are sent
                    directly to your connected wallet.
                  </p>
                  <div className="rounded-lg bg-white/60 p-4">
                    <h4 className="mb-2 font-medium">Reward Sources:</h4>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">PVP Challenges:</span> Win
                        against other players to claim their entry fees.
                      </li>
                      <li>
                        <span className="font-medium">
                          Platform Competitions:
                        </span>{" "}
                        Earn from the prize pool based on your leaderboard
                        ranking.
                      </li>
                      <li>
                        <span className="font-medium">Special Events:</span>{" "}
                        Participate in limited-time events with bonus rewards.
                      </li>
                      <li>
                        <span className="font-medium">Referral Program:</span>{" "}
                        Earn rewards when users you refer join competitions.
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">TileVille NFTs</h3>
                  <p className="mb-4">
                    TileVille offers unique NFTs that represent digital
                    ownership within the ecosystem. These NFTs are minted on the
                    Mina blockchain and can be collected, displayed, and traded.
                  </p>
                  <div className="rounded-lg bg-white/60 p-4">
                    <h4 className="mb-2 font-medium">NFT Collections:</h4>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">TileVille Builders:</span>{" "}
                        City-themed NFTs with gameplay utility.
                      </li>
                      <li>
                        <span className="font-medium">MINATY:</span> Creative
                        character-based NFTs.
                      </li>
                      <li>
                        <span className="font-medium">MinaPunks:</span>{" "}
                        Distinctive profile-picture style collectibles.
                      </li>
                      <li>
                        <span className="font-medium">ZKGod:</span> Premium NFTs
                        with special benefits.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="mb-3 text-xl font-semibold">
                  TileVille Builder NFTs
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-white/70 p-4">
                    <h4 className="mb-2 font-medium">Benefits & Utility:</h4>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">Game Bonuses:</span> Some
                        NFTs provide scoring advantages or special abilities
                        in-game.
                      </li>
                      <li>
                        <span className="font-medium">Exclusive Access:</span>{" "}
                        Holders get early access to new features and
                        competitions.
                      </li>
                      <li>
                        <span className="font-medium">Status Symbol:</span> Show
                        off your collection in your TileVille profile.
                      </li>
                      <li>
                        <span className="font-medium">Trading Value:</span> Sell
                        or trade your NFTs on platforms like MinaNFT.io.
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-white/70 p-4">
                    <h4 className="mb-2 font-medium">NFT Traits:</h4>
                    <p className="mb-3">
                      Each TileVille Builder NFT has unique traits that affect
                      both appearance and utility:
                    </p>
                    <ul className="space-y-1">
                      <li>
                        <span className="font-medium">Complexity:</span> Affects
                        score multipliers
                      </li>
                      <li>
                        <span className="font-medium">Style:</span> Visual theme
                        and architectural details
                      </li>
                      <li>
                        <span className="font-medium">Efficiency:</span>{" "}
                        Influences speed bonuses
                      </li>
                      <li>
                        <span className="font-medium">Rarity:</span> Determines
                        overall value and uniqueness
                      </li>
                      <li>
                        <span className="font-medium">Special Abilities:</span>{" "}
                        Unique gameplay advantages
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-8 rounded-lg bg-primary/20 p-6">
                <h3 className="mb-3 text-xl font-semibold">
                  How to Get TileVille NFTs
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-medium">
                      Primary Market (Minting):
                    </h4>
                    <ol className="list-decimal space-y-2 pl-5">
                      <li>Visit the Marketplace section in TileVille</li>
                      <li>Browse available NFT collections</li>
                      <li>Select an NFT you wish to mint</li>
                      <li>Connect your wallet and pay the minting fee</li>
                      <li>
                        Once the transaction confirms, the NFT will appear in
                        your collection
                      </li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">
                      Secondary Market (Trading):
                    </h4>
                    <ol className="list-decimal space-y-2 pl-5">
                      <li>Visit MinaNFT.io or other supported marketplaces</li>
                      <li>Search for TileVille NFTs listed for sale</li>
                      <li>Purchase NFTs directly from other players</li>
                      <li>The NFT will be transferred to your wallet</li>
                      <li>View your new NFTs in your TileVille profile</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="mb-6 rounded-lg border border-primary bg-white/40 p-6">
                <h3 className="mb-3 text-xl font-semibold">
                  Managing Your Digital Collection
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h4 className="mb-2 font-medium">Viewing Your NFTs</h4>
                    <p>
                      Access your Digital Collection tab in your profile to see
                      all NFTs owned by your wallet. You can view details,
                      traits, and transaction history for each NFT.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">Transferring NFTs</h4>
                    <p>
                      You can transfer your NFTs to other wallets through
                      MinaNFT.io or directly through TileVille. This is useful
                      for gifting or moving to a different wallet.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">Selling NFTs</h4>
                    <p>
                      List your NFTs for sale on supported marketplaces by
                      setting your desired price. When sold, youll receive MINA
                      tokens directly to your wallet.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/marketplace"
                  className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/80"
                >
                  Explore NFT Marketplace
                </Link>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>

        <div className="mt-12 rounded-xl bg-primary/10 p-6">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Additional Resources
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white/60 p-4">
              <h3 className="mb-3 text-xl font-semibold">Community</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://t.me/tilevillegame"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.375 16.5h-2.25v-9h2.25v9zm-.75-10.125c-.621 0-1.125-.504-1.125-1.125s.504-1.125 1.125-1.125 1.125.504 1.125 1.125-.504 1.125-1.125 1.125z" />
                    </svg>
                    Join Telegram Group
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/tilevillegame"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14.001 0-.21-.005-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                    </svg>
                    Follow on X/Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="/bug-report"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M14.601 21.5c0 1.38-1.116 2.5-2.499 2.5-1.378 0-2.499-1.12-2.499-2.5s1.121-2.5 2.499-2.5c1.383 0 2.499 1.12 2.499 2.5zm-2.42-21.5c-4.029 0-7.06 2.693-7.06 8h3.955c0-2.304.906-4.189 3.024-4.189 1.247 0 2.57.828 2.684 2.411.123 1.666-.767 2.511-1.892 3.582-2.924 2.78-2.816 4.049-2.816 7.196h3.943c0-1.452-.157-2.508 1.838-4.659 1.331-1.436 2.986-3.222 3.021-5.943.047-3.963-2.751-6.398-6.697-6.398z" />
                    </svg>
                    Report a Bug
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-white/60 p-4">
              <h3 className="mb-3 text-xl font-semibold">Learn More</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/faq"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.66c-1.033 0-1.87-.841-1.87-1.87s.837-1.87 1.87-1.87 1.87.841 1.87 1.87-.837 1.87-1.87 1.87zm1.405-6.95c-.388.676-.678 1.25-.678 1.725 0 .388-.318.69-.705.69-.388 0-.705-.311-.705-.69 0-.92.466-1.74.969-2.586.245-.409.395-.775.395-1.14 0-1.1-.893-1.993-1.999-1.993s-1.999.893-1.999 1.993c0 .388-.317.689-.705.689-.389 0-.705-.301-.705-.689 0-1.859 1.517-3.372 3.409-3.372s3.409 1.513 3.409 3.372c0 .909-.327 1.539-.687 2.001z" />
                    </svg>
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/roadmap"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.707 3.293c.39.39.39 1.024 0 1.414L9.414 9H19c.552 0 1 .448 1 1s-.448 1-1 1H9.414l4.293 4.293c.39.39.39 1.024 0 1.414-.39.39-1.024.39-1.414 0l-6-6c-.39-.39-.39-1.024 0-1.414l6-6c.39-.39 1.024-.39 1.414 0z" />
                    </svg>
                    Game Roadmap
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/tileville/tileville-game"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub Repository
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-white/60 p-4">
              <h3 className="mb-3 text-xl font-semibold">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/competitions/demo-game"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play Demo Game
                  </Link>
                </li>
                <li>
                  <Link
                    href="/competitions"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 14.63 21 12.55 21 10V9c0-1.1-.9-2-2-2zM7 10.82C5.84 10.4 5 9.3 5 8V7h2v3.82zM19 8c0 1.3-.84 2.4-2 2.82V7h2v1z" />
                    </svg>
                    Active Competitions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pvp"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 6.627 5.374 12 12 12 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm6.293 19.707-3.582-3.582c-1.407.653-2.957.891-4.711.891-6.316 0-9-3.807-9-8.182C1 4.669 5.077 1 12.305 1c5.688 0 10.695 3.162 10.695 8.842 0 4.509-2.233 7.158-5.252 7.438l3.545 3.545-3 3.118z" />
                    </svg>
                    PVP Challenges
                  </Link>
                </li>
                <li>
                  <Link
                    href="/marketplace"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 13H5v-2h14v2z" />
                      <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                    NFT Marketplace
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
