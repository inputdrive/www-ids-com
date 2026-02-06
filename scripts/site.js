// Central site scripts moved from inline HTML so CSP can be restrictive
(function(){
  function updateLastModified(){
    const timeEl = document.getElementById('lastModifiedTime');
    if (!timeEl) return;
    const dt = new Date(document.lastModified || new Date());
    timeEl.setAttribute('datetime', dt.toISOString());
    timeEl.textContent = 'Page last edited: ' + dt.toLocaleString();
  }

  function setFooterYear(){
    const el = document.getElementById('footerYear');
    if (!el) return;
    const year = new Date().getFullYear();
    el.textContent = year;
  }

  // Geolocation / IP lookup with privacy-first fallbacks
  function loadGeolocation() {
    function tryApi(url, successCallback, errorCallback) {
      fetch(url, { mode: 'cors', credentials: 'omit', cache: 'no-store' })
        .then(response => {
          if (!response.ok) throw new Error('API error');
          return response.json();
        })
        .then(data => successCallback(data))
        .catch(error => errorCallback());
    }

    function escapeHtml(text) {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return String(text || '').replace(/[&<>\"']/g, m => map[m]);
    }

    function displayLocationInfo(data) {
      const city = escapeHtml(data.city || "Unknown");
      const region = escapeHtml(data.region || "Unknown");
      const country = escapeHtml(data.country_name || "Unknown");
      const ipAddress = escapeHtml(data.ip || "Unknown");
      const infoEl = document.getElementById("ipInfo");
      if (!infoEl) return;
      infoEl.textContent = `Your location: ${city}, ${region}, ${country} — IP: ${ipAddress}`;
    }

    // Try primary API: ipapi.co
    tryApi(
      "https://ipapi.co/json/",
      displayLocationInfo,
      function() {
        // Fallback to secondary API: ip-api.com
        tryApi(
          "https://ip-api.com/json/",
          function(data) {
            var mappedData = {
              ip: data.query,
              city: data.city,
              region: data.region,
              country_name: data.country
            };
            displayLocationInfo(mappedData);
          },
          function() {
            // Final fallback: ipwho.is
            tryApi(
              "https://ipwho.is/",
              function(data) {
                var mappedData = {
                  ip: data.ip,
                  city: data.city,
                  region: data.region,
                  country_name: data.country_name
                };
                displayLocationInfo(mappedData);
              },
              function() {
                const infoEl = document.getElementById("ipInfo");
                if (infoEl) infoEl.textContent = 'Location lookup unavailable (check ad blocker or privacy settings)';
              }
            );
          }
        );
      }
    );
  }

  // Lazily observe footer to load geolocation when visible
  function lazyLoadGeolocation() {
    const infoEl = document.getElementById('ipInfo');
    if (!infoEl || !('IntersectionObserver' in window)) return;
    let loaded = false;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loaded) {
        loaded = true;
        observer.disconnect();
        loadGeolocation();
      }
    }, { rootMargin: '50px' });
    observer.observe(infoEl);
  }

  document.addEventListener('DOMContentLoaded', function(){
    updateLastModified();
    setFooterYear();
    lazyLoadGeolocation();
  });
})();