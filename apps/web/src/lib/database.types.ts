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
      player_profile: {
        Row: {
          avatar_url: string | null
          created_at: string
          fullname: string | null
          id: number
          username: string
          wallet_address: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          fullname?: string | null
          id?: number
          username: string
          wallet_address: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          fullname?: string | null
          id?: number
          username?: string
          wallet_address?: string
        }
        Relationships: []
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
      [_ in never]: never
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
