export enum FieldGuideIconKey {
  AlertCircleFilled = 'AlertCircleFilled',
  InfoFilled = 'InfoFilled'
}

/**
 * Requirements for custom icons:
 *   1. Function that accepts props and returns an SVG element; props are from Chakra, main one is `className`, see https://github.com/chakra-ui/chakra-ui/blob/main/packages/icon/src/icon.tsx
 *   2. Spread the props onto the SVG element to get the default strokeWidth (you may opt out of this for special cases)
 *   3. Set stroke="currentColor" to inherit the Chakra `color` CSS
 *   4. Set fill="none" if applicable
 */
export const FieldGuideIcons: { [key in FieldGuideIconKey]: React.FC } = {
  AlertCircleFilled: props => (
    <svg
      fill="none"
      height="14"
      viewBox="0 0 14 14"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect fill="currentColor" height="14" rx="7" width="14" />
      <path d="M7 7.5V4" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 10.5H7.00758" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  InfoFilled: props => (
    <svg
      fill="none"
      height="14"
      viewBox="0 0 14 14"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect fill="currentColor" height="14" rx="7" width="14" />
      <path d="M7 10.5V7" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 3.5H7.00758" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};
