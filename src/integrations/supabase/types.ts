export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      market_listings: {
        Row: {
          brand: string | null
          category: string | null
          category_path: string | null
          check_count: number
          color: string | null
          condition: string | null
          days_active: number | null
          description: string | null
          extracted_model_confidence: number | null
          extracted_model_normalized: string | null
          extracted_model_raw: string | null
          extracted_model_status: string | null
          hype_score: number | null
          hype_tier: number
          id: number
          is_sold: boolean
          last_checked_at: string | null
          listing_price: number | null
          product_health: string
          scraped_at: string
          size: string | null
          sold_at: string | null
          source_hash: string
          source_url: string | null
          title: string | null
        }
        Insert: {
          brand?: string | null
          category?: string | null
          category_path?: string | null
          check_count?: number
          color?: string | null
          condition?: string | null
          days_active?: number | null
          description?: string | null
          extracted_model_confidence?: number | null
          extracted_model_normalized?: string | null
          extracted_model_raw?: string | null
          extracted_model_status?: string | null
          hype_score?: number | null
          hype_tier?: number
          id?: number
          is_sold?: boolean
          last_checked_at?: string | null
          listing_price?: number | null
          product_health?: string
          scraped_at: string
          size?: string | null
          sold_at?: string | null
          source_hash: string
          source_url?: string | null
          title?: string | null
        }
        Update: {
          brand?: string | null
          category?: string | null
          category_path?: string | null
          check_count?: number
          color?: string | null
          condition?: string | null
          days_active?: number | null
          description?: string | null
          extracted_model_confidence?: number | null
          extracted_model_normalized?: string | null
          extracted_model_raw?: string | null
          extracted_model_status?: string | null
          hype_score?: number | null
          hype_tier?: number
          id?: number
          is_sold?: boolean
          last_checked_at?: string | null
          listing_price?: number | null
          product_health?: string
          scraped_at?: string
          size?: string | null
          sold_at?: string | null
          source_hash?: string
          source_url?: string | null
          title?: string | null
        }
        Relationships: []
      }
      model_alias_table: {
        Row: {
          alias: string
          brand_hint: string
          canonical: string
          category_hint: string | null
          confidence: number
          created_at: string
          examples_json: string | null
          id: number
          review_status: string
          seen_count: number
          source: string
          updated_at: string
        }
        Insert: {
          alias: string
          brand_hint: string
          canonical: string
          category_hint?: string | null
          confidence: number
          created_at: string
          examples_json?: string | null
          id?: number
          review_status: string
          seen_count: number
          source: string
          updated_at: string
        }
        Update: {
          alias?: string
          brand_hint?: string
          canonical?: string
          category_hint?: string | null
          confidence?: number
          created_at?: string
          examples_json?: string | null
          id?: number
          review_status?: string
          seen_count?: number
          source?: string
          updated_at?: string
        }
        Relationships: []
      }
      price_oracle_models: {
        Row: {
          created_at: string
          id: number
          is_active: boolean | null
          mae_score: number | null
          model_path: string | null
          r2_score: number | null
          sample_count: number | null
          trained_at: string
          training_log: string | null
          version: string
        }
        Insert: {
          created_at: string
          id?: number
          is_active?: boolean | null
          mae_score?: number | null
          model_path?: string | null
          r2_score?: number | null
          sample_count?: number | null
          trained_at: string
          training_log?: string | null
          version: string
        }
        Update: {
          created_at?: string
          id?: number
          is_active?: boolean | null
          mae_score?: number | null
          model_path?: string | null
          r2_score?: number | null
          sample_count?: number | null
          trained_at?: string
          training_log?: string | null
          version?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          brand: string | null
          buy_price: number | null
          category: string | null
          color: string | null
          condition: string | null
          created_at: string | null
          id: number
          image_url: string | null
          is_deleted: boolean | null
          last_scanned_at: string | null
          listed_at: string | null
          listing_price: number | null
          raw_ocr_json: string | null
          size: string | null
          status: Database["public"]["Enums"]["productstatus"] | null
          title: string | null
          updated_at: string | null
          user_id: number
          vinted_id: string | null
          vinted_url: string | null
        }
        Insert: {
          brand?: string | null
          buy_price?: number | null
          category?: string | null
          color?: string | null
          condition?: string | null
          created_at?: string | null
          id?: number
          image_url?: string | null
          is_deleted?: boolean | null
          last_scanned_at?: string | null
          listed_at?: string | null
          listing_price?: number | null
          raw_ocr_json?: string | null
          size?: string | null
          status?: Database["public"]["Enums"]["productstatus"] | null
          title?: string | null
          updated_at?: string | null
          user_id: number
          vinted_id?: string | null
          vinted_url?: string | null
        }
        Update: {
          brand?: string | null
          buy_price?: number | null
          category?: string | null
          color?: string | null
          condition?: string | null
          created_at?: string | null
          id?: number
          image_url?: string | null
          is_deleted?: boolean | null
          last_scanned_at?: string | null
          listed_at?: string | null
          listing_price?: number | null
          raw_ocr_json?: string | null
          size?: string | null
          status?: Database["public"]["Enums"]["productstatus"] | null
          title?: string | null
          updated_at?: string | null
          user_id?: number
          vinted_id?: string | null
          vinted_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_events: {
        Row: {
          created_at: string | null
          id: number
          is_highlighted: boolean | null
          listing_price: number | null
          net_profit: number | null
          product_id: number
          promo_cost: number | null
          promo_discount: number | null
          promo_times: number | null
          promo_type: string | null
          published_at: string | null
          roi_pct: number | null
          sale_date: string | null
          sale_price: number
          velocity_days: number | null
          vinted_fee: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_highlighted?: boolean | null
          listing_price?: number | null
          net_profit?: number | null
          product_id: number
          promo_cost?: number | null
          promo_discount?: number | null
          promo_times?: number | null
          promo_type?: string | null
          published_at?: string | null
          roi_pct?: number | null
          sale_date?: string | null
          sale_price: number
          velocity_days?: number | null
          vinted_fee?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          is_highlighted?: boolean | null
          listing_price?: number | null
          net_profit?: number | null
          product_id?: number
          promo_cost?: number | null
          promo_discount?: number | null
          promo_times?: number | null
          promo_type?: string | null
          published_at?: string | null
          roi_pct?: number | null
          sale_date?: string | null
          sale_price?: number
          velocity_days?: number | null
          vinted_fee?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sale_events_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      shadowban_words: {
        Row: {
          category: string
          id: number
          is_active: boolean | null
          notes: string | null
          safe_alternatives: string | null
          severity: number
          updated_at: string
          word: string
        }
        Insert: {
          category: string
          id?: number
          is_active?: boolean | null
          notes?: string | null
          safe_alternatives?: string | null
          severity: number
          updated_at: string
          word: string
        }
        Update: {
          category?: string
          id?: number
          is_active?: boolean | null
          notes?: string | null
          safe_alternatives?: string | null
          severity?: number
          updated_at?: string
          word?: string
        }
        Relationships: []
      }
      sold_winners: {
        Row: {
          brand: string | null
          category: string | null
          condition: string | null
          days_active: number | null
          extracted_model_confidence: number | null
          extracted_model_normalized: string | null
          extracted_model_status: string | null
          hype_score: number | null
          hype_tier: number | null
          id: number
          listing_price: number | null
          scraped_at: string | null
          size: string | null
          snapshotted_at: string
          sold_at: string | null
          source_hash: string
          source_url: string | null
          title: string | null
          week_label: string | null
        }
        Insert: {
          brand?: string | null
          category?: string | null
          condition?: string | null
          days_active?: number | null
          extracted_model_confidence?: number | null
          extracted_model_normalized?: string | null
          extracted_model_status?: string | null
          hype_score?: number | null
          hype_tier?: number | null
          id?: number
          listing_price?: number | null
          scraped_at?: string | null
          size?: string | null
          snapshotted_at: string
          sold_at?: string | null
          source_hash: string
          source_url?: string | null
          title?: string | null
          week_label?: string | null
        }
        Update: {
          brand?: string | null
          category?: string | null
          condition?: string | null
          days_active?: number | null
          extracted_model_confidence?: number | null
          extracted_model_normalized?: string | null
          extracted_model_status?: string | null
          hype_score?: number | null
          hype_tier?: number | null
          id?: number
          listing_price?: number | null
          scraped_at?: string | null
          size?: string | null
          snapshotted_at?: string
          sold_at?: string | null
          source_hash?: string
          source_url?: string | null
          title?: string | null
          week_label?: string | null
        }
        Relationships: []
      }
      system_health: {
        Row: {
          created_at: string
          id: number
          level: string
          message: string
          metadata_json: string | null
          source: string
          stack_trace: string | null
        }
        Insert: {
          created_at: string
          id?: number
          level: string
          message: string
          metadata_json?: string | null
          source: string
          stack_trace?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          level?: string
          message?: string
          metadata_json?: string | null
          source?: string
          stack_trace?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          display_name: string | null
          email: string | null
          id: number
          is_active: boolean | null
          is_premium: boolean
          oracle_tokens: number
          password_hash: string
          premium_since: string | null
          role: Database["public"]["Enums"]["userrole"] | null
          telegram_id: number | null
          telegram_photo_url: string | null
          telegram_username: string | null
          username: string
          vinted_profile_url: string | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: number
          is_active?: boolean | null
          is_premium?: boolean
          oracle_tokens?: number
          password_hash: string
          premium_since?: string | null
          role?: Database["public"]["Enums"]["userrole"] | null
          telegram_id?: number | null
          telegram_photo_url?: string | null
          telegram_username?: string | null
          username: string
          vinted_profile_url?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: number
          is_active?: boolean | null
          is_premium?: boolean
          oracle_tokens?: number
          password_hash?: string
          premium_since?: string | null
          role?: Database["public"]["Enums"]["userrole"] | null
          telegram_id?: number | null
          telegram_photo_url?: string | null
          telegram_username?: string | null
          username?: string
          vinted_profile_url?: string | null
        }
        Relationships: []
      }
      watchdog_logs: {
        Row: {
          anomaly_detail: string | null
          id: number
          probed_at: string
          response_ms: number | null
          status: string
        }
        Insert: {
          anomaly_detail?: string | null
          id?: number
          probed_at: string
          response_ms?: number | null
          status: string
        }
        Update: {
          anomaly_detail?: string | null
          id?: number
          probed_at?: string
          response_ms?: number | null
          status?: string
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
      productstatus: "STOCK" | "SOLD"
      userrole: "ADMIN" | "USER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      productstatus: ["STOCK", "SOLD"],
      userrole: ["ADMIN", "USER"],
    },
  },
} as const
