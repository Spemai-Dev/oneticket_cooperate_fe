"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  ReactNode,
} from "react";

/** ---- Types ---- */
export interface ApiTicket {
  id: number;
  ticket_name: string;
  ticket_amount: string;
  is_free_ticket: boolean;
  is_delete?: boolean;
  is_compulsory?: boolean;
  ticket_description?: string;
}

export interface Field {
  id: number;
  field_name: string;
  field_regex?: string;
  is_required?: boolean;
}

export interface EventMeta {
  id: number;
  name: string;
  dateTime: string;
  expireOn: string;
  venue: string;
  currency: string;
}

export interface SelectedTicket {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  isFree: boolean;
  subtotal: number;
  description?: string;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  idNumber: string;
}

export interface AdditionalDetails {
  [key: string]: string;
}

interface BookingContextType {
  eventMeta: EventMeta | null;
  setEventMeta: (meta: EventMeta) => void;

  dynamicFields: Field[];
  setDynamicFields: (fields: Field[]) => void;

  selectedTickets: SelectedTicket[];
  setSelectedTickets: (items: SelectedTicket[]) => void;
  setSelectedTicketsFromQuantities: (
    apiTickets: ApiTicket[],
    quantities: Record<number, number>
  ) => void;

  personalDetails: PersonalDetails | null;
  setPersonalDetails: (details: PersonalDetails) => void;

  additionalDetails: AdditionalDetails;
  setAdditionalDetails: (
    data: AdditionalDetails | ((prev: AdditionalDetails) => AdditionalDetails)
  ) => void;

  totalQuantity: number;
  grandTotal: number;

  resetCart: () => void;
  resetAll: () => void;
}

/** ---- Context ---- */
const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  /** SSR-safe states */
  const [eventMeta, setEventMetaState] = useState<EventMeta | null>(null);
  const [dynamicFields, setDynamicFields] = useState<Field[]>([]);
  const [selectedTickets, setSelectedTicketsState] = useState<SelectedTicket[]>([]);
  const [personalDetails, setPersonalDetailsState] = useState<PersonalDetails | null>(null);
  const [additionalDetails, setAdditionalDetailsState] = useState<AdditionalDetails>({});

  /** Load saved state from localStorage (client only) */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedEvent = localStorage.getItem("eventMeta");
    const savedTickets = localStorage.getItem("selectedTickets");
    const savedPersonal = localStorage.getItem("personalDetails");
    const savedAdditional = localStorage.getItem("additionalDetails");

    if (savedEvent) setEventMetaState(JSON.parse(savedEvent));
    if (savedTickets) setSelectedTicketsState(JSON.parse(savedTickets));
    if (savedPersonal) setPersonalDetailsState(JSON.parse(savedPersonal));
    if (savedAdditional) setAdditionalDetailsState(JSON.parse(savedAdditional));
  }, []);

  /** Unified localStorage saver */
  const saveToLocalStorage = (key: string, value: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  /** ---- Helpers ---- */
  const toNumber = (v: any, fallback = 0): number => {
    const n = typeof v === "number" ? v : parseFloat(String(v));
    return Number.isFinite(n) ? n : fallback;
  };

  const isTruthy = (v: any) => !!v;

  /** Build selected tickets from API tickets + quantities */
const setSelectedTicketsFromQuantities = (
  sourceTickets: ApiTicket[],
  quantities: Record<number, number>
) => {
  // Build selected tickets synchronously
  const items: SelectedTicket[] = sourceTickets
    .filter((t) => !t.is_delete) // skip deleted
    .map((t) => {
      const qty = t.is_compulsory ? Math.max(1, quantities[t.id] || 0) : Math.max(0, quantities[t.id] || 0);
      const isFree = !!t.is_free_ticket;
      const unitPrice = isFree ? 0 : parseFloat(t.ticket_amount || "0");

      return {
        id: t.id,
        name: t.ticket_name || `Ticket #${t.id}`,
        quantity: qty,
        unitPrice,
        isFree,
        subtotal: qty * unitPrice,
        description: t.ticket_description,
      };
    })
    .filter((t) => t.quantity > 0);

  // 🔹 Update state
  setSelectedTicketsState(items);

  // 🔹 Save **immediately** to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("selectedTickets", JSON.stringify(items));
  }
};

  /** Totals */
  const totalQuantity = useMemo(
    () => selectedTickets.reduce((sum, t) => sum + t.quantity, 0),
    [selectedTickets]
  );

  const grandTotal = useMemo(
    () => selectedTickets.reduce((sum, t) => sum + t.subtotal, 0),
    [selectedTickets]
  );

  /** ---- Setters with localStorage ---- */
  const setEventMeta = (meta: EventMeta) => {
    setEventMetaState(meta);
    saveToLocalStorage("eventMeta", meta);
  };

  const setSelectedTickets = (items: SelectedTicket[]) => {
    setSelectedTicketsState(items);
    saveToLocalStorage("selectedTickets", items);
  };

  const setPersonalDetails = (details: PersonalDetails) => {
    setPersonalDetailsState(details);
    saveToLocalStorage("personalDetails", details);
  };

  const setAdditionalDetails = (
    data: AdditionalDetails | ((prev: AdditionalDetails) => AdditionalDetails)
  ) => {
    setAdditionalDetailsState((prev) => {
      const updated = typeof data === "function" ? data(prev) : data;
      saveToLocalStorage("additionalDetails", updated);
      return updated;
    });
  };

  /** Reset helpers */
  const resetCart = () => {
    setSelectedTicketsState([]);
    saveToLocalStorage("selectedTickets", []);
  };

  const resetAll = () => {
    setEventMetaState(null);
    setDynamicFields([]);
    setSelectedTicketsState([]);
    setPersonalDetailsState(null);
    setAdditionalDetailsState({});
    if (typeof window !== "undefined") localStorage.clear();
  };

  /** Return context value */
  const value: BookingContextType = {
    eventMeta,
    setEventMeta,
    dynamicFields,
    setDynamicFields,
    selectedTickets,
    setSelectedTickets,
    setSelectedTicketsFromQuantities,
    personalDetails,
    setPersonalDetails,
    additionalDetails,
    setAdditionalDetails,
    totalQuantity,
    grandTotal,
    resetCart,
    resetAll,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

/** Hook */
export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within <BookingProvider />");
  return ctx;
}
