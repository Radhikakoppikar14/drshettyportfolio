import {
  Heart, HeartPulse, Sparkles, Armchair, ClipboardList, Stethoscope, Sun, ShieldCheck, MessageCircle, UserRound, Activity, Gauge,
  Check, ArrowRight, ArrowUpRight, Phone, MapPin, Mail, Clock, Menu, X, Instagram, Facebook, Smile, Calendar, CalendarCheck, ChevronDown,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  Heart, HeartPulse, Sparkles, Armchair, ClipboardList, Stethoscope, Sun, ShieldCheck, MessageCircle, UserRound, Activity, Gauge,
  Check, ArrowRight, ArrowUpRight, Phone, MapPin, Mail, Clock, Menu, X, Instagram, Facebook, Smile, Calendar, CalendarCheck, ChevronDown,
};

export default function Icon({ name, className = 'w-5 h-5', stroke = 1.6 }: { name: string; className?: string; stroke?: number }) {
  const C = map[name] ?? Check;
  return <C className={className} strokeWidth={stroke} aria-hidden={true} />;
}
