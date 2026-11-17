import {
  Moon, Sparkles, Layers, RefreshCw, Waves, Eye, Gauge, FlaskConical, SunMoon, Clock, Moon as Night,
  Sun, BookOpen, Heart, Brain, Users, Calendar, CalendarDays, NotebookPen, MoonStar,
  Sunrise, BedDouble, Thermometer, Lightbulb, Volume2, Smartphone, Plane,
  Zap, Hourglass, Activity, BatteryLow, Search, Split, ListChecks, Coffee, Target,
  CircleDot, Flower2, Wind, Trees, Scale, Dumbbell, Utensils, Candy, Wine, Droplet,
  Cloud, Footprints, Salad, Microscope, BookOpenText, Stethoscope, Monitor, Hospital,
  Shield, Leaf, ArrowUpRight, Flame,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  moon: Moon, sparkles: Sparkles, layers: Layers, refresh: RefreshCw, waves: Waves,
  eye: Eye, gauge: Gauge, flask: FlaskConical, 'sun-moon': SunMoon, clock: Clock,
  sun: Sun, book: BookOpen, heart: Heart, brain: Brain, users: Users,
  calendar: Calendar, 'calendar-days': CalendarDays, notebook: NotebookPen,
  'moon-star': MoonStar, night: Night, sunrise: Sunrise, bed: BedDouble,
  thermometer: Thermometer, lightbulb: Lightbulb, volume: Volume2,
  smartphone: Smartphone, plane: Plane, zap: Zap, hourglass: Hourglass,
  activity: Activity, 'battery-low': BatteryLow, search: Search, split: Split,
  'list-checks': ListChecks, coffee: Coffee, target: Target, 'circle-dot': CircleDot,
  flower: Flower2, wind: Wind, trees: Trees, scale: Scale, dumbbell: Dumbbell,
  utensils: Utensils, candy: Candy, wine: Wine, droplet: Droplet, cloud: Cloud,
  footprints: Footprints, salad: Salad, microscope: Microscope, 'book-open': BookOpenText,
  stethoscope: Stethoscope, monitor: Monitor, hospital: Hospital, shield: Shield,
  leaf: Leaf, flame: Flame, pill: FlaskConical,
};

export function TopicIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = (name && map[name]) || Sparkles;
  return <Icon className={className} strokeWidth={1.7} />;
}

export function ArrowUpRightIcon({ className }: { className?: string }) {
  return <ArrowUpRight className={className} strokeWidth={1.7} />;
}
