/**
 * Entrance Question Bank — English & Nepali.
 * English serves CEE/IOE grammar-and-usage style; Nepali serves NEB board style.
 */

import type { EntranceUnitBank } from "./types";

export const ENGLISH_ENTRANCE: EntranceUnitBank[] = [
  {
    units: ["*"], // language papers: every topic of english shares the bank
    questions: [
      { q: "Choose the correct sentence:", options: ["He has been working here since 2019.", "He is working here since 2019.", "He works here since 2019.", "He worked here since 2019."], answer: 0, why: "'Since + point of time' demands the present perfect continuous.", exam: "CEE 2080" },
      { q: "The passive voice of 'They are building a bridge' is:", options: ["A bridge is being built.", "A bridge is built.", "A bridge has been built.", "A bridge was being built."], answer: 0, why: "Present continuous passive = is/are + being + V3.", exam: "IOE 2079" },
      { q: "Identify the adverb: 'She sings beautifully.'", options: ["beautifully", "sings", "she", "none"], answer: 0, why: "Modifies the verb 'sings' — the –ly adverb.", exam: "CEE 2079" },
      { q: "'If I ___ you, I would apologise.' — correct form:", options: ["were", "was", "am", "will be"], answer: 0, why: "Second conditional (unreal) takes 'were' for all persons.", exam: "CEE 2081" },
      { q: "The synonym of 'benevolent' is:", options: ["kind", "greedy", "hostile", "careless"], answer: 0, why: "Bene = good + vol = wish → wishing good.", exam: "IOE 2078" },
      { q: "Choose the correctly spelt word:", options: ["Accommodation", "Acommodation", "Accomodation", "Acomodation"], answer: 0, why: "Double c, double m — the spelling trap that repeats every year.", exam: "CEE 2079" },
      { q: "'Despite the rain, we went out' means the same as:", options: ["Although it rained, we went out.", "Because it rained, we went out.", "It rained so we went out.", "We went out to see rain."], answer: 0, why: "'Despite' = concession, synonymous with 'although'.", exam: "CEE 2080" },
      { q: "One who studies stars and planets is a(n):", options: ["astronomer", "astrologer", "geologist", "cosmonaut"], answer: 0, why: "Astronomy = science; astrology = fortune-telling — the classic pair.", exam: "CEE 2081" },
      { q: "The antonym of 'obsolete' is:", options: ["current", "ancient", "outdated", "rusty"], answer: 0, why: "Obsolete = no longer in use; its opposite is modern/current.", exam: "IOE 2079" },
      { q: "'Hardly had she arrived ___ the phone rang.'", options: ["when", "than", "then", "that"], answer: 0, why: "'Hardly … when' is the fixed correlative; 'no sooner … than' is the twin.", exam: "CEE 2078" },
    ],
  },
];

export const NEPALI_ENTRANCE: EntranceUnitBank[] = [
  {
    units: ["bhasha-ra-vyakarana", "*"],
    questions: [
      { q: "'नेपाली' शब्दको सन्धि विच्छेद कुन हो?", options: ["नेपाल + ई", "ने + पाली", "नेपा + ली", "नेप + आली"], answer: 0, why: "नेपाल + ई → नेपाली (दीर्घ सन्धि)।", exam: "NEB बोर्ड २०८०" },
      { q: "'गुनासो' शब्द कुन व्याकरणिक वर्गमा पर्छ?", options: ["तत्सम", "तद्भव", "देशज", "विदेशी"], answer: 0, why: "संस्कृतबाट सिधै आएको (गुण + आसो) — तत्सम शब्द।", exam: "NEB बोर्ड २०७९" },
      { q: "'उसले भात खायो' वाक्यमा क्रिया कुन हो?", options: ["खायो", "भात", "उसले", "छैन"], answer: 0, why: "काम बताउने शब्द क्रिया हो — 'खायो'।", exam: "NEB बोर्ड २०७८" },
      { q: "'सुनको सिँदूर' कुन अलंकार हो?", options: ["रूपक", "उपमा", "अनुप्रास", "यमक"], answer: 0, why: "उपमा शब्दबिना एउटै को अर्को रूप देखाइएको — रूपक अलंकार।", exam: "NEB बोर्ड २०८१" },
      { q: "'राम्रो' विशेषणको उत्तम तुलनात्मक रूप कुन हो?", options: ["सबभन्दा राम्रो", "राम्रो", "राम्रै", "राम्ररी"], answer: 0, why: "उत्तम (सर्वोत्कृष्ट) तुलनामा 'सबभन्दा' प्रयोग हुन्छ।", exam: "NEB बोर्ड २०७९" },
    ],
  },
];
