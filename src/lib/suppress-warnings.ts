// Suppress common development warnings that don't affect functionality
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  // Store original console methods
  const originalWarn = console.warn;
  const originalError = console.error;

  // Filter out message port errors
  console.error = (...args) => {
    const message = args[0]?.toString() || "";

    // Suppress message port errors from extensions
    if (
      message.includes("message port closed") ||
      message.includes("runtime.lastError")
    ) {
      return;
    }

    // Allow other errors through
    originalError.apply(console, args);
  };

  console.warn = (...args) => {
    const message = args[0]?.toString() || "";

    // Suppress extension-related warnings
    if (
      message.includes("message port") ||
      message.includes("Extension context invalidated")
    ) {
      return;
    }

    // Allow other warnings through
    originalWarn.apply(console, args);
  };
}

export {};
