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
      minaty_nfts: {
        Row: {
          category: Database["public"]["Enums"]["nft_category"] | null
          created_at: string
          id: number
          img_url: string | null
          name: string | null
          nft_id: number | null
          owner_address: string | null
          price: number | null
          traits: Json | null
          txn_hash: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["nft_category"] | null
          created_at?: string
          id?: number
          img_url?: string | null
          name?: string | null
          nft_id?: number | null
          owner_address?: string | null
          price?: number | null
          traits?: Json | null
          txn_hash?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["nft_category"] | null
          created_at?: string
          id?: number
          img_url?: string | null
          name?: string | null
          nft_id?: number | null
          owner_address?: string | null
          price?: number | null
          traits?: Json | null
          txn_hash?: string | null
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
          txn_status: string
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
          txn_status?: string
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
          txn_status?: string
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
          is_speed_challenge: boolean
          max_participants: number
          name: string
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
          is_speed_challenge?: boolean
          max_participants?: number
          name: string
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
          is_speed_challenge?: boolean
          max_participants?: number
          name?: string
          speed_duration?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pvp_transaction_logs: {
        Row: {
          amount: number
          challenge_id: number
          created_at: string
          id: number
          is_game_played: boolean
          network: string
          txn_hash: string
          txn_status: string
          updated_at: string
          wallet_address: string
        }
        Insert: {
          amount: number
          challenge_id: number
          created_at?: string
          id?: number
          is_game_played?: boolean
          network?: string
          txn_hash: string
          txn_status?: string
          updated_at?: string
          wallet_address: string
        }
        Update: {
          amount?: number
          challenge_id?: number
          created_at?: string
          id?: number
          is_game_played?: boolean
          network?: string
          txn_hash?: string
          txn_status?: string
          updated_at?: string
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "pvp_transaction_logs_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "pvp_challenges"
            referencedColumns: ["id"]
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
          authenticated: boolean
          chat_id: string | null
          created_at: string
          id: number
          wallet_address: string | null
        }
        Insert: {
          authenticated?: boolean
          chat_id?: string | null
          created_at?: string
          id?: number
          wallet_address?: string | null
        }
        Update: {
          authenticated?: boolean
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      nft_category: "FOUNDER" | "DESIGNER" | "SOLDIER" | "GUARDIAN" | "TOTEM"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
