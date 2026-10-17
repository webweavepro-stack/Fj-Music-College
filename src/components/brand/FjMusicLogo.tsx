import React from 'react';

interface FjMusicLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'mark' | 'horizontal';
  theme?: 'dark' | 'light' | 'auto';
  showSlogan?: boolean;
}

export const FjMusicLogo: React.FC<FjMusicLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  theme = 'auto',
  showSlogan = false,
}) => {
  // Height configurations
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-12',
    lg: 'h-16 sm:h-18',
    xl: 'h-24 sm:h-28',
  };

  // Determine silhouette and typography colors based on theme
  const isDarkTheme = theme === 'dark';
  const mainFill = isDarkTheme ? '#FFFFFF' : '#000000';
  const centerCutout = isDarkTheme ? '#020617' : '#FFFFFF';
  const subtitleColor = isDarkTheme ? '#CBD5E1' : '#475569';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        viewBox={variant === 'mark' ? '0 0 210 220' : showSlogan ? '0 0 540 240' : '0 0 530 220'}
        className={`${heightClasses[size]} w-auto shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="FJMUSIC College Logo"
      >
        {/* ========================================================= */}
        {/* 1. EQUALIZER SPECTRUM BARS (16 frequency bars)            */}
        {/* ========================================================= */}
        <g id="spectrum-equalizer">
          {/* Deep Forest / Olive Greens */}
          <rect x="20" y="42" width="7.2" height="62" rx="3.6" fill="#324B1E" />
          <rect x="31" y="28" width="7.2" height="76" rx="3.6" fill="#2D481C" />
          <rect x="42" y="18" width="7.2" height="86" rx="3.6" fill="#2C521C" />
          <rect x="53" y="10" width="7.2" height="94" rx="3.6" fill="#355E1F" />

          {/* Mid Olive to Moss Greens */}
          <rect x="64" y="46" width="7.2" height="58" rx="3.6" fill="#487224" />
          <rect x="75" y="30" width="7.2" height="74" rx="3.6" fill="#5E8728" />
          <rect x="86" y="18" width="7.2" height="86" rx="3.6" fill="#749E2C" />

          {/* Vivid Chartreuse & Lime Greens */}
          <rect x="97" y="8" width="7.2" height="96" rx="3.6" fill="#8DB731" />
          <rect x="108" y="32" width="7.2" height="72" rx="3.6" fill="#A3CA35" />
          <rect x="119" y="16" width="7.2" height="88" rx="3.6" fill="#BCDC37" />

          {/* Luminous Yellow-Limes to Golden Ambers */}
          <rect x="130" y="42" width="7.2" height="62" rx="3.6" fill="#D2E334" />
          <rect x="141" y="26" width="7.2" height="78" rx="3.6" fill="#E2DE30" />
          <rect x="152" y="12" width="7.2" height="92" rx="3.6" fill="#EBC42A" />
          <rect x="163" y="28" width="7.2" height="76" rx="3.6" fill="#E89F21" />

          {/* Warm Tangerine to Sunset Ambers */}
          <rect x="174" y="44" width="7.2" height="60" rx="3.6" fill="#DF7D1A" />
          <rect x="185" y="24" width="7.2" height="80" rx="3.6" fill="#D15F15" />
        </g>

        {/* ========================================================= */}
        {/* 2. HEAD PROFILE SILHOUETTE (Facing Right)                 */}
        {/* ========================================================= */}
        <path
          d="M 23 104
             L 186 104
             C 186 104 184 114 181 117
             C 178 120 180 126 186 135
             C 188 138 188 141 184 143
             C 180 145 178 147 181 151
             C 183 154 182 157 177 158
             C 175 159 176 163 179 167
             C 181 171 181 176 177 179
             C 173 183 162 188 152 195
             C 144 201 138 210 133 218
             L 76 218
             C 76 218 64 200 58 184
             C 52 168 47 152 46 138
             C 45 125 43 113 41 106
             Z"
          fill={mainFill}
        />

        {/* Headphone Band Contour */}
        <path
          d="M 40 108
             C 37 118 36 135 39 156
             C 42 175 51 192 63 204
             C 67 200 68 194 65 186
             C 55 174 48 158 46 142
             C 44 128 46 116 48 108
             Z"
          fill={mainFill}
        />

        {/* ========================================================= */}
        {/* 3. HEADPHONE EAR PIECE (Concentric Dual-Ring Assembly)     */}
        {/* ========================================================= */}
        {/* Outer Cup Rim */}
        <circle cx="88" cy="148" r="38" fill={mainFill} />
        {/* White / Contrast Cushion Ring */}
        <circle cx="88" cy="148" r="32" fill={centerCutout} />
        {/* Inner Ring */}
        <circle cx="88" cy="148" r="22" fill={mainFill} />
        {/* Center Acoustic Port / Aperture */}
        <circle cx="88" cy="148" r="12" fill={centerCutout} />
        {/* Central Pivot Stud */}
        <circle cx="88" cy="148" r="5" fill={mainFill} />

        {/* ========================================================= */}
        {/* 4. LOGOTYPE TYPOGRAPHY: FJMUSIC COLLEGE                  */}
        {/* ========================================================= */}
        {variant !== 'mark' && (
          <g id="logotype-text">
            {/* Line 1: FJMUSIC */}
            <text
              x="215"
              y="112"
              fill={mainFill}
              fontFamily="Poppins, 'Montserrat', 'Inter', -apple-system, sans-serif"
              fontSize="78"
              fontWeight="900"
              letterSpacing="-0.035em"
            >
              FJMUSIC
            </text>

            {/* Line 2: COLLEGE */}
            <text
              x="215"
              y="184"
              fill={mainFill}
              fontFamily="Poppins, 'Montserrat', 'Inter', -apple-system, sans-serif"
              fontSize="75"
              fontWeight="900"
              letterSpacing="0.042em"
            >
              COLLEGE
            </text>

            {/* Optional Slogan */}
            {showSlogan && (
              <text
                x="218"
                y="218"
                fill={subtitleColor}
                fontFamily="Plus Jakarta Sans, -apple-system, sans-serif"
                fontSize="12.5"
                fontWeight="700"
                letterSpacing="0.24em"
              >
                FROM PRACTICE ROOM TO LIVE PERFORMANCE
              </text>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
