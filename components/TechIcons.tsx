import React from "react";

// ==========================================
// 1. GLOBAL TECH PARTNER LOGOS
// ==========================================

export function MicrosoftLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 4 Color Squares */}
      <rect x="0" y="2" width="15" height="15" fill="#F25022" />
      <rect x="18" y="2" width="15" height="15" fill="#7FBA00" />
      <rect x="0" y="20" width="15" height="15" fill="#00A4EF" />
      <rect x="18" y="20" width="15" height="15" fill="#FFB900" />
      {/* Wordmark */}
      <text x="42" y="25" fill="#FFFFFF" fontFamily="Segoe UI, sans-serif" fontSize="21" fontWeight="600" letterSpacing="-0.5">
        Microsoft
      </text>
    </svg>
  );
}

export function AwsLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* aws letters */}
      <text x="5" y="26" fill="#FFFFFF" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fontWeight="800" letterSpacing="-0.5">
        aws
      </text>
      {/* orange smile arrow */}
      <path
        d="M6 31 C25 41 55 38 68 28"
        stroke="#FF9900"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <polygon points="68,26 73,30 65,33" fill="#FF9900" />
    </svg>
  );
}

export function GoogleCloudLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 190 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 4-color cloud */}
      <path d="M14 26 C10 26 7 23 7 19 C7 15.5 9.5 12.5 13 12 C14.5 7.5 19 4 24 4 C30 4 35 8.5 35.5 14 C38.5 14.5 41 17 41 20 C41 23.5 38 26 34.5 26 Z" fill="#4285F4" opacity="0.9" />
      <circle cx="21" cy="18" r="7" fill="#EA4335" />
      <circle cx="29" cy="20" r="5" fill="#FBBC05" />
      <path d="M14 26 C12 26 10 24 10 22 C10 20 12 18 14 18 C16 18 18 20 18 22 C18 24 16 26 14 26 Z" fill="#34A853" />
      {/* Text */}
      <text x="48" y="25" fill="#FFFFFF" fontFamily="Google Sans, Roboto, sans-serif" fontSize="18" fontWeight="600">
        Google <tspan fill="#00D4E8">Cloud</tspan>
      </text>
    </svg>
  );
}

export function OracleLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Oracle Red Pill */}
      <rect x="0" y="5" width="34" height="26" rx="13" fill="#C74634" />
      <rect x="8" y="11" width="18" height="14" rx="7" fill="#0c1830" />
      {/* ORACLE Wordmark */}
      <text x="42" y="25" fill="#FFFFFF" fontFamily="Arial, Helvetica, sans-serif" fontSize="21" fontWeight="800" letterSpacing="1">
        ORACLE
      </text>
    </svg>
  );
}

export function CiscoLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Cisco Bridge Vertical Bars */}
      <g fill="#00BCEB">
        <rect x="4" y="14" width="3.5" height="10" rx="1.7" />
        <rect x="12" y="8" width="3.5" height="16" rx="1.7" />
        <rect x="20" y="4" width="3.5" height="20" rx="1.7" />
        <rect x="28" y="10" width="3.5" height="14" rx="1.7" />
        <rect x="36" y="2" width="3.5" height="22" rx="1.7" />
        <rect x="44" y="10" width="3.5" height="14" rx="1.7" />
        <rect x="52" y="4" width="3.5" height="20" rx="1.7" />
        <rect x="60" y="8" width="3.5" height="16" rx="1.7" />
        <rect x="68" y="14" width="3.5" height="10" rx="1.7" />
      </g>
      {/* CISCO Wordmark */}
      <text x="10" y="39" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="800" letterSpacing="3.5">
        CISCO
      </text>
    </svg>
  );
}

export function SapLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* SAP Blue Trapezoid Badge */}
      <path d="M0 2 L50 2 L68 36 L0 36 Z" fill="#008FD3" />
      <path d="M50 2 L88 2 L68 36 Z" fill="#005A9C" />
      <text x="8" y="26" fill="#FFFFFF" fontFamily="Arial Black, Impact, sans-serif" fontSize="21" fontWeight="900" letterSpacing="2">
        SAP
      </text>
    </svg>
  );
}

export function OdooLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="18" r="13" stroke="#714B67" strokeWidth="6" fill="none" />
      <text x="36" y="25" fill="#714B67" fontFamily="Arial, Helvetica, sans-serif" fontSize="22" fontWeight="800">
        odoo
      </text>
    </svg>
  );
}

export function FortinetLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Red blocks */}
      <g fill="#EE3124">
        <rect x="0" y="7" width="6" height="6" />
        <rect x="9" y="7" width="6" height="6" />
        <rect x="18" y="7" width="6" height="6" />
        <rect x="0" y="16" width="6" height="6" />
        <rect x="9" y="16" width="6" height="6" />
        <rect x="18" y="16" width="6" height="6" />
        <rect x="0" y="25" width="6" height="6" />
        <rect x="9" y="25" width="6" height="6" />
        <rect x="18" y="25" width="6" height="6" />
      </g>
      <text x="32" y="25" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="800" letterSpacing="1.5">
        FORTINET
      </text>
    </svg>
  );
}

// ==========================================
// 2. SAUDI AUTHORITIES & COMPLIANCE LOGOS
// ==========================================

export function ZatcaLogo({ className = "h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Green Shaded Digital Emblem */}
      <g transform="translate(195, 8)">
        <path d="M26 0 L52 14 L52 38 C52 48 26 56 26 56 C26 56 0 48 0 38 L0 14 Z" fill="url(#zatca-grad)" opacity="0.9" />
        <path d="M6 18 L46 18 M6 24 L46 24 M6 30 L46 30 M6 36 L46 36 M10 42 L42 42" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.8" />
      </g>
      <defs>
        <linearGradient id="zatca-grad" x1="0" y1="0" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00A389" />
          <stop offset="1" stopColor="#006C75" />
        </linearGradient>
      </defs>
      {/* Arabic and English Text */}
      <text x="185" y="30" textAnchor="end" fill="#FFFFFF" fontFamily="Cairo, Arial, sans-serif" fontSize="16" fontWeight="700">
        هيئة الزكاة والضريبة والجمارك
      </text>
      <text x="185" y="48" textAnchor="end" fill="#8BA0BE" fontFamily="Arial, sans-serif" fontSize="10.5" fontWeight="500">
        Zakat, Tax and Customs Authority
      </text>
    </svg>
  );
}

export function FatooraLogo({ className = "h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 3 Digital Dynamic Rhombus Lines */}
      <g transform="translate(140, 10)">
        <path d="M0 12 L28 4 L34 16 L6 24 Z" fill="#00D4E8" opacity="0.9" />
        <path d="M8 20 L36 12 L42 24 L14 32 Z" fill="#0066FF" />
        <path d="M16 28 L44 20 L50 32 L22 40 Z" fill="#10B981" />
      </g>
      {/* Text */}
      <text x="130" y="30" textAnchor="end" fill="#FFFFFF" fontFamily="Cairo, Arial, sans-serif" fontSize="20" fontWeight="800">
        فاتورة
      </text>
      <text x="130" y="48" textAnchor="end" fill="#00D4E8" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.5">
        Fatoora
      </text>
    </svg>
  );
}

export function NcaLogo({ className = "h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Shield Icon with Circuit */}
      <g transform="translate(185, 8)">
        <path d="M22 0 L44 10 L44 32 C44 44 22 50 22 50 C22 50 0 44 0 32 L0 10 Z" fill="#0066FF" opacity="0.2" stroke="#00D4E8" strokeWidth="2.5" />
        <circle cx="22" cy="24" r="7" fill="#00D4E8" />
        <path d="M22 17 L22 10 M22 31 L22 38 M15 24 L8 24 M29 24 L36 24" stroke="#00D4E8" strokeWidth="2" strokeLinecap="round" />
      </g>
      <text x="175" y="28" textAnchor="end" fill="#FFFFFF" fontFamily="Cairo, Arial, sans-serif" fontSize="14" fontWeight="700">
        الهيئة الوطنية للأمن السيبراني
      </text>
      <text x="175" y="46" textAnchor="end" fill="#8BA0BE" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="500">
        National Cybersecurity Authority (NCA)
      </text>
    </svg>
  );
}

export function CstLogo({ className = "h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 250 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* CST Emblem */}
      <g transform="translate(195, 8)">
        <circle cx="24" cy="25" r="23" stroke="#00D4E8" strokeWidth="2.5" fill="none" opacity="0.6" />
        <path d="M8 25 C14 14 34 14 40 25 C34 36 14 36 8 25 Z" fill="#00D4E8" opacity="0.8" />
        <circle cx="24" cy="25" r="4.5" fill="#FFFFFF" />
      </g>
      <text x="185" y="28" textAnchor="end" fill="#FFFFFF" fontFamily="Cairo, Arial, sans-serif" fontSize="14" fontWeight="700">
        هيئة الاتصالات والفضاء والتقنية
      </text>
      <text x="185" y="46" textAnchor="end" fill="#8BA0BE" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="500">
        Communications, Space & Technology (CST)
      </text>
    </svg>
  );
}

// ==========================================
// 3. TECHNOLOGIES & FRAMEWORKS STACK (Image 2)
// ==========================================

export function JavaLogo({ className = "h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Cup and steam */}
      <path d="M12 28 C12 34 32 34 32 28 C34 22 10 22 12 28 Z" fill="#5382A1" />
      <path d="M10 32 C10 38 34 38 34 32" stroke="#E76F00" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 6 C18 10 26 14 20 18" stroke="#E76F00" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 4 C22 8 30 12 24 16" stroke="#5382A1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SwiftLogo({ className = "h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="45" height="45" rx="10" fill="#F05138" />
      <path d="M10 35 C15 30 20 25 35 10 C27 20 25 24 22 28 C26 27 30 25 32 23 C28 29 22 32 16 34 C20 33 24 30 26 28 C20 32 15 34 10 35 Z" fill="#FFFFFF" />
    </svg>
  );
}

export function KotlinLogo({ className = "h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="kt-grad" x1="0" y1="0" x2="45" y2="45" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7F52FF" />
          <stop offset="0.5" stopColor="#C711E1" />
          <stop offset="1" stopColor="#E4485D" />
        </linearGradient>
      </defs>
      <rect width="45" height="45" rx="10" fill="#0C1830" />
      <path d="M7 7 L22 7 L7 22 Z M23 7 L7 23 L7 38 L38 7 Z M7 38 L23 22 L38 38 Z" fill="url(#kt-grad)" />
    </svg>
  );
}

export function FlutterLogo({ className = "h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M25 5 L7 23 L13 29 L37 5 Z" fill="#47C5FB" />
      <path d="M23 25 L16 32 L22 38 L37 23 L28 23 Z" fill="#02569B" />
      <path d="M22 38 L28 44 L37 35 L28 35 Z" fill="#0175C2" />
    </svg>
  );
}

export function ReactLogo({ className = "h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="22.5" cy="22.5" r="4" fill="#00D4E8" />
      <ellipse cx="22.5" cy="22.5" rx="19" ry="7.5" stroke="#00D4E8" strokeWidth="2" fill="none" />
      <ellipse cx="22.5" cy="22.5" rx="19" ry="7.5" stroke="#00D4E8" strokeWidth="2" fill="none" transform="rotate(60 22.5 22.5)" />
      <ellipse cx="22.5" cy="22.5" rx="19" ry="7.5" stroke="#00D4E8" strokeWidth="2" fill="none" transform="rotate(120 22.5 22.5)" />
    </svg>
  );
}

export function PythonLogo({ className = "h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Top blue snake */}
      <path d="M21 7 C13 7 14 11 14 11 L14 15 L22 15 L22 16 L11 16 C7 16 4 19 4 24 C4 29 8 28 8 28 L10 28 L10 25 C10 22 13 20 16 20 L24 20 C27 20 29 18 29 15 L29 10 C29 7 24 7 21 7 Z" fill="#3776AB" />
      <circle cx="17" cy="11" r="1.5" fill="#FFFFFF" />
      {/* Bottom yellow snake */}
      <path d="M24 38 C32 38 31 34 31 34 L31 30 L23 30 L23 29 L34 29 C38 29 41 26 41 21 C41 16 37 17 37 17 L35 17 L35 20 C35 23 32 25 29 25 L21 25 C18 25 16 27 16 30 L16 35 C16 38 21 38 24 38 Z" fill="#FFD43B" />
      <circle cx="28" cy="34" r="1.5" fill="#1C3C58" />
    </svg>
  );
}

export function NodeLogo({ className = "h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="22.5,4 40,14 40,31 22.5,41 5,31 5,14" fill="#339933" />
      <text x="13" y="28" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold">
        JS
      </text>
    </svg>
  );
}

export function LaravelLogo({ className = "h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="45" height="45" rx="10" fill="#FF2D20" />
      {/* Isometric cube */}
      <path d="M22.5 8 L35 15 L35 30 L22.5 37 L10 30 L10 15 Z" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
      <line x1="22.5" y1="8" x2="22.5" y2="37" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="22.5" y1="22" x2="35" y2="15" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="22.5" y1="22" x2="10" y2="15" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
  );
}

export function AngularLogo({ className = "h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="22.5,5 39,11 36,33 22.5,41 9,33 6,11" fill="#DD0031" />
      <polygon points="22.5,5 22.5,41 36,33 39,11" fill="#C3002F" />
      <path d="M22.5 12 L15 29 L18.5 29 L20 25 L25 25 L26.5 29 L30 29 Z M21 21 L24 21 L22.5 17 Z" fill="#FFFFFF" />
    </svg>
  );
}

export function VueLogo({ className = "h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="22.5,37 42,7 32,7 22.5,22 13,7 3,7" fill="#42B883" />
      <polygon points="22.5,37 32,7 26.5,7 22.5,14 18.5,7 13,7" fill="#35495E" />
    </svg>
  );
}

export function PhpLogo({ className = "h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 55 35" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="27.5" cy="17.5" rx="27" ry="16" fill="#777BB4" />
      <text x="27.5" y="24" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="bold">
        php
      </text>
    </svg>
  );
}

export function DotNetLogo({ className = "h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="50" height="45" rx="10" fill="#512BD4" />
      <text x="25" y="29" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold">
        .NET
      </text>
    </svg>
  );
}

