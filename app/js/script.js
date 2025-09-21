console.log("hi world!");

  const root = document.documentElement; // <html>
  const toggleEl = document.querySelector('.toggle');

  const getPreferredTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    if (toggleEl) toggleEl.checked = theme === 'dark';
  };

  // Initialize theme
  applyTheme(getPreferredTheme());

  // Toggle handler
  if (toggleEl) {
    toggleEl.addEventListener('change', () => {
      const newTheme = toggleEl.checked ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Optional: respond to OS theme changes if user hasn't explicitly chosen
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemChange = (e) => {
    const stored = localStorage.getItem('theme');
    if (stored !== 'dark' && stored !== 'light') {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  };
  if (media.addEventListener) media.addEventListener('change', handleSystemChange);
  else if (media.addListener) media.addListener(handleSystemChange); // Safari


