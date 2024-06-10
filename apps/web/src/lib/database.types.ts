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
      leaderboard: {
        Row: {
          competition_id: number
          created_at: string
          game_id: number
          id: number
          score: number
          wallet_address: string
        }
        Insert: {
          competition_id: number
          created_at?: string
          game_id: number
          id?: number
          score: number
          wallet_address: string
        }
        Update: {
          competition_id?: number
          created_at?: string
          game_id?: number
          id?: number
          score?: number
          wallet_address?: string
        }
        Relationships: []
      }
      player_profile: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          fullname: string | null
          id: number
          username: string
          wallet_address: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          fullname?: string | null
          id?: number
          username: string
          wallet_address: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
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
          created_at: string
          description: string
          end_date: string
          funds: number
          id: number
          name: string
          participation_fee: number | null
          poster_url: string | null
          seed: number
          start_date: string
          unique_keyname: string
        }
        Insert: {
          created_at?: string
          description: string
          end_date: string
          funds?: number
          id?: number
          name: string
          participation_fee?: number | null
          poster_url?: string | null
          seed?: number
          start_date?: string
          unique_keyname: string
        }
        Update: {
          created_at?: string
          description?: string
          end_date?: string
          funds?: number
          id?: number
          name?: string
          participation_fee?: number | null
          poster_url?: string | null
          seed?: number
          start_date?: string
          unique_keyname?: string
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
