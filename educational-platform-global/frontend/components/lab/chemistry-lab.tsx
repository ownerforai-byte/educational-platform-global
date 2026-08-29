"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chemistry3D } from "@/components/lab/chemistry-3d";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

export type Element = {
  number: number;
  symbol: string;
  name: string;
  mass: number;
  category: string;
  electronConfig?: string;
  phase?: string;
  summary?: string;
  row: number;
  col: number;
};

export const PERIODIC_TABLE: Element[] = [
  { number: 1, symbol: "H", name: "Hydrogen", mass: 1.008, category: "nonmetal", electronConfig: "1s¹", phase: "gas", summary: "Lightest element; most abundant in the universe.", row: 1, col: 1 },
  { number: 2, symbol: "He", name: "Helium", mass: 4.0026, category: "noble-gas", electronConfig: "1s²", phase: "gas", summary: "Inert gas; used in balloons and cryogenics.", row: 1, col: 18 },
  { number: 3, symbol: "Li", name: "Lithium", mass: 6.94, category: "alkali-metal", electronConfig: "[He] 2s¹", phase: "solid", summary: "Lightest metal; used in batteries.", row: 2, col: 1 },
  { number: 4, symbol: "Be", name: "Beryllium", mass: 9.0122, category: "alkaline-earth", electronConfig: "[He] 2s²", phase: "solid", summary: "Lightweight, stiff metal; used in aerospace.", row: 2, col: 2 },
  { number: 5, symbol: "B", name: "Boron", mass: 10.81, category: "metalloid", electronConfig: "[He] 2s² 2p¹", phase: "solid", summary: "Used in detergents, semiconductors, and borosilicate glass.", row: 2, col: 13 },
  { number: 6, symbol: "C", name: "Carbon", mass: 12.011, category: "nonmetal", electronConfig: "[He] 2s² 2p²", phase: "solid", summary: "Basis of organic chemistry; exists as diamond and graphite.", row: 2, col: 14 },
  { number: 7, symbol: "N", name: "Nitrogen", mass: 14.007, category: "nonmetal", electronConfig: "[He] 2s² 2p³", phase: "gas", summary: "Major component of Earth's atmosphere (78%).", row: 2, col: 15 },
  { number: 8, symbol: "O", name: "Oxygen", mass: 15.999, category: "nonmetal", electronConfig: "[He] 2s² 2p⁴", phase: "gas", summary: "Essential for respiration and combustion.", row: 2, col: 16 },
  { number: 9, symbol: "F", name: "Fluorine", mass: 18.998, category: "halogen", electronConfig: "[He] 2s² 2p⁵", phase: "gas", summary: "Most electronegative element; used in toothpaste.", row: 2, col: 17 },
  { number: 10, symbol: "Ne", name: "Neon", mass: 20.180, category: "noble-gas", electronConfig: "[He] 2s² 2p⁶", phase: "gas", summary: "Used in neon signs and high-voltage indicators.", row: 2, col: 18 },
  { number: 11, symbol: "Na", name: "Sodium", mass: 22.990, category: "alkali-metal", electronConfig: "[Ne] 3s¹", phase: "solid", summary: "Reactive metal; essential for nerve function.", row: 3, col: 1 },
  { number: 12, symbol: "Mg", name: "Magnesium", mass: 24.305, category: "alkaline-earth", electronConfig: "[Ne] 3s²", phase: "solid", summary: "Lightweight structural metal; burns with bright white flame.", row: 3, col: 2 },
  { number: 13, symbol: "Al", name: "Aluminium", mass: 26.982, category: "metal", electronConfig: "[Ne] 3s² 3p¹", phase: "solid", summary: "Light, corrosion-resistant metal; widely used in packaging and transport.", row: 3, col: 13 },
  { number: 14, symbol: "Si", name: "Silicon", mass: 28.085, category: "metalloid", electronConfig: "[Ne] 3s² 3p²", phase: "solid", summary: "Semiconductor backbone of electronics.", row: 3, col: 14 },
  { number: 15, symbol: "P", name: "Phosphorus", mass: 30.974, category: "nonmetal", electronConfig: "[Ne] 3s² 3p³", phase: "solid", summary: "Essential for DNA, ATP, and fertilizers.", row: 3, col: 15 },
  { number: 16, symbol: "S", name: "Sulfur", mass: 32.06, category: "nonmetal", electronConfig: "[Ne] 3s² 3p⁴", phase: "solid", summary: "Yellow solid; used in sulfuric acid and vulcanization.", row: 3, col: 16 },
  { number: 17, symbol: "Cl", name: "Chlorine", mass: 35.45, category: "halogen", electronConfig: "[Ne] 3s² 3p⁵", phase: "gas", summary: "Disinfectant; used in water treatment and PVC.", row: 3, col: 17 },
  { number: 18, symbol: "Ar", name: "Argon", mass: 39.948, category: "noble-gas", electronConfig: "[Ne] 3s² 3p⁶", phase: "gas", summary: "Inert gas; used in welding and light bulbs.", row: 3, col: 18 },
  { number: 19, symbol: "K", name: "Potassium", mass: 39.098, category: "alkali-metal", electronConfig: "[Ar] 4s¹", phase: "solid", summary: "Essential electrolyte; reacts vigorously with water.", row: 4, col: 1 },
  { number: 20, symbol: "Ca", name: "Calcium", mass: 40.078, category: "alkaline-earth", electronConfig: "[Ar] 4s²", phase: "solid", summary: "Major component of bones, teeth, and cement.", row: 4, col: 2 },
  { number: 21, symbol: "Sc", name: "Scandium", mass: 44.956, category: "transition-metal", electronConfig: "[Ar] 3d¹ 4s²", phase: "solid", summary: "Light transition metal; used in aerospace alloys.", row: 4, col: 3 },
  { number: 22, symbol: "Ti", name: "Titanium", mass: 47.867, category: "transition-metal", electronConfig: "[Ar] 3d² 4s²", phase: "solid", summary: "Strong, lightweight, corrosion-resistant; used in implants and aerospace.", row: 4, col: 4 },
  { number: 23, symbol: "V", name: "Vanadium", mass: 50.942, category: "transition-metal", electronConfig: "[Ar] 3d³ 4s²", phase: "solid", summary: "Used in high-strength steel alloys.", row: 4, col: 5 },
  { number: 24, symbol: "Cr", name: "Chromium", mass: 52.00, category: "transition-metal", electronConfig: "[Ar] 3d⁵ 4s¹", phase: "solid", summary: "Hard, corrosion-resistant; used in plating and stainless steel.", row: 4, col: 6 },
  { number: 25, symbol: "Mn", name: "Manganese", mass: 54.938, category: "transition-metal", electronConfig: "[Ar] 3d⁵ 4s²", phase: "solid", summary: "Essential in steel production and batteries.", row: 4, col: 7 },
  { number: 26, symbol: "Fe", name: "Iron", mass: 55.845, category: "transition-metal", electronConfig: "[Ar] 3d⁶ 4s²", phase: "solid", summary: "Most used metal on Earth; central to steel.", row: 4, col: 8 },
  { number: 27, symbol: "Co", name: "Cobalt", mass: 58.933, category: "transition-metal", electronConfig: "[Ar] 3d⁷ 4s²", phase: "solid", summary: "Used in magnets, superalloys, and lithium-ion batteries.", row: 4, col: 9 },
  { number: 28, symbol: "Ni", name: "Nickel", mass: 58.693, category: "transition-metal", electronConfig: "[Ar] 3d⁸ 4s²", phase: "solid", summary: "Corrosion-resistant; used in coins, batteries, and stainless steel.", row: 4, col: 10 },
  { number: 29, symbol: "Cu", name: "Copper", mass: 63.546, category: "transition-metal", electronConfig: "[Ar] 3d¹⁰ 4s¹", phase: "solid", summary: "Excellent conductor; used in wiring and plumbing.", row: 4, col: 11 },
  { number: 30, symbol: "Zn", name: "Zinc", mass: 65.38, category: "transition-metal", electronConfig: "[Ar] 3d¹⁰ 4s²", phase: "solid", summary: "Used for galvanization, alloys, and batteries.", row: 4, col: 12 },
  { number: 31, symbol: "Ga", name: "Gallium", mass: 69.723, category: "metal", electronConfig: "[Ar] 3d¹⁰ 4s² 4p¹", phase: "solid", summary: "Melts near room temperature; used in semiconductors and LEDs.", row: 4, col: 13 },
  { number: 32, symbol: "Ge", name: "Germanium", mass: 72.630, category: "metalloid", electronConfig: "[Ar] 3d¹⁰ 4s² 4p²", phase: "solid", summary: "Semiconductor used in fiber optics and infrared optics.", row: 4, col: 14 },
  { number: 33, symbol: "As", name: "Arsenic", mass: 74.922, category: "metalloid", electronConfig: "[Ar] 3d¹⁰ 4s² 4p³", phase: "solid", summary: "Toxic metalloid; used in semiconductors and wood preservatives.", row: 4, col: 15 },
  { number: 34, symbol: "Se", name: "Selenium", mass: 78.971, category: "nonmetal", electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁴", phase: "solid", summary: "Essential trace element; used in photocells and glass.", row: 4, col: 16 },
  { number: 35, symbol: "Br", name: "Bromine", mass: 79.904, category: "halogen", electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁵", phase: "liquid", summary: "One of two liquid elements; used in flame retardants.", row: 4, col: 17 },
  { number: 36, symbol: "Kr", name: "Krypton", mass: 83.798, category: "noble-gas", electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁶", phase: "gas", summary: "Rare inert gas; used in lighting and lasers.", row: 4, col: 18 },
  { number: 37, symbol: "Rb", name: "Rubidium", mass: 85.468, category: "alkali-metal", electronConfig: "[Kr] 5s¹", phase: "solid", summary: "Highly reactive alkali metal; used in atomic clocks.", row: 5, col: 1 },
  { number: 38, symbol: "Sr", name: "Strontium", mass: 87.62, category: "alkaline-earth", electronConfig: "[Kr] 5s²", phase: "solid", summary: "Used in fireworks for red color and in magnets.", row: 5, col: 2 },
  { number: 39, symbol: "Y", name: "Yttrium", mass: 88.906, category: "transition-metal", electronConfig: "[Kr] 4d¹ 5s²", phase: "solid", summary: "Used in LEDs, superconductors, and cancer treatment.", row: 5, col: 3 },
  { number: 40, symbol: "Zr", name: "Zirconium", mass: 91.224, category: "transition-metal", electronConfig: "[Kr] 4d² 5s²", phase: "solid", summary: "Corrosion-resistant; used in nuclear reactors and ceramics.", row: 5, col: 4 },
  { number: 41, symbol: "Nb", name: "Niobium", mass: 92.906, category: "transition-metal", electronConfig: "[Kr] 4d⁴ 5s¹", phase: "solid", summary: "Used in superconducting magnets and steel alloys.", row: 5, col: 5 },
  { number: 42, symbol: "Mo", name: "Molybdenum", mass: 95.95, category: "transition-metal", electronConfig: "[Kr] 4d⁵ 5s¹", phase: "solid", summary: "High melting point; used in steel alloys and catalysts.", row: 5, col: 6 },
  { number: 43, symbol: "Tc", name: "Technetium", mass: 98, category: "transition-metal", electronConfig: "[Kr] 4d⁵ 5s²", phase: "solid", summary: "First artificially produced element; used in medical imaging.", row: 5, col: 7 },
  { number: 44, symbol: "Ru", name: "Ruthenium", mass: 101.07, category: "transition-metal", electronConfig: "[Kr] 4d⁷ 5s¹", phase: "solid", summary: "Rare platinum-group metal; used in electronics and catalysts.", row: 5, col: 8 },
  { number: 45, symbol: "Rh", name: "Rhodium", mass: 102.91, category: "transition-metal", electronConfig: "[Kr] 4d⁸ 5s¹", phase: "solid", summary: "Rare, reflective metal; used in catalytic converters.", row: 5, col: 9 },
  { number: 46, symbol: "Pd", name: "Palladium", mass: 106.42, category: "transition-metal", electronConfig: "[Kr] 4d¹⁰", phase: "solid", summary: "Absorbs hydrogen; used in catalytic converters and electronics.", row: 5, col: 10 },
  { number: 47, symbol: "Ag", name: "Silver", mass: 107.87, category: "transition-metal", electronConfig: "[Kr] 4d¹⁰ 5s¹", phase: "solid", summary: "Best electrical conductor; used in jewelry and photography.", row: 5, col: 11 },
  { number: 48, symbol: "Cd", name: "Cadmium", mass: 112.41, category: "transition-metal", electronConfig: "[Kr] 4d¹⁰ 5s²", phase: "solid", summary: "Toxic metal; used in batteries and pigments.", row: 5, col: 12 },
  { number: 49, symbol: "In", name: "Indium", mass: 114.82, category: "metal", electronConfig: "[Kr] 4d¹⁰ 5s² 5p¹", phase: "solid", summary: "Soft metal; used in touchscreens and semiconductors.", row: 5, col: 13 },
  { number: 50, symbol: "Sn", name: "Tin", mass: 118.71, category: "metal", electronConfig: "[Kr] 4d¹⁰ 5s² 5p²", phase: "solid", summary: "Used in solder, plating, and bronze alloys.", row: 5, col: 14 },
  { number: 51, symbol: "Sb", name: "Antimony", mass: 121.76, category: "metalloid", electronConfig: "[Kr] 4d¹⁰ 5s² 5p³", phase: "solid", summary: "Used in flame retardants and semiconductors.", row: 5, col: 15 },
  { number: 52, symbol: "Te", name: "Tellurium", mass: 127.60, category: "metalloid", electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁴", phase: "solid", summary: "Used in solar cells and thermoelectric devices.", row: 5, col: 16 },
  { number: 53, symbol: "I", name: "Iodine", mass: 126.90, category: "halogen", electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵", phase: "solid", summary: "Essential for thyroid function; used in antiseptics.", row: 5, col: 17 },
  { number: 54, symbol: "Xe", name: "Xenon", mass: 131.29, category: "noble-gas", electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁶", phase: "gas", summary: "Rare gas; used in ion thrusters and lighting.", row: 5, col: 18 },
  { number: 55, symbol: "Cs", name: "Caesium", mass: 132.91, category: "alkali-metal", electronConfig: "[Xe] 6s¹", phase: "solid", summary: "Most electropositive stable element; used in atomic clocks.", row: 6, col: 1 },
  { number: 56, symbol: "Ba", name: "Barium", mass: 137.33, category: "alkaline-earth", electronConfig: "[Xe] 6s²", phase: "solid", summary: "Used in X-ray imaging and fireworks.", row: 6, col: 2 },
  { number: 57, symbol: "La", name: "Lanthanum", mass: 138.91, category: "lanthanide", electronConfig: "[Xe] 5d¹ 6s²", phase: "solid", summary: "First lanthanide; used in camera lenses and catalysts.", row: 9, col: 3 },
  { number: 58, symbol: "Ce", name: "Cerium", mass: 140.12, category: "lanthanide", electronConfig: "[Xe] 4f¹ 5d¹ 6s²", phase: "solid", summary: "Most abundant rare earth; used in catalysts and polishing.", row: 9, col: 4 },
  { number: 59, symbol: "Pr", name: "Praseodymium", mass: 140.91, category: "lanthanide", electronConfig: "[Xe] 4f³ 6s²", phase: "solid", summary: "Used in magnets and aircraft engines.", row: 9, col: 5 },
  { number: 60, symbol: "Nd", name: "Neodymium", mass: 144.24, category: "lanthanide", electronConfig: "[Xe] 4f⁴ 6s²", phase: "solid", summary: "Powers strong permanent magnets in headphones and EVs.", row: 9, col: 6 },
  { number: 61, symbol: "Pm", name: "Promethium", mass: 145, category: "lanthanide", electronConfig: "[Xe] 4f⁵ 6s²", phase: "solid", summary: "Radioactive lanthanide; used in nuclear batteries.", row: 9, col: 7 },
  { number: 62, symbol: "Sm", name: "Samarium", mass: 150.36, category: "lanthanide", electronConfig: "[Xe] 4f⁶ 6s²", phase: "solid", summary: "Used in magnets and cancer treatment.", row: 9, col: 8 },
  { number: 63, symbol: "Eu", name: "Europium", mass: 151.96, category: "lanthanide", electronConfig: "[Xe] 4f⁷ 6s²", phase: "solid", summary: "Used in phosphors for screens and Euro banknotes.", row: 9, col: 9 },
  { number: 64, symbol: "Gd", name: "Gadolinium", mass: 157.25, category: "lanthanide", electronConfig: "[Xe] 4f⁷ 5d¹ 6s²", phase: "solid", summary: "Used in MRI contrast agents and neutron capture.", row: 9, col: 10 },
  { number: 65, symbol: "Tb", name: "Terbium", mass: 158.93, category: "lanthanide", electronConfig: "[Xe] 4f⁹ 6s²", phase: "solid", summary: "Used in green phosphors and solid-state devices.", row: 9, col: 11 },
  { number: 66, symbol: "Dy", name: "Dysprosium", mass: 162.50, category: "lanthanide", electronConfig: "[Xe] 4f¹⁰ 6s²", phase: "solid", summary: "Used in high-performance magnets and data storage.", row: 9, col: 12 },
  { number: 67, symbol: "Ho", name: "Holmium", mass: 164.93, category: "lanthanide", electronConfig: "[Xe] 4f¹¹ 6s²", phase: "solid", summary: "Highest magnetic moment; used in lasers and nuclear control.", row: 9, col: 13 },
  { number: 68, symbol: "Er", name: "Erbium", mass: 167.26, category: "lanthanide", electronConfig: "[Xe] 4f¹² 6s²", phase: "solid", summary: "Used in fiber-optic amplifiers and lasers.", row: 9, col: 14 },
  { number: 69, symbol: "Tm", name: "Thulium", mass: 168.93, category: "lanthanide", electronConfig: "[Xe] 4f¹³ 6s²", phase: "solid", summary: "Rare lanthanide; used in portable X-ray sources.", row: 9, col: 15 },
  { number: 70, symbol: "Yb", name: "Ytterbium", mass: 173.05, category: "lanthanide", electronConfig: "[Xe] 4f¹⁴ 6s²", phase: "solid", summary: "Used in lasers and atomic clocks.", row: 9, col: 16 },
  { number: 71, symbol: "Lu", name: "Lutetium", mass: 174.97, category: "lanthanide", electronConfig: "[Xe] 4f¹⁴ 5d¹ 6s²", phase: "solid", summary: "Last lanthanide; used in PET scan detectors.", row: 9, col: 17 },
  { number: 72, symbol: "Hf", name: "Hafnium", mass: 178.49, category: "transition-metal", electronConfig: "[Xe] 4f¹⁴ 5d² 6s²", phase: "solid", summary: "Used in nuclear control rods and microprocessors.", row: 6, col: 4 },
  { number: 73, symbol: "Ta", name: "Tantalum", mass: 180.95, category: "transition-metal", electronConfig: "[Xe] 4f¹⁴ 5d³ 6s²", phase: "solid", summary: "Highly corrosion-resistant; used in capacitors and surgical tools.", row: 6, col: 5 },
  { number: 74, symbol: "W", name: "Tungsten", mass: 183.84, category: "transition-metal", electronConfig: "[Xe] 4f¹⁴ 5d⁴ 6s²", phase: "solid", summary: "Highest melting point metal; used in light bulb filaments.", row: 6, col: 6 },
  { number: 75, symbol: "Re", name: "Rhenium", mass: 186.21, category: "transition-metal", electronConfig: "[Xe] 4f¹⁴ 5d⁵ 6s²", phase: "solid", summary: "Used in jet engine superalloys and catalysts.", row: 6, col: 7 },
  { number: 76, symbol: "Os", name: "Osmium", mass: 190.23, category: "transition-metal", electronConfig: "[Xe] 4f¹⁴ 5d⁶ 6s²", phase: "solid", summary: "Densest natural element; used in fountain pen nibs.", row: 6, col: 8 },
  { number: 77, symbol: "Ir", name: "Iridium", mass: 192.22, category: "transition-metal", electronConfig: "[Xe] 4f¹⁴ 5d⁷ 6s²", phase: "solid", summary: "Most corrosion-resistant metal; used in spark plugs.", row: 6, col: 9 },
  { number: 78, symbol: "Pt", name: "Platinum", mass: 195.08, category: "transition-metal", electronConfig: "[Xe] 4f¹⁴ 5d⁹ 6s¹", phase: "solid", summary: "Precious metal; used in catalytic converters and jewelry.", row: 6, col: 10 },
  { number: 79, symbol: "Au", name: "Gold", mass: 196.97, category: "transition-metal", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹", phase: "solid", summary: "Noble metal; used in currency, jewelry, and electronics.", row: 6, col: 11 },
  { number: 80, symbol: "Hg", name: "Mercury", mass: 200.59, category: "transition-metal", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s²", phase: "liquid", summary: "Only liquid metal at room temperature; toxic.", row: 6, col: 12 },
  { number: 81, symbol: "Tl", name: "Thallium", mass: 204.38, category: "metal", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹", phase: "solid", summary: "Toxic metal; used in electronics and medical imaging.", row: 6, col: 13 },
  { number: 82, symbol: "Pb", name: "Lead", mass: 207.2, category: "metal", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²", phase: "solid", summary: "Dense, toxic metal; used in batteries and radiation shielding.", row: 6, col: 14 },
  { number: 83, symbol: "Bi", name: "Bismuth", mass: 208.98, category: "metal", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³", phase: "solid", summary: "Low-toxicity metal; used in cosmetics and medicine.", row: 6, col: 15 },
  { number: 84, symbol: "Po", name: "Polonium", mass: 209, category: "metalloid", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴", phase: "solid", summary: "Radioactive element; used in antistatic devices.", row: 6, col: 16 },
  { number: 85, symbol: "At", name: "Astatine", mass: 210, category: "halogen", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵", phase: "solid", summary: "Rare radioactive halogen; potential cancer treatment.", row: 6, col: 17 },
  { number: 86, symbol: "Rn", name: "Radon", mass: 222, category: "noble-gas", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶", phase: "gas", summary: "Radioactive noble gas; health hazard in enclosed spaces.", row: 6, col: 18 },
  { number: 87, symbol: "Fr", name: "Francium", mass: 223, category: "alkali-metal", electronConfig: "[Rn] 7s¹", phase: "solid", summary: "Extremely rare and radioactive alkali metal.", row: 7, col: 1 },
  { number: 88, symbol: "Ra", name: "Radium", mass: 226, category: "alkaline-earth", electronConfig: "[Rn] 7s²", phase: "solid", summary: "Radioactive; historically used in luminous paints.", row: 7, col: 2 },
  { number: 89, symbol: "Ac", name: "Actinium", mass: 227, category: "actinide", electronConfig: "[Rn] 6d¹ 7s²", phase: "solid", summary: "Radioactive; used in cancer treatment research.", row: 10, col: 3 },
  { number: 90, symbol: "Th", name: "Thorium", mass: 232.04, category: "actinide", electronConfig: "[Rn] 6d² 7s²", phase: "solid", summary: "Radioactive metal; potential nuclear fuel.", row: 10, col: 4 },
  { number: 91, symbol: "Pa", name: "Protactinium", mass: 231.04, category: "actinide", electronConfig: "[Rn] 5f² 6d¹ 7s²", phase: "solid", summary: "Rare, radioactive; used in scientific research.", row: 10, col: 5 },
  { number: 92, symbol: "U", name: "Uranium", mass: 238.03, category: "actinide", electronConfig: "[Rn] 5f³ 6d¹ 7s²", phase: "solid", summary: "Primary fuel for nuclear power.", row: 10, col: 6 },
  { number: 93, symbol: "Np", name: "Neptunium", mass: 237, category: "actinide", electronConfig: "[Rn] 5f⁴ 6d¹ 7s²", phase: "solid", summary: "First transuranic element; used in neutron detectors.", row: 10, col: 7 },
  { number: 94, symbol: "Pu", name: "Plutonium", mass: 244, category: "actinide", electronConfig: "[Rn] 5f⁶ 7s²", phase: "solid", summary: "Used in nuclear weapons and spacecraft power.", row: 10, col: 8 },
  { number: 95, symbol: "Am", name: "Americium", mass: 243, category: "actinide", electronConfig: "[Rn] 5f⁷ 7s²", phase: "solid", summary: "Used in smoke detectors.", row: 10, col: 9 },
  { number: 96, symbol: "Cm", name: "Curium", mass: 247, category: "actinide", electronConfig: "[Rn] 5f⁷ 6d¹ 7s²", phase: "solid", summary: "Used in space probe power sources.", row: 10, col: 10 },
  { number: 97, symbol: "Bk", name: "Berkelium", mass: 247, category: "actinide", electronConfig: "[Rn] 5f⁹ 7s²", phase: "solid", summary: "Used in scientific research; no commercial use yet.", row: 10, col: 11 },
  { number: 98, symbol: "Cf", name: "Californium", mass: 251, category: "actinide", electronConfig: "[Rn] 5f¹⁰ 7s²", phase: "solid", summary: "Used as a neutron source in nuclear reactors.", row: 10, col: 12 },
  { number: 99, symbol: "Es", name: "Einsteinium", mass: 252, category: "actinide", electronConfig: "[Rn] 5f¹¹ 7s²", phase: "solid", summary: "Discovered in nuclear fallout; used in basic research.", row: 10, col: 13 },
  { number: 100, symbol: "Fm", name: "Fermium", mass: 257, category: "actinide", electronConfig: "[Rn] 5f¹² 7s²", phase: "solid", summary: "Named after Enrico Fermi; produced in tiny amounts.", row: 10, col: 14 },
  { number: 101, symbol: "Md", name: "Mendelevium", mass: 258, category: "actinide", electronConfig: "[Rn] 5f¹³ 7s²", phase: "solid", summary: "Named after Dmitri Mendeleev; synthetic.", row: 10, col: 15 },
  { number: 102, symbol: "No", name: "Nobelium", mass: 259, category: "actinide", electronConfig: "[Rn] 5f¹⁴ 7s²", phase: "solid", summary: "Named after Alfred Nobel; synthetic.", row: 10, col: 16 },
  { number: 103, symbol: "Lr", name: "Lawrencium", mass: 262, category: "actinide", electronConfig: "[Rn] 5f¹⁴ 7s² 7p¹", phase: "solid", summary: "Named after Ernest Lawrence; synthetic.", row: 10, col: 17 },
  { number: 104, symbol: "Rf", name: "Rutherfordium", mass: 267, category: "transition-metal", electronConfig: "[Rn] 5f¹⁴ 6d² 7s²", phase: "solid", summary: "Synthetic; named after Ernest Rutherford.", row: 7, col: 4 },
  { number: 105, symbol: "Db", name: "Dubnium", mass: 268, category: "transition-metal", electronConfig: "[Rn] 5f¹⁴ 6d³ 7s²", phase: "solid", summary: "Synthetic; named after Dubna, Russia.", row: 7, col: 5 },
  { number: 106, symbol: "Sg", name: "Seaborgium", mass: 269, category: "transition-metal", electronConfig: "[Rn] 5f¹⁴ 6d⁴ 7s²", phase: "solid", summary: "Synthetic; named after Glenn Seaborg.", row: 7, col: 6 },
  { number: 107, symbol: "Bh", name: "Bohrium", mass: 270, category: "transition-metal", electronConfig: "[Rn] 5f¹⁴ 6d⁵ 7s²", phase: "solid", summary: "Synthetic; named after Niels Bohr.", row: 7, col: 7 },
  { number: 108, symbol: "Hs", name: "Hassium", mass: 269, category: "transition-metal", electronConfig: "[Rn] 5f¹⁴ 6d⁶ 7s²", phase: "solid", summary: "Synthetic; named after Hesse, Germany.", row: 7, col: 8 },
  { number: 109, symbol: "Mt", name: "Meitnerium", mass: 278, category: "transition-metal", electronConfig: "[Rn] 5f¹⁴ 6d⁷ 7s²", phase: "solid", summary: "Synthetic; named after Lise Meitner.", row: 7, col: 9 },
  { number: 110, symbol: "Ds", name: "Darmstadtium", mass: 281, category: "transition-metal", electronConfig: "[Rn] 5f¹⁴ 6d⁸ 7s²", phase: "solid", summary: "Synthetic; named after Darmstadt, Germany.", row: 7, col: 10 },
  { number: 111, symbol: "Rg", name: "Roentgenium", mass: 282, category: "transition-metal", electronConfig: "[Rn] 5f¹⁴ 6d⁹ 7s²", phase: "solid", summary: "Synthetic; named after Wilhelm Röntgen.", row: 7, col: 11 },
  { number: 112, symbol: "Cn", name: "Copernicium", mass: 285, category: "transition-metal", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s²", phase: "solid", summary: "Synthetic; named after Nicolaus Copernicus.", row: 7, col: 12 },
  { number: 113, symbol: "Nh", name: "Nihonium", mass: 286, category: "metal", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹", phase: "solid", summary: "Synthetic; named after Japan (Nihon).", row: 7, col: 13 },
  { number: 114, symbol: "Fl", name: "Flerovium", mass: 289, category: "metal", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²", phase: "solid", summary: "Synthetic; named after Georgy Flyorov.", row: 7, col: 14 },
  { number: 115, symbol: "Mc", name: "Moscovium", mass: 290, category: "metal", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³", phase: "solid", summary: "Synthetic; named after Moscow.", row: 7, col: 15 },
  { number: 116, symbol: "Lv", name: "Livermorium", mass: 293, category: "metal", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴", phase: "solid", summary: "Synthetic; named after Livermore, California.", row: 7, col: 16 },
  { number: 117, symbol: "Ts", name: "Tennessine", mass: 294, category: "halogen", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵", phase: "solid", summary: "Synthetic halogen; named after Tennessee.", row: 7, col: 17 },
  { number: 118, symbol: "Og", name: "Oganesson", mass: 294, category: "noble-gas", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶", phase: "solid", summary: "Heaviest known element; synthetic noble gas.", row: 7, col: 18 },
];

const CATEGORY_COLORS: Record<string, number> = {
  "nonmetal": 0x22c55e,
  "noble-gas": 0xa855f7,
  "alkali-metal": 0xef4444,
  "alkaline-earth": 0xf97316,
  "metalloid": 0xeab308,
  "halogen": 0x14b8a6,
  "metal": 0x3b82f6,
  "transition-metal": 0x6366f1,
  "lanthanide": 0xec4899,
  "actinide": 0xf43f5e,
};

const CATEGORY_CSS: Record<string, string> = {
  "nonmetal": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "noble-gas": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "alkali-metal": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "alkaline-earth": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "metalloid": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "halogen": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  "metal": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "transition-metal": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  "lanthanide": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  "actinide": "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
};

const METAL_CATEGORIES = new Set(["alkali-metal", "alkaline-earth", "transition-metal", "metal", "lanthanide", "actinide"]);
const NONMETAL_CATEGORIES = new Set(["nonmetal", "halogen", "noble-gas"]);
const METALLOID_CATEGORIES = new Set(["metalloid"]);

type BroadClass = "metals" | "non-metals" | "metalloids";

const BROAD_CLASS_LABELS: Record<BroadClass, string> = {
  "metals": "Metals",
  "non-metals": "Non-metals",
  "metalloids": "Metalloids",
};

const BROAD_CLASS_CSS: Record<BroadClass, string> = {
  "metals": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "non-metals": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "metalloids": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

function isInClass(el: Element, activeClass: string | null): boolean {
  if (!activeClass) return true;
  if (activeClass === "metals") return METAL_CATEGORIES.has(el.category);
  if (activeClass === "non-metals") return NONMETAL_CATEGORIES.has(el.category);
  if (activeClass === "metalloids") return METALLOID_CATEGORIES.has(el.category);
  return el.category === activeClass;
}

const GROUP_MNEMONICS: Record<number, string> = {
  1: "Group 1 – Alkali Metals: Li, Na, K, Rb, Cs, Fr. Very reactive; store under oil.",
  2: "Group 2 – Alkaline Earths: Be, Mg, Ca, Sr, Ba, Ra. Harder than alkalis; react with water.",
  13: "Group 13 – Boron Family: B, Al, Ga, In, Tl, Nh. Boron is a metalloid; rest are metals.",
  14: "Group 14 – Carbon Family: C, Si, Ge, Sn, Pb, Fl. Carbon has allotropes like diamond & graphite.",
  15: "Group 15 – Nitrogen Family: N, P, As, Sb, Bi, Mc. N is 78% of air; P glows in dark.",
  16: "Group 16 – Oxygen Family: O, S, Se, Te, Po, Lv. O is life-giving; S is yellow solid.",
  17: "Group 17 – Halogens: F, Cl, Br, I, At, Ts. Very reactive nonmetals; F is most electronegative.",
  18: "Group 18 – Noble Gases: He, Ne, Ar, Kr, Xe, Rn, Og. Inert; used in lights and signs.",
};

const PERIOD_MNEMONICS: Record<number, string> = {
  1: "Period 1: H-He. Only 2 elements; first shell holds max 2 electrons.",
  2: "Period 2: Li-Ne. Second shell; 8 elements. 'Little Benny Bakes Crispy Nougats For Sandy'.",
  3: "Period 3: Na-Ar. Third shell; 8 elements. 'Naughty Mg Alligators Si Picked Sour Clams And Ate'.",
  4: "Period 4: K-Kr. Fourth shell; 18 elements; transition metals begin.",
  5: "Period 5: Rb-Xe. Fifth shell; 18 elements.",
  6: "Period 6: Cs-Rn. Sixth shell; 32 elements; lanthanides inserted.",
  7: "Period 7: Fr-Og. Seventh shell; 32 elements; actinides inserted. Mostly synthetic.",
  9: "Lanthanides: La-Lu. 15 elements; fill 4f orbitals; used in magnets and lasers.",
  10: "Actinides: Ac-Lr. 15 elements; fill 5f orbitals; mostly radioactive.",
};

function createSymbolTexture(symbol: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "bold 32px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(symbol, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export function ChemistryLab() {
  const [selected, setSelected] = useState<Element | null>(null);
  const [hovered, setHovered] = useState<Element | null>(null);
  const [search, setSearch] = useState("");
  const [activeClass, setActiveClass] = useState<string | null>(null);
  const [tab, setTab] = useState("periodic");
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let raycaster: THREE.Raycaster;
    const mouse = new THREE.Vector2();
    let frameId: number;
    const elementMeshes: Map<string, THREE.Mesh> = new Map();
    let highlightMesh: THREE.Mesh | null = null;
    let _isDragging = false;
    let pointerDownPos = { x: 0, y: 0 };

    const init = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      scene.fog = new THREE.Fog(0x0f172a, 40, 90);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(0, 0, 30);

      if (!isWebGLAvailable()) {
        return;
      }
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 5;
      controls.maxDistance = 80;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 0.6;

      raycaster = new THREE.Raycaster();

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(10, 20, 15);
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      scene.add(dirLight);

      const dirLight2 = new THREE.DirectionalLight(0x6366f1, 0.6);
      dirLight2.position.set(-10, -5, -10);
      scene.add(dirLight2);

      const dirLight3 = new THREE.DirectionalLight(0xec4899, 0.4);
      dirLight3.position.set(0, -10, 10);
      scene.add(dirLight3);

      const pointLight = new THREE.PointLight(0x22d3ee, 0.8, 50);
      pointLight.position.set(0, 0, 15);
      scene.add(pointLight);

      const spacing = 1.4;
      const boxW = 1.2;
      const boxH = 1.0;
      const boxD = 0.25;

      const filtered = search
        ? PERIODIC_TABLE.filter(
            (el) =>
              el.name.toLowerCase().includes(search.toLowerCase()) ||
              el.symbol.toLowerCase().includes(search.toLowerCase()) ||
              String(el.number).includes(search)
          )
        : PERIODIC_TABLE;

      const filteredSet = new Set(filtered.map((el) => el.symbol));

      PERIODIC_TABLE.forEach((el) => {
        if (!filteredSet.has(el.symbol)) return;

        const x = (el.col - 9.5) * spacing;
        const y = (5.5 - el.row) * spacing;
        const z = 0;

        const geometry = new THREE.BoxGeometry(boxW, boxH, boxD);
        const color = CATEGORY_COLORS[el.category] ?? 0x888888;
        const inClass = isInClass(el, activeClass);
        const material = new THREE.MeshStandardMaterial({
          color,
          roughness: 0.25,
          metalness: 0.35,
          transparent: true,
          opacity: inClass ? 1 : 0.12,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.userData = { element: el };
        scene.add(mesh);
        elementMeshes.set(el.symbol, mesh);

        const borderGeo = new THREE.EdgesGeometry(geometry);
        const borderMat = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.15 });
        const border = new THREE.LineSegments(borderGeo, borderMat);
        mesh.add(border);

        const spriteMaterial = new THREE.SpriteMaterial({ map: createSymbolTexture(el.symbol), transparent: true, depthTest: false, opacity: inClass ? 1 : 0.15 });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(0, boxH / 2 + 0.4, 0);
        sprite.scale.set(1.2, 0.6, 1);
        mesh.add(sprite);
      });

      const highlightGeo = new THREE.BoxGeometry(boxW + 0.2, boxH + 0.2, boxD + 0.2);
      const highlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0, depthTest: true });
      highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
      highlightMesh.visible = false;
      scene.add(highlightMesh);

      const glowGeo = new THREE.BoxGeometry(boxW + 0.4, boxH + 0.4, boxD + 0.4);
      const glowMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.0, depthTest: true });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.visible = false;
      scene.add(glowMesh);

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const time = performance.now() * 0.001;
        elementMeshes.forEach((mesh, _symbol) => {
          const el = mesh.userData.element as Element;
          const offset = Math.sin(time + el.number * 0.2) * 0.08;
          mesh.position.z = offset;
          mesh.rotation.y = Math.sin(time * 0.5 + el.number * 0.1) * 0.05;
        });
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const getIntersections = (event: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const meshes = Array.from(elementMeshes.values());
        return raycaster.intersectObjects(meshes, false);
      };

      const getValency = (element: Element): string => {
        const col = element.col;
        const category = element.category;
        if (category === "noble-gas") return "0";
        if (category === "alkali-metal") return "1";
        if (category === "alkaline-earth") return "2";
        if (category === "halogen") return "1";
        if (col === 13) return "3";
        if (col === 14) return "4";
        if (col === 15) return "3, 5";
        if (col === 16) return "2, 6";
        if (category === "transition-metal" || category === "lanthanide" || category === "actinide") return "Variable";
        return "Variable";
      };

      const getIon = (element: Element): string => {
        const category = element.category;
        if (category === "alkali-metal") return `${element.symbol}+`;
        if (category === "alkaline-earth") return `${element.symbol}2+`;
        if (category === "halogen") return `${element.symbol}-`;
        if (category === "noble-gas") return "—";
        if (element.number === 26) return "Fe2+, Fe3+";
        if (element.number === 29) return "Cu+, Cu2+";
        if (element.number === 79) return "Au+, Au3+";
        if (element.number === 78) return "Pt2+, Pt4+";
        return "Variable";
      };

      const getDensity = (element: Element): string => {
        const densities: Record<number, string> = {
          1: "0.00009 g/cm³", 2: "0.00018 g/cm³", 3: "0.534 g/cm³", 4: "1.85 g/cm³",
          5: "2.34 g/cm³", 6: "2.267 g/cm³", 7: "0.00125 g/cm³", 8: "0.00143 g/cm³",
          9: "0.0017 g/cm³", 10: "0.0009 g/cm³", 11: "0.971 g/cm³", 12: "1.738 g/cm³",
          13: "2.70 g/cm³", 14: "2.33 g/cm³", 15: "1.82 g/cm³", 16: "2.07 g/cm³",
          17: "0.0032 g/cm³", 18: "0.0018 g/cm³", 19: "0.862 g/cm³", 20: "1.55 g/cm³",
          21: "2.985 g/cm³", 22: "4.54 g/cm³", 23: "6.11 g/cm³", 24: "7.15 g/cm³",
          25: "7.44 g/cm³", 26: "7.874 g/cm³", 27: "8.86 g/cm³", 28: "8.912 g/cm³",
          29: "8.96 g/cm³", 30: "7.14 g/cm³", 31: "5.907 g/cm³", 32: "5.323 g/cm³",
          33: "5.73 g/cm³", 34: "4.81 g/cm³", 35: "3.122 g/cm³", 36: "0.00375 g/cm³",
          37: "1.532 g/cm³", 38: "2.64 g/cm³", 39: "4.469 g/cm³", 40: "6.506 g/cm³",
          41: "8.57 g/cm³", 42: "10.22 g/cm³", 43: "11 g/cm³", 44: "12.37 g/cm³",
          45: "12.41 g/cm³", 46: "12.02 g/cm³", 47: "10.49 g/cm³", 48: "8.65 g/cm³",
          49: "7.31 g/cm³", 50: "7.31 g/cm³", 51: "6.685 g/cm³", 52: "6.24 g/cm³",
          53: "4.93 g/cm³", 54: "0.0059 g/cm³", 55: "1.873 g/cm³", 56: "3.594 g/cm³",
          57: "6.145 g/cm³", 58: "6.77 g/cm³", 59: "6.773 g/cm³", 60: "7.007 g/cm³",
          61: "7.26 g/cm³", 62: "7.52 g/cm³", 63: "5.247 g/cm³", 64: "7.90 g/cm³",
          65: "8.23 g/cm³", 66: "8.55 g/cm³", 67: "8.795 g/cm³", 68: "9.066 g/cm³",
          69: "9.33 g/cm³", 70: "6.966 g/cm³", 71: "9.84 g/cm³", 72: "13.31 g/cm³",
          73: "16.654 g/cm³", 74: "19.25 g/cm³", 75: "21.02 g/cm³", 76: "22.59 g/cm³",
          77: "22.56 g/cm³", 78: "21.45 g/cm³", 79: "21.45 g/cm³", 80: "13.546 g/cm³",
          81: "11.85 g/cm³", 82: "11.342 g/cm³", 83: "9.807 g/cm³", 84: "9.2 g/cm³",
          85: "4 g/cm³", 86: "0.00973 g/cm³", 87: "1.87 g/cm³", 88: "5.5 g/cm³",
          89: "10.07 g/cm³", 90: "11.72 g/cm³", 91: "15.37 g/cm³", 92: "19.1 g/cm³",
          93: "20.45 g/cm³", 94: "19.84 g/cm³", 95: "13.69 g/cm³", 96: "13.5 g/cm³",
          97: "14 g/cm³", 98: "10 g/cm³", 99: "8.84 g/cm³", 100: "8.6 g/cm³",
          101: "8.3 g/cm³", 102: "9.9 g/cm³", 103: "13.7 g/cm³", 104: "23.2 g/cm³",
          105: "36 g/cm³", 106: "32.6 g/cm³", 107: "37 g/cm³", 108: "41 g/cm³",
          109: "37 g/cm³", 110: "33.8 g/cm³", 111: "28.5 g/cm³", 112: "23.7 g/cm³",
          113: "16 g/cm³", 114: "14 g/cm³", 115: "13.6 g/cm³", 116: "12.9 g/cm³",
          117: "7.2 g/cm³", 118: "5.2 g/cm³",
        };
        return densities[element.number] ?? "—";
      };

      const getMeltingPoint = (element: Element): string => {
        const mps: Record<number, string> = {
          1: "-259.16°C", 2: "-272.2°C", 3: "180.54°C", 4: "1287°C",
          5: "2075°C", 6: "3550°C", 7: "-210°C", 8: "-218.79°C",
          9: "-219.67°C", 10: "-248.59°C", 11: "97.72°C", 12: "650°C",
          13: "660.32°C", 14: "1414°C", 15: "44.15°C", 16: "115.21°C",
          17: "-101.5°C", 18: "-189.34°C", 19: "63.38°C", 20: "842°C",
          21: "1541°C", 22: "1668°C", 23: "1910°C", 24: "1907°C",
          25: "1246°C", 26: "1538°C", 27: "1495°C", 28: "1455°C",
          29: "1084.62°C", 30: "419.53°C", 31: "29.76°C", 32: "938.25°C",
          33: "817°C", 34: "221°C", 35: "-7.2°C", 36: "-157.36°C",
          37: "39.31°C", 38: "777°C", 39: "1526°C", 40: "1855°C",
          41: "2477°C", 42: "2623°C", 43: "2157°C", 44: "2334°C",
          45: "1964°C", 46: "1554.9°C", 47: "961.78°C", 48: "321.07°C",
          49: "156.6°C", 50: "231.93°C", 51: "630.63°C", 52: "449.51°C",
          53: "113.7°C", 54: "-111.75°C", 55: "28.44°C", 56: "727°C",
          57: "920°C", 58: "799°C", 59: "931°C", 60: "1024°C",
          61: "1042°C", 62: "1072°C", 63: "907°C", 64: "1312°C",
          65: "1943°C", 66: "1412°C", 67: "1474°C", 68: "1529°C",
          69: "1545°C", 70: "819°C", 71: "1663°C", 72: "2233°C",
          73: "3017°C", 74: "3422°C", 75: "3186°C", 76: "3033°C",
          77: "2466°C", 78: "1768.3°C", 79: "1064.18°C", 80: "-38.83°C",
          81: "304°C", 82: "327.46°C", 83: "271.5°C", 84: "304°C",
          85: "302°C", 86: "-71°C", 87: "27°C", 88: "700°C",
          89: "1050°C", 90: "1750°C", 91: "1600°C", 92: "1135°C",
          93: "644°C", 94: "640°C", 95: "1745°C", 96: "1613°C",
          97: "860°C", 98: "900°C", 99: "860°C", 100: "1527°C",
          101: "827°C", 102: "827°C", 103: "1627°C", 104: "2100°C",
          105: "2300°C", 106: "2600°C", 107: "2600°C", 108: "2600°C",
          109: "1800°C", 110: "1800°C", 111: "1700°C", 112: "1400°C",
          113: "450°C", 114: "210°C", 115: "450°C", 116: "210°C",
          117: "300°C", 118: "350°C",
        };
        return mps[element.number] ?? "—";
      };

      const getBoilingPoint = (element: Element): string => {
        const bps: Record<number, string> = {
          1: "-252.87°C", 2: "-268.93°C", 3: "1342°C", 4: "2470°C",
          5: "3927°C", 6: "4027°C", 7: "-195.8°C", 8: "-182.96°C",
          9: "-188.12°C", 10: "-246.05°C", 11: "883°C", 12: "1091°C",
          13: "2519°C", 14: "3265°C", 15: "280.5°C", 16: "444.6°C",
          17: "-34.04°C", 18: "-185.79°C", 19: "759°C", 20: "1484°C",
          21: "2831°C", 22: "3287°C", 23: "3380°C", 24: "2671°C",
          25: "2061°C", 26: "2862°C", 27: "2927°C", 28: "2913°C",
          29: "2562°C", 30: "907°C", 31: "2204°C", 32: "2833°C",
          33: "614°C", 34: "685°C", 35: "58.8°C", 36: "-153.22°C",
          37: "688°C", 38: "1382°C", 39: "3345°C", 40: "4409°C",
          41: "4744°C", 42: "4639°C", 43: "4265°C", 44: "4150°C",
          45: "3695°C", 46: "2963°C", 47: "2162°C", 48: "767°C",
          49: "2072°C", 50: "2602°C", 51: "1587°C", 52: "988°C",
          53: "184.3°C", 54: "-108.1°C", 55: "671°C", 56: "1870°C",
          57: "3464°C", 58: "3443°C", 59: "3520°C", 60: "3347°C",
          61: "3000°C", 62: "1794°C", 63: "1529°C", 64: "3273°C",
          65: "3230°C", 66: "2567°C", 67: "1729°C", 68: "1596°C",
          69: "1747°C", 70: "1196°C", 71: "3402°C", 72: "4603°C",
          73: "5458°C", 74: "5555°C", 75: "5596°C", 76: "5027°C",
          77: "4428°C", 78: "3825°C", 79: "2856°C", 80: "356.73°C",
          81: "1473°C", 82: "1749°C", 83: "1564°C", 84: "962°C",
          85: "337°C", 86: "-61.7°C", 87: "677°C", 88: "1870°C",
          89: "3198°C", 90: "4788°C", 91: "4000°C", 92: "4131°C",
          93: "3902°C", 94: "3228°C", 95: "2011°C", 96: "3110°C",
          97: "2900°C", 98: "2870°C", 99: "1760°C", 100: "2050°C",
          101: "—", 102: "—", 103: "—", 104: "—",
          105: "—", 106: "—", 107: "—", 108: "—",
          109: "—", 110: "—", 111: "—", 112: "—",
          113: "—", 114: "—", 115: "—", 116: "—",
          117: "—", 118: "—",
        };
        return bps[element.number] ?? "—";
      };

      const getElectronegativity = (element: Element): string => {
        const en: Record<number, string> = {
          1: "2.20", 5: "2.04", 6: "2.55", 7: "3.04", 8: "3.44",
          9: "3.98", 11: "0.82", 12: "1.31", 13: "1.61", 14: "1.90",
          15: "2.19", 16: "2.58", 17: "3.16", 19: "0.82", 20: "1.00",
          26: "1.83", 29: "1.90", 35: "2.96", 47: "1.93", 53: "2.66",
          79: "2.54",
        };
        return en[element.number] ?? "—";
      };

      const updateTooltip = (event: MouseEvent, element: Element | null) => {
        const tooltip = tooltipRef.current;
        if (!tooltip) return;

        if (!element) {
          tooltip.style.opacity = "0";
          return;
        }

        tooltip.innerHTML = `
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
            <div style="width:48px;height:48px;border-radius:8px;background:#${CATEGORY_COLORS[element.category]?.toString(16) || '888888'};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:bold;color:#fff;border:2px solid rgba(255,255,255,0.2);">${element.symbol}</div>
            <div>
              <div style="font-size:14px;font-weight:700;color:#f1f5f9;">${element.number}. ${element.name}</div>
              <div style="font-size:11px;color:#94a3b8;">${element.mass} u · ${element.phase} at STP</div>
            </div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:6px;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;font-size:11px;">
              <span style="color:#64748b;">Category:</span><span style="color:#cbd5e1;text-transform:capitalize;">${element.category.replace("-", " ")}</span>
              <span style="color:#64748b;">Electron Config:</span><span style="color:#cbd5e1;">${element.electronConfig ?? "—"}</span>
              <span style="color:#64748b;">Valency:</span><span style="color:#cbd5e1;">${getValency(element)}</span>
              <span style="color:#64748b;">Common Ion:</span><span style="color:#cbd5e1;">${getIon(element)}</span>
              <span style="color:#64748b;">Atomic Mass:</span><span style="color:#cbd5e1;">${element.mass} u</span>
              <span style="color:#64748b;">Density:</span><span style="color:#cbd5e1;">${getDensity(element)}</span>
              <span style="color:#64748b;">Melting Point:</span><span style="color:#cbd5e1;">${getMeltingPoint(element)}</span>
              <span style="color:#64748b;">Boiling Point:</span><span style="color:#cbd5e1;">${getBoilingPoint(element)}</span>
              <span style="color:#64748b;">Electronegativity:</span><span style="color:#cbd5e1;">${getElectronegativity(element)}</span>
              <span style="color:#64748b;">Group / Period:</span><span style="color:#cbd5e1;">${element.col} / ${element.row}</span>
            </div>
          </div>
          ${element.summary ? `<div style="border-top:1px solid rgba(255,255,255,0.1);margin-top:6px;padding-top:6px;font-size:10px;color:#94a3b8;line-height:1.4;">${element.summary}</div>` : ""}
        `;

        const x = event.clientX + 16;
        const y = event.clientY + 16;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.style.opacity = "1";
      };

      renderer.domElement.addEventListener("pointermove", (event: PointerEvent) => {
        const intersections = getIntersections(event);
        if (intersections.length > 0) {
          const obj = intersections[0].object as THREE.Mesh;
          const el = obj.userData.element as Element;
          setHovered(el);
          updateTooltip(event, el);

          if (highlightMesh && glowMesh) {
            highlightMesh.position.copy(obj.position);
            highlightMesh.visible = true;
            (highlightMesh.material as THREE.MeshBasicMaterial).opacity = 0.35;

            glowMesh.position.copy(obj.position);
            glowMesh.visible = true;
            (glowMesh.material as THREE.MeshBasicMaterial).opacity = 0.15;
          }
          renderer.domElement.style.cursor = "pointer";
        } else {
          setHovered(null);
          updateTooltip(event, null);
          if (highlightMesh) {
            highlightMesh.visible = false;
            (highlightMesh.material as THREE.MeshBasicMaterial).opacity = 0.0;
          }
          if (glowMesh) {
            glowMesh.visible = false;
            (glowMesh.material as THREE.MeshBasicMaterial).opacity = 0.0;
          }
          renderer.domElement.style.cursor = "grab";
        }
      });

      renderer.domElement.addEventListener("pointerdown", (event: PointerEvent) => {
        pointerDownPos = { x: event.clientX, y: event.clientY };
        _isDragging = false;
      });

      renderer.domElement.addEventListener("pointermove", () => {
        if (Math.abs(pointerDownPos.x) > 0 || Math.abs(pointerDownPos.y) > 0) {
          _isDragging = true;
        }
      });

      renderer.domElement.addEventListener("pointerup", (event: PointerEvent) => {
        const dx = event.clientX - pointerDownPos.x;
        const dy = event.clientY - pointerDownPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 4) {
          const intersections = getIntersections(event);
          if (intersections.length > 0) {
            const obj = intersections[0].object as THREE.Mesh;
            const el = obj.userData.element as Element;
            setSelected(el);
          }
        }
      });

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose?.();
        elementMeshes.forEach((mesh) => {
          mesh.geometry.dispose();
          (mesh.material as THREE.Material).dispose();
        });
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [search, activeClass, autoRotate]);

  const hoveredGroup = hovered ? hovered.col : null;
  const hoveredPeriod = hovered ? hovered.row : null;

  const activeElements = activeClass
    ? PERIODIC_TABLE.filter((el) => isInClass(el, activeClass))
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Chemistry Lab</span>
          <span className="text-xs text-muted-foreground font-normal">Interactive 3D visualizations for Class 11 chemistry</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="flex-wrap">
            <TabsTrigger value="periodic">Periodic Table</TabsTrigger>
            <TabsTrigger value="3d">3D Models & Geometry</TabsTrigger>
          </TabsList>

          <TabsContent value="periodic" className="mt-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Input
                placeholder="Search element (name, symbol, number)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs"
              />
              {search && (
                <Button variant="outline" size="sm" onClick={() => setSearch("")}>
                  Clear
                </Button>
              )}
              <Button
                variant={autoRotate ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoRotate(!autoRotate)}
                title="Toggle automatic rotation of the 3D periodic table"
              >
                {autoRotate ? "Auto-rotate: ON" : "Auto-rotate: OFF"}
              </Button>
            </div>

            {!activeClass && (
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">Classify:</span>
                {(["metals", "non-metals", "metalloids"] as BroadClass[]).map((bc) => (
                  <Button
                    key={bc}
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveClass(bc)}
                    className="hover:brightness-110"
                  >
                    {BROAD_CLASS_LABELS[bc]}
                  </Button>
                ))}
              </div>
            )}

            {activeClass && (
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">Filtered by:</span>
                <Button
                  size="sm"
                  className={BROAD_CLASS_CSS[activeClass as BroadClass] ?? CATEGORY_CSS[activeClass] ?? ""}
                  onClick={() => setActiveClass(null)}
                  title="Click to clear filter"
                >
                  {BROAD_CLASS_LABELS[activeClass as BroadClass] ?? activeClass.replace("-", " ")} ✕
                </Button>
                {!BROAD_CLASS_LABELS[activeClass as BroadClass] && (
                  <Button variant="ghost" size="sm" onClick={() => setActiveClass(null)}>
                    Show all
                  </Button>
                )}
              </div>
            )}

            <div ref={containerRef} className="lab-3d-container relative overflow-hidden rounded-lg border border-border bg-slate-950" />

            <div
              ref={tooltipRef}
              className="pointer-events-none fixed z-50 rounded-md border border-border bg-slate-900/95 px-3 py-2 text-slate-100 shadow-lg backdrop-blur"
              style={{ opacity: 0, transition: "opacity 120ms ease" }}
            />

            {!activeClass && (
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {Object.entries(CATEGORY_CSS).map(([key, css]) => (
                  <button
                    key={key}
                    onClick={() => setActiveClass(key)}
                    className={`rounded-full px-2 py-0.5 capitalize transition-opacity ${css} opacity-100 hover:brightness-110`}
                  >
                    {key.replace("-", " ")}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-3 rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Color Legend</p>
              <p>Each color represents a chemical family. Click a family chip to list its constituent elements. Hover over any element to see its name, atomic mass, electron configuration, valency, phase, and more.</p>
            </div>

            {activeClass && (
              <div className="mt-3 rounded-md border border-border bg-muted/30 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">
                    {BROAD_CLASS_LABELS[activeClass as BroadClass] ?? activeClass.replace("-", " ")} —{" "}
                    {activeElements.length} elements
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setActiveClass(null)}>
                    Close
                  </Button>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {activeElements.map((el) => (
                    <button
                      key={el.symbol}
                      onClick={() => {
                        setSelected(el);
                        setActiveClass(null);
                      }}
                      className={`group rounded-md border p-2 text-left transition-colors ${
                        selected?.symbol === el.symbol
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background hover:border-primary/50 hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded text-xs font-bold ${
                            CATEGORY_CSS[el.category] ?? "bg-muted"
                          }`}
                        >
                          {el.symbol}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium">{el.name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            #{el.number} • {el.mass} u
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-full space-y-3 lg:w-80">
            {hovered && (
              <div className="rounded-md border border-border bg-muted/50 p-3">
                <h3 className="text-sm font-semibold">Hovered: {hovered.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Group {hovered.col} • Period {hovered.row}
                </p>
                {hoveredGroup && GROUP_MNEMONICS[hoveredGroup] && (
                  <p className="mt-2 text-xs text-foreground/80">{GROUP_MNEMONICS[hoveredGroup]}</p>
                )}
                {hoveredPeriod && PERIOD_MNEMONICS[hoveredPeriod] && (
                  <p className="mt-1 text-xs text-foreground/80">{PERIOD_MNEMONICS[hoveredPeriod]}</p>
                )}
              </div>
            )}

            {selected && (
              <div className="rounded-md border border-border bg-muted/50 p-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-md text-lg font-bold ${CATEGORY_CSS[selected.category] ?? "bg-muted"}`}
                  >
                    {selected.symbol}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{selected.name}</h3>
                    <p className="text-xs text-muted-foreground">#{selected.number} • Group {selected.col} • Period {selected.row}</p>
                  </div>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Atomic Mass</dt>
                    <dd className="font-medium">{selected.mass} u</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Category</dt>
                    <dd className="font-medium capitalize">{selected.category.replace("-", " ")}</dd>
                  </div>
                  {selected.electronConfig && (
                    <div className="col-span-2">
                      <dt className="text-muted-foreground">Electron Config</dt>
                      <dd className="font-medium">{selected.electronConfig}</dd>
                    </div>
                  )}
                  {selected.phase && (
                    <div>
                      <dt className="text-muted-foreground">Phase (STP)</dt>
                      <dd className="font-medium capitalize">{selected.phase}</dd>
                    </div>
                  )}
                  {selected.summary && (
                    <div className="col-span-2">
                      <dt className="text-muted-foreground">Summary</dt>
                      <dd className="font-medium">{selected.summary}</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-3 text-xs text-muted-foreground">
                  <span className="font-medium">Group {selected.col} mnemonic:</span> {GROUP_MNEMONICS[selected.col] ?? "—"}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium">Period {selected.row} mnemonic:</span> {PERIOD_MNEMONICS[selected.row] ?? "—"}
                </div>
              </div>
            )}

            {!selected && !hovered && (
              <div className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
                {activeClass ? (
                  <>
                    <p className="font-medium text-foreground">
                      {BROAD_CLASS_LABELS[activeClass as BroadClass] ?? activeClass.replace("-", " ")} selected
                    </p>
                    <p className="mt-1">
                      Click any element in the list below to view its full details.
                    </p>
                  </>
                ) : (
                  <>
                    Hover over any element to see its group and period mnemonics. Click an element to view full details including summary, phase, and electron configuration.
                  </>
                )}
              </div>
            )}
          </div>
        </div>
          </TabsContent>

          <TabsContent value="3d" className="mt-4">
            <Chemistry3D />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

