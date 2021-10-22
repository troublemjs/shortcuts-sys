export const canUseDocElement = () => {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement &&
    window.document.documentElement
  );
};
