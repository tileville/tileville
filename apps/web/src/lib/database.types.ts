export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      aztec_discord_server_collections: {
        Row: {
          collection_id: string
          created_at: string | null
          discord_server_id: string
          id: string
          role_id: string
        }
        Insert: {
          collection_id: string
          created_at?: string | null
          discord_server_id: string
          id?: string
          role_id: string
        }
        Update: {
          collection_id?: string
          created_at?: string | null
          discord_server_id?: string
          id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "aztec_discord_server_collections_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "aztec_nft_collections"
            referencedColumns: ["collection_id"]
          },
        ]
      }
      aztec_discord_verifications: {
        Row: {
          discord_user_id: string
          id: string
          verified_at: string
          wallet_address: string
        }
        Insert: {
          discord_user_id: string
          id?: string
          verified_at?: string
          wallet_address: string
        }
        Update: {
          discord_user_id?: string
          id?: string
          verified_at?: string
          wallet_address?: string
        }
        Relationships: []
      }
      aztec_nft_collections: {
        Row: {
          banner_url: string | null
          collection_id: string
          contract_address: string | null
          created_at: string | null
          creator_address: string
          description: string | null
          floor_price: number | null
          id: string
          image_url: string | null
          is_mint_public: boolean
          max_supply: number
          mint_limit_per_wallet: number | null
          mint_price: number
          mint_start_date: string | null
          name: string
          owner_count: number | null
          royalty_fee: number | null
          symbol: string
          total_volume: number | null
          trait_schema: Json | null
          updated_at: string | null
        }
        Insert: {
          banner_url?: string | null
          collection_id?: string
          contract_address?: string | null
          created_at?: string | null
          creator_address: string
          description?: string | null
          floor_price?: number | null
          id?: string
          image_url?: string | null
          is_mint_public?: boolean
          max_supply: number
          mint_limit_per_wallet?: number | null
          mint_price: number
          mint_start_date?: string | null
          name: string
          owner_count?: number | null
          royalty_fee?: number | null
          symbol: string
          total_volume?: number | null
          trait_schema?: Json | null
          updated_at?: string | null
        }
        Update: {
          banner_url?: string | null
          collection_id?: string
          contract_address?: string | null
          created_at?: string | null
          creator_address?: string
          description?: string | null
          floor_price?: number | null
          id?: string
          image_url?: string | null
          is_mint_public?: boolean
          max_supply?: number
          mint_limit_per_wallet?: number | null
          mint_price?: number
          mint_start_date?: string | null
          name?: string
          owner_count?: number | null
          royalty_fee?: number | null
          symbol?: string
          total_volume?: number | null
          trait_schema?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      aztec_nfts: {
        Row: {
          collection_id: string
          created_at: string | null
          current_price: number | null
          description: string | null
          id: string
          image_url: string
          is_listed: boolean | null
          last_sale_date: string | null
          last_sale_price: number | null
          mint_date: string | null
          name: string
          owner_address: string | null
          token_id: number | null
          token_uri: string | null
          traits: Json | null
          txn_hash: string | null
          updated_at: string | null
        }
        Insert: {
          collection_id: string
          created_at?: string | null
          current_price?: number | null
          description?: string | null
          id?: string
          image_url: string
          is_listed?: boolean | null
          last_sale_date?: string | null
          last_sale_price?: number | null
          mint_date?: string | null
          name: string
          owner_address?: string | null
          token_id?: number | null
          token_uri?: string | null
          traits?: Json | null
          txn_hash?: string | null
          updated_at?: string | null
        }
        Update: {
          collection_id?: string
          created_at?: string | null
          current_price?: number | null
          description?: string | null
          id?: string
          image_url?: string
          is_listed?: boolean | null
          last_sale_date?: string | null
          last_sale_price?: number | null
          mint_date?: string | null
          name?: string
          owner_address?: string | null
          token_id?: number | null
          token_uri?: string | null
          traits?: Json | null
          txn_hash?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "aztec_nfts_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "aztec_nft_collections"
            referencedColumns: ["collection_id"]
          },
        ]
      }
      fitrace_signup_emails: {
        Row: {
          created_at: string
          email: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      game_scores: {
        Row: {
          competition_key: string
          created_at: string
          game_id: number
          id: number
          score: number
          updated_at: string | null
          wallet_address: string
        }
        Insert: {
          competition_key: string
          created_at?: string
          game_id: number
          id?: number
          score: number
          updated_at?: string | null
          wallet_address: string
        }
        Update: {
          competition_key?: string
          created_at?: string
          game_id?: number
          id?: number
          score?: number
          updated_at?: string | null
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_scores_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: true
            referencedRelation: "transaction_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      global_config: {
        Row: {
          config_values: Json
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          config_values: Json
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          config_values?: Json
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      minapunks_nfts: {
        Row: {
          category: string
          created_at: string
          id: number
          img_url: string
          is_public_mint: boolean
          name: string
          nft_id: number | null
          owner_address: string | null
          price: number
          traits: Json | null
          txn_hash: string | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: number
          img_url: string
          is_public_mint?: boolean
          name: string
          nft_id?: number | null
          owner_address?: string | null
          price: number
          traits?: Json | null
          txn_hash?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: number
          img_url?: string
          is_public_mint?: boolean
          name?: string
          nft_id?: number | null
          owner_address?: string | null
          price?: number
          traits?: Json | null
          txn_hash?: string | null
        }
        Relationships: []
      }
      minaty_nfts: {
        Row: {
          category: Database["public"]["Enums"]["nft_category"]
          created_at: string
          description: string | null
          id: number
          img_url: string
          is_public_mint: boolean
          name: string
          nft_id: number | null
          owner_address: string | null
          price: number
          traits: Json | null
          txn_hash: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["nft_category"]
          created_at?: string
          description?: string | null
          id?: number
          img_url: string
          is_public_mint?: boolean
          name: string
          nft_id?: number | null
          owner_address?: string | null
          price: number
          traits?: Json | null
          txn_hash?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["nft_category"]
          created_at?: string
          description?: string | null
          id?: number
          img_url?: string
          is_public_mint?: boolean
          name?: string
          nft_id?: number | null
          owner_address?: string | null
          price?: number
          traits?: Json | null
          txn_hash?: string | null
        }
        Relationships: []
      }
      nonce_counters: {
        Row: {
          counter: number | null
          id: number
          last_updated: string | null
          wallet_address: string
        }
        Insert: {
          counter?: number | null
          id?: number
          last_updated?: string | null
          wallet_address: string
        }
        Update: {
          counter?: number | null
          id?: number
          last_updated?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      places: {
        Row: {
          address: string
          category: string
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          latitude: number
          longitude: number
          name: string
          place_id: string
        }
        Insert: {
          address: string
          category: string
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          latitude: number
          longitude: number
          name: string
          place_id: string
        }
        Update: {
          address?: string
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          latitude?: number
          longitude?: number
          name?: string
          place_id?: string
        }
        Relationships: []
      }
      player_profile: {
        Row: {
          avatar_url: string | null
          created_at: string
          discord_username: Json
          email_address: Json
          followers: string[]
          following: string[]
          fullname: string | null
          id: number
          telegram_username: Json
          total_rewards: number
          twitter_username: Json
          username: string
          wallet_address: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          discord_username?: Json
          email_address?: Json
          followers?: string[]
          following?: string[]
          fullname?: string | null
          id?: number
          telegram_username?: Json
          total_rewards?: number
          twitter_username?: Json
          username: string
          wallet_address: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          discord_username?: Json
          email_address?: Json
          followers?: string[]
          following?: string[]
          fullname?: string | null
          id?: number
          telegram_username?: Json
          total_rewards?: number
          twitter_username?: Json
          username?: string
          wallet_address?: string
        }
        Relationships: []
      }
      pvp_challenge_participants: {
        Row: {
          challenge_id: number
          created_at: string
          has_played: boolean
          id: number
          joined_at: string
          played_at: string | null
          score: number | null
          txn_hash: string | null
          txn_status: string | null
          wallet_address: string
        }
        Insert: {
          challenge_id: number
          created_at?: string
          has_played?: boolean
          id?: number
          joined_at?: string
          played_at?: string | null
          score?: number | null
          txn_hash?: string | null
          txn_status?: string | null
          wallet_address: string
        }
        Update: {
          challenge_id?: number
          created_at?: string
          has_played?: boolean
          id?: number
          joined_at?: string
          played_at?: string | null
          score?: number | null
          txn_hash?: string | null
          txn_status?: string | null
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "pvp_challenge_participants_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "pvp_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      pvp_challenges: {
        Row: {
          created_at: string
          created_by: string
          end_time: string
          entry_fee: number
          id: number
          invite_code: string
          is_public: boolean
          is_reward_sent: boolean
          is_speed_challenge: boolean
          max_participants: number
          name: string
          reward_txn_hash: string | null
          speed_duration: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          end_time: string
          entry_fee?: number
          id?: number
          invite_code: string
          is_public?: boolean
          is_reward_sent?: boolean
          is_speed_challenge?: boolean
          max_participants?: number
          name: string
          reward_txn_hash?: string | null
          speed_duration?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          end_time?: string
          entry_fee?: number
          id?: number
          invite_code?: string
          is_public?: boolean
          is_reward_sent?: boolean
          is_speed_challenge?: boolean
          max_participants?: number
          name?: string
          reward_txn_hash?: string | null
          speed_duration?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string | null
          downvotes: number | null
          id: string
          location_proof: string
          place_id: string
          rating: number
          review_text: string
          upvotes: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          downvotes?: number | null
          id?: string
          location_proof: string
          place_id: string
          rating: number
          review_text: string
          upvotes?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          downvotes?: number | null
          id?: string
          location_proof?: string
          place_id?: string
          rating?: number
          review_text?: string
          upvotes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["place_id"]
          },
        ]
      }
      signup_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      telegram_auth: {
        Row: {
          authenticated: boolean | null
          chat_id: string | null
          created_at: string
          id: number
          wallet_address: string | null
        }
        Insert: {
          authenticated?: boolean | null
          chat_id?: string | null
          created_at?: string
          id?: number
          wallet_address?: string | null
        }
        Update: {
          authenticated?: boolean | null
          chat_id?: string | null
          created_at?: string
          id?: number
          wallet_address?: string | null
        }
        Relationships: []
      }
      tileville_builder_nfts: {
        Row: {
          created_at: string
          img_url: string
          is_public_mint: boolean
          name: string
          nft_id: number
          owner_address: string | null
          price: number
          traits: Json | null
          txn_hash: string | null
        }
        Insert: {
          created_at?: string
          img_url: string
          is_public_mint?: boolean
          name: string
          nft_id?: number
          owner_address?: string | null
          price: number
          traits?: Json | null
          txn_hash?: string | null
        }
        Update: {
          created_at?: string
          img_url?: string
          is_public_mint?: boolean
          name?: string
          nft_id?: number
          owner_address?: string | null
          price?: number
          traits?: Json | null
          txn_hash?: string | null
        }
        Relationships: []
      }
      tileville_competitions: {
        Row: {
          competition_tweet_content: string
          created_at: string
          currency_symbol: string
          description: string
          end_date: string
          funds: number
          id: number
          is_speed_version: boolean
          name: string
          participation_fee: number | null
          poster_url: string | null
          priority: number
          prizes: Json | null
          score_tweet_content: string
          seed: number
          speed_duration: number
          start_date: string
          treasury_address: string | null
          unique_keyname: string
        }
        Insert: {
          competition_tweet_content?: string
          created_at?: string
          currency_symbol?: string
          description: string
          end_date: string
          funds?: number
          id?: number
          is_speed_version?: boolean
          name: string
          participation_fee?: number | null
          poster_url?: string | null
          priority?: number
          prizes?: Json | null
          score_tweet_content?: string
          seed?: number
          speed_duration?: number
          start_date: string
          treasury_address?: string | null
          unique_keyname: string
        }
        Update: {
          competition_tweet_content?: string
          created_at?: string
          currency_symbol?: string
          description?: string
          end_date?: string
          funds?: number
          id?: number
          is_speed_version?: boolean
          name?: string
          participation_fee?: number | null
          poster_url?: string | null
          priority?: number
          prizes?: Json | null
          score_tweet_content?: string
          seed?: number
          speed_duration?: number
          start_date?: string
          treasury_address?: string | null
          unique_keyname?: string
        }
        Relationships: []
      }
      transaction_logs: {
        Row: {
          competition_key: string
          created_at: string
          id: number
          is_game_played: boolean
          network: string
          txn_hash: string
          txn_status: string
          wallet_address: string
        }
        Insert: {
          competition_key: string
          created_at?: string
          id?: number
          is_game_played?: boolean
          network?: string
          txn_hash: string
          txn_status?: string
          wallet_address: string
        }
        Update: {
          competition_key?: string
          created_at?: string
          id?: number
          is_game_played?: boolean
          network?: string
          txn_hash?: string
          txn_status?: string
          wallet_address?: string
        }
        Relationships: []
      }
      umbra_signup_emails: {
        Row: {
          created_at: string
          email: string | null
          id: number
          message: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
        }
        Relationships: []
      }
      voucher_codes: {
        Row: {
          code: string
          competition_id: number | null
          created_at: string
          expiry_date: string | null
          id: number
          is_redeemed: boolean
          redeemed_at: string | null
          redeemed_by: string | null
        }
        Insert: {
          code: string
          competition_id?: number | null
          created_at?: string
          expiry_date?: string | null
          id?: number
          is_redeemed?: boolean
          redeemed_at?: string | null
          redeemed_by?: string | null
        }
        Update: {
          code?: string
          competition_id?: number | null
          created_at?: string
          expiry_date?: string | null
          id?: number
          is_redeemed?: boolean
          redeemed_at?: string | null
          redeemed_by?: string | null
        }
        Relationships: []
      }
      zeko_nfts: {
        Row: {
          created_at: string
          id: number
          img_url: string
          is_minted: boolean
          is_public_mint: boolean
          name: string
          nft_id: number | null
          owner_address: string | null
          price: number
          traits: Json | null
          txn_hash: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          img_url: string
          is_minted?: boolean
          is_public_mint?: boolean
          name: string
          nft_id?: number | null
          owner_address?: string | null
          price: number
          traits?: Json | null
          txn_hash?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          img_url?: string
          is_minted?: boolean
          is_public_mint?: boolean
          name?: string
          nft_id?: number | null
          owner_address?: string | null
          price?: number
          traits?: Json | null
          txn_hash?: string | null
        }
        Relationships: []
      }
      zkgod_nfts: {
        Row: {
          created_at: string
          id: number
          img_url: string
          is_public_mint: boolean
          name: string
          nft_id: number | null
          owner_address: string | null
          price: number
          traits: Json | null
          txn_hash: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          img_url: string
          is_public_mint?: boolean
          name: string
          nft_id?: number | null
          owner_address?: string | null
          price: number
          traits?: Json | null
          txn_hash?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          img_url?: string
          is_public_mint?: boolean
          name?: string
          nft_id?: number | null
          owner_address?: string | null
          price?: number
          traits?: Json | null
          txn_hash?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_nonce_counter: {
        Args: { wallet_addr: string }
        Returns: number
      }
    }
    Enums: {
      nft_category:
        | "FOUNDER"
        | "DESIGNER"
        | "SOLDIER"
        | "GUARDIAN"
        | "TOTEM"
        | "YOUR_NEW_CATEGORY"
        | "ZKON"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      nft_category: [
        "FOUNDER",
        "DESIGNER",
        "SOLDIER",
        "GUARDIAN",
        "TOTEM",
        "YOUR_NEW_CATEGORY",
        "ZKON",
      ],
    },
  },
} as const
