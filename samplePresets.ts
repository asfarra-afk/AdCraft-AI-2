export interface SamplePreset {
  id: string;
  nameBn: string;
  nameEn: string;
  category: string;
  iconName: string;
  inputText: string;
  defaultAngle: string;
  defaultTone: string;
  suggestedLanguage: 'bn' | 'en';
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: "organic-honey",
    nameBn: "সুন্দরবনের খাঁটি মধু ও সুপারফুড",
    nameEn: "Pure Sundarbans Organic Honey",
    category: "Food & Health",
    iconName: "Flame",
    defaultAngle: "pain-agitate",
    defaultTone: "emotional",
    suggestedLanguage: "bn",
    inputText: `প্রোডাক্ট: সুন্দরবনের কাঁচা খাটি খলিশা ফুলের মধু (Raw Natural Forest Honey)
টার্গেট অডিয়েন্স: স্বাস্থ্য সচেতন পরিবার, শিশু ও বয়স্কদের বাবা-মা, যারা ভেজাল মধুতে বিরক্ত
মূল সমস্যা: বাজারে ৯৫% মধুই প্রসেসড, চিনি মেশানো বা কৃত্রিম সিরাপে ভরা। এতে পুষ্টি নেই, উল্টো ডায়াবেটিস ও পেটের ক্ষতি হয়।
সমাধান ও বেনিফিট: সরাসরি মৌয়ালদের থেকে সংগ্রহকৃত অপরিশোধিত র মধু। ল্যাব টেস্টে ১০০% নির্ভেজাল প্রমাণিত। রোগ প্রতিরোধ ক্ষমতা বাড়ায়, সর্দি-কাশি কমায় এবং প্রাকৃতিক এনার্জি দেয়।
অফার: ৩ দিনের বিশেষ অফারে ক্যাশ অন ডেলিভারি এবং টেস্ট করে নেওয়ার ১০০% মানিব্যাক গ্যারান্টি।`
  },
  {
    id: "ielts-course",
    nameBn: "আইইএলটিএস ও স্পোকেন কোর্স (Online)",
    nameEn: "IELTS 7.5 Band Online Masterclass",
    category: "Education & EdTech",
    iconName: "GraduationCap",
    defaultAngle: "transformation",
    defaultTone: "authoritative",
    suggestedLanguage: "bn",
    inputText: `সার্ভিস: আল্ট্রা-ইন্টেনসিভ লাইভ IELTS 7.5+ স্কোরিং বুটক্যাম্প
টার্গেট অডিয়েন্স: উচ্চশিক্ষার জন্য কানাডা/ইউকে/ইউরোপে যেতে ইচ্ছুক শিক্ষার্থী ও চাকুরীজীবী
মূল সমস্যা: বার বার পরীক্ষা দিয়েও ৬.০ ব্যান্ডের উপরে স্কোর উঠছে না। স্পিকিং ও রাইটিং-এ আইডিয়া নেই, নার্ভাস হয়ে আটকে যায়।
সমাধান ও বেনিফিট: ব্রিটিশ কাউন্সিল সার্টিফাইড ট্রেনারের ১-অন-১ ফিডব্যাক, ডেইলি স্পিকিং প্র্যাকটিস ক্লাব, এবং ১০০+ রিয়েল মক টেস্ট। প্রথম চেষ্টাতেই ৭.৫+ ব্যান্ডের গ্যারান্টিড ফর্মুলা।
কল টু অ্যাকশন: মাত্র ২০টি সিট বাকি। আজই ফ্রি অ্যাসেসমেন্ট টেস্ট দিয়ে শুরু করুন।`
  },
  {
    id: "saas-invoicing",
    nameBn: "ছোট ব্যবসার অটোমেটেড হিসাব সফটওয়্যার",
    nameEn: "SaaS Invoicing & Inventory App",
    category: "Software & SaaS",
    iconName: "Laptop",
    defaultAngle: "contrarian",
    defaultTone: "conversational",
    suggestedLanguage: "bn",
    inputText: `Product: EasyHishab - Cloud POS & Automated Invoicing App for SMEs
Target Audience: Shop owners, e-commerce brand founders, small retail traders
Main Problem: Spending 3-4 hours every night manually writing paper ledger books, losing track of customer credit (বাকি খাতা) and stock theft.
Solution & Benefits: Auto WhatsApp invoice generation, real-time stock alert on mobile phone, 1-click profit-loss ledger in Bengali, and automated SMS reminder for unpaid credit.
Offer: 14 Days Free Trial without credit card + Free store onboarding assistance.`
  },
  {
    id: "handloom-saree",
    nameBn: "ঐতিহ্যবাহী খাঁটি জামদানি ও তাঁতের শাড়ি",
    nameEn: "Artisan Handwoven Pure Jamdani",
    category: "Fashion & Lifestyle",
    iconName: "Sparkles",
    defaultAngle: "story",
    defaultTone: "natural",
    suggestedLanguage: "bn",
    inputText: `প্রোডাক্ট: রূপগঞ্জের আদি তাঁতিদের হাতে বোনা ১০০% সুতি ও রেশমি সুতার জামদানি শাড়ি
টার্গেট অডিয়েন্স: অভিজাত ফ্যাশনপ্রেমী নারী, বিয়ের উপহার বা বিশেষ অনুষ্ঠানে ঐতিহ্যবাহী লুক প্রত্যাশী গ্রাহক
মূল সমস্যা: অনলাইন মার্কেটে কম দামের পলিয়েস্টার মেশিনের নকল জামদানি আসল বলে বিক্রি হচ্ছে যা এক ওয়াশেই নষ্ট হয়।
সমাধান ও বেনিফিট: প্রতিটি শাড়ি তৈরি হতে সময় লাগে ৩-৪ সপ্তাহ। নিখুঁত মোটিফ, ১০০ কাউন্টের প্রিমিয়াম সুতা, কাপড়ে দারুণ কমফোর্ট ও আজীবন টেকসই ঐতিহ্যের ছোঁয়া।
অফার: ডেলিভারি ম্যানের সামনে দেখে ট্রায়াল দিয়ে রিসিভ করার সুবিধা। সারা দেশে ফ্রি হোম ডেলিভারি!`
  },
  {
    id: "smart-neck-massager",
    nameBn: "ওয়্যারলেস কর্ডলেস নেক ও ব্যাক ম্যাসাজার",
    nameEn: "Smart Cordless Neck & Back Massager",
    category: "Gadgets & Wellness",
    iconName: "Zap",
    defaultAngle: "curiosity",
    defaultTone: "energetic",
    suggestedLanguage: "bn",
    inputText: `প্রোডাক্ট: থার্মাল হিট থেরাপি সহ 4D স্মার্ট নেক ও শোল্ডার ম্যাসাজার
টার্গেট অডিয়েন্স: ৮-১০ ঘণ্টা ডেস্কে বসে কাজ করা ফ্রিল্যান্সার, কর্পোরেট এক্সিকিউটিভ ও বয়স্ক বাবা-মা
মূল সমস্যা: একটানা কম্পিউটারে বা ফোনে তাকিয়ে থাকার কারণে ঘাড়ে তীব্র ব্যথা, স্টিফনেস ও মাথাব্যথা। ফিজিওথেরাপিতে হাজার হাজার টাকা খরচ হচ্ছে।
সমাধান ও বেনিফিট: মাত্র ১৫ মিনিটের থেরাপিউটিক ডিপ-টিস্যু ম্যাসাজে ঘাড়ের স্টিফনেস নিমেষেই উধাও। রিচার্জেবল, সহজে বহনযোগ্য ও হিটিং মোড সহ।
কল টু অ্যাকশন: ফ্ল্যাশ সেলে আজ অর্ডার করলে ৪৫% বিশেষ ছাড় এবং ২ বছরের রিপ্লেসমেন্ট ওয়ারেন্টি!`
  }
];
