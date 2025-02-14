export function getCurrentInfo(username: string): string {
    const now = new Date('2025-02-13T18:09:33.000Z');
    const formatted = now.toISOString().replace('T', ' ').slice(0, 19);
    return `Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): ${formatted}\nCurrent User's Login: ${username}\n`;
  }