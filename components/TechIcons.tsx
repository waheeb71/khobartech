import React from "react";

interface IconProps {
  className?: string;
}

// ==========================================
// 1. GLOBAL TECH PARTNER ICONS (Large, pure vectors)
// ==========================================

export function MicrosoftLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 4 Iconic Color Squares */}
      <rect x="5" y="5" width="18" height="18" rx="2" fill="#F25022" />
      <rect x="27" y="5" width="18" height="18" rx="2" fill="#7FBA00" />
      <rect x="5" y="27" width="18" height="18" rx="2" fill="#00A4EF" />
      <rect x="27" y="27" width="18" height="18" rx="2" fill="#FFB900" />
      {/* Crisp vector wordmark */}
      <g fill="#FFFFFF">
        <path d="M58 13 L64.5 37 L71 13 L76 13 L76 37 L72.5 37 L72.5 19.5 L66.5 37 L63 37 L57 19.5 L57 37 L53.5 37 L53.5 13 Z" />
        <path d="M81 13 L85 13 L85 37 L81 37 Z" />
        <path d="M96 24.5 C94 23.5 91.5 23 89.5 24 C87 25 86 27.5 86 30 C86 34.5 89.5 37.5 94.5 37.5 C96.5 37.5 98.5 37 100 36 L99 33 C97.5 34 96 34.5 94.5 34.5 C91.5 34.5 89.5 32.5 89.5 30 C89.5 27 91.5 25.5 94.5 25.5 C96 25.5 97.5 26 98.5 26.5 Z" />
        <path d="M104 22 L108 22 L108 25 C109.5 23 112 22 114 22 L114 26 C111.5 26 108 27 108 30 L108 37 L104 37 Z" />
        <path d="M116 30 C116 25 120 22 125 22 C130 22 134 25 134 30 C134 35 130 37.5 125 37.5 C120 37.5 116 35 116 30 Z M130 30 C130 27 128 25 125 25 C122 25 120 27 120 30 C120 33 122 34.5 125 34.5 C128 34.5 130 33 130 30 Z" />
        <path d="M141 37.5 C137 37.5 135 35 135 32.5 L138.5 32 C139 34 140 35 142 35 C144 35 145 34 145 33 C145 30.5 135.5 31.5 135.5 25.5 C135.5 23 138 22 141.5 22 C145 22 147.5 23.5 148 26 L144.5 26.5 C144 25 143 24.5 141.5 24.5 C140 24.5 139 25 139 26 C139 28 148.5 27 148.5 33 C148.5 35.5 146 37.5 141 37.5 Z" />
      </g>
    </svg>
  );
}

export function AwsLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* AWS letters */}
      <g fill="#FFFFFF">
        {/* A */}
        <path d="M22 10 L28 32 L36 32 L27 8 L17 8 L8 32 L16 32 L22 10 Z M15 25 L29 25 L26 15 L18 15 Z" />
        {/* W */}
        <path d="M42 8 L49 32 L56 32 L61 16 L66 32 L73 32 L80 8 L71 8 L67 24 L62 8 L57 8 L52 24 L48 8 Z" />
        {/* S */}
        <path d="M96 16 C93 14 89 15 89 18 C89 22 101 20 101 28 C101 32 96 34 91 34 C85 34 81 31 80 27 L87 25 C88 28 90 29 93 29 C95 29 96 28 96 26 C96 23 84 24 84 17 C84 12 88 10 94 10 C99 10 103 12 104 15 Z" />
      </g>
      {/* Iconic Orange Smile Arrow */}
      <path
        d="M12 37 C40 51 90 49 118 33"
        stroke="#FF9900"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      <polygon points="118,29 126,35 114,41" fill="#FF9900" />
    </svg>
  );
}

export function GoogleCloudLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 190 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 4-color cloud logo */}
      <g transform="translate(5, 5)">
        <path d="M18 32 C12 32 7 27 7 21 C7 16 11 12 16 11.5 C18 5 24 1 31 1 C39 1 45 6 46 13 C50 14 54 18 54 22.5 C54 27.5 50 32 45 32 Z" fill="#4285F4" opacity="0.95" />
        <circle cx="28" cy="22" r="9" fill="#EA4335" />
        <circle cx="38" cy="24" r="7" fill="#FBBC05" />
        <path d="M18 32 C14 32 11 29 11 25 C11 21 14 18 18 18 C22 18 25 21 25 25 C25 29 22 32 18 32 Z" fill="#34A853" />
      </g>
      {/* Vector Google Cloud */}
      <g fill="#FFFFFF" transform="translate(68, 12)">
        <text x="0" y="22" fontFamily="Google Sans, Roboto, sans-serif" fontSize="22" fontWeight="700" fill="#FFFFFF">
          Google <tspan fill="#00D4E8">Cloud</tspan>
        </text>
      </g>
    </svg>
  );
}

export function OracleLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Iconic Red Oracle Pill Mark */}
      <rect x="5" y="10" width="36" height="28" rx="14" fill="#C74634" />
      <rect x="14" y="17" width="18" height="14" rx="7" fill="#070e1c" />
      {/* Bold ORACLE wordmark */}
      <g fill="#FFFFFF" transform="translate(50, 10)">
        <text x="0" y="24" fontFamily="Arial, sans-serif" fontSize="23" fontWeight="900" letterSpacing="2">
          ORACLE
        </text>
      </g>
    </svg>
  );
}

export function CiscoLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 130 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 9 vertical blue bridge bars */}
      <g fill="#00BCEB">
        <rect x="10" y="16" width="4" height="12" rx="2" />
        <rect x="22" y="10" width="4" height="18" rx="2" />
        <rect x="34" y="4" width="4" height="24" rx="2" />
        <rect x="46" y="12" width="4" height="16" rx="2" />
        <rect x="58" y="2" width="4" height="26" rx="2" />
        <rect x="70" y="12" width="4" height="16" rx="2" />
        <rect x="82" y="4" width="4" height="24" rx="2" />
        <rect x="94" y="10" width="4" height="18" rx="2" />
        <rect x="106" y="16" width="4" height="12" rx="2" />
      </g>
      <text x="60" y="44" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="900" letterSpacing="4">
        CISCO
      </text>
    </svg>
  );
}

export function SapLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* SAP Blue Trapezoid Emblem */}
      <path d="M5 6 L60 6 L80 44 L5 44 Z" fill="#008FD3" />
      <path d="M60 6 L95 6 L80 44 Z" fill="#005A9C" />
      <text x="14" y="34" fill="#FFFFFF" fontFamily="Arial Black, Impact, sans-serif" fontSize="26" fontWeight="900" letterSpacing="2">
        SAP
      </text>
    </svg>
  );
}

export function OdooLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 130 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Purple odoo mark */}
      <circle cx="20" cy="25" r="14" stroke="#714B67" strokeWidth="7" fill="none" />
      <text x="44" y="34" fill="#714B67" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight="900" letterSpacing="1">
        odoo
      </text>
    </svg>
  );
}

export function FortinetLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Red blocks grid */}
      <g fill="#EE3124">
        <rect x="2" y="12" width="6.5" height="6.5" />
        <rect x="12" y="12" width="6.5" height="6.5" />
        <rect x="22" y="12" width="6.5" height="6.5" />
        <rect x="2" y="22" width="6.5" height="6.5" />
        <rect x="12" y="22" width="6.5" height="6.5" />
        <rect x="22" y="22" width="6.5" height="6.5" />
        <rect x="2" y="32" width="6.5" height="6.5" />
        <rect x="12" y="32" width="6.5" height="6.5" />
        <rect x="22" y="32" width="6.5" height="6.5" />
      </g>
      <text x="36" y="33" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="21" fontWeight="900" letterSpacing="1.5">
        FORTINET
      </text>
    </svg>
  );
}

export function DockerLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g fill="#2496ED">
        {/* Containers on whale */}
        <rect x="12" y="16" width="6" height="5" rx="0.5" />
        <rect x="20" y="16" width="6" height="5" rx="0.5" />
        <rect x="28" y="16" width="6" height="5" rx="0.5" />
        <rect x="20" y="9" width="6" height="5" rx="0.5" />
        <rect x="28" y="9" width="6" height="5" rx="0.5" />
        <rect x="36" y="16" width="6" height="5" rx="0.5" />
        {/* Whale body */}
        <path d="M48 22 C47 17 40 17 38 18 C35 15 28 15 25 17 L2 24 C0 30 5 37 18 37 C34 37 45 32 48 22 Z" />
        <circle cx="10" cy="27" r="1.5" fill="#FFFFFF" />
      </g>
      <text x="56" y="32" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="800">
        docker
      </text>
    </svg>
  );
}

// ==========================================
// 2. SAUDI AUTHORITIES & COMPLIANCE LOGOS
// ==========================================

export function ZatcaLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Green Shaded Digital Emblem */}
      <g transform="translate(180, 5)">
        <path d="M24 0 L48 12 L48 34 C48 44 24 50 24 50 C24 50 0 44 0 34 L0 12 Z" fill="url(#zatca-grad-2)" />
        <path d="M6 16 L42 16 M6 22 L42 22 M6 28 L42 28 M8 34 L40 34" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
      </g>
      <defs>
        <linearGradient id="zatca-grad-2" x1="0" y1="0" x2="48" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00A389" />
          <stop offset="1" stopColor="#005B66" />
        </linearGradient>
      </defs>
      <text x="170" y="27" textAnchor="end" fill="#FFFFFF" fontFamily="Cairo, Arial, sans-serif" fontSize="16" fontWeight="800">
        هيئة الزكاة والضريبة والجمارك
      </text>
      <text x="170" y="44" textAnchor="end" fill="#00D4E8" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="600">
        Zakat, Tax and Customs Authority
      </text>
    </svg>
  );
}

export function FatooraLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 190 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Dynamic 3 rhombuses */}
      <g transform="translate(135, 10)">
        <path d="M0 10 L24 4 L30 14 L6 20 Z" fill="#00D4E8" />
        <path d="M6 18 L30 12 L36 22 L12 28 Z" fill="#0066FF" />
        <path d="M12 26 L36 20 L42 30 L18 36 Z" fill="#10B981" />
      </g>
      <text x="125" y="28" textAnchor="end" fill="#FFFFFF" fontFamily="Cairo, Arial, sans-serif" fontSize="21" fontWeight="900">
        فاتورة
      </text>
      <text x="125" y="46" textAnchor="end" fill="#00D4E8" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="800" letterSpacing="1">
        Fatoora
      </text>
    </svg>
  );
}

export function NcaLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Cyber Security Shield */}
      <g transform="translate(170, 6)">
        <path d="M20 0 L40 9 L40 28 C40 38 20 44 20 44 C20 44 0 38 0 28 L0 9 Z" fill="#0066FF" opacity="0.3" stroke="#00D4E8" strokeWidth="2.5" />
        <circle cx="20" cy="21" r="6" fill="#00D4E8" />
        <path d="M20 15 L20 8 M20 27 L20 34 M13 21 L7 21 M27 21 L33 21" stroke="#00D4E8" strokeWidth="2" strokeLinecap="round" />
      </g>
      <text x="160" y="27" textAnchor="end" fill="#FFFFFF" fontFamily="Cairo, Arial, sans-serif" fontSize="15" fontWeight="800">
        الهيئة الوطنية للأمن السيبراني
      </text>
      <text x="160" y="44" textAnchor="end" fill="#8BA0BE" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="600">
        NCA Compliance
      </text>
    </svg>
  );
}

export function CstLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 230 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* CST Emblem */}
      <g transform="translate(180, 8)">
        <circle cx="22" cy="22" r="21" stroke="#00D4E8" strokeWidth="2.5" fill="none" opacity="0.6" />
        <path d="M8 22 C14 12 30 12 36 22 C30 32 14 32 8 22 Z" fill="#00D4E8" />
        <circle cx="22" cy="22" r="4.5" fill="#FFFFFF" />
      </g>
      <text x="170" y="27" textAnchor="end" fill="#FFFFFF" fontFamily="Cairo, Arial, sans-serif" fontSize="14.5" fontWeight="800">
        هيئة الاتصالات والفضاء والتقنية
      </text>
      <text x="170" y="44" textAnchor="end" fill="#8BA0BE" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="600">
        CST Registered
      </text>
    </svg>
  );
}

// ==========================================
// 3. TECHNOLOGIES & FRAMEWORKS ICONS
// ==========================================

export function FlutterLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g transform="translate(5, 5)">
        <path d="M22 4 L6 20 L11 25 L32 4 Z" fill="#47C5FB" />
        <path d="M20 22 L14 28 L19 33 L32 20 L24 20 Z" fill="#02569B" />
        <path d="M19 33 L24 38 L32 30 L24 30 Z" fill="#0175C2" />
      </g>
      <text x="48" y="32" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="800">
        Flutter
      </text>
    </svg>
  );
}

export function ReactLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 135 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g transform="translate(18, 25)">
        <circle cx="0" cy="0" r="4" fill="#00D4E8" />
        <ellipse cx="0" cy="0" rx="18" ry="7" stroke="#00D4E8" strokeWidth="2" fill="none" />
        <ellipse cx="0" cy="0" rx="18" ry="7" stroke="#00D4E8" strokeWidth="2" fill="none" transform="rotate(60)" />
        <ellipse cx="0" cy="0" rx="18" ry="7" stroke="#00D4E8" strokeWidth="2" fill="none" transform="rotate(120)" />
      </g>
      <text x="46" y="32" fill="#00D4E8" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="800">
        React
      </text>
    </svg>
  );
}

export function PythonLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g transform="translate(5, 5)">
        <path d="M19 6 C12 6 13 10 13 10 L13 14 L20 14 L20 15 L10 15 C6 15 3 18 3 23 C3 27 7 26 7 26 L9 26 L9 23 C9 20 12 18 15 18 L22 18 C25 18 27 16 27 13 L27 9 C27 6 22 6 19 6 Z" fill="#3776AB" />
        <circle cx="15" cy="10" r="1.5" fill="#FFFFFF" />
        <path d="M22 34 C29 34 28 30 28 30 L28 26 L21 26 L21 25 L31 25 C35 25 38 22 38 17 C38 13 34 14 34 14 L32 14 L32 17 C32 20 29 22 26 22 L19 22 C16 22 14 24 14 27 L14 31 C14 34 19 34 22 34 Z" fill="#FFD43B" />
        <circle cx="26" cy="30" r="1.5" fill="#1C3C58" />
      </g>
      <text x="48" y="32" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="800">
        Python
      </text>
    </svg>
  );
}

export function NodeLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="20,8 36,17 36,33 20,42 4,33 4,17" fill="#339933" />
      <text x="11.5" y="29" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="900">
        JS
      </text>
      <text x="46" y="32" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="800">
        Node.js
      </text>
    </svg>
  );
}

export function SwiftLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 130 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="5" y="7" width="36" height="36" rx="8" fill="#F05138" />
      <path d="M12 35 C17 30 21 26 33 14 C26 22 24 25 22 28 C25 27 28 26 30 24 C26 29 21 32 16 34 C19 33 22 31 24 29 C20 32 16 34 12 35 Z" fill="#FFFFFF" />
      <text x="49" y="32" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="800">
        Swift
      </text>
    </svg>
  );
}

export function KotlinLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 135 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="kt-grad-2" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7F52FF" />
          <stop offset="0.5" stopColor="#C711E1" />
          <stop offset="1" stopColor="#E4485D" />
        </linearGradient>
      </defs>
      <rect x="5" y="7" width="36" height="36" rx="8" fill="#0C1830" />
      <path d="M11 13 L23 13 L11 25 Z M24 13 L11 26 L11 37 L35 13 Z M11 37 L23 25 L35 37 Z" fill="url(#kt-grad-2)" />
      <text x="49" y="32" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="800">
        Kotlin
      </text>
    </svg>
  );
}

export function JavaLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 130 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g transform="translate(5, 5)">
        <path d="M10 24 C10 30 28 30 28 24 C30 18 8 18 10 24 Z" fill="#5382A1" />
        <path d="M8 28 C8 34 30 34 30 28" stroke="#E76F00" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M19 4 C15 8 23 12 17 16" stroke="#E76F00" strokeWidth="2" strokeLinecap="round" />
        <path d="M23 2 C19 6 27 10 21 14" stroke="#5382A1" strokeWidth="2" strokeLinecap="round" />
      </g>
      <text x="44" y="32" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="800">
        Java
      </text>
    </svg>
  );
}

export function LaravelLogo({ className = "h-14 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 145 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="5" y="7" width="36" height="36" rx="8" fill="#FF2D20" />
      <path d="M23 14 L33 20 L33 32 L23 38 L13 32 L13 20 Z" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      <line x1="23" y1="14" x2="23" y2="38" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="23" y1="26" x2="33" y2="20" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="23" y1="26" x2="13" y2="20" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="49" y="32" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="800">
        Laravel
      </text>
    </svg>
  );
}
