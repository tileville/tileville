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
                    <p>Prize pools are distributed among top performers.</p>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
