export interface ProductSummary {
  productName: string;
  category?: string;
  targetAudience: string;
  coreProblemSolved: string;
  keyBenefits: string[];
}

export interface IdeaSection {
  title: string;
  concept: string;
  uniqueAngle: string;
}

export interface HookSection {
  title: string;
  hookText: string;
  hookStyle: string;
  deliveryTip: string;
}

export interface PainPointSection {
  title: string;
  painPointText: string;
  emotionalTrigger: string;
}

export interface SolutionSection {
  title: string;
  solutionText: string;
  coreTransformation: string;
}

export interface CtaSection {
  title: string;
  ctaText: string;
  urgencyReason: string;
}

export interface ScriptTimelineItem {
  timeRange: string;
  section: string;
  visualCue: string;
  voiceover: string;
}

export interface FullAdScriptSection {
  title: string;
  durationSeconds: number;
  formattedScript: string;
  timelineBreakdown: ScriptTimelineItem[];
}

export interface CaptionSection {
  title: string;
  captionText: string;
  hashtags: string[];
  recommendedPlatform?: string;
}

export interface ImageAdCopySection {
  title: string;
  headline: string;
  subHeadline: string;
  wordCount: number;
  badgeText: string;
  visualSuggestion?: string;
}

export interface AdConceptData {
  languageDetected: 'bn' | 'en' | string;
  productSummary: ProductSummary;
  section1_idea: IdeaSection;
  section2_hook: HookSection;
  section3_painPoint: PainPointSection;
  section4_solution: SolutionSection;
  section5_cta: CtaSection;
  section6_fullAdScript: FullAdScriptSection;
  section7_caption: CaptionSection;
  section8_imageAdCopy: ImageAdCopySection;
}

export interface SavedAdItem {
  id: string;
  timestamp: number;
  data: AdConceptData;
  sourceInput: string;
  angleStyle: string;
  fileName?: string;
}

export type AngleStyleOption = 
  | 'curiosity' 
  | 'transformation' 
  | 'contrarian' 
  | 'story' 
  | 'pain-agitate' 
  | 'direct-offer';

export type ToneOption = 
  | 'natural' 
  | 'energetic' 
  | 'authoritative' 
  | 'emotional' 
  | 'humorous' 
  | 'urgent';
