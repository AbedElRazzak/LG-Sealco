export {}; // Marks the file as a module to allow global augmentation

declare global {
  interface Window {
    $crisp: any[]; // Crisp uses this for the command queue
    CRISP_WEBSITE_ID: string; // The specific ID for your Crisp website
  }
}